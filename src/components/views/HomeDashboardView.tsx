import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Search,
  ChevronRight,
  ShieldCheck,
  Lock,
  Terminal,
  Activity,
  FileText,
  CheckCircle2,
  Building2,
  ArrowRight,
  Zap,
  Globe,
  Layers,
  ArrowUpRight,
  TrendingUp,
  Award,
  Database
} from 'lucide-react';
import { SalesReport } from '../../types';

interface HomeDashboardViewProps {
  report: SalesReport | null;
  onSelectSample: () => void;
  onNavigateTab: (tab: any) => void;
}

export const HomeDashboardView: React.FC<HomeDashboardViewProps> = ({
  report,
  onSelectSample,
  onNavigateTab,
}) => {
  const [inputCompany, setInputCompany] = useState('');
  const [activeLogIndex, setActiveLogIndex] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCompany.trim()) {
      onNavigateTab('research');
    } else {
      onSelectSample();
    }
  };

  // Live activity simulated feed items
  const activityLogs = [
    { time: '02s ago', type: 'SCAN COMPLETE', target: 'AstraTech Infrastructure', detail: 'Analyzed 1,420 SEC filings & cloud stack signals', status: 'Optimal' },
    { time: '14s ago', type: 'COMMITTEE MAPPED', target: 'Apex Global Logistics', detail: 'Identified 6 C-suite decision nodes & 2 champions', status: 'Verified' },
    { time: '32s ago', type: 'PAIN VECTOR ISOLATED', target: 'Horizon Enterprise Systems', detail: '$4.2M/yr supply-chain latency friction detected', status: 'Actionable' },
    { time: '48s ago', type: 'PROSPECTUS GENERATED', target: 'Vanguard BioPharma', detail: '1-Page Board-level executive briefing compiled', status: 'Ready' },
    { time: '1m ago', type: 'ROI CALCULATED', target: 'Titan Semiconductor', detail: 'Modeled 3.8-month payback period @ $12.4M ARR', status: 'Calculated' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLogIndex((prev) => (prev + 1) % activityLogs.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-16 animate-fadeIn text-zinc-100 max-w-6xl mx-auto py-2">
      
      {/* ==========================================
          SECTION 1: HERO (Cinematic & Powerful)
         ========================================== */}
      <div className="relative overflow-hidden rounded-3xl bg-zinc-950 border border-zinc-800/80 p-8 sm:p-16 shadow-2xl">
        {/* Subtle Ambient Background Lighting */}
        <div className="absolute top-0 right-1/3 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03] pointer-events-none"></div>

        <div className="relative z-10 space-y-8 max-w-4xl mx-auto text-center">
          
          {/* OS Version / Status Badge */}
          <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-zinc-300 text-xs font-mono backdrop-blur-xl">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-zinc-200 font-semibold tracking-wider uppercase text-[11px]">Sheetal Infrastructure AI</span>
            <span className="text-zinc-600">•</span>
            <span className="text-blue-400 font-mono text-[11px]">OPERATING SYSTEM v4.2</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] text-white">
            Autonomous Intelligence for <br />
            <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
              Enterprise Deal Execution
            </span>
          </h1>

          {/* One-Line Positioning */}
          <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
            Synthesize firmographic signals, decision-maker hierarchy, and C-suite financial models into board-ready deal artifacts in seconds.
          </p>

          {/* Enterprise Evaluation Search Input */}
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4 pt-2">
            <div className="relative flex items-center rounded-2xl bg-zinc-900/90 border border-zinc-700/80 shadow-2xl focus-within:border-blue-500/80 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all p-2">
              <Search className="w-5 h-5 text-zinc-400 ml-3 flex-shrink-0" />
              <input
                type="text"
                value={inputCompany}
                onChange={(e) => setInputCompany(e.target.value)}
                placeholder="Enter target enterprise (e.g. Acme Logistics, SAP, Snowflake)..."
                className="w-full bg-transparent px-3 py-2 text-sm sm:text-base text-white placeholder-zinc-500 focus:outline-none"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs sm:text-sm transition flex items-center space-x-2 cursor-pointer flex-shrink-0 shadow-lg shadow-blue-500/25"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Evaluate Target</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
              <button
                type="button"
                onClick={() => onNavigateTab('research')}
                className="px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700/80 font-semibold transition flex items-center space-x-2 cursor-pointer"
              >
                <Building2 className="w-4 h-4 text-blue-400" />
                <span>Initiate Target Evaluation</span>
              </button>
              <button
                type="button"
                onClick={onSelectSample}
                className="px-5 py-2.5 rounded-xl bg-zinc-900/60 hover:bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-800 transition flex items-center space-x-2 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>Load Confidential Sample Docket</span>
              </button>
            </div>
          </form>

        </div>
      </div>

      {/* Active Target Banner (When a report is loaded) */}
      {report && (
        <div className="p-6 rounded-2xl bg-zinc-950 border border-blue-500/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 transition animate-fadeIn">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 text-[10px] font-mono font-bold uppercase tracking-wider">
                ACTIVE TARGET SESSION
              </span>
              <span className="text-xs text-zinc-400 font-mono">
                ICP FIT: <strong className="text-emerald-400">{report.icpFitScore?.score}%</strong> ({report.icpFitScore?.grade})
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-white">
              {report.input.companyName}
            </h3>
            <p className="text-xs text-zinc-400 line-clamp-1 leading-relaxed">
              {report.companyIntelligence?.businessSummary}
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={() => onNavigateTab('research')}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition cursor-pointer shadow-md shadow-blue-600/30 flex items-center space-x-1.5"
            >
              <span>Explore Intelligence</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ==========================================
          SECTION 2: ENTERPRISE INTELLIGENCE PREVIEW
          (Single realistic, confidential board report)
         ========================================== */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-mono font-bold uppercase text-zinc-400 tracking-wider">
              REAL-TIME OUTPUT DOSSIER PREVIEW
            </span>
          </div>
          <span className="text-[11px] font-mono text-zinc-500 uppercase">
            RESTRICTED // C-SUITE SYNTHESIS
          </span>
        </div>

        {/* Monolithic Confidential Report Preview Window */}
        <div className="rounded-3xl bg-zinc-950 border border-zinc-800/90 shadow-2xl overflow-hidden">
          {/* Window Header Header */}
          <div className="px-6 py-4 bg-zinc-900/80 border-b border-zinc-800/80 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex space-x-1.5">
                <div className="w-3 h-3 rounded-full bg-zinc-700/60"></div>
                <div className="w-3 h-3 rounded-full bg-zinc-700/60"></div>
                <div className="w-3 h-3 rounded-full bg-zinc-700/60"></div>
              </div>
              <span className="text-xs font-mono text-zinc-400 font-medium">
                DOSSIER-REF: #EST-2026-8842 // ASTRATECH GLOBAL
              </span>
            </div>
            <div className="flex items-center space-x-2 text-[10px] font-mono font-bold px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Lock className="w-3 h-3" />
              <span>CONFIDENTIAL • C-SUITE BRIEF</span>
            </div>
          </div>

          {/* Dossier Main Content */}
          <div className="p-6 sm:p-10 space-y-8 bg-gradient-to-b from-zinc-950 via-zinc-900/40 to-zinc-950">
            {/* Top Prospect Details Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Target Account</span>
                <p className="text-sm font-extrabold text-white">AstraTech Global Corp.</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Est. Annual Revenue</span>
                <p className="text-sm font-extrabold text-white">$1.4 Billion USD</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">ICP Alignment Index</span>
                <p className="text-sm font-extrabold text-emerald-400">94/100 (Tier 1 Priority)</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Projected Payback</span>
                <p className="text-sm font-extrabold text-blue-400">4.2 Months ARR</p>
              </div>
            </div>

            {/* Strategic Executive Summary Block */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
                <Activity className="w-4 h-4 text-blue-400" />
                <span>Executive Situation & Operational Bottleneck Analysis</span>
              </div>
              <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/60 text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal space-y-3">
                <p>
                  AstraTech Global is currently undertaking a multi-region infrastructure consolidation. Internal SEC disclosures and technology telemetry indicate a critical <strong className="text-white">$18.4M annual friction cost</strong> stemming from legacy ERP reconciliation delays across 12 international business units.
                </p>
                <p className="text-zinc-400">
                  <strong className="text-zinc-200">Key Vulnerability:</strong> Current manual compliance checks require 40+ engineering hours per week per region, causing a 14-day delay in quarterly reporting and exposing the C-suite to regulatory auditing penalties.
                </p>
              </div>
            </div>

            {/* C-Suite Buying Committee Persona Grid */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
                <Layers className="w-4 h-4 text-indigo-400" />
                <span>Buying Committee Dynamics & Decision Alignment</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-white">Chief Executive Officer</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Champion</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-relaxed">
                    Prioritizes global digital transformation speed and multi-market expansion without expanding headcount.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-white">Chief Financial Officer</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">Economic Buyer</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-relaxed">
                    Requires rigorous ROI modeling, guaranteed payback period under 6 months, and zero cap-ex commitments.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-white">VP Information Security</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">Evaluator</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-relaxed">
                    Focuses on SOC 2 Type II compliance, zero data retention policies, and seamless API gateway isolation.
                  </p>
                </div>
              </div>
            </div>

            {/* Read-only Executive Notice Footer */}
            <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 text-center text-xs text-zinc-400 font-mono flex items-center justify-center space-x-2">
              <Lock className="w-3.5 h-3.5 text-zinc-500" />
              <span>[READ-ONLY EXECUTIVE PREVIEW • REVEALED PROGRESSIVELY ON TARGET EVALUATION]</span>
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
          SECTION 3: LIVE ENTERPRISE ACTIVITY
          (Real-time intelligence feed terminal)
         ========================================== */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
          <div className="flex items-center space-x-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-mono font-bold uppercase text-zinc-400 tracking-wider">
              REAL-TIME ENTERPRISE INTELLIGENCE FEED
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-[11px] font-mono text-emerald-400">LIVE AGENT PROCESSING</span>
          </div>
        </div>

        {/* Sleek Terminal Stream */}
        <div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-6 space-y-3 font-mono text-xs">
          {activityLogs.map((log, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-xl transition-all duration-300 border flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                idx === activeLogIndex
                  ? 'bg-zinc-900 border-blue-500/50 shadow-lg text-white'
                  : 'bg-zinc-950/60 border-zinc-900 text-zinc-400 opacity-70'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-[10px] text-zinc-500 font-bold w-14 flex-shrink-0">{log.time}</span>
                <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-bold flex-shrink-0">
                  {log.type}
                </span>
                <span className="font-bold text-zinc-200">{log.target}</span>
                <span className="text-zinc-500 hidden md:inline">•</span>
                <span className="text-zinc-400 hidden md:inline truncate max-w-sm">{log.detail}</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-bold self-start sm:self-auto">
                [{log.status}]
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ==========================================
          SECTION 4: ENTERPRISE TRUST & SECURITY
         ========================================== */}
      <div className="py-8 border-y border-zinc-800/80 space-y-6">
        <div className="text-center space-y-1">
          <p className="text-[11px] font-mono font-bold uppercase text-zinc-500 tracking-widest">
            ENTERPRISE GOVERNANCE & SECURITY STANDARDS
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto text-center font-mono text-xs text-zinc-400">
          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/80 space-y-1">
            <p className="font-extrabold text-white text-sm">SOC 2 TYPE II</p>
            <p className="text-[10px] text-zinc-500">Certified Governance</p>
          </div>
          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/80 space-y-1">
            <p className="font-extrabold text-white text-sm">AES-256</p>
            <p className="text-[10px] text-zinc-500">End-to-End Encrypted</p>
          </div>
          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/80 space-y-1">
            <p className="font-extrabold text-white text-sm">ZERO DATA</p>
            <p className="text-[10px] text-zinc-500">Retention & Isolation</p>
          </div>
          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/80 space-y-1">
            <p className="font-extrabold text-white text-sm">AIR-GAPPED</p>
            <p className="text-[10px] text-zinc-500">Enterprise Isolation</p>
          </div>
        </div>
      </div>

      {/* ==========================================
          SECTION 5: FINAL CTA (Large, Dark, Minimal)
         ========================================== */}
      <div className="rounded-3xl bg-zinc-950 border border-zinc-800/90 p-10 sm:p-16 text-center space-y-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Deploy Intelligence to Your Revenue Teams.
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-normal">
            Evaluate your next target account with Sheetal Infrastructure AI Public Evaluation Edition.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigateTab('research')}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-sm transition shadow-xl shadow-blue-500/20 flex items-center space-x-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Initiate Free Target Evaluation</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={onSelectSample}
              className="px-6 py-4 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-semibold text-sm border border-zinc-800 transition flex items-center space-x-2 cursor-pointer"
            >
              <span>Load Live Demo Target</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
