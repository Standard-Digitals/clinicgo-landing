import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Home from './pages/Home';
import PrivacyPolicy from './pages/PrivacyPolicy';
import About from './pages/About';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import Logo from './components/Logo';
import AIChatSupport from './components/AIChatSupport';

function ScrollToHash() {
  const { hash, pathname } = useLocation();
  
  useEffect(() => {
    if (hash) {
      // Small timeout to ensure the DOM is painted before scrolling
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when route changes
  const location = useLocation();
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname, location.hash]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-200 flex flex-col">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-50 border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg">
            <Logo iconSize="w-8 h-8" textSize="text-xl" />
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <Link to="/#features" className="hover:text-blue-600 transition-colors focus:outline-none focus:text-blue-600">Features</Link>
            <Link to="/#demo" className="hover:text-blue-600 transition-colors focus:outline-none focus:text-blue-600">Live Demo</Link>
            <Link to="/pricing" className="hover:text-blue-600 transition-colors focus:outline-none focus:text-blue-600">Pricing</Link>
            <Link to="/about" className="hover:text-blue-600 transition-colors focus:outline-none focus:text-blue-600">About Us</Link>
            <Link to="/contact" className="hover:text-blue-600 transition-colors focus:outline-none focus:text-blue-600">Contact</Link>
          </div>
          
          <div className="hidden md:block">
            <Link 
              to="/pricing" 
              className="px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-full hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-sm shadow-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 shadow-lg absolute top-16 left-0 right-0 py-4 px-4 flex flex-col gap-4">
            <Link to="/#features" className="block px-4 py-2 text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">Features</Link>
            <Link to="/#demo" className="block px-4 py-2 text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">Live Demo</Link>
            <Link to="/pricing" className="block px-4 py-2 text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">Pricing</Link>
            <Link to="/about" className="block px-4 py-2 text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">About Us</Link>
            <Link to="/contact" className="block px-4 py-2 text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">Contact</Link>
            <div className="pt-4 border-t border-slate-100 mt-2">
              <Link 
                to="/pricing" 
                className="block w-full text-center px-5 py-3 bg-blue-600 text-white text-base font-medium rounded-xl hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-sm"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="flex-1 mt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
        </Routes>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 md:py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <div className="col-span-1 sm:col-span-2">
            <div className="mb-6">
              <Logo light={true} iconSize="w-7 h-7" textSize="text-xl" />
            </div>
            <p className="max-w-sm mb-6 text-sm md:text-base leading-relaxed">The most powerful and customizable WordPress booking plugin for businesses of all sizes.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="hover:text-white hover:underline transition-all focus:outline-none focus:text-white">Home</Link></li>
              <li><Link to="/#features" className="hover:text-white hover:underline transition-all focus:outline-none focus:text-white">Features</Link></li>
              <li><Link to="/#demo" className="hover:text-white hover:underline transition-all focus:outline-none focus:text-white">Live Demo</Link></li>
              <li><Link to="/pricing" className="hover:text-white hover:underline transition-all focus:outline-none focus:text-white">Pricing</Link></li>
              <li><Link to="/about" className="hover:text-white hover:underline transition-all focus:outline-none focus:text-white">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white hover:underline transition-all focus:outline-none focus:text-white">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-lg">Legal & Contact</h4>
            <ul className="space-y-3">
              <li><Link to="/privacy" className="hover:text-white hover:underline transition-all focus:outline-none focus:text-white">Privacy Policy</Link></li>
              <li className="text-slate-400">Plot No13, Silver Creek-1, Old Thana Road, Zirakpur, PIN-140603</li>
              <li><a href="mailto:support@standarddigitals.com" className="hover:text-white hover:underline transition-all focus:outline-none focus:text-white">support@standarddigitals.com</a></li>
              <li><a href="tel:+919056347061" className="hover:text-white hover:underline transition-all focus:outline-none focus:text-white">+91 9056347061</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-800 text-sm text-center text-slate-500">
          &copy; {new Date().getFullYear()} SD Booking. All rights reserved.
        </div>
      </footer>
      <AIChatSupport />
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
