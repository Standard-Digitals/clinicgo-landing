import React from 'react';
import { motion } from 'framer-motion';
import {
  Shield, Zap, Globe, Users, BarChart3, Lock,
  Smartphone, Cloud, Headphones, Gauge
} from 'lucide-react';
import { FeatureCard } from './PremiumCard';
import { ScrollReveal } from '../lib/animations';

const features = [
  {
    icon: <Shield className="w-6 h-6 text-white" />,
    title: 'Enterprise Security',
    description: 'HIPAA compliant with end-to-end encryption',
    features: ['256-bit encryption', 'Audit logs', 'Data backup'],
    gradient: 'from-blue-500 to-blue-600'
  },
  {
    icon: <Zap className="w-6 h-6 text-white" />,
    title: 'Lightning Fast',
    description: 'Sub-second response times globally',
    features: ['CDN optimized', 'Auto-scaling', 'Zero downtime'],
    gradient: 'from-yellow-500 to-yellow-600'
  },
  {
    icon: <Globe className="w-6 h-6 text-white" />,
    title: 'Global Infrastructure',
    description: 'Deployed across 6 continents',
    features: ['99.9% uptime', 'Low latency', 'Redundancy'],
    gradient: 'from-emerald-500 to-emerald-600'
  },
  {
    icon: <Users className="w-6 h-6 text-white" />,
    title: 'Team Collaboration',
    description: 'Real-time collaboration tools',
    features: ['Role-based access', 'Activity tracking', 'Permissions'],
    gradient: 'from-purple-500 to-purple-600'
  },
  {
    icon: <BarChart3 className="w-6 h-6 text-white" />,
    title: 'Advanced Analytics',
    description: 'Deep insights into your clinic operations',
    features: ['Real-time dashboards', 'Custom reports', 'Predictions'],
    gradient: 'from-pink-500 to-pink-600'
  },
  {
    icon: <Lock className="w-6 h-6 text-white" />,
    title: 'Data Privacy',
    description: 'Your data is yours, always',
    features: ['GDPR compliant', 'Data ownership', 'Export anytime'],
    gradient: 'from-indigo-500 to-indigo-600'
  },
  {
    icon: <Smartphone className="w-6 h-6 text-white" />,
    title: 'Mobile First',
    description: 'Full-featured mobile apps',
    features: ['iOS & Android', 'Offline mode', 'Push notifications'],
    gradient: 'from-cyan-500 to-cyan-600'
  },
  {
    icon: <Cloud className="w-6 h-6 text-white" />,
    title: 'Cloud Native',
    description: 'Built for the cloud',
    features: ['Auto-scaling', 'Load balancing', 'Disaster recovery'],
    gradient: 'from-blue-400 to-blue-500'
  },
  {
    icon: <Headphones className="w-6 h-6 text-white" />,
    title: '24/7 Support',
    description: 'Expert support whenever you need it',
    features: ['Live chat', 'Email support', 'Phone support'],
    gradient: 'from-orange-500 to-orange-600'
  },
  {
    icon: <Gauge className="w-6 h-6 text-white" />,
    title: 'Performance Monitoring',
    description: 'Monitor every metric that matters',
    features: ['Real-time alerts', 'Performance metrics', 'Optimization'],
    gradient: 'from-red-500 to-red-600'
  }
];

export const FeaturesSection = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <ScrollReveal className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 mb-6"
          >
            <span className="w-2 h-2 bg-emerald-600 rounded-full" />
            <span className="text-sm font-semibold text-emerald-700">Enterprise Features</span>
          </motion.div>
          
          <h2 className="text-5xl sm:text-6xl font-black text-slate-900 mb-6">
            Built for Enterprise
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Enterprise-grade features designed for healthcare organizations that demand reliability, security, and performance.
          </p>
        </ScrollReveal>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              features={feature.features}
              gradient={feature.gradient}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
