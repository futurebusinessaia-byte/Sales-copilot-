import React, { useState } from 'react';
import { SalesReport, SavedProspect } from '../types';
import { X, Search, Bookmark, Trash2, Building2, ChevronRight, Award } from 'lucide-react';

interface RecentProspectsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  savedProspects: SavedProspect[];
  recentReports: SalesReport[];
  onSelectReport: (report: SalesReport) => void;
  onDeleteSaved: (id: string) => void;
}

export const RecentProspectsSidebar: React.FC<RecentProspectsSidebarProps> = ({
  isOpen,
  onClose,
  savedProspects,
  recentReports,
  onSelectReport,
  onDeleteSaved,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'saved' | 'recent'>('saved');

  if (!isOpen) return null;

  const filteredSaved = savedProspects.filter((p) =>
    p.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredRecent = recentReports.filter((r) =>
    r.input.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.input.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 h-full border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bookmark className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
              Prospect Intelligence Vault
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Tabs */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search saved or recent prospects..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('saved')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                activeTab === 'saved'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Saved ({savedProspects.length})
            </button>
            <button
              onClick={() => setActiveTab('recent')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                activeTab === 'recent'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Recent Session ({recentReports.length})
            </button>
          </div>
        </div>

        {/* Content List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {activeTab === 'saved' ? (
            filteredSaved.length === 0 ? (
              <div className="text-center py-12 text-xs text-slate-400">
                No saved prospects yet. Click "Save Prospect" on any report to store it here.
              </div>
            ) : (
              filteredSaved.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between hover:border-blue-500 transition group cursor-pointer"
                  onClick={() => {
                    onSelectReport(item.report);
                    onClose();
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <span>{item.companyName}</span>
                        <span className="text-[10px] text-emerald-600 font-extrabold">
                          {item.icpScore}% ICP
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">
                        {item.industry} • {item.employeeRange}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteSaved(item.id);
                      }}
                      className="p-1.5 rounded-md text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition"
                      title="Remove from saved"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition" />
                  </div>
                </div>
              ))
            )
          ) : filteredRecent.length === 0 ? (
            <div className="text-center py-12 text-xs text-slate-400">
              No recent reports in this session yet.
            </div>
          ) : (
            filteredRecent.map((report) => (
              <div
                key={report.id}
                onClick={() => {
                  onSelectReport(report);
                  onClose();
                }}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between hover:border-blue-500 transition group cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span>{report.input.companyName}</span>
                      <span className="text-[10px] text-blue-600 font-extrabold">
                        {report.icpFitScore.score}%
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">
                      {report.input.industry} • {new Date(report.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition" />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
