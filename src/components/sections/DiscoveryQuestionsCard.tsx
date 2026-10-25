import React, { useState } from 'react';
import { DiscoveryQuestion } from '../../types';
import { HelpCircle, Copy, Check, MessageSquareCode, Ear } from 'lucide-react';
import { RegenerateButton } from '../RegenerateButton';
import { useToast } from '../../context/ToastContext';

interface DiscoveryQuestionsCardProps {
  data: DiscoveryQuestion[];
  companyName: string;
  onRegenerate?: () => void;
  isRegenerating?: boolean;
}

export const DiscoveryQuestionsCard: React.FC<DiscoveryQuestionsCardProps> = ({
  data,
  companyName,
  onRegenerate,
  isRegenerating = false,
}) => {
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopyAll = () => {
    const questionsText = data
      .map(
        (q) =>
          `Q${q.number} [${q.topicCategory}]: ${q.question}\nObjective: ${q.objective}\nListen For: ${q.whatToListenFor}\n`
      )
      .join('\n');

    navigator.clipboard.writeText(
      `Discovery Questions for ${companyName}:\n\n` + questionsText
    );
    setCopied(true);
    showToast('✓ Copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopySingle = (q: DiscoveryQuestion) => {
    const text = `Q${q.number} [${q.topicCategory}]: ${q.question}\nObjective: ${q.objective}\nListen For: ${q.whatToListenFor}`;
    navigator.clipboard.writeText(text);
    setCopiedIndex(q.number);
    showToast('✓ Copied to clipboard');
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'Current System':
        return 'bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800';
      case 'Approval Workflows':
        return 'bg-purple-50 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800';
      case 'Reporting Issues':
        return 'bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800';
      case 'Operational Bottlenecks':
        return 'bg-rose-50 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800';
      case 'Growth Plans':
        return 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
      case 'Software Costs':
        return 'bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800';
      default:
        return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm hover:shadow-md transition">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-slate-100 dark:border-slate-800 gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/80 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
              Section 6
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              10 Consultative Discovery Questions
            </h3>
          </div>
        </div>

        <div className="flex items-center space-x-2 self-start sm:self-auto">
          {onRegenerate && (
            <RegenerateButton
              onRegenerate={onRegenerate}
              isRegenerating={isRegenerating}
              label="Regenerate Discovery Questions"
            />
          )}

          {/* Copy Button */}
          <button
            onClick={handleCopyAll}
            className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold border border-slate-200 dark:border-slate-700 transition cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
            <span>{copied ? 'Copied All!' : 'Copy All'}</span>
          </button>
        </div>
      </div>

      <p className="text-sm text-slate-600 dark:text-slate-300 mb-6">
        Use these 10 targeted consultative questions during your meeting with {companyName} to uncover critical pain points, decision drivers, and software requirements:
      </p>

      <div className="space-y-4">
        {data.map((q) => (
          <div
            key={q.number}
            className="p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 transition"
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center space-x-3">
                <span className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  #{q.number}
                </span>
                <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold border ${getCategoryBadge(q.topicCategory)}`}>
                  {q.topicCategory}
                </span>
              </div>
              <button
                onClick={() => handleCopySingle(q)}
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition cursor-pointer"
                title="Copy question text"
              >
                {copiedIndex === q.number ? (
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>

            <h4 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white leading-snug mb-3 pl-10">
              "{q.question}"
            </h4>

            <div className="pl-10 grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 border-t border-slate-200/50 dark:border-slate-700/50 text-xs">
              <div className="flex items-start space-x-2 text-slate-600 dark:text-slate-300">
                <MessageSquareCode className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-700 dark:text-slate-200">Objective: </span>
                  {q.objective}
                </div>
              </div>
              <div className="flex items-start space-x-2 text-slate-600 dark:text-slate-300">
                <Ear className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-700 dark:text-slate-200">What to Listen For: </span>
                  {q.whatToListenFor}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
