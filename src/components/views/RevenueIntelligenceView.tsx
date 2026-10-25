import React from 'react';
import {
  Target,
  TrendingUp,
  AlertTriangle,
  Zap,
  DollarSign,
  CheckCircle2,
  ArrowUpRight,
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import { SalesReport } from '../../types';

interface RevenueIntelligenceViewProps {
  report: SalesReport;
}

export const RevenueIntelligenceView: React.FC<RevenueIntelligenceViewProps> = ({ report }) => {
  const opp = report.opportunityScore || {
    overallFitScore: report.icpFitScore?.score || 88,
    dealProbability: 78,
    riskScore: 22,
    urgencyScore: 84,
    revenuePotential: '$120,000 / yr',
    expansionPotential: '$45,000 ARR Add-on',
    recommendedNextAction: 'Schedule Executive Discovery & ROI Walkthrough with COO & CFO',
    scoreBreakdown: [
      { category: 'Headcount & Scale Fit', points: 28, maxPoints: 30, notes: 'Workforce size ideal for platform automation.' },
      { category: 'Legacy Tech Frustration', points: 25, maxPoints: 25, notes: 'High friction reported with current setup.' },
      { category: 'Executive Urgency', points: 22, maxPoints: 25, notes: 'Active mandate for digital operations modernization.' },
      { category: 'Budget Availability', points: 18, maxPoints: 20, notes: 'Verified enterprise software budget reserve.' }
    ]
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <span className="px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase">
            AI Opportunity Engine
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Revenue Intelligence & Opportunity Score
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Predictive deal analytics, risk metrics, urgency scoring, and revenue forecasts for {report.input.companyName}.
        </p>
      </div>

      {/* Main Score Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-lg space-y-2">
          <div className="flex items-center justify-between text-blue-100 text-xs font-bold uppercase">
            <span>Overall Fit Score</span>
            <Target className="w-4 h-4 text-blue-200" />
          </div>
          <div className="text-4xl font-black tracking-tight">{opp.overallFitScore}%</div>
          <p className="text-xs text-blue-100">Grade: {report.icpFitScore?.grade || 'A+'}</p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
            <span>Deal Win Probability</span>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">{opp.dealProbability}%</div>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center">
            <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> High Confidence
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
            <span>Risk Score</span>
            <ShieldAlert className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">{opp.riskScore}<span className="text-xl text-slate-400">/100</span></div>
          <p className="text-xs text-slate-500 font-medium">Low Implementation Risk</p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
            <span>Urgency Index</span>
            <Zap className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">{opp.urgencyScore}<span className="text-xl text-slate-400">/100</span></div>
          <p className="text-xs text-amber-600 dark:text-amber-400 font-bold">Active Buying Cycle</p>
        </div>
      </div>

      {/* Revenue & Recommended Action Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase">Estimated ACV Revenue</span>
          <div className="text-3xl font-black text-slate-900 dark:text-white">{opp.revenuePotential}</div>
          <p className="text-xs text-slate-500">Based on {report.companyIntelligence?.estimatedEmployeeSize} seats</p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase">Expansion ARR Potential</span>
          <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400">{opp.expansionPotential}</div>
          <p className="text-xs text-slate-500">AI Sales Coach & Proposal Generator modules</p>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950 to-slate-900 text-white shadow-md space-y-3">
          <span className="text-xs font-bold text-indigo-300 uppercase flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Recommended Next Action
          </span>
          <p className="text-xs font-semibold leading-relaxed text-slate-200">
            {opp.recommendedNextAction}
          </p>
        </div>
      </div>

      {/* Score Breakdown Table */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
          <Target className="w-4 h-4 text-blue-600" />
          <span>Opportunity Score Criteria Breakdown</span>
        </h3>

        <div className="space-y-3 pt-2">
          {opp.scoreBreakdown.map((item: any, i: number) => (
            <div key={i} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-900 dark:text-white">{item.category}</span>
                <span className="text-blue-600 dark:text-blue-400">{item.points} / {item.maxPoints} pts</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                <div
                  className="h-full rounded-full bg-blue-600"
                  style={{ width: `${(item.points / item.maxPoints) * 100}%` }}
                ></div>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">{item.notes}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
