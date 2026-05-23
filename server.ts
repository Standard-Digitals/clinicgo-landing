import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import dotenv from "dotenv";
import crypto from "crypto";
import fs from "fs";
import bcrypt from "bcryptjs";

dotenv.config();

interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  plan?: "monthly" | "yearly";
  subscriptionStatus?: "active" | "trialing" | "past_due" | "canceled";
  subscriptionId?: string;
  trialEndsAt?: string;
  subscriptionEndsAt?: string;
  licenseKey?: string;
  licensedDomains?: string[];
  onboardingComplete?: boolean;
  createdAt: string;
}

interface Subscription {
  id: string;
  userId: string;
  plan: "monthly" | "yearly";
  status: string;
  razorpaySubscriptionId?: string;
  trialStart: string;
  trialEnds: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
}

const DATA_FILE = path.join(process.cwd(), "data.json");
const TOKEN_SECRET = process.env.TOKEN_SECRET || 'clinicgo-secret-key-change-in-production';

interface DataStore {
  users: Record<string, User>;
  subscriptions: Record<string, Subscription>;
  licenses: Record<string, { userId: string; domain: string }>;
}

let data: DataStore = { users: {}, subscriptions: {}, licenses: {} };

function loadData() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, "utf-8");
      data = JSON.parse(content);
      console.log("Loaded data from file:", Object.keys(data.users).length, "users");
    }
  } catch (e) {
    console.log("No existing data file, starting fresh");
  }
}

function saveData() {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

loadData();

function generateLicenseKey(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let key = "CGO-";
  for (let i = 0; i < 4; i++) {
    key += chars[Math.floor(Math.random() * chars.length)];
  }
  key += "-";
  for (let i = 0; i < 4; i++) {
    key += chars[Math.floor(Math.random() * chars.length)];
  }
  key += "-";
  for (let i = 0; i < 4; i++) {
    key += chars[Math.floor(Math.random() * chars.length)];
  }
  return key;
}

function generateId(): string {
  return crypto.randomBytes(16).toString("hex");
}

function createToken(userId: string, email: string): string {
  const payload = JSON.stringify({ id: userId, email, iat: Date.now() });
  const signature = crypto.createHmac('sha256', TOKEN_SECRET).update(payload).digest('hex');
  return Buffer.from(payload).toString('base64') + '.' + signature;
}

function verifyToken(token: string): { id: string; email: string } | null {
  try {
    const [payloadB64, signature] = token.split('.');
    if (!payloadB64 || !signature) return null;
    const payload = Buffer.from(payloadB64, 'base64').toString();
    const expectedSig = crypto.createHmac('sha256', TOKEN_SECRET).update(payload).digest('hex');
    if (signature !== expectedSig) return null;
    return JSON.parse(payload);
  } catch (e) {
    return null;
  }
}

async function startServer() {
  const app = express();
  const PORT = 3003;

  app.use(express.json());

  app.use("/api", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }
    next();
  });

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", env: process.env.NODE_ENV });
  });

  app.post("/api/auth/signup", async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters" });
    }

    for (const user of Object.values(data.users)) {
      if (user.email === email) {
        return res.status(400).json({ message: "Email already registered" });
      }
    }

    const id = generateId();
    const hashedPassword = await bcrypt.hash(password, 10);
    const licenseKey = generateLicenseKey();
    const freeUntil = '2025-08-31T23:59:59.000Z';

    const user: User = {
      id,
      email,
      password: hashedPassword,
      name,
      plan: 'premium' as any,
      subscriptionStatus: 'active',
      licenseKey,
      licensedDomains: [],
      onboardingComplete: false,
      createdAt: new Date().toISOString(),
      subscriptionEndsAt: freeUntil,
    };

    data.users[id] = user;
    data.licenses[licenseKey] = { userId: id, domain: '' };
    saveData();

    const token = createToken(id, email);
    console.log("Signup successful:", email, "License:", licenseKey);

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        plan: user.plan,
        subscriptionStatus: user.subscriptionStatus,
        licenseKey: user.licenseKey,
        subscriptionEndsAt: user.subscriptionEndsAt,
        freeUntil,
        onboardingComplete: user.onboardingComplete,
      },
    });
  });

  app.post("/api/auth/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    let foundUser: User | undefined;
    for (const user of Object.values(data.users)) {
      if (user.email === email) {
        foundUser = user;
        break;
      }
    }

    if (!foundUser) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isValid = await bcrypt.compare(password, foundUser.password);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Auto-generate license key for existing users who don't have one
    if (!foundUser.licenseKey) {
      const licenseKey = generateLicenseKey();
      foundUser.licenseKey = licenseKey;
      foundUser.plan = 'premium' as any;
      foundUser.subscriptionStatus = 'active';
      foundUser.subscriptionEndsAt = '2025-08-31T23:59:59.000Z';
      data.licenses[licenseKey] = { userId: foundUser.id, domain: '' };
      saveData();
      console.log('Auto-generated license for existing user:', email, licenseKey);
    }

    const token = createToken(foundUser.id, foundUser.email);

    res.json({
      token,
      user: {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        plan: foundUser.plan,
        subscriptionStatus: foundUser.subscriptionStatus,
        licenseKey: foundUser.licenseKey,
        trialEndsAt: foundUser.trialEndsAt,
        subscriptionEndsAt: foundUser.subscriptionEndsAt,
        freeUntil: (foundUser as any).freeUntil || foundUser.subscriptionEndsAt,
        onboardingComplete: foundUser.onboardingComplete,
      },
    });
  });

  const authenticate = (req: express.Request): User | null => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) return null;

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    if (!decoded) return null;

    const user = data.users[decoded.id];
    if (user && user.email === decoded.email) return user;
    return null;
  };

  app.post("/api/subscription/start-trial", (req, res) => {
    const user = authenticate(req);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { plan } = req.body;
    if (!plan || (plan !== "monthly" && plan !== "yearly")) {
      return res.status(400).json({ message: "Valid plan required (monthly or yearly)" });
    }

    user.plan = plan;
    user.subscriptionStatus = "trialing";

    const trialEnds = new Date();
    trialEnds.setDate(trialEnds.getDate() + 14);
    user.trialEndsAt = trialEnds.toISOString();

    const subscriptionId = generateId();
    const subscription: Subscription = {
      id: subscriptionId,
      userId: user.id,
      plan,
      status: "trialing",
      trialStart: new Date().toISOString(),
      trialEnds: trialEnds.toISOString(),
      currentPeriodStart: trialEnds.toISOString(),
      currentPeriodEnd: trialEnds.toISOString(),
    };
    data.subscriptions[subscriptionId] = subscription;
    saveData();

    console.log("Trial started for:", user.email);

    res.json({
      message: "Trial started",
      trialEndsAt: trialEnds.toISOString(),
      subscriptionId,
    });
  });

  app.post("/api/razorpay/create-order", (req, res) => {
    const user = authenticate(req);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { plan } = req.body;
    const amount = plan === "yearly" ? 49000 : 4900;

    const orderId = "order_" + generateId();
    const keyId = process.env.RAZORPAY_KEY_ID || "test_key_id";

    res.json({
      orderId,
      keyId,
      amount,
      currency: "INR",
    });
  });

  app.post("/api/subscription/create", (req, res) => {
    const user = authenticate(req);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { plan, paymentId } = req.body;

    user.subscriptionStatus = "active";
    user.subscriptionId = generateId();

    const subscriptionEnds = new Date();
    if (plan === "yearly") {
      subscriptionEnds.setFullYear(subscriptionEnds.getFullYear() + 1);
    } else {
      subscriptionEnds.setMonth(subscriptionEnds.getMonth() + 1);
    }
    user.subscriptionEndsAt = subscriptionEnds.toISOString();

    const licenseKey = generateLicenseKey();
    user.licenseKey = licenseKey;
    user.licensedDomains = [];
    data.licenses[licenseKey] = { userId: user.id, domain: "" };

    user.onboardingComplete = true;
    saveData();

    console.log("Subscription created for:", user.email, "License:", licenseKey);

    res.json({
      message: "Subscription created",
      subscriptionId: user.subscriptionId,
      licenseKey,
    });
  });

  app.post("/api/license/activate", (req, res) => {
    const user = authenticate(req);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { licenseKey, domain } = req.body;

    if (!licenseKey || !domain) {
      return res.status(400).json({ message: "License key and domain required" });
    }

    const license = data.licenses[licenseKey];
    if (!license || license.userId !== user.id) {
      return res.status(400).json({ message: "Invalid license key" });
    }

    data.licenses[licenseKey] = { userId: user.id, domain };
    user.licensedDomains = [...(user.licensedDomains || []), domain];
    saveData();

    res.json({
      message: "License activated",
      domain,
    });
  });

  app.get("/api/license/verify", (req, res) => {
    const { licenseKey, domain } = req.query as { licenseKey?: string; domain?: string };

    if (!licenseKey || !domain) {
      return res.status(400).json({ message: "License key and domain required" });
    }

    const license = data.licenses[licenseKey];
    if (!license || license.domain !== domain) {
      return res.status(400).json({ valid: false, message: "Invalid or expired license" });
    }

    res.json({ valid: true, message: "License is valid" });
  });

  app.post("/api/subscription/change-plan", (req, res) => {
    const user = authenticate(req);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { plan } = req.body;
    if (!plan || (plan !== "monthly" && plan !== "yearly")) {
      return res.status(400).json({ message: "Valid plan required" });
    }

    user.plan = plan;
    saveData();

    res.json({ message: "Plan changed", plan });
  });

  app.post("/api/subscription/cancel", (req, res) => {
    const user = authenticate(req);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    user.subscriptionStatus = "canceled";
    saveData();

    res.json({ message: "Subscription canceled" });
  });

  app.get("/api/plugin/download", (req, res) => {
    const user = authenticate(req);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const mockPluginContent = "This is a placeholder for the actual plugin zip file";
    const buffer = Buffer.from(mockPluginContent);

    res.setHeader("Content-Type", "application/zip");
    res.setHeader("Content-Disposition", "attachment; filename=sd-booking.zip");
    res.send(buffer);
  });

  // Map Netlify function paths to API routes for local dev
  app.post("/.netlify/functions/signup", (req, res) => {
    (req as any).url = "/api/auth/signup";
    app(req, res);
  });
  app.post("/.netlify/functions/login", (req, res) => {
    (req as any).url = "/api/auth/login";
    app(req, res);
  });
  app.post("/.netlify/functions/start-trial", (req, res) => {
    (req as any).url = "/api/subscription/start-trial";
    app(req, res);
  });
  app.post("/.netlify/functions/create-subscription", (req, res) => {
    (req as any).url = "/api/subscription/create";
    app(req, res);
  });
  app.post("/.netlify/functions/razorpay-create-order", (req, res) => {
    (req as any).url = "/api/razorpay/create-order";
    app(req, res);
  });
  app.post("/.netlify/functions/change-plan", (req, res) => {
    (req as any).url = "/api/subscription/change-plan";
    app(req, res);
  });
  app.post("/.netlify/functions/cancel-subscription", (req, res) => {
    (req as any).url = "/api/subscription/cancel";
    app(req, res);
  });
  app.post("/.netlify/functions/license-activate", (req, res) => {
    (req as any).url = "/api/license/activate";
    app(req, res);
  });
  app.get("/.netlify/functions/license-verify", (req, res) => {
    const qs = req.originalUrl.includes('?') ? req.originalUrl.substring(req.originalUrl.indexOf('?')) : '';
    (req as any).url = "/api/license/verify" + qs;
    app(req, res);
  });
  app.get("/.netlify/functions/plugin-download", (req, res) => {
    (req as any).url = "/api/plugin/download";
    app(req, res);
  });
  app.post("/.netlify/functions/wp-verify", (req, res) => {
    (req as any).url = "/api/wp/verify";
    app(req, res);
  });
  app.post("/.netlify/functions/wp-install-plugin", (req, res) => {
    (req as any).url = "/api/wp/install-plugin";
    app(req, res);
  });
  app.post("/.netlify/functions/contact", (req, res) => {
    (req as any).url = "/api/contact";
    app(req, res);
  });

  // WordPress verification endpoint
  app.post("/api/wp/verify", async (req, res) => {
    const { url } = req.body;
    if (!url) return res.status(400).json({ message: 'URL is required' });

    const cleanUrl = url.replace(/\/$/, '');
    let isWordPress = false;
    let hasWpAdmin = false;

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);
      const wpRes = await fetch(`${cleanUrl}/wp-json/wp/v2/`, {
        method: 'HEAD',
        signal: controller.signal
      });
      clearTimeout(timeout);
      if (wpRes.ok || wpRes.status === 401) isWordPress = true;
    } catch {
      // Try wp-login fallback
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000);
        const wpRes = await fetch(`${cleanUrl}/wp-login.php`, {
          method: 'HEAD',
          signal: controller.signal
        });
        clearTimeout(timeout);
        if (wpRes.ok || wpRes.status === 302) isWordPress = true;
      } catch {}
    }

    if (isWordPress) hasWpAdmin = true;

    res.json({ isWordPress, hasWpAdmin, url: cleanUrl });
  });

  // WordPress plugin install endpoint
  app.post("/api/wp/install-plugin", (req, res) => {
    const user = authenticate(req);
    if (!user) return res.status(401).json({ message: 'Unauthorized' });

    const { websiteUrl } = req.body;
    if (!websiteUrl) return res.status(400).json({ message: 'Website URL required' });

    // In production, this would call the WP REST API to install the plugin
    // For now, mark user as connected
    (user as any).websiteUrl = websiteUrl;
    (user as any).pluginInstalled = true;
    saveData();

    res.json({
      success: true,
      installed: true,
      activated: true,
      message: 'Plugin installation initiated',
      redirectUrl: `${websiteUrl.replace(/\/$/, '')}/wp-admin/admin.php?page=clinicgo-dashboard`
    });
  });

  app.post("/api/contact", async (req, res) => {
    const { name, email, clinic, pluginInterest, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: "Name, email, and message are required" });
    }
    try {
      const nodemailer = await import('nodemailer');
      const transporter = nodemailer.default.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: false,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      });
      await transporter.sendMail({
        from: `"ClinicGo Contact Form" <${process.env.SMTP_USER}>`,
        to: process.env.SUPPORT_EMAIL || 'support@clinicgo.com',
        replyTo: email,
        subject: `New Contact Form: ${pluginInterest || 'General Inquiry'} — ${name}`,
        html: `<h2>New Contact Form Submission</h2><p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Clinic:</b> ${clinic || 'N/A'}</p><p><b>Interest:</b> ${pluginInterest || 'General'}</p><p><b>Message:</b> ${message}</p>`,
      });
      res.json({ message: "Message sent successfully" });
    } catch (error) {
      console.error('Contact form error:', error);
      res.status(500).json({ message: "Failed to send message. Please try again." });
    }
  });

  app.use("/api/*", (req, res) => {
    res.status(404).json({ 
      message: "API endpoint not found",
      path: req.path,
      method: req.method
    });
  });

  if (process.env.NODE_ENV !== "production") {
    console.log("Starting in development mode with Vite middleware");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting in production mode");
    const distPath = path.join(process.cwd(), "dist");
    
    app.use(express.static(distPath, { index: false }));
    
    app.use("/api", express.json());
    
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();