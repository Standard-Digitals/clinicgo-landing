import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
      isValid = false;
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
      isValid = false;
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = 'Subject must be at least 5 characters';
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    setIsSubmitting(true);
    
    try {
      const formspreeId = 'xkopwpjk';
      
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error("Error sending message:", error);
      setIsSubmitting(false);
      alert("Something went wrong. Please try again later.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <main className="pt-24 pb-20">
      {/* Hero Section */}
      <section className="relative pt-8 sm:pt-12 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-slate-50 to-slate-50"></div>
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4 sm:mb-6 tracking-tight">
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Touch</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed">
            Have questions about SD Booking? Our team is here to help. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden flex flex-col lg:flex-row">
          
          {/* Left Side: Contact Info */}
          <div className="p-8 sm:p-12 lg:w-2/5 bg-slate-900 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-blue-500 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-64 h-64 bg-indigo-500 rounded-full opacity-20 blur-3xl"></div>
            
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">Contact Information</h2>
              <p className="text-slate-300 mb-10">Fill out the form and our team will get back to you within 24 hours.</p>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-blue-300" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Phone</h3>
                    <p className="text-slate-300">+91 9056347061</p>
                    <p className="text-slate-400 text-sm mt-1">Mon-Fri from 8am to 5pm</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-blue-300" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Email</h3>
                    <p className="text-slate-300">support@standarddigitals.com</p>
                    <p className="text-slate-400 text-sm mt-1">Online support 24/7</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-blue-300" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Office</h3>
                    <p className="text-slate-300">Plot No13, Silver Creek-1<br/>Old Thana Road, Zirakpur<br/>PIN-140603</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="p-8 sm:p-12 lg:w-3/5 bg-white">
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-slate-200 focus:ring-blue-500 focus:border-blue-500'} outline-none transition-all bg-slate-50 focus:bg-white`}
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="mt-1.5 text-xs font-medium text-red-500">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-slate-200 focus:ring-blue-500 focus:border-blue-500'} outline-none transition-all bg-slate-50 focus:bg-white`}
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="mt-1.5 text-xs font-medium text-red-500">{errors.email}</p>}
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-slate-700 mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border ${errors.subject ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-slate-200 focus:ring-blue-500 focus:border-blue-500'} outline-none transition-all bg-slate-50 focus:bg-white`}
                  placeholder="How can we help you?"
                />
                {errors.subject && <p className="mt-1.5 text-xs font-medium text-red-500">{errors.subject}</p>}
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border ${errors.message ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-slate-200 focus:ring-blue-500 focus:border-blue-500'} outline-none transition-all bg-slate-50 focus:bg-white resize-none`}
                  placeholder="Write your message here..."
                ></textarea>
                {errors.message && <p className="mt-1.5 text-xs font-medium text-red-500">{errors.message}</p>}
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold rounded-xl transition-colors shadow-md shadow-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isSubmitting ? 'Sending...' : (
                  <>
                    Send Message <Send className="w-4 h-4" />
                  </>
                )}
              </button>
              
              {isSubmitted && (
                <div className="p-4 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100 flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="font-medium">Thank you! Your message has been sent successfully.</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
