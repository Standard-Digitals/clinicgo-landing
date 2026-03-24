import React, { useState } from 'react';
import { Check, Users, Zap, ShieldCheck, HelpCircle } from 'lucide-react';

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
    <main className="pt-24 pb-20">
      {/* Hero Section */}
      <section className="relative pt-8 sm:pt-12 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-slate-50 to-slate-50"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] opacity-30 bg-gradient-to-b from-blue-200 to-transparent blur-3xl -z-10"></div>
        
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/50 border border-blue-200 text-blue-700 text-xs sm:text-sm font-semibold mb-6">
            <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>Flexible scaling for growing clinics</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 mb-4 sm:mb-6 tracking-tight">
            Simple, transparent <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">pricing</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Start with our core plan and add more doctor services only when your practice needs them. No hidden fees, no surprise charges.
          </p>
        </div>
      </section>

      {/* Pricing Calculator */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto mb-16 sm:mb-24">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-slate-200 overflow-hidden flex flex-col lg:flex-row">
          
          {/* Left Side: Calculator */}
          <div className="p-6 sm:p-8 lg:p-12 lg:w-3/5 border-b lg:border-b-0 lg:border-r border-slate-200 bg-slate-50">
            <div className="mb-8 sm:mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">Customize your plan</h2>
              <p className="text-sm sm:text-base text-slate-600">Select your billing cycle and team size.</p>
            </div>
            
            {/* Premium Segmented Toggle */}
            <div className="bg-white p-1.5 sm:p-2 rounded-2xl border border-slate-200 shadow-sm mb-8 sm:mb-10 flex relative">
              <button 
                onClick={() => setIsYearly(false)}
                className={`relative z-10 flex-1 py-2.5 sm:py-3 text-xs sm:text-sm font-bold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 ${!isYearly ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
              >
                Monthly Billing
              </button>
              <button 
                onClick={() => setIsYearly(true)}
                className={`relative z-10 flex-1 py-2.5 sm:py-3 text-xs sm:text-sm font-bold rounded-xl transition-all duration-300 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 ${isYearly ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
              >
                <span>Yearly Billing</span>
                <span className={`text-[8px] sm:text-[10px] uppercase tracking-wider font-extrabold px-1.5 sm:px-2 py-0.5 rounded-full transition-colors ${isYearly ? 'bg-blue-500 text-white border border-blue-400' : 'bg-emerald-100 text-emerald-700'}`}>Save 16%</span>
              </button>
            </div>
            
            <div className="mb-12">
              <div className="flex justify-between items-end mb-4">
                <label htmlFor="doctors-slider" className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-600" />
                  Number of Doctor Services
                </label>
                <div className="text-2xl font-bold text-blue-600 bg-blue-100 px-4 py-1 rounded-lg">
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
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-2 font-medium">
                <span>1</span>
                <span>Includes 5</span>
                <span>50+</span>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
              <h3 className="text-sm font-bold text-blue-900 uppercase tracking-wider mb-2">How pricing works</h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-blue-600">•</span>
                  <span>Base plan is <strong>${basePrice}/{isYearly ? 'year' : 'month'}</strong> and includes up to <strong>5 doctor services</strong>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-blue-600">•</span>
                  <span>Each additional doctor service beyond 5 is just <strong>${extraDoctorPrice}/{isYearly ? 'year' : 'month'}</strong>.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Side: Price Display & Features */}
          <div className="p-8 lg:p-12 lg:w-2/5 bg-white flex flex-col">
            <div className="mb-8">
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Estimated Total</p>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-extrabold text-slate-900">${calculatePrice()}</span>
                <span className="text-slate-500 font-medium">/{isYearly ? 'year' : 'month'}</span>
              </div>
              {doctors > 5 && (
                <p className="text-sm text-emerald-600 font-medium mt-2">
                  ${basePrice} base + ${(doctors - 5) * extraDoctorPrice} for {doctors - 5} extra services
                </p>
              )}
            </div>

            <button className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold rounded-xl transition-colors shadow-md shadow-blue-200 mb-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Get Started Now
            </button>

            <div className="flex-1">
              <p className="text-sm font-bold text-slate-900 mb-4">Everything in the plan:</p>
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
                  <li key={i} className="flex items-center gap-3 text-sm text-slate-600">
                    <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-slate-900">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-6">
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
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-blue-600" />
                {faq.q}
              </h3>
              <p className="text-slate-600 ml-7">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
