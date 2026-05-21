import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Play, Sparkles, Calendar, CreditCard, BarChart3, Users, MessageSquare, Bell, Package, FileText, Star } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { CTASection } from '../components/CTASection';
import { TestimonialsColumn } from '../components/ui/testimonials-columns-1';

const testimonials = [
  { text: "ClinicGo transformed how we manage appointments, patient records, and clinic workflows. Everything feels faster, cleaner, and more professional now.", image: "/images/client/varunbj.png", name: "Dr. Varun Bajaj", role: "Founder, Vibrant Looks Medspa", country: "🇨🇦" },
  { text: "The automated booking and follow-up system helped us reduce manual work significantly while improving the patient experience.", image: "https://randomuser.me/api/portraits/women/44.jpg", name: "Anisha", role: "Senior Nurse Injector", country: "🇨🇦" },
  { text: "From consultations to billing and treatment management, Clinic Go gives our healthcare team everything in one beautifully designed dashboard.", image: "/images/client/arunkr.png", name: "Dr. Arun Kumar", role: "Ayurvedic Specialist", country: "🇮🇳" },
  { text: "The inventory and invoice modules are incredibly useful for our daily operations. The interface feels modern, premium, and easy to manage.", image: "https://randomuser.me/api/portraits/men/54.jpg", name: "Michael Carter", role: "Clinic Operations Manager", country: "🇺🇸" },
  { text: "Managing multiple staff members with role-based access is now effortless. Clinic Go helped us organize our entire clinic system.", image: "https://randomuser.me/api/portraits/women/63.jpg", name: "Dr. Emily Johnson", role: "Dermatologist", country: "🇦🇺" },
  { text: "The clean dashboard and real-time appointment tracking made a huge difference for our front desk and support staff.", image: "https://randomuser.me/api/portraits/women/8.jpg", name: "Dr. Sarah Mitchell", role: "Clinic Director", country: "🇬🇧" },
  { text: "ClinicGo transformed how we manage appointments, patient records, and clinic workflows. Everything feels faster, cleaner, and more professional now.", image: "/images/client/varunbj.png", name: "Dr. Varun Bajaj", role: "Founder, Vibrant Looks Medspa", country: "🇨🇦" },
  { text: "The automated booking and follow-up system helped us reduce manual work significantly while improving the patient experience.", image: "https://randomuser.me/api/portraits/women/44.jpg", name: "Anisha", role: "Senior Nurse Injector", country: "🇨🇦" },
  { text: "From consultations to billing and treatment management, Clinic Go gives our healthcare team everything in one beautifully designed dashboard.", image: "/images/client/arunkr.png", name: "Dr. Arun Kumar", role: "Ayurvedic Specialist", country: "🇮🇳" },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

// Animated Counter
const AnimatedCounter = ({ target, suffix = '' }: { target: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
};

export default function About() {
  return (
    <main className="bg-background">
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
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
            {/* Left Content */}
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
                <span className="text-sm font-medium text-blue-600">Trusted by Modern Clinics Worldwide</span>
              </motion.div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Built to Help Clinics{' '}
                <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-green-500 bg-clip-text text-transparent">
                  Scale Smarter
                </span>{' '}
                &{' '}
                <span className="bg-gradient-to-r from-green-500 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
                  Heal Better
                </span>
              </h1>

              <p className="text-lg text-muted-foreground mb-8 max-w-xl">
                ClinicGo helps clinics, doctors, wellness centers, medspas, and healthcare businesses manage appointments, billing, patients, staff, follow-ups, WhatsApp automation, and growth — all from one modern dashboard.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button href="/signup" size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white cursor-pointer text-lg px-8">
                  Start Free Trial <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button href="/contact" size="lg" variant="outline" className="text-lg px-8 cursor-pointer">
                  <Play className="mr-2 w-5 h-5" /> Watch Live Demo
                </Button>
              </div>

              <div className="flex flex-wrap gap-4 mt-6 justify-center lg:justify-start text-sm text-muted-foreground">
                {['Easy Setup', 'No Coding Required', 'WhatsApp Ready', 'Billing & Inventory Included'].map((item) => (
                  <span key={item} className="flex items-center gap-1.5">
                    <span className="text-green-500">✔</span> {item}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Right Visual — Floating Dashboard */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              {/* Main Dashboard */}
              <div className="relative rounded-2xl shadow-2xl overflow-hidden border border-border/50">
                {/* Mac browser bar */}
                <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2.5 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <div className="flex-1 mx-4 bg-white dark:bg-gray-400 rounded-md px-3 py-1 text-xs text-muted-foreground text-center">
                    {/* wordpress listing */}
                    https://www.wordpress.org/plugins/clinicgo/
                  </div>
                </div>
                <img src="/images/about-dashboard.png" alt="ClinicGo Dashboard" className="w-full h-auto" />
              </div>

              {/* Floating Cards */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-3 border border-border/50"
              >
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-600">Appointments</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-3 border border-border/50"
              >
                <div className="flex items-center space-x-2">
                  <CreditCard className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-green-600">Payments</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                className="absolute top-1/3 -left-8 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-3 border border-border/50"
              >
                <div className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-cyan-600" />
                  <span className="text-sm font-medium text-cyan-600">Revenue</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, delay: 1.5 }}
                className="absolute top-1/2 -right-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-3 border border-border/50"
              >
                <div className="flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm font-medium text-emerald-600">WhatsApp</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 2 }}
                className="absolute -bottom-6 right-12 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-3 border border-border/50"
              >
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-medium text-purple-600">Staff</span>
                </div>
              </motion.div>

              {/* Glow */}
              <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-cyan-400/20 rounded-full blur-3xl" />
              <div className="absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-br from-green-500/20 to-teal-400/20 rounded-full blur-3xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== OUR STORY ==================== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-blue-50/30 dark:to-blue-950/10">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Badge variant="outline" className="mb-4">Our Story</Badge>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Why We Built{' '}
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  ClinicGo
                </span>
              </h2>
              <p className="text-muted-foreground mb-6 text-lg">
                Most clinic management systems are expensive, complicated, old-fashioned, and not made for modern healthcare businesses.
              </p>
              <p className="text-muted-foreground mb-8">
                ClinicGo was built to change that — providing a modern UI, fast workflows, automation, simplicity, growth tools, and a complete clinic ecosystem that just works.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {['Modern UI', 'Fast Workflow', 'Automation', 'Simplicity', 'Growth Tools', 'Complete Ecosystem'].map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-2 text-sm font-medium"
                  >
                    <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />
                    {item}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden border border-border shadow-2xl">
                <img src="/images/my-clinic.png" alt="ClinicGo Dashboard" className="w-full h-auto" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-cyan-400/20 rounded-full blur-2xl" />
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-green-500/20 to-teal-400/20 rounded-full blur-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== WHAT MAKES CLINICGO DIFFERENT ==================== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="mb-4">Features</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              What Makes ClinicGo{' '}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Different
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Calendar className="w-6 h-6" />, title: 'Appointment Booking', desc: 'Smart scheduling with conflict detection & auto-reminders', gradient: 'from-blue-500 to-indigo-500' },
              { icon: <FileText className="w-6 h-6" />, title: 'Billing & Invoices', desc: 'Auto-generate invoices, track payments & partial billing', gradient: 'from-cyan-500 to-teal-500' },
              { icon: <MessageSquare className="w-6 h-6" />, title: 'WhatsApp Automation', desc: 'Automated reminders, follow-ups & patient communication', gradient: 'from-green-500 to-emerald-500' },
              { icon: <Users className="w-6 h-6" />, title: 'Staff Access Control', desc: 'Role-based permissions for doctors, staff & admins', gradient: 'from-purple-500 to-violet-500' },
              { icon: <Star className="w-6 h-6" />, title: 'Patient Management', desc: 'Complete patient records, history & document uploads', gradient: 'from-orange-500 to-amber-500' },
              { icon: <Bell className="w-6 h-6" />, title: 'Follow-ups & Reminders', desc: 'Never miss a follow-up with smart notification system', gradient: 'from-pink-500 to-rose-500' },
              { icon: <Package className="w-6 h-6" />, title: 'Inventory Management', desc: 'Track stock, suppliers, expiry dates & low-stock alerts', gradient: 'from-teal-500 to-cyan-500' },
              { icon: <BarChart3 className="w-6 h-6" />, title: 'Reports & Analytics', desc: 'Revenue insights, patient trends & custom reports', gradient: 'from-indigo-500 to-blue-500' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -6 }}
                className="group"
              >
                <div className="h-full p-6 rounded-2xl border border-border bg-card hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                    {feature.icon}
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== TRUST & STATS ==================== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-blue-50/30 dark:to-blue-950/10">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="mb-4">Trust & Impact</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold">
              Numbers That{' '}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Speak
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: 500, suffix: '+', label: 'Clinics' },
              { value: 10, suffix: 'K+', label: 'Appointments' },
              { value: 99.9, suffix: '%', label: 'Uptime' },
              { value: 24, suffix: '/7', label: 'Support' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="relative p-8 rounded-2xl border border-border bg-card text-center overflow-hidden group hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-2">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-muted-foreground font-medium">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== OUR MISSION ==================== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-cyan-50 to-green-50 dark:from-blue-950/20 dark:via-cyan-950/20 dark:to-green-950/20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl" />

        <div className="container mx-auto max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Badge variant="outline" className="mb-6">Our Mission</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Our Mission is to{' '}
              <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-green-500 bg-clip-text text-transparent">
                Simplify Healthcare Operations
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Healthcare professionals should focus on patients — not messy software, paperwork, or complicated workflows. We build tools that get out of your way and let you do what you do best.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ==================== TESTIMONIALS ==================== */}
      <section className="bg-gradient-to-b from-background to-blue-50/30 dark:to-blue-950/10 py-24 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
          >
            <Badge variant="outline" className="mb-4">Testimonials</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tighter mt-2 text-center">
              Loved by{' '}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Healthcare Professionals
              </span>
            </h2>
            <p className="text-center mt-5 opacity-75">
              See what clinics and doctors have to say about ClinicGo.
            </p>
          </motion.div>

          <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
            <TestimonialsColumn testimonials={firstColumn} duration={15} />
            <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
            <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
          </div>
        </div>
      </section>

      {/* ==================== FINAL CTA ==================== */}
      <CTASection />
    </main>
  );
}
