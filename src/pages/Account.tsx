import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, Mail, Calendar, CreditCard, Download, Settings, 
  LogOut, ChevronRight, Copy, Check, AlertCircle, Shield,
  Users as UsersIcon, FileText, BarChart3
} from 'lucide-react';

interface UserData {
  name?: string;
  email?: string;
  plan?: 'monthly' | 'yearly';
  subscriptionStatus?: 'active' | 'trialing' | 'past_due' | 'canceled';
  trialEndsAt?: string;
  subscriptionEndsAt?: string;
  doctorServices?: number;
  licenseKey?: string;
  licensedDomains?: string[];
}

export default function Account() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
      return;
    }
    setUserData(JSON.parse(user));
    setLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const copyLicenseKey = () => {
    if (userData?.licenseKey) {
      navigator.clipboard.writeText(userData.licenseKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Account Dashboard</h1>
              <p className="text-slate-600">Manage your subscription and account settings</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-3 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-4 p-4 bg-blue-50 border border-blue-100 rounded-xl">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-slate-900">{userData?.name || 'User'}</h2>
              <p className="text-sm text-slate-600">{userData?.email}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
              userData?.subscriptionStatus === 'active' || userData?.subscriptionStatus === 'trialing'
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-red-100 text-red-700'
            }`}>
              {userData?.subscriptionStatus === 'trialing' ? 'Trial' : userData?.subscriptionStatus || 'Active'}
            </span>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-6">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Subscription</h3>
                <p className="text-sm text-slate-500 capitalize">{userData?.plan || 'No plan'} plan</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Status</span>
                <span className={`font-semibold ${
                  userData?.subscriptionStatus === 'active' ? 'text-emerald-600' : 'text-slate-900'
                }`}>
                  {userData?.subscriptionStatus === 'trialing' ? 'Trial Active' : 'Active'}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">
                  {userData?.subscriptionStatus === 'trialing' ? 'Trial ends' : 'Renews'}
                </span>
                <span className="font-semibold text-slate-900">
                  {userData?.subscriptionStatus === 'trialing' && userData?.trialEndsAt
                    ? new Date(userData.trialEndsAt).toLocaleDateString()
                    : userData?.subscriptionEndsAt
                    ? new Date(userData.subscriptionEndsAt).toLocaleDateString()
                    : 'N/A'}
                </span>
              </div>
            </div>
            <Link
              to="/billing"
              className="mt-4 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              Manage Subscription <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                <UsersIcon className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Doctor Services</h3>
                <p className="text-sm text-slate-500">Your plan includes</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Included</span>
                <span className="font-semibold text-slate-900">{userData?.doctorServices || 5} services</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Used</span>
                <span className="font-semibold text-slate-900">- / {userData?.doctorServices || 5}</span>
              </div>
            </div>
            <Link
              to="/pricing"
              className="mt-4 w-full py-2 border-2 border-slate-200 hover:border-slate-300 text-slate-700 font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              Upgrade Plan <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-6">
          <Link to="/download" className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 hover:border-blue-300 transition-colors group">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
              <Download className="w-5 h-5 text-blue-600 group-hover:text-white" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-1">Download Plugin</h3>
            <p className="text-sm text-slate-500">Get the latest version</p>
          </Link>

          <Link to="/setup-guide" className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 hover:border-blue-300 transition-colors group">
            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-600 transition-colors">
              <FileText className="w-5 h-5 text-emerald-600 group-hover:text-white" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-1">Setup Guide</h3>
            <p className="text-sm text-slate-500">How to install & use</p>
          </Link>

          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <Shield className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-1">License Key</h3>
            <button
              onClick={copyLicenseKey}
              className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              {copied ? 'Copied!' : 'Copy key'}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
              <Settings className="w-5 h-5 text-slate-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Account Settings</h3>
              <p className="text-sm text-slate-500">Update your profile and preferences</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-slate-500" />
                <span className="text-sm text-slate-700">{userData?.email}</span>
              </div>
              <span className="text-xs text-slate-500">Verified</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}