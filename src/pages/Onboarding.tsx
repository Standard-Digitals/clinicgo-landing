import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Check, CreditCard, Calendar, Users, Download, Copy, CheckCircle, AlertCircle, ArrowRight, ArrowLeft, X } from 'lucide-react';

const steps = [
  { id: 1, title: 'Account', icon: Users },
  { id: 2, title: 'Plan', icon: Calendar },
  { id: 3, title: 'Trial', icon: CheckCircle },
  { id: 4, title: 'Payment', icon: CreditCard },
  { id: 5, title: 'Success', icon: Check },
];

interface UserData {
  name?: string;
  email?: string;
  plan?: 'monthly' | 'yearly';
  subscriptionId?: string;
  licenseKey?: string;
  trialEndsAt?: string;
}

export default function Onboarding() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userData, setUserData] = useState<UserData>({});
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsed = JSON.parse(user);
      setUserData(parsed);
      if (parsed.onboardingComplete) {
        navigate('/account');
      }
    }
  }, [navigate]);

  const handleStartTrial = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/subscription/start-trial', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ plan: userData.plan }),
      });
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Failed to start trial');
      }

      const updatedUser = { ...userData, trialEndsAt: data.trialEndsAt };
      setUserData(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setCurrentStep(4);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSetupPayment = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ plan: userData.plan }),
      });
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Failed to create order');
      }

      if ((window as any).Razorpay) {
        const razorpay = new (window as any).Razorpay({
          key: data.keyId,
          order_id: data.orderId,
          name: 'SD Booking',
          description: `${userData.plan === 'yearly' ? 'Yearly' : 'Monthly'} Subscription`,
          handler: async (response: any) => {
            await handlePaymentSuccess(response.razorpay_payment_id);
          },
          prefill: {
            name: userData.name,
            email: userData.email,
          },
          theme: { color: '#2563eb' },
        });
        razorpay.open();
      } else {
        setCurrentStep(5);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = async (paymentId: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/subscription/create', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ 
          plan: userData.plan,
          paymentId,
        }),
      });
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Failed to create subscription');
      }

      const updatedUser = { 
        ...userData, 
        subscriptionId: data.subscriptionId,
        licenseKey: data.licenseKey,
        onboardingComplete: true,
      };
      setUserData(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setCurrentStep(5);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const skipPayment = () => {
    setCurrentStep(5);
  };

  const copyLicenseKey = () => {
    if (userData.licenseKey) {
      navigator.clipboard.writeText(userData.licenseKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Choose your plan</h2>
              <p className="text-slate-600">Select the billing cycle that works best for you</p>
            </div>

            <div className="grid gap-4">
              <button
                onClick={() => setUserData({ ...userData, plan: 'monthly' })}
                className={`p-6 border-2 rounded-2xl text-left transition-all ${
                  userData.plan === 'monthly' 
                    ? 'border-blue-600 bg-blue-50' 
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xl font-bold text-slate-900">Monthly</span>
                  <span className="text-2xl font-bold text-blue-600">₹49<span className="text-sm font-normal text-slate-500">/mo</span></span>
                </div>
                <p className="text-slate-600 text-sm">Billed monthly, cancel anytime</p>
              </button>

              <button
                onClick={() => setUserData({ ...userData, plan: 'yearly' })}
                className={`p-6 border-2 rounded-2xl text-left transition-all ${
                  userData.plan === 'yearly' 
                    ? 'border-blue-600 bg-blue-50' 
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xl font-bold text-slate-900">Yearly</span>
                  <span className="text-2xl font-bold text-blue-600">₹490<span className="text-sm font-normal text-slate-500">/yr</span></span>
                </div>
                <p className="text-slate-600 text-sm">Save 16% with annual billing</p>
                <span className="inline-block mt-2 px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">Save ₹98/year</span>
              </button>
            </div>

            <button
              onClick={() => userData.plan && setCurrentStep(2)}
              disabled={!userData.plan}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold rounded-xl transition-colors shadow-md shadow-blue-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              Continue <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Start your 14-day free trial</h2>
              <p className="text-slate-600">
                You get full access to all features for 14 days. No payment required now.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
              <h3 className="font-semibold text-blue-900 mb-3">What's included:</h3>
              <ul className="space-y-2 text-sm text-blue-800">
                {['Unlimited appointments', 'All doctor services', 'Email notifications', 'Google Calendar sync', 'Premium support'].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700">
                <AlertCircle className="w-5 h-5" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setCurrentStep(1)}
                className="flex-1 py-4 border-2 border-slate-200 hover:border-slate-300 text-slate-700 font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" /> Back
              </button>
              <button
                onClick={handleStartTrial}
                disabled={loading}
                className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold rounded-xl transition-colors shadow-md shadow-blue-200 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? 'Starting...' : 'Start Free Trial'} <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Trial activated!</h2>
              <p className="text-slate-600">
                Your trial ends on {userData.trialEndsAt ? new Date(userData.trialEndsAt).toLocaleDateString() : '14 days from now'}
              </p>
            </div>

            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6">
              <h3 className="font-semibold text-emerald-900 mb-3">After your trial:</h3>
              <ul className="space-y-2 text-sm text-emerald-800">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  Auto-renew with your card on file
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  Cancel anytime from your account
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  14-day money-back guarantee
                </li>
              </ul>
            </div>

            <button
              onClick={handleSetupPayment}
              disabled={loading}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold rounded-xl transition-colors shadow-md shadow-blue-200 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? 'Loading...' : 'Set Up Payment'} <CreditCard className="w-5 h-5" />
            </button>

            <button
              onClick={skipPayment}
              className="w-full py-3 text-slate-500 hover:text-slate-700 font-medium text-sm"
            >
              Try without payment (Trial only)
            </button>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Setting up payment...</h2>
              <p className="text-slate-600">Please complete your payment to continue</p>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-10 h-10 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">You're all set!</h2>
              <p className="text-slate-600">Your account is ready. Download and install the plugin to get started.</p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
              <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <Copy className="w-4 h-4" /> License Key
              </h3>
              <div className="flex items-center gap-2">
                <code className="flex-1 p-3 bg-white border border-slate-200 rounded-lg font-mono text-sm text-slate-600 overflow-x-auto">
                  {userData.licenseKey || 'DEMO-LICENSE-XXXX-XXXX'}
                </code>
                <button
                  onClick={copyLicenseKey}
                  className="p-3 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-600" />}
                </button>
              </div>
            </div>

            <div className="grid gap-3">
              <button
                onClick={() => navigate('/download')}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold rounded-xl transition-colors shadow-md shadow-blue-200 flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" /> Download Plugin ZIP
              </button>
              
              <a
                href="https://wordpress.org/plugins/sd-booking/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 border-2 border-slate-200 hover:border-slate-300 text-slate-700 font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" /> Install from WordPress Directory
              </a>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={() => navigate('/setup-guide')}
                className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                View Setup Guide
              </button>
              <button
                onClick={() => navigate('/account')}
                className="flex-1 py-3 border-2 border-slate-200 hover:border-slate-300 text-slate-700 font-bold rounded-xl transition-colors"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="absolute top-24 left-4 lg:left-8 p-2 text-slate-500 hover:text-slate-700"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="mb-12">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-slate-200 -z-10" />
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep >= step.id;
              const isCurrent = currentStep === step.id;
              
              return (
                <div key={step.id} className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      isActive 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-slate-200 text-slate-500'
                    } ${isCurrent ? 'ring-4 ring-blue-100' : ''}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`mt-2 text-xs font-medium ${isActive ? 'text-blue-600' : 'text-slate-500'}`}>
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
          {renderStep()}
        </div>
      </div>
    </main>
  );
}