import React, { useState } from 'react';
import { ExecutiveBrief, SalesReport } from '../../types';
import { FileText, Printer, Sparkles, CheckSquare, ArrowUpRight, ShieldAlert, Copy, Check } from 'lucide-react';
import { RegenerateButton } from '../RegenerateButton';
import { useToast } from '../../context/ToastContext';

interface ExecutiveBriefCardProps {
  data: ExecutiveBrief;
  report: SalesReport;
  onOpenPrintModal: () => void;
  onRegenerate?: () => void;
  isRegenerating?: boolean;
}

export const ExecutiveBriefCard: React.FC<ExecutiveBriefCardProps> = ({
  data,
  report,
  onOpenPrintModal,
  onRegenerate,
  isRegenerating = false,
}) => {
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopyBrief = () => {
    const briefText = `EXECUTIVE MEETING BRIEF: ${report.input.companyName}\n\nCOMPANY SNAPSHOT:\n${data.companySnapshot}\n\nOPPORTUNITY SUMMARY:\n${data.opportunitySummary}\n\nLIKELY PRIORITIES:\n${data.likelyPriorities.map((p) => `• ${p}`).join('\n')}\n\nRECOMMENDED TALKING POINTS:\n${data.recommendedTalkingPoints.map((tp) => `• ${tp}`).join('\n')}\n\nPOTENTIAL RISKS:\n${data.potentialRisks.map((r) => `• ${r}`).join('\n')}\n\nNEXT ACTIONS:\n${data.nextActions.map((a) => `• ${a}`).join('\n')}`;

    navigator.clipboard.writeText(briefText);
    setCopied(true);
    showToast('✓ Copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-blue-200 dark:border-blue-900/80 p-6 sm:p-8 shadow-md hover:shadow-lg transition">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-slate-100 dark:border-slate-800 gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/20">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Section 11
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Executive Meeting Brief (1-Page Summary)
            </h3>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          {onRegenerate && (
            <RegenerateButton
              onRegenerate={onRegenerate}
              isRegenerating={isRegenerating}
              label="Regenerate Executive Brief"
            />
          )}
          <button
            onClick={handleCopyBrief}
            className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold border border-slate-200 dark:border-slate-700 transition cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-slate-500" />}
            <span>{copied ? 'Copied Brief!' : 'Copy Brief'}</span>
          </button>
          <button
            onClick={onOpenPrintModal}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Executive Brief / Export PDF</span>
          </button>
        </div>
      </div>

      <p className="text-sm text-slate-600 dark:text-slate-300 mb-6">
        A executive 1-page pre-meeting brief prepared for your discovery session with {report.input.companyName}:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Snapshot */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
            Company Snapshot
          </h4>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
            {data.companySnapshot}
          </p>
        </div>

        {/* Opportunity Summary */}
        <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60">
          <h4 className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300 mb-2">
            Opportunity Summary
          </h4>
          <p className="text-xs sm:text-sm text-blue-950 dark:text-blue-100 font-medium leading-relaxed">
            {data.opportunitySummary}
          </p>
        </div>

        {/* Likely Priorities */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5 flex items-center gap-1.5">
            <CheckSquare className="w-3.5 h-3.5 text-blue-500" />
            Likely Executive Priorities
          </h4>
          <ul className="space-y-2">
            {data.likelyPriorities.map((item, idx) => (
              <li key={idx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start space-x-2">
                <span className="text-blue-500 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recommended Talking Points */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-purple-500" />
            Recommended Talking Points
          </h4>
          <ul className="space-y-2">
            {data.recommendedTalkingPoints.map((item, idx) => (
              <li key={idx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start space-x-2">
                <span className="text-purple-500 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Potential Risks */}
        <div className="p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40">
          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 mb-2.5 flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
            Potential Deal Risks
          </h4>
          <ul className="space-y-2">
            {data.potentialRisks.map((item, idx) => (
              <li key={idx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start space-x-2">
                <span className="text-amber-500 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Next Actions */}
        <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-900/40">
          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 mb-2.5 flex items-center gap-1.5">
            <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600" />
            Recommended Next Actions
          </h4>
          <ul className="space-y-2">
            {data.nextActions.map((item, idx) => (
              <li key={idx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start space-x-2">
                <span className="text-emerald-500 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
