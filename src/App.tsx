import React, { useState, useEffect } from 'react';
import { Sparkles, X } from 'lucide-react';
import { ProspectInput, SalesReport, SavedProspect, EvaluationSession } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SidebarNav, ActiveTab } from './components/SidebarNav';
import { RecentProspectsSidebar } from './components/RecentProspectsSidebar';
import { ExecutiveBriefModal } from './components/ExecutiveBriefModal';
import { EvaluationBanner } from './components/EvaluationBanner';
import { UserAuthModal } from './components/UserAuthModal';
import { EnterpriseUpgradeModal } from './components/EnterpriseUpgradeModal';
import { generateReportHeuristic } from './utils/aiGenerator';
import { SAMPLE_PROSPECTS } from './data/sampleProspects';

// Import Views
import { HomeDashboardView } from './components/views/HomeDashboardView';
import { CompanyResearchView } from './components/views/CompanyResearchView';
import { BuyingCommitteeView } from './components/views/BuyingCommitteeView';
import { RevenueIntelligenceView } from './components/views/RevenueIntelligenceView';
import { DiscoveryCoachView } from './components/views/DiscoveryCoachView';
import { ProposalGeneratorView } from './components/views/ProposalGeneratorView';
import { RoiCalculatorView } from './components/views/RoiCalculatorView';
import { CompetitorAnalysisView } from './components/views/CompetitorAnalysisView';
import { ExecutiveReportsView } from './components/views/ExecutiveReportsView';
import { MeetingAssistantView } from './components/views/MeetingAssistantView';
import { EmailStudioView } from './components/views/EmailStudioView';
import { CrmView } from './components/views/CrmView';
import { LoadingProgress } from './components/LoadingProgress';
import { ToastProvider } from './context/ToastContext';
import { EmptyReportState } from './components/EmptyReportState';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingCompanyName, setLoadingCompanyName] = useState<string>('');
  const [currentReport, setCurrentReport] = useState<SalesReport | null>(null);
  const [recentReports, setRecentReports] = useState<SalesReport[]>([]);
  const [savedProspects, setSavedProspects] = useState<SavedProspect[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false);
  const [briefModalOpen, setBriefModalOpen] = useState<boolean>(false);

  // Evaluation Edition State & Modals
  const [evalSession, setEvalSession] = useState<EvaluationSession>({
    evalId: 'EVAL-INIT',
    authType: 'guest',
    userName: 'Guest Evaluator',
    createdDate: new Date().toISOString(),
    remainingAnalyses: 10,
    totalAnalyses: 0,
    lastActivity: new Date().toISOString(),
    status: 'active',
  });

  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [upgradeModalOpen, setUpgradeModalOpen] = useState<boolean>(false);
  const [lockedFeatureName, setLockedFeatureName] = useState<string>('');

  // Default Prospect Input state
  const [prospectInput, setProspectInput] = useState<ProspectInput>({
    companyName: 'Acme Logistics Global',
    website: 'https://acmeglobal.com',
    industry: 'Logistics & Supply Chain',
    country: 'United States',
    employeeRange: '1,000-5,000 employees',
    currentHrSoftware: 'SAP HR / Excel Spreadsheets',
  });

  // Sync dark mode class on <html>
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Load saved prospects and initialize Evaluation Session
  useEffect(() => {
    try {
      const stored = localStorage.getItem('saved_sales_prospects');
      if (stored) {
        setSavedProspects(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to parse saved prospects from storage', e);
    }

    // Auto-generate initial sample report so all views populate immediately
    const initialReport = SAMPLE_PROSPECTS[0].report;
    setCurrentReport(initialReport);
    setRecentReports([initialReport]);

    // Initialize or verify evaluation session on backend
    const initEvalSession = async () => {
      try {
        const storedEvalId = localStorage.getItem('evaluation_id');
        const storedAuthType = (localStorage.getItem('evaluation_auth_type') as 'guest' | 'google') || 'guest';
        const storedUserName = localStorage.getItem('evaluation_user_name') || 'Guest Evaluator';
        const storedUserEmail = localStorage.getItem('evaluation_user_email') || undefined;

        const res = await fetch('/api/eval/session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            evalId: storedEvalId,
            authType: storedAuthType,
            userName: storedUserName,
            userEmail: storedUserEmail,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          setEvalSession(data);
          localStorage.setItem('evaluation_id', data.evalId);
        }
      } catch (e) {
        console.warn('Failed to fetch evaluation session from backend', e);
      }
    };

    initEvalSession();
  }, []);

  const handleSelectAuth = async (authType: 'guest' | 'google', name: string, email?: string) => {
    localStorage.setItem('evaluation_auth_type', authType);
    localStorage.setItem('evaluation_user_name', name);
    if (email) localStorage.setItem('evaluation_user_email', email);

    try {
      const res = await fetch('/api/eval/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          evalId: evalSession.evalId,
          authType,
          userName: name,
          userEmail: email,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setEvalSession(data);
      }
    } catch (e) {
      console.warn('Failed to update auth state on server', e);
      setEvalSession((prev) => ({ ...prev, authType, userName: name, userEmail: email }));
    }
  };

  const handleOpenLockedFeature = (featureName: string) => {
    setLockedFeatureName(featureName);
    setUpgradeModalOpen(true);
  };

  const handleSaveProspect = (report: SalesReport) => {
    const isAlreadySaved = savedProspects.some((p) => p.report.id === report.id);
    let updated: SavedProspect[];

    if (isAlreadySaved) {
      updated = savedProspects.filter((p) => p.report.id !== report.id);
    } else {
      const newSavedItem: SavedProspect = {
        id: report.id,
        savedAt: new Date().toISOString(),
        companyName: report.input.companyName,
        industry: report.input.industry,
        country: report.input.country,
        employeeRange: report.input.employeeRange,
        icpScore: report.icpFitScore.score,
        report,
      };
      updated = [newSavedItem, ...savedProspects];
    }

    setSavedProspects(updated);
    try {
      localStorage.setItem('saved_sales_prospects', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  };

  const handleDeleteSavedProspect = (id: string) => {
    const updated = savedProspects.filter((p) => p.id !== id);
    setSavedProspects(updated);
    try {
      localStorage.setItem('saved_sales_prospects', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to update localStorage', e);
    }
  };

  const handleGenerateReport = async () => {
    if (evalSession.remainingAnalyses <= 0) {
      setLockedFeatureName('Free Evaluation Limit Exhausted (0/10)');
      setUpgradeModalOpen(true);
      return;
    }

    setIsLoading(true);
    setLoadingCompanyName(prospectInput.companyName);

    try {
      const res = await fetch('/api/generate-sales-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Evaluation-ID': evalSession.evalId,
        },
        body: JSON.stringify({ ...prospectInput, evalId: evalSession.evalId }),
      });

      if (res.status === 403) {
        const errorData = await res.json();
        setIsLoading(false);
        setLockedFeatureName(errorData.error || 'Evaluation Limit Exhausted');
        setUpgradeModalOpen(true);
        if (typeof errorData.remainingAnalyses === 'number') {
          setEvalSession((prev) => ({ ...prev, remainingAnalyses: errorData.remainingAnalyses }));
        }
        return;
      }

      if (res.status === 429) {
        const errorData = await res.json();
        setIsLoading(false);
        alert(errorData.error || 'Rate limit exceeded. Please wait 10 seconds between requests.');
        return;
      }

      const data = await res.json();
      const report: SalesReport = data.report || generateReportHeuristic(prospectInput);

      if (data.evalSession) {
        setEvalSession((prev) => ({
          ...prev,
          remainingAnalyses: data.evalSession.remainingAnalyses,
          totalAnalyses: data.evalSession.totalAnalyses,
        }));
      }

      setTimeout(() => {
        setCurrentReport(report);
        setRecentReports((prev) => [report, ...prev.filter((r) => r.id !== report.id)]);
        setIsLoading(false);
        setActiveTab('buying-committee');
      }, 1800);
    } catch (err) {
      console.warn('Backend call failed, using heuristic engine:', err);
      const fallback = generateReportHeuristic(prospectInput);
      setTimeout(() => {
        setCurrentReport(fallback);
        setRecentReports((prev) => [fallback, ...prev.filter((r) => r.id !== fallback.id)]);
        setIsLoading(false);
        setActiveTab('buying-committee');
      }, 1800);
    }
  };

  const handleSelectSample = () => {
    const sample = SAMPLE_PROSPECTS[0];
    setProspectInput(sample.input);
    setIsLoading(true);
    setLoadingCompanyName(sample.input.companyName);

    setTimeout(() => {
      setCurrentReport(sample.report);
      setRecentReports((prev) => [sample.report, ...prev.filter((r) => r.id !== sample.report.id)]);
      setIsLoading(false);
      setActiveTab('buying-committee');
    }, 1500);
  };

  const renderActiveTab = () => {
    if (isLoading) {
      return <LoadingProgress companyName={loadingCompanyName} />;
    }

    switch (activeTab) {
      case 'dashboard':
        return (
          <HomeDashboardView
            report={currentReport}
            onSelectSample={handleSelectSample}
            onNavigateTab={(tab) => {
              if (tab === 'contact') {
                setUpgradeModalOpen(true);
              } else {
                setActiveTab(tab);
              }
            }}
          />
        );
      case 'research':
        return (
          <CompanyResearchView
            input={prospectInput}
            setInput={setProspectInput}
            onGenerate={handleGenerateReport}
            isLoading={isLoading}
            report={currentReport}
            onSelectSample={handleSelectSample}
          />
        );
      case 'buying-committee':
        return currentReport ? (
          <BuyingCommitteeView report={currentReport} />
        ) : (
          <EmptyReportState onSelectSample={handleSelectSample} onNavigateResearch={() => setActiveTab('research')} />
        );
      case 'revenue-intel':
        return currentReport ? (
          <RevenueIntelligenceView report={currentReport} />
        ) : (
          <EmptyReportState onSelectSample={handleSelectSample} onNavigateResearch={() => setActiveTab('research')} />
        );
      case 'discovery':
        return currentReport ? (
          <DiscoveryCoachView report={currentReport} />
        ) : (
          <EmptyReportState onSelectSample={handleSelectSample} onNavigateResearch={() => setActiveTab('research')} />
        );
      case 'proposal':
        return currentReport ? (
          <ProposalGeneratorView
            report={currentReport}
            onOpenModal={() => setBriefModalOpen(true)}
            onRestrictedFeature={(feature) => handleOpenLockedFeature(feature)}
          />
        ) : (
          <EmptyReportState onSelectSample={handleSelectSample} onNavigateResearch={() => setActiveTab('research')} />
        );
      case 'roi':
        return currentReport ? (
          <RoiCalculatorView report={currentReport} />
        ) : (
          <EmptyReportState onSelectSample={handleSelectSample} onNavigateResearch={() => setActiveTab('research')} />
        );
      case 'competitors':
        return currentReport ? (
          <CompetitorAnalysisView report={currentReport} />
        ) : (
          <EmptyReportState onSelectSample={handleSelectSample} onNavigateResearch={() => setActiveTab('research')} />
        );
      case 'executive':
        return currentReport ? (
          <ExecutiveReportsView report={currentReport} />
        ) : (
          <EmptyReportState onSelectSample={handleSelectSample} onNavigateResearch={() => setActiveTab('research')} />
        );
      case 'meeting':
        return currentReport ? (
          <MeetingAssistantView report={currentReport} />
        ) : (
          <EmptyReportState onSelectSample={handleSelectSample} onNavigateResearch={() => setActiveTab('research')} />
        );
      case 'email':
        return currentReport ? (
          <EmailStudioView report={currentReport} />
        ) : (
          <EmptyReportState onSelectSample={handleSelectSample} onNavigateResearch={() => setActiveTab('research')} />
        );
      case 'crm':
        return currentReport ? (
          <CrmView
            report={currentReport}
            onRestrictedFeature={(feature) => handleOpenLockedFeature(feature)}
          />
        ) : (
          <EmptyReportState onSelectSample={handleSelectSample} onNavigateResearch={() => setActiveTab('research')} />
        );
      default:
        return (
          <HomeDashboardView
            report={currentReport}
            onSelectSample={handleSelectSample}
            onNavigateTab={(tab) => setActiveTab(tab)}
          />
        );
    }
  };

  return (
    <ToastProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 font-sans antialiased selection:bg-blue-500 selection:text-white flex flex-col">
        {/* Top Evaluation Edition Banner */}
        <EvaluationBanner
          session={evalSession}
          onOpenAuthModal={() => setAuthModalOpen(true)}
          onOpenContactModal={() => handleOpenLockedFeature('Enterprise Access & SLA')}
        />

        {/* Top Header */}
        <Header
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          onOpenSidebar={() => setSidebarOpen(true)}
          savedCount={savedProspects.length}
          onReset={() => setActiveTab('dashboard')}
          onToggleMobileNav={() => setMobileNavOpen(!mobileNavOpen)}
        />

        {/* Mobile Navigation Slide-Over Drawer */}
        {mobileNavOpen && (
          <div
            className="fixed inset-0 z-50 lg:hidden bg-slate-900/60 backdrop-blur-sm flex justify-start transition-opacity duration-300"
            onClick={() => setMobileNavOpen(false)}
          >
            <div
              className="w-80 max-w-[85vw] bg-white dark:bg-slate-900 h-full shadow-2xl p-4 overflow-y-auto flex flex-col justify-between transform transition-transform duration-300 translate-x-0"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span className="font-extrabold text-slate-900 dark:text-white text-sm">Command Navigation</span>
                  </div>
                  <button
                    onClick={() => setMobileNavOpen(false)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <SidebarNav
                  activeTab={activeTab}
                  setActiveTab={(tab) => {
                    setActiveTab(tab);
                    setMobileNavOpen(false);
                  }}
                  hasReport={!!currentReport}
                />
              </div>
            </div>
          </div>
        )}

        {/* Main Command Center Layout */}
        <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex flex-col lg:flex-row gap-6">
          {/* Left Sidebar Navigation (Desktop Only) */}
          <div className="hidden lg:block lg:w-64 flex-shrink-0">
            <SidebarNav
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              hasReport={!!currentReport}
            />
          </div>

          {/* Right Active Content View */}
          <main className="flex-1 min-w-0">{renderActiveTab()}</main>
        </div>

        {/* Footer */}
        <Footer />

        {/* Executive Brief PDF Printable Modal */}
        {briefModalOpen && currentReport && (
          <ExecutiveBriefModal
            report={currentReport}
            onClose={() => setBriefModalOpen(false)}
            onRestrictedFeature={(feature) => handleOpenLockedFeature(feature)}
          />
        )}

        {/* Evaluation User Registration / Sign-In Modal */}
        <UserAuthModal
          session={evalSession}
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          onSelectAuth={handleSelectAuth}
        />

        {/* Enterprise Upgrade / Feature Locked Modal */}
        <EnterpriseUpgradeModal
          isOpen={upgradeModalOpen}
          onClose={() => setUpgradeModalOpen(false)}
          featureName={lockedFeatureName}
          isLimitReached={evalSession.remainingAnalyses <= 0}
          session={evalSession}
          onSessionUpdate={(newSession) => setEvalSession(newSession)}
        />

        {/* Recent & Saved Prospects Drawer */}
        <RecentProspectsSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          savedProspects={savedProspects}
          recentReports={recentReports}
          onSelectReport={(rep) => {
            setCurrentReport(rep);
            setActiveTab('buying-committee');
          }}
          onDeleteSaved={handleDeleteSavedProspect}
        />
      </div>
    </ToastProvider>
  );
}

