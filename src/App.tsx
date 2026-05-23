import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import PrivacyPolicy from './pages/PrivacyPolicy';
import About from './pages/About';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Onboarding from './pages/Onboarding';
import Account from './pages/Account';
import Billing from './pages/Billing';
import Download from './pages/Download';
import SetupGuide from './pages/SetupGuide';

import AIChatSupport from './components/AIChatSupport';
import { PremiumNav } from './components/PremiumNav';
import { PremiumFooter } from './components/PremiumFooter';
import { AnnouncementTicker } from './components/AnnouncementTicker';

function ScrollToHash() {
  const { hash, pathname } = useLocation();
  
  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.replace('#', ''));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash, pathname]);
  
  return null;
}

function App() {
  const location = useLocation();
  const isAuthPage = ['/signup', '/login', '/onboarding', '/account', '/billing', '/download', '/setup-guide'].includes(location.pathname);
  const isFullScreenAuth = ['/signup', '/login', '/onboarding'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-200 flex flex-col">
      {!isAuthPage && <AnnouncementTicker />}
      {!isFullScreenAuth && <PremiumNav />}

      <div className={`flex-1 ${!isAuthPage ? 'pt-[106px]' : ''}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/account" element={<Account />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/download" element={<Download />} />
          <Route path="/setup-guide" element={<SetupGuide />} />
        </Routes>
      </div>

      {!isAuthPage && <PremiumFooter />}
      {!isAuthPage && <AIChatSupport />}
    </div>
  );
}

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <App />
    </BrowserRouter>
  );
}
