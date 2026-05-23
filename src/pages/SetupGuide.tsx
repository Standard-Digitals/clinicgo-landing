import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, ChevronDown, Check, ExternalLink, CheckCircle,
  Download, Key, Users, Calendar, Settings, Bell, Palette,
  AlertCircle, MessageSquare, FileText
} from 'lucide-react';

const sections = [
  {
    icon: Download,
    title: 'Install ClinicGo Plugin',
    steps: [
      'Download the plugin from your account or WordPress directory',
      'Go to WordPress Admin → Plugins → Add New → Upload Plugin',
      'Upload the ZIP file and click "Install Now"',
      'Click "Activate Plugin" after installation',
    ],
    note: 'If you used the auto-setup during registration, the plugin is already installed!'
  },
  {
    icon: Key,
    title: 'Activate Your License',
    steps: [
      'Go to ClinicGo → License in your WordPress admin',
      'Your license key is pre-filled if auto-installed',
      'Click "Activate License" to verify',
      'You\'ll see a green success message when activated',
    ],
    note: 'License is domain-locked. One license = one website.'
  },
  {
    icon: Users,
    title: 'Add Doctors & Staff',
    steps: [
      'Go to ClinicGo → Doctors → Add New',
      'Enter doctor name, specialization, and photo',
      'Set consultation fee and duration',
      'Add working hours for each doctor',
      'Repeat for all doctors in your clinic',
    ],
  },
  {
    icon: Calendar,
    title: 'Configure Appointment Slots',
    steps: [
      'Go to ClinicGo → Calendars → Add New',
      'Select the doctor for this calendar',
      'Set working hours (e.g., 9 AM – 5 PM)',
      'Set appointment duration (e.g., 30 minutes)',
      'Configure break times and days off',
      'Save and publish the calendar',
    ],
  },
  {
    icon: Palette,
    title: 'Add Booking Form to Website',
    steps: [
      'Use shortcode: [clinicgo_booking] on any page',
      'Or use the ClinicGo block in Gutenberg editor',
      'Or embed via widget in your theme sidebar',
      'Customize colors in ClinicGo → Settings → Appearance',
    ],
    code: '<clinic-go-booking></clinic-go-booking>'
  },
  {
    icon: Bell,
    title: 'Setup Notifications',
    steps: [
      'Go to ClinicGo → Settings → Notifications',
      'Enable email notifications for new bookings',
      'Enable patient confirmation emails',
      'Setup appointment reminder emails (24h before)',
      'Configure WhatsApp notifications (optional)',
    ],
  },
  {
    icon: Settings,
    title: 'Configure Payments',
    steps: [
      'Go to ClinicGo → Settings → Payments',
      'Enable online payment collection',
      'Connect Razorpay or your payment gateway',
      'Set consultation fees per doctor',
      'Enable invoice generation',
    ],
  },
  {
    icon: AlertCircle,
    title: 'Troubleshooting',
    steps: [
      'Booking form not showing → Check shortcode placement',
      'Emails not sending → Verify SMTP settings in WordPress',
      'Calendar empty → Ensure working hours are configured',
      'License error → Check domain matches your registered URL',
      'Plugin conflict → Deactivate other plugins to test',
    ],
    note: 'Contact support if issues persist. We respond within 2 hours.'
  },
];

export default function SetupGuide() {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 px-4 py-8 lg:py-12">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
          <button onClick={() => navigate('/account')} className="flex items-center gap-2 text-white/50 hover:text-white/80 transition-all text-sm">
            <ChevronLeft className="w-4 h-4" /> Back to Dashboard
          </button>
          <Link to="/">
            <img src="/logo.png" alt="ClinicGo" className="w-28 brightness-0 invert" />
          </Link>
        </motion.div>

        {/* Title */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="text-2xl font-bold text-white mb-2">Setup Guide</h1>
          <p className="text-sm text-white/40 max-w-md mx-auto">Follow these steps to get ClinicGo fully configured on your website</p>
        </motion.div>

        {/* Progress */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 }} className="mb-8">
          <div className="flex items-center gap-1 overflow-x-auto pb-2">
            {sections.map((_, i) => (
              <div key={i} className={`h-1.5 flex-1 min-w-[20px] rounded-full transition-all ${i <= openIndex ? 'bg-blue-500' : 'bg-white/10'}`} />
            ))}
          </div>
          <p className="text-xs text-white/30 mt-2 text-center">Step {openIndex + 1} of {sections.length}</p>
        </motion.div>

        {/* Accordion */}
        <div className="space-y-3">
          {sections.map((section, index) => {
            const Icon = section.icon;
            const isOpen = openIndex === index;
            return (
              <motion.div key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 + index * 0.03 }}
                className={`backdrop-blur-xl border rounded-2xl overflow-hidden transition-all ${isOpen ? 'bg-white/[0.07] border-blue-500/30' : 'bg-white/[0.03] border-white/[0.08]'}`}>
                <button onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="w-full p-5 flex items-center gap-4 text-left hover:bg-white/[0.02] transition-all">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${isOpen ? 'bg-blue-500/20' : 'bg-white/[0.05]'}`}>
                    {index < openIndex ? (
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Icon className={`w-4 h-4 ${isOpen ? 'text-blue-400' : 'text-white/30'}`} />
                    )}
                  </div>
                  <div className="flex-1">
                    <span className={`text-sm font-semibold ${isOpen ? 'text-white' : 'text-white/60'}`}>{section.title}</span>
                    {index < openIndex && <span className="ml-2 text-[10px] text-emerald-400 font-medium">Completed</span>}
                  </div>
                  <ChevronDown className={`w-4 h-4 text-white/30 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden">
                      <div className="px-5 pb-5 pl-[4.5rem]">
                        <ol className="space-y-2.5">
                          {section.steps.map((step, si) => (
                            <li key={si} className="flex items-start gap-2.5">
                              <span className="w-5 h-5 rounded-full bg-white/[0.05] border border-white/[0.1] flex items-center justify-center text-[10px] text-white/40 flex-shrink-0 mt-0.5">{si + 1}</span>
                              <span className="text-sm text-white/50">{step}</span>
                            </li>
                          ))}
                        </ol>

                        {section.code && (
                          <div className="mt-4 p-3 bg-slate-950/50 border border-white/[0.08] rounded-lg">
                            <code className="text-xs text-emerald-400 font-mono">{section.code}</code>
                          </div>
                        )}

                        {section.note && (
                          <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                            <p className="text-xs text-blue-300">{section.note}</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Help */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="mt-8 backdrop-blur-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/[0.1] rounded-2xl p-6 text-center">
          <h3 className="text-base font-semibold text-white mb-2">Need Help?</h3>
          <p className="text-xs text-white/40 mb-4">Our team responds within 2 hours</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/contact"
              className="px-5 py-2.5 bg-blue-500/20 border border-blue-500/30 text-blue-300 text-sm font-medium rounded-xl hover:bg-blue-500/30 transition-all flex items-center justify-center gap-2">
              <MessageSquare className="w-4 h-4" /> Contact Support
            </Link>
            <a href="https://docs.clinicgo.com" target="_blank" rel="noopener noreferrer"
              className="px-5 py-2.5 bg-white/[0.05] border border-white/[0.08] text-white/50 text-sm font-medium rounded-xl hover:bg-white/[0.08] transition-all flex items-center justify-center gap-2">
              <FileText className="w-4 h-4" /> Documentation
            </a>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
