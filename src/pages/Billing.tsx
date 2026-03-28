import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  CreditCard, Calendar, ChevronLeft, Check, AlertCircle, Download, 
  Shield, Clock, X, Trash2
} from 'lucide-react';

interface SubscriptionData {
  plan?: 'monthly' | 'yearly';
  status?: 'active' | 'trialing' | 'past_due' | 'canceled';
  currentPeriodEnd?: string;
  trialEnd?: string;
  paymentMethod?: {
    brand?: string;
    last4?: string;
    expMonth?: number;
    expYear?: number;
  };
}

export default function Billing() {
  const navigate = useNavigate();
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [changingPlan, setChangingPlan] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
      return;
    }
    const parsed = JSON.parse(user);
    setSubscription({
      plan: parsed.plan,
      status: parsed.subscriptionStatus,
      currentPeriodEnd: parsed.subscriptionEndsAt,
      trialEnd: parsed.trialEndsAt,
      paymentMethod: parsed.paymentMethod,
    });
    setLoading(false);
  }, [navigate]);

  const handleChangePlan = async (newPlan: 'monthly' | 'yearly') => {
    setChangingPlan(true);
    setError('');
    try {
      const res = await fetch('/api/subscription/change-plan', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ plan: newPlan }),
      });
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Failed to change plan');
      }

      const user = JSON.parse(localStorage.getItem('user') || '{}');
      localStorage.setItem('user', JSON.stringify({ ...user, plan: newPlan }));
      setSubscription(prev => prev ? { ...prev, plan: newPlan } : null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setChangingPlan(false);
    }
  };

  const handleCancelSubscription = async () => {
    if (!confirm('Are you sure you want to cancel? Your access will continue until the end of your billing period.')) {
      return;
    }
    
    setChangingPlan(true);
    try {
      const res = await fetch('/api/subscription/cancel', {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });
      
      if (!res.ok) {
        throw new Error('Failed to cancel subscription');
      }

      const user = JSON.parse(localStorage.getItem('user') || '{}');
      localStorage.setItem('user', JSON.stringify({ ...user, subscriptionStatus: 'canceled' }));
      setSubscription(prev => prev ? { ...prev, status: 'canceled' } : null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setChangingPlan(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 py-20 px-4 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate('/account')}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6"
        >
          <ChevronLeft className="w-5 h-5" /> Back to Account
        </button>

        <h1 className="text-2xl font-bold text-slate-900 mb-2">Billing & Subscription</h1>
        <p className="text-slate-600 mb-6">Manage your subscription and payment methods</p>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700">
            <AlertCircle className="w-5 h-5" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mb-6">
          <h2 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5" /> Current Plan
          </h2>

          <div className="grid gap-4 mb-6">
            <button
              onClick={() => handleChangePlan('monthly')}
              disabled={changingPlan || subscription?.plan === 'monthly'}
              className={`p-4 border-2 rounded-xl text-left transition-all ${
                subscription?.plan === 'monthly'
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-slate-200 hover:border-slate-300'
              } disabled:opacity-50`}
            >
              <div className="flex justify-between">
                <span className="font-semibold text-slate-900">Monthly</span>
                <span className="font-bold text-blue-600">₹49/mo</span>
              </div>
              {subscription?.plan === 'monthly' && (
                <Check className="w-4 h-4 text-blue-600 mt-2" />
              )}
            </button>

            <button
              onClick={() => handleChangePlan('yearly')}
              disabled={changingPlan || subscription?.plan === 'yearly'}
              className={`p-4 border-2 rounded-xl text-left transition-all ${
                subscription?.plan === 'yearly'
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-slate-200 hover:border-slate-300'
              } disabled:opacity-50`}
            >
              <div className="flex justify-between">
                <span className="font-semibold text-slate-900">Yearly</span>
                <span className="font-bold text-blue-600">₹490/yr</span>
              </div>
              <span className="text-xs text-emerald-600 font-medium">Save 16%</span>
              {subscription?.plan === 'yearly' && (
                <Check className="w-4 h-4 text-blue-600 mt-2" />
              )}
            </button>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-600">Status</span>
              <span className={`font-semibold ${
                subscription?.status === 'active' || subscription?.status === 'trialing'
                  ? 'text-emerald-600'
                  : 'text-red-600'
              }`}>
                {subscription?.status === 'trialing' ? 'Trial Active' : subscription?.status || 'Active'}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">
                {subscription?.status === 'trialing' ? 'Trial ends' : 'Next billing'}
              </span>
              <span className="font-semibold text-slate-900">
                {subscription?.status === 'trialing' && subscription.trialEnd
                  ? new Date(subscription.trialEnd).toLocaleDateString()
                  : subscription?.currentPeriodEnd
                  ? new Date(subscription.currentPeriodEnd).toLocaleDateString()
                  : 'N/A'}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mb-6">
          <h2 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <CreditCard className="w-5 h-5" /> Payment Method
          </h2>

          {subscription?.paymentMethod ? (
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <div className="flex items-center gap-3">
                <CreditCard className="w-6 h-6 text-slate-600" />
                <div>
                  <p className="font-semibold text-slate-900">
                    {subscription.paymentMethod.brand} •••• {subscription.paymentMethod.last4}
                  </p>
                  <p className="text-sm text-slate-500">
                    Expires {subscription.paymentMethod.expMonth}/{subscription.paymentMethod.expYear}
                  </p>
                </div>
              </div>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-semibold">
                Update
              </button>
            </div>
          ) : (
            <div className="text-center p-6 border-2 border-dashed border-slate-200 rounded-xl">
              <CreditCard className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-slate-600 mb-4">No payment method on file</p>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl">
                Add Payment Method
              </button>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
          <h2 className="font-semibold text-slate-900 mb-4">Billing History</h2>
          <div className="text-center py-8 text-slate-500">
            <Clock className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p>No invoices yet</p>
          </div>
        </div>

        {subscription?.status !== 'canceled' && (
          <button
            onClick={handleCancelSubscription}
            disabled={changingPlan}
            className="mt-6 w-full py-3 border-2 border-red-200 hover:border-red-300 text-red-600 font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <X className="w-5 h-5" /> Cancel Subscription
          </button>
        )}
      </div>
    </main>
  );
}