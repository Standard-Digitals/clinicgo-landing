import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Users, 
  Building2, 
  FileText, 
  Package, 
  MessageSquare, 
  Mail, 
  CreditCard, 
  Clock, 
  ArrowRight, 
  Zap,
  TrendingUp,
  Heart,
  Globe,
  Smartphone,
  Layers,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { CTASection } from '../components/CTASection';
import { HeroSection } from '../components/HeroSection';
import { Marquee } from '../components/ui/marquee';
import { StaggerTestimonials } from '../components/StaggerTestimonials';
import { FaqSection } from '../components/FaqSection';

// Types
interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}


// Trusted By Section
const TrustedBySection: React.FC = () => {
  const logos = [
  // International
  'Mayo Clinic',
  'Cleveland Clinic',
  'Johns Hopkins Medicine',
  'Mount Sinai Health System',
  'Cedars-Sinai',
  'Mass General Brigham',
  'Kaiser Permanente',
  'UCLA Health',
  'NewYork-Presbyterian',
  'Houston Methodist',
  'Stanford Health Care',
  'NHS',
  'Bupa',
  'Cigna Healthcare',
  'UnitedHealthcare',

  // Indian
  'Apollo Hospitals',
  'Fortis Healthcare',
  'Manipal Hospitals',
  'Max Healthcare',
  'Narayana Health',
  'Medanta',
  'AIIMS',
  'Care Hospitals',
  'Aster Hospitals',
  'Yashoda Hospitals',
  'KIMS Hospitals',
  'BLK-Max Super Speciality Hospital',
  'Artemis Hospitals',
  'Ruby Hall Clinic',
  'Rainbow Children’s Hospital'
];

  return (
    <section className="py-16 bg-background">
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

// Features Section
const FeaturesSection: React.FC = () => {
  const features: Feature[] = [
    {
      icon: <Calendar className="w-6 h-6" />,
      title: 'Online Appointment Booking',
      description: 'Let patients book appointments 24/7 with an intuitive booking system'
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Google Calendar Integration',
      description: 'Sync appointments automatically with Google Calendar for seamless scheduling'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Patient Management',
      description: 'Maintain comprehensive patient records and medical history in one place'
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      title: 'Staff Management',
      description: 'Manage doctors, nurses, and staff with role-based access control'
    },
    {
      icon: <Layers className="w-6 h-6" />,
      title: 'Department Organization',
      description: 'Organize your clinic by departments and specializations'
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Service Management',
      description: 'Define and manage all medical services and procedures offered'
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Invoice Generation',
      description: 'Create professional invoices and track payments automatically'
    },
    {
      icon: <Package className="w-6 h-6" />,
      title: 'Inventory Management',
      description: 'Track medical supplies, medicines, and equipment inventory'
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: 'WhatsApp Notifications',
      description: 'Send automated appointment reminders via WhatsApp'
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email Notifications',
      description: 'Automated email confirmations and reminders for appointments'
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: 'Payment Tracking',
      description: 'Monitor payments, pending dues, and financial reports'
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: 'Elementor Widget Support',
      description: 'Beautiful booking widgets for your Elementor-powered website'
    }
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
            Everything You Need to Run a{' '}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Modern Clinic
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Powerful features designed specifically for healthcare professionals
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full border-border hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Dashboard Showcase
const DashboardShowcase: React.FC = () => {
  return (
    <section className="py-24 bg-background">
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
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A modern clinic management dashboard built for smooth operations and better patient management.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="grid grid-cols-2 gap-4">
            {[
              { src: "/images/practice.png", alt: "Practice Dashboard" },
              { src: "/images/my-clinic.png", alt: "My Clinic Dashboard" },
              { src: "/images/inventory.png", alt: "Inventory Dashboard" },
              { src: "/images/invoice.png", alt: "Invoice Dashboard" },
            ].map((img, index) => (
              <div
  key={index}
  className="group rounded-3xl p-[1px] bg-gradient-to-br from-blue-500 via-cyan-400 to-green-400 hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] transition-all duration-500"
>
  <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-3xl p-4">
    <img
      src={img.src}
      alt={img.alt}
      className="w-full h-full border border-border object-cover rounded-2xl group-hover:scale-[1.02] transition-transform duration-500"
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

// How It Works Section
const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Install Plugin',
      description: 'Download and install ClinicGo from WordPress plugin directory in seconds',
      icon: <Package className="w-8 h-8" />
    },
    {
      number: '02',
      title: 'Configure Clinic',
      description: 'Set up your clinic details, doctors, services, and departments easily',
      icon: <Building2 className="w-8 h-8" />
    },
    {
      number: '03',
      title: 'Start Managing',
      description: 'Begin accepting appointments and managing your clinic operations',
      icon: <Zap className="w-8 h-8" />
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-blue-50/30 to-background dark:from-blue-950/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant='outline' className="mb-4">How It Works</Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Get Started in{' '}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              3 Simple Steps
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Setup your clinic management system in minutes, not hours
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              <Card className="h-full hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white mb-4">
                    {step.icon}
                  </div>
                  <div className="text-6xl font-bold text-blue-100 dark:text-blue-900/30 mb-2">
                    {step.number}
                  </div>
                  <CardTitle className="text-2xl">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
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

// Benefits Section
const BenefitsSection: React.FC = () => {
  const benefits = [
    { icon: <Clock className="w-6 h-6" />, title: 'Save Time', description: 'Automate repetitive tasks and focus on patient care' },
    { icon: <Zap className="w-6 h-6" />, title: 'Reduce Manual Work', description: 'Eliminate paperwork with digital records' },
    { icon: <Heart className="w-6 h-6" />, title: 'Improve Patient Experience', description: 'Easy booking and faster service delivery' },
    { icon: <TrendingUp className="w-6 h-6" />, title: 'Increase Efficiency', description: 'Streamline operations and boost productivity' },
    { icon: <MessageSquare className="w-6 h-6" />, title: 'Automate Reminders', description: 'Reduce no-shows with automated notifications' },
    { icon: <Users className="w-6 h-6" />, title: 'Better Coordination', description: 'Improve communication between staff members' }
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
          <Badge variant='outline' className="mb-4">Benefits</Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Transform Your{' '}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Healthcare Practice
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the advantages of modern clinic management
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="h-full text-center hover:shadow-xl transition-all duration-300 border-border hover:border-blue-500/50">
                <CardHeader>
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white mx-auto mb-4">
                    {benefit.icon}
                  </div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{benefit.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-blue-50/30 dark:to-blue-950/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant='outline' className="mb-4">Testimonials</Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Loved by{' '}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Healthcare Professionals
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See what doctors and clinic managers say about ClinicGo
          </p>
        </motion.div>

        <StaggerTestimonials />
      </div>
    </section>
  );
};

// Main Component
const ClinicGoWebsite: React.FC = () => {

  return (
    <div className="min-h-screen bg-background text-foreground">
      <>
            <HeroSection />
            <TrustedBySection />
            <FeaturesSection />
            <DashboardShowcase />
            <HowItWorksSection />
            <BenefitsSection />
            <TestimonialsSection />
            <FaqSection />
            <CTASection />
          </>
    </div>
  );
};

export default ClinicGoWebsite;