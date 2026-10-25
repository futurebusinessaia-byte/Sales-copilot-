import React, { useState } from 'react';
import { SalesReport } from '../types';
import { X, Printer, Sparkles, Building2, Globe, Users, Award, ShieldCheck, CheckSquare, AlertTriangle, Copy, Check } from 'lucide-react';
import { useToast } from '../context/ToastContext';

interface ExecutiveBriefModalProps {
  report: SalesReport;
  onClose: () => void;
  onRestrictedFeature?: (featureName: string) => void;
}

export const ExecutiveBriefModal: React.FC<ExecutiveBriefModalProps> = ({ report, onClose, onRestrictedFeature }) => {
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    if (onRestrictedFeature) {
      onRestrictedFeature('Print Executive Brief & PDF Export');
    } else {
      window.print();
    }
  };

  const brief = report.executiveBrief;
  const company = report.input.companyName;

  const handleCopy = () => {
    const text = `EXECUTIVE MEETING BRIEF: ${company}\n\nCOMPANY SNAPSHOT:\n${brief.companySnapshot}\n\nOPPORTUNITY SUMMARY:\n${brief.opportunitySummary}\n\nLIKELY PRIORITIES:\n${brief.likelyPriorities.map((p) => `• ${p}`).join('\n')}\n\nRECOMMENDED TALKING POINTS:\n${brief.recommendedTalkingPoints.map((tp) => `• ${tp}`).join('\n')}\n\nPOTENTIAL RISKS:\n${brief.potentialRisks.map((r) => `• ${r}`).join('\n')}\n\nNEXT ACTIONS:\n${brief.nextActions.map((a) => `• ${a}`).join('\n')}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    showToast('✓ Copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-2xl border border-slate-200 dark:border-slate-800 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
        {/* Modal Toolbar (hidden when printing) */}
        <div className="sticky top-0 z-10 bg-slate-100 dark:bg-slate-800 px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between print:hidden">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="font-bold text-sm text-slate-900 dark:text-white">
              Executive Meeting Brief Preview
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleCopy}
              className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 text-xs font-bold transition shadow-sm cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-slate-600 dark:text-slate-300" />}
              <span>{copied ? 'Copied Brief!' : 'Copy Text'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-sm cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable One-Page Content */}
        <div className="p-8 sm:p-10 space-y-6 print:p-0 print:text-black print:bg-white text-xs sm:text-sm">
          {/* Header */}
          <div className="border-b-2 border-slate-900 pb-4 flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase font-extrabold tracking-widest text-blue-600">
                EXECUTIVE SALES DISCOVERY BRIEF
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {company}
              </h1>
              <p className="text-xs text-slate-600 mt-0.5">
                {report.input.industry} • {report.input.country} • {report.input.employeeRange}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-black text-blue-600">{report.icpFitScore.score}%</div>
              <div className="text-[10px] font-bold text-slate-500 uppercase">ICP Fit Score ({report.icpFitScore.grade})</div>
            </div>
          </div>

          {/* Grid Layout for Brief */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Snapshot */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <h3 className="font-bold text-xs uppercase text-slate-700 tracking-wider">Company Snapshot</h3>
              <p className="text-xs text-slate-800 leading-relaxed">{brief.companySnapshot}</p>
            </div>

            {/* Opportunity */}
            <div className="p-4 bg-blue-50/80 border border-blue-200 rounded-xl space-y-1">
              <h3 className="font-bold text-xs uppercase text-blue-800 tracking-wider">Opportunity Summary</h3>
              <p className="text-xs text-blue-950 font-medium leading-relaxed">{brief.opportunitySummary}</p>
            </div>

            {/* Likely Priorities */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <h3 className="font-bold text-xs uppercase text-slate-700 tracking-wider">Likely Priorities</h3>
              <ul className="space-y-1 text-xs text-slate-800">
                {brief.likelyPriorities.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-1.5">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Talking Points */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <h3 className="font-bold text-xs uppercase text-slate-700 tracking-wider">Recommended Talking Points</h3>
              <ul className="space-y-1 text-xs text-slate-800">
                {brief.recommendedTalkingPoints.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-1.5">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Potential Risks */}
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-2">
              <h3 className="font-bold text-xs uppercase text-amber-900 tracking-wider">Deal Risks & Considerations</h3>
              <ul className="space-y-1 text-xs text-amber-950">
                {brief.potentialRisks.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-1.5">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Next Actions */}
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2">
              <h3 className="font-bold text-xs uppercase text-emerald-900 tracking-wider">Next Actions</h3>
              <ul className="space-y-1 text-xs text-emerald-950">
                {brief.nextActions.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-1.5">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer Disclaimer */}
          <div className="pt-4 border-t border-slate-200 text-[10px] text-slate-500 text-center">
            AI Enterprise Sales Copilot • Generated for internal sales preparation. Insights are AI-generated estimates and should be validated prior to engagement.
          </div>
        </div>
      </div>
    </div>
  );
};
