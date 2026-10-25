import React from 'react';
import {
  TrendingUp,
  DollarSign,
  AlertTriangle,
  Zap,
  CheckCircle2,
  PieChart,
  BarChart3,
  Clock,
  Sparkles
} from 'lucide-react';
import { SalesReport } from '../../types';

interface ExecutiveReportsViewProps {
  report: SalesReport;
}

export const ExecutiveReportsView: React.FC<ExecutiveReportsViewProps> = ({ report }) => {
  const exec = report.executiveReport || {
    revenueForecast: '$8.4M Projected Q3 Enterprise Pipeline',
    salesFunnel: [
      { stage: 'Prospecting & Research', count: 142, value: '$14.2M' },
      { stage: 'Qualified Discovery', count: 68, value: '$8.8M' },
      { stage: 'Proposal & Demo', count: 34, value: '$5.1M' },
      { stage: 'Negotiation & Legal', count: 18, value: '$3.2M' },
      { stage: 'Closed Won', count: 24, value: '$2.8M' }
    ],
    dealVelocityDays: 42,
    lostDealReasons: [
      { reason: 'Budget Delay / Freeze', percentage: 38 },
      { reason: 'Incumbent ERP Inertia', percentage: 28 },
      { reason: 'Feature Customization Scope', percentage: 20 },
      { reason: 'Competitor Price Cut', percentage: 14 }
    ],
    pipelineHeatmap: [
      { sector: 'Technology & SaaS', temperature: 'Hot' as const, dealValue: '$9.4M' },
      { sector: 'Professional Services', temperature: 'Hot' as const, dealValue: '$6.2M' },
      { sector: 'Financial Services', temperature: 'Warm' as const, dealValue: '$4.8M' },
      { sector: 'Manufacturing & Retail', temperature: 'Warm' as const, dealValue: '$3.1M' },
      { sector: 'Healthcare & Pharma', temperature: 'Cold' as const, dealValue: '$1.3M' }
    ],
    riskAlerts: [
      { risk: 'CFO approval required for deals >$50k', severity: 'High' as const, mitigation: 'Attach standard ROI calculator report to all proposals.' },
      { risk: 'SAP integration questions during security review', severity: 'Medium' as const, mitigation: 'Provide pre-certified SAP REST API security whitepaper.' }
    ],
    aiRecommendations: [
      `Target $100k+ ARR opportunities in ${report.input.industry} where legacy friction is highest.`,
      'Attach automated proposal generator outputs to accelerate deal closure by 12 days.',
      'Engage COOs and CFOs early as dual champions to prevent late-stage budget freezes.'
    ],
    qbrSummary: `Quarterly Business Review indicates a 94% platform retention rate with average expansion revenue of $24,000 per account after 6 months.`
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase">
            Executive Intelligence
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Executive Revenue Reports & Pipeline Analytics
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Executive forecast summary, deal velocity, lost deal reason analysis, and pipeline heatmaps.
        </p>
      </div>

      {/* Top Banner KPI Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white shadow-lg space-y-2">
          <span className="text-xs font-bold text-slate-300 uppercase">Q3 Revenue Forecast</span>
          <div className="text-3xl font-black text-white">{exec.revenueForecast}</div>
          <p className="text-xs text-blue-300">92% AI Model Confidence</p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase">Avg Deal Velocity</span>
          <div className="text-3xl font-black text-slate-900 dark:text-white">{exec.dealVelocityDays} <span className="text-xl text-slate-400">Days</span></div>
          <p className="text-xs text-emerald-600 font-bold">12 Days Faster with AI</p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase">Platform Retention</span>
          <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400">94.2%</div>
          <p className="text-xs text-slate-500">QBR Expansion Ready</p>
        </div>
      </div>

      {/* Pipeline Heatmap & Lost Deal Reasons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Industry Pipeline Heatmap */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <BarChart3 className="w-4 h-4 text-blue-600" />
            <span>Pipeline Sector Heatmap</span>
          </h3>

          <div className="space-y-3 pt-1">
            {exec.pipelineHeatmap.map((item, i) => {
              const tempBg =
                item.temperature === 'Hot'
                  ? 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border-rose-200'
                  : item.temperature === 'Warm'
                  ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border-amber-200'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200';

              return (
                <div key={i} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-800 dark:text-slate-200">{item.sector}</span>
                  <div className="flex items-center space-x-3">
                    <span className="text-slate-900 dark:text-white font-extrabold">{item.dealValue}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase border ${tempBg}`}>
                      {item.temperature}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Lost Deal Reasons Analysis */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <PieChart className="w-4 h-4 text-violet-600" />
            <span>Lost Deal Friction Breakdown</span>
          </h3>

          <div className="space-y-3 pt-1">
            {exec.lostDealReasons.map((item, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-700 dark:text-slate-300">{item.reason}</span>
                  <span className="text-rose-600 dark:text-rose-400 font-bold">{item.percentage}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full rounded-full bg-rose-500" style={{ width: `${item.percentage}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Recommendations & QBR Box */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
          <Zap className="w-4 h-4 text-amber-500" />
          <span>Strategic AI Revenue Recommendations</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {exec.aiRecommendations.map((rec, i) => (
            <div key={i} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
              <span className="font-extrabold text-blue-600 dark:text-blue-400">Action item #{i + 1}</span>
              <p className="text-slate-800 dark:text-slate-200 font-medium leading-relaxed">{rec}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
