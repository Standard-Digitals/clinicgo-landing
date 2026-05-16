import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, CheckCircle2 } from 'lucide-react';
import { PremiumButton } from './PremiumButton';
import { ScrollReveal } from '../lib/animations';
import { Button } from './ui/button';

export const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-cyan-500 to-green-500" />
      <div className="absolute inset-0 bg-grid-white/10" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-white"
        >
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            Transform Your Clinic Management Today
          </h2>
          <p className="text-xl lg:text-2xl mb-12 opacity-90 max-w-3xl mx-auto">
            Join thousands of healthcare professionals who trust ClinicGo
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 cursor-pointer" href="/signup">
              Start Free <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 cursor-pointer bg-white/10 hover:bg-white/20 text-white border-white/30" href="/contact">  
              Book Demo
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
