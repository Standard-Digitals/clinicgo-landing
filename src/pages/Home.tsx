import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Users, 
  Building2, 
  Package, 
  MessageSquare, 
  CreditCard, 
  Zap,
  Globe,
  Play,
  LayoutDashboard,
  Stethoscope,
  FileText,
  Boxes,
  CheckCircle2,
  PinIcon,
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
  'Ayurveda Clinic',
  'Dental Care',
  'Physiotherapy Center',

  'General Physician',
  'Laser Studio',
  'Medspa Clinic',

  'Skin Care Clinic',
  'Gastro Specialist',
  'Urology Center',

  'Orthopedic Clinic',
  'Pediatric Care',
  'Neurology Center',

  'ENT Specialist',
  'Cardiology Clinic',
  'Gynecology Care',
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
    <section className="py-16 md:py-24 min-h-screen bg-gradient-to-b from-background to-blue-50/30 dark:to-blue-950/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant='outline' className="mb-4">Features</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Everything for a{' '}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Modern Clinic
            </span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
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

// Patient Booking Experience Section — Interactive Demo UI
const bookingSteps = [
  { label: 'Department', num: 1 },
  { label: 'Service', num: 2 },
  { label: 'Doctor', num: 3 },
  { label: 'Calendar', num: 4 },
  { label: 'Time Slot', num: 5 },
  { label: 'Details', num: 6 },
  { label: 'Payment', num: 7 },
  { label: 'Confirm', num: 8 },
];

const PatientBookingSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [activeTab, setActiveTab] = useState<'new' | 'existing'>('new');
  const [selectedDept, setSelectedDept] = useState('All Services');
  const [selectedService, setSelectedService] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [existingLookup, setExistingLookup] = useState<'id' | 'phone'>('id');

  // Auto-cycle through steps
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % bookingSteps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const departments = ['All Services', 'Ayurvedic Consultation', 'Health Packages', 'Panchakarma Treatment'];
  const services = ['General Checkup', 'Shirodhara Therapy', 'Detox Program', 'Stress Management'];
  const doctors = [
    { name: 'Dr. Arun Kumar', spec: 'Ayurvedic Specialist', avatar: '👨‍⚕️' },
    { name: 'Dr. Priya Sharma', spec: 'Panchakarma Expert', avatar: '👩‍⚕️' },
    { name: 'Dr. Rajesh Verma', spec: 'General Physician', avatar: '👨‍⚕️' },
  ];
  const timeSlots = ['09:00 AM', '10:00 AM', '11:30 AM', '02:00 PM', '03:30 PM', '05:00 PM'];

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <div>
            <h3 className="text-lg font-bold text-foreground mb-1">Select a Department</h3>
            <p className="text-sm text-muted-foreground mb-4">Choose the department you'd like to book from</p>
            <div className="grid grid-cols-2 gap-3">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={`p-3 rounded-xl border text-sm font-medium transition-all duration-200 ${
                    selectedDept === dept
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400'
                      : 'border-border bg-card text-foreground hover:border-blue-300'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>
        );
      case 1:
        return (
          <div>
            <h3 className="text-lg font-bold text-foreground mb-1">Select a Service</h3>
            <p className="text-sm text-muted-foreground mb-4">Choose your preferred service</p>
            <div className="space-y-2">
              {services.map((svc) => (
                <button
                  key={svc}
                  onClick={() => setSelectedService(svc)}
                  className={`w-full p-3 rounded-xl border text-sm font-medium text-left transition-all duration-200 ${
                    selectedService === svc
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400'
                      : 'border-border bg-card text-foreground hover:border-blue-300'
                  }`}
                >
                  {svc}
                </button>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h3 className="text-lg font-bold text-foreground mb-1">Choose a Doctor</h3>
            <p className="text-sm text-muted-foreground mb-4">Select your preferred doctor</p>
            <div className="space-y-3">
              {doctors.map((doc) => (
                <button
                  key={doc.name}
                  onClick={() => setSelectedDoctor(doc.name)}
                  className={`w-full p-3 rounded-xl border text-left flex items-center gap-3 transition-all duration-200 ${
                    selectedDoctor === doc.name
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30'
                      : 'border-border bg-card hover:border-blue-300'
                  }`}
                >
                  <span className="text-2xl">{doc.avatar}</span>
                  <div>
                    <p className="font-semibold text-sm text-foreground">{doc.name}</p>
                    <p className="text-xs text-muted-foreground">{doc.spec}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <h3 className="text-lg font-bold text-foreground mb-1">Select Date</h3>
            <p className="text-sm text-muted-foreground mb-4">Pick an available date</p>
            <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
              {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (
                <span key={d} className="text-muted-foreground font-medium py-1">{d}</span>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDate(String(day))}
                  className={`py-2 rounded-lg text-xs font-medium transition-all ${
                    selectedDate === String(day)
                      ? 'bg-blue-600 text-white'
                      : day % 7 === 0 ? 'text-muted-foreground/50' : 'text-foreground hover:bg-blue-100 dark:hover:bg-blue-950/30'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
        );
      case 4:
        return (
          <div>
            <h3 className="text-lg font-bold text-foreground mb-1">Select Time Slot</h3>
            <p className="text-sm text-muted-foreground mb-4">Choose a convenient time</p>
            <div className="grid grid-cols-3 gap-3">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`p-3 rounded-xl border text-sm font-medium transition-all duration-200 ${
                    selectedTime === time
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400'
                      : 'border-border bg-card text-foreground hover:border-blue-300'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        );
      case 5:
        return (
          <div>
            <h3 className="text-lg font-bold text-foreground mb-1">Patient Details</h3>
            <p className="text-sm text-muted-foreground mb-4">Fill in your information</p>
            <div className="space-y-3">
              <input className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm" placeholder="Full Name" defaultValue="Rahul Sharma" readOnly />
              <input className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm" placeholder="Phone Number" defaultValue="+91 98765 43210" readOnly />
              <input className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm" placeholder="Email" defaultValue="rahul@email.com" readOnly />
            </div>
          </div>
        );
      case 6:
        return (
          <div>
            <h3 className="text-lg font-bold text-foreground mb-1">Payment</h3>
            <p className="text-sm text-muted-foreground mb-4">Choose payment method</p>
            <div className="space-y-3">
              <div className="p-4 rounded-xl border border-blue-500 bg-blue-50 dark:bg-blue-950/30">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-semibold text-sm text-foreground">Pay Online</p>
                    <p className="text-xs text-muted-foreground">UPI, Card, Net Banking</p>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-xl border border-border bg-card">
                <div className="flex items-center gap-3">
                  <Building2 className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-semibold text-sm text-foreground">Pay at Clinic</p>
                    <p className="text-xs text-muted-foreground">Cash or Card at reception</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 7:
        return (
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-950/30 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-1">Booking Confirmed!</h3>
            <p className="text-sm text-muted-foreground mb-4">Your appointment has been booked successfully</p>
            <div className="bg-muted/50 rounded-xl p-4 text-left text-sm space-y-1">
              <p className="text-muted-foreground">Doctor: <span className="text-foreground font-medium">Dr. Arun Kumar</span></p>
              <p className="text-muted-foreground">Date: <span className="text-foreground font-medium">25 May, 2026</span></p>
              <p className="text-muted-foreground">Time: <span className="text-foreground font-medium">10:00 AM</span></p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-background to-blue-50/30 dark:to-blue-950/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant='outline' className="mb-4">Patient Experience</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Seamless Booking for{' '}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Your Patients
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A beautiful, step-by-step booking widget that your patients will love. Embed it on any website in minutes.
          </p>
        </motion.div>

        {/* Demo Booking Widget */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto relative"
        >
          {/* Floating accents */}
          <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-cyan-400/20 rounded-full blur-3xl" />
          <div className="absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-br from-indigo-500/20 to-blue-400/20 rounded-full blur-3xl" />

          <div className="relative rounded-3xl border border-border shadow-2xl bg-card overflow-hidden">
            {/* Header Tabs */}
            <div className="flex">
              <button
                onClick={() => setActiveTab('new')}
                className={`flex-1 py-3 text-center text-sm font-bold transition-all duration-300 ${
                  activeTab === 'new'
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white'
                    : 'bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                🆕 New Booking
              </button>
              <button
                onClick={() => setActiveTab('existing')}
                className={`flex-1 py-3 text-center text-sm font-bold transition-all duration-300 ${
                  activeTab === 'existing'
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white'
                    : 'bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                👤 Existing Patient
              </button>
            </div>

            {activeTab === 'existing' ? (
              /* Existing Patient Tab */
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-1">Existing Patient Booking</h3>
                <p className="text-sm text-muted-foreground mb-6">Enter your Patient ID or Phone to auto-fill your details and book quickly.</p>
                
                {/* Lookup Toggle */}
                <div className="flex rounded-xl overflow-hidden border border-border mb-6">
                  <button
                    onClick={() => setExistingLookup('id')}
                    className={`flex-1 py-2.5 text-sm font-medium flex items-center justify-center gap-2 transition-all ${
                      existingLookup === 'id'
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white'
                        : 'bg-card text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    🪪 Patient ID
                  </button>
                  <button
                    onClick={() => setExistingLookup('phone')}
                    className={`flex-1 py-2.5 text-sm font-medium flex items-center justify-center gap-2 transition-all ${
                      existingLookup === 'phone'
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white'
                        : 'bg-card text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    📱 Phone Number
                  </button>
                </div>

                {/* Input */}
                <div className="mb-4">
                  <label className="text-sm font-semibold text-foreground mb-2 block">
                    {existingLookup === 'id' ? 'Patient ID' : 'Phone Number'}
                  </label>
                  <div className="flex gap-3">
                    <input
                      className="flex-1 px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={existingLookup === 'id' ? 'E.G. PT-20240316-AB12' : '+91 98765 43210'}
                      readOnly
                    />
                    <button className="px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-sm hover:from-blue-700 hover:to-cyan-600 transition-all shadow-md">
                      Fetch →
                    </button>
                  </div>
                </div>

                {/* Demo fetched result */}
                <div className="mt-6 p-4 rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-sm font-bold">RS</div>
                    <div>
                      <p className="font-semibold text-sm text-foreground">Rahul Sharma</p>
                      <p className="text-xs text-muted-foreground">PT-20240316-AB12 • +91 98765 43210</p>
                    </div>
                  </div>
                  <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-sm hover:from-blue-700 hover:to-cyan-600 transition-all shadow-md">
                    Continue Booking →
                  </button>
                </div>
              </div>
            ) : (
              /* New Booking Tab */
              <>

            {/* Step Indicators */}
            <div className="px-6 pt-6 pb-4">
              <div className="flex items-center justify-between">
                {bookingSteps.map((step, i) => (
                  <div key={i} className="flex flex-col items-center gap-1.5 relative">
                    {/* Connector line */}
                    {i < bookingSteps.length - 1 && (
                      <div className="absolute top-4 left-[calc(50%+16px)] w-[calc(100%-8px)] h-0.5 hidden sm:block">
                        <div className={`h-full rounded-full transition-all duration-500 ${
                          i < activeStep ? 'bg-gradient-to-r from-blue-500 to-cyan-400' : 'bg-muted'
                        }`} />
                      </div>
                    )}
                    <div
                      onClick={() => setActiveStep(i)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold cursor-pointer transition-all duration-300 relative z-10 ${
                        i === activeStep
                          ? 'bg-gradient-to-br from-blue-600 to-cyan-500 text-white scale-110 shadow-lg shadow-blue-500/30 ring-4 ring-blue-100 dark:ring-blue-900/30'
                          : i < activeStep
                          ? 'bg-blue-600 text-white'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {i < activeStep ? '✓' : step.num}
                    </div>
                    <span className={`text-[10px] font-semibold hidden sm:block ${
                      i === activeStep ? 'text-blue-600 dark:text-blue-400' : i < activeStep ? 'text-blue-500' : 'text-muted-foreground'
                    }`}>
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step Content */}
            <div className="px-6 pb-4 min-h-[280px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  {renderStepContent()}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer Button */}
            <div className="px-6 pb-6">
              <button
                onClick={() => setActiveStep((prev) => (prev + 1) % bookingSteps.length)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-sm hover:from-blue-700 hover:to-cyan-600 transition-all shadow-lg"
              >
                {activeStep === 7 ? 'Book Another →' : 'Next →'}
              </button>
            </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Video Showcase Section — Animated Dashboard Walkthrough
const VideoShowcase: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentScene, setCurrentScene] = useState(0);
  const [progress, setProgress] = useState(0);

  const scenes = [
    { title: 'Dashboard Overview', subtitle: 'Total bookings, revenue & quick stats at a glance', image: '/images/dashboard.png' },
    { title: 'My Clinic', subtitle: 'Manage your clinic profile, settings & users', image: '/images/my-clinic.png' },
    { title: 'Practice Management', subtitle: 'Patient records, bookings & fee collection', image: '/images/practice.png' },
    { title: 'Invoice System', subtitle: 'Create, track & manage all clinic invoices', image: '/images/invoice.png' },
    { title: 'Inventory Control', subtitle: 'Stock management, suppliers & expiry tracking', image: '/images/inventory.png' },
    { title: 'Integrations', subtitle: 'Google Calendar, WhatsApp & more connected', image: '/images/integrations.png' },
    { title: 'Payment Processing', subtitle: 'Secure payments with multiple gateways', image: '/images/payments.png' },
  ];

  const SCENE_DURATION = 4000;

  useEffect(() => {
    if (!isPlaying) return;
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentScene((s) => {
            const next = s + 1;
            if (next >= scenes.length) { setIsPlaying(false); return 0; }
            return next;
          });
          return 0;
        }
        return prev + (100 / (SCENE_DURATION / 50));
      });
    }, 50);
    return () => clearInterval(progressInterval);
  }, [isPlaying, scenes.length]);

  const togglePlay = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      if (currentScene >= scenes.length - 1 && progress >= 100) {
        setCurrentScene(0);
        setProgress(0);
      }
    } else {
      setIsPlaying(false);
    }
  };

  const totalProgress = ((currentScene * 100) + progress) / scenes.length;

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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
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
          className="max-w-5xl mx-auto"
        >
          <div className="relative rounded-3xl overflow-hidden border border-border shadow-2xl bg-gray-900">
            {/* Browser Top Bar */}
            <div className="bg-gray-800 px-4 py-2.5 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <div className="flex-1 mx-4 bg-gray-700 rounded-md px-3 py-1 text-xs text-gray-400 text-center">
                                    https://www.wordpress.org/plugins/clinicgo/
              </div>
            </div>

            {/* Video Content Area */}
            <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
              {/* Scene Image */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentScene}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <img
                    src={scenes[currentScene].image}
                    alt={scenes[currentScene].title}
                    className={`w-full h-full object-cover object-top transition-all duration-1000 ${isPlaying ? 'opacity-100' : 'opacity-40'}`}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Overlay gradient */}
              <div className={`absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-gray-900/20 transition-opacity duration-500 ${isPlaying ? 'opacity-60' : 'opacity-80'}`} />

              {/* Play/Pause Button */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <motion.button
                  onClick={togglePlay}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-20 h-20 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
                    isPlaying
                      ? 'bg-white/20 backdrop-blur-sm border border-white/30 opacity-0 hover:opacity-100'
                      : 'bg-white/90 shadow-blue-500/20'
                  }`}
                >
                  {isPlaying ? (
                    <div className="flex gap-1.5">
                      <div className="w-1.5 h-6 bg-white rounded-full" />
                      <div className="w-1.5 h-6 bg-white rounded-full" />
                    </div>
                  ) : (
                    <Play className="w-8 h-8 text-blue-600 ml-1" />
                  )}
                </motion.button>
              </div>

              {/* Scene Info Overlay */}
              {isPlaying && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-16 left-4 sm:left-6 z-10"
                >
                  <p className="text-white/60 text-[10px] sm:text-xs font-medium uppercase tracking-wider mb-1">Step {currentScene + 1} of {scenes.length}</p>
                  <h3 className="text-white text-base sm:text-xl font-bold">{scenes[currentScene].title}</h3>
                  <p className="text-white/70 text-xs sm:text-sm">{scenes[currentScene].subtitle}</p>
                </motion.div>
              )}

              {/* Bottom Controls */}
              <div className="absolute bottom-0 left-0 right-0 z-10 p-4">
                {/* Progress Bar */}
                <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden mb-3">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                    style={{ width: `${totalProgress}%` }}
                    transition={{ duration: 0.05 }}
                  />
                </div>

                {/* Scene Dots */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {scenes.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => { setCurrentScene(i); setProgress(0); }}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          i === currentScene ? 'bg-blue-400 w-6' : i < currentScene ? 'bg-blue-400/60' : 'bg-white/30'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={togglePlay} className="text-white/70 hover:text-white transition-colors">
                      {isPlaying ? (
                        <div className="flex gap-0.5"><div className="w-1 h-4 bg-current rounded-sm" /><div className="w-1 h-4 bg-current rounded-sm" /></div>
                      ) : (
                        <Play className="w-4 h-4 fill-current" />
                      )}
                    </button>
                    <span className="text-white/50 text-xs font-medium">
                      {Math.floor((currentScene * SCENE_DURATION + (progress / 100) * SCENE_DURATION) / 1000)}s / {Math.floor(scenes.length * SCENE_DURATION / 1000)}s
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="text-center text-muted-foreground mt-4 text-sm">
            Interactive walkthrough of the complete clinic management workflow
          </p>
        </motion.div>
      </div>
    </section>
  );
};


// How It Works Section — visual-first with inline SVG illustrations
const STEP_DURATION = 3000;

const howItWorksSteps = [
  {
    title: 'Install Plugin',
    description: 'One-click install from WordPress directory',
    icon: <Package className="w-7 h-7" />,
    gradient: 'from-blue-500 to-indigo-500',
    stroke: '#6366f1',
  },
  {
    title: 'Configure',
    description: 'Set up doctors, services & departments',
    icon: <Building2 className="w-7 h-7" />,
    gradient: 'from-cyan-500 to-teal-500',
    stroke: '#14b8a6',
  },
  {
    title: 'Go Live',
    description: 'Start accepting appointments instantly',
    icon: <Zap className="w-7 h-7" />,
    gradient: 'from-green-500 to-emerald-500',
    stroke: '#10b981',
  },
];

const CircleProgress: React.FC<{ active: boolean; completed: boolean; stroke: string }> = ({ active, completed, stroke }) => {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;

  return (
    <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 120 120">
      <circle cx="60" cy="60" r={radius} fill="none" stroke="currentColor" strokeWidth="4" className="text-muted-foreground/10" />
      <circle
        cx="60" cy="60" r={radius} fill="none"
        stroke={stroke}
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={completed ? 0 : active ? 0 : circumference}
        className={active && !completed ? 'animate-[circleProgress_3s_linear_forwards]' : 'transition-all duration-500'}
      />
    </svg>
  );
};

const HowItWorksSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => {
        const next = (prev + 1) % howItWorksSteps.length;
        if (next === 0) {
          setCompletedSteps([]);
        } else {
          setCompletedSteps((c) => [...c, prev]);
        }
        return next;
      });
    }, STEP_DURATION);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 md:py-24 bg-background min-h-[60vh] lg:min-h-[80vh]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <Badge variant='outline' className="mb-4">How It Works</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Ready in{' '}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              3 Steps
            </span>
          </h2>
        </motion.div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 lg:gap-16">
          {howItWorksSteps.map((step, index) => {
            const isActive = activeStep === index;
            const isCompleted = completedSteps.includes(index);

            return (
              <React.Fragment key={index}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="flex flex-col items-center text-center"
                >
                  {/* Circle */}
                  <div className={`relative w-28 h-28 lg:w-32 lg:h-32 flex items-center justify-center transition-transform duration-500 ${isActive ? 'scale-110' : ''}`}>
                    <CircleProgress active={isActive} completed={isCompleted} stroke={step.stroke} />
                    <div className={`w-16 h-16 lg:w-18 lg:h-18 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center text-white shadow-lg transition-shadow duration-500 ${isActive ? 'shadow-xl shadow-blue-500/20' : ''}`}>
                      {step.icon}
                    </div>
                  </div>

                  {/* Text */}
                  <h3 className={`mt-5 text-lg font-bold transition-colors duration-300 ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground max-w-[180px]">
                    {step.description}
                  </p>
                </motion.div>

                {/* Connector line */}
                {index < howItWorksSteps.length - 1 && (
                  <div className="hidden lg:block w-20 h-0.5 bg-gradient-to-r from-muted-foreground/20 to-muted-foreground/20 relative">
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${step.gradient} transition-transform duration-700 origin-left ${
                        isCompleted ? 'scale-x-100' : 'scale-x-0'
                      }`}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Dashboard Showcase
const dashboardTabs = [
  {
    id: 'my-clinic',
    title: 'My Clinic',
    icon: <LayoutDashboard className="w-5 h-5" />,
    image: '/images/my-clinic.png',
    features: [
      'Manage Departments, Staff & Services',
      'View Total Bookings & Pending Appointments',
      'Quick Actions for instant management',
      'Recent Bookings with status tracking',
      'Package management system',
    ],
  },
  {
    id: 'practice',
    title: 'Practice',
    icon: <Stethoscope className="w-5 h-5" />,
    image: '/images/practice.png',
    features: [
      'Patient management & records',
      'Booking & appointment tracking',
      'Fee collection & revenue overview',
      'Follow-up scheduling system',
      'Detailed booking history with amounts',
    ],
  },
  {
    id: 'invoices',
    title: 'Invoices',
    icon: <FileText className="w-5 h-5" />,
    image: '/images/invoice.png',
    features: [
      'Create & manage invoices',
      'Track paid, pending & overdue invoices',
      'Partial payment support',
      'Total revenue at a glance',
      'Recent invoices with quick actions',
    ],
  },
  {
    id: 'inventory',
    title: 'Inventory',
    icon: <Boxes className="w-5 h-5" />,
    image: '/images/inventory.png',
    features: [
      'Item, category & brand management',
      'Low stock alerts & notifications',
      'Supplier management system',
      'Expiring soon tracking',
      'Total inventory value overview',
    ],
  },
  {
    id: 'integrations',
    title: 'Integrations',
    icon: <PinIcon className="w-5 h-5" />,
    image: '/images/integrations.png',
    features: [
      'Google Calendar integration',
      'WhatsApp integration',
      'Email marketing integration',
      'Social media integration',
      'Patient feedback integration',
    ],
  },
  {
    id: 'payments',
    title: 'Payments',
    icon: <CheckCircle2 className="w-5 h-5" />,
    image: '/images/payments.png',
    features: [
      'Secure payment processing',
      'Multiple payment methods',
      'Payment tracking & history',
      'Payment reminders & notifications',
      'Payment integration with third-party services',
    ],
  },
  {
    id: 'bulk-expo-import',
    title: 'Bulk Expo Import',
    icon: <Zap className="w-5 h-5" />,
    image: '/images/bulk-expo-import.png',
    features: [
      'Efficient import of patient data',
      'Simplified workflow for bulk actions',
      'Real-time updates on import status',
      'Supports multiple file formats',
      'Data validation and cleanup',
    ],
  },
  {
    id: 'staff-login',
    title: 'Staff Login',
    icon: <Globe className="w-5 h-5" />,
    image: '/images/staff-login.png',
    features: [
      'Secure login for staff members',
      'Role-based access control',
      'Password reset & recovery',
      'Audit trail for login activities',
    ],
  }
];

const AUTOPLAY_INTERVAL = 5000;

const DashboardShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setActiveTab((prev) => (prev + 1) % dashboardTabs.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [paused, next]);

  const active = dashboardTabs[activeTab];

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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Built For Modern{' '}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Clinics
            </span>
          </h2>
        </motion.div>

        <div
          className="flex flex-col lg:flex-row gap-6"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Left Tabs */}
          <div className="flex lg:flex-col gap-2 lg:w-56 shrink-0 overflow-x-auto pb-2 lg:pb-0">
            {dashboardTabs.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(index)}
                className={`flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2 lg:py-3 rounded-xl text-left transition-all duration-300 whitespace-nowrap min-w-fit lg:w-full ${
                  activeTab === index
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-card border border-border hover:bg-muted text-foreground'
                }`}
              >
                {tab.icon}
                <span className="font-medium text-xs sm:text-sm lg:text-base">{tab.title}</span>
              </button>
            ))}
          </div>

          {/* Right Content */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-3xl p-[2px] overflow-hidden"
              >
                {/* Animated border progress */}
                <div className="absolute inset-0 rounded-3xl border border-border" />
                <svg
                  key={`border-${active.id}-${activeTab}`}
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  preserveAspectRatio="none"
                >
                  <rect
                    x="1" y="1"
                    width="calc(100% - 2px)" height="calc(100% - 2px)"
                    rx="24" ry="24"
                    fill="none"
                    stroke="url(#borderGradient)"
                    strokeWidth="2.5"
                    strokeDasharray="5000"
                    strokeDashoffset="5000"
                    className="animate-[borderDraw_5s_linear_forwards]"
                  />
                  <defs>
                    <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                </svg>

                <div className="flex flex-col xl:flex-row gap-6 rounded-3xl p-6 bg-card">
                  {/* Dashboard Image */}
                  <div className="flex-1 min-w-0">
                    <img
                      src={active.image}
                      alt={active.title}
                      className="w-full rounded-2xl object-cover shadow-sm"
                    />
                  </div>

                  {/* Features */}
                  <div className="xl:w-80 shrink-0 flex flex-col justify-center p-4">
                    <h3 className="text-2xl font-bold mb-6 border-b pb-3 border-border">{active.title} Dashboard</h3>
                    <ul className="space-y-4">
                      {active.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3 text-base text-foreground">
                          <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Bottom thumbnail indicators */}
            <div className="flex gap-2 sm:gap-3 mt-6 justify-start sm:justify-center overflow-x-auto pb-2">
              {dashboardTabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`rounded-xl overflow-hidden border-2 transition-all duration-300 shrink-0 ${
                    activeTab === index
                      ? 'border-blue-600 shadow-lg scale-105'
                      : 'border-border opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={tab.image}
                    alt={tab.title}
                    className="w-16 h-10 sm:w-24 sm:h-16 object-cover object-left-top"
                  />
                </button>
              ))}
            </div>
          </div>
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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter mt-2 text-center">
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
      <PatientBookingSection />
      <VideoShowcase />
      <HowItWorksSection />
      <SecuritySection />
      <DashboardShowcase />
      <TestimonialsSection />
      <GlobalTimezoneSection />
      <FaqSection />
      <CTASection />
    </div>
  );
};

export default ClinicGoWebsite;
