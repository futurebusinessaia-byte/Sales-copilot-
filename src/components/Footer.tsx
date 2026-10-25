import React from 'react';
import { ShieldCheck, Building, Key } from 'lucide-react';

interface FooterProps {
  onOpenAdminPanel?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdminPanel }) => {
  return (
    <footer className="mt-16 border-t border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm py-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2 font-medium text-slate-700 dark:text-slate-300">
            <Building className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Designed & Developed by <strong className="text-slate-900 dark:text-white">Sheetal Infrastructure AI</strong></span>
          </div>
          <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Registered under Udyam & IEC, Government of India</span>
          </div>
        </div>

        <div className="text-center md:text-right space-y-1">
          <p className="font-medium text-slate-700 dark:text-slate-300">
            © 2026 Sheetal Infrastructure AI. All rights reserved.
          </p>
          <div className="flex items-center justify-center md:justify-end space-x-2 text-[11px] text-slate-400 dark:text-slate-500">
            <span>Independent Demonstration Product • AI Enterprise Sales Copilot</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

