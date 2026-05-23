import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Eye, EyeOff, Mail, Lock, User, ArrowRight, ArrowLeft, AlertCircle,
  Building2, Globe, Key, Users, Stethoscope, CheckCircle, Loader2,
  Shield, Sparkles, Activity
} from 'lucide-react';
import api from '../lib/api';

const STEPS = [
  { id: 1, title: 'Account', icon: User },
  { id: 2, title: 'Website', icon: Globe },
  { id: 3, title: 'License', icon: Key },
  { id: 4, title: 'Clinic', icon: Stethoscope },
];

interface FormData {
  name: string;
  clinicName: string;
  email: string;
  password: string;
  confirmPassword: string;
  websiteUrl: string;
  licenseKey: string;
  plan: 'trial' | 'premium';
  clinicType: string;
  doctorCount: string;
  staffCount: string;
  expectedAppointments: string;
}

interface WpStatus {
  checking: boolean;
  isWordPress: boolean | null;
  hasWpAdmin: boolean | null;
  error: string;
}

export default function Signup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '', clinicName: '', email: '', password: '', confirmPassword: '',
    websiteUrl: '', licenseKey: '', plan: 'trial',
    clinicType: '', doctorCount: '', staffCount: '', expectedAppointments: ''
  });
  const [wpStatus, setWpStatus] = useState<WpStatus>({
    checking: false, isWordPress: null, hasWpAdmin: null, error: ''
  });

  const update = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  // WordPress URL validation with debounce
  useEffect(() => {
    if (!formData.websiteUrl || formData.websiteUrl.length < 8) {
      setWpStatus({ checking: false, isWordPress: null, hasWpAdmin: null, error: '' });
      return;
    }

    const timer = setTimeout(() => {
      verifyWordPress(formData.websiteUrl);
    }, 1000);

    return () => clearTimeout(timer);
  }, [formData.websiteUrl]);

  const verifyWordPress = async (url: string) => {
    setWpStatus({ checking: true, isWordPress: null, hasWpAdmin: null, error: '' });
    try {
      const cleanUrl = url.replace(/\/$/, '');
      const res = await api.verifyWordPress(cleanUrl);
      if (!res.ok) {
        // API returned error — don't block user, just skip verification
        setWpStatus({ checking: false, isWordPress: null, hasWpAdmin: null, error: '' });
        return;
      }
      const data = await res.json();
      setWpStatus({
        checking: false,
        isWordPress: data.isWordPress ?? null,
        hasWpAdmin: data.hasWpAdmin ?? null,
        error: data.isWordPress === false ? 'WordPress not detected on this URL' : ''
      });
    } catch {
      // Network error or function unavailable — skip verification silently
      setWpStatus({ checking: false, isWordPress: null, hasWpAdmin: null, error: '' });
    }
  };

  const validateStep = (): boolean => {
    switch (step) {
      case 1:
        if (!formData.name || !formData.clinicName || !formData.email || !formData.password || !formData.confirmPassword) {
          setError('Please fill in all fields');
          return false;
        }
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          return false;
        }
        if (formData.password.length < 8) {
          setError('Password must be at least 8 characters');
          return false;
        }
        return true;
      case 2:
        if (!formData.websiteUrl) {
          setError('Please enter your WordPress website URL');
          return false;
        }
        // Only block if verification explicitly returned false (not null/unverified)
        if (wpStatus.isWordPress === false && wpStatus.error) {
          setError('WordPress not detected. Please check the URL or continue anyway.');
          return false;
        }
        // Validate URL format
        try {
          const urlObj = new URL(formData.websiteUrl);
          if (!urlObj.protocol.startsWith('http')) {
            setError('URL must start with http:// or https://');
            return false;
          }
        } catch {
          setError('Please enter a valid URL (e.g. https://myclinic.com)');
          return false;
        }
        return true;
      case 3:
        if (formData.plan === 'premium' && !formData.licenseKey) {
          setError('Please enter your license key');
          return false;
        }
        return true;
      case 4:
        if (!formData.clinicType) {
          setError('Please select your clinic type');
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep()) {
      setError('');
      setStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setError('');
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;
    setLoading(true);
    setError('');

    try {
      const res = await api.signup({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Signup failed');

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('clinicgo_onboarding', JSON.stringify({
        clinicName: formData.clinicName,
        websiteUrl: formData.websiteUrl.replace(/\/$/, ''),
        licenseKey: formData.licenseKey,
        plan: formData.plan,
        clinicType: formData.clinicType,
        doctorCount: formData.doctorCount,
        staffCount: formData.staffCount,
        expectedAppointments: formData.expectedAppointments
      }));

      navigate('/onboarding', { state: { fromSignup: true } });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const progress = (step / STEPS.length) * 100;

  return (
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center px-4 py-12">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-3xl" />
        {/* Floating healthcare icons */}
        <motion.div animate={{ y: [-10, 10, -10] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-20 right-[20%] text-blue-400/20">
          <Activity size={40} />
        </motion.div>
        <motion.div animate={{ y: [10, -10, 10] }} transition={{ duration: 5, repeat: Infinity }} className="absolute bottom-32 left-[15%] text-emerald-400/20">
          <Stethoscope size={36} />
        </motion.div>
        <motion.div animate={{ y: [-8, 8, -8] }} transition={{ duration: 3.5, repeat: Infinity }} className="absolute top-40 left-[10%] text-blue-400/15">
          <Shield size={32} />
        </motion.div>
      </div>

      <div className="w-full max-w-xl relative z-10">
        {/* Logo & Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <Link to="/" className="inline-block mb-4">
            <img src="/logo.png" alt="ClinicGo" className="w-40 mx-auto brightness-0 invert" />
          </Link>
          <h1 className="text-2xl font-bold text-white mb-1">Setup Your Clinic</h1>
          <p className="text-blue-200/70 text-sm">Enterprise healthcare management in minutes</p>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            {STEPS.map((s) => {
              const Icon = s.icon;
              const isActive = step >= s.id;
              const isCurrent = step === s.id;
              return (
                <div key={s.id} className="flex flex-col items-center gap-1">
                  <motion.div
                    animate={{ scale: isCurrent ? 1.1 : 1 }}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isActive ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30' : 'bg-white/10 text-white/40'
                    } ${isCurrent ? 'ring-2 ring-blue-400/50' : ''}`}
                  >
                    {step > s.id ? <CheckCircle className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                  </motion.div>
                  <span className={`text-[10px] font-medium ${isActive ? 'text-blue-300' : 'text-white/30'}`}>{s.title}</span>
                </div>
              );
            })}
          </div>
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div animate={{ width: `${progress}%` }} className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full" />
          </div>
        </div>

        {/* Main Card - Glassmorphism */}
        <motion.div
          layout
          className="backdrop-blur-xl bg-white/[0.07] border border-white/[0.12] rounded-2xl p-8 shadow-2xl"
        >
          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-300">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-blue-400" /> Basic Information
                  </h2>
                  <p className="text-sm text-white/50 mt-1">Tell us about you and your clinic</p>
                </div>

                <InputField icon={User} label="Full Name" placeholder="Dr. John Doe" value={formData.name} onChange={(v) => update('name', v)} />
                <InputField icon={Building2} label="Clinic / Company Name" placeholder="City Health Clinic" value={formData.clinicName} onChange={(v) => update('clinicName', v)} />
                <InputField icon={Mail} label="Email Address" placeholder="john@clinic.com" type="email" value={formData.email} onChange={(v) => update('email', v)} />
                <InputField icon={Lock} label="Password" placeholder="Min. 8 characters" type={showPassword ? 'text' : 'password'} value={formData.password} onChange={(v) => update('password', v)}
                  suffix={<button type="button" onClick={() => setShowPassword(!showPassword)} className="text-white/40 hover:text-white/70">{showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>}
                />
                <InputField icon={Lock} label="Confirm Password" placeholder="Re-enter password" type={showPassword ? 'text' : 'password'} value={formData.confirmPassword} onChange={(v) => update('confirmPassword', v)} />
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Globe className="w-5 h-5 text-blue-400" /> WordPress Website
                  </h2>
                  <p className="text-sm text-white/50 mt-1">We'll connect ClinicGo to your WordPress site</p>
                </div>

                <InputField icon={Globe} label="WordPress Website URL" placeholder="https://myclinic.com" value={formData.websiteUrl} onChange={(v) => update('websiteUrl', v)} />

                {/* WordPress Detection Status */}
                {formData.websiteUrl.length > 8 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2 mt-4">
                    <StatusItem loading={wpStatus.checking} success={wpStatus.isWordPress} label="WordPress Installation" />
                    <StatusItem loading={wpStatus.checking} success={wpStatus.hasWpAdmin} label="WP-Admin Access" />
                    {wpStatus.isWordPress && (
                      <StatusItem loading={false} success={true} label="REST API Available" />
                    )}
                  </motion.div>
                )}

                <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                  <h4 className="text-sm font-medium text-blue-300 mb-2">What happens next?</h4>
                  <ul className="space-y-1.5 text-xs text-white/60">
                    <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-blue-400" /> Plugin installs automatically</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-blue-400" /> Database tables created</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-blue-400" /> Core modules activated</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-blue-400" /> Redirect to your wp-admin</li>
                  </ul>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Key className="w-5 h-5 text-blue-400" /> License Activation
                  </h2>
                  <p className="text-sm text-white/50 mt-1">Activate your ClinicGo license</p>
                </div>

                {/* Plan Selection */}
                <div className="grid grid-cols-2 gap-3">
                  <PlanCard active={formData.plan === 'trial'} onClick={() => update('plan', 'trial')} title="Free Trial" subtitle="14 days full access" badge="FREE" />
                  <PlanCard active={formData.plan === 'premium'} onClick={() => update('plan', 'premium')} title="Premium" subtitle="Unlimited access" badge="PRO" />
                </div>

                {formData.plan === 'premium' && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                    <InputField icon={Key} label="License Key" placeholder="SDB-XXXX-XXXX-XXXX" value={formData.licenseKey} onChange={(v) => update('licenseKey', v.toUpperCase())} />
                  </motion.div>
                )}

                <div className="mt-4 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                  <h4 className="text-sm font-medium text-emerald-300 mb-2">Included Features</h4>
                  <div className="grid grid-cols-2 gap-1.5 text-xs text-white/60">
                    {['Appointment Booking', 'Billing & Invoices', 'Patient Management', 'Inventory', 'WhatsApp Integration', 'Staff Management', 'Reports & Analytics', 'Google Calendar'].map(f => (
                      <span key={f} className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-emerald-400" />{f}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Stethoscope className="w-5 h-5 text-blue-400" /> Clinic Details
                  </h2>
                  <p className="text-sm text-white/50 mt-1">Help us configure your setup</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Clinic Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['General Practice', 'Dental Clinic', 'Eye Care', 'Dermatology', 'Pediatrics', 'Multi-Specialty'].map(type => (
                      <button key={type} onClick={() => update('clinicType', type)}
                        className={`p-3 rounded-xl text-xs font-medium transition-all border ${
                          formData.clinicType === type
                            ? 'bg-blue-500/20 border-blue-500/40 text-blue-300'
                            : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                        }`}
                      >{type}</button>
                    ))}
                  </div>
                </div>

                <SelectField label="Number of Doctors" value={formData.doctorCount} onChange={(v) => update('doctorCount', v)} options={['1-2', '3-5', '6-10', '10+']} />
                <SelectField label="Number of Staff" value={formData.staffCount} onChange={(v) => update('staffCount', v)} options={['1-3', '4-8', '9-15', '15+']} />
                <SelectField label="Expected Monthly Appointments" value={formData.expectedAppointments} onChange={(v) => update('expectedAppointments', v)} options={['< 50', '50-200', '200-500', '500+']} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex gap-3 mt-8">
            {step > 1 && (
              <button onClick={prevStep} className="flex-1 py-3 border border-white/20 text-white/70 font-medium rounded-xl hover:bg-white/5 transition-all flex items-center justify-center gap-2">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            )}
            {step < 4 ? (
              <button onClick={nextStep} className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2">
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button onClick={handleSubmit} disabled={loading} className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white font-semibold rounded-xl transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 disabled:opacity-50">
                {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Setting Up...</> : <><Sparkles className="w-4 h-4" /> Setup My Clinic</>}
              </button>
            )}
          </div>
        </motion.div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-white/40">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium">Sign in</Link>
          {' · '}
          <Link to="/privacy" className="text-white/40 hover:text-white/60">Privacy Policy</Link>
        </p>
      </div>
    </main>
  );
}

// Reusable Components

function InputField({ icon: Icon, label, placeholder, type = 'text', value, onChange, suffix }: {
  icon: any; label: string; placeholder: string; type?: string; value: string; onChange: (v: string) => void; suffix?: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-white/70 mb-1.5">{label}</label>
      <div className="relative">
        <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-10 pr-10 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/30 transition-all text-sm"
        />
        {suffix && <div className="absolute right-3 top-1/2 -translate-y-1/2">{suffix}</div>}
      </div>
    </div>
  );
}

function StatusItem({ loading, success, label }: { loading: boolean; success: boolean | null; label: string }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      {loading ? (
        <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
      ) : success ? (
        <CheckCircle className="w-4 h-4 text-emerald-400" />
      ) : success === false ? (
        <AlertCircle className="w-4 h-4 text-red-400" />
      ) : (
        <div className="w-4 h-4 rounded-full border border-white/20" />
      )}
      <span className={success ? 'text-emerald-300' : success === false ? 'text-red-300' : 'text-white/50'}>{label}</span>
    </div>
  );
}

function PlanCard({ active, onClick, title, subtitle, badge }: { active: boolean; onClick: () => void; title: string; subtitle: string; badge: string }) {
  return (
    <button onClick={onClick} className={`p-4 rounded-xl border text-left transition-all ${
      active ? 'bg-blue-500/15 border-blue-500/40 shadow-lg shadow-blue-500/10' : 'bg-white/5 border-white/10 hover:bg-white/10'
    }`}>
      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${active ? 'bg-blue-500/30 text-blue-300' : 'bg-white/10 text-white/40'}`}>{badge}</span>
      <p className={`text-sm font-semibold mt-2 ${active ? 'text-white' : 'text-white/70'}`}>{title}</p>
      <p className="text-xs text-white/40 mt-0.5">{subtitle}</p>
    </button>
  );
}

function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <div>
      <label className="block text-sm font-medium text-white/70 mb-1.5">{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full py-2.5 px-4 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none cursor-pointer">
        <option value="" className="bg-slate-900">Select...</option>
        {options.map(o => <option key={o} value={o} className="bg-slate-900">{o}</option>)}
      </select>
    </div>
  );
}
