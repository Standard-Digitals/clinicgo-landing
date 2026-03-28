import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import dotenv from "dotenv";
import crypto from "crypto";

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

const users: Map<string, User> = new Map();
const subscriptions: Map<string, Subscription> = new Map();
const licenses: Map<string, { userId: string; domain: string }> = new Map();

function generateLicenseKey(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let key = "SDB-";
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

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", env: process.env.NODE_ENV });
  });

  app.post("/api/auth/signup", (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    for (const user of users.values()) {
      if (user.email === email) {
        return res.status(400).json({ message: "Email already exists" });
      }
    }

    const id = generateId();
    const user: User = {
      id,
      email,
      password,
      name,
      plan: undefined,
      subscriptionStatus: undefined,
      licenseKey: undefined,
      licensedDomains: [],
      onboardingComplete: false,
      createdAt: new Date().toISOString(),
    };

    users.set(id, user);

    const token = Buffer.from(`${id}:${email}`).toString("base64");

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        plan: user.plan,
        subscriptionStatus: user.subscriptionStatus,
        licenseKey: user.licenseKey,
        onboardingComplete: user.onboardingComplete,
      },
    });
  });

  app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    let foundUser: User | undefined;
    for (const user of users.values()) {
      if (user.email === email && user.password === password) {
        foundUser = user;
        break;
      }
    }

    if (!foundUser) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = Buffer.from(`${foundUser.id}:${foundUser.email}`).toString("base64");

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
        onboardingComplete: foundUser.onboardingComplete,
      },
    });
  });

  const authenticate = (req: express.Request): User | null => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return null;
    }

    const token = authHeader.substring(7);
    try {
      const decoded = Buffer.from(token, "base64").toString();
      const [id, email] = decoded.split(":");
      const user = users.get(id);
      if (user && user.email === email) {
        return user;
      }
    } catch {
      return null;
    }
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
    subscriptions.set(subscriptionId, subscription);

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
    licenses.set(licenseKey, { userId: user.id, domain: "" });

    user.onboardingComplete = true;

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

    const license = licenses.get(licenseKey);
    if (!license || license.userId !== user.id) {
      return res.status(400).json({ message: "Invalid license key" });
    }

    licenses.set(licenseKey, { userId: user.id, domain });
    user.licensedDomains = [...(user.licensedDomains || []), domain];

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

    const license = licenses.get(licenseKey);
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

    res.json({ message: "Plan changed", plan });
  });

  app.post("/api/subscription/cancel", (req, res) => {
    const user = authenticate(req);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    user.subscriptionStatus = "canceled";

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
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();