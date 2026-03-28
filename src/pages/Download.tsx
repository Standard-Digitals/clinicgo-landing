import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Download as DownloadIcon, Copy, Check, Globe, AlertCircle, FileCode } from 'lucide-react';

export default function Download() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [copiedLicense, setCopiedLicense] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
    }
  }, [navigate]);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/plugin/download', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'sd-booking.zip';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      } else {
        const data = await res.json();
        alert(data.message || 'Download failed');
      }
    } catch (err) {
      console.error('Download error:', err);
    } finally {
      setLoading(false);
    }
  };

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const copyLicenseKey = () => {
    if (user.licenseKey) {
      navigator.clipboard.writeText(user.licenseKey);
      setCopiedLicense(true);
      setTimeout(() => setCopiedLicense(false), 2000);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <Link
          to="/account"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6"
        >
          ← Back to Account
        </Link>

        <h1 className="text-2xl font-bold text-slate-900 mb-2">Download Plugin</h1>
        <p className="text-slate-600 mb-6">Get the SD Booking plugin for your WordPress site</p>

        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 mb-6">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <DownloadIcon className="w-10 h-10 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">SD Booking Plugin</h2>
            <p className="text-slate-600">Version 1.0.0 • WordPress 5.0+</p>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleDownload}
              disabled={loading}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold rounded-xl transition-colors shadow-md shadow-blue-200 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <DownloadIcon className="w-5 h-5" />
              {loading ? 'Preparing Download...' : 'Download Plugin ZIP'}
            </button>

            <a
              href="https://wordpress.org/plugins/sd-booking/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 border-2 border-slate-200 hover:border-slate-300 text-slate-700 font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <FileCode className="w-5 h-5" />
              Install from WordPress Directory
            </a>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mb-6">
          <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Copy className="w-5 h-5" /> License Key
          </h3>
          
          <div className="flex items-center gap-2">
            <code className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-lg font-mono text-sm text-slate-600 overflow-x-auto">
              {user.licenseKey || 'No license key'}
            </code>
            <button
              onClick={copyLicenseKey}
              className="p-3 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-colors"
            >
              {copiedLicense ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-600" />}
            </button>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            You'll need this license key to activate the plugin
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
          <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" /> Installation Note
          </h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li className="flex items-start gap-2">
              <span className="text-blue-600">1.</span>
              Download and install the plugin from your WordPress admin
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">2.</span>
              Go to SD Booking → License and enter your license key
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">3.</span>
              Activate your license to unlock all features
            </li>
          </ul>
        </div>

        <Link
          to="/setup-guide"
          className="mt-6 w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          View Setup Guide
        </Link>
      </div>
    </main>
  );
}