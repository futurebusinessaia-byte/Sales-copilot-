import React from 'react';
import { IcpFitScore } from '../../types';
import { Target, CheckCircle, AlertTriangle, Award } from 'lucide-react';
import { RegenerateButton } from '../RegenerateButton';

interface IcpScoreCardProps {
  data: IcpFitScore;
  companyName: string;
  onRegenerate?: () => void;
  isRegenerating?: boolean;
}

export const IcpScoreCard: React.FC<IcpScoreCardProps> = ({
  data,
  companyName,
  onRegenerate,
  isRegenerating = false,
}) => {
  const scorePercent = data.score;
  const strokeDashoffset = 283 - (283 * scorePercent) / 100;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm hover:shadow-md transition">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-slate-100 dark:border-slate-800 gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Section 2
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              ICP Fit Score & Qualification
            </h3>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
            <Award className="w-3.5 h-3.5" />
            <span>Grade {data.grade}</span>
          </span>
          {onRegenerate && (
            <RegenerateButton
              onRegenerate={onRegenerate}
              isRegenerating={isRegenerating}
              label="Regenerate ICP Score"
            />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Large Circular Gauge */}
        <div className="md:col-span-4 flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200/60 dark:border-slate-800">
          <div className="relative w-36 h-36 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                className="stroke-slate-200 dark:stroke-slate-700 fill-none"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                className="stroke-blue-600 dark:stroke-blue-400 fill-none transition-all duration-1000 ease-out"
                strokeWidth="8"
                strokeDasharray="283"
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {data.score}%
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                ICP Match
              </span>
            </div>
          </div>
          <div className="mt-4 text-center">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Ideal Customer Profile Match
            </span>
          </div>
        </div>

        {/* Qualification Summary & Criteria */}
        <div className="md:col-span-8 space-y-4">
          <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60 text-slate-800 dark:text-slate-200 text-sm leading-relaxed">
            <p className="font-medium text-slate-900 dark:text-white mb-1">Why {companyName} matches our ICP:</p>
            <p className="text-slate-700 dark:text-slate-300">{data.summary}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Matching Criteria */}
            <div className="p-4 rounded-xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40">
              <h4 className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Key Fit Signals
              </h4>
              <ul className="space-y-2">
                {data.matchingCriteria.map((item, idx) => (
                  <li key={idx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start space-x-2">
                    <span className="text-emerald-500 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Gaps / Risks */}
            <div className="p-4 rounded-xl bg-amber-50/40 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40">
              <h4 className="text-xs font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                Considerations & Gaps
              </h4>
              <ul className="space-y-2">
                {data.gapsOrRisks.map((item, idx) => (
                  <li key={idx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start space-x-2">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
