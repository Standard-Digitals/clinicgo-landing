import React from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Server,
  Lock,
  Database,
  Eye,
  ShieldCheck,
} from 'lucide-react';
import { Badge } from './ui/badge';

const features = [
  { icon: <Server className="w-5 h-5" />, label: '100% Self-Hosted' },
  { icon: <Database className="w-5 h-5" />, label: 'Full Data Ownership' },
  { icon: <Eye className="w-5 h-5" />, label: 'No Third-Party Data Storage' },
  { icon: <Lock className="w-5 h-5" />, label: 'Secure WordPress Infrastructure' },
  { icon: <ShieldCheck className="w-5 h-5" />, label: 'Privacy-First Architecture' },
  { icon: <Shield className="w-5 h-5" />, label: 'Complete Server-Side Control' },
];

export const SecuritySection: React.FC = () => {
  return (
    <section className="relative py-28 overflow-hidden bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 selection:bg-blue-400/30 selection:text-white">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[150px]" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <Badge className="mb-6 bg-blue-500/10 text-blue-300 border-blue-500/20 backdrop-blur-sm">
              <Shield className="w-3.5 h-3.5 mr-1.5" />
              Privacy & Security
            </Badge>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5">
              100% Self-Hosted &{' '}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Secure
              </span>
            </h2>
            <p className="text-xl text-blue-200/70 max-w-2xl mx-auto">
              Your clinic data stays completely under your control.
            </p>
          </motion.div>

          {/* Main content grid */}
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Left: Visual */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative flex items-center justify-center"
            >
              {/* Glowing ring */}
              <div className="relative w-72 h-72 sm:w-80 sm:h-80">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 rounded-full border border-blue-500/20"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-4 rounded-full border border-cyan-500/20 border-dashed"
                />

                {/* Center shield */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-32 h-32 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-xl border border-blue-400/30 flex items-center justify-center shadow-2xl shadow-blue-500/20"
                  >
                    <Shield className="w-14 h-14 text-blue-400" />
                  </motion.div>
                </div>

                {/* Floating cards */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  className="absolute -top-2 right-4 px-3 py-2 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 text-xs text-blue-200 flex items-center gap-2"
                >
                  <Lock className="w-3.5 h-3.5 text-cyan-400" />
                  Encrypted
                </motion.div>

                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute bottom-4 -left-4 px-3 py-2 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 text-xs text-blue-200 flex items-center gap-2"
                >
                  <Server className="w-3.5 h-3.5 text-blue-400" />
                  Your Server
                </motion.div>

                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                  className="absolute bottom-8 -right-6 px-3 py-2 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 text-xs text-blue-200 flex items-center gap-2"
                >
                  <Database className="w-3.5 h-3.5 text-green-400" />
                  Private DB
                </motion.div>
              </div>
            </motion.div>

            {/* Right: Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <p className="text-base text-blue-100/80 leading-relaxed mb-8">
                ClinicGo does not store, access, or manage any customer or clinic data on our servers. Once installed on your WordPress website, all appointments, patient records, invoices, staff details, and operational data remain securely stored on your own hosting server.
              </p>

              {/* Feature bullets */}
              <div className="grid sm:grid-cols-2 gap-3">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.08 }}
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:bg-white/[0.06] hover:border-blue-500/20 transition-all duration-300"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center text-blue-400">
                      {feature.icon}
                    </div>
                    <span className="text-sm text-blue-100 font-medium">{feature.label}</span>
                  </motion.div>
                ))}
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-3 mt-8">
                {['GDPR Ready', 'HIPAA Aware', 'Zero Data Access'].map((badge, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    className="px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-xs font-medium text-green-300 flex items-center gap-1.5"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {badge}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
