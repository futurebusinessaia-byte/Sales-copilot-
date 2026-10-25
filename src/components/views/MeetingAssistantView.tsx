import React, { useState } from 'react';
import {
  Mic,
  Volume2,
  VolumeX,
  Zap,
  CheckCircle2,
  MessageSquare,
  Search,
  Sparkles
} from 'lucide-react';
import { SalesReport } from '../../types';

interface MeetingAssistantViewProps {
  report: SalesReport;
}

export const MeetingAssistantView: React.FC<MeetingAssistantViewProps> = ({ report }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [triggerQuery, setTriggerQuery] = useState('');

  const assistant = report.meetingAssistant || {
    voicePrepScript: `Welcome to your Meeting Preparation for ${report.input.companyName}. Today you are meeting with key stakeholders in ${report.input.industry}. Focus on how our platform eliminates manual attendance reconciliation, saving over 14 hours per week for middle managers.`,
    keyTalkingPoints: [
      `Emphasize 80% reduction in reconciliation cycle time`,
      `Showcase consumer-grade mobile UX for non-desk and field workers`,
      `Present 2.4-month payback period backed by CFO ROI model`
    ],
    liveObjectionCoach: [
      { triggerWord: 'Budget', instantRebuttal: 'Reframe software cost against current $184,000 annual waste in manual reconciliation hours.' },
      { triggerWord: 'SAP', instantRebuttal: 'Explain that we act as the high-adoption mobile execution layer while syncing bi-directionally with SAP.' },
      { triggerWord: 'ERP', instantRebuttal: 'Preserve your core ERP as financial master, while upgrading front-line mobile check-ins.' },
      { triggerWord: 'Timing', instantRebuttal: 'Highlight that waiting 3 months wastes an additional 120+ manager hours in manual work.' },
      { triggerWord: 'Security', instantRebuttal: 'We maintain SOC2 Type II compliance with bank-grade AES-256 data encryption.' }
    ]
  };

  const handleSpeechToggle = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech Synthesis API is not supported in this browser environment.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(assistant.voicePrepScript);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  const filteredObjections = assistant.liveObjectionCoach.filter((item: any) =>
    item.triggerWord.toLowerCase().includes(triggerQuery.toLowerCase()) ||
    item.instantRebuttal.toLowerCase().includes(triggerQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <span className="px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase">
            Live Copilot Engine
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          AI Meeting Assistant & Voice Prep Script
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Audio prep script, core talking points, and real-time live objection lookup coach for {report.input.companyName}.
        </p>
      </div>

      {/* Voice Prep Script Box */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-900 text-white shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center space-x-2">
            <Mic className="w-5 h-5 text-blue-400" />
            <h3 className="text-sm font-bold">Audio Meeting Briefing Script</h3>
          </div>
          <button
            onClick={handleSpeechToggle}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-2 ${
              isSpeaking
                ? 'bg-rose-600 text-white animate-pulse'
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-md'
            }`}
          >
            {isSpeaking ? (
              <>
                <VolumeX className="w-4 h-4" />
                <span>Stop Audio Prep</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4" />
                <span>Listen to Voice Brief</span>
              </>
            )}
          </button>
        </div>

        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium bg-white/10 p-4 rounded-xl border border-white/10">
          "{assistant.voicePrepScript}"
        </p>
      </div>

      {/* Key Talking Points */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Core Executive Talking Points</span>
        </h3>

        <div className="space-y-2 text-xs">
          {assistant.keyTalkingPoints.map((point: string, i: number) => (
            <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 font-semibold text-slate-800 dark:text-slate-200 flex items-center space-x-2">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                {i + 1}
              </span>
              <span>{point}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Live Objection Trigger Lookup */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <Zap className="w-4 h-4 text-amber-500" />
            <span>Live Meeting Objection Trigger Coach</span>
          </h3>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Filter trigger (e.g. Budget, SAP)..."
              value={triggerQuery}
              onChange={(e) => setTriggerQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium focus:outline-none dark:text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredObjections.map((item: any, idx: number) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 text-[10px] font-extrabold uppercase">
                  Trigger Word: "{item.triggerWord}"
                </span>
              </div>
              <p className="text-xs text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                <strong className="text-blue-600 dark:text-blue-400">Instant Rebuttal:</strong> {item.instantRebuttal}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
