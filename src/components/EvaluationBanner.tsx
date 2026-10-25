import React from 'react';
import { ShieldCheck, Sparkles, User, LogIn, Lock, CheckCircle2, Zap } from 'lucide-react';
import { EvaluationSession } from '../types';

interface EvaluationBannerProps {
  session: EvaluationSession;
  onOpenAuthModal: () => void;
  onOpenContactModal: () => void;
}

export const EvaluationBanner: React.FC<EvaluationBannerProps> = ({
  session,
  onOpenAuthModal,
  onOpenContactModal,
}) => {
  const isExhausted = session.remainingAnalyses <= 0;

  return (
    <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border-b border-indigo-900/60 shadow-lg relative z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col md:flex-row items-center justify-between gap-2.5 text-xs">
        {/* Left branding banner text */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-3">
          <div className="flex items-center space-x-1.5 font-bold tracking-tight text-sky-400">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-300" />
            <span className="text-white font-extrabold uppercase tracking-wide text-[11px] sm:text-xs">
              AI Enterprise Sales Copilot
            </span>
            <span className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">
              Public Evaluation Edition
            </span>
          </div>

          <div className="hidden lg:flex items-center space-x-3 text-slate-300 text-[11px]">
            <span className="flex items-center space-x-1 text-emerald-400 font-semibold">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span>10 Free AI Analyses</span>
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-300">No Credit Card Required</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-300 font-medium">Built by Sheetal Infrastructure AI</span>
          </div>
        </div>

        {/* Right side stats badge & controls */}
        <div className="flex items-center space-x-2.5 sm:space-x-3">
          {/* Usage Badge */}
          <div className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg border font-mono text-[11px] transition-all ${
            isExhausted
              ? 'bg-rose-950/80 border-rose-600 text-rose-300 animate-pulse'
              : 'bg-indigo-900/50 border-indigo-700/60 text-sky-200'
          }`}>
            <Zap className={`w-3.5 h-3.5 ${isExhausted ? 'text-rose-400' : 'text-amber-400'}`} />
            <span>
              Remaining: <strong className={isExhausted ? 'text-rose-200 font-extrabold' : 'text-white font-extrabold'}>{session.remainingAnalyses}</strong> / 10
            </span>
          </div>

          {/* Eval ID Badge */}
          <div className="hidden sm:flex items-center space-x-1 px-2 py-1 rounded-md bg-slate-800/80 border border-slate-700/60 font-mono text-[10px] text-slate-300">
            <span className="text-slate-500">ID:</span>
            <span className="text-indigo-300 font-bold">{session.evalId}</span>
          </div>

          {/* User Auth Pill */}
          <button
            onClick={onOpenAuthModal}
            className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-indigo-600/40 hover:bg-indigo-600/70 border border-indigo-500/50 text-white font-medium text-[11px] transition"
            title="Switch User / Sign In with Google"
          >
            {session.authType === 'google' ? (
              <div className="w-4 h-4 rounded-full bg-indigo-500 flex items-center justify-center text-[9px] font-bold text-white">
                G
              </div>
            ) : (
              <User className="w-3.5 h-3.5 text-indigo-300" />
            )}
            <span className="max-w-[100px] truncate">{session.userName}</span>
            <LogIn className="w-3 h-3 text-indigo-300 ml-0.5" />
          </button>

          {/* Contact Button */}
          <button
            onClick={() => {
              window.location.href = 'mailto:infraagentai@gmail.com?subject=AI%20Enterprise%20Sales%20Copilot%20Enquiry';
            }}
            className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-[11px] shadow-sm transition"
          >
            Contact
          </button>
        </div>
      </div>
    </div>
  );
};
