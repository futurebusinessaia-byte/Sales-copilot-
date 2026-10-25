import React, { useState } from 'react';
import { OutreachAssets } from '../../types';
import { Mail, Linkedin, PhoneCall, Copy, Check, Send, TrendingUp, ShieldAlert, Briefcase } from 'lucide-react';
import { RegenerateButton } from '../RegenerateButton';
import { useToast } from '../../context/ToastContext';

interface OutreachAssetsCardProps {
  data: OutreachAssets;
  companyName: string;
  onRegenerateColdEmail?: () => void;
  onRegenerateLinkedIn?: () => void;
  onRegenerateColdCallScript?: () => void;
  isRegeneratingColdEmail?: boolean;
  isRegeneratingLinkedIn?: boolean;
  isRegeneratingColdCallScript?: boolean;
}

export const OutreachAssetsCard: React.FC<OutreachAssetsCardProps> = ({
  data,
  companyName,
  onRegenerateColdEmail,
  onRegenerateLinkedIn,
  onRegenerateColdCallScript,
  isRegeneratingColdEmail = false,
  isRegeneratingLinkedIn = false,
  isRegeneratingColdCallScript = false,
}) => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'email' | 'linkedin' | 'call'>('email');
  const [emailStyle, setEmailStyle] = useState<'roi' | 'pain' | 'executive'>('roi');
  const [linkedinStyle, setLinkedinStyle] = useState<'roi' | 'pain' | 'executive'>('roi');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string, customToast?: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    showToast(customToast || '✓ Copied to clipboard');
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Fallback variations if not present on data object
  const emailVariations = data.emailVariations || {
    roi: {
      subject: `Quantifiable ROI & $184k Annual Labor Efficiency Gains at ${companyName}`,
      body: `Hi [Decision Maker Name],\n\nManaging a workforce at ${companyName} often results in hidden operational leakage in manual attendance reconciliation and project timesheet processing.\n\nWe help enterprise leaders capture measurable financial returns through AI workforce automation:\n• $184,000+ estimated annual net operational savings\n• 80% reduction in month-end attendance & payroll closure cycles\n• 3.2-month average payback period with 100% automated policy compliance\n• 12-15% increase in billable project resource utilization\n\nWould you be open to a 10-minute ROI review call next Tuesday at 10:00 AM to go over the customized financial model for ${companyName}?\n\nBest regards,\n\n[Your Name]\nEnterprise Sales Representative\nAI Revenue & Workforce Copilot`
    },
    painPoint: {
      subject: `Eliminating manual timesheet friction & payroll bottlenecks at ${companyName}`,
      body: `Hi [Decision Maker Name],\n\nTracking shift attendance, overtime approvals, and project timesheets can be a major operational headache for ${companyName}'s management team.\n\nDisparate time logs and delayed manager sign-offs frequently cause:\n• 35+ hours of repetitive monthly admin grunt work per pay cycle\n• Friction and dispute backlogs in payroll reconciliation\n• Delayed client invoicing due to missing project timesheet entries\n\nWe solve these exact pain points by providing a zero-friction mobile check-in app paired with automated approval workflows while keeping your current system of record.\n\nAre you open to a brief 10-minute chat this Thursday to see how we can remove this admin burden from your team?\n\nBest regards,\n\n[Your Name]\nEnterprise Sales Representative\nAI Revenue & Workforce Copilot`
    },
    executive: {
      subject: `Strategic Workforce Velocity & Operational Governance for ${companyName}`,
      body: `Hi [Decision Maker Name],\n\nAs ${companyName} scales its market position, maintaining operational agility requires real-time workforce visibility and automated governance.\n\nWe partner with C-suite executives (COO, CFO, CHRO) to modernize operational execution:\n• Executive Command Dashboards providing real-time resource utilization metrics\n• Enterprise-grade policy guardrails ensuring 100% regional labor compliance\n• Rapid 3-week deployment methodology with zero business disruption\n\nI would welcome the opportunity to host a 15-minute executive discovery briefing with you to discuss accelerating operational velocity at ${companyName}.\n\nBest regards,\n\n[Your Name]\nEnterprise Sales Representative\nAI Revenue & Workforce Copilot`
    }
  };

  const linkedInVariations = data.linkedInVariations || {
    roi: {
      body: `Hi [First Name] — congratulations on ${companyName}'s growth! Enterprise teams typically lose $184k+ annually in manual attendance and timesheet friction. Our AI platform delivers an 80% reduction in admin hours with a 3.2-month payback period. Open to a quick 5-minute chat on the numbers?`
    },
    painPoint: {
      body: `Hi [First Name] — quick question regarding workforce ops at ${companyName}: Are manual attendance reconciliations, delayed timesheets, or leave approval bottlenecks creating admin friction across your teams? We help leaders eliminate 35+ hours of weekly admin grunt work. Open to a brief touchpoint?`
    },
    executive: {
      body: `Hi [First Name] — impressed by ${companyName}'s expansion. As you scale your workforce, we provide executive leaders with real-time labor analytics and automated workflow governance—without replacing your core system of record. Open to connecting?`
    }
  };

  const currentEmail = emailVariations[emailStyle === 'pain' ? 'painPoint' : emailStyle];
  const currentLinkedIn = linkedInVariations[linkedinStyle === 'pain' ? 'painPoint' : linkedinStyle];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm hover:shadow-md transition">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-slate-100 dark:border-slate-800 gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
            <Send className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Sections 8, 9 & 10
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Personalized Outreach Playbook
            </h3>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200/60 dark:border-slate-700">
          <button
            onClick={() => setActiveTab('email')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center space-x-1.5 cursor-pointer ${
              activeTab === 'email'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Cold Email (3 Styles)</span>
          </button>
          <button
            onClick={() => setActiveTab('linkedin')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center space-x-1.5 cursor-pointer ${
              activeTab === 'linkedin'
                ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Linkedin className="w-3.5 h-3.5" />
            <span>LinkedIn (3 Styles)</span>
          </button>
          <button
            onClick={() => setActiveTab('call')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center space-x-1.5 cursor-pointer ${
              activeTab === 'call'
                ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>30s Script</span>
          </button>
        </div>
      </div>

      {/* Tab 8: Cold Email */}
      {activeTab === 'email' && (
        <div className="space-y-5">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-blue-500" />
              Section 8: Personalized Cold Email
            </span>
            <div className="flex items-center space-x-2">
              {onRegenerateColdEmail && (
                <RegenerateButton
                  onRegenerate={onRegenerateColdEmail}
                  isRegenerating={isRegeneratingColdEmail}
                  label="Regenerate Email"
                />
              )}
            </div>
          </div>

          {/* 3 Style Sub-Tabs */}
          <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200/60 dark:border-slate-700">
            <button
              onClick={() => setEmailStyle('roi')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition flex items-center justify-center space-x-1.5 cursor-pointer ${
                emailStyle === 'roi'
                  ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>1. ROI Focused</span>
            </button>

            <button
              onClick={() => setEmailStyle('pain')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition flex items-center justify-center space-x-1.5 cursor-pointer ${
                emailStyle === 'pain'
                  ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>2. Pain Point Focused</span>
            </button>

            <button
              onClick={() => setEmailStyle('executive')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition flex items-center justify-center space-x-1.5 cursor-pointer ${
                emailStyle === 'executive'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>3. Executive Focused</span>
            </button>
          </div>

          {/* Content Card */}
          <div className="bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/80 dark:border-slate-800 p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400">Subject Line:</span>
                <div className="font-bold font-sans text-xs sm:text-sm text-slate-900 dark:text-white mt-0.5">
                  {currentEmail.subject}
                </div>
              </div>

              <button
                onClick={() =>
                  handleCopy(
                    `Subject: ${currentEmail.subject}\n\n${currentEmail.body}`,
                    `email-card-${emailStyle}`
                  )
                }
                className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer shrink-0 ml-2"
              >
                {copiedKey === `email-card-${emailStyle}` ? (
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>
                  {copiedKey === `email-card-${emailStyle}`
                    ? 'Copied Email!'
                    : `Copy ${emailStyle === 'roi' ? 'ROI' : emailStyle === 'pain' ? 'Pain Point' : 'Executive'} Email`}
                </span>
              </button>
            </div>

            <div className="whitespace-pre-wrap leading-relaxed font-sans text-xs sm:text-sm text-slate-800 dark:text-slate-200">
              {currentEmail.body}
            </div>
          </div>
        </div>
      )}

      {/* Tab 9: LinkedIn Message */}
      {activeTab === 'linkedin' && (
        <div className="space-y-5">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Linkedin className="w-4 h-4 text-sky-500" />
              Section 9: LinkedIn Connection & Direct Outreach Message
            </span>
            <div className="flex items-center space-x-2">
              {onRegenerateLinkedIn && (
                <RegenerateButton
                  onRegenerate={onRegenerateLinkedIn}
                  isRegenerating={isRegeneratingLinkedIn}
                  label="Regenerate LinkedIn"
                />
              )}
            </div>
          </div>

          {/* 3 Style Sub-Tabs */}
          <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200/60 dark:border-slate-700">
            <button
              onClick={() => setLinkedinStyle('roi')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition flex items-center justify-center space-x-1.5 cursor-pointer ${
                linkedinStyle === 'roi'
                  ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>1. ROI Focused</span>
            </button>

            <button
              onClick={() => setLinkedinStyle('pain')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition flex items-center justify-center space-x-1.5 cursor-pointer ${
                linkedinStyle === 'pain'
                  ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>2. Pain Point Focused</span>
            </button>

            <button
              onClick={() => setLinkedinStyle('executive')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition flex items-center justify-center space-x-1.5 cursor-pointer ${
                linkedinStyle === 'executive'
                  ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>3. Executive Focused</span>
            </button>
          </div>

          {/* Content Card */}
          <div className="bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/80 dark:border-slate-800 p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
              <span className="text-[10px] font-bold uppercase text-slate-400">
                LinkedIn Connection Message Style:
              </span>

              <button
                onClick={() => handleCopy(currentLinkedIn.body, `linkedin-card-${linkedinStyle}`)}
                className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer shrink-0"
              >
                {copiedKey === `linkedin-card-${linkedinStyle}` ? (
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>
                  {copiedKey === `linkedin-card-${linkedinStyle}`
                    ? 'Copied Message!'
                    : `Copy ${linkedinStyle === 'roi' ? 'ROI' : linkedinStyle === 'pain' ? 'Pain Point' : 'Executive'} Message`}
                </span>
              </button>
            </div>

            <div className="whitespace-pre-wrap leading-relaxed font-sans text-xs sm:text-sm text-slate-800 dark:text-slate-200">
              {currentLinkedIn.body}
            </div>
            <div className="pt-2 text-[11px] text-slate-500 dark:text-slate-400 italic">
              Tip: Keep LinkedIn connection notes under 300 characters for optimal acceptance rates.
            </div>
          </div>
        </div>
      )}

      {/* Tab 10: Cold Call Script */}
      {activeTab === 'call' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <PhoneCall className="w-4 h-4 text-emerald-500" />
              Section 10: 30-Second Cold Call Opening Script
            </span>
            <div className="flex items-center space-x-2">
              {onRegenerateColdCallScript && (
                <RegenerateButton
                  onRegenerate={onRegenerateColdCallScript}
                  isRegenerating={isRegeneratingColdCallScript}
                  label="Regenerate Call Script"
                />
              )}
              <button
                onClick={() => handleCopy(data.coldCallScript.fullScriptText, 'call-script')}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-semibold hover:bg-blue-100 transition cursor-pointer"
              >
                {copiedKey === 'call-script' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>{copiedKey === 'call-script' ? 'Copied Script!' : 'Copy Script'}</span>
              </button>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/80 dark:border-slate-800 p-5 space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase text-slate-400">1. Pattern Interrupt Hook:</span>
              <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200/60 dark:border-slate-800">
                "{data.coldCallScript.hook}"
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase text-slate-400">2. Value Proposition (15 seconds):</span>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200/60 dark:border-slate-800 leading-relaxed">
                "{data.coldCallScript.valueProposition}"
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase text-slate-400">3. Discovery Question Transition:</span>
              <p className="text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/40 p-3 rounded-lg border border-blue-200/60 dark:border-blue-900/60">
                "{data.coldCallScript.discoveryTransition}"
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
