import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { KyolyLogo } from '../../../components/KyolyLogo';
import {
  Lock,
  User,
  KeyRound,
  ShieldAlert,
  ArrowRight,
  Eye,
  EyeOff,
  Building2,
  FileCheck2,
  Clock,
  Info,
} from 'lucide-react';

export const ConstructionDocumentsLoginScreen: React.FC = () => {
  const { login, loginError } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberHours, setRememberHours] = useState(4);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await login(username, password, rememberHours);
    setLoading(false);
  };

  const handleQuickFill = (u: string, p: string) => {
    setUsername(u);
    setPassword(p);
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white flex flex-col justify-between py-10 px-4 sm:px-6 relative overflow-hidden select-none">
      {/* Background Subtle Engineering Grid */}
      <div className="absolute inset-0 engineering-grid-dark opacity-30 pointer-events-none" />

      {/* Top Header */}
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between z-10">
        <Link to="/" className="inline-flex items-center gap-2 group">
          <KyolyLogo size="md" variant="dark" />
        </Link>
        <Link
          to="/"
          className="text-xs font-semibold text-neutral-400 hover:text-white transition-colors flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-neutral-900 border border-neutral-800"
        >
          <span>← Back to Public Website</span>
        </Link>
      </div>

      {/* Main Authentication Card */}
      <div className="max-w-md w-full mx-auto my-8 relative z-10">
        <div className="bg-[#121826] border border-neutral-800 rounded-2xl shadow-2xl p-6 sm:p-8 backdrop-blur-md">
          {/* Lock Icon & Portal Title */}
          <div className="text-center space-y-3 pb-6 border-b border-neutral-800">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#FF6B00]/10 border border-[#FF6B00]/30 flex items-center justify-center text-[#FF6B00] shadow-inner">
              <Lock className="w-7 h-7" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-[10px] font-mono uppercase tracking-widest font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span>RESTRICTED INTERNAL ACCESS</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black font-['Outfit'] text-white tracking-wide mt-2">
                Construction Documents
              </h1>
              <p className="text-xs text-neutral-400 mt-1">
                Private & Confidential Document Management System
              </p>
            </div>
          </div>

          {/* Confidential Notice */}
          <div className="mt-5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-2.5 text-amber-200/90 text-xs leading-relaxed">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong>Confidential Information Barrier:</strong> This system contains private client contracts, land certificates, rate analyses, and payment schedules. Public access is strictly forbidden.
            </div>
          </div>

          {/* Login Error Notification */}
          {loginError && (
            <div className="mt-4 p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          {/* Authentication Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                Username / Staff ID
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. admin or staff ID"
                  className="w-full pl-10 pr-4 py-2.5 bg-neutral-900/90 border border-neutral-700 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent transition-all"
                  autoComplete="username"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter confidential password"
                  className="w-full pl-10 pr-10 py-2.5 bg-neutral-900/90 border border-neutral-700 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent transition-all"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-400 hover:text-white"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-neutral-400 pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-neutral-700 text-[#FF6B00] focus:ring-[#FF6B00]"
                />
                <span>Auto-lock session on window close</span>
              </label>
              <span className="flex items-center gap-1 font-mono text-[11px] text-neutral-500">
                <Clock className="w-3 h-3" />
                <span>{rememberHours}h session</span>
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-[#FF6B00] hover:bg-[#E04800] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-orange-500/20 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
            >
              {loading ? (
                <span>Verifying Credentials...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Authenticate & Open Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Authorized Accounts Demo Helpers for Site Owner/Reviewer */}
          <div className="mt-6 pt-5 border-t border-neutral-800 text-center">
            <div className="text-[11px] text-neutral-400 font-mono mb-2 flex items-center justify-center gap-1">
              <Info className="w-3.5 h-3.5 text-[#FF6B00]" />
              <span>Authorized Test Profiles (Click to fill):</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => handleQuickFill('admin', 'Kyoly@2026!')}
                className="px-2.5 py-1 text-[11px] bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white rounded-lg border border-neutral-700 font-mono transition-colors"
                title="Admin: Er. Ghanshyam Jha (Full Master Control)"
              >
                Owner / Admin
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('engineer', 'Engineer@2026!')}
                className="px-2.5 py-1 text-[11px] bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white rounded-lg border border-neutral-700 font-mono transition-colors"
                title="Project Engineer: Er. R. K. Shrestha"
              >
                Project Engineer
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('surveyor', 'Surveyor@2026!')}
                className="px-2.5 py-1 text-[11px] bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white rounded-lg border border-neutral-700 font-mono transition-colors"
                title="Quantity Surveyor: Er. Sunita Acharya"
              >
                Quantity Surveyor
              </button>
            </div>
          </div>
        </div>

        {/* Security Architecture Transparency Disclaimer */}
        <div className="mt-4 p-3 rounded-xl bg-neutral-900/60 border border-neutral-800/80 text-[11px] text-neutral-400 text-center leading-relaxed font-mono">
          <span>
            Security Architecture: Client-side session isolation with cryptographic token generator. Connect to Firebase Auth / PostgreSQL / LDAP endpoint by toggling the provider configuration in <code className="text-amber-400">authService.ts</code>.
          </span>
        </div>
      </div>

      {/* Footer System Meta */}
      <div className="max-w-6xl mx-auto w-full text-center text-[11px] text-neutral-500 font-mono pt-4 border-t border-neutral-900 z-10">
        Kyoly Construction Pvt. Ltd. · Internal Enterprise Contracts & Documentation Engine · Reg. No: 343834/080/081
      </div>
    </div>
  );
};
