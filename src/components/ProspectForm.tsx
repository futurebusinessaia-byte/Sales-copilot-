import React, { useState } from 'react';
import { ProspectInput } from '../types';
import {
  Sparkles,
  Building2,
  Globe,
  Briefcase,
  MapPin,
  Users,
  Cpu,
  ArrowRight,
  Zap,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  CheckCircle2,
  Loader2,
  Wand2,
  Layers
} from 'lucide-react';
import { SAMPLE_PROSPECTS } from '../data/sampleProspects';

interface ProspectFormProps {
  onSubmit: (input: ProspectInput) => void;
  isLoading: boolean;
  onSelectSample: (sample: typeof SAMPLE_PROSPECTS[0]) => void;
  remainingAnalyses?: number;
  onOpenUpgradeModal?: (feature?: string) => void;
}

export const ProspectForm: React.FC<ProspectFormProps> = ({
  onSubmit,
  isLoading,
  onSelectSample,
  remainingAnalyses = 10,
  onOpenUpgradeModal,
}) => {
  const [mode, setMode] = useState<'fast' | 'advanced'>('fast');
  const [isInferring, setIsInferring] = useState<boolean>(false);
  const [inferredNotification, setInferredNotification] = useState<string | null>(null);

  const [formData, setFormData] = useState<ProspectInput>({
    companyName: 'AstraTech Global',
    website: 'www.astratech-global.com',
    industry: 'IT Services & Consulting',
    country: 'United States',
    employeeRange: '1,000 - 5,000 employees',
    currentHrSoftware: 'SAP SuccessFactors & Excel',
    businessModel: 'B2B Enterprise SaaS & Consulting',
    digitalMaturity: 'High',
  });

  const handleChange = (field: keyof ProspectInput, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Helper function to auto-infer fields via AI API
  const handleAutoInfer = async (companyNameOverride?: string, websiteOverride?: string): Promise<ProspectInput> => {
    const nameToInfer = companyNameOverride || formData.companyName;
    const websiteToInfer = websiteOverride || formData.website;

    if (!nameToInfer.trim()) {
      return formData;
    }

    setIsInferring(true);
    setInferredNotification(null);

    try {
      const res = await fetch('/api/infer-prospect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyName: nameToInfer, website: websiteToInfer }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.inferred) {
          const updated: ProspectInput = {
            ...formData,
            companyName: nameToInfer,
            website: data.inferred.website || websiteToInfer,
            industry: data.inferred.industry || formData.industry || 'IT Services & Consulting',
            country: data.inferred.country || formData.country || 'United States',
            employeeRange: data.inferred.employeeRange || formData.employeeRange || '1,000 - 5,000 employees',
            currentHrSoftware: data.inferred.currentHrSoftware || formData.currentHrSoftware || 'SAP SuccessFactors & Excel',
            businessModel: data.inferred.businessModel || 'B2B Enterprise Services',
            digitalMaturity: data.inferred.digitalMaturity || 'High',
          };
          setFormData(updated);
          setInferredNotification(`Inferred: ${updated.industry} • ${updated.country} • ${updated.employeeRange}`);
          setIsInferring(false);
          return updated;
        }
      }
    } catch (err) {
      console.warn('Auto-infer call failed, using default values', err);
    }

    setIsInferring(false);
    return formData;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName.trim()) return;

    let finalData = formData;

    // In Fast Mode or if key inferred fields are empty/defaults, auto-infer first
    if (mode === 'fast' || !formData.industry.trim() || !formData.country.trim()) {
      finalData = await handleAutoInfer();
    }

    onSubmit(finalData);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 animate-fadeIn">
      {/* Title Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/80 border border-blue-200/80 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-xs font-semibold mb-4 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Enterprise Discovery Meeting Copilot</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
          AI Enterprise Sales Copilot
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-normal">
          Prepare for enterprise discovery meetings in minutes. Fast Mode auto-deduces prospect intelligence with Advanced AI Analysis.
        </p>
      </div>

      {/* Quick Presets Bar */}
      <div className="mb-6 bg-slate-100/80 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-500" /> Quick Presets (1-Click Sample Intelligence)
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {SAMPLE_PROSPECTS.map((sample, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setFormData(sample.input);
                onSelectSample(sample);
              }}
              className="px-3 py-1.5 rounded-xl text-xs font-medium bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 border border-slate-200 dark:border-slate-700 shadow-2xs transition flex items-center space-x-1.5 cursor-pointer"
            >
              <Building2 className="w-3.5 h-3.5 text-blue-500" />
              <span>{sample.input.companyName}</span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500">({sample.input.industry})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Form Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none p-6 sm:p-8 space-y-6">
        
        {/* Mode Selector Switcher */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Input Mode:
            </span>
            <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setMode('fast')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer ${
                  mode === 'fast'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Zap className="w-3.5 h-3.5 text-amber-300" />
                <span>Fast Mode</span>
              </button>
              <button
                type="button"
                onClick={() => setMode('advanced')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer ${
                  mode === 'advanced'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Advanced Mode</span>
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setMode(mode === 'fast' ? 'advanced' : 'fast')}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center space-x-1 cursor-pointer"
          >
            <span>{mode === 'fast' ? 'Show More Fields' : 'Switch to Fast Mode'}</span>
            {mode === 'fast' ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Fast Mode Information Banner */}
          {mode === 'fast' && (
            <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border border-blue-200/80 dark:border-blue-800/80 flex items-start space-x-3 text-xs">
              <Zap className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold text-blue-950 dark:text-blue-200 flex items-center space-x-1.5">
                  <span>Fast Mode Active — Auto-Inferring Company Profile</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-blue-200 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-[10px] uppercase font-extrabold">
                    AI Engine
                  </span>
                </span>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Enter <strong>Company Name</strong> and <strong>Website</strong>. The Enterprise AI Engine will automatically infer <strong>Industry, Country, Employee Range, Business Model</strong>, and <strong>Digital Maturity</strong> before building your sales report.
                </p>
              </div>
            </div>
          )}

          {/* Form Inputs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Company Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.companyName}
                onChange={(e) => handleChange('companyName', e.target.value)}
                placeholder="e.g. Acme Corporation or Stripe"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-800 transition text-sm font-medium"
              />
            </div>

            {/* Website */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Website URL <span className="text-slate-400 font-normal lowercase">(recommended)</span>
              </label>
              <input
                type="text"
                value={formData.website}
                onChange={(e) => handleChange('website', e.target.value)}
                placeholder="e.g. www.acmecorp.com"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-800 transition text-sm font-medium"
              />
            </div>

            {/* Advanced Fields - rendered when in Advanced Mode */}
            {mode === 'advanced' && (
              <>
                {/* Industry */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    Industry
                  </label>
                  <input
                    type="text"
                    value={formData.industry}
                    onChange={(e) => handleChange('industry', e.target.value)}
                    placeholder="e.g. Technology, Retail, Logistics, Healthcare"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-800 transition text-sm font-medium"
                  />
                </div>

                {/* Country */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    Country / Region
                  </label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => handleChange('country', e.target.value)}
                    placeholder="e.g. United States, United Kingdom, Singapore"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-800 transition text-sm font-medium"
                  />
                </div>

                {/* Employee Range */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    Employee Range
                  </label>
                  <select
                    value={formData.employeeRange}
                    onChange={(e) => handleChange('employeeRange', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-800 transition text-sm font-medium"
                  >
                    <option value="50 - 250 employees">50 - 250 employees</option>
                    <option value="250 - 1,000 employees">250 - 1,000 employees</option>
                    <option value="1,000 - 5,000 employees">1,000 - 5,000 employees</option>
                    <option value="5,000+ employees">5,000+ employees</option>
                  </select>
                </div>

                {/* Business Model */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    Business Model <span className="text-slate-400 font-normal lowercase">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.businessModel || ''}
                    onChange={(e) => handleChange('businessModel', e.target.value)}
                    placeholder="e.g. B2B SaaS, Multi-Location Retail, Supply Chain"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-800 transition text-sm font-medium"
                  />
                </div>

                {/* Digital Maturity */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Wand2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    Digital Maturity
                  </label>
                  <select
                    value={formData.digitalMaturity || 'High'}
                    onChange={(e) => handleChange('digitalMaturity', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-800 transition text-sm font-medium"
                  >
                    <option value="Low">Low (Paper / Manual Systems)</option>
                    <option value="Moderate">Moderate (Basic Cloud Tools)</option>
                    <option value="High">High (Cloud Integrated)</option>
                    <option value="Enterprise Digital-First">Enterprise Digital-First</option>
                  </select>
                </div>

                {/* Current HR Software */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Cpu className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    Current HR Software <span className="text-slate-400 font-normal lowercase">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.currentHrSoftware || ''}
                    onChange={(e) => handleChange('currentHrSoftware', e.target.value)}
                    placeholder="e.g. SAP, Workday, Zoho, Legacy excel"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-800 transition text-sm font-medium"
                  />
                </div>
              </>
            )}
          </div>

          {/* Toggle / Auto-Infer Action bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
            <button
              type="button"
              onClick={() => setMode(mode === 'fast' ? 'advanced' : 'fast')}
              className="inline-flex items-center space-x-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 hover:underline cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{mode === 'fast' ? 'Show More Fields (Advanced Mode)' : 'Hide Advanced Fields (Fast Mode)'}</span>
              {mode === 'fast' ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
            </button>

            {/* Manual Auto-Infer button for Advanced Mode or quick test */}
            <button
              type="button"
              onClick={() => handleAutoInfer()}
              disabled={isInferring || !formData.companyName.trim()}
              className="inline-flex items-center space-x-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition disabled:opacity-50 cursor-pointer"
            >
              {isInferring ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-500" />
                  <span>Inferring Details...</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-3.5 h-3.5 text-amber-500" />
                  <span>✨ Auto-Detect Details with AI</span>
                </>
              )}
            </button>
          </div>

          {/* Inferred notification toast */}
          {inferredNotification && (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-medium flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
              <span>{inferredNotification}</span>
            </div>
          )}

          {/* Submit Action Button */}
          <div className="pt-2">
            {remainingAnalyses <= 0 ? (
              <button
                type="button"
                onClick={() => onOpenUpgradeModal && onOpenUpgradeModal('Evaluation Limit Exhausted')}
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-rose-600 to-red-700 text-white font-bold text-base shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Zap className="w-5 h-5 text-amber-300" />
                <span>Free Evaluation Limit Reached (0 / 10 Remaining) — Share Feedback & Extend Evaluation</span>
              </button>
            ) : (
              <button
                type="submit"
                disabled={isLoading || isInferring || !formData.companyName.trim()}
                className="w-full py-4 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-base shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isLoading || isInferring ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-white" />
                    <span>{isInferring ? 'Inferring Company Profile...' : 'Generating Sales Intelligence...'}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-blue-200" />
                    <span>Generate Sales Intelligence ({remainingAnalyses} Free Left)</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Feature Highlights */}
      <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="p-4 rounded-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800">
          <div className="text-xl font-bold text-blue-600 dark:text-blue-400">11 Sections</div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Deep Discovery Analysis</div>
        </div>
        <div className="p-4 rounded-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800">
          <div className="text-xl font-bold text-blue-600 dark:text-blue-400">10 Questions</div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Consultative Playbook</div>
        </div>
        <div className="p-4 rounded-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800">
          <div className="text-xl font-bold text-blue-600 dark:text-blue-400">8 Key Roles</div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Decision Maker Alignment</div>
        </div>
        <div className="p-4 rounded-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800">
          <div className="text-xl font-bold text-blue-600 dark:text-blue-400">1-Page Brief</div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Printable Exec Executive Summary</div>
        </div>
      </div>
    </div>
  );
};
