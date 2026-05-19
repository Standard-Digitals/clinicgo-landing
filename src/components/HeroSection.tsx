import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Sparkles, Calendar, Star } from 'lucide-react';
import { Button } from './ui/button';

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-cyan-50 to-green-50 dark:from-blue-950/20 dark:via-cyan-950/20 dark:to-green-950/20" />
      
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], rotate: [90, 0, 90] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-cyan-400/20 to-green-400/20 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-full mb-6"
            >
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">Trusted by 500+ Clinics & Healthcare Teams</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6">
              Transform Your Clinic Into a{' '}
              <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-green-500 bg-clip-text text-transparent">
                Smart Healthcare Business
              </span>{' '}
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-xl">
              Manage appointments, billing, staff, inventory, follow-ups, and patient workflows — all from one powerful WordPress platform built for modern clinics.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button href="/signup" size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white cursor-pointer text-lg px-8">
                Start Free <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button href="/contact" size="lg" variant="outline" className="text-lg px-8 cursor-pointer">
                <Play className="mr-2 w-5 h-5" /> Live Demo
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative bg-white dark:bg-gradient-to-r from-blue-600 via-cyan-500 to-green-500 rounded-2xl shadow-2xl p-2">
              <img src="/images/dashboard.png" alt="Dashboard" className="w-full h-auto rounded-2xl" />
            </div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-6 -right-6 bg-white dark:bg-gradient-to-r from-blue-600 via-cyan-500 to-green-500 rounded-xl shadow-xl p-3"
            >
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-blue-600 dark:text-white" />
                <span className="text-sm font-medium dark:text-white">New Appointment</span>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-6 -left-6 bg-white dark:bg-gradient-to-r from-blue-600 via-cyan-500 to-green-500 rounded-xl shadow-xl p-3"
            >
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-500 dark:text-white" />
                <span className="text-sm font-medium dark:text-white">5.0 Rating</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
