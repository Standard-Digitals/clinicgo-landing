import express from 'express';
import { createServer as createViteServer } from 'vite';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function start() {
  const app = express();
  app.use(express.json());

  // Dynamically load API handlers
  const apiModules: Record<string, string> = {
    'signup': './api/signup.ts',
    'login': './api/login.ts',
    'wp-verify': './api/wp-verify.ts',
    'wp-install-plugin': './api/wp-install-plugin.ts',
    'license-activate': './api/license-activate.ts',
    'license-verify': './api/license-verify.ts',
    'start-trial': './api/start-trial.ts',
    'create-subscription': './api/create-subscription.ts',
    'razorpay-create-order': './api/razorpay-create-order.ts',
    'change-plan': './api/change-plan.ts',
    'cancel-subscription': './api/cancel-subscription.ts',
    'plugin-download': './api/plugin-download.ts',
    'contact': './api/contact.ts',
  };

  for (const [route, modulePath] of Object.entries(apiModules)) {
    app.all(`/api/${route}`, async (req, res) => {
      try {
        const mod = await import(modulePath);
        await mod.default(req, res);
      } catch (err: any) {
        console.error(`API error [${route}]:`, err.message);
        res.status(500).json({ message: 'Internal server error' });
      }
    });
  }

  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);

  app.listen(3000, () => {
    console.log('Dev server running at http://localhost:3000');
  });
}

start();
