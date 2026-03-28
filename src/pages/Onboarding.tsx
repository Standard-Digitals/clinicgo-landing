import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Check, CreditCard, Calendar, Users, Download, Copy, CheckCircle, AlertCircle, ArrowRight, ArrowLeft, X, CreditCard as CardIcon, Lock, Shield, Smartphone, Building, Wallet } from 'lucide-react';

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
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    console.log('Onboarding mount - token:', token ? 'exists' : 'MISSING');
    console.log('Onboarding mount - user:', user ? 'exists' : 'MISSING');
    
    if (!token || !user) {
      console.log('Redirecting to signup - no token or user');
      navigate('/signup');
      return;
    }
    
    if (user) {
      const parsed = JSON.parse(user);
      console.log('User data:', parsed);
      setUserData(parsed);
      setUserData((prev: UserData) => ({ ...prev, ...parsed }));
      if (parsed.onboardingComplete) {
        console.log('Onboarding complete, redirecting to account');
        navigate('/account');
      }
    }
  }, [navigate]);

  const handleStartTrial = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      console.log('Token on start trial:', token);
      console.log('UserData plan:', userData.plan);
      
      if (!token) {
        throw new Error('No token found. Please sign up again.');
      }

      const res = await fetch('/api/subscription/start-trial', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ plan: userData.plan }),
      });
      const data = await res.json();
      console.log('Trial response:', data);
      
      if (!res.ok) {
        throw new Error(data.message || 'Failed to start trial');
      }

      const updatedUser = { ...userData, trialEndsAt: data.trialEndsAt, subscriptionStatus: 'trialing' };
      setUserData(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setCurrentStep(3);
    } catch (err: any) {
      console.error('Trial error:', err);
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

      setCurrentStep(4);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCardPayment = async () => {
    setLoading(true);
    setError('');
    try {
      const paymentId = 'pay_' + Date.now();
      await handlePaymentSuccess(paymentId);
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
          <PaymentForm
            plan={userData.plan}
            onSuccess={() => handlePaymentSuccess('pay_card_' + Date.now())}
            onBack={() => setCurrentStep(3)}
            loading={loading}
            setLoading={setLoading}
            error={error}
            setError={setError}
          />
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

  interface CardFormData {
    cardName: string;
    cardNumber: string;
    expiry: string;
    cvv: string;
  }

  interface CardErrors {
    cardName?: string;
    cardNumber?: string;
    expiry?: string;
    cvv?: string;
  }

  function getCardType(number: string): string {
    const clean = number.replace(/\s/g, '');
    if (clean.startsWith('4')) return 'visa';
    if (clean.startsWith('5')) return 'mastercard';
    if (clean.startsWith('34') || clean.startsWith('37')) return 'amex';
    if (clean.startsWith('6')) return 'rupay';
    return '';
  }

  function PaymentForm({ plan, onSuccess, onBack, loading, setLoading, error, setError }: {
    plan?: 'monthly' | 'yearly';
    onSuccess: () => Promise<void>;
    onBack: () => void;
    loading: boolean;
    setLoading: (v: boolean) => void;
    error: string;
    setError: (v: string) => void;
  }) {
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'razorpay'>('card');
    const [cardData, setCardData] = useState<CardFormData>({ cardName: '', cardNumber: '', expiry: '', cvv: '' });
    const [errors, setErrors] = useState<CardErrors>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [showExpiryDropdown, setShowExpiryDropdown] = useState(false);

    const amount = plan === 'yearly' ? 490 : 49;
    const tax = Math.round(amount * 0.18);
    const total = amount + tax;

    const validateCardName = (name: string): string | undefined => {
      if (!name.trim()) return 'Cardholder name is required';
      if (name.trim().length < 3) return 'Name must be at least 3 characters';
      if (!/^[a-zA-Z\s]+$/.test(name)) return 'Only letters and spaces allowed';
      return undefined;
    };

    const validateCardNumber = (number: string): string | undefined => {
      const clean = number.replace(/\s/g, '');
      if (!clean) return 'Card number is required';
      if (!/^\d+$/.test(clean)) return 'Only numbers allowed';
      if (clean.length !== 16) return 'Card number must be 16 digits';
      return undefined;
    };

    const validateExpiry = (exp: string): string | undefined => {
      if (!exp) return 'Expiry date is required';
      const match = exp.match(/^(\d{2})\/(\d{2})$/);
      if (!match) return 'Use MM/YY format';
      const month = parseInt(match[1]);
      const year = parseInt('20' + match[2]);
      if (month < 1 || month > 12) return 'Invalid month';
      const now = new Date();
      const expDate = new Date(year, month - 1);
      if (expDate < now) return 'Card has expired';
      return undefined;
    };

    const validateCvv = (cvv: string, cardType: string): string | undefined => {
      if (!cvv) return 'CVV is required';
      if (!/^\d+$/.test(cvv)) return 'Only numbers allowed';
      const expected = cardType === 'amex' ? 4 : 3;
      if (cvv.length !== expected) return `CVV must be ${expected} digits`;
      return undefined;
    };

    const formatCardNumber = (value: string): string => {
      const clean = value.replace(/\D/g, '').slice(0, 16);
      const groups = clean.match(/.{1,4}/g);
      return groups ? groups.join(' ') : '';
    };

    const formatExpiry = (value: string): string => {
      const clean = value.replace(/\D/g, '').slice(0, 4);
      if (clean.length >= 2) {
        return clean.slice(0, 2) + '/' + clean.slice(2);
      }
      return clean;
    };

    const handleBlur = (field: string) => {
      setTouched(prev => ({ ...prev, [field]: true }));
      validateAndUpdate(field);
    };

    const validateAndUpdate = (field: string) => {
      const newErrors: CardErrors = { ...errors };
      if (field === 'cardName') newErrors.cardName = validateCardName(cardData.cardName);
      if (field === 'cardNumber') newErrors.cardNumber = validateCardNumber(cardData.cardNumber);
      if (field === 'expiry') newErrors.expiry = validateExpiry(cardData.expiry);
      if (field === 'cvv') newErrors.cvv = validateCvv(cardData.cvv, getCardType(cardData.cardNumber));
      setErrors(newErrors);
    };

    const isValid = (): boolean => {
      return !validateCardName(cardData.cardName) &&
             !validateCardNumber(cardData.cardNumber) &&
             !validateExpiry(cardData.expiry) &&
             !validateCvv(cardData.cvv, getCardType(cardData.cardNumber));
    };

    const handleSubmit = async () => {
      const newErrors: CardErrors = {
        cardName: validateCardName(cardData.cardName),
        cardNumber: validateCardNumber(cardData.cardNumber),
        expiry: validateExpiry(cardData.expiry),
        cvv: validateCvv(cardData.cvv, getCardType(cardData.cardNumber)),
      };
      setErrors(newErrors);
      setTouched({ cardName: true, cardNumber: true, expiry: true, cvv: true });

      if (Object.values(newErrors).some(e => e)) return;

      setLoading(true);
      setError('');
      try {
        await onSuccess();
      } catch (err: any) {
        setError(err.message || 'Payment failed');
      } finally {
        setLoading(false);
      }
    };

    const cardType = getCardType(cardData.cardNumber);

    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CreditCard className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Payment</h2>
          <p className="text-slate-600">Your card will be charged after the 14-day trial ends</p>
        </div>

        <div className="flex gap-2 p-1 bg-slate-100 rounded-xl">
          <button
            type="button"
            onClick={() => setPaymentMethod('card')}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
              paymentMethod === 'card' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <CardIcon className="w-4 h-4" /> Card Payment
          </button>
          <button
            type="button"
            onClick={() => setPaymentMethod('razorpay')}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
              paymentMethod === 'razorpay' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Smartphone className="w-4 h-4" /> Razorpay
          </button>
        </div>

        {paymentMethod === 'card' ? (
          <div className="space-y-4">
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-slate-700">Card Details</span>
                <div className="flex gap-2">
                  {['visa', 'mastercard', 'amex'].map(type => (
                    <div
                      key={type}
                      className={`w-8 h-5 rounded flex items-center justify-center text-[8px] font-bold uppercase ${
                        cardType === type ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      {type === 'visa' ? 'VISA' : type === 'mastercard' ? 'MC' : 'AMEX'}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Card Holder Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="JOHN DOE"
                      value={cardData.cardName}
                      onChange={(e) => setCardData({ ...cardData, cardName: e.target.value.toUpperCase() })}
                      onBlur={() => handleBlur('cardName')}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase bg-slate-50 ${
                        touched.cardName && errors.cardName ? 'border-red-500' : touched.cardName && !errors.cardName ? 'border-emerald-500' : 'border-slate-200'
                      }`}
                    />
                    {touched.cardName && !errors.cardName && (
                      <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" />
                    )}
                  </div>
                  {touched.cardName && errors.cardName && (
                    <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Card Number</label>
                  <div className="relative">
                    <input
                      type="tel"
                      placeholder="1234 5678 9012 3456"
                      value={cardData.cardNumber}
                      onChange={(e) => setCardData({ ...cardData, cardNumber: formatCardNumber(e.target.value) })}
                      onBlur={() => handleBlur('cardNumber')}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        touched.cardNumber && errors.cardNumber ? 'border-red-500' : touched.cardNumber && !errors.cardNumber ? 'border-emerald-500' : 'border-slate-200'
                      }`}
                    />
                    {touched.cardNumber && !errors.cardNumber && (
                      <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" />
                    )}
                  </div>
                  {touched.cardNumber && errors.cardNumber && (
                    <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Expiry Date</label>
                    <div className="relative">
                      <input
                        type="tel"
                        placeholder="MM/YY"
                        value={cardData.expiry}
                        onChange={(e) => setCardData({ ...cardData, expiry: formatExpiry(e.target.value) })}
                        onBlur={() => handleBlur('expiry')}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          touched.expiry && errors.expiry ? 'border-red-500' : touched.expiry && !errors.expiry ? 'border-emerald-500' : 'border-slate-200'
                        }`}
                      />
                      {touched.expiry && !errors.expiry && (
                        <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" />
                      )}
                    </div>
                    {touched.expiry && errors.expiry && (
                      <p className="text-red-500 text-xs mt-1">{errors.expiry}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      CVV
                      <span className="relative group ml-1 inline-flex">
                        <AlertCircle className="w-3 h-3 text-slate-400" />
                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          3 digits on back of card
                        </span>
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        placeholder="•••"
                        maxLength={cardType === 'amex' ? 4 : 3}
                        value={cardData.cvv}
                        onChange={(e) => setCardData({ ...cardData, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) })}
                        onBlur={() => handleBlur('cvv')}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          touched.cvv && errors.cvv ? 'border-red-500' : touched.cvv && !errors.cvv ? 'border-emerald-500' : 'border-slate-200'
                        }`}
                      />
                      {touched.cvv && !errors.cvv && (
                        <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" />
                      )}
                    </div>
                    {touched.cvv && errors.cvv && (
                      <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-600">Subtotal</span>
                <span className="text-slate-900">₹{amount}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-600">GST (18%)</span>
                <span className="text-slate-900">₹{tax}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t border-slate-200 pt-2 mt-2">
                <span>Total</span>
                <span className="text-blue-600">₹{total}</span>
              </div>
              <p className="text-xs text-slate-500 mt-2">Amount charged after 14-day trial</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-white border border-slate-200 rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Pay with Razorpay</h3>
              <p className="text-sm text-slate-600 mb-6">Secure payment via UPI, Cards, Net Banking & Wallets</p>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl transition-colors disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Pay with Razorpay'}
              </button>
              <div className="flex items-center justify-center gap-4 mt-6">
                <div className="text-xs text-slate-500 flex items-center gap-1">
                  <Building className="w-4 h-4" /> UPI
                </div>
                <div className="text-xs text-slate-500 flex items-center gap-1">
                  <Wallet className="w-4 h-4" /> Wallets
                </div>
                <div className="text-xs text-slate-500 flex items-center gap-1">
                  <CardIcon className="w-4 h-4" /> Cards
                </div>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700">
            <AlertCircle className="w-5 h-5" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 py-4 border-2 border-slate-200 hover:border-slate-300 text-slate-700 font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" /> Back
          </button>
          {paymentMethod === 'card' && (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading || !isValid()}
              className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold rounded-xl transition-colors shadow-md shadow-blue-200 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? 'Processing...' : `Pay ₹${total}`} <Lock className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
          <Shield className="w-3 h-3" />
          <span>Secured by Razorpay • 256-bit SSL encryption</span>
        </div>
      </div>
    );
  }

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