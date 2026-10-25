import React, { useState } from 'react';
import {
  Swords,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Zap,
  Layers,
  Sparkles
} from 'lucide-react';
import { SalesReport } from '../../types';

interface CompetitorAnalysisViewProps {
  report: SalesReport;
}

export const CompetitorAnalysisView: React.FC<CompetitorAnalysisViewProps> = ({ report }) => {
  const [selectedCompetitor, setSelectedCompetitor] = useState<string>('SAP');

  const competitors = report.competitors || [
    {
      competitorName: 'SAP',
      marketShareCategory: 'Legacy ERP Giant',
      strengths: ['Deep global enterprise penetration', 'Core financial system of record'],
      weaknesses: ['Rigid mobile UX', 'High customization cost', 'Slow implementation cycles'],
      migrationDifficulty: 'High' as const,
      competitiveAdvantage: 'Lightning-fast mobile UX, 3-week deployment, zero-friction integration with SAP APIs.',
      switchingStrategy: 'Position as high-adoption front-end execution layer rather than full ERP replacement.'
    },
    {
      competitorName: 'Oracle',
      marketShareCategory: 'Enterprise Cloud ERP',
      strengths: ['Comprehensive database ecosystem', 'Global payroll modules'],
      weaknesses: ['Complex licensing', 'Clunky user adoption', 'Heavy reliance on consultants'],
      migrationDifficulty: 'Complex' as const,
      competitiveAdvantage: 'AI-native automation, transparent flat pricing, consumer-grade mobile experience.',
      switchingStrategy: 'Highlight immediate manager productivity gain and elimination of consulting overhead.'
    },
    {
      competitorName: 'Zoho',
      marketShareCategory: 'SMB Suite',
      strengths: ['Affordable entry pricing', 'Broad application suite'],
      weaknesses: ['Lacks complex enterprise workflow engines', 'Limited multi-tier approval customization'],
      migrationDifficulty: 'Low' as const,
      competitiveAdvantage: 'Built for enterprise scale, advanced geo-fenced timesheets, audit-ready compliance.',
      switchingStrategy: 'Demonstrate where Zoho breaks down at 250+ employee headcount.'
    },
    {
      competitorName: 'Darwinbox',
      marketShareCategory: 'Regional Enterprise HR Tech',
      strengths: ['Modern HR feature set', 'APAC market presence'],
      weaknesses: ['Long deployment timelines', 'Higher renewal fees'],
      migrationDifficulty: 'Moderate' as const,
      competitiveAdvantage: 'AI Copilot intelligence, instant proposal generation, native revenue analytics.',
      switchingStrategy: 'Highlight total cost of ownership savings and superior AI copilot capability.'
    },
    {
      competitorName: 'Keka',
      marketShareCategory: 'Mid-Market HR Software',
      strengths: ['Popular with tech startups', 'Simple UI'],
      weaknesses: ['Struggles with multi-country compliance', 'Limited project billing depth'],
      migrationDifficulty: 'Low' as const,
      competitiveAdvantage: 'Multi-regional governance, enterprise SLA, deep billable resource tracking.',
      switchingStrategy: 'Showcase enterprise compliance security and multi-entity consolidation.'
    },
    {
      competitorName: 'greytHR',
      marketShareCategory: 'Payroll Utility',
      strengths: ['Payroll processing focus', 'Basic attendance'],
      weaknesses: ['Outdated UI', 'No advanced project timesheets', 'Lack of AI automation'],
      migrationDifficulty: 'Low' as const,
      competitiveAdvantage: 'Next-gen AI platform with full workforce intelligence and real-time executive analytics.',
      switchingStrategy: 'Migrate attendance & workflows first, maintaining seamless payroll sync.'
    }
  ];

  const activeComp = competitors.find(c => c.competitorName === selectedCompetitor) || competitors[0];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase">
            Head-to-Head Intelligence
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Enterprise Competitor Analysis & Battlecards
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          In-depth competitive positioning matrix against SAP, Oracle, Zoho, Darwinbox, Keka, and greytHR.
        </p>
      </div>

      {/* Competitor Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {competitors.map((comp) => {
          const isSel = comp.competitorName === selectedCompetitor;
          return (
            <button
              key={comp.competitorName}
              onClick={() => setSelectedCompetitor(comp.competitorName)}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold flex-shrink-0 transition flex items-center space-x-2 ${
                isSel
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-blue-400'
              }`}
            >
              <Swords className="w-3.5 h-3.5" />
              <span>{comp.competitorName}</span>
            </button>
          );
        })}
      </div>

      {/* Active Battlecard Detail */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">{activeComp.marketShareCategory}</span>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white flex items-center space-x-2">
              <span>{activeComp.competitorName} Battlecard</span>
            </h3>
          </div>
          <div className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300">
            Migration Difficulty: <strong className="text-blue-600 dark:text-blue-400">{activeComp.migrationDifficulty}</strong>
          </div>
        </div>

        {/* Strengths vs Weaknesses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/40 space-y-3">
            <h4 className="text-xs font-extrabold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{activeComp.competitorName} Strengths</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-emerald-900 dark:text-emerald-200">
              {activeComp.strengths.map((s, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="font-bold">•</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-5 rounded-xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-800/40 space-y-3">
            <h4 className="text-xs font-extrabold text-rose-800 dark:text-rose-300 uppercase tracking-wider flex items-center gap-1.5">
              <XCircle className="w-4 h-4 text-rose-600" />
              <span>{activeComp.competitorName} Vulnerabilities</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-rose-900 dark:text-rose-200">
              {activeComp.weaknesses.map((w, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="font-bold">•</span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Competitive Advantage & Switching Strategy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-800/40 space-y-2">
            <h4 className="text-xs font-extrabold text-blue-800 dark:text-blue-300 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-blue-600" />
              <span>Our Differentiated Advantage</span>
            </h4>
            <p className="text-xs text-blue-900 dark:text-blue-200 leading-relaxed font-medium">
              {activeComp.competitiveAdvantage}
            </p>
          </div>

          <div className="p-5 rounded-xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200/60 dark:border-purple-800/40 space-y-2">
            <h4 className="text-xs font-extrabold text-purple-800 dark:text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>Battle-Tested Switching Strategy</span>
            </h4>
            <p className="text-xs text-purple-900 dark:text-purple-200 leading-relaxed font-medium">
              {activeComp.switchingStrategy}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
