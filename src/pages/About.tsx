import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Users, Zap, Code, Globe, Award } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { CTASection } from '../components/CTASection';

export default function About() {
  return (
    <main className="bg-background pt-20">
      {/* HERO */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 via-cyan-50 to-green-50 dark:from-blue-950/20 dark:via-cyan-950/20 dark:to-green-950/20" />
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge variant="outline" className="mb-4">About Us</Badge>
            <h1 className="text-5xl sm:text-6xl font-bold text-foreground mb-6">
              Building the Future of
              <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-green-500 bg-clip-text text-transparent"> Clinic Management</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We create powerful, flexible plugins that help clinics operate smarter. Our mission is to provide tools that adapt to your workflow, not the other way around.
            </p>
          </motion.div>
        </div>
      </section>

      {/* OUR PHILOSOPHY */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-blue-50/30 dark:to-blue-950/10">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Philosophy</Badge>
            <h2 className="text-4xl font-bold text-foreground mb-4">Our Plugin Philosophy</h2>
            <p className="text-xl text-muted-foreground">Why we build the way we do</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Code, title: 'Modular Design', desc: "Each plugin is independent. Use what you need, skip what you don't. Mix and match to build your perfect clinic system." },
              { icon: Zap, title: 'Performance First', desc: "Lightweight, fast, and optimized. Our plugins load instantly and don't slow down your clinic operations." },
              { icon: Globe, title: 'Seamless Integration', desc: 'Plugins work together beautifully. Data flows seamlessly between scheduling, payments, analytics, and more.' }
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -4 }}>
                  <Card className="h-full border-border hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white mb-3">
                        <Icon className="w-6 h-6" />
                      </div>
                      <CardTitle>{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PLUGIN ECOSYSTEM */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Ecosystem</Badge>
            <h2 className="text-4xl font-bold text-foreground mb-4">Our Plugin Ecosystem</h2>
            <p className="text-xl text-muted-foreground">50+ plugins across 6 major categories</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: '📅', name: 'Scheduling', count: '8 plugins', desc: 'Smart scheduling, conflict detection, resource allocation' },
              { icon: '📱', name: 'Notifications', count: '6 plugins', desc: 'SMS, Email, WhatsApp reminders and follow-ups' },
              { icon: '📊', name: 'Analytics', count: '5 plugins', desc: 'Revenue tracking, patient insights, custom reports' },
              { icon: '💳', name: 'Payments', count: '4 plugins', desc: 'Stripe, PayPal, invoicing, subscription management' },
              { icon: '👥', name: 'Patient Tools', count: '7 plugins', desc: 'Self-service portal, document upload, history tracking' },
              { icon: '🔗', name: 'Integrations', count: '9 plugins', desc: 'Google Calendar, Outlook, EHR systems, webhooks' }
            ].map((cat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} whileHover={{ y: -4 }}>
                <Card className="h-full border-border hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg">
                  <CardHeader>
                    <div className="text-4xl mb-2">{cat.icon}</div>
                    <CardTitle>{cat.name}</CardTitle>
                    <p className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">{cat.count}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{cat.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM & STATS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-blue-50/30 dark:to-blue-950/10">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Our Team</Badge>
            <h2 className="text-4xl font-bold text-foreground mb-4">Built by Experts</h2>
            <p className="text-xl text-muted-foreground">Healthcare professionals and software engineers</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              {[
                { title: 'Healthcare Experience', desc: 'Our team includes doctors, clinic managers, and healthcare IT specialists who understand your challenges firsthand.' },
                { title: 'Software Excellence', desc: 'Experienced developers with 15+ years building scalable, secure healthcare software.' },
                { title: 'Customer-Centric', desc: 'We listen to feedback and continuously improve our plugins based on real user needs.' },
                { title: 'Security First', desc: 'HIPAA compliant, SOC 2 certified, with military-grade encryption for patient data.' }
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <Card className="border-border hover:border-blue-500/50 transition-all duration-300">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
              <Card className="border-border bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30">
                <CardContent className="p-12 space-y-8">
                  {[
                    { value: '50+', label: 'Plugins Developed' },
                    { value: '10K+', label: 'Active Users' },
                    { value: '4.8★', label: 'Average Rating' },
                    { value: '99.9%', label: 'Uptime SLA' }
                  ].map((stat, i) => (
                    <div key={i} className="text-center">
                      <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-1">{stat.value}</div>
                      <p className="text-muted-foreground text-sm">{stat.label}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Why Us</Badge>
            <h2 className="text-4xl font-bold text-foreground mb-4">Why Choose Our Plugins</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'Easy Installation', desc: 'Install any plugin in minutes. No coding required.' },
              { title: 'Regular Updates', desc: 'New features and security patches every month.' },
              { title: 'Expert Support', desc: '24/7 support team ready to help you succeed.' },
              { title: 'Flexible Pricing', desc: 'Pay only for what you use. Scale as you grow.' },
              { title: 'Data Privacy', desc: 'Your data is yours. We never sell or share it.' },
              { title: 'Community', desc: 'Join 10K+ clinic owners using our plugins.' }
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="flex gap-4">
                <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST INDICATORS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-blue-50/30 dark:to-blue-950/10">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Trusted by Healthcare Professionals</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Award, title: 'HIPAA Compliant', desc: 'Full compliance with healthcare privacy regulations' },
              { icon: CheckCircle2, title: 'SOC 2 Certified', desc: 'Security and availability audited annually' },
              { icon: Zap, title: '99.9% Uptime', desc: 'Enterprise-grade infrastructure and redundancy' }
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -4 }}>
                  <Card className="text-center border-border hover:border-emerald-500/50 transition-all duration-300 hover:shadow-lg bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20">
                    <CardContent className="p-8">
                      <Icon className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                      <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
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
