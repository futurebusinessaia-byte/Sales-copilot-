import React, { useState } from 'react';
import {
  HelpCircle,
  Clock,
  CheckSquare,
  Square,
  AlertCircle,
  MessageSquare,
  ShieldAlert,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { SalesReport } from '../../types';

interface DiscoveryCoachViewProps {
  report: SalesReport;
}

export const DiscoveryCoachView: React.FC<DiscoveryCoachViewProps> = ({ report }) => {
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  const toggleCheck = (idx: number) => {
    setCheckedItems(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const questions = report.discoveryQuestions || report.discoveryCoach?.consultativeQuestions || [];
  const objections = report.objectionHandling || report.discoveryCoach?.objectionHandling || [];

  const agenda = report.discoveryCoach?.meetingAgenda || [
    '1. Introductions & Executive Scope Alignment (5 mins)',
    '2. Current State Review: Technology & Operational Pain Points (10 mins)',
    '3. AI Platform Capabilities & Workflow Demonstration (15 mins)',
    '4. ROI Assessment & Business Case Review (10 mins)',
    '5. Next Steps & Timeline Alignment (5 mins)'
  ];

  const checklist = report.discoveryCoach?.discoveryChecklist || [
    'Identify Economic Buyer (CFO/COO)',
    'Quantify current monthly hours spent on attendance & payroll',
    'Confirm contract expiration date for legacy software',
    'Define decision criteria and technical security requirements',
    'Schedule follow-up ROI presentation'
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <span className="px-2.5 py-0.5 rounded-full bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 text-xs font-bold uppercase">
            Sales Enablement
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Discovery Coach & Meeting Playbook
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Structured 10-question discovery framework, meeting agenda, objection handling, and checklist for {report.input.companyName}.
        </p>
      </div>

      {/* Top Grid: Meeting Agenda & Checklist */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Agenda */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <Clock className="w-4 h-4 text-blue-600" />
            <span>Recommended Discovery Call Agenda (45 mins)</span>
          </h3>
          <div className="space-y-2 text-xs">
            {agenda.map((item, i) => (
              <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 font-semibold text-slate-700 dark:text-slate-300 flex items-center space-x-2">
                <ChevronRight className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Discovery Checklist */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <CheckSquare className="w-4 h-4 text-emerald-600" />
            <span>Discovery Qualification Checklist</span>
          </h3>
          <div className="space-y-2 text-xs">
            {checklist.map((item, i) => {
              const isChecked = !!checkedItems[i];
              return (
                <button
                  key={i}
                  onClick={() => toggleCheck(i)}
                  className={`w-full p-3 rounded-xl border text-left flex items-center space-x-3 transition ${
                    isChecked
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 text-emerald-900 dark:text-emerald-200 line-through'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200/60 dark:border-slate-700/60 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {isChecked ? (
                    <CheckSquare className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  )}
                  <span className="font-semibold">{item}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 10 Discovery Questions */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <HelpCircle className="w-4 h-4 text-violet-600" />
            <span>Consultative Discovery Questions (10 Questions)</span>
          </h3>
          <span className="text-xs text-slate-400">High-Impact Discovery</span>
        </div>

        <div className="space-y-4">
          {questions.map((q: any, i: number) => (
            <div key={i} className="p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 text-[10px] font-extrabold uppercase">
                  Q{q.number || i + 1} • {q.topicCategory || 'Discovery'}
                </span>
              </div>
              <p className="text-sm font-extrabold text-slate-900 dark:text-white leading-relaxed">
                "{q.question}"
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 space-y-1">
                  <span className="font-bold text-blue-600 dark:text-blue-400 text-[10px] uppercase">Strategic Objective</span>
                  <p className="text-slate-600 dark:text-slate-300">{q.objective}</p>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 space-y-1">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 text-[10px] uppercase">What to Listen For</span>
                  <p className="text-slate-600 dark:text-slate-300">{q.whatToListenFor}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Objection Handling */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2 border-b border-slate-100 dark:border-slate-800 pb-3">
          <MessageSquare className="w-4 h-4 text-rose-600" />
          <span>Objection Handling & Pivot Playbook</span>
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {objections.map((obj: any, idx: number) => (
            <div key={idx} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-3">
              <span className="px-2.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 text-[10px] font-extrabold uppercase">
                Objection #{idx + 1}
              </span>
              <h4 className="text-xs font-black text-slate-900 dark:text-white">
                "{obj.objection}"
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
                {obj.context}
              </p>
              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 text-xs space-y-1">
                <span className="font-bold text-emerald-600 dark:text-emerald-400 text-[10px] uppercase">Recommended Response</span>
                <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-medium">{obj.recommendedResponse}</p>
              </div>
              <div className="p-3.5 rounded-xl bg-blue-50/60 dark:bg-blue-950/40 text-xs space-y-1">
                <span className="font-bold text-blue-700 dark:text-blue-300 text-[10px] uppercase">Pivot Question</span>
                <p className="text-blue-900 dark:text-blue-200 font-bold">"{obj.pivotQuestion}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
