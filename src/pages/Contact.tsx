import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageSquare, Clock, Users, Zap } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { CTASection } from '../components/CTASection';
import { FaqSection } from '../components/FaqSection';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    clinic: '',
    pluginInterest: 'general',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');
    try {
      const form = new FormData();
      form.append('form-name', 'contact');
      Object.entries(formData).forEach(([key, val]) => form.append(key, val));
      const res = await fetch('/', { method: 'POST', body: form });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', clinic: '', pluginInterest: 'general', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-background pt-20">
      {/* HERO */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 via-cyan-50 to-green-50 dark:from-blue-950/20 dark:via-cyan-950/20 dark:to-green-950/20" />
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge variant="outline" className="mb-4">Contact</Badge>
            <h1 className="text-5xl sm:text-6xl font-bold text-foreground mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Have questions about our plugins? Need help choosing the right tools? Our expert team is here to help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CONTACT METHODS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-blue-50/30 dark:to-blue-950/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { icon: Mail, title: 'Email Support', desc: 'Get detailed responses to your questions', contact: 'support@clinicgo.com', time: 'Response within 24 hours' },
              { icon: Phone, title: 'Phone Support', desc: 'Talk to our experts directly', contact: '+91 9056347061', time: 'Mon-Fri, 9 AM - 6 PM IST' },
              { icon: MessageSquare, title: 'Live Chat', desc: 'Instant answers to your questions', contact: 'Available on website', time: 'Mon-Fri, 10 AM - 5 PM IST' }
            ].map((method, i) => {
              const Icon = method.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -4 }}>
                  <Card className="h-full border-border hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg">
                    <CardContent className="p-8">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white mb-4">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-2">{method.title}</h3>
                      <p className="text-muted-foreground mb-4">{method.desc}</p>
                      <p className="font-semibold text-foreground mb-2">{method.contact}</p>
                      <p className="text-sm text-muted-foreground">{method.time}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Card className="border-border bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30">
              <CardContent className="p-8 text-center">
                <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-bold text-foreground mb-2">Our Office</h3>
                <p className="text-muted-foreground">Plot No 13, Silver Creek-1, Old Thana Road, Zirakpur, PIN-140603</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Write to Us</Badge>
            <h2 className="text-4xl font-bold text-foreground mb-4">Tell Us About Your Clinic</h2>
            <p className="text-xl text-muted-foreground">We'll recommend the perfect plugins for your needs</p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-2">
              <Card className="border-border shadow-xl">
                <CardContent className="p-8">
                  <form name="contact" onSubmit={handleSubmit} className="space-y-6">
                    <input type="hidden" name="form-name" value="contact" />
                    <p className="hidden"><label>Don't fill this out: <input name="bot-field" /></label></p>
                    <div>
                      <label className="block text-sm font-bold text-foreground mb-2">Your Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Dr. John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-foreground mb-2">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="you@clinic.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-foreground mb-2">Clinic Name</label>
                      <input
                        type="text"
                        name="clinic"
                        value={formData.clinic}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Your Clinic Name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-foreground mb-2">Plugin Interest</label>
                      <select
                        name="pluginInterest"
                        value={formData.pluginInterest}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="scheduling">Smart Scheduler</option>
                        <option value="notifications">SMS Reminder Pro</option>
                        <option value="analytics">Analytics Dashboard</option>
                        <option value="payments">Payment Gateway</option>
                        <option value="patient">Patient Portal</option>
                        <option value="integration">Calendar Sync</option>
                        <option value="bundle">Plugin Bundle</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-foreground mb-2">Message</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Tell us about your clinic and what you're looking for..."
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold rounded-xl transition-all shadow-lg disabled:opacity-50"
                    >
                      {loading ? 'Sending...' : 'Send Message'}
                    </button>
                    {status === 'success' && (
                      <p className="text-emerald-600 text-sm font-medium text-center">✓ Message sent successfully! We'll get back to you soon.</p>
                    )}
                    {status === 'error' && (
                      <p className="text-red-600 text-sm font-medium text-center">Failed to send. Please try again or email us directly.</p>
                    )}
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Sidebar */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-4">
              {[
                { icon: Clock, title: 'Response Time', desc: 'We typically respond within 24 hours', gradient: 'from-blue-500 to-cyan-400' },
                { icon: Users, title: 'Expert Team', desc: 'Healthcare professionals and software experts', gradient: 'from-emerald-500 to-teal-400' },
                { icon: Zap, title: 'Free Consultation', desc: 'Get personalized plugin recommendations', gradient: 'from-purple-500 to-pink-400' }
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <Card key={i} className="border-border hover:border-blue-500/50 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white mb-3`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FaqSection />

      {/* CTA */}
      <CTASection />
    </main>
  );
}
