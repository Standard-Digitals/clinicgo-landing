import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Users, Zap, HelpCircle } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(true);
  const [doctors, setDoctors] = useState(5);
  
  const basePrice = isYearly ? 490 : 49;
  const extraDoctorPrice = isYearly ? 150 : 15;

  const calculatePrice = () => {
    if (doctors <= 5) return basePrice;
    return basePrice + (doctors - 5) * extraDoctorPrice;
  };

  return (
    <main className="bg-background pt-24 pb-20">
      {/* Hero Section */}
      <section className="relative pt-8 sm:pt-12 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 via-cyan-50 to-green-50 dark:from-blue-950/20 dark:via-cyan-950/20 dark:to-green-950/20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] opacity-30 bg-gradient-to-b from-blue-400/20 to-transparent blur-3xl -z-10" />
        
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-4xl mx-auto">
          <Badge variant="outline" className="mb-4">
            <Zap className="w-3 h-3 mr-1" /> Flexible scaling for growing clinics
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-foreground mb-4 sm:mb-6 tracking-tight">
            Simple, transparent{' '}
            <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-green-500 bg-clip-text text-transparent">pricing</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Start with our core plan and add more doctor services only when your practice needs them. No hidden fees, no surprise charges.
          </p>
        </motion.div>
      </section>

      {/* Pricing Calculator */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto mb-16 sm:mb-24">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Card className="overflow-hidden border-border shadow-2xl">
            <div className="flex flex-col lg:flex-row">
              {/* Left Side: Calculator */}
              <div className="p-6 sm:p-8 lg:p-12 lg:w-3/5 border-b lg:border-b-0 lg:border-r border-border bg-muted/30">
                <div className="mb-8 sm:mb-10">
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Customize your plan</h2>
                  <p className="text-sm sm:text-base text-muted-foreground">Select your billing cycle and team size.</p>
                </div>
                
                {/* Toggle */}
                <div className="bg-card p-1.5 sm:p-2 rounded-2xl border border-border shadow-sm mb-8 sm:mb-10 flex">
                  <button 
                    onClick={() => setIsYearly(true)}
                    className={`flex-1 py-2.5 sm:py-3 text-xs sm:text-sm font-bold rounded-xl transition-all duration-300 ${!isYearly ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    Monthly Billing
                  </button>
                  <button 
                    onClick={() => setIsYearly(false)}
                    className={`flex-1 py-2.5 sm:py-3 text-xs sm:text-sm font-bold rounded-xl transition-all duration-300 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 ${isYearly ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    <span>Yearly Billing</span>
                    <span className={`text-[8px] sm:text-[10px] uppercase tracking-wider font-extrabold px-1.5 sm:px-2 py-0.5 rounded-full ${isYearly ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'}`}>Save 16%</span>
                  </button>
                </div>
                
                {/* Slider */}
                <div className="mb-12">
                  <div className="flex justify-between items-end mb-4">
                    <label htmlFor="doctors-slider" className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-600" />
                      Number of Doctor Services
                    </label>
                    <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent bg-blue-50 dark:bg-blue-950/30 px-4 py-1 rounded-lg border border-border">
                      {doctors}
                    </div>
                  </div>
                  
                  <input 
                    id="doctors-slider"
                    type="range" 
                    min="1" 
                    max="50" 
                    value={doctors} 
                    onChange={(e) => setDoctors(parseInt(e.target.value))}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2 font-medium">
                    <span>1</span>
                    <span>Includes 5</span>
                    <span>50+</span>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
                  <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-2">How pricing works</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-blue-600">•</span>
                      <span>Base plan is <strong className="text-foreground">${basePrice}/{isYearly ? 'year' : 'month'}</strong> and includes up to <strong className="text-foreground">5 doctor services</strong>.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-blue-600">•</span>
                      <span>Each additional doctor service beyond 5 is just <strong className="text-foreground">${extraDoctorPrice}/{isYearly ? 'year' : 'month'}</strong>.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Right Side: Price Display & Features */}
              <div className="p-8 lg:p-12 lg:w-2/5 bg-card flex flex-col">
                <div className="mb-8">
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Estimated Total</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-extrabold text-foreground">${calculatePrice()}</span>
                    <span className="text-muted-foreground font-medium">/{isYearly ? 'year' : 'month'}</span>
                  </div>
                  {doctors > 5 && (
                    <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium mt-2">
                      ${basePrice} base + ${(doctors - 5) * extraDoctorPrice} for {doctors - 5} extra services
                    </p>
                  )}
                </div>

                <Link to="/signup" className="block w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold rounded-xl transition-all shadow-lg mb-8 text-center">
                  Get Started Now
                </Link>

                <div className="flex-1">
                  <p className="text-sm font-bold text-foreground mb-4">Everything in the plan:</p>
                  <ul className="space-y-3">
                    {[
                      "Unlimited appointments",
                      "Automated email notifications",
                      "Customizable booking forms",
                      "Google Calendar sync",
                      "Stripe & PayPal integration",
                      "Premium technical support",
                      "Continuous plugin updates"
                    ].map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <Badge variant="outline" className="mb-4">FAQ</Badge>
          <h2 className="text-3xl font-bold text-foreground">Frequently Asked Questions</h2>
        </motion.div>
        <div className="space-y-4">
          {[
            {
              q: "What counts as a 'Doctor Service'?",
              a: "A doctor service is an individual bookable calendar. If you have 3 doctors, each needing their own schedule, that counts as 3 services. The base plan covers up to 5."
            },
            {
              q: "Can I add more doctors later?",
              a: "Absolutely. You can upgrade your license at any time from your account dashboard. You'll only pay the prorated difference for the new services."
            },
            {
              q: "Is this a one-time payment or subscription?",
              a: "It is a subscription billed either monthly or annually. This ensures you continue to receive security updates, new features, and premium technical support."
            },
            {
              q: "Do you offer refunds?",
              a: "Yes, we offer a 14-day money-back guarantee. If the plugin doesn't meet your needs, let us know within 14 days for a full refund."
            }
          ].map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <Card className="border-border hover:border-blue-500/50 transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-blue-600" />
                    {faq.q}
                  </h3>
                  <p className="text-muted-foreground ml-7">{faq.a}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
