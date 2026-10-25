import React from 'react';
import { Building2, Sparkles, Search, ArrowRight } from 'lucide-react';

interface EmptyReportStateProps {
  onSelectSample: () => void;
  onNavigateResearch: () => void;
  title?: string;
  description?: string;
}

export const EmptyReportState: React.FC<EmptyReportStateProps> = ({
  onSelectSample,
  onNavigateResearch,
  title = "No Active Target Loaded",
  description = "Run an AI research analysis on a target enterprise prospect or load our pre-configured sample target to view this intelligence matrix."
}) => {
  return (
    <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm text-center space-y-6 max-w-2xl mx-auto my-8 animate-fadeIn">
      <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-400 mx-auto shadow-sm">
        <Building2 className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
          {description}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <button
          onClick={onSelectSample}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs transition shadow-md flex items-center justify-center space-x-2 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Load Live Sample Target</span>
        </button>

        <button
          onClick={onNavigateResearch}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs border border-slate-200 dark:border-slate-700 transition flex items-center justify-center space-x-2 cursor-pointer"
        >
          <Search className="w-4 h-4 text-slate-500" />
          <span>Start AI Research</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
