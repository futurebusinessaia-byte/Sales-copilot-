import React, { useState } from 'react';
import {
  FileText,
  Printer,
  Download,
  CheckCircle2,
  Calendar,
  DollarSign,
  Building2,
  Sparkles,
  ShieldCheck,
  Send
} from 'lucide-react';
import { SalesReport } from '../../types';
import { useToast } from '../../context/ToastContext';

interface ProposalGeneratorViewProps {
  report: SalesReport;
  onOpenModal: () => void;
  onRestrictedFeature?: (featureName: string) => void;
}

export const ProposalGeneratorView: React.FC<ProposalGeneratorViewProps> = ({ report, onOpenModal, onRestrictedFeature }) => {
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);

  const proposal = report.proposal || {
    executiveSummary: `This executive proposal outlines the deployment of the Enterprise Revenue Command Center for ${report.input.companyName} to modernize sales velocity, workforce intelligence, and revenue operations.`,
    businessChallenges: [
      `Fragmented workforce tracking and manual reconciliation using current software`,
      `Delayed timesheet submissions hurting monthly client billing cycles`,
      `Lack of executive visibility into real-time billable resource capacity`
    ],
    recommendedSolution: `Deploy the Enterprise Revenue Command Center with automated AI research, mobile attendance check-in, real-time ROI forecasting, and bi-directional ERP API integrations.`,
    timeline: [
      { phase: 'Phase 1: Setup & API Integration', duration: 'Week 1', deliverables: ['Data schema configuration', 'SSO & OAuth setup', 'Master record import'] },
      { phase: 'Phase 2: Pilot Rollout & Workflow Testing', duration: 'Week 2', deliverables: ['Department pilot onboarding', 'Custom policy rules validation', 'Mobile app testing'] },
      { phase: 'Phase 3: Full Go-Live & Executive Enablement', duration: 'Week 3', deliverables: ['All-hands onboarding', 'Executive dashboard launch', 'SLA support activation'] }
    ],
    investment: {
      licenseFee: '$48,000 / year (Up to 1,000 seats)',
      implementationFee: '$12,000 (One-time setup & training)',
      trainingAndSupport: 'Included (24/7 Enterprise SLA)',
      totalYearOne: '$60,000 Total First Year Investment'
    },
    roiSummary: `Projected Year 1 net savings of $184,000, yielding a 206% net first-year ROI with full payback achieved in 2.4 months.`,
    implementationPlan: [
      'Kickoff call with COO, HR Director, and IT Lead',
      'Bi-directional REST API configuration with current database',
      'Admin training & custom workflow template creation',
      'Company-wide mobile app rollout'
    ],
    nextSteps: [
      'Approve Executive Proposal and select target start date',
      'Execute Master Services Agreement (MSA)',
      'Initiate Phase 1 API integration kickoff'
    ]
  };

  const handleCopyProposal = () => {
    const text = `EXECUTIVE PROPOSAL: ${report.input.companyName}\nPrepared by Sheetal Infrastructure AI\n\nEXECUTIVE SUMMARY:\n${proposal.executiveSummary}\n\nRECOMMENDED SOLUTION:\n${proposal.recommendedSolution}\n\nINVESTMENT:\n${proposal.investment.totalYearOne}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    showToast('✓ Copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase">
              AI Document Studio
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Executive Proposal Generator
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Tailored, enterprise-grade executive proposal for {report.input.companyName}.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={handleCopyProposal}
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-xs border border-slate-200 dark:border-slate-700 hover:bg-slate-200 transition"
          >
            {copied ? 'Copied to Clipboard!' : 'Copy Text'}
          </button>
          <button
            onClick={() => onRestrictedFeature ? onRestrictedFeature('Proposal PDF Export') : onOpenModal()}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition shadow-lg shadow-blue-500/20 flex items-center space-x-2 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Export PDF</span>
          </button>
        </div>
      </div>

      {/* Proposal Document Preview Container */}
      <div className="p-8 sm:p-10 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-lg space-y-8 max-w-4xl mx-auto">
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-6 gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400 tracking-wider block">
              Sheetal Infrastructure AI • Commercial Proposal
            </span>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              Enterprise Revenue Command Center
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">Prepared exclusively for {report.input.companyName}</p>
          </div>
          <div className="text-right text-xs text-slate-400 space-y-0.5">
            <div>Date: {new Date().toLocaleDateString()}</div>
            <div>Ref: {report.id}</div>
            <div>Valid for: 30 Days</div>
          </div>
        </div>

        {/* Section 1: Executive Summary */}
        <div className="space-y-3">
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider text-blue-600 dark:text-blue-400">
            1. Executive Summary
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
            {proposal.executiveSummary}
          </p>
        </div>

        {/* Section 2: Key Challenges & Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider text-rose-600 dark:text-rose-400">
              2. Key Business Challenges
            </h3>
            <ul className="space-y-2 text-xs">
              {proposal.businessChallenges.map((c, i) => (
                <li key={i} className="flex items-start space-x-2 text-slate-700 dark:text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0"></span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              3. Recommended Solution
            </h3>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-emerald-50/50 dark:bg-emerald-950/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800">
              {proposal.recommendedSolution}
            </p>
          </div>
        </div>

        {/* Section 4: Implementation Timeline */}
        <div className="space-y-3">
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            4. 3-Week Rapid Onboarding Timeline
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {proposal.timeline.map((t, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
                <span className="px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-[10px] font-bold uppercase">
                  {t.duration}
                </span>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">{t.phase}</h4>
                <ul className="space-y-1 text-[11px] text-slate-600 dark:text-slate-400">
                  {t.deliverables.map((d, dI) => (
                    <li key={dI} className="flex items-center space-x-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: Commercial Investment */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white space-y-4">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-blue-300">
            5. Commercial Investment Schedule
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3 rounded-xl bg-white/10 space-y-1">
              <span className="text-[10px] text-slate-300 uppercase font-bold">Annual Software License</span>
              <div className="font-bold text-slate-100">{proposal.investment.licenseFee}</div>
            </div>
            <div className="p-3 rounded-xl bg-white/10 space-y-1">
              <span className="text-[10px] text-slate-300 uppercase font-bold">Implementation & Setup</span>
              <div className="font-bold text-slate-100">{proposal.investment.implementationFee}</div>
            </div>
          </div>
          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-bold">
            <span className="text-amber-300">Total Year 1 Investment:</span>
            <span className="text-lg text-white font-black">{proposal.investment.totalYearOne}</span>
          </div>
        </div>

        {/* Section 6: Next Steps */}
        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider text-slate-700 dark:text-slate-300">
            6. Next Alignment Steps
          </h3>
          <div className="space-y-2 text-xs">
            {proposal.nextSteps.map((step, i) => (
              <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 font-semibold text-slate-800 dark:text-slate-200 flex items-center space-x-3">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
