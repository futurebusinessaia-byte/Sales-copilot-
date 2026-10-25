import React from 'react';
import {
  History,
  CheckCircle2,
  AlertCircle,
  FileText,
  Mail,
  Calendar,
  Users,
  Sparkles
} from 'lucide-react';
import { SalesReport } from '../../types';

interface CrmViewProps {
  report: SalesReport;
  onRestrictedFeature?: (featureName: string) => void;
}

export const CrmView: React.FC<CrmViewProps> = ({ report, onRestrictedFeature }) => {
  const crm = report.accountCrm || {
    timeline: [
      { date: new Date().toLocaleDateString(), event: `AI Company Research generated for ${report.input.companyName}`, actor: 'AI Copilot Engine', type: 'Proposal' as const },
      { date: '1 day ago', event: 'Initial Discovery Email Sent to CEO & COO', actor: 'Sales Rep', type: 'Email' as const },
      { date: '3 days ago', event: 'Account Intelligence Profile Created', actor: 'System', type: 'Meeting' as const }
    ],
    healthScore: 92,
    csInsights: [
      `High engagement on ROI calculator module.`,
      `Strong buying signals from COO and HR Director.`,
      `Recommend scheduling live technical demo with IT Delivery Head.`
    ]
  };

  const typeIcon = (type: string) => {
    switch (type) {
      case 'Email': return <Mail className="w-4 h-4 text-blue-500" />;
      case 'Meeting': return <Calendar className="w-4 h-4 text-indigo-500" />;
      default: return <FileText className="w-4 h-4 text-emerald-500" />;
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase">
              Account CRM
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            CRM & Account Intelligence Timeline
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Interaction history, account health score, and CS expansion insights for {report.input.companyName}.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => onRestrictedFeature && onRestrictedFeature('CRM Export & Salesforce Sync')}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition flex items-center space-x-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-indigo-200" />
            <span>Sync to Salesforce / HubSpot CRM</span>
          </button>
        </div>
      </div>

      {/* Account Health & Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-lg space-y-2">
          <span className="text-xs font-bold text-blue-100 uppercase">Account Health Score</span>
          <div className="text-4xl font-black tracking-tight">{crm.healthScore} / 100</div>
          <p className="text-xs text-blue-100">Optimal engagement trajectory</p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase">Customer Success Insights</h3>
          <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
            {crm.csInsights.map((ins, i) => (
              <li key={i} className="flex items-start space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>{ins}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Account Activity Timeline */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2 border-b border-slate-100 dark:border-slate-800 pb-3">
          <History className="w-4 h-4 text-blue-600" />
          <span>Account Interaction History Timeline</span>
        </h3>

        <div className="space-y-3 pt-1">
          {crm.timeline.map((item, i) => (
            <div key={i} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-white dark:bg-slate-900 shadow-sm">
                  {typeIcon(item.type)}
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 dark:text-white">{item.event}</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">Actor: {item.actor}</div>
                </div>
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">{item.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
