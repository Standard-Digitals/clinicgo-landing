import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, ArrowRight } from 'lucide-react';
import { PremiumCard } from './PremiumCard';
import { PremiumButton } from './PremiumButton';
import { ScrollReveal } from '../lib/animations';

const plans = [
  {
    name: 'Starter',
    description: 'Perfect for small clinics',
    price: '₹4,999',
    period: '/month',
    features: [
      { text: 'Up to 500 appointments/month', included: true },
      { text: 'Basic scheduling', included: true },
      { text: 'Patient management', included: true },
      { text: 'Email support', included: true },
      { text: 'Mobile app', included: false },
      { text: 'Advanced analytics', included: false },
      { text: 'API access', included: false },
      { text: 'Custom integrations', included: false }
    ],
    highlighted: false,
    cta: 'Start Free Trial'
  },
  {
    name: 'Professional',
    description: 'For growing clinics',
    price: '₹9,999',
    period: '/month',
    features: [
      { text: 'Unlimited appointments', included: true },
      { text: 'Smart scheduling', included: true },
      { text: 'Patient management', included: true },
      { text: 'Priority support', included: true },
      { text: 'Mobile app', included: true },
      { text: 'Advanced analytics', included: true },
      { text: 'API access', included: false },
      { text: 'Custom integrations', included: false }
    ],
    highlighted: true,
    cta: 'Get Started'
  },
  {
    name: 'Enterprise',
    description: 'For large organizations',
    price: 'Custom',
    period: 'pricing',
    features: [
      { text: 'Unlimited everything', included: true },
      { text: 'AI-powered scheduling', included: true },
      { text: 'Advanced patient management', included: true },
      { text: '24/7 dedicated support', included: true },
      { text: 'Mobile app', included: true },
      { text: 'Advanced analytics', included: true },
      { text: 'Full API access', included: true },
      { text: 'Custom integrations', included: true }
    ],
    highlighted: false,
    cta: 'Contact Sales'
  }
];

export const PricingSection = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <ScrollReveal className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 border border-purple-200 mb-6"
          >
            <span className="w-2 h-2 bg-purple-600 rounded-full" />
            <span className="text-sm font-semibold text-purple-700">Transparent Pricing</span>
          </motion.div>
          
          <h2 className="text-5xl sm:text-6xl font-black text-slate-900 mb-6">
            Plans for Every Clinic
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
            Choose the perfect plan for your clinic. All plans include a 14-day free trial.
          </p>

          {/* Billing Toggle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-4 bg-slate-100 p-1 rounded-full"
          >
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-white text-blue-600 shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                billingCycle === 'annual'
                  ? 'bg-white text-blue-600 shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Annual <span className="text-xs text-emerald-600 font-bold ml-1">Save 20%</span>
            </button>
          </motion.div>
        </ScrollReveal>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={plan.highlighted ? 'md:scale-105' : ''}
            >
              <PremiumCard
                hover
                glow={plan.highlighted}
                gradient={plan.highlighted}
                className={plan.highlighted ? 'border-blue-400 shadow-2xl' : ''}
              >
                <div className="p-8 h-full flex flex-col">
                  {plan.highlighted && (
                    <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 border border-blue-300 w-fit">
                      <span className="w-2 h-2 bg-blue-600 rounded-full" />
                      <span className="text-xs font-bold text-blue-700">Most Popular</span>
                    </div>
                  )}

                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                  <p className="text-slate-600 mb-6">{plan.description}</p>

                  <div className="mb-8">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-black text-slate-900">{plan.price}</span>
                      <span className="text-slate-600">{plan.period}</span>
                    </div>
                  </div>

                  <PremiumButton
                    variant={plan.highlighted ? 'gradient' : 'secondary'}
                    size="lg"
                    className="w-full mb-8"
                    icon={<ArrowRight className="w-5 h-5" />}
                  >
                    {plan.cta}
                  </PremiumButton>

                  <div className="space-y-4 flex-1">
                    {plan.features.map((feature, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-center gap-3"
                      >
                        {feature.included ? (
                          <Check className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                        ) : (
                          <X className="w-5 h-5 text-slate-300 flex-shrink-0" />
                        )}
                        <span className={feature.included ? 'text-slate-700' : 'text-slate-400'}>
                          {feature.text}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </PremiumCard>
            </motion.div>
          ))}
        </div>

        {/* FAQ CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-slate-600 mb-4">
            Have questions? <a href="#faq" className="text-blue-600 font-semibold hover:underline">Check our FAQ</a> or <a href="#contact" className="text-blue-600 font-semibold hover:underline">contact sales</a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};
