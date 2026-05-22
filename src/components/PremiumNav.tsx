import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, LogIn } from 'lucide-react';
import Logo from './Logo';

export const PremiumNav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const [tickerVisible, setTickerVisible] = useState(true);

  useEffect(() => {
    let lastY = window.scrollY;
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 20);
      setTickerVisible(currentY <= 10 || currentY < lastY);
      lastY = currentY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  };

  const isAuthPage = ['/signup', '/login', '/onboarding', '/account', '/billing', '/download', '/setup-guide'].includes(location.pathname);

  if (isAuthPage) return null;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
        tickerVisible ? 'top-[42px]' : 'top-0'
      } ${
        scrolled
          ? 'bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-lg'
          : 'bg-white/40 backdrop-blur-xl border-b border-white/20'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between">
        <Link to="/" className="flex items-center hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg">
          <Logo />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-700">
          {[
            { label: 'Home', href: '/' },
            { label: 'About', href: '/about' },
            { label: 'Pricing', href: '/pricing' },
            { label: 'Contact', href: '/contact' }
          ].map((item) => {
            const isActive = item.href === '/' ? location.pathname === '/' : location.pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`px-3 py-2 rounded-lg transition-all ${
                  isActive
                    ? 'text-blue-600 bg-blue-50 font-semibold'
                    : 'hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          {isLoggedIn ? (
            <>
              <Link
                to="/account"
                className="px-4 py-2 text-slate-700 font-medium hover:text-blue-600 transition-colors"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-slate-600 font-medium hover:text-red-600 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-slate-700 font-medium hover:text-blue-600 transition-colors"
              >
                Sign In
              </Link>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/signup"
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-semibold rounded-lg hover:shadow-lg transition-all shadow-md shadow-blue-600/30"
                >
                  Start Free Trial
                </Link>
              </motion.div>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: isMobileMenuOpen ? 1 : 0, height: isMobileMenuOpen ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-white border-b border-slate-200 shadow-lg"
      >
        <div className="px-4 py-4 flex flex-col gap-4">
          {[
            { label: 'Home', href: '/' },
            { label: 'Pricing', href: '/pricing' },
            { label: 'About', href: '/about' },
            { label: 'Contact', href: '/contact' }
          ].map((item) => {
            const isActive = item.href === '/' ? location.pathname === '/' : location.pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`block px-4 py-2 text-base font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'text-blue-600 bg-blue-50 font-semibold'
                    : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="pt-4 border-t border-slate-100 mt-2 flex flex-col gap-2">
            {isLoggedIn ? (
              <>
                <Link to="/account" className="block w-full text-center px-5 py-3 bg-blue-600 text-white text-base font-medium rounded-xl hover:bg-blue-700 transition-colors shadow-sm">
                  My Account
                </Link>
                <button onClick={handleLogout} className="block w-full text-center px-5 py-3 border-2 border-red-200 text-red-600 text-base font-medium rounded-xl hover:bg-red-50 transition-colors">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block w-full text-center px-5 py-3 border-2 border-slate-200 text-slate-700 text-base font-medium rounded-xl hover:border-slate-300 transition-colors">
                  Sign In
                </Link>
                <Link to="/signup" className="block w-full text-center px-5 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-base font-medium rounded-xl hover:shadow-lg transition-all shadow-md">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
};
