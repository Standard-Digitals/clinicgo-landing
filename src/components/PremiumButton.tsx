import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface PremiumButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
}

export const PremiumButton = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  onClick,
  href,
  disabled = false
}: PremiumButtonProps) => {
  const baseClasses = 'font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/30 focus:ring-blue-500',
    secondary: 'bg-slate-200 text-slate-900 hover:bg-slate-300 focus:ring-slate-400',
    ghost: 'bg-transparent text-slate-900 border-2 border-slate-300 hover:border-blue-600 hover:text-blue-600',
    gradient: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-xl shadow-lg shadow-blue-600/30 focus:ring-blue-500'
  };

  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  const content = (
    <>
      {children}
      {icon && icon}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={classes}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
      {content}
    </motion.button>
  );
};

export const PremiumCTA = ({ 
  text, 
  subtext, 
  onClick 
}: { 
  text: string; 
  subtext?: string; 
  onClick?: () => void;
}) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="group cursor-pointer"
    onClick={onClick}
  >
    <div className="flex items-center gap-3">
      <span className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
        {text}
      </span>
      <motion.div
        animate={{ x: [0, 4, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <ArrowRight className="w-5 h-5 text-blue-600" />
      </motion.div>
    </div>
    {subtext && <p className="text-sm text-slate-600 mt-1">{subtext}</p>}
  </motion.div>
);
