import React, { useState, useEffect } from 'react';
import { X, Lock, CheckCircle2, Building, Send, ShieldCheck, MessageSquare, HeartHandshake, Clock } from 'lucide-react';
import { EvaluationSession } from '../types';

interface EnterpriseUpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureName?: string;
  isLimitReached?: boolean;
  session?: EvaluationSession;
  onSessionUpdate?: (session: EvaluationSession) => void;
  initialView?: 'main' | 'feedback' | 'extend';
}

export const EnterpriseUpgradeModal: React.FC<EnterpriseUpgradeModalProps> = ({
  isOpen,
  onClose,
  featureName,
  isLimitReached = false,
  session,
  onSessionUpdate,
  initialView = 'main',
}) => {
  const [view, setView] = useState<'main' | 'feedback' | 'extend' | 'submitted'>('main');

  // Form states for Feedback
  const [company, setCompany] = useState('');
  const [mostValuable, setMostValuable] = useState('');
  const [improvements, setImprovements] = useState('');
  const [teamUsefulness, setTeamUsefulness] = useState('Yes, highly useful');
  const [missingFeatures, setMissingFeatures] = useState('');
  const [feedbackEmail, setFeedbackEmail] = useState('');

  // Form states for Request Extended Evaluation
  const [extendName, setExtendName] = useState(session?.userName && session.userName !== 'Guest Evaluator' ? session.userName : '');
  const [extendCompany, setExtendCompany] = useState('');
  const [extendEmail, setExtendEmail] = useState(session?.userEmail || '');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successText, setSuccessText] = useState('');

  // Reset view when modal opens
  useEffect(() => {
    if (isOpen) {
      setView(initialView || 'main');
    }
  }, [isOpen, isLimitReached, initialView]);

  if (!isOpen) return null;

  const handleContactClick = () => {
    window.location.href = 'mailto:infraagentai@gmail.com?subject=AI%20Enterprise%20Sales%20Copilot%20Enquiry';
  };

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          evalId: session?.evalId,
          email: feedbackEmail,
          company,
          mostValuable,
          improvements,
          teamUsefulness,
          missingFeatures,
        }),
      });

      const data = await res.json();
      if (res.ok && data.evalSession && onSessionUpdate) {
        onSessionUpdate(data.evalSession);
      }

      setSuccessText(
        `Thank you for your feedback.\n\nYour feedback helps improve AI Enterprise Sales Copilot.\n\nI genuinely appreciate you taking the time to share your thoughts.`
      );
      setView('submitted');
    } catch (err) {
      console.error('Feedback submit error:', err);
      setSuccessText(
        `Thank you for your feedback.\n\nYour feedback helps improve AI Enterprise Sales Copilot.\n\nI genuinely appreciate you taking the time to share your thoughts.`
      );
      setView('submitted');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleExtendSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!extendEmail.trim()) return;
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/eval/extend-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          evalId: session?.evalId,
          name: extendName,
          company: extendCompany,
          email: extendEmail,
        }),
      });

      const data = await res.json();
      setSuccessText(
        data.message ||
          'Your request for an extended evaluation has been submitted. We will review your request shortly.'
      );
      setView('submitted');
    } catch (err) {
      console.error('Extend request submit error:', err);
      setSuccessText(
        'Your request for an extended evaluation has been submitted. We will review your request shortly.'
      );
      setView('submitted');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 relative overflow-hidden transition-colors max-h-[92vh] overflow-y-auto flex flex-col justify-between">
        
        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          {/* VIEW: MAIN SCREEN */}
          {view === 'main' && (
            <>
              {isLimitReached ? (
                /* ---------------- EVALUATION COMPLETE SCREEN ---------------- */
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800/80 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-sm flex-shrink-0">
                      <HeartHandshake className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                        Public Evaluation Limit Reached
                      </span>
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
                        Thank you for exploring AI Enterprise Sales Copilot.
                      </h2>
                    </div>
                  </div>

                  <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800">
                    <p>
                      I hope this demonstration showed how AI can reduce manual research, improve discovery preparation, and help enterprise sales teams work more efficiently.
                    </p>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      This evaluation has reached its usage limit.
                    </p>
                    <p>
                      Your feedback would genuinely help improve the product.
                    </p>
                    <div className="pt-2">
                      <p className="font-bold text-slate-900 dark:text-white mb-2">Please let me know:</p>
                      <ul className="space-y-1.5 pl-2 font-medium text-slate-800 dark:text-slate-200">
                        <li className="flex items-center space-x-2">
                          <span className="text-blue-600 font-bold">•</span>
                          <span>Which feature was most valuable?</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <span className="text-blue-600 font-bold">•</span>
                          <span>What would you improve?</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <span className="text-blue-600 font-bold">•</span>
                          <span>Would this be useful for your team?</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <span className="text-blue-600 font-bold">•</span>
                          <span>Is there anything missing?</span>
                        </li>
                      </ul>
                    </div>
                    <p className="pt-2 italic text-slate-600 dark:text-slate-400">
                      After receiving your feedback, I'm happy to extend your evaluation so you can continue exploring the platform.
                    </p>
                  </div>

                  {/* Complete Screen Buttons */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-2">
                    <button
                      onClick={() => setView('feedback')}
                      className="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition shadow-lg shadow-blue-500/20 flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Share Feedback</span>
                    </button>
                    <button
                      onClick={() => setView('extend')}
                      className="flex-1 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition shadow-lg shadow-indigo-500/20 flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <Clock className="w-4 h-4 text-indigo-200" />
                      <span>Request Extended Evaluation</span>
                    </button>
                    <button
                      onClick={handleContactClick}
                      className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs border border-slate-200 dark:border-slate-700 transition flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <Building className="w-4 h-4 text-slate-500" />
                      <span>Contact</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* ---------------- RESTRICTED FEATURE DIALOG ---------------- */
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/80 border border-amber-200 dark:border-amber-800/80 flex items-center justify-center text-amber-600 dark:text-amber-400 shadow-sm flex-shrink-0">
                      <Lock className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                        {featureName || 'Restricted Capability'}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
                        Available in Custom Deployments
                      </h2>
                    </div>
                  </div>

                  <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800">
                    <p>
                      This feature is intentionally disabled in the Public Evaluation Edition.
                    </p>
                    <p>
                      The purpose of this evaluation is to demonstrate the core AI workflow while protecting premium functionality.
                    </p>
                    <p>
                      If you're evaluating this application for your organization and would like to explore these capabilities, or if you'd simply like to share feedback, I'd love to hear from you.
                    </p>
                  </div>

                  {/* Restricted Feature Dialog Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                    <button
                      onClick={() => setView('feedback')}
                      className="py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition shadow-md flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Share Feedback</span>
                    </button>
                    <button
                      onClick={() => setView('extend')}
                      className="py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition shadow-md flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <Clock className="w-4 h-4" />
                      <span>Request Extended Evaluation</span>
                    </button>
                    <button
                      onClick={handleContactClick}
                      className="py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-semibold text-xs border border-slate-200 dark:border-slate-700 transition flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <Building className="w-4 h-4 text-slate-500" />
                      <span>Contact</span>
                    </button>
                    <button
                      onClick={onClose}
                      className="py-3 px-4 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 text-slate-700 dark:text-slate-300 font-semibold text-xs transition flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <span>Close</span>
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* VIEW: FEEDBACK FORM */}
          {view === 'feedback' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Share Evaluation Feedback
                  </h3>
                </div>
                <button
                  onClick={() => setView('main')}
                  className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  ← Back
                </button>
              </div>

              <form onSubmit={handleFeedbackSubmit} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Which feature was most valuable?
                  </label>
                  <input
                    type="text"
                    value={mostValuable}
                    onChange={(e) => setMostValuable(e.target.value)}
                    placeholder="e.g. Discovery Coach, Buying Committee Map, Executive Brief"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    What would you improve?
                  </label>
                  <textarea
                    rows={2}
                    value={improvements}
                    onChange={(e) => setImprovements(e.target.value)}
                    placeholder="Share any areas where AI outputs or workflows could be refined..."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Would this be useful for your team?
                    </label>
                    <select
                      value={teamUsefulness}
                      onChange={(e) => setTeamUsefulness(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Yes, highly useful">Yes, highly useful for our team</option>
                      <option value="Useful with minor adjustments">Useful with minor adjustments</option>
                      <option value="Exploring possibilities">Exploring possibilities</option>
                      <option value="Not relevant at present">Not relevant at present</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Organization / Company
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. AstraTech Global"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Is there anything missing?
                  </label>
                  <textarea
                    rows={2}
                    value={missingFeatures}
                    onChange={(e) => setMissingFeatures(e.target.value)}
                    placeholder="Tell us about missing features, CRM integrations, or customized data requirements..."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Optional Email Address Field */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={feedbackEmail}
                    onChange={(e) => setFeedbackEmail(e.target.value)}
                    placeholder="e.g. name@company.com"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                    If you'd like a reply or an extended evaluation, leave your email address.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs transition shadow-lg shadow-blue-500/25 flex items-center justify-center space-x-2 cursor-pointer mt-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Submitting Feedback...' : 'Share Feedback'}</span>
                </button>
              </form>
            </div>
          )}

          {/* VIEW: REQUEST EXTENDED EVALUATION FORM */}
          {view === 'extend' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Request Extended Evaluation
                  </h3>
                </div>
                <button
                  onClick={() => setView('main')}
                  className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  ← Back
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 text-xs text-indigo-950 dark:text-indigo-200 font-medium leading-relaxed">
                If you'd like additional evaluation time, tell me a little about your organisation and I'll review your request.
              </div>

              <form onSubmit={handleExtendSubmit} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Name <span className="text-slate-400 font-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={extendName}
                    onChange={(e) => setExtendName(e.target.value)}
                    placeholder="e.g. Varsha Sharma"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Company <span className="text-slate-400 font-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={extendCompany}
                    onChange={(e) => setExtendCompany(e.target.value)}
                    placeholder="e.g. Enterprise Solutions Corp"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={extendEmail}
                    onChange={(e) => setExtendEmail(e.target.value)}
                    placeholder="e.g. name@company.com"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !extendEmail.trim()}
                  className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs transition shadow-lg shadow-indigo-500/25 flex items-center justify-center space-x-2 cursor-pointer mt-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Submitting Request...' : 'Submit Evaluation Request'}</span>
                </button>
              </form>
            </div>
          )}

          {/* VIEW: SUBMITTED CONFIRMATION */}
          {view === 'submitted' && (
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 max-w-md mx-auto leading-relaxed font-medium whitespace-pre-line bg-slate-50 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-left">
                {successText}
              </div>
              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="px-6 py-3 rounded-xl bg-slate-900 dark:bg-slate-800 text-white font-bold text-xs shadow-md hover:bg-slate-800 transition cursor-pointer"
                >
                  Continue Exploring Copilot
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Branding Footer */}
        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 gap-2">
          <div className="flex items-center space-x-1 font-medium">
            <Building className="w-3.5 h-3.5 text-blue-500" />
            <span>Designed & Developed by <strong className="text-slate-800 dark:text-slate-200">Sheetal Infrastructure AI</strong></span>
          </div>
          <div className="flex items-center space-x-1.5 text-[10px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Registered under Udyam & IEC, Government of India</span>
          </div>
        </div>
      </div>
    </div>
  );
};
