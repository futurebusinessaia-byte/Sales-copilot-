import React from 'react';
import {
  LayoutDashboard,
  Building2,
  Users,
  Target,
  HelpCircle,
  FileText,
  Calculator,
  Swords,
  TrendingUp,
  Mic,
  Mail,
  History,
  Sparkles
} from 'lucide-react';

export type ActiveTab =
  | 'dashboard'
  | 'research'
  | 'buying-committee'
  | 'revenue-intel'
  | 'discovery'
  | 'proposal'
  | 'roi'
  | 'competitors'
  | 'executive'
  | 'meeting'
  | 'email'
  | 'crm';

interface SidebarNavProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  hasReport: boolean;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const navItems = [
    { id: 'dashboard' as const, label: 'Executive Dashboard', icon: LayoutDashboard, badge: 'KPI' },
    { id: 'research' as const, label: 'AI Company Research', icon: Building2, badge: 'Target' },
    { id: 'buying-committee' as const, label: 'Buying Committee', icon: Users },
    { id: 'revenue-intel' as const, label: 'Revenue Intelligence', icon: Target },
    { id: 'discovery' as const, label: 'Discovery Coach', icon: HelpCircle },
    { id: 'proposal' as const, label: 'Proposal Generator', icon: FileText },
    { id: 'roi' as const, label: 'ROI Calculator', icon: Calculator, badge: 'Engine' },
    { id: 'competitors' as const, label: 'Competitor Analysis', icon: Swords, badge: '6 Grid' },
    { id: 'executive' as const, label: 'Executive Reports', icon: TrendingUp, badge: 'Forecast' },
    { id: 'meeting' as const, label: 'Meeting Assistant', icon: Mic, badge: 'Voice' },
    { id: 'email' as const, label: 'Email Studio', icon: Mail, badge: 'Templates' },
    { id: 'crm' as const, label: 'CRM & Account Intelligence', icon: History, badge: 'Timeline' },
  ];

  return (
    <aside className="w-full lg:w-64 flex-shrink-0 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-3 flex flex-col justify-between transition-colors duration-200 shadow-sm">
      <div className="space-y-2">
        <div className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center justify-between">
          <span>Command Navigation</span>
          <Sparkles className="w-3.5 h-3.5 text-blue-500" />
        </div>

        {/* Navigation list */}
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 w-full cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-2.5 min-w-0">
                  <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-400 dark:text-slate-500'}`} />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`ml-2 px-1.5 py-0.5 text-[10px] font-bold rounded-md inline-block flex-shrink-0 ${
                      isActive
                        ? 'bg-blue-700 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};
