import React, { useState } from 'react';
import { ObjectionHandler } from '../../types';
import { ShieldCheck, MessageCircle, HelpCircle } from 'lucide-react';
import { RegenerateButton } from '../RegenerateButton';

interface ObjectionHandlingCardProps {
  data: ObjectionHandler[];
  companyName: string;
  onRegenerate?: () => void;
  isRegenerating?: boolean;
}

export const ObjectionHandlingCard: React.FC<ObjectionHandlingCardProps> = ({
  data,
  companyName,
  onRegenerate,
  isRegenerating = false,
}) => {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm hover:shadow-md transition">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-slate-100 dark:border-slate-800 gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Section 7
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Enterprise Objection Handling Matrix
            </h3>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            {data.length} Rebuttals
          </span>
          {onRegenerate && (
            <RegenerateButton
              onRegenerate={onRegenerate}
              isRegenerating={isRegenerating}
              label="Regenerate Objections"
            />
          )}
        </div>
      </div>

      <p className="text-sm text-slate-600 dark:text-slate-300 mb-6">
        Anticipated pushback from {companyName} and recommended consultative pivots:
      </p>

      {/* Objection selector tabs */}
      <div className="flex overflow-x-auto gap-2 pb-2 mb-6 scrollbar-none">
        {data.map((item, idx) => {
          const isActive = activeIdx === idx;
          return (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer border ${
                isActive
                  ? 'bg-amber-500 text-white border-amber-600 shadow-md shadow-amber-500/20'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              "{item.objection.length > 28 ? item.objection.substring(0, 28) + '...' : item.objection}"
            </button>
          );
        })}
      </div>

      {/* Selected Objection Card Details */}
      {data[activeIdx] && (
        <div className="bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 space-y-5">
          {/* Objection header */}
          <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/60">
            <span className="text-[10px] uppercase tracking-wider font-bold text-rose-600 dark:text-rose-400 block mb-1">
              Customer Objection
            </span>
            <p className="text-base font-extrabold text-rose-950 dark:text-rose-200">
              "{data[activeIdx].objection}"
            </p>
          </div>

          {/* Context */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Underlying Context & Mindset
            </h5>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {data[activeIdx].context}
            </p>
          </div>

          {/* Recommended Response */}
          <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <h5 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2 flex items-center gap-1.5">
              <MessageCircle className="w-4 h-4" />
              Recommended Scripted Rebuttal
            </h5>
            <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-normal italic">
              "{data[activeIdx].recommendedResponse}"
            </p>
          </div>

          {/* Pivot Question */}
          <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900/60 flex items-start space-x-3">
            <HelpCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wider block mb-0.5">
                Consultative Pivot Question
              </span>
              <p className="text-xs sm:text-sm font-semibold text-amber-950 dark:text-amber-200">
                "{data[activeIdx].pivotQuestion}"
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
