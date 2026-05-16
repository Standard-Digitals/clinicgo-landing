import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, Users, CreditCard, Zap, MessageSquare, 
  BarChart3, Stethoscope, FileText, TrendingUp, Video,
  ArrowRight, Star
} from 'lucide-react';
import { PremiumCard, FeatureCard } from './PremiumCard';
import { ScrollReveal } from '../lib/animations';

const plugins = [
  {
    id: 1,
    name: 'Smart Scheduler',
    description: 'AI-powered appointment scheduling with conflict detection',
    icon: Calendar,
    gradient: 'from-blue-500 to-blue-600',
    features: ['Auto-optimization', 'Conflict detection', 'Resource allocation'],
    rating: 4.9,
    reviews: 234,
    color: 'bg-blue-100'
  },
  {
    id: 2,
    name: 'Patient Management',
    description: 'Comprehensive patient records and history tracking',
    icon: Users,
    gradient: 'from-emerald-500 to-emerald-600',
    features: ['Medical history', 'Document storage', 'Patient portal'],
    rating: 4.8,
    reviews: 189,
    color: 'bg-emerald-100'
  },
  {
    id: 3,
    name: 'Billing & Payments',
    description: 'Integrated payment processing and invoice management',
    icon: CreditCard,
    gradient: 'from-purple-500 to-purple-600',
    features: ['Multiple gateways', 'Invoice generation', 'Payment tracking'],
    rating: 4.9,
    reviews: 201,
    color: 'bg-purple-100'
  },
  {
    id: 4,
    name: 'AI Prescription',
    description: 'Intelligent prescription management with drug interactions',
    icon: Zap,
    gradient: 'from-orange-500 to-orange-600',
    features: ['Drug interactions', 'Dosage calculator', 'E-prescription'],
    rating: 4.7,
    reviews: 156,
    color: 'bg-orange-100'
  },
  {
    id: 5,
    name: 'CRM System',
    description: 'Customer relationship management for patient engagement',
    icon: MessageSquare,
    gradient: 'from-pink-500 to-pink-600',
    features: ['Patient communication', 'Follow-ups', 'Engagement tracking'],
    rating: 4.8,
    reviews: 178,
    color: 'bg-pink-100'
  },
  {
    id: 6,
    name: 'Analytics Dashboard',
    description: 'Real-time insights into clinic performance and revenue',
    icon: BarChart3,
    gradient: 'from-indigo-500 to-indigo-600',
    features: ['Revenue tracking', 'Patient analytics', 'Custom reports'],
    rating: 4.9,
    reviews: 212,
    color: 'bg-indigo-100'
  },
  {
    id: 7,
    name: 'Telemedicine',
    description: 'Video consultations and remote patient care',
    icon: Video,
    gradient: 'from-cyan-500 to-cyan-600',
    features: ['Video calls', 'Screen sharing', 'Recording'],
    rating: 4.8,
    reviews: 195,
    color: 'bg-cyan-100'
  },
  {
    id: 8,
    name: 'Reports & Compliance',
    description: 'Automated compliance reporting and audit trails',
    icon: FileText,
    gradient: 'from-red-500 to-red-600',
    features: ['Compliance reports', 'Audit trails', 'Data export'],
    rating: 4.7,
    reviews: 167,
    color: 'bg-red-100'
  },
  {
    id: 9,
    name: 'WhatsApp Integration',
    description: 'Direct patient communication via WhatsApp',
    icon: MessageSquare,
    gradient: 'from-green-500 to-green-600',
    features: ['Automated messages', 'Two-way chat', 'Media sharing'],
    rating: 4.9,
    reviews: 223,
    color: 'bg-green-100'
  },
  {
    id: 10,
    name: 'Performance Analytics',
    description: 'Track doctor performance and clinic metrics',
    icon: TrendingUp,
    gradient: 'from-violet-500 to-violet-600',
    features: ['Performance metrics', 'KPI tracking', 'Benchmarking'],
    rating: 4.8,
    reviews: 188,
    color: 'bg-violet-100'
  }
];

export const PluginShowcase = () => {
  const [selectedPlugin, setSelectedPlugin] = useState(plugins[0]);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-slate-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 mb-6"
          >
            <span className="w-2 h-2 bg-blue-600 rounded-full" />
            <span className="text-sm font-semibold text-blue-700">10+ Premium Plugins</span>
          </motion.div>
          
          <h2 className="text-5xl sm:text-6xl font-black text-slate-900 mb-6">
            Everything You Need
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Modular, powerful plugins designed for modern healthcare businesses. Mix and match to build your perfect solution.
          </p>
        </ScrollReveal>

        {/* Plugin Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
          {plugins.map((plugin, index) => {
            const Icon = plugin.icon;
            return (
              <motion.div
                key={plugin.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                onMouseEnter={() => setHoveredId(plugin.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setSelectedPlugin(plugin)}
                className="cursor-pointer"
              >
                <PremiumCard hover glow gradient>
                  <div className="p-6 text-center">
                    <motion.div
                      animate={hoveredId === plugin.id ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                      className={`w-16 h-16 rounded-xl bg-gradient-to-br ${plugin.gradient} flex items-center justify-center mx-auto mb-4 shadow-lg`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="font-bold text-slate-900 mb-2 text-sm">{plugin.name}</h3>
                    <div className="flex items-center justify-center gap-1 mb-3">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-semibold text-slate-700">{plugin.rating}</span>
                    </div>
                    <p className="text-xs text-slate-600">{plugin.reviews} reviews</p>
                  </div>
                </PremiumCard>
              </motion.div>
            );
          })}
        </div>

        {/* Detailed Plugin View */}
        <motion.div
          key={selectedPlugin.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <PremiumCard gradient glow>
            <div className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${selectedPlugin.gradient} flex items-center justify-center mb-6 shadow-lg`}>
                    {React.createElement(selectedPlugin.icon, { className: 'w-10 h-10 text-white' })}
                  </div>
                  
                  <h3 className="text-3xl font-bold text-slate-900 mb-3">{selectedPlugin.name}</h3>
                  <p className="text-lg text-slate-600 mb-6">{selectedPlugin.description}</p>
                  
                  <div className="flex items-center gap-4 mb-8">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${i < Math.floor(selectedPlugin.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-slate-700">
                      {selectedPlugin.rating} ({selectedPlugin.reviews} reviews)
                    </span>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                  >
                    Learn More <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-slate-900 mb-6">Key Features</h4>
                  {selectedPlugin.features.map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-4 p-4 rounded-lg bg-white/50 border border-white/50 hover:bg-white/80 transition-all"
                    >
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-sm font-bold">✓</span>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{feature}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </PremiumCard>
        </motion.div>
      </div>
    </section>
  );
};
