import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, MessageSquare, Clock, Users, Zap, ArrowRight } from 'lucide-react';
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

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', clinic: '', pluginInterest: 'general', message: '' });
  };

  return (
    <main className="bg-white pt-20">
      {/* HERO */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20"></div>
        </div>

        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Have questions about our plugins? Need help choosing the right tools? Our expert team is here to help.
          </p>
        </div>
      </section>

      {/* CONTACT METHODS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Mail,
                title: 'Email Support',
                desc: 'Get detailed responses to your questions',
                contact: 'support@clinicgo.com',
                time: 'Response within 24 hours'
              },
              {
                icon: Phone,
                title: 'Phone Support',
                desc: 'Talk to our experts directly',
                contact: '+91 9056347061',
                time: 'Mon-Fri, 9 AM - 6 PM IST'
              },
              {
                icon: MessageSquare,
                title: 'Live Chat',
                desc: 'Instant answers to your questions',
                contact: 'Available on website',
                time: 'Mon-Fri, 10 AM - 5 PM IST'
              }
            ].map((method, i) => {
              const Icon = method.icon;
              return (
                <div key={i} className="bg-white rounded-xl p-8 border border-slate-200 hover:shadow-lg transition-all">
                  <Icon className="w-12 h-12 text-blue-600 mb-4" />
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{method.title}</h3>
                  <p className="text-slate-600 mb-4">{method.desc}</p>
                  <p className="font-semibold text-slate-900 mb-2">{method.contact}</p>
                  <p className="text-sm text-slate-600">{method.time}</p>
                </div>
              );
            })}
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-200 text-center">
            <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-bold text-slate-900 mb-2">Our Office</h3>
            <p className="text-slate-600">Plot No 13, Silver Creek-1, Old Thana Road, Zirakpur, PIN-140603</p>
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Tell Us About Your Clinic
            </h2>
            <p className="text-xl text-slate-600">We'll recommend the perfect plugins for your needs</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 border border-slate-200 shadow-lg">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-2">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Dr. John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="you@clinic.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-2">Clinic Name</label>
                    <input
                      type="text"
                      name="clinic"
                      value={formData.clinic}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Your Clinic Name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-2">Plugin Interest</label>
                    <select
                      name="pluginInterest"
                      value={formData.pluginInterest}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    <label className="block text-sm font-bold text-slate-900 mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Tell us about your clinic and what you're looking for..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all shadow-md"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                <Clock className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="font-bold text-slate-900 mb-2">Response Time</h3>
                <p className="text-sm text-slate-600">We typically respond within 24 hours</p>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200">
                <Users className="w-8 h-8 text-emerald-600 mb-3" />
                <h3 className="font-bold text-slate-900 mb-2">Expert Team</h3>
                <p className="text-sm text-slate-600">Healthcare professionals and software experts</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                <Zap className="w-8 h-8 text-purple-600 mb-3" />
                <h3 className="font-bold text-slate-900 mb-2">Free Consultation</h3>
                <p className="text-sm text-slate-600">Get personalized plugin recommendations</p>
              </div>
            </div>
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
