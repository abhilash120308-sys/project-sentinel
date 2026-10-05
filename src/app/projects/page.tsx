"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { 
  FolderKanban, 
  Search, 
  Filter, 
  Plus, 
  Grid, 
  List, 
  MapPin, 
  Calendar, 
  IndianRupee, 
  BrainCircuit, 
  ArrowUpRight,
  ShieldCheck,
  Building2,
  Clock
} from "lucide-react";
import { 
  getStatusBadgeClass, 
  getPriorityBadgeClass, 
  formatCurrencyINR, 
  formatDate,
  getHealthScoreColor,
  getDaysRemaining
} from "@/lib/utils";
import { CreateProjectModal } from "@/components/projects/CreateProjectModal";

export default function ProjectsDirectoryPage() {
  const { 
    projects, 
    departments, 
    currentUser, 
    searchQuery, 
    setSearchQuery,
    selectedDepartment,
    setSelectedDepartment,
    selectedStatus,
    setSelectedStatus,
    selectedPriority,
    setSelectedPriority
  } = useApp();

  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const canCreate = currentUser.role === "SUPER_ADMIN" || currentUser.role === "PROJECT_ADMIN" || currentUser.role === "PROJECT_MANAGER";

  // Filter projects
  const filteredProjects = projects.filter((p) => {
    const matchesDept = selectedDepartment === "ALL" || p.departmentId === selectedDepartment;
    const matchesStatus = selectedStatus === "ALL" || p.status === selectedStatus;
    const matchesPriority = selectedPriority === "ALL" || p.priority === selectedPriority;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      p.name.toLowerCase().includes(q) ||
      p.code.toLowerCase().includes(q) ||
      p.location.state.toLowerCase().includes(q) ||
      p.managerName.toLowerCase().includes(q);

    return matchesDept && matchesStatus && matchesPriority && matchesSearch;
  });

  return (
    <div className="space-y-5">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-heading tracking-tight flex items-center gap-2.5">
            <FolderKanban className="w-6 h-6 text-gov-blue" />
            <span>National Infrastructure Projects Directory</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Comprehensive registry of all centrally sanctioned schemes and major state infrastructure outlays
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* View Toggle */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === "grid" ? "bg-white dark:bg-slate-700 text-gov-blue shadow-sm" : "text-slate-400"
              }`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === "table" ? "bg-white dark:bg-slate-700 text-gov-blue shadow-sm" : "text-slate-400"
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {canCreate && (
            <button
              onClick={() => setIsCreateOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-gov-blue hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-900/20 transition-all shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Enroll Project</span>
            </button>
          )}
        </div>
      </div>

      {/* Advanced Filter Toolbar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search projects by ID, Name, State, Manager..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-gov-blue"
          />
        </div>

        {/* Department */}
        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          className="text-xs py-1.5 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-medium text-slate-800 dark:text-slate-200"
        >
          <option value="ALL">All Departments ({departments.length})</option>
          {departments.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>

        {/* Status */}
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="text-xs py-1.5 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-medium text-slate-800 dark:text-slate-200"
        >
          <option value="ALL">All Statuses</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="AT_RISK">At Risk</option>
          <option value="DELAYED">Delayed</option>
          <option value="COMPLETED">Completed</option>
          <option value="PLANNING">Planning</option>
          <option value="ON_HOLD">On Hold</option>
        </select>

        {/* Priority */}
        <select
          value={selectedPriority}
          onChange={(e) => setSelectedPriority(e.target.value)}
          className="text-xs py-1.5 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-medium text-slate-800 dark:text-slate-200"
        >
          <option value="ALL">All Priorities</option>
          <option value="CRITICAL">Critical Priority</option>
          <option value="HIGH">High Priority</option>
          <option value="MEDIUM">Medium Priority</option>
        </select>
      </div>

      {/* Projects Display: Grid Mode */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.length === 0 ? (
            <div className="col-span-3 bg-white dark:bg-slate-900 rounded-2xl p-12 text-center text-slate-400 border border-slate-200 dark:border-slate-800">
              No infrastructure projects match your filters.
            </div>
          ) : (
            filteredProjects.map((p) => {
              const healthColors = getHealthScoreColor(p.aiInsight?.healthScore || 75);
              const daysInfo = getDaysRemaining(p.targetEndDate);

              return (
                <div
                  key={p.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Badges */}
                    <div className="flex items-center justify-between gap-1 mb-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadgeClass(p.status)}`}>
                        {p.status.replace(/_/g, " ")}
                      </span>
                      <div className={`px-2 py-0.5 rounded-lg text-[10px] font-black border flex items-center gap-1 ${healthColors.bg} ${healthColors.text} ${healthColors.border}`}>
                        <BrainCircuit className="w-3 h-3" />
                        <span>Health: {p.aiInsight?.healthScore}/100</span>
                      </div>
                    </div>

                    {/* Title & Code */}
                    <Link href={`/projects/${p.id}`} className="group-hover:text-gov-blue transition-colors">
                      <h3 className="font-bold text-sm text-slate-900 dark:text-white leading-snug line-clamp-2">
                        {p.name}
                      </h3>
                    </Link>

                    <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1.5 font-semibold">
                      <span className="font-mono text-slate-600 dark:text-slate-400">{p.code}</span>
                      <span>•</span>
                      <span className="truncate">{p.departmentName}</span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                      {p.description}
                    </p>

                    {/* Progress Bar */}
                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex justify-between items-center text-xs font-semibold mb-1">
                        <span className="text-slate-500">Physical Progress</span>
                        <span className="text-slate-900 dark:text-white font-mono font-bold">{p.physicalProgress}%</span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-gov-blue h-full rounded-full transition-all"
                          style={{ width: `${p.physicalProgress}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Footer Meta */}
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">
                        {formatCurrencyINR(p.sanctionedBudget)}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {p.location.district}, {p.location.state}
                      </div>
                    </div>

                    <Link
                      href={`/projects/${p.id}`}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-gov-blue hover:text-white dark:hover:bg-gov-blue font-bold text-xs transition-colors flex items-center gap-1"
                    >
                      <span>Explore</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })
          )}
        </div>
      ) : (
        /* Table Mode */
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4">Code & Project</th>
                <th className="py-3 px-3">Department</th>
                <th className="py-3 px-3">State</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Physical %</th>
                <th className="py-3 px-3">Sanctioned</th>
                <th className="py-3 px-3">AI Health</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredProjects.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                    <Link href={`/projects/${p.id}`} className="hover:text-gov-blue">
                      {p.name}
                    </Link>
                    <div className="text-[10px] font-mono text-slate-400">{p.code}</div>
                  </td>
                  <td className="py-3 px-3">{p.departmentName}</td>
                  <td className="py-3 px-3">{p.location.state}</td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadgeClass(p.status)}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-bold font-mono">{p.physicalProgress}%</td>
                  <td className="py-3 px-3 font-bold">{formatCurrencyINR(p.sanctionedBudget)}</td>
                  <td className="py-3 px-3 font-bold">{p.aiInsight?.healthScore}/100</td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      href={`/projects/${p.id}`}
                      className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-gov-blue hover:text-white font-semibold"
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Create Project Modal */}
      <CreateProjectModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} />
    </div>
  );
}
