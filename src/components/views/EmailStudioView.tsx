import React, { useState } from 'react';
import {
  Mail,
  Linkedin,
  Copy,
  Check,
  TrendingUp,
  ShieldAlert,
  Briefcase,
  Sparkles,
  Send,
  Layers,
  FileText
} from 'lucide-react';
import { SalesReport } from '../../types';
import { useToast } from '../../context/ToastContext';

interface EmailStudioViewProps {
  report: SalesReport;
}

export const EmailStudioView: React.FC<EmailStudioViewProps> = ({ report }) => {
  const { showToast } = useToast();
  const [channelTab, setChannelTab] = useState<'email' | 'linkedin' | 'sequence'>('email');
  const [emailStyle, setEmailStyle] = useState<'roi' | 'pain' | 'executive'>('roi');
  const [linkedinStyle, setLinkedinStyle] = useState<'roi' | 'pain' | 'executive'>('roi');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const company = report.input.companyName;
  const industry = report.input.industry;
  const country = report.input.country;
  const empRange = report.input.employeeRange;
  const currentHr = report.input.currentHrSoftware || 'legacy systems';

  // Fallbacks for Email Variations if not present on report
  const emailVariations = report.outreachAssets?.emailVariations || {
    roi: {
      subject: `Quantifiable ROI & $184k Annual Labor Efficiency Gains at ${company}`,
      body: `Hi [Decision Maker Name],\n\nOrganizations in ${industry} managing ${empRange} across ${country} often experience hidden operational leakage in manual attendance reconciliation and project timesheet processing using ${currentHr}.\n\nWe help enterprise leaders capture measurable financial returns through AI workforce automation:\n• $184,000+ estimated annual net operational savings\n• 80% reduction in month-end attendance & payroll closure cycles\n• 3.2-month average payback period with 100% automated policy compliance\n• 12-15% increase in billable project resource utilization\n\nWould you be open to a 10-minute ROI review call next Tuesday at 10:00 AM to go over the customized financial model for ${company}?\n\nBest regards,\n\n[Your Name]\nEnterprise Sales Representative\nAI Revenue & Workforce Copilot`
    },
    painPoint: {
      subject: `Eliminating manual timesheet friction & payroll bottlenecks at ${company}`,
      body: `Hi [Decision Maker Name],\n\nTracking shift attendance, overtime approvals, and project timesheets across ${country} using ${currentHr} can be a major operational headache for ${company}'s management team.\n\nDisparate time logs and delayed manager sign-offs frequently cause:\n• 35+ hours of repetitive monthly admin grunt work per pay cycle\n• Friction and dispute backlogs in payroll reconciliation\n• Delayed client invoicing due to missing project timesheet entries\n• Lack of real-time visibility for team leads when assigning shifts\n\nWe solve these exact pain points by providing a zero-friction mobile check-in app paired with automated approval workflows. We keep ${currentHr} as your system of record while removing 80% of administrative overhead.\n\nAre you open to a brief 10-minute chat this Thursday to see how we can remove this admin burden from your team?\n\nBest regards,\n\n[Your Name]\nEnterprise Sales Representative\nAI Revenue & Workforce Copilot`
    },
    executive: {
      subject: `Strategic Workforce Velocity & Operational Governance for ${company}`,
      body: `Hi [Decision Maker Name],\n\nAs ${company} scales its leadership position in ${industry} across ${country}, maintaining operational agility across ${empRange} requires real-time workforce visibility and automated governance.\n\nWe partner with C-suite executives (COO, CFO, CHRO) to modernize operational execution alongside core enterprise platforms like ${currentHr}:\n• Executive Command Dashboards providing real-time resource utilization and capacity metrics\n• Enterprise-grade policy guardrails ensuring 100% regional labor compliance\n• Rapid 3-week deployment methodology with zero business disruption\n\nI would welcome the opportunity to host a 15-minute executive discovery briefing with you to discuss how we help peer organizations accelerate operational velocity at ${company}.\n\nBest regards,\n\n[Your Name]\nEnterprise Sales Representative\nAI Revenue & Workforce Copilot`
    }
  };

  // Fallbacks for LinkedIn Variations if not present on report
  const linkedInVariations = report.outreachAssets?.linkedInVariations || {
    roi: {
      body: `Hi [First Name] — congratulations on ${company}'s growth in ${industry}! Enterprise teams with ${empRange} typically lose $184k+ annually in manual attendance and timesheet friction. Our AI platform delivers an 80% reduction in admin hours with a 3.2-month payback period alongside ${currentHr}. Open to a quick 5-minute chat on the numbers?`
    },
    painPoint: {
      body: `Hi [First Name] — quick question regarding workforce ops at ${company}: Are manual attendance reconciliations, delayed timesheets, or leave approval bottlenecks in ${currentHr} creating admin friction across your teams in ${country}? We help leaders eliminate 35+ hours of weekly admin grunt work with a mobile check-in app. Open to a brief touchpoint?`
    },
    executive: {
      body: `Hi [First Name] — impressed by ${company}'s expansion in ${industry}. As you scale your workforce across ${country}, we provide executive leaders with real-time labor analytics and automated workflow governance—without replacing your system of record (${currentHr}). Open to connecting?`
    }
  };

  const handleCopy = (text: string, key: string, customToast?: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    showToast(customToast || '✓ Copied to clipboard');
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const emailStyleDetails = [
    {
      id: 'roi' as const,
      label: '1. ROI Focused',
      icon: TrendingUp,
      color: 'emerald',
      badge: 'Data & Financial Impact',
      data: emailVariations.roi,
      description: 'Positions financial metrics, $184k+ annual net savings, and a 3.2-month payback period to appeal directly to Economic Buyers (CFO/Finance).'
    },
    {
      id: 'pain' as const,
      label: '2. Pain Point Focused',
      icon: ShieldAlert,
      color: 'amber',
      badge: 'Operational Friction',
      data: emailVariations.painPoint,
      description: 'Addresses manual timesheet bottlenecks, spreadsheet reconciliation headaches in current HR tools, and manager admin fatigue.'
    },
    {
      id: 'executive' as const,
      label: '3. Executive Focused',
      icon: Briefcase,
      color: 'blue',
      badge: 'Strategic C-Suite',
      data: emailVariations.executive,
      description: 'High-level concise tone highlighting operational velocity, real-time command dashboards, enterprise governance, and zero business disruption.'
    }
  ];

  const linkedinStyleDetails = [
    {
      id: 'roi' as const,
      label: '1. ROI Focused',
      icon: TrendingUp,
      color: 'emerald',
      badge: '3.2-Mo Payback Angle',
      data: linkedInVariations.roi,
      description: 'Short 2-sentence hook highlighting $184k+ bottom-line impact and quick ROI.'
    },
    {
      id: 'pain' as const,
      label: '2. Pain Point Focused',
      icon: ShieldAlert,
      color: 'amber',
      badge: 'Admin Bottleneck Angle',
      data: linkedInVariations.painPoint,
      description: 'Direct question targeting manual attendance checks and delayed timesheet approvals.'
    },
    {
      id: 'executive' as const,
      label: '3. Executive Focused',
      icon: Briefcase,
      color: 'blue',
      badge: 'C-Suite Governance Angle',
      data: linkedInVariations.executive,
      description: 'Strategic connection note emphasizing real-time workforce visibility and governance.'
    }
  ];

  // Additional Email Sequence Templates
  const sequenceTemplates = [
    {
      key: 'followup',
      label: 'Follow-Up Email (Day 3)',
      data: {
        subject: `Quick follow-up regarding ${company}'s operational roadmap`,
        body: `Hi [First Name],\n\nFollowing up on my previous message regarding ${company}. I wanted to share a 1-page ROI brief showing how enterprise peers in ${industry} cut manual reconciliation cycles by 80% with our AI Revenue Command Center.\n\nWould 10 minutes this Thursday work for a quick review?\n\nBest,\n[Your Name]`
      }
    },
    {
      key: 'confirm',
      label: 'Meeting Confirmation',
      data: {
        subject: `Confirmed: Discovery Session — ${company} x AI Revenue Command Center`,
        body: `Hi [First Name],\n\nLooking forward to our discovery call on [Date & Time]. We will review ${company}'s current operational setup with ${currentHr} and explore automated workflow strategies.\n\nCalendar invite attached.\n\nBest regards,\n[Your Name]`
      }
    },
    {
      key: 'proposal',
      label: 'Proposal Review',
      data: {
        subject: `Executive Proposal Review for ${company}`,
        body: `Hi [First Name],\n\nAttached is the customized executive proposal for ${company}, detailing our deployment timeline, $184,000 ROI model, and 3-week onboarding plan.\n\nLet me know if you have any questions before our alignment call tomorrow.\n\nBest,\n[Your Name]`
      }
    },
    {
      key: 'upsell',
      label: 'Expansion & Upsell',
      data: {
        subject: `Unlocking Advanced AI Revenue Intelligence for ${company}`,
        body: `Hi [First Name],\n\nGiven the successful adoption of our core workforce platform at ${company}, we would love to grant your executive team early access to our new AI Sales Coach & Proposal Generator module.\n\nWould you be open to a 10-minute preview next week?\n\nBest,\n[Your Name]`
      }
    }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wide flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Outreach Studio
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            AI Outreach Copywriter & Multi-Style Generator
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
            Multi-variate personalized emails and LinkedIn messages tailored for stakeholders at{' '}
            <span className="font-semibold text-slate-900 dark:text-white">{company}</span>.
          </p>
        </div>

        {/* Channel Switcher */}
        <div className="flex p-1 bg-slate-200/80 dark:bg-slate-800/90 rounded-2xl border border-slate-300/60 dark:border-slate-700 self-start md:self-auto">
          <button
            onClick={() => setChannelTab('email')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 cursor-pointer ${
              channelTab === 'email'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Emails (3 Styles)</span>
          </button>

          <button
            onClick={() => setChannelTab('linkedin')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 cursor-pointer ${
              channelTab === 'linkedin'
                ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Linkedin className="w-4 h-4" />
            <span>LinkedIn (3 Styles)</span>
          </button>

          <button
            onClick={() => setChannelTab('sequence')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 cursor-pointer ${
              channelTab === 'sequence'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Full Sequence</span>
          </button>
        </div>
      </div>

      {/* CHANNEL 1: COLD EMAIL VARIATIONS */}
      {channelTab === 'email' && (
        <div className="space-y-6">
          {/* Style Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {emailStyleDetails.map((style) => {
              const Icon = style.icon;
              const isSelected = emailStyle === style.id;
              return (
                <button
                  key={style.id}
                  onClick={() => setEmailStyle(style.id)}
                  className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-white dark:bg-slate-900 border-blue-500 dark:border-blue-500 shadow-md ring-2 ring-blue-500/20'
                      : 'bg-white/60 dark:bg-slate-900/60 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                      <Icon className="w-4 h-4 text-blue-500" />
                      {style.label}
                    </span>
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-900">
                      {style.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                    {style.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Active Email Style Display */}
          {(() => {
            const activeStyle = emailStyleDetails.find((s) => s.id === emailStyle)!;
            const fullContent = `Subject: ${activeStyle.data.subject}\n\n${activeStyle.data.body}`;
            const isCopiedFull = copiedKey === `email-${activeStyle.id}-full`;
            const isCopiedSubj = copiedKey === `email-${activeStyle.id}-subj`;
            const isCopiedBody = copiedKey === `email-${activeStyle.id}-body`;

            return (
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                        {activeStyle.badge}
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        {activeStyle.label} Cold Email
                      </h3>
                    </div>
                  </div>

                  {/* Copy Buttons */}
                  <div className="flex items-center space-x-2 flex-wrap gap-y-2">
                    <button
                      onClick={() => handleCopy(activeStyle.data.subject, `email-${activeStyle.id}-subj`)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition flex items-center space-x-1.5 cursor-pointer"
                    >
                      {isCopiedSubj ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{isCopiedSubj ? 'Subject Copied!' : 'Copy Subject'}</span>
                    </button>

                    <button
                      onClick={() => handleCopy(activeStyle.data.body, `email-${activeStyle.id}-body`)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition flex items-center space-x-1.5 cursor-pointer"
                    >
                      {isCopiedBody ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{isCopiedBody ? 'Body Copied!' : 'Copy Body'}</span>
                    </button>

                    <button
                      onClick={() => handleCopy(fullContent, `email-${activeStyle.id}-full`)}
                      className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition flex items-center space-x-1.5 cursor-pointer"
                    >
                      {isCopiedFull ? <Check className="w-3.5 h-3.5" /> : <Send className="w-3.5 h-3.5" />}
                      <span>{isCopiedFull ? 'Copied Full Email!' : 'Copy Entire Email'}</span>
                    </button>
                  </div>
                </div>

                {/* Email Subject */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Subject Line
                  </span>
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 font-bold text-xs sm:text-sm text-slate-900 dark:text-white border border-slate-200/60 dark:border-slate-700">
                    {activeStyle.data.subject}
                  </div>
                </div>

                {/* Email Body */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Email Body
                  </span>
                  <div className="p-5 rounded-xl bg-slate-50/60 dark:bg-slate-800/40 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-sans whitespace-pre-wrap leading-relaxed border border-slate-200/60 dark:border-slate-800">
                    {activeStyle.data.body}
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Grid View comparing all 3 styles at a glance */}
          <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-blue-500" />
              <span>All 3 Email Style Variations at a Glance</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {emailStyleDetails.map((style) => {
                const fullContent = `Subject: ${style.data.subject}\n\n${style.data.body}`;
                const isCopied = copiedKey === `email-grid-${style.id}`;

                return (
                  <div
                    key={style.id}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                          <style.icon className="w-3.5 h-3.5" />
                          {style.label}
                        </span>
                        <button
                          onClick={() => handleCopy(fullContent, `email-grid-${style.id}`)}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-semibold transition flex items-center space-x-1 cursor-pointer"
                        >
                          {isCopied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                          <span>{isCopied ? 'Copied!' : 'Copy'}</span>
                        </button>
                      </div>

                      <div className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2">
                        {style.data.subject}
                      </div>

                      <div className="text-[11px] text-slate-600 dark:text-slate-300 whitespace-pre-wrap line-clamp-6 leading-relaxed font-sans bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                        {style.data.body}
                      </div>
                    </div>

                    <button
                      onClick={() => setEmailStyle(style.id)}
                      className="w-full py-1.5 text-center text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                    >
                      Focus View & Full Text →
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* CHANNEL 2: LINKEDIN MESSAGE VARIATIONS */}
      {channelTab === 'linkedin' && (
        <div className="space-y-6">
          {/* Style Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {linkedinStyleDetails.map((style) => {
              const Icon = style.icon;
              const isSelected = linkedinStyle === style.id;
              return (
                <button
                  key={style.id}
                  onClick={() => setLinkedinStyle(style.id)}
                  className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-white dark:bg-slate-900 border-sky-500 dark:border-sky-500 shadow-md ring-2 ring-sky-500/20'
                      : 'bg-white/60 dark:bg-slate-900/60 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                      <Icon className="w-4 h-4 text-sky-500" />
                      {style.label}
                    </span>
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400 border border-sky-200/60 dark:border-sky-900">
                      {style.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                    {style.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Active LinkedIn Style Display */}
          {(() => {
            const activeStyle = linkedinStyleDetails.find((s) => s.id === linkedinStyle)!;
            const isCopied = copiedKey === `linkedin-${activeStyle.id}`;

            return (
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/80 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold">
                      <Linkedin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                        {activeStyle.badge}
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        {activeStyle.label} LinkedIn Direct Outreach
                      </h3>
                    </div>
                  </div>

                  {/* Copy Button */}
                  <button
                    onClick={() => handleCopy(activeStyle.data.body, `linkedin-${activeStyle.id}`)}
                    className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-sm transition flex items-center space-x-2 cursor-pointer"
                  >
                    {isCopied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                    <span>{isCopied ? 'Copied LinkedIn Message!' : 'Copy LinkedIn Message'}</span>
                  </button>
                </div>

                {/* Message Body */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    LinkedIn Message Text
                  </span>
                  <div className="p-5 rounded-xl bg-slate-50/60 dark:bg-slate-800/40 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-sans whitespace-pre-wrap leading-relaxed border border-slate-200/60 dark:border-slate-800">
                    {activeStyle.data.body}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 italic pt-1">
                    Tip: LinkedIn connection notes perform best under 300 characters. Keep outreach direct and personalized.
                  </p>
                </div>
              </div>
            );
          })()}

          {/* Grid View comparing all 3 LinkedIn Styles */}
          <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4 flex items-center gap-1.5">
              <Linkedin className="w-4 h-4 text-sky-500" />
              <span>All 3 LinkedIn Message Styles at a Glance</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {linkedinStyleDetails.map((style) => {
                const isCopied = copiedKey === `linkedin-grid-${style.id}`;

                return (
                  <div
                    key={style.id}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                        <span className="text-xs font-bold text-sky-600 dark:text-sky-400 flex items-center gap-1">
                          <style.icon className="w-3.5 h-3.5" />
                          {style.label}
                        </span>
                        <button
                          onClick={() => handleCopy(style.data.body, `linkedin-grid-${style.id}`)}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-semibold transition flex items-center space-x-1 cursor-pointer"
                        >
                          {isCopied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                          <span>{isCopied ? 'Copied!' : 'Copy'}</span>
                        </button>
                      </div>

                      <div className="text-xs text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed font-sans bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                        {style.data.body}
                      </div>
                    </div>

                    <button
                      onClick={() => setLinkedinStyle(style.id)}
                      className="w-full py-1 text-center text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline cursor-pointer"
                    >
                      Focus View →
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* CHANNEL 3: FULL EMAIL SEQUENCE & TEMPLATES */}
      {channelTab === 'sequence' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-500" />
              <span>Full Sales Cadence & Email Sequence</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-6">
              Complete automated email sequence for multi-touch deal progression at {company}.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sequenceTemplates.map((tpl) => {
                const isCopied = copiedKey === `seq-${tpl.key}`;
                const fullContent = `Subject: ${tpl.data.subject}\n\n${tpl.data.body}`;

                return (
                  <div
                    key={tpl.key}
                    className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                        <span className="text-xs font-bold uppercase text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5" />
                          {tpl.label}
                        </span>
                        <button
                          onClick={() => handleCopy(fullContent, `seq-${tpl.key}`)}
                          className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold shadow-2xs hover:bg-slate-100 transition cursor-pointer flex items-center space-x-1"
                        >
                          {isCopied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                          <span>{isCopied ? 'Copied!' : 'Copy'}</span>
                        </button>
                      </div>

                      <div className="text-xs font-bold text-slate-900 dark:text-white">
                        {tpl.data.subject}
                      </div>

                      <div className="text-xs text-slate-700 dark:text-slate-300 font-sans whitespace-pre-wrap leading-relaxed">
                        {tpl.data.body}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
