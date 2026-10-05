"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { Project, ProjectStatus } from "@/types";
import { 
  getStatusBadgeClass, 
  getPriorityBadgeClass, 
  formatCurrencyINR, 
  formatDate,
  getHealthScoreColor
} from "@/lib/utils";
import { 
  ArrowUpRight, 
  Search, 
  Filter, 
  MoreHorizontal, 
  BrainCircuit, 
  MapPin, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Eye,
  Plus
} from "lucide-react";

interface RecentProjectsTableProps {
  onOpenCreateModal?: () => void;
}

export const RecentProjectsTable: React.FC<RecentProjectsTableProps> = ({ onOpenCreateModal }) => {
  const { projects, currentUser } = useApp();
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [search, setSearch] = useState<string>("");

  const canCreate = currentUser.role === "SUPER_ADMIN" || currentUser.role === "PROJECT_ADMIN" || currentUser.role === "PROJECT_MANAGER";

  const filtered = projects.filter((p) => {
    const matchesStatus = filterStatus === "ALL" || p.status === filterStatus;
    const q = search.toLowerCase();
    const matchesSearch = 
      p.name.toLowerCase().includes(q) ||
      p.code.toLowerCase().includes(q) ||
      p.departmentName.toLowerCase().includes(q) ||
      p.location.state.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      {/* Table Header Controls */}
      <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">
            Monitored Infrastructure Projects
          </h3>
          <p className="text-xs text-slate-500">
            Real-time status, physical delivery, fund utilization and AI health score
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Quick Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter list..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-gov-blue"
            />
          </div>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="text-xs py-1.5 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 font-medium focus:outline-none focus:ring-1 focus:ring-gov-blue"
          >
            <option value="ALL">All Statuses ({projects.length})</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="AT_RISK">At Risk</option>
            <option value="DELAYED">Delayed</option>
            <option value="COMPLETED">Completed</option>
            <option value="PLANNING">Planning</option>
            <option value="ON_HOLD">On Hold</option>
          </select>

          {/* Create Project Button */}
          {canCreate && onOpenCreateModal && (
            <button
              onClick={onOpenCreateModal}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gov-blue hover:bg-blue-700 text-white font-bold text-xs rounded-lg shadow-sm transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Register Project</span>
            </button>
          )}
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
          <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="py-3 px-4">Project & Department</th>
              <th className="py-3 px-3">State & Location</th>
              <th className="py-3 px-3">Status & Priority</th>
              <th className="py-3 px-3">Physical Progress</th>
              <th className="py-3 px-3">Budget (₹ Cr)</th>
              <th className="py-3 px-3">AI Health</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-slate-400">
                  No projects match your filter criteria.
                </td>
              </tr>
            ) : (
              filtered.map((proj) => {
                const healthColors = getHealthScoreColor(proj.aiInsight?.healthScore || 75);
                const progressVariance = (proj.plannedProgress || 0) - (proj.physicalProgress || 0);

                return (
                  <tr
                    key={proj.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors group"
                  >
                    {/* Project & Department */}
                    <td className="py-3 px-4">
                      <Link href={`/projects/${proj.id}`} className="group-hover:text-gov-blue transition-colors">
                        <div className="font-bold text-slate-900 dark:text-white leading-tight">
                          {proj.name}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
                          <span className="font-mono font-medium">{proj.code}</span>
                          <span>•</span>
                          <span className="truncate max-w-[200px]">{proj.departmentName}</span>
                        </div>
                      </Link>
                    </td>

                    {/* State & Location */}
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1 text-slate-800 dark:text-slate-200 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{proj.location.state}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 truncate max-w-[130px]">
                        {proj.location.district}
                      </div>
                    </td>

                    {/* Status & Priority */}
                    <td className="py-3 px-3">
                      <div className="flex flex-col gap-1 items-start">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadgeClass(proj.status)}`}>
                          {proj.status.replace(/_/g, " ")}
                        </span>
                        <span className={`px-1.5 py-0.2 text-[9px] rounded font-semibold border ${getPriorityBadgeClass(proj.priority)}`}>
                          {proj.priority} Priority
                        </span>
                      </div>
                    </td>

                    {/* Physical Progress */}
                    <td className="py-3 px-3">
                      <div className="w-32">
                        <div className="flex justify-between items-center text-[11px] font-semibold mb-1">
                          <span className="text-slate-900 dark:text-white">{proj.physicalProgress}%</span>
                          <span className="text-[10px] text-slate-400">Target: {proj.plannedProgress}%</span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              progressVariance > 10 ? "bg-rose-500" : progressVariance > 5 ? "bg-amber-500" : "bg-emerald-500"
                            }`}
                            style={{ width: `${proj.physicalProgress}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Budget & Utilized */}
                    <td className="py-3 px-3">
                      <div className="font-bold text-slate-900 dark:text-white">
                        {formatCurrencyINR(proj.sanctionedBudget)}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        Utilized: {formatCurrencyINR(proj.utilizedBudget)} ({proj.releasedBudget > 0 ? Math.round((proj.utilizedBudget / proj.releasedBudget) * 100) : 0}%)
                      </div>
                    </td>

                    {/* AI Health Score */}
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1.5">
                        <div className={`px-2 py-1 rounded-lg text-xs font-black border flex items-center gap-1 ${healthColors.bg} ${healthColors.text} ${healthColors.border}`}>
                          <BrainCircuit className="w-3.5 h-3.5" />
                          <span>{proj.aiInsight?.healthScore || 75}/100</span>
                        </div>
                        {proj.aiInsight?.delayProbability && proj.aiInsight.delayProbability > 60 && (
                          <span className="text-[10px] text-rose-500 font-bold" title="High delay risk">
                            ⚠️ {proj.aiInsight.delayProbability}% Delay
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <Link
                        href={`/projects/${proj.id}`}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-gov-blue hover:text-white dark:hover:bg-gov-blue transition-colors font-semibold text-[11px]"
                      >
                        <span>Details</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Footer count */}
      <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
        <span>Showing {filtered.length} of {projects.length} National Projects</span>
        <Link href="/projects" className="text-gov-blue font-bold hover:underline">
          Open Full Project Directory →
        </Link>
      </div>
    </div>
  );
};
