import React from 'react';
import { CompanyIntelligence } from '../../types';
import { Building2, Globe, Users, TrendingUp, Cpu } from 'lucide-react';
import { TypingText } from '../TypingText';
import { RegenerateButton } from '../RegenerateButton';

interface CompanyIntelligenceCardProps {
  data: CompanyIntelligence;
  companyName: string;
  onRegenerate?: () => void;
  isRegenerating?: boolean;
}

export const CompanyIntelligenceCard: React.FC<CompanyIntelligenceCardProps> = ({
  data,
  companyName,
  onRegenerate,
  isRegenerating = false,
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm hover:shadow-md transition relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-slate-100 dark:border-slate-800 gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Section 1
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Company Intelligence
            </h3>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            {data.growthStage}
          </span>
          {onRegenerate && (
            <RegenerateButton
              onRegenerate={onRegenerate}
              isRegenerating={isRegenerating}
              label="Regenerate Intelligence"
            />
          )}
        </div>
      </div>

      {/* Business Summary */}
      <div className="mb-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
        <h4 className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider mb-2">
          Business Summary
        </h4>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
          <TypingText text={data.businessSummary} speed={10} />
        </p>
      </div>

      {/* Grid Specs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Industry */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-800">
          <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400 text-xs font-semibold mb-1">
            <Globe className="w-3.5 h-3.5 text-blue-500" />
            <span>Industry</span>
          </div>
          <div className="text-sm font-bold text-slate-900 dark:text-white truncate">
            {data.industry}
          </div>
        </div>

        {/* Estimated Size */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-800">
          <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400 text-xs font-semibold mb-1">
            <Users className="w-3.5 h-3.5 text-blue-500" />
            <span>Estimated Employees</span>
          </div>
          <div className="text-sm font-bold text-slate-900 dark:text-white">
            {data.estimatedEmployeeSize}
          </div>
        </div>

        {/* Growth Stage */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-800">
          <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400 text-xs font-semibold mb-1">
            <TrendingUp className="w-3.5 h-3.5 text-blue-500" />
            <span>Growth Stage</span>
          </div>
          <div className="text-sm font-bold text-slate-900 dark:text-white">
            {data.growthStage}
          </div>
        </div>

        {/* Digital Maturity */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-800">
          <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400 text-xs font-semibold mb-1">
            <Cpu className="w-3.5 h-3.5 text-blue-500" />
            <span>Digital Maturity</span>
          </div>
          <div className="text-sm font-bold text-blue-600 dark:text-blue-400">
            {data.digitalMaturity}
          </div>
        </div>
      </div>

      {/* Tech stack indicators */}
      {data.keyTechnologies && data.keyTechnologies.length > 0 && (
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center flex-wrap gap-2">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mr-2">
            Identified Tech Stack Signals:
          </span>
          {data.keyTechnologies.map((tech, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-medium border border-blue-200/60 dark:border-blue-800/60"
            >
              {tech}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
