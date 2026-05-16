import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Users, Zap, Code, Globe, Award, ArrowRight } from 'lucide-react';
import { FaqSection } from '../components/FaqSection';
import { CTASection } from '../components/CTASection';

export default function About() {
  return (
    <main className="bg-white pt-20">
      {/* HERO */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20"></div>
        </div>

        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 mb-6">
            Building the Future of
            <span className="text-blue-600"> Clinic Management</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            We create powerful, flexible plugins that help clinics operate smarter. Our mission is to provide tools that adapt to your workflow, not the other way around.
          </p>
        </div>
      </section>

      {/* OUR PHILOSOPHY */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Plugin Philosophy</h2>
            <p className="text-xl text-slate-600">Why we build the way we do</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Code,
                title: 'Modular Design',
                desc: 'Each plugin is independent. Use what you need, skip what you don\'t. Mix and match to build your perfect clinic system.'
              },
              {
                icon: Zap,
                title: 'Performance First',
                desc: 'Lightweight, fast, and optimized. Our plugins load instantly and don\'t slow down your clinic operations.'
              },
              {
                icon: Globe,
                title: 'Seamless Integration',
                desc: 'Plugins work together beautifully. Data flows seamlessly between scheduling, payments, analytics, and more.'
              }
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="bg-white rounded-xl p-8 border border-slate-200 hover:shadow-lg transition-all">
                  <Icon className="w-12 h-12 text-blue-600 mb-4" />
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-600">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PLUGIN ECOSYSTEM */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Plugin Ecosystem</h2>
            <p className="text-xl text-slate-600">50+ plugins across 6 major categories</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: '📅', name: 'Scheduling', count: '8 plugins', desc: 'Smart scheduling, conflict detection, resource allocation' },
              { icon: '📱', name: 'Notifications', count: '6 plugins', desc: 'SMS, Email, WhatsApp reminders and follow-ups' },
              { icon: '📊', name: 'Analytics', count: '5 plugins', desc: 'Revenue tracking, patient insights, custom reports' },
              { icon: '💳', name: 'Payments', count: '4 plugins', desc: 'Stripe, PayPal, invoicing, subscription management' },
              { icon: '👥', name: 'Patient Tools', count: '7 plugins', desc: 'Self-service portal, document upload, history tracking' },
              { icon: '🔗', name: 'Integrations', count: '9 plugins', desc: 'Google Calendar, Outlook, EHR systems, webhooks' }
            ].map((cat, i) => (
              <div key={i} className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-8 border border-slate-200 hover:shadow-lg transition-all">
                <div className="text-4xl mb-3">{cat.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">{cat.name}</h3>
                <p className="text-sm text-blue-600 font-semibold mb-3">{cat.count}</p>
                <p className="text-slate-600 text-sm">{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM & EXPERTISE */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Built by Experts</h2>
            <p className="text-xl text-slate-600">Healthcare professionals and software engineers</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2">Healthcare Experience</h3>
                <p className="text-slate-600">Our team includes doctors, clinic managers, and healthcare IT specialists who understand your challenges firsthand.</p>
              </div>
              <div className="bg-white rounded-lg p-6 border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2">Software Excellence</h3>
                <p className="text-slate-600">Experienced developers with 15+ years building scalable, secure healthcare software.</p>
              </div>
              <div className="bg-white rounded-lg p-6 border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2">Customer-Centric</h3>
                <p className="text-slate-600">We listen to feedback and continuously improve our plugins based on real user needs.</p>
              </div>
              <div className="bg-white rounded-lg p-6 border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2">Security First</h3>
                <p className="text-slate-600">HIPAA compliant, SOC 2 certified, with military-grade encryption for patient data.</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-12 border border-slate-200">
              <div className="space-y-8">
                <div className="text-center">
                  <div className="text-5xl font-bold text-blue-600 mb-2">50+</div>
                  <p className="text-slate-600">Plugins Developed</p>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold text-blue-600 mb-2">10K+</div>
                  <p className="text-slate-600">Active Users</p>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold text-blue-600 mb-2">4.8★</div>
                  <p className="text-slate-600">Average Rating</p>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold text-blue-600 mb-2">99.9%</div>
                  <p className="text-slate-600">Uptime SLA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Why Choose Our Plugins</h2>
            <p className="text-xl text-slate-600">What sets us apart</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: 'Easy Installation', desc: 'Install any plugin in minutes. No coding required.' },
              { title: 'Regular Updates', desc: 'New features and security patches every month.' },
              { title: 'Expert Support', desc: '24/7 support team ready to help you succeed.' },
              { title: 'Flexible Pricing', desc: 'Pay only for what you use. Scale as you grow.' },
              { title: 'Data Privacy', desc: 'Your data is yours. We never sell or share it.' },
              { title: 'Community', desc: 'Join 10K+ clinic owners using our plugins.' }
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                  <p className="text-slate-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTEGRATION SHOWCASE */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Integrations & Compatibility</h2>
            <p className="text-xl text-slate-600">Works with tools you already use</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Google Calendar', icon: '📅' },
              { name: 'Outlook', icon: '📧' },
              { name: 'Stripe', icon: '💳' },
              { name: 'PayPal', icon: '🏦' },
              { name: 'Slack', icon: '💬' },
              { name: 'Zapier', icon: '⚡' },
              { name: 'WhatsApp', icon: '📱' },
              { name: 'Twilio', icon: '☎️' }
            ].map((integration, i) => (
              <div key={i} className="bg-white rounded-lg p-6 border border-slate-200 text-center hover:shadow-lg transition-all">
                <div className="text-4xl mb-3">{integration.icon}</div>
                <p className="font-semibold text-slate-900">{integration.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST INDICATORS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Trusted by Healthcare Professionals</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Award, title: 'HIPAA Compliant', desc: 'Full compliance with healthcare privacy regulations' },
              { icon: CheckCircle2, title: 'SOC 2 Certified', desc: 'Security and availability audited annually' },
              { icon: Zap, title: '99.9% Uptime', desc: 'Enterprise-grade infrastructure and redundancy' }
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-8 border border-emerald-200 text-center">
                  <Icon className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                  <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection />
    </main>
  );
}
