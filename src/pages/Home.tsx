import React from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Users, 
  Building2, 
  Package, 
  MessageSquare, 
  CreditCard, 
  ArrowRight, 
  Zap,
  Globe,
  Play,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { CTASection } from '../components/CTASection';
import { HeroSection } from '../components/HeroSection';
import { Marquee } from '../components/ui/marquee';
import { TestimonialsColumn } from '../components/ui/testimonials-columns-1';
import { FaqSection } from '../components/FaqSection';
import { SecuritySection } from '../components/SecuritySection';

// Types
interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}


// Trusted By Section
const TrustedBySection: React.FC = () => {
  const logos = [
    'Mayo Clinic', 'Cleveland Clinic', 'Johns Hopkins Medicine',
    'Kaiser Permanente', 'Apollo Hospitals', 'Fortis Healthcare',
    'Manipal Hospitals', 'Max Healthcare', 'Narayana Health',
    'Medanta', 'AIIMS', 'Aster Hospitals',
  ];

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <p className="text-sm font-medium text-muted-foreground">TRUSTED BY HEALTHCARE PROFESSIONALS</p>
        </motion.div>
        <Marquee duration={60} pauseOnHover fade fadeAmount={15}>
          {logos.map((logo, index) => (
            <div
              key={index}
              className="mx-10 flex items-center justify-center px-6 py-3 rounded-lg border border-border bg-card"
            >
              <span className="text-xl font-semibold text-muted-foreground whitespace-nowrap">
                {logo}
              </span>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

// Features Section — reduced to 6 key features with visual layout
const FeaturesSection: React.FC = () => {
  const features: Feature[] = [
    {
      icon: <Calendar className="w-6 h-6" />,
      title: 'Online Booking',
      description: '24/7 appointment booking for patients'
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Google Calendar Sync',
      description: 'Auto-sync with Google Calendar'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Patient Records',
      description: 'Complete medical history in one place'
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: 'Billing & Invoices',
      description: 'Auto-generate invoices & track payments'
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: 'WhatsApp & Email Alerts',
      description: 'Automated reminders to reduce no-shows'
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      title: 'Multi-Department',
      description: 'Organize by departments & specializations'
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-blue-50/30 dark:to-blue-950/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant='outline' className="mb-4">Features</Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Everything for a{' '}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Modern Clinic
            </span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Feature illustration */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden border border-border shadow-2xl">
              <img
                src="/images/dashboard.png"
                alt="ClinicGo Dashboard"
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Floating accent */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-cyan-400/20 rounded-full blur-2xl" />
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-purple-500/20 to-pink-400/20 rounded-full blur-2xl" />
          </motion.div>

          {/* Right: Feature list */}
          <div className="grid sm:grid-cols-2 gap-5">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -4 }}
              >
                <Card className="h-full border-border hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg">
                  <CardHeader className="pb-2">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white mb-3">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-base">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-sm">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Video Showcase Section
const VideoShowcase: React.FC = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant='outline' className="mb-4">See It In Action</Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Watch How{' '}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              ClinicGo Works
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative rounded-3xl overflow-hidden border border-border shadow-2xl aspect-video bg-gradient-to-br from-blue-900 to-cyan-900 flex items-center justify-center group cursor-pointer">
            {/* Video thumbnail / placeholder */}
            <img
              src="/images/practice.png"
              alt="ClinicGo Demo"
              className="absolute inset-0 w-full h-full object-cover opacity-20"
            />
            {/* Play button overlay */}
            <div className="relative z-10 w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
              <Play className="w-8 h-8 text-blue-600 ml-1" />
            </div>
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
          <p className="text-center text-muted-foreground mt-4 text-sm">
            2-minute overview of the complete clinic management workflow
          </p>
        </motion.div>
      </div>
    </section>
  );
};

// Dashboard Showcase
const DashboardShowcase: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-blue-50/30 to-background dark:from-blue-950/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant='outline' className="mb-4">Dashboard</Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Built For Modern{' '}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Clinics
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="grid grid-cols-2 gap-4">
            {[
              { src: "/images/my-clinic.png", alt: "My Clinic Dashboard" },
              { src: "/images/practice.png", alt: "Practice Dashboard" },
              { src: "/images/invoice.png", alt: "Invoice Dashboard" },
              { src: "/images/inventory.png", alt: "Inventory Dashboard" },
            ].map((img, index) => (
              <div
                key={index}
                className="group border border-border  rounded-3xl hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] transition-all duration-500"
              >
                <div className=" rounded-3xl p-4 ">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="object-cover rounded-2xl group-hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// How It Works Section — visual-first with inline SVG illustrations
const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Install Plugin',
      description: 'One-click install from WordPress directory',
      icon: <Package className="w-8 h-8" />,
      color: 'from-blue-500 to-indigo-500',
    },
    {
      number: '02',
      title: 'Configure',
      description: 'Set up doctors, services & departments',
      icon: <Building2 className="w-8 h-8" />,
      color: 'from-cyan-500 to-teal-500',
    },
    {
      number: '03',
      title: 'Go Live',
      description: 'Start accepting appointments instantly',
      icon: <Zap className="w-8 h-8" />,
      color: 'from-green-500 to-emerald-500',
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant='outline' className="mb-4">How It Works</Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Ready in{' '}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              3 Steps
            </span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              <Card className="h-full hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                {/* Visual top bar */}
                <div className={`h-2 bg-gradient-to-r ${step.color}`} />
                <CardHeader className="text-center pt-8">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white mx-auto mb-4 shadow-lg`}>
                    {step.icon}
                  </div>
                  <div className="text-5xl font-bold text-muted-foreground/20 mb-1">
                    {step.number}
                  </div>
                  <CardTitle className="text-xl">{step.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-base">{step.description}</CardDescription>
                </CardContent>
              </Card>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <ArrowRight className="w-8 h-8 text-blue-500" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
const testimonials = [
  {
  text: "Clinic Go transformed how we manage appointments, patient records, and clinic workflows. Everything feels faster, cleaner, and more professional now.",
  image: "/images/client/varunbj.png",
  name: "Dr. Varun Bajaj",
  role: "Founder, Vibrant Looks Medspa",
  country: "🇨🇦",
},

{
  text: "The automated booking and follow-up system helped us reduce manual work significantly while improving the patient experience.",
  image: "https://randomuser.me/api/portraits/women/44.jpg",
  name: "Anisha",
  role: "Senior Nurse Injector",
  country: "🇨🇦",
},

{
  text: "From consultations to billing and treatment management, Clinic Go gives our healthcare team everything in one beautifully designed dashboard.",
  image: "/images/client/arunkr.png",
  name: "Dr. Arun Kumar",
  role: "Ayurvedic Specialist",
  country: "🇮🇳",
},

{
  text: "The inventory and invoice modules are incredibly useful for our daily operations. The interface feels modern, premium, and easy to manage.",
  image: "https://randomuser.me/api/portraits/men/54.jpg",
  name: "Michael Carter",
  role: "Clinic Operations Manager",
  country: "🇺🇸",
},

{
  text: "Managing multiple staff members with role-based access is now effortless. Clinic Go helped us organize our entire clinic system.",
  image: "https://randomuser.me/api/portraits/women/63.jpg",
  name: "Dr. Emily Johnson",
  role: "Dermatologist",
  country: "🇦🇺",
},

{
  text: "The clean dashboard and real-time appointment tracking made a huge difference for our front desk and support staff.",
  image: "https://randomuser.me/api/portraits/women/8.jpg",
  name: "Dr. Sarah Mitchell",
  role: "Clinic Director",
  country: "🇬🇧",
},
  {
  text: "Clinic Go transformed how we manage appointments, patient records, and clinic workflows. Everything feels faster, cleaner, and more professional now.",
  image: "/images/client/varunbj.png",
  name: "Dr. Varun Bajaj",
  role: "Founder, Vibrant Looks Medspa",
  country: "🇨🇦",
},

{
  text: "The automated booking and follow-up system helped us reduce manual work significantly while improving the patient experience.",
  image: "https://randomuser.me/api/portraits/women/44.jpg",
  name: "Anisha",
  role: "Senior Nurse Injector",
  country: "🇨🇦",
},

{
  text: "From consultations to billing and treatment management, Clinic Go gives our healthcare team everything in one beautifully designed dashboard.",
  image: "/images/client/arunkr.png",
  name: "Dr. Arun Kumar",
  role: "Ayurvedic Specialist",
  country: "🇮🇳",
},
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const TestimonialsSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-background to-blue-50/30 dark:to-blue-950/10 my-20 relative">
      <div className="container z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
        >
          <Badge variant='outline' className="mb-4">Testimonials</Badge>
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
  );
};

// Global Timezone Section — marquee style like TrustedBySection
const GlobalTimezoneSection: React.FC = () => {
  const timezones = [
    '🇺🇸 New York • UTC-5',
    '🇬🇧 London • UTC+0',
    '🇩🇪 Berlin • UTC+1',
    '🇦🇪 Dubai • UTC+4',
    '🇮🇳 Mumbai • UTC+5:30',
    '🇸🇬 Singapore • UTC+8',
    '🇯🇵 Tokyo • UTC+9',
    '🇦🇺 Sydney • UTC+11',
    '🇧🇷 São Paulo • UTC-3',
    '🇨🇦 Toronto • UTC-5',
    '🇿🇦 Cape Town • UTC+2',
    '🇰🇷 Seoul • UTC+9',
  ];

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <p className="text-sm font-medium text-muted-foreground">AVAILABLE IN EVERY TIMEZONE • 24/7 GLOBAL SUPPORT</p>
        </motion.div>
        <Marquee duration={50} pauseOnHover fade fadeAmount={15}>
          {timezones.map((tz, index) => (
            <div
              key={index}
              className="mx-10 flex items-center justify-center px-6 py-3 rounded-lg border border-border bg-card"
            >
              <span className="text-xl font-semibold text-muted-foreground whitespace-nowrap">
                {tz}
              </span>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

// Main Component
const ClinicGoWebsite: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeroSection />
      <TrustedBySection />
      <FeaturesSection />
      <VideoShowcase />
      <SecuritySection />
      <DashboardShowcase />
      <GlobalTimezoneSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <FaqSection />
      <CTASection />
    </div>
  );
};

export default ClinicGoWebsite;
