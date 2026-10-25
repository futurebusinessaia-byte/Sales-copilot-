import React, { useState, useEffect } from 'react';
import { Sparkles, Loader2, CheckCircle2, Search, BrainCircuit, Target, FileText } from 'lucide-react';

interface LoadingProgressProps {
  companyName: string;
}

const STEPS = [
  { id: 1, label: 'Scanning corporate digital footprint & website metadata...', icon: Search },
  { id: 2, label: 'Evaluating workforce scale and digital maturity stage...', icon: BrainCircuit },
  { id: 3, label: 'Calculating Ideal Customer Profile (ICP) fit score...', icon: Target },
  { id: 4, label: 'Mapping executive decision maker roles & pitch angles...', icon: BrainCircuit },
  { id: 5, label: 'Synthesizing operational pain points & product positioning...', icon: BrainCircuit },
  { id: 6, label: 'Formulating 10 consultative discovery questions...', icon: FileText },
  { id: 7, label: 'Building objection playbooks, outreach scripts & executive brief...', icon: Sparkles },
];

export const LoadingProgress: React.FC<LoadingProgressProps> = ({ companyName }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < STEPS.length - 1) return prev + 1;
        return prev;
      });
    }, 600);

    return () => clearInterval(interval);
  }, []);

  const progressPercent = Math.round(((currentStep + 1) / STEPS.length) * 100);

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      {/* Icon Ring */}
      <div className="relative w-20 h-20 mx-auto mb-8 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-4 border-blue-200 dark:border-blue-900 border-t-blue-600 animate-spin"></div>
        <div className="w-14 h-14 bg-white dark:bg-slate-900 rounded-full shadow-md flex items-center justify-center">
          <Sparkles className="w-7 h-7 text-blue-600 dark:text-blue-400 animate-pulse" />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
        Generating Sales Intelligence for <span className="text-blue-600 dark:text-blue-400">{companyName}</span>
      </h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
        Synthesizing executive insights, ICP fit score, discovery questions, and executive meeting brief...
      </p>

      {/* Progress Bar */}
      <div className="mb-8 bg-slate-200 dark:bg-slate-800 rounded-full h-3 overflow-hidden p-0.5">
        <div
          className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 h-full rounded-full transition-all duration-300 ease-out shadow-xs"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>

      {/* Step Checklist */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-lg text-left space-y-3">
        {STEPS.map((step, idx) => {
          const isDone = idx < currentStep;
          const isCurrent = idx === currentStep;
          const Icon = step.icon;

          return (
            <div
              key={step.id}
              className={`flex items-center space-x-3 text-xs sm:text-sm transition-all duration-200 ${
                isCurrent
                  ? 'text-blue-600 dark:text-blue-400 font-semibold'
                  : isDone
                  ? 'text-slate-700 dark:text-slate-300 font-medium'
                  : 'text-slate-400 dark:text-slate-600 opacity-60'
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              ) : isCurrent ? (
                <Loader2 className="w-4 h-4 text-blue-600 animate-spin shrink-0" />
              ) : (
                <div className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-700 shrink-0" />
              )}
              <span>{step.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
