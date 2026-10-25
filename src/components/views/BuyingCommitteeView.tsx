import React, { useState } from 'react';
import {
  Users,
  ShieldCheck,
  Award,
  AlertCircle,
  Briefcase,
  Target,
  CheckCircle2,
  ChevronRight,
  UserCheck,
  UserX,
  HelpCircle
} from 'lucide-react';
import { SalesReport } from '../../types';

interface BuyingCommitteeViewProps {
  report: SalesReport;
}

export const BuyingCommitteeView: React.FC<BuyingCommitteeViewProps> = ({ report }) => {
  const [filterStance, setFilterStance] = useState<string>('all');
  const [filterClassification, setFilterClassification] = useState<string>('all');

  const committee = report.buyingCommittee || report.decisionMakerMap || [];

  const classificationColors: Record<string, string> = {
    'Decision Maker': 'bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800',
    'Economic Buyer': 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    'Champion': 'bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    'Influencer': 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800',
    'Technical Buyer': 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    'Blocker': 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800',
  };

  const stanceBadge = (stance?: string) => {
    switch (stance) {
      case 'Champion':
        return <span className="px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 text-[10px] font-extrabold flex items-center gap-1 border border-emerald-200/60"><UserCheck className="w-3 h-3" /> Champion</span>;
      case 'Supportive':
        return <span className="px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-[10px] font-extrabold flex items-center gap-1 border border-blue-200/60"><CheckCircle2 className="w-3 h-3" /> Supportive</span>;
      case 'Skeptical':
      case 'Blocker':
        return <span className="px-2 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400 text-[10px] font-extrabold flex items-center gap-1 border border-rose-200/60"><UserX className="w-3 h-3" /> High Friction</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-extrabold flex items-center gap-1 border border-slate-200/60"><HelpCircle className="w-3 h-3" /> Neutral</span>;
    }
  };

  const filteredCommittee = committee.filter((item: any) => {
    if (filterStance !== 'all' && item.stance !== filterStance) return false;
    if (filterClassification !== 'all' && (item.classification || item.importance) !== filterClassification) return false;
    return true;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase">
            Stakeholder Map
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Buying Committee & Executive Persona Matrix
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Understand key decision-makers across {report.input.companyName}: CEO, Founder, COO, CFO, CHRO, HR Director, Operations Director, Delivery Head, and Finance Head.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Classification:</span>
          <select
            value={filterClassification}
            onChange={(e) => setFilterClassification(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold focus:outline-none dark:text-white"
          >
            <option value="all">All Classifications</option>
            <option value="Decision Maker">Decision Maker</option>
            <option value="Economic Buyer">Economic Buyer</option>
            <option value="Champion">Champion</option>
            <option value="Influencer">Influencer</option>
            <option value="Technical Buyer">Technical Buyer</option>
            <option value="Blocker">Blocker</option>
          </select>

          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 ml-2">Stance:</span>
          <select
            value={filterStance}
            onChange={(e) => setFilterStance(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold focus:outline-none dark:text-white"
          >
            <option value="all">All Stances</option>
            <option value="Champion">Champion</option>
            <option value="Supportive">Supportive</option>
            <option value="Neutral">Neutral</option>
            <option value="Skeptical">Skeptical</option>
          </select>
        </div>

        <span className="text-xs font-bold text-slate-400">
          Showing {filteredCommittee.length} of {committee.length} Stakeholders
        </span>
      </div>

      {/* Stakeholders Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCommittee.map((person: any, idx: number) => {
          const roleTitle = person.role || person.title;
          const classification = person.classification || person.importance;
          const concerns = person.keyPriorities || person.keyConcerns || [];
          const pitch = person.engagementStrategy || person.recommendedPitchAngle;

          return (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition duration-200 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
                      {roleTitle}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      {person.roleCategory || 'Executive Leadership'}
                    </p>
                  </div>
                  {stanceBadge(person.stance)}
                </div>

                <div>
                  <span
                    className={`inline-block px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase border ${
                      classificationColors[classification] ||
                      'bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {classification}
                  </span>
                </div>

                {person.whyRoleMatters && (
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                    "{person.whyRoleMatters}"
                  </p>
                )}

                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Key Priorities & Concerns</span>
                  <ul className="space-y-1 text-xs">
                    {concerns.map((c: string, cIdx: number) => (
                      <li key={cIdx} className="flex items-start space-x-1.5 text-slate-700 dark:text-slate-300">
                        <ChevronRight className="w-3.5 h-3.5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1">
                <span className="text-[10px] font-extrabold uppercase text-blue-600 dark:text-blue-400 tracking-wider">
                  Recommended Engagement Strategy
                </span>
                <p className="text-xs text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                  {pitch}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
