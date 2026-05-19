import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from 'lucide-react';
import Logo from './Logo';

export const PremiumFooter = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '#' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'Security', href: '#' },
        { label: 'Roadmap', href: '#' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Blog', href: '#' },
        { label: 'Careers', href: '#' },
        { label: 'Contact', href: '/contact' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'Documentation', href: '#' },
        { label: 'API Docs', href: '#' },
        { label: 'Support', href: '#' },
        { label: 'Community', href: '#' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '#' },
        { label: 'Cookie Policy', href: '#' },
        { label: 'HIPAA', href: '#' }
      ]
    }
  ];

  return (
    <footer className="bg-gradient-to-b from-slate-900 via-slate-900 to-black text-slate-400 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            x: [0, 100, 0],
            y: [0, 50, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            x: [0, -100, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="mb-6">
                <Logo />
              </div>
              <p className="text-slate-400 mb-6 leading-relaxed">
                Smart clinic management platform designed to simplify appointments, patient records, billing, staff operations, and healthcare workflows — all from one powerful dashboard.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors">
                  <Mail className="w-5 h-5" />
                  <a href="mailto:support@clinicgo.com">support@clinicgo.com</a>
                </div>
                <div className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors">
                  <Phone className="w-5 h-5" />
                  <a href="tel:+919056347061">+91 9056347061</a>
                </div>
                <div className="flex items-start gap-3 text-slate-400">
                  <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                  <span>Plot No 13, Silver Creek-1, Old Thana Road, Zirakpur, PIN-140603</span>
                </div>
              </div>
            </motion.div>

            {/* Links Sections */}
            {footerLinks.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <h4 className="text-white font-semibold mb-6 text-lg">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <Link
                        to={link.href}
                        className="text-slate-400 hover:text-white transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-slate-800 py-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Copyright */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-sm text-slate-500"
              >
                &copy; {currentYear} Clinic Go. All rights reserved.
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="flex justify-end gap-6"
              >
                {[
                  { icon: Linkedin, href: '#', label: 'LinkedIn' },
                  { icon: Twitter, href: '#', label: 'Twitter' },
                  { icon: Facebook, href: '#', label: 'Facebook' }
                ].map((social, i) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={i}
                      href={social.href}
                      aria-label={social.label}
                      whileHover={{ scale: 1.2, color: '#3b82f6' }}
                      className="text-slate-400 hover:text-blue-500 transition-colors"
                    >
                      <Icon className="w-6 h-6" />
                    </motion.a>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-slate-800/50 backdrop-blur-xl border-t border-slate-700"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-wrap justify-center gap-8 items-center">
              {['HIPAA Certified', 'ISO 27001', 'SOC 2 Type II', 'GDPR Compliant'].map((badge, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-2 text-slate-300 text-sm font-semibold"
                >
                  <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                  {badge}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
