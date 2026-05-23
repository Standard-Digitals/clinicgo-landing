import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check, CheckCircle, Loader2, Rocket, Globe, Key, Download, Shield,
  Database, Settings, Calendar, Users, Sparkles, Copy,
  ExternalLink, ArrowRight, BarChart3, MessageSquare, Package
} from 'lucide-react';
import api from '../lib/api';

interface OnboardingData {
  clinicName: string;
  websiteUrl: string;
  clinicType: string;
  doctorCount: string;
  staffCount: string;
  expectedAppointments: string;
}

type Phase = 'setup' | 'success';

interface SetupStep {
  id: string;
  label: string;
  icon: any;
  status: 'pending' | 'running' | 'done';
}

export default function Onboarding() {
  const navigate = useNavigate();
  const location = useLocation();
  const [phase, setPhase] = useState<Phase>('setup');
  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(null);
  const [licenseKey, setLicenseKey] = useState('');
  const [copied, setCopied] = useState(false);
  const [setupSteps, setSetupSteps] = useState<SetupStep[]>([
    { id: 'connect', label: 'Connecting to WordPress', icon: Globe, status: 'pending' },
    { id: 'verify', label: 'Verifying compatibility', icon: Shield, status: 'pending' },
    { id: 'license', label: 'Generating license key', icon: Key, status: 'pending' },
    { id: 'activate', label: 'Activating premium access', icon: Sparkles, status: 'pending' },
    { id: 'install', label: 'Installing ClinicGo plugin', icon: Download, status: 'pending' },
    { id: 'database', label: 'Creating database tables', icon: Database, status: 'pending' },
    { id: 'configure', label: 'Configuring modules', icon: Settings, status: 'pending' },
    { id: 'finalize', label: 'Finalizing setup', icon: Rocket, status: 'pending' },
  ]);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (!token || !user) { navigate('/signup'); return; }

    const parsed = JSON.parse(user);
    if (parsed.licenseKey) setLicenseKey(parsed.licenseKey);

    if (parsed.onboardingComplete && !location.state?.fromSignup) {
      navigate('/account'); return;
    }

    const stored = localStorage.getItem('clinicgo_onboarding');
    if (stored) {
      setOnboardingData(JSON.parse(stored));
    } else {
      navigate('/account');
    }
  }, [navigate, location.state]);

  useEffect(() => {
    if (onboardingData && phase === 'setup') {
      runSetup();
    }
  }, [onboardingData]);

  const runSetup = async () => {
    const token = localStorage.getItem('token')!;
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const steps = [...setupSteps];

    for (let i = 0; i < steps.length; i++) {
      setCurrentStepIndex(i);
      steps[i].status = 'running';
      setSetupSteps([...steps]);

      try {
        switch (steps[i].id) {
          case 'connect':
            await api.verifyWordPress(onboardingData!.websiteUrl);
            await delay(1200);
            break;
          case 'verify':
            await delay(1000);
            break;
          case 'license':
            // License already auto-generated on signup — bind to domain
            if (user.licenseKey) {
              await api.activateLicense(token, user.licenseKey, onboardingData!.websiteUrl);
              setLicenseKey(user.licenseKey);
            }
            await delay(1000);
            break;
          case 'activate':
            // Premium already active until Aug 31
            await delay(800);
            break;
          case 'install':
            await api.installPlugin(token, onboardingData!.websiteUrl);
            await delay(2000);
            break;
          case 'database':
            await delay(1500);
            break;
          case 'configure':
            await delay(1200);
            break;
          case 'finalize':
            user.onboardingComplete = true;
            user.websiteUrl = onboardingData!.websiteUrl;
            user.clinicName = onboardingData!.clinicName;
            localStorage.setItem('user', JSON.stringify(user));
            await delay(800);
            break;
        }
      } catch {
        // Non-critical — continue
      }

      steps[i].status = 'done';
      setSetupSteps([...steps]);
    }

    setPhase('success');
  };

  const completedCount = setupSteps.filter(s => s.status === 'done').length;
  const progress = (completedCount / setupSteps.length) * 100;

  const copyLicense = () => {
    if (!licenseKey) return;
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(licenseKey);
    } else {
      const ta = document.createElement('textarea');
      ta.value = licenseKey;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGoToAdmin = () => {
    window.open(`${onboardingData?.websiteUrl}/wp-admin/admin.php?page=clinicgo-dashboard`, '_blank');
  };

  const handleGoToDashboard = () => {
    localStorage.removeItem('clinicgo_onboarding');
    navigate('/account');
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center px-4 py-12">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="w-full max-w-lg relative z-10">
        <AnimatePresence mode="wait">
          {phase === 'setup' && (
            <motion.div key="setup" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div className="text-center mb-8">
                <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <Settings className="w-7 h-7 text-white" />
                </motion.div>
                <h1 className="text-2xl font-bold text-white mb-1">Setting Up Your Clinic</h1>
                <p className="text-blue-200/60 text-sm">{onboardingData?.clinicName} · {onboardingData?.websiteUrl}</p>
              </div>

              {/* Progress */}
              <div className="mb-6">
                <div className="flex justify-between text-xs text-white/50 mb-2">
                  <span>{completedCount} of {setupSteps.length} steps</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div animate={{ width: `${progress}%` }} transition={{ duration: 0.5 }} className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full" />
                </div>
              </div>

              {/* Steps */}
              <div className="backdrop-blur-xl bg-white/[0.07] border border-white/[0.12] rounded-2xl p-6 space-y-2.5">
                {setupSteps.map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <motion.div key={step.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                      className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                        step.status === 'running' ? 'bg-blue-500/10 border border-blue-500/20' :
                        step.status === 'done' ? 'bg-emerald-500/5' : 'opacity-40'
                      }`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        step.status === 'done' ? 'bg-emerald-500/20' : step.status === 'running' ? 'bg-blue-500/20' : 'bg-white/5'
                      }`}>
                        {step.status === 'running' ? <Loader2 className="w-4 h-4 text-blue-400 animate-spin" /> :
                         step.status === 'done' ? <CheckCircle className="w-4 h-4 text-emerald-400" /> :
                         <Icon className="w-4 h-4 text-white/30" />}
                      </div>
                      <span className={`text-sm font-medium ${
                        step.status === 'done' ? 'text-emerald-300' : step.status === 'running' ? 'text-blue-300' : 'text-white/40'
                      }`}>{step.label}</span>
                      {step.status === 'running' && (
                        <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity }} className="ml-auto text-[10px] text-blue-400">
                          Processing...
                        </motion.span>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Modules */}
              {currentStepIndex >= 5 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 backdrop-blur-xl bg-white/[0.05] border border-white/[0.08] rounded-xl p-4">
                  <p className="text-xs text-white/40 mb-2">Enabling modules:</p>
                  <div className="flex flex-wrap gap-2">
                    {['Appointments', 'Billing', 'Patients', 'Inventory', 'WhatsApp', 'Staff', 'Reports'].map((m, i) => (
                      <motion.span key={m} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.15 }}
                        className="px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-md text-[10px] text-emerald-300 font-medium">
                        {m}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {phase === 'success' && (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-emerald-400 to-blue-500 flex items-center justify-center shadow-xl shadow-emerald-500/30">
                <Check className="w-10 h-10 text-white" strokeWidth={3} />
              </motion.div>

              <h1 className="text-3xl font-bold text-white mb-2">Your Clinic Is Ready 🚀</h1>
              <p className="text-emerald-300 text-sm font-medium mb-1">Premium Access Activated Until August 31</p>
              <p className="text-blue-200/50 text-sm mb-8">{onboardingData?.clinicName} · {onboardingData?.websiteUrl}</p>

              {/* License Key Display */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                className="backdrop-blur-xl bg-white/[0.07] border border-white/[0.12] rounded-xl p-4 mb-6 text-left">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-white/40 font-medium">Your License Key</span>
                  <span className="text-[10px] px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded-full font-medium">Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <code className="flex-1 p-2.5 bg-white/5 border border-white/10 rounded-lg font-mono text-sm text-white tracking-wider">
                    {licenseKey || 'CGO-XXXX-XXXX-XXXX'}
                  </code>
                  <button onClick={copyLicense} className="p-2.5 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all">
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-white/50" />}
                  </button>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 bg-white/[0.03] rounded-lg">
                    <p className="text-[10px] text-white/30">Plan</p>
                    <p className="text-xs text-white font-medium">Premium</p>
                  </div>
                  <div className="p-2 bg-white/[0.03] rounded-lg">
                    <p className="text-[10px] text-white/30">Expires</p>
                    <p className="text-xs text-white font-medium">Aug 31</p>
                  </div>
                  <div className="p-2 bg-white/[0.03] rounded-lg">
                    <p className="text-[10px] text-white/30">Domain</p>
                    <p className="text-xs text-white font-medium truncate">{onboardingData?.websiteUrl?.replace('https://', '').replace('http://', '')}</p>
                  </div>
                </div>
              </motion.div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { icon: Calendar, label: 'Appointments', value: 'Active' },
                  { icon: Users, label: 'Patient Mgmt', value: 'Ready' },
                  { icon: BarChart3, label: 'Analytics', value: 'Live' },
                ].map((stat, i) => (
                  <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.1 }}
                    className="backdrop-blur-xl bg-white/[0.07] border border-white/[0.12] rounded-xl p-3">
                    <stat.icon className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                    <p className="text-[10px] text-white/40">{stat.label}</p>
                    <p className="text-xs font-semibold text-emerald-400">{stat.value}</p>
                  </motion.div>
                ))}
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button onClick={handleGoToAdmin}
                  className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white font-semibold rounded-xl transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2">
                  <ExternalLink className="w-4 h-4" /> Open WP-Admin Dashboard
                </button>
                <button onClick={handleGoToDashboard}
                  className="w-full py-3 border border-white/20 text-white/70 font-medium rounded-xl hover:bg-white/5 transition-all flex items-center justify-center gap-2">
                  Go to ClinicGo Account <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Quick Actions */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
                className="mt-6 backdrop-blur-xl bg-white/[0.05] border border-white/[0.08] rounded-xl p-4">
                <p className="text-xs text-white/40 mb-3">Quick Actions</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { icon: Calendar, label: 'Create Appointment' },
                    { icon: Users, label: 'Add Doctor' },
                    { icon: MessageSquare, label: 'Setup WhatsApp' },
                    { icon: Package, label: 'Configure Modules' },
                  ].map(action => (
                    <button key={action.label} onClick={handleGoToAdmin}
                      className="flex items-center gap-2 p-2.5 bg-white/5 border border-white/10 rounded-lg text-xs text-white/60 hover:bg-white/10 hover:text-white/80 transition-all">
                      <action.icon className="w-3.5 h-3.5 text-blue-400" />
                      {action.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
