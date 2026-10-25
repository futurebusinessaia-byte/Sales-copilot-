import React, { useState } from 'react';
import { SalesReport } from '../types';
import { CompanyIntelligenceCard } from './sections/CompanyIntelligenceCard';
import { IcpScoreCard } from './sections/IcpScoreCard';
import { DecisionMakerMapCard } from './sections/DecisionMakerMapCard';
import { PainPointsCard } from './sections/PainPointsCard';
import { ProductPositioningCard } from './sections/ProductPositioningCard';
import { DiscoveryQuestionsCard } from './sections/DiscoveryQuestionsCard';
import { ObjectionHandlingCard } from './sections/ObjectionHandlingCard';
import { OutreachAssetsCard } from './sections/OutreachAssetsCard';
import { ExecutiveBriefCard } from './sections/ExecutiveBriefCard';
import { ExecutiveBriefModal } from './ExecutiveBriefModal';

import {
  ArrowLeft,
  Bookmark,
  Check,
  Printer,
  Sparkles,
  Building2,
  Share2,
  FileText,
  AlertTriangle,
} from 'lucide-react';

interface ReportViewProps {
  report: SalesReport;
  onBack: () => void;
  onSaveProspect: (report: SalesReport) => void;
  isSaved: boolean;
}

export const ReportView: React.FC<ReportViewProps> = ({
  report,
  onBack,
  onSaveProspect,
  isSaved,
}) => {
  const [currentReport, setCurrentReport] = useState<SalesReport>(report);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [activeSectionTab, setActiveSectionTab] = useState<string>('all');
  const [regeneratingMap, setRegeneratingMap] = useState<Record<string, boolean>>({});

  const scrollToSection = (id: string) => {
    setActiveSectionTab(id);
    if (id === 'all') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleRegenerateSection = async (sectionKey: string) => {
    setRegeneratingMap((prev) => ({ ...prev, [sectionKey]: true }));
    try {
      const res = await fetch('/api/regenerate-section', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sectionKey,
          input: currentReport.input,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to regenerate section');
      }

      const json = await res.json();
      if (json.success && json.data) {
        if (sectionKey === 'coldEmail') {
          setCurrentReport((prev) => ({
            ...prev,
            outreachAssets: {
              ...prev.outreachAssets,
              coldEmail: json.data,
            },
          }));
        } else if (sectionKey === 'linkedInMessage') {
          setCurrentReport((prev) => ({
            ...prev,
            outreachAssets: {
              ...prev.outreachAssets,
              linkedInMessage: json.data,
            },
          }));
        } else if (sectionKey === 'coldCallScript') {
          setCurrentReport((prev) => ({
            ...prev,
            outreachAssets: {
              ...prev.outreachAssets,
              coldCallScript: json.data,
            },
          }));
        } else {
          setCurrentReport((prev) => ({
            ...prev,
            [sectionKey]: json.data,
          }));
        }
      }
    } catch (err) {
      console.error('Error regenerating section:', err);
    } finally {
      setRegeneratingMap((prev) => ({ ...prev, [sectionKey]: false }));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Navigation & Action Toolbar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 sm:p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-20 z-20 backdrop-blur-md">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition cursor-pointer"
            title="Back to Input Form"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-extrabold text-slate-900 dark:text-white">
                {currentReport.input.companyName}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                {currentReport.icpFitScore.score}% ICP Match
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {currentReport.input.industry} • {currentReport.input.country} • {currentReport.input.employeeRange}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <button
            onClick={() => onSaveProspect(currentReport)}
            className={`inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer border ${
              isSaved
                ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
            }`}
          >
            {isSaved ? (
              <>
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Saved to Vault</span>
              </>
            ) : (
              <>
                <Bookmark className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <span>Save Prospect</span>
              </>
            )}
          </button>

          <button
            onClick={() => setShowPrintModal(true)}
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Executive Brief</span>
          </button>
        </div>
      </div>

      {/* Quick Jump Navigation Pills */}
      <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-none text-xs font-medium border-b border-slate-200/60 dark:border-slate-800">
        <button
          onClick={() => scrollToSection('all')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition cursor-pointer ${
            activeSectionTab === 'all'
              ? 'bg-blue-600 text-white font-bold'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          View All 11 Sections
        </button>
        <button
          onClick={() => scrollToSection('sec-1')}
          className="px-3 py-1.5 rounded-lg whitespace-nowrap bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 text-slate-700 dark:text-slate-300"
        >
          1. Company Intel
        </button>
        <button
          onClick={() => scrollToSection('sec-2')}
          className="px-3 py-1.5 rounded-lg whitespace-nowrap bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 text-slate-700 dark:text-slate-300"
        >
          2. ICP Score
        </button>
        <button
          onClick={() => scrollToSection('sec-3')}
          className="px-3 py-1.5 rounded-lg whitespace-nowrap bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 text-slate-700 dark:text-slate-300"
        >
          3. Decision Makers
        </button>
        <button
          onClick={() => scrollToSection('sec-4')}
          className="px-3 py-1.5 rounded-lg whitespace-nowrap bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 text-slate-700 dark:text-slate-300"
        >
          4. Pain Points
        </button>
        <button
          onClick={() => scrollToSection('sec-5')}
          className="px-3 py-1.5 rounded-lg whitespace-nowrap bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 text-slate-700 dark:text-slate-300"
        >
          5. Positioning
        </button>
        <button
          onClick={() => scrollToSection('sec-6')}
          className="px-3 py-1.5 rounded-lg whitespace-nowrap bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 text-slate-700 dark:text-slate-300"
        >
          6. 10 Discovery Questions
        </button>
        <button
          onClick={() => scrollToSection('sec-7')}
          className="px-3 py-1.5 rounded-lg whitespace-nowrap bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 text-slate-700 dark:text-slate-300"
        >
          7. Objections
        </button>
        <button
          onClick={() => scrollToSection('sec-8-10')}
          className="px-3 py-1.5 rounded-lg whitespace-nowrap bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 text-slate-700 dark:text-slate-300"
        >
          8-10. Outreach Playbook
        </button>
        <button
          onClick={() => scrollToSection('sec-11')}
          className="px-3 py-1.5 rounded-lg whitespace-nowrap bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-bold border border-blue-200 dark:border-blue-800"
        >
          11. Executive Brief
        </button>
      </div>

      {/* REPORT SECTIONS STACK */}

      {/* SECTION 1 */}
      <div id="sec-1">
        <CompanyIntelligenceCard
          data={currentReport.companyIntelligence}
          companyName={currentReport.input.companyName}
          onRegenerate={() => handleRegenerateSection('companyIntelligence')}
          isRegenerating={regeneratingMap['companyIntelligence']}
        />
      </div>

      {/* SECTION 2 */}
      <div id="sec-2">
        <IcpScoreCard
          data={currentReport.icpFitScore}
          companyName={currentReport.input.companyName}
          onRegenerate={() => handleRegenerateSection('icpFitScore')}
          isRegenerating={regeneratingMap['icpFitScore']}
        />
      </div>

      {/* SECTION 3 */}
      <div id="sec-3">
        <DecisionMakerMapCard
          data={currentReport.decisionMakerMap}
          companyName={currentReport.input.companyName}
          onRegenerate={() => handleRegenerateSection('decisionMakerMap')}
          isRegenerating={regeneratingMap['decisionMakerMap']}
        />
      </div>

      {/* SECTION 4 */}
      <div id="sec-4">
        <PainPointsCard
          data={currentReport.businessPainPoints}
          companyName={currentReport.input.companyName}
          onRegenerate={() => handleRegenerateSection('businessPainPoints')}
          isRegenerating={regeneratingMap['businessPainPoints']}
        />
      </div>

      {/* SECTION 5 */}
      <div id="sec-5">
        <ProductPositioningCard
          data={currentReport.productPositioning}
          companyName={currentReport.input.companyName}
          onRegenerate={() => handleRegenerateSection('productPositioning')}
          isRegenerating={regeneratingMap['productPositioning']}
        />
      </div>

      {/* SECTION 6 */}
      <div id="sec-6">
        <DiscoveryQuestionsCard
          data={currentReport.discoveryQuestions}
          companyName={currentReport.input.companyName}
          onRegenerate={() => handleRegenerateSection('discoveryQuestions')}
          isRegenerating={regeneratingMap['discoveryQuestions']}
        />
      </div>

      {/* SECTION 7 */}
      <div id="sec-7">
        <ObjectionHandlingCard
          data={currentReport.objectionHandling}
          companyName={currentReport.input.companyName}
          onRegenerate={() => handleRegenerateSection('objectionHandling')}
          isRegenerating={regeneratingMap['objectionHandling']}
        />
      </div>

      {/* SECTIONS 8, 9, 10 */}
      <div id="sec-8-10">
        <OutreachAssetsCard
          data={currentReport.outreachAssets}
          companyName={currentReport.input.companyName}
          onRegenerateColdEmail={() => handleRegenerateSection('coldEmail')}
          onRegenerateLinkedIn={() => handleRegenerateSection('linkedInMessage')}
          onRegenerateColdCallScript={() => handleRegenerateSection('coldCallScript')}
          isRegeneratingColdEmail={regeneratingMap['coldEmail']}
          isRegeneratingLinkedIn={regeneratingMap['linkedInMessage']}
          isRegeneratingColdCallScript={regeneratingMap['coldCallScript']}
        />
      </div>

      {/* SECTION 11 */}
      <div id="sec-11">
        <ExecutiveBriefCard
          data={currentReport.executiveBrief}
          report={currentReport}
          onOpenPrintModal={() => setShowPrintModal(true)}
          onRegenerate={() => handleRegenerateSection('executiveBrief')}
          isRegenerating={regeneratingMap['executiveBrief']}
        />
      </div>

      {/* DISCLAIMER BANNER */}
      <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 text-center text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center space-x-2">
        <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
        <span>
          "This prototype demonstrates how AI can support enterprise sales preparation. Company insights are AI-generated estimates and should be validated before customer engagement."
        </span>
      </div>

      {/* Printable Executive Brief Modal */}
      {showPrintModal && (
        <ExecutiveBriefModal
          report={currentReport}
          onClose={() => setShowPrintModal(false)}
        />
      )}
    </div>
  );
};
