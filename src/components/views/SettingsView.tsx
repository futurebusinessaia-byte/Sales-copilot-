import React from 'react';
import {
  Settings,
  Cpu,
  ShieldCheck,
  Building,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface SettingsViewProps {
  onRestrictedFeature?: (featureName: string) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ onRestrictedFeature }) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold uppercase">
            System Config
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Platform Settings & AI Configuration
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Manage system configurations, AI model endpoints, and enterprise organization branding.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* AI Model Config */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <Cpu className="w-4 h-4 text-blue-600" />
            <span>AI Model Engine Settings</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between">
              <div>
                <span className="font-extrabold text-slate-900 dark:text-white block">Active AI Model</span>
                <span className="text-slate-500">Enterprise AI Engine</span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-extrabold">
                Active
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between">
              <div>
                <span className="font-extrabold text-slate-900 dark:text-white block">API Secret Injection</span>
                <span className="text-slate-500">Server API Key Managed</span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-[10px] font-extrabold">
                Managed
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between">
              <div>
                <span className="font-extrabold text-slate-900 dark:text-white block">Fallback Intelligence</span>
                <span className="text-slate-500">Heuristic Engine Active</span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-[10px] font-extrabold">
                Ready
              </span>
            </div>
          </div>
        </div>

        {/* Organization & Branding Info */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <Building className="w-4 h-4 text-indigo-600" />
            <span>Organization & Licensing Registration</span>
          </h3>

          <div className="space-y-3 text-xs text-slate-700 dark:text-slate-300">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Developed & Maintained By</span>
              <p className="font-extrabold text-slate-900 dark:text-white">Sheetal Infrastructure AI</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Government Registrations</span>
              <p className="font-medium">Registered under Udyam & IEC, Government of India</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Copyright Notice</span>
              <p className="font-medium">© 2026 Sheetal Infrastructure AI. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Enterprise Restricted Features Panel */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2 border-b border-slate-100 dark:border-slate-800 pb-3">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Custom Enterprise Capabilities</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <button
            onClick={() => onRestrictedFeature && onRestrictedFeature('API Access & Developer Webhooks')}
            className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-left space-y-1 transition cursor-pointer"
          >
            <span className="font-bold text-slate-900 dark:text-white block">API Access & Webhooks</span>
            <span className="text-slate-500 text-[11px] block">Connect REST API with internal CRMs & ERPs</span>
            <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold uppercase block pt-1">Custom Deployment</span>
          </button>

          <button
            onClick={() => onRestrictedFeature && onRestrictedFeature('Bulk Prospect Analysis')}
            className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-left space-y-1 transition cursor-pointer"
          >
            <span className="font-bold text-slate-900 dark:text-white block">Bulk Prospect Analysis</span>
            <span className="text-slate-500 text-[11px] block">Upload CSV list of 1,000+ accounts at once</span>
            <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold uppercase block pt-1">Custom Deployment</span>
          </button>

          <button
            onClick={() => onRestrictedFeature && onRestrictedFeature('Team Workspace & Role RBAC')}
            className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-left space-y-1 transition cursor-pointer"
          >
            <span className="font-bold text-slate-900 dark:text-white block">Team Workspace & RBAC</span>
            <span className="text-slate-500 text-[11px] block">Multi-seat team collaboration & manager permissions</span>
            <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold uppercase block pt-1">Custom Deployment</span>
          </button>
        </div>
      </div>
    </div>
  );
};
