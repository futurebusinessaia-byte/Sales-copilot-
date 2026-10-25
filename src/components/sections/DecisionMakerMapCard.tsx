import React, { useState } from 'react';
import { DecisionMaker } from '../../types';
import { Users, UserCheck, ShieldAlert, ChevronRight, MessageSquare } from 'lucide-react';
import { RegenerateButton } from '../RegenerateButton';

interface DecisionMakerMapCardProps {
  data: DecisionMaker[];
  companyName: string;
  onRegenerate?: () => void;
  isRegenerating?: boolean;
}

export const DecisionMakerMapCard: React.FC<DecisionMakerMapCardProps> = ({
  data,
  companyName,
  onRegenerate,
  isRegenerating = false,
}) => {
  const [selectedRole, setSelectedRole] = useState<DecisionMaker>(data[0] || data[2]);

  const getBadgeColor = (importance: string) => {
    switch (importance) {
      case 'Primary Sponsor':
        return 'bg-purple-50 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800';
      case 'Decision Maker':
        return 'bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800';
      case 'Budget Holder':
        return 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
      case 'Champion':
        return 'bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800';
      default:
        return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm hover:shadow-md transition">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-slate-100 dark:border-slate-800 gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
              Section 3
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Decision Maker Map & Buyer Persona Playbook
            </h3>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            {data.length} Stakeholders
          </span>
          {onRegenerate && (
            <RegenerateButton
              onRegenerate={onRegenerate}
              isRegenerating={isRegenerating}
              label="Regenerate Decision Makers"
            />
          )}
        </div>
      </div>

      <p className="text-sm text-slate-600 dark:text-slate-300 mb-6">
        Select a recommended decision maker role to review their key concerns, priorities, and tailored sales pitch angle for {companyName}:
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Role Selector List */}
        <div className="lg:col-span-5 space-y-2 max-h-[480px] overflow-y-auto pr-1">
          {data.map((dm, idx) => {
            const isSelected = selectedRole?.title === dm.title;
            return (
              <button
                key={idx}
                onClick={() => setSelectedRole(dm)}
                className={`w-full text-left p-3.5 rounded-xl border transition flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-blue-50/80 dark:bg-blue-950/60 border-blue-500 text-slate-900 dark:text-white shadow-xs'
                    : 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-200/60 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                      isSelected
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {dm.title.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">
                      {dm.title}
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">
                      {dm.roleCategory}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getBadgeColor(
                      dm.importance
                    )}`}
                  >
                    {dm.importance}
                  </span>
                  <ChevronRight className={`w-4 h-4 text-slate-400 transition ${isSelected ? 'transform rotate-90 text-blue-600' : ''}`} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Role Detail Panel */}
        <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200 dark:border-slate-700">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  {selectedRole.roleCategory} Stakeholder
                </span>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                  {selectedRole.title}
                </h4>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold border ${getBadgeColor(
                  selectedRole.importance
                )}`}
              >
                {selectedRole.importance}
              </span>
            </div>

            {/* Why Role Matters */}
            <div className="mb-4">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1 flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-blue-500" />
                Why This Role Matters
              </h5>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                {selectedRole.whyRoleMatters}
              </p>
            </div>

            {/* Key Concerns */}
            <div className="mb-4">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
                Primary Concerns & Frustrations
              </h5>
              <ul className="space-y-1.5">
                {selectedRole.keyConcerns.map((concern, idx) => (
                  <li
                    key={idx}
                    className="text-xs text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 p-2.5 rounded-lg border border-slate-200/60 dark:border-slate-700/60 flex items-center space-x-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                    <span>{concern}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Recommended Pitch Angle */}
          <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800">
            <h5 className="text-xs font-bold uppercase tracking-wider text-blue-800 dark:text-blue-300 mb-1 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              Recommended Value Pitch Angle
            </h5>
            <p className="text-xs sm:text-sm text-blue-950 dark:text-blue-100 font-medium">
              {selectedRole.recommendedPitchAngle}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
