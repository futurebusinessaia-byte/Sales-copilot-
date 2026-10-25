import React from 'react';
import { PainPoint } from '../../types';
import { AlertCircle, Clock, FileWarning, DollarSign, BarChart2, Eye, CheckSquare, Settings } from 'lucide-react';
import { RegenerateButton } from '../RegenerateButton';

interface PainPointsCardProps {
  data: PainPoint[];
  companyName: string;
  onRegenerate?: () => void;
  isRegenerating?: boolean;
}

export const PainPointsCard: React.FC<PainPointsCardProps> = ({
  data,
  companyName,
  onRegenerate,
  isRegenerating = false,
}) => {
  const getIcon = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes('attendance')) return AlertCircle;
    if (t.includes('timesheet')) return Clock;
    if (t.includes('leave')) return FileWarning;
    if (t.includes('expense')) return DollarSign;
    if (t.includes('report')) return BarChart2;
    if (t.includes('staffing') || t.includes('visibility')) return Eye;
    if (t.includes('manager') || t.includes('approval')) return CheckSquare;
    return Settings;
  };

  const getSeverityBadge = (severity: string) => {
    if (severity === 'Critical') {
      return 'bg-rose-50 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800';
    }
    if (severity === 'High') {
      return 'bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800';
    }
    return 'bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800';
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm hover:shadow-md transition">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-slate-100 dark:border-slate-800 gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
              Section 4
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Identified Business Pain Points & Vulnerabilities
            </h3>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            {data.length} Pain Vectors
          </span>
          {onRegenerate && (
            <RegenerateButton
              onRegenerate={onRegenerate}
              isRegenerating={isRegenerating}
              label="Regenerate Pain Points"
            />
          )}
        </div>
      </div>

      <p className="text-sm text-slate-600 dark:text-slate-300 mb-6">
        Probable operational friction points and revenue leaks identified for {companyName}:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map((pain, idx) => {
          const IconComp = getIcon(pain.title);
          return (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800 flex flex-col justify-between hover:border-blue-300 dark:hover:border-blue-700 transition"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2.5">
                    <div className="p-2 rounded-lg bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 border border-slate-200/60 dark:border-slate-700 shadow-2xs">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {pain.title}
                    </h4>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getSeverityBadge(
                      pain.severity
                    )}`}
                  >
                    {pain.severity} Impact
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 mb-3 leading-relaxed">
                  {pain.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center space-x-2">
                <span className="text-[10px] uppercase tracking-wider font-bold text-rose-600 dark:text-rose-400">
                  Quantifiable Cost:
                </span>
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  {pain.businessImpact}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
