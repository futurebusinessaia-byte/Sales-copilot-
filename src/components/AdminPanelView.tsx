import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Users,
  BarChart3,
  RefreshCw,
  PlusCircle,
  Ban,
  CheckCircle2,
  Trash2,
  Key,
  Search,
  Globe,
  Building,
  Activity,
  ArrowUpRight,
  Sparkles,
  Lock,
  Download
} from 'lucide-react';
import { EvaluationSession, EvaluationAnalytics } from '../types';

interface AdminPanelViewProps {
  onClose: () => void;
}

export const AdminPanelView: React.FC<AdminPanelViewProps> = ({ onClose }) => {
  const [adminKey, setAdminKey] = useState('sheetal2026');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'users' | 'analytics'>('users');

  const [users, setUsers] = useState<EvaluationSession[]>([]);
  const [analytics, setAnalytics] = useState<EvaluationAnalytics | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const fetchAdminData = async (key: string) => {
    setLoading(true);
    setAuthError('');
    try {
      const usersRes = await fetch('/api/admin/users', {
        headers: { 'X-Admin-Key': key },
      });
      if (!usersRes.ok) {
        throw new Error('Invalid Admin Key');
      }
      const usersData = await usersRes.json();
      setUsers(usersData.users || []);

      const analyticsRes = await fetch('/api/admin/analytics', {
        headers: { 'X-Admin-Key': key },
      });
      if (analyticsRes.ok) {
        const analyticsData = await analyticsRes.json();
        setAnalytics(analyticsData.analytics);
      }

      setIsAuthenticated(true);
    } catch (err: any) {
      setAuthError(err.message || 'Authentication failed');
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Auto attempt default key on load
    fetchAdminData('sheetal2026');
  }, []);

  const handleAction = async (evalId: string, action: string, customLimit?: number) => {
    try {
      const res = await fetch('/api/admin/user/action', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Key': adminKey,
        },
        body: JSON.stringify({ evalId, action, customLimit }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(`Success: ${data.message}`);
        fetchAdminData(adminKey);
        setTimeout(() => setMessage(''), 4000);
      } else {
        alert(data.error || 'Action failed');
      }
    } catch (err: any) {
      alert(err.message || 'Action failed');
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.evalId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.userEmail && u.userEmail.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 text-white border border-slate-800 rounded-2xl shadow-2xl max-w-5xl w-full h-[90vh] flex flex-col overflow-hidden">
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-white shadow-md">
              <ShieldCheck className="w-5 h-5 text-sky-300" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-extrabold text-base text-white tracking-tight">
                  Public Evaluation Control Center
                </h3>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-blue-950 border border-blue-800 text-blue-400">
                  Admin Key Auth
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Managed by Sheetal Infrastructure AI • Government of India Registered
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {isAuthenticated && (
              <div className="flex bg-slate-800 p-1 rounded-xl text-xs">
                <button
                  onClick={() => setActiveTab('users')}
                  className={`px-3 py-1.5 rounded-lg font-bold flex items-center space-x-1.5 transition ${
                    activeTab === 'users' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Evaluation Users ({users.length})</span>
                </button>
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`px-3 py-1.5 rounded-lg font-bold flex items-center space-x-1.5 transition ${
                    activeTab === 'analytics' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>Analytics Command</span>
                </button>
              </div>
            )}

            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 transition"
            >
              Exit Portal
            </button>
          </div>
        </div>

        {/* Content Body */}
        {!isAuthenticated ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-950 border border-indigo-800 flex items-center justify-center text-indigo-400">
              <Key className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">Admin Authentication Required</h4>
              <p className="text-xs text-slate-400 mt-1 max-w-sm">
                Enter your administrative key (default: <code className="text-sky-300">sheetal2026</code> or <code className="text-sky-300">admin123</code>)
              </p>
            </div>

            <div className="flex space-x-2 max-w-xs w-full">
              <input
                type="password"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                placeholder="Enter Admin Key"
                className="flex-1 px-3 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => fetchAdminData(adminKey)}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 font-bold text-xs rounded-xl text-white transition"
              >
                {loading ? 'Authenticating...' : 'Login'}
              </button>
            </div>

            {authError && <div className="text-xs text-rose-400 font-semibold">{authError}</div>}
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {message && (
              <div className="p-3 bg-emerald-950 border border-emerald-800 rounded-xl text-xs text-emerald-300 font-semibold flex items-center justify-between">
                <span>{message}</span>
                <button onClick={() => setMessage('')} className="text-slate-400 hover:text-white">✕</button>
              </div>
            )}

            {activeTab === 'users' ? (
              <div className="space-y-4">
                {/* Search & Actions Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="relative w-full sm:w-72">
                    <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search by Eval ID, Name, Email..."
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <button
                    onClick={() => fetchAdminData(adminKey)}
                    className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-medium transition"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                    <span>Refresh Users</span>
                  </button>
                </div>

                {/* Users Table */}
                <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950/40">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="p-3">Evaluation ID</th>
                        <th className="p-3">User Profile</th>
                        <th className="p-3">Auth Type</th>
                        <th className="p-3">Remaining / Total</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Created / Activity</th>
                        <th className="p-3 text-right">Admin Controls</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-slate-300">
                      {filteredUsers.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="p-8 text-center text-slate-500">
                            No evaluation users found.
                          </td>
                        </tr>
                      ) : (
                        filteredUsers.map((u) => (
                          <tr key={u.evalId} className="hover:bg-slate-900/60 transition">
                            <td className="p-3 font-mono font-bold text-sky-400">{u.evalId}</td>
                            <td className="p-3">
                              <div className="font-bold text-white">{u.userName}</div>
                              <div className="text-[11px] text-slate-400">{u.userEmail || 'No email provided'}</div>
                            </td>
                            <td className="p-3">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                u.authType === 'google'
                                  ? 'bg-rose-950 text-rose-300 border border-rose-800'
                                  : 'bg-slate-800 text-slate-300'
                              }`}>
                                {u.authType === 'google' ? 'Google OAuth' : 'Guest'}
                              </span>
                            </td>
                            <td className="p-3 font-mono">
                              <span className={u.remainingAnalyses <= 0 ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                                {u.remainingAnalyses}
                              </span>{' '}
                              / 10 ({u.totalAnalyses} used)
                            </td>
                            <td className="p-3">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                u.status === 'active'
                                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                                  : 'bg-rose-950 text-rose-400 border border-rose-800'
                              }`}>
                                {u.status}
                              </span>
                            </td>
                            <td className="p-3 text-[11px] text-slate-400">
                              <div>{new Date(u.createdDate).toLocaleDateString()}</div>
                              <div className="text-[10px] text-slate-500">{new Date(u.lastActivity).toLocaleTimeString()}</div>
                            </td>
                            <td className="p-3 text-right space-x-1.5">
                              <button
                                onClick={() => handleAction(u.evalId, 'reset')}
                                className="px-2 py-1 rounded bg-blue-950 hover:bg-blue-900 text-blue-300 border border-blue-800 text-[10px] font-bold transition"
                                title="Reset free analyses back to 10"
                              >
                                Reset (10)
                              </button>
                              <button
                                onClick={() => handleAction(u.evalId, 'increase')}
                                className="px-2 py-1 rounded bg-indigo-950 hover:bg-indigo-900 text-indigo-300 border border-indigo-800 text-[10px] font-bold transition"
                                title="Add 5 more analyses"
                              >
                                +5
                              </button>
                              {u.status === 'active' ? (
                                <button
                                  onClick={() => handleAction(u.evalId, 'disable')}
                                  className="px-2 py-1 rounded bg-amber-950 hover:bg-amber-900 text-amber-300 border border-amber-800 text-[10px] font-bold transition"
                                  title="Disable evaluation session"
                                >
                                  Disable
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleAction(u.evalId, 'enable')}
                                  className="px-2 py-1 rounded bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-800 text-[10px] font-bold transition"
                                  title="Enable evaluation session"
                                >
                                  Enable
                                </button>
                              )}
                              <button
                                onClick={() => handleAction(u.evalId, 'delete')}
                                className="px-2 py-1 rounded bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-800 text-[10px] font-bold transition"
                                title="Delete user record"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Metric Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-xs text-slate-400 font-medium">Total Evaluators</div>
                    <div className="text-2xl font-extrabold text-white mt-1">
                      {analytics?.totalVisitors || users.length}
                    </div>
                    <div className="text-[10px] text-emerald-400 mt-1 flex items-center">
                      <ArrowUpRight className="w-3 h-3 mr-0.5" /> +18% active sessions
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-xs text-slate-400 font-medium">AI Analyses Generated</div>
                    <div className="text-2xl font-extrabold text-sky-400 mt-1">
                      {analytics?.totalAnalyses || 0}
                    </div>
                    <div className="text-[10px] text-sky-300 mt-1">Powered by Enterprise AI Engine</div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-xs text-slate-400 font-medium">Returning Evaluators</div>
                    <div className="text-2xl font-extrabold text-indigo-400 mt-1">
                      {analytics?.returningUsers || 0}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1">Generated multiple reports</div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-xs text-slate-400 font-medium">Avg Session Time</div>
                    <div className="text-2xl font-extrabold text-amber-400 mt-1">
                      {analytics?.avgSessionMinutes || 14.5}m
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1">High engagement rate</div>
                  </div>
                </div>

                {/* Top Industries & Top Countries */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center justify-between">
                      <span>Top Target Industries Analyzed</span>
                      <Building className="w-4 h-4 text-blue-400" />
                    </h4>
                    <div className="space-y-2">
                      {analytics?.topIndustries.map((ind, i) => (
                        <div key={i} className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-950/60">
                          <span className="text-slate-200 font-medium">{ind.industry}</span>
                          <span className="font-mono text-sky-400 font-bold">{ind.count} reports</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center justify-between">
                      <span>Top Countries Analyzed</span>
                      <Globe className="w-4 h-4 text-emerald-400" />
                    </h4>
                    <div className="space-y-2">
                      {analytics?.topCountries.map((c, i) => (
                        <div key={i} className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-950/60">
                          <span className="text-slate-200 font-medium">{c.country}</span>
                          <span className="font-mono text-emerald-400 font-bold">{c.count} queries</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950 text-slate-500 text-xs flex items-center justify-between">
          <span>© 2026 Sheetal Infrastructure AI</span>
          <span>Evaluation Control Engine v2.4</span>
        </div>
      </div>
    </div>
  );
};
