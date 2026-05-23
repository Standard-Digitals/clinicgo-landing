import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CreditCard, Calendar, ChevronLeft, Check, AlertCircle, Shield,
  Clock, X, Zap, Receipt, ArrowRight, CheckCircle
} from 'lucide-react';
import api from '../lib/api';

export default function Billing() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [changingPlan, setChangingPlan] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) { navigate('/login'); return; }
    setUserData(JSON.parse(user));
    setLoading(false);
  }, [navigate]);

  const getDaysRemaining = () => {
    const expiry = userData?.freeUntil || userData?.subscriptionEndsAt;
    if (!expiry) return 0;
    return Math.max(0, Math.ceil((new Date(expiry).getTime() - Date.now()) / (1000 * 60 * 60 * 24)));
  };

  const handleChangePlan = async (newPlan: string) => {
    setChangingPlan(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await api.changePlan(token!, newPlan);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to change plan');
      const updated = { ...userData, plan: newPlan };
      localStorage.setItem('user', JSON.stringify(updated));
      setUserData(updated);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setChangingPlan(false);
    }
  };

  const handleCancel = async () => {
    if (!confirm('Are you sure? Access continues until your plan expires.')) return;
    setChangingPlan(true);
    try {
      const token = localStorage.getItem('token');
      const res = await api.cancelSubscription(token!);
      if (!res.ok) throw new Error('Failed to cancel');
      const updated = { ...userData, subscriptionStatus: 'canceled' };
      localStorage.setItem('user', JSON.stringify(updated));
      setUserData(updated);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setChangingPlan(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full" />
      </main>
    );
  }

  const daysRemaining = getDaysRemaining();
  const isActive = userData?.subscriptionStatus === 'active' || userData?.subscriptionStatus === 'trialing';

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 px-4 py-8 lg:py-12">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
          <button onClick={() => navigate('/account')} className="flex items-center gap-2 text-white/50 hover:text-white/80 transition-all text-sm">
            <ChevronLeft className="w-4 h-4" /> Back to Dashboard
          </button>
          <Link to="/">
            <img src="/logo.png" alt="ClinicGo" className="w-28 brightness-0 invert" />
          </Link>
        </motion.div>

        {/* Title */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-1">Billing & Subscription</h1>
          <p className="text-sm text-white/40">Manage your plan and payment methods</p>
        </motion.div>

        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-300">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">{error}</span>
          </motion.div>
        )}

        {/* Free Access Banner */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
          className="backdrop-blur-xl bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
              <Zap className="w-6 h-6 text-emerald-400" />
            </div>
            <div className="flex-1">
              <p className="text-base font-semibold text-white">Free Premium Access Until August 31</p>
              <p className="text-xs text-white/50 mt-0.5">{daysRemaining} days remaining · No payment required</p>
              <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full" style={{ width: `${Math.max(5, 100 - (daysRemaining / 90) * 100)}%` }} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Current Plan */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="backdrop-blur-xl bg-white/[0.05] border border-white/[0.1] rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-semibold text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-400" /> Current Plan
            </h2>
            <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${isActive ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-red-500/20 text-red-300 border border-red-500/30'}`}>
              {isActive ? 'Active' : 'Canceled'}
            </span>
          </div>

          {/* Plan Options */}
          <div className="grid sm:grid-cols-2 gap-3 mb-5">
            <button onClick={() => handleChangePlan('monthly')} disabled={changingPlan}
              className={`p-4 rounded-xl border text-left transition-all ${userData?.plan === 'monthly' || userData?.plan === 'premium' ? 'bg-blue-500/10 border-blue-500/30' : 'bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.06]'} disabled:opacity-50`}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-semibold text-white">Monthly</span>
                <span className="text-lg font-bold text-blue-400">₹49<span className="text-xs text-white/30">/mo</span></span>
              </div>
              <p className="text-[11px] text-white/40">Billed monthly after free period</p>
              {(userData?.plan === 'monthly' || userData?.plan === 'premium') && <CheckCircle className="w-4 h-4 text-blue-400 mt-2" />}
            </button>

            <button onClick={() => handleChangePlan('yearly')} disabled={changingPlan}
              className={`p-4 rounded-xl border text-left transition-all ${userData?.plan === 'yearly' ? 'bg-blue-500/10 border-blue-500/30' : 'bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.06]'} disabled:opacity-50`}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-semibold text-white">Yearly</span>
                <span className="text-lg font-bold text-blue-400">₹490<span className="text-xs text-white/30">/yr</span></span>
              </div>
              <p className="text-[11px] text-white/40">Save 16% · Best value</p>
              <span className="inline-block mt-1.5 px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-[10px] font-medium rounded-full">Save ₹98</span>
              {userData?.plan === 'yearly' && <CheckCircle className="w-4 h-4 text-blue-400 mt-2" />}
            </button>
          </div>

          {/* Plan Details */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-center">
              <p className="text-[10px] text-white/30 mb-0.5">Status</p>
              <p className="text-xs font-semibold text-emerald-400">{isActive ? 'Active' : 'Canceled'}</p>
            </div>
            <div className="p-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-center">
              <p className="text-[10px] text-white/30 mb-0.5">Free Until</p>
              <p className="text-xs font-semibold text-white">Aug 31, 2025</p>
            </div>
            <div className="p-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-center">
              <p className="text-[10px] text-white/30 mb-0.5">Next Charge</p>
              <p className="text-xs font-semibold text-white">Sep 1, 2025</p>
            </div>
          </div>
        </motion.div>

        {/* Payment Method */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="backdrop-blur-xl bg-white/[0.05] border border-white/[0.1] rounded-2xl p-6 mb-6">
          <h2 className="text-base font-semibold text-white flex items-center gap-2 mb-5">
            <CreditCard className="w-4 h-4 text-blue-400" /> Payment Method
          </h2>
          <div className="text-center py-8 border-2 border-dashed border-white/[0.08] rounded-xl">
            <CreditCard className="w-8 h-8 text-white/20 mx-auto mb-3" />
            <p className="text-sm text-white/40 mb-1">No payment method required yet</p>
            <p className="text-xs text-white/25">You'll be asked to add one before September 1</p>
            <button className="mt-4 px-4 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-300 text-sm font-medium rounded-xl hover:bg-blue-500/30 transition-all">
              Add Payment Method
            </button>
          </div>
        </motion.div>

        {/* Billing History */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="backdrop-blur-xl bg-white/[0.05] border border-white/[0.1] rounded-2xl p-6 mb-6">
          <h2 className="text-base font-semibold text-white flex items-center gap-2 mb-5">
            <Receipt className="w-4 h-4 text-blue-400" /> Billing History
          </h2>
          <div className="text-center py-8">
            <Clock className="w-8 h-8 text-white/15 mx-auto mb-3" />
            <p className="text-sm text-white/40">No invoices yet</p>
            <p className="text-xs text-white/25 mt-1">Invoices will appear here after your first payment</p>
          </div>
        </motion.div>

        {/* What's Included */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          className="backdrop-blur-xl bg-white/[0.05] border border-white/[0.1] rounded-2xl p-6 mb-6">
          <h2 className="text-base font-semibold text-white flex items-center gap-2 mb-4">
            <Shield className="w-4 h-4 text-blue-400" /> What's Included
          </h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {['Unlimited Appointments', 'Patient Management', 'Billing & Invoices', 'Staff Management', 'WhatsApp Integration', 'Reports & Analytics', 'Google Calendar Sync', 'Priority Support'].map(f => (
              <div key={f} className="flex items-center gap-2 p-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span className="text-sm text-white/60">{f}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Cancel */}
        {isActive && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <button onClick={handleCancel} disabled={changingPlan}
              className="w-full py-3 border border-red-500/20 text-red-400/70 text-sm font-medium rounded-xl hover:bg-red-500/5 hover:border-red-500/30 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
              <X className="w-4 h-4" /> Cancel Subscription
            </button>
          </motion.div>
        )}
      </div>
    </main>
  );
}
