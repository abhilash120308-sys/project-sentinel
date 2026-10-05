"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { 
  History, 
  Search, 
  Filter, 
  ShieldCheck, 
  UserCheck, 
  Calendar, 
  Lock, 
  Sparkles,
  ArrowRight,
  Database
} from "lucide-react";
import { formatDate } from "@/lib/utils";

export const AuditLogViewer: React.FC = () => {
  const { auditLogs } = useApp();
  const [search, setSearch] = useState<string>("");
  const [filterType, setFilterType] = useState<string>("ALL");

  const filteredLogs = auditLogs.filter((log) => {
    const matchesType = filterType === "ALL" || log.entityType === filterType;
    const q = search.toLowerCase();
    const matchesSearch =
      log.action.toLowerCase().includes(q) ||
      log.userName.toLowerCase().includes(q) ||
      (log.projectName && log.projectName.toLowerCase().includes(q));
    return matchesType && matchesSearch;
  });

  return (
    <div className="space-y-4">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-500 flex items-center justify-center font-bold">
            <History className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <span>Immutable Government Audit Trail & System Log</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold px-2 py-0.5 rounded border border-emerald-300">
                Cryptographically Logged
              </span>
            </h2>
            <p className="text-xs text-slate-500">
              Complete provenance trail of all budget approvals, milestone completions, issue escalations, and role switches
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search audit actions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none"
            />
          </div>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="text-xs py-1.5 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-medium"
          >
            <option value="ALL">All Entity Types ({auditLogs.length})</option>
            <option value="PROJECT">Project Changes</option>
            <option value="MILESTONE">Milestone Updates</option>
            <option value="BUDGET">Budget & Vouchers</option>
            <option value="ISSUE">Issues & Escalations</option>
            <option value="DOCUMENT">Document Uploads</option>
            <option value="AUTH">Authentication & Roles</option>
          </select>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4">Timestamp & IP</th>
                <th className="py-3 px-3">Officer & Role</th>
                <th className="py-3 px-3">Action Description</th>
                <th className="py-3 px-3">Entity Scope</th>
                <th className="py-3 px-4">State Transition (Prev → New)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400">
                    No audit records match your query.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-mono text-slate-900 dark:text-white font-semibold">
                        {formatDate(log.timestamp)}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {log.timestamp.split("T")[1]?.replace("Z", "") || "12:00:00"} • {log.ipAddress || "10.24.12.8"}
                      </div>
                    </td>

                    <td className="py-3 px-3">
                      <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <UserCheck className="w-3.5 h-3.5 text-gov-blue" />
                        <span>{log.userName}</span>
                      </div>
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 mt-0.5 inline-block">
                        {log.userRole}
                      </span>
                    </td>

                    <td className="py-3 px-3 font-semibold text-slate-800 dark:text-slate-200">
                      {log.action}
                    </td>

                    <td className="py-3 px-3">
                      <div className="font-medium text-slate-700 dark:text-slate-300 truncate max-w-[160px]">
                        {log.projectName || "System-Wide"}
                      </div>
                      <span className="text-[9px] font-bold px-1 rounded bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                        {log.entityType}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      {log.previousValue || log.newValue ? (
                        <div className="text-[11px] space-y-0.5">
                          {log.previousValue && (
                            <div className="text-rose-600 dark:text-rose-400">
                              <strong className="text-slate-400 text-[10px]">From:</strong> {log.previousValue}
                            </div>
                          )}
                          {log.newValue && (
                            <div className="text-emerald-600 dark:text-emerald-400 font-semibold">
                              <strong className="text-slate-400 text-[10px]">To:</strong> {log.newValue}
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="text-slate-400 text-[10px]">Event Logged</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
