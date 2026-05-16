<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# ClinicGo — A Modern Clinic Management and Booking SaaS Platform

A modern clinic management and booking SaaS platform built with React, Vite, and Express. Features include appointment booking, subscription management, license activation, and an AI-powered chat support widget.

## Tech Stack

- **Frontend:** React 19, TypeScript, Tailwind CSS, Framer Motion, GSAP
- **Backend:** Express.js, Netlify Functions
- **Routing:** React Router v7
- **Payments:** Razorpay
- **Deployment:** Netlify

## Features

- 🏥 Clinic dashboard & practice management
- 📅 Booking widget for appointments
- 💳 Subscription plans with Razorpay integration
- 🔑 License activation & verification
- 🤖 AI Chat Support
- 📦 Plugin download system
- 🚀 Trial & onboarding flow

## Run Locally

**Prerequisites:** Node.js (v18+)

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file (refer `.env.example`) and set required keys:
   ```
   GEMINI_API_KEY=your_gemini_api_key
   ```
3. Run the dev server:
   ```bash
   npm run dev
   ```
   App will be available at `http://localhost:3000`

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Type-check with TypeScript |
| `npm run clean` | Remove dist folder |

## Project Structure

```
├── netlify/functions/    # Serverless API functions
├── public/               # Static assets & images
├── src/
│   ├── components/       # UI components
│   ├── lib/              # Utilities & API helpers
│   ├── pages/            # Route pages
│   ├── App.tsx           # App root with routing
│   └── main.tsx          # Entry point
├── server.ts             # Express dev server
├── netlify.toml          # Netlify config
└── vite.config.ts        # Vite config
```

## Deployment

This app is configured for **Netlify**:

- Build command: `npm run build`
- Publish directory: `dist`
- Serverless functions in `netlify/functions/`

Push to your connected Git repo and Netlify will auto-deploy.

## License

Private — All rights reserved.
