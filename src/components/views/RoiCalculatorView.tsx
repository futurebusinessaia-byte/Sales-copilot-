import React, { useState } from 'react';
import {
  Calculator,
  DollarSign,
  TrendingUp,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Printer,
  Sparkles
} from 'lucide-react';
import { SalesReport } from '../../types';

interface RoiCalculatorViewProps {
  report: SalesReport;
}

export const RoiCalculatorView: React.FC<RoiCalculatorViewProps> = ({ report }) => {
  const [employees, setEmployees] = useState<number>(500);
  const [hourlyRate, setHourlyRate] = useState<number>(45);
  const [adminHoursPerMonth, setAdminHoursPerMonth] = useState<number>(60);

  // Dynamic Financial Calculations
  const annualAdminCost = adminHoursPerMonth * 12 * hourlyRate * Math.max(1, Math.floor(employees / 100));
  const estimatedSavings = Math.round(annualAdminCost * 0.82);
  const licenseFee = Math.round(employees * 38);
  const netSavings = Math.max(0, estimatedSavings - licenseFee);
  const roiPercentage = licenseFee > 0 ? Math.round((netSavings / licenseFee) * 100) : 320;
  const paybackMonths = licenseFee > 0 ? (licenseFee / (estimatedSavings / 12)).toFixed(1) : '2.4';

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase">
            Financial Impact Engine
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Interactive Enterprise ROI Calculator
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Quantify hard dollar savings, productivity gains, and payback timelines for {report.input.companyName}.
        </p>
      </div>

      {/* Main Interactive Slider Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sliders Control Panel */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <Calculator className="w-4 h-4 text-emerald-600" />
            <span>Target Company Parameters</span>
          </h3>

          <div className="space-y-5">
            {/* Employee Count Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-700 dark:text-slate-300">Employee Headcount</span>
                <span className="text-blue-600 dark:text-blue-400 font-extrabold">{employees.toLocaleString()} Seats</span>
              </div>
              <input
                type="range"
                min="50"
                max="5000"
                step="50"
                value={employees}
                onChange={(e) => setEmployees(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>

            {/* Average Manager Hourly Rate Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-700 dark:text-slate-300">Avg Hourly Labor Cost</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">${hourlyRate}/hr</span>
              </div>
              <input
                type="range"
                min="20"
                max="120"
                step="5"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            {/* Admin Hours Per Month */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-700 dark:text-slate-300">Monthly Admin Reconciliation Hours</span>
                <span className="text-indigo-600 dark:text-indigo-400 font-extrabold">{adminHoursPerMonth} Hours</span>
              </div>
              <input
                type="range"
                min="10"
                max="200"
                step="10"
                value={adminHoursPerMonth}
                onChange={(e) => setAdminHoursPerMonth(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Calculated Results Highlights */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-lg space-y-2">
            <span className="text-xs font-bold text-emerald-100 uppercase">Estimated Annual Net Savings</span>
            <div className="text-4xl font-black tracking-tight">${netSavings.toLocaleString()}</div>
            <p className="text-xs text-emerald-100">Direct operational cost reduction per year</p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
            <span className="text-xs font-bold text-slate-500 uppercase">3-Year ROI Percentage</span>
            <div className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">{roiPercentage}%</div>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center">
              <TrendingUp className="w-3.5 h-3.5 mr-0.5" /> High Return Investment
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
            <span className="text-xs font-bold text-slate-500 uppercase">Payback Period</span>
            <div className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">{paybackMonths} <span className="text-xl text-slate-400">Months</span></div>
            <p className="text-xs text-slate-500">Rapid break-even timeline</p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
            <span className="text-xs font-bold text-slate-500 uppercase">Manager Hours Reclaimed</span>
            <div className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">{Math.round(adminHoursPerMonth * 0.8)} <span className="text-xl text-slate-400">hrs/mo</span></div>
            <p className="text-xs text-blue-600 font-bold">80% Workflow Automation</p>
          </div>
        </div>
      </div>

      {/* Breakdown Table */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
          <DollarSign className="w-4 h-4 text-emerald-600" />
          <span>Operational Value Breakdown</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {[
            { area: 'Attendance Reconciliation', current: `$${(annualAdminCost * 0.35).toLocaleString()}/yr waste`, ai: `$${(annualAdminCost * 0.35 * 0.8).toLocaleString()} saved with auto-sync` },
            { area: 'Timesheet Leakage & Late Invoicing', current: '7-10 days billing delays', ai: 'Instant month-end closure' },
            { area: 'Leave & Expense Policy Violations', current: '12% unverified claims slip', ai: '100% automated policy guardrails' },
            { area: 'Middle Manager Administrative Burden', current: `${adminHoursPerMonth} hours/month stuck in approvals`, ai: '1-click WhatsApp/Mobile approvals' },
          ].map((row, i) => (
            <div key={i} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
              <div className="font-extrabold text-slate-900 dark:text-white">{row.area}</div>
              <div className="text-rose-600 dark:text-rose-400">Current Cost: {row.current}</div>
              <div className="text-emerald-600 dark:text-emerald-400 font-bold">AI Outcome: {row.ai}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
