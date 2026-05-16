import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, Calendar, Bell, Activity } from 'lucide-react';

export const DashboardPreview = () => {
  const stats = [
    { label: 'Appointments', value: '2,847', icon: Calendar, color: 'from-blue-500 to-blue-600' },
    { label: 'Patients', value: '1,234', icon: Users, color: 'from-emerald-500 to-emerald-600' },
    { label: 'Revenue', value: '$45.2K', icon: TrendingUp, color: 'from-purple-500 to-purple-600' },
    { label: 'Alerts', value: '12', icon: Bell, color: 'from-orange-500 to-orange-600' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-3xl blur-3xl" />
      
      <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 border border-slate-700/50 shadow-2xl overflow-hidden">
        {/* Grid background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255,255,255,.05) 25%, rgba(255,255,255,.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.05) 75%, rgba(255,255,255,.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255,255,255,.05) 25%, rgba(255,255,255,.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.05) 75%, rgba(255,255,255,.05) 76%, transparent 77%, transparent)',
            backgroundSize: '50px 50px'
          }} />
        </div>

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-white font-bold text-lg">Dashboard</h3>
              <p className="text-slate-400 text-sm">Real-time analytics</p>
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <Activity className="w-6 h-6 text-blue-400" />
            </motion.div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all"
                >
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-slate-400 text-xs mb-1">{stat.label}</p>
                  <p className="text-white font-bold text-lg">{stat.value}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Chart */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-white font-semibold">Revenue Trend</h4>
              <span className="text-emerald-400 text-sm font-semibold">+12.5%</span>
            </div>
            
            <div className="flex items-end justify-between h-32 gap-2">
              {[40, 60, 45, 75, 55, 80, 65, 90].map((height, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="flex-1 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg opacity-80 hover:opacity-100 transition-opacity"
                />
              ))}
            </div>
          </div>

          {/* Activity Feed */}
          <div className="mt-6 space-y-3">
            {[
              { time: '2 min ago', action: 'New appointment scheduled' },
              { time: '15 min ago', action: 'Payment received - $250' },
              { time: '1 hour ago', action: 'Patient check-in completed' }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="flex items-center justify-between text-sm border-t border-white/5 pt-3"
              >
                <span className="text-slate-300">{item.action}</span>
                <span className="text-slate-500 text-xs">{item.time}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
