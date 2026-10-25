import React, { useState } from 'react';
import { X, User, ShieldCheck, Sparkles, Check, ArrowRight } from 'lucide-react';
import { EvaluationSession } from '../types';

interface UserAuthModalProps {
  session: EvaluationSession;
  isOpen: boolean;
  onClose: () => void;
  onSelectAuth: (authType: 'guest' | 'google', name: string, email?: string) => void;
}

export const UserAuthModal: React.FC<UserAuthModalProps> = ({
  session,
  isOpen,
  onClose,
  onSelectAuth,
}) => {
  const [customName, setCustomName] = useState(session.userName || 'Enterprise Guest');
  const [customEmail, setCustomEmail] = useState(session.userEmail || 'guest@enterprise.com');

  if (!isOpen) return null;

  const handleGoogleSignIn = (emailChoice: string, nameChoice: string) => {
    onSelectAuth('google', nameChoice, emailChoice);
    onClose();
  };

  const handleGuestSignIn = () => {
    onSelectAuth('guest', customName || 'Guest Evaluator', customEmail);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl max-w-lg w-full p-6 relative overflow-hidden transition-colors">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Evaluation Registration</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              AI Enterprise Sales Copilot – Public Evaluation Edition
            </p>
          </div>
        </div>

        <div className="p-3 bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 rounded-xl mb-5 text-xs text-blue-900 dark:text-blue-200 space-y-1">
          <div className="flex items-center space-x-1.5 font-bold">
            <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Unique Evaluation ID: {session.evalId}</span>
          </div>
          <p className="text-[11px] text-blue-700 dark:text-blue-300">
            Includes 10 free AI sales intelligence analyses. No credit card required.
          </p>
        </div>

        <div className="space-y-4">
          {/* Google Sign In Options */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Option 1: Continue with Google Sign In
            </label>

            <div className="space-y-2">
              <button
                onClick={() => handleGoogleSignIn('varshaant617@gmail.com', 'Varsha Ant')}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/80 transition text-left group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center font-bold text-sm shadow">
                    G
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center space-x-1.5">
                      <span>Varsha Ant</span>
                      <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-1.5 py-0.2 rounded font-mono">Verified Account</span>
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">Google Authentication</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition" />
              </button>

              <button
                onClick={() => handleGoogleSignIn('alex.mercer@enterprise.io', 'Alex Mercer')}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/80 transition text-left group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow">
                    G
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">Alex Mercer (Enterprise Lead)</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">Google Enterprise Single Sign-On</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition" />
              </button>
            </div>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
            <span className="flex-shrink mx-3 text-[10px] uppercase font-bold text-slate-400">OR</span>
            <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
          </div>

          {/* Guest Continuation */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Option 2: Continue as Guest Evaluator
            </label>
            <div className="space-y-2">
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                value={customEmail}
                onChange={(e) => setCustomEmail(e.target.value)}
                placeholder="Enter work email (optional)"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleGuestSignIn}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-xs transition flex items-center justify-center space-x-2 shadow-md"
              >
                <User className="w-4 h-4 text-slate-300" />
                <span>Continue as Guest ({session.evalId})</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-5 pt-3 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 text-center">
          Built by Sheetal Infrastructure AI • Govt of India Registered
        </div>
      </div>
    </div>
  );
};
