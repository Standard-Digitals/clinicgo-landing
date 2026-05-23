import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Download as DownloadIcon, Copy, Check, Globe, ChevronLeft,
  FileCode, Package, Shield, CheckCircle, ExternalLink, Key
} from 'lucide-react';
import api from '../lib/api';

export default function Download() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) { navigate('/login'); return; }
    setUserData(JSON.parse(user));
  }, [navigate]);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await api.downloadPlugin(token!);
      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'clinicgo-plugin.zip';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      }
    } catch (err) {
      console.error('Download error:', err);
    } finally {
      setLoading(false);
    }
  };

  const copyLicense = () => {
    const key = userData?.licenseKey;
    if (!key) return;
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(key);
    } else {
      const ta = document.createElement('textarea');
      ta.value = key;
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

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 px-4 py-8 lg:py-12">
      <div className="max-w-2xl mx-auto">

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
          <h1 className="text-2xl font-bold text-white mb-1">Download Plugin</h1>
          <p className="text-sm text-white/40">Get the ClinicGo plugin for your WordPress website</p>
        </motion.div>

        {/* Download Card */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
          className="backdrop-blur-xl bg-white/[0.05] border border-white/[0.1] rounded-2xl p-8 mb-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-emerald-400 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/20">
            <Package className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-lg font-bold text-white mb-1">ClinicGo Plugin</h2>
          <p className="text-sm text-white/40 mb-6">Version 2.0.0 · WordPress Plugin</p>

          <div className="space-y-3">
            <button onClick={handleDownload} disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 disabled:opacity-50">
              <DownloadIcon className="w-5 h-5" />
              {loading ? 'Preparing...' : 'Download Plugin ZIP'}
            </button>
            <a href="https://wordpress.org/plugins/sd-booking/" target="_blank" rel="noopener noreferrer"
              className="w-full py-3 border border-white/[0.12] text-white/60 font-medium rounded-xl hover:bg-white/[0.05] transition-all flex items-center justify-center gap-2">
              <Globe className="w-4 h-4" /> Install from WordPress Directory
            </a>
          </div>
        </motion.div>

        {/* License Key */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="backdrop-blur-xl bg-white/[0.05] border border-white/[0.1] rounded-2xl p-6 mb-6">
          <h3 className="text-base font-semibold text-white flex items-center gap-2 mb-4">
            <Key className="w-4 h-4 text-blue-400" /> Your License Key
          </h3>
          <div className="flex items-center gap-2 mb-3">
            <code className="flex-1 p-3 bg-white/[0.03] border border-white/[0.08] rounded-lg font-mono text-sm text-white tracking-wider">
              {userData?.licenseKey || 'CGO-XXXX-XXXX-XXXX'}
            </code>
            <button onClick={copyLicense} className="p-3 bg-white/[0.05] border border-white/[0.08] rounded-lg hover:bg-white/[0.1] transition-all">
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-white/50" />}
            </button>
          </div>
          <p className="text-xs text-white/30">This key auto-activates when you install the plugin on your connected website.</p>
        </motion.div>

        {/* Auto Install Info */}
        {userData?.websiteUrl && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="backdrop-blur-xl bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-3">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <h3 className="text-sm font-semibold text-emerald-300">Plugin Already Installed</h3>
            </div>
            <p className="text-xs text-white/40 mb-3">ClinicGo was automatically installed on your website during setup.</p>
            <a href={`${userData.websiteUrl}/wp-admin/admin.php?page=clinicgo-dashboard`} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-sm font-medium rounded-xl hover:bg-emerald-500/30 transition-all">
              <ExternalLink className="w-4 h-4" /> Open WP-Admin
            </a>
          </motion.div>
        )}

        {/* Requirements */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="backdrop-blur-xl bg-white/[0.05] border border-white/[0.1] rounded-2xl p-6">
          <h3 className="text-base font-semibold text-white flex items-center gap-2 mb-4">
            <Shield className="w-4 h-4 text-blue-400" /> Requirements
          </h3>
          <div className="space-y-2">
            {[
              'WordPress 5.8 or higher',
              'PHP 7.4 or higher',
              'MySQL 5.7 or higher',
              'SSL Certificate (HTTPS)',
              'REST API enabled',
            ].map(req => (
              <div key={req} className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span className="text-sm text-white/50">{req}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Setup Guide Link */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="mt-6">
          <Link to="/setup-guide"
            className="w-full py-3 bg-white/[0.05] border border-white/[0.1] text-white/60 font-medium rounded-xl hover:bg-white/[0.08] transition-all flex items-center justify-center gap-2">
            <FileCode className="w-4 h-4" /> View Setup Guide
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
