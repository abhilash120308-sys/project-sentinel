"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { Milestone, MilestoneStatus, Project } from "@/types";
import { 
  getMilestoneStatusBadgeClass, 
  formatDate, 
  getDaysRemaining 
} from "@/lib/utils";
import { 
  Milestone as MilestoneIcon, 
  Calendar, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  Plus, 
  Search, 
  Filter, 
  Layers, 
  ArrowRight,
  UserCheck,
  Building
} from "lucide-react";

interface GanttTimelineProps {
  projectId?: string; // Optional: if provided, filters for single project
  onOpenAddMilestone?: () => void;
}

export const GanttTimeline: React.FC<GanttTimelineProps> = ({ projectId, onOpenAddMilestone }) => {
  const { projects, updateMilestone, currentUser } = useApp();
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [search, setSearch] = useState<string>("");
  const [editingMilestone, setEditingMilestone] = useState<{ projectId: string; milestone: Milestone } | null>(null);
  const [updateProgressVal, setUpdateProgressVal] = useState<number>(0);
  const [updateStatusVal, setUpdateStatusVal] = useState<MilestoneStatus>("ON_TRACK");

  const canEdit = currentUser.role !== "VIEWER";

  // Filter projects & milestones
  const relevantProjects = projectId ? projects.filter((p) => p.id === projectId) : projects;

  // Flatten milestones with project context
  const allMilestonesWithProj = relevantProjects.flatMap((p) =>
    (p.milestones || []).map((m) => ({
      ...m,
      projectName: p.name,
      projectCode: p.code,
      projectDepartment: p.departmentName,
    }))
  );

  const filteredMilestones = allMilestonesWithProj.filter((m) => {
    const matchesStatus = selectedStatus === "ALL" || m.status === selectedStatus;
    const q = search.toLowerCase();
    const matchesSearch = 
      m.title.toLowerCase().includes(q) ||
      m.projectName.toLowerCase().includes(q) ||
      m.assignedOfficerName.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  const handleOpenEdit = (projId: string, m: Milestone) => {
    if (!canEdit) return;
    setEditingMilestone({ projectId: projId, milestone: m });
    setUpdateProgressVal(m.progressPercentage);
    setUpdateStatusVal(m.status);
  };

  const handleSaveMilestoneUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMilestone) return;

    let computedStatus = updateStatusVal;
    if (updateProgressVal === 100) {
      computedStatus = "COMPLETED";
    }

    updateMilestone(editingMilestone.projectId, editingMilestone.milestone.id, {
      progressPercentage: updateProgressVal,
      status: computedStatus,
      completionDate: updateProgressVal === 100 ? new Date().toISOString().split("T")[0] : undefined,
    });

    setEditingMilestone(null);
  };

  return (
    <div className="space-y-4">
      {/* Top Controls & Legend */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          {/* Quick Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search milestones, projects, officers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-gov-blue"
            />
          </div>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="text-xs py-1.5 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 font-medium focus:outline-none focus:ring-1 focus:ring-gov-blue"
          >
            <option value="ALL">All Milestones ({allMilestonesWithProj.length})</option>
            <option value="ON_TRACK">On Track (Green)</option>
            <option value="AT_RISK">At Risk (Yellow)</option>
            <option value="DELAYED">Delayed (Red)</option>
            <option value="COMPLETED">Completed (Blue)</option>
          </select>

          {/* MoSPI Standard Color Code Legend */}
          <div className="hidden lg:flex items-center gap-3 text-[11px] font-semibold pl-2 border-l border-slate-200 dark:border-slate-800">
            <span className="text-slate-400">MoSPI Standards:</span>
            <span className="flex items-center gap-1 text-emerald-600"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> On Track</span>
            <span className="flex items-center gap-1 text-amber-600"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> At Risk</span>
            <span className="flex items-center gap-1 text-rose-600"><span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Delayed</span>
            <span className="flex items-center gap-1 text-blue-600"><span className="w-2.5 h-2.5 rounded-full bg-blue-600" /> Completed</span>
          </div>
        </div>

        {onOpenAddMilestone && canEdit && (
          <button
            onClick={onOpenAddMilestone}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gov-blue hover:bg-blue-700 text-white font-bold text-xs rounded-lg shadow-sm transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Milestone</span>
          </button>
        )}
      </div>

      {/* Timeline Gantt Cards List */}
      <div className="space-y-3">
        {filteredMilestones.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 text-center text-slate-400 border border-slate-200 dark:border-slate-800">
            No milestones found matching the selected filter.
          </div>
        ) : (
          filteredMilestones.map((m) => {
            const daysInfo = getDaysRemaining(m.dueDate);
            const isCompleted = m.status === "COMPLETED" || m.progressPercentage === 100;

            // Bar background color per MoSPI specs
            let barColor = "bg-emerald-500";
            if (isCompleted) barColor = "bg-blue-600";
            else if (m.status === "DELAYED" || daysInfo.isOverdue) barColor = "bg-rose-500";
            else if (m.status === "AT_RISK") barColor = "bg-amber-500";

            return (
              <div
                key={m.id}
                className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-2">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 shrink-0 mt-0.5 font-bold text-xs">
                      {m.weightage}%
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                          {m.title}
                        </h4>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getMilestoneStatusBadgeClass(m.status)}`}>
                          {m.status.replace(/_/g, " ")}
                        </span>
                        {daysInfo.isOverdue && !isCompleted && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-300 animate-pulse">
                            ⚠️ Overdue by {daysInfo.days} days
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {m.description}
                      </p>
                      <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1 flex-wrap">
                        <span className="text-slate-700 dark:text-slate-300 font-semibold">{m.projectName}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <UserCheck className="w-3 h-3 text-slate-400" />
                          <span>{m.assignedOfficerName}</span>
                        </span>
                        <span>•</span>
                        <span>Weightage: {m.weightage}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions & Dates */}
                  <div className="flex items-center gap-3 self-end md:self-auto shrink-0">
                    <div className="text-right text-xs">
                      <div className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1 justify-end">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>Due: {formatDate(m.dueDate)}</span>
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Started: {formatDate(m.startDate)}
                      </div>
                    </div>

                    {canEdit && (
                      <button
                        onClick={() => handleOpenEdit(m.projectId, m)}
                        className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-gov-blue hover:text-white dark:hover:bg-gov-blue rounded-lg text-xs font-semibold transition-colors"
                      >
                        Update Progress
                      </button>
                    )}
                  </div>
                </div>

                {/* Visual Gantt Progress Bar */}
                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex justify-between items-center text-[11px] font-semibold mb-1">
                    <span className="text-slate-600 dark:text-slate-400">Milestone Physical Completion</span>
                    <span className="text-slate-900 dark:text-white font-bold">{m.progressPercentage}%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${barColor}`}
                      style={{ width: `${m.progressPercentage}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Edit Milestone Progress Modal */}
      {editingMilestone && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full shadow-2xl p-5 text-xs">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1">
              Update Milestone Progress
            </h3>
            <p className="text-slate-500 mb-4">{editingMilestone.milestone.title}</p>

            <form onSubmit={handleSaveMilestoneUpdate} className="space-y-4">
              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <label>Completion Percentage</label>
                  <span className="text-gov-blue font-bold text-sm">{updateProgressVal}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={updateProgressVal}
                  onChange={(e) => setUpdateProgressVal(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-gov-blue"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Milestone Status</label>
                <select
                  value={updateStatusVal}
                  onChange={(e) => setUpdateStatusVal(e.target.value as MilestoneStatus)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 font-semibold"
                >
                  <option value="ON_TRACK">🟢 On Track (Green)</option>
                  <option value="AT_RISK">🟡 At Risk (Yellow)</option>
                  <option value="DELAYED">🔴 Delayed (Red)</option>
                  <option value="COMPLETED">🔵 Completed (Blue)</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingMilestone(null)}
                  className="px-3.5 py-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-gov-blue hover:bg-blue-700 text-white font-bold"
                >
                  Save Progress
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
