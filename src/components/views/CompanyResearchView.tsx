import React, { useState } from 'react';
import {
  Building2,
  Globe,
  Briefcase,
  Users,
  Search,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Cpu,
  Layers,
  ShieldAlert,
  Loader2
} from 'lucide-react';
import { ProspectInput, SalesReport } from '../../types';
import { SAMPLE_PROSPECTS } from '../../data/sampleProspects';

interface CompanyResearchViewProps {
  input: ProspectInput;
  setInput: React.Dispatch<React.SetStateAction<ProspectInput>>;
  onGenerate: () => void;
  isLoading: boolean;
  report: SalesReport | null;
  onSelectSample: () => void;
}

export const CompanyResearchView: React.FC<CompanyResearchViewProps> = ({
  input,
  setInput,
  onGenerate,
  isLoading,
  report,
  onSelectSample,
}) => {
  const sampleCompanies = [
    { name: 'Acme Logistics Global', industry: 'Logistics & Supply Chain', country: 'United States', employees: '1,000-5,000 employees', software: 'SAP HR / Excel Spreadsheets' },
    { name: 'Nexus Technologies', industry: 'Software & Technology', country: 'United Kingdom', employees: '250-1,000 employees', software: 'Legacy Zoho / Manual punch' },
    { name: 'Titan Manufacturing', industry: 'Industrial & Manufacturing', country: 'India', employees: '5,000+ employees', software: 'GreytHR / Paper logs' },
    { name: 'Apex Healthcare Systems', industry: 'Healthcare Services', country: 'Singapore', employees: '1,000-5,000 employees', software: 'Darwinbox / Manual Excel' },
  ];

  const handleApplyPreset = (p: typeof sampleCompanies[0]) => {
    setInput({
      companyName: p.name,
      website: `https://${p.name.toLowerCase().replace(/\s+/g, '')}.com`,
      industry: p.industry,
      country: p.country,
      employeeRange: p.employees,
      currentHrSoftware: p.software,
    });
  };

  const research = report?.detailedResearch;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <span className="px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase">
            AI Research Engine
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          AI Company Research & Intelligence
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Gather instant deep intelligence, technology stack analysis, digital maturity ratings, and buying signals for target enterprise accounts.
        </p>
      </div>

      {/* Input Form Card */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <Search className="w-4 h-4 text-blue-600" />
            <span>Target Prospect Configuration</span>
          </h3>
          <button
            onClick={onSelectSample}
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center space-x-1"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Auto-fill Sample Target</span>
          </button>
        </div>

        {/* Input Fields Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Company Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Acme Corp Global"
              value={input.companyName}
              onChange={(e) => setInput({ ...input, companyName: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Website
            </label>
            <input
              type="text"
              placeholder="https://acmeglobal.com"
              value={input.website || ''}
              onChange={(e) => setInput({ ...input, website: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Industry
            </label>
            <input
              type="text"
              placeholder="e.g. Technology & Professional Services"
              value={input.industry}
              onChange={(e) => setInput({ ...input, industry: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Country / Region
            </label>
            <input
              type="text"
              placeholder="e.g. United States / India"
              value={input.country}
              onChange={(e) => setInput({ ...input, country: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Employee Range
            </label>
            <select
              value={input.employeeRange}
              onChange={(e) => setInput({ ...input, employeeRange: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-white"
            >
              <option value="50-250 employees">50-250 employees</option>
              <option value="250-1,000 employees">250-1,000 employees</option>
              <option value="1,000-5,000 employees">1,000-5,000 employees</option>
              <option value="5,000+ employees">5,000+ employees</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Current HR / Operations Software
            </label>
            <input
              type="text"
              placeholder="e.g. SAP / Zoho / Manual spreadsheets"
              value={input.currentHrSoftware || ''}
              onChange={(e) => setInput({ ...input, currentHrSoftware: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-white"
            />
          </div>
        </div>

        {/* Quick Presets row */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-400">Quick Presets:</span>
            {SAMPLE_PROSPECTS.map((sc, i) => (
              <button
                key={i}
                onClick={() => setInput(sc.input)}
                className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition flex items-center space-x-1 cursor-pointer"
              >
                <Building2 className="w-3 h-3 text-blue-500" />
                <span>{sc.input.companyName}</span>
              </button>
            ))}
          </div>

          <button
            onClick={onGenerate}
            disabled={isLoading || !input.companyName.trim()}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-xs transition shadow-lg shadow-blue-500/20 flex items-center justify-center space-x-2 flex-shrink-0"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Analyzing Target...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Run AI Research</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Research Output View if Available */}
      {report && (
        <div className="space-y-6">
          {/* Executive Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3 md:col-span-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                  <Building2 className="w-4 h-4 text-blue-600" />
                  <span>Executive Company Summary</span>
                </h3>
                <span className="px-2.5 py-0.5 text-[10px] font-extrabold uppercase rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60">
                  {research?.digitalMaturity || report.companyIntelligence?.digitalMaturity}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {research?.executiveSummary || report.companyIntelligence?.businessSummary}
              </p>
              <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                  <span className="block text-[10px] text-slate-400 font-bold uppercase">Headquarters</span>
                  <strong className="text-slate-800 dark:text-slate-200">{report.companyIntelligence?.headquarters}</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                  <span className="block text-[10px] text-slate-400 font-bold uppercase">Workforce</span>
                  <strong className="text-slate-800 dark:text-slate-200">{report.companyIntelligence?.estimatedEmployeeSize}</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                  <span className="block text-[10px] text-slate-400 font-bold uppercase">Growth Stage</span>
                  <strong className="text-slate-800 dark:text-slate-200">{report.companyIntelligence?.growthStage}</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                  <span className="block text-[10px] text-slate-400 font-bold uppercase">Business Model</span>
                  <strong className="text-slate-800 dark:text-slate-200 truncate">{research?.businessModel || 'B2B Enterprise'}</strong>
                </div>
              </div>
            </div>

            {/* AI Fit Score Gauge Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white shadow-lg space-y-4 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">AI ICP Fit Score</span>
                <span className="px-2 py-0.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-extrabold">
                  {report.icpFitScore?.grade} Grade
                </span>
              </div>

              <div className="text-center space-y-1">
                <div className="text-5xl font-black tracking-tight text-white">
                  {report.icpFitScore?.score}<span className="text-2xl text-blue-400">%</span>
                </div>
                <p className="text-xs text-slate-300">Target Match Score</p>
              </div>

              <div className="p-3 rounded-xl bg-white/10 text-xs space-y-1">
                <span className="font-bold text-amber-300">Key Fit Driver:</span>
                <p className="text-slate-200 text-[11px] leading-snug">
                  {report.icpFitScore?.summary}
                </p>
              </div>
            </div>
          </div>

          {/* Technology Stack & Buying Signals */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tech Stack */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                <Cpu className="w-4 h-4 text-indigo-600" />
                <span>Detected Technology Stack</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {(research?.technologyStack || report.companyIntelligence?.keyTechnologies || []).map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold border border-slate-200 dark:border-slate-700 flex items-center space-x-1.5"
                  >
                    <Layers className="w-3.5 h-3.5 text-blue-500" />
                    <span>{tech}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Buying Signals */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <span>Executive Buying Signals</span>
              </h3>
              <div className="space-y-2 text-xs">
                {(research?.buyingSignals || report.icpFitScore?.matchingCriteria || []).map((signal, i) => (
                  <div key={i} className="flex items-start space-x-2 text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>{signal}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
