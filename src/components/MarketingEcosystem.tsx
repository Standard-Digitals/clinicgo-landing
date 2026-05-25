import React from 'react';
import { motion } from 'framer-motion';
import {
  CalendarCheck,
  Bell,
  GitBranch,
  MessageCircle,
  BarChart3,
  MessageSquare,
  Users,
  Heart,
  Megaphone,
  Star,
} from 'lucide-react';
import { Badge } from './ui/badge';

const ecosystemItems = [
  { icon: CalendarCheck, label: 'Booking Confirmation', color: 'from-blue-500 to-blue-600' },
  { icon: Bell, label: 'Follow-up Reminders', color: 'from-amber-500 to-orange-500' },
  { icon: GitBranch, label: 'Patient Pipeline', color: 'from-purple-500 to-violet-600' },
  { icon: MessageCircle, label: 'Feedback Collection', color: 'from-emerald-500 to-green-600' },
  { icon: BarChart3, label: 'Appointment Tracking', color: 'from-cyan-500 to-teal-500' },
  { icon: MessageSquare, label: 'WhatsApp Notifications', color: 'from-green-500 to-emerald-600' },
  { icon: Users, label: 'Lead Management', color: 'from-indigo-500 to-blue-600' },
  { icon: Heart, label: 'Patient Retention', color: 'from-pink-500 to-rose-500' },
  { icon: Megaphone, label: 'Automated Campaigns', color: 'from-orange-500 to-red-500' },
  { icon: Star, label: 'Review Requests', color: 'from-yellow-500 to-amber-500' },
];

export const MarketingEcosystem: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-blue-500/10 text-blue-400 border-blue-500/30 hover:bg-blue-500/20">
            ✨ AI Powered Automation
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5">
            Marketing{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Ecosystem
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Automate and manage your entire clinic workflow with smart patient engagement tools designed to save time, improve conversions, and enhance patient experience.
          </p>
        </motion.div>

        {/* Ecosystem Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 max-w-5xl mx-auto">
          {ecosystemItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                whileHover={{ y: -6, scale: 1.03 }}
                className="group relative"
              >
                {/* Glow on hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`} />

                <div className="relative flex flex-col items-center gap-3 p-5 md:p-6 rounded-2xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm hover:border-slate-600 transition-all duration-300 h-full">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Label */}
                  <span className="text-sm font-medium text-slate-300 text-center leading-tight group-hover:text-white transition-colors duration-300">
                    {item.label}
                  </span>

                  {/* Connection dot */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-blue-500/50 group-hover:bg-blue-400 transition-colors hidden lg:block" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom connector line (desktop) */}
        <div className="hidden lg:block max-w-5xl mx-auto mt-0 relative h-8">
          <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-8 bg-gradient-to-b from-blue-500/40 to-transparent" />
        </div>

        {/* Central hub indicator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="hidden lg:flex items-center justify-center mt-2"
        >
          <div className="px-5 py-2.5 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-sm">
            <span className="text-sm font-semibold text-blue-400">
              🔄 One Unified Ecosystem
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
