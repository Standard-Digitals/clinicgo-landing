import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  User, Mail, Calendar, CreditCard, Download, Settings, LogOut,
  ChevronRight, Copy, Check, Shield, Globe, Key, ExternalLink,
  Activity, BarChart3, Users as UsersIcon, Stethoscope, Package,
  Bell, Clock, Zap, RefreshCw, CheckCircle, AlertTriangle,
  MessageSquare, FileText, Smartphone, TrendingUp
} from 'lucide-react';

interface UserData {
  id?: string;
  name?: string;
  email?: string;
  plan?: string;
  subscriptionStatus?: string;
  trialEndsAt?: string;
  subscriptionEndsAt?: string;
  freeUntil?: string;
  licenseKey?: string;
  licensedDomains?: string[];
  websiteUrl?: string;
  clinicName?: string;
  onboardingComplete?: boolean;
}

export default function Account() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) { navigate('/login'); return; }
    setUserData(JSON.parse(user));
    setLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('clinicgo_onboarding');
    navigate('/');
  };

  const copyLicenseKey = () => {
    const key = userData?.licenseKey;
    if (!key) {
      alert('No license key found. Please logout and login again to generate one.');
      return;
    }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(key);
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = key;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getDaysRemaining = () => {
    const expiry = userData?.freeUntil || userData?.subscriptionEndsAt;
    if (!expiry) return 0;
    const diff = new Date(expiry).getTime() - Date.now();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const getExpiryDate = () => {
    const expiry = userData?.freeUntil || userData?.subscriptionEndsAt;
    if (!expiry) return 'N/A';
    return new Date(expiry).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const isActive = userData?.subscriptionStatus === 'active' || userData?.subscriptionStatus === 'trialing';
  const daysRemaining = getDaysRemaining();
  const websiteDomain = userData?.websiteUrl?.replace('https://', '').replace('http://', '').replace(/\/$/, '') || '';

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 px-4 py-8 lg:py-12">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/">
              <img src="/logo.png" alt="ClinicGo" className="w-32 brightness-0 invert" />
            </Link>
            <div className="hidden sm:block h-6 w-px bg-white/10" />
            <span className="hidden sm:block text-sm text-white/40">Dashboard</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => navigate('/billing')} className="p-2 text-white/40 hover:text-white/70 hover:bg-white/5 rounded-lg transition-all" title="Notifications">
              <Bell className="w-5 h-5" />
            </button>
            <button onClick={() => navigate('/setup-guide')} className="p-2 text-white/40 hover:text-white/70 hover:bg-white/5 rounded-lg transition-all" title="Settings">
              <Settings className="w-5 h-5" />
            </button>
            <button onClick={handleLogout} className="p-2 text-white/40 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all" title="Logout">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Welcome Banner */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
          className="backdrop-blur-xl bg-gradient-to-r from-blue-500/10 to-emerald-500/10 border border-white/[0.1] rounded-2xl p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Welcome back, {userData?.name?.split(' ')[0] || 'Doctor'}</h1>
                <p className="text-sm text-white/50">{userData?.clinicName || 'Your Clinic'} · {userData?.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 ${
                isActive ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-red-500/20 text-red-300 border border-red-500/30'
              }`}>
                <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-400' : 'bg-red-400'}`} />
                {isActive ? 'Premium Active' : 'Inactive'}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Stats Row */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {[
            { icon: Calendar, label: 'Days Remaining', value: `${daysRemaining}`, color: 'blue' },
            { icon: Globe, label: 'Connected Site', value: websiteDomain || 'Not connected', color: 'emerald' },
            { icon: Shield, label: 'Plan', value: 'Premium', color: 'purple' },
            { icon: Activity, label: 'Plugin Status', value: 'Active', color: 'emerald' },
          ].map((stat, i) => (
            <div key={stat.label} className="backdrop-blur-xl bg-white/[0.05] border border-white/[0.08] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <stat.icon className={`w-4 h-4 text-${stat.color}-400`} />
                <span className="text-[11px] text-white/40">{stat.label}</span>
              </div>
              <p className="text-sm font-semibold text-white truncate">{stat.value}</p>
            </div>
          ))}
        </motion.div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">

            {/* License & Website Card */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
              className="backdrop-blur-xl bg-white/[0.05] border border-white/[0.1] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-base font-semibold text-white flex items-center gap-2">
                  <Key className="w-4 h-4 text-blue-400" /> License & Connection
                </h2>
                <span className="text-[10px] px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded-full font-medium border border-emerald-500/30">Active</span>
              </div>

              {/* License Key */}
              <div className="mb-4">
                <label className="text-xs text-white/40 mb-1.5 block">License Key</label>
                <div className="flex items-center gap-2">
                  <code className="flex-1 p-3 bg-white/[0.03] border border-white/[0.08] rounded-lg font-mono text-sm text-white tracking-wider">
                    {userData?.licenseKey || 'CGO-XXXX-XXXX-XXXX'}
                  </code>
                  <button onClick={copyLicenseKey} className="p-3 bg-white/[0.05] border border-white/[0.08] rounded-lg hover:bg-white/[0.1] transition-all">
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-white/50" />}
                  </button>
                </div>
              </div>

              {/* Connection Details Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <InfoBlock label="Domain" value={websiteDomain || '—'} />
                <InfoBlock label="Plan" value="Premium" />
                <InfoBlock label="Expires" value={getExpiryDate()} />
                <InfoBlock label="Status" value="Active" highlight />
              </div>

              {/* Connected Website */}
              {userData?.websiteUrl && (
                <div className="mt-4 p-3 bg-white/[0.03] border border-white/[0.06] rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                      <Globe className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-white font-medium">{websiteDomain}</p>
                      <p className="text-[11px] text-white/30">WordPress · ClinicGo Plugin Active</p>
                    </div>
                  </div>
                  <a href={`${userData.websiteUrl}/wp-admin/admin.php?page=clinicgo-dashboard`} target="_blank" rel="noopener noreferrer"
                    className="p-2 bg-white/[0.05] border border-white/[0.08] rounded-lg hover:bg-white/[0.1] transition-all">
                    <ExternalLink className="w-4 h-4 text-white/50" />
                  </a>
                </div>
              )}
            </motion.div>

            {/* Subscription Card */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="backdrop-blur-xl bg-white/[0.05] border border-white/[0.1] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-base font-semibold text-white flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-blue-400" /> Subscription
                </h2>
                <Link to="/billing" className="text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1">
                  Manage <ChevronRight className="w-3 h-3" />
                </Link>
              </div>

              {/* Free Until Aug 31 Banner */}
              <div className="p-4 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 rounded-xl mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Free Premium Access</p>
                    <p className="text-xs text-white/50">All features unlocked until August 31, 2025 · {daysRemaining} days remaining</p>
                  </div>
                </div>
                <div className="mt-3 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full" style={{ width: `${Math.max(5, 100 - (daysRemaining / 90) * 100)}%` }} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-center">
                  <p className="text-[10px] text-white/30 mb-1">Plan</p>
                  <p className="text-sm font-semibold text-white">Premium</p>
                </div>
                <div className="p-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-center">
                  <p className="text-[10px] text-white/30 mb-1">Billing</p>
                  <p className="text-sm font-semibold text-white">Free</p>
                </div>
                <div className="p-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-center">
                  <p className="text-[10px] text-white/30 mb-1">Next Payment</p>
                  <p className="text-sm font-semibold text-white">Sep 1</p>
                </div>
              </div>
            </motion.div>

            {/* Features / Modules */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
              className="backdrop-blur-xl bg-white/[0.05] border border-white/[0.1] rounded-2xl p-6">
              <h2 className="text-base font-semibold text-white flex items-center gap-2 mb-5">
                <Package className="w-4 h-4 text-blue-400" /> Active Modules
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { icon: Calendar, label: 'Appointments', active: true },
                  { icon: CreditCard, label: 'Billing', active: true },
                  { icon: UsersIcon, label: 'Patients', active: true },
                  { icon: Package, label: 'Inventory', active: true },
                  { icon: MessageSquare, label: 'WhatsApp', active: true },
                  { icon: UsersIcon, label: 'Staff Mgmt', active: true },
                  { icon: BarChart3, label: 'Reports', active: true },
                  { icon: Smartphone, label: 'Google Cal', active: true },
                ].map(mod => (
                  <div key={mod.label} className={`p-3 rounded-xl border text-center transition-all ${
                    mod.active ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-white/[0.02] border-white/[0.06] opacity-50'
                  }`}>
                    <mod.icon className={`w-4 h-4 mx-auto mb-1.5 ${mod.active ? 'text-emerald-400' : 'text-white/30'}`} />
                    <p className={`text-[10px] font-medium ${mod.active ? 'text-emerald-300' : 'text-white/30'}`}>{mod.label}</p>
                    {mod.active && <CheckCircle className="w-3 h-3 text-emerald-400 mx-auto mt-1" />}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">

            {/* Quick Actions */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
              className="backdrop-blur-xl bg-white/[0.05] border border-white/[0.1] rounded-2xl p-6">
              <h2 className="text-base font-semibold text-white mb-4">Quick Actions</h2>
              <div className="space-y-2">
                {userData?.websiteUrl && (
                  <QuickAction icon={ExternalLink} label="Open WP-Admin" subtitle="Manage your clinic"
                    onClick={() => window.open(`${userData.websiteUrl}/wp-admin/admin.php?page=clinicgo-dashboard`, '_blank')} />
                )}
                <QuickAction icon={Download} label="Download Plugin" subtitle="Latest version" onClick={() => navigate('/download')} />
                <QuickAction icon={FileText} label="Setup Guide" subtitle="Installation help" onClick={() => navigate('/setup-guide')} />
                <QuickAction icon={CreditCard} label="Billing" subtitle="Manage subscription" onClick={() => navigate('/billing')} />
                <QuickAction icon={RefreshCw} label="Sync License" subtitle="Re-verify activation" />
              </div>
            </motion.div>

            {/* Account Info */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="backdrop-blur-xl bg-white/[0.05] border border-white/[0.1] rounded-2xl p-6">
              <h2 className="text-base font-semibold text-white mb-4">Account</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-white/[0.03] border border-white/[0.06] rounded-xl">
                  <Mail className="w-4 h-4 text-white/30" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-white/40">Email</p>
                    <p className="text-sm text-white truncate">{userData?.email}</p>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 bg-emerald-500/20 text-emerald-300 rounded font-medium">Verified</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/[0.03] border border-white/[0.06] rounded-xl">
                  <User className="w-4 h-4 text-white/30" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-white/40">Name</p>
                    <p className="text-sm text-white">{userData?.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/[0.03] border border-white/[0.06] rounded-xl">
                  <Stethoscope className="w-4 h-4 text-white/30" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-white/40">Clinic</p>
                    <p className="text-sm text-white">{userData?.clinicName || '—'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/[0.03] border border-white/[0.06] rounded-xl">
                  <Clock className="w-4 h-4 text-white/30" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-white/40">Member Since</p>
                    <p className="text-sm text-white">{new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Support */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
              className="backdrop-blur-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/[0.1] rounded-2xl p-6">
              <h2 className="text-base font-semibold text-white mb-2">Need Help?</h2>
              <p className="text-xs text-white/40 mb-4">Our support team is available 24/7</p>
              <div className="space-y-2">
                <Link to="/contact" className="w-full py-2.5 bg-white/[0.08] border border-white/[0.1] text-white/70 text-sm font-medium rounded-xl hover:bg-white/[0.12] transition-all flex items-center justify-center gap-2">
                  <MessageSquare className="w-4 h-4" /> Contact Support
                </Link>
                <a href="https://docs.clinicgo.com" target="_blank" rel="noopener noreferrer"
                  className="w-full py-2.5 bg-white/[0.05] border border-white/[0.08] text-white/50 text-sm font-medium rounded-xl hover:bg-white/[0.08] transition-all flex items-center justify-center gap-2">
                  <FileText className="w-4 h-4" /> Documentation
                </a>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </main>
  );
}

function InfoBlock({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="p-2.5 bg-white/[0.03] border border-white/[0.06] rounded-lg">
      <p className="text-[10px] text-white/30 mb-0.5">{label}</p>
      <p className={`text-xs font-medium truncate ${highlight ? 'text-emerald-400' : 'text-white'}`}>{value}</p>
    </div>
  );
}

function QuickAction({ icon: Icon, label, subtitle, onClick }: { icon: any; label: string; subtitle: string; onClick?: () => void }) {
  return (
    <button onClick={onClick}
      className="w-full flex items-center gap-3 p-3 bg-white/[0.03] border border-white/[0.06] rounded-xl hover:bg-white/[0.07] hover:border-white/[0.12] transition-all text-left group">
      <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-all">
        <Icon className="w-4 h-4 text-blue-400" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-white font-medium">{label}</p>
        <p className="text-[11px] text-white/30">{subtitle}</p>
      </div>
      <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/40 transition-all" />
    </button>
  );
}
