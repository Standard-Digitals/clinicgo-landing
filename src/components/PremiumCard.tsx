import React from 'react';
import { motion } from 'framer-motion';

interface PremiumCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  gradient?: boolean;
  onClick?: () => void;
}

export const PremiumCard = ({
  children,
  className = '',
  hover = true,
  glow = false,
  gradient = false,
  onClick
}: PremiumCardProps) => {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.01 } : {}}
      className={`
        rounded-2xl border backdrop-blur-xl transition-all duration-300
        ${gradient 
          ? 'bg-gradient-to-br from-white/80 to-slate-50/80 border-white/20' 
          : 'bg-white/70 border-white/30'
        }
        ${glow ? 'shadow-lg shadow-blue-500/10' : 'shadow-lg'}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export const GlassCard = ({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode; 
  className?: string;
}) => (
  <div className={`
    bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl
    shadow-xl shadow-black/5 ${className}
  `}>
    {children}
  </div>
);

export const FeatureCard = ({
  icon,
  title,
  description,
  features,
  gradient,
  index = 0
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  gradient: string;
  index?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
  >
    <PremiumCard hover glow gradient>
      <div className="p-8">
        <div className={`w-14 h-14 rounded-xl ${gradient} flex items-center justify-center mb-6 shadow-lg`}>
          {icon}
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
        <p className="text-slate-600 mb-6">{description}</p>
        <ul className="space-y-3">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <div className="w-2 h-2 bg-blue-600 rounded-full" />
              </div>
              <span className="text-sm text-slate-700">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </PremiumCard>
  </motion.div>
);
