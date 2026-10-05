"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Issue, Risk, IssuePriority, IssueStatus, IssueCategory } from "@/types";
import { 
  AlertOctagon, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  Plus, 
  Search, 
  Filter, 
  ArrowUpRight, 
  Send,
  UserCheck,
  Calendar,
  X,
  Sparkles
} from "lucide-react";
import { getIssueStatusBadgeClass, getPriorityBadgeClass, formatDate } from "@/lib/utils";

interface IssueRiskManagerProps {
  projectId?: string;
}

export const IssueRiskManager: React.FC<IssueRiskManagerProps> = ({ projectId }) => {
  const { projects, addIssue, updateIssue, escalateIssue, addRisk, updateRisk, currentUser } = useApp();

  const [activeTab, setActiveTab] = useState<"issues" | "risks">("issues");
  const [search, setSearch] = useState("");
  const [filterPriority, setFilterPriority] = useState<string>("ALL");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");

  // Modals state
  const [isAddIssueOpen, setIsAddIssueOpen] = useState(false);
  const [isAddRiskOpen, setIsAddRiskOpen] = useState(false);

  // Issue Form state
  const [issueProjId, setIssueProjId] = useState(projectId || projects[0]?.id || "");
  const [issueTitle, setIssueTitle] = useState("");
  const [issueDesc, setIssueDesc] = useState("");
  const [issueCategory, setIssueCategory] = useState<IssueCategory>("LAND_ACQUISITION");
  const [issuePriority, setIssuePriority] = useState<IssuePriority>("CRITICAL");
  const [issueDeadline, setIssueDeadline] = useState("2026-09-30");

  // Risk Form state
  const [riskProjId, setRiskProjId] = useState(projectId || projects[0]?.id || "");
  const [riskTitle, setRiskTitle] = useState("");
  const [riskCategory, setRiskCategory] = useState("Geological / Environmental");
  const [riskProb, setRiskProb] = useState<Risk["probability"]>("HIGH");
  const [riskImpact, setRiskImpact] = useState<Risk["impact"]>("CRITICAL");
  const [riskMitigation, setRiskMitigation] = useState("");

  const relevantProjects = projectId ? projects.filter((p) => p.id === projectId) : projects;

  // Flattened Issues
  const allIssues = relevantProjects.flatMap((p) =>
    (p.issues || []).map((i) => ({
      ...i,
      projectName: p.name,
      projectCode: p.code,
      departmentName: p.departmentName,
    }))
  );

  // Flattened Risks
  const allRisks = relevantProjects.flatMap((p) =>
    (p.risks || []).map((r) => ({
      ...r,
      projectName: p.name,
      projectCode: p.code,
    }))
  );

  const filteredIssues = allIssues.filter((i) => {
    const matchesPriority = filterPriority === "ALL" || i.priority === filterPriority;
    const matchesStatus = filterStatus === "ALL" || i.status === filterStatus;
    const q = search.toLowerCase();
    const matchesSearch = 
      i.title.toLowerCase().includes(q) ||
      i.description.toLowerCase().includes(q) ||
      i.projectName.toLowerCase().includes(q);
    return matchesPriority && matchesStatus && matchesSearch;
  });

  const handleCreateIssue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!issueTitle.trim() || !issueProjId) return;

    addIssue(issueProjId, {
      projectId: issueProjId,
      title: issueTitle,
      description: issueDesc,
      category: issueCategory,
      priority: issuePriority,
      status: "OPEN",
      assignedOfficer: currentUser.id,
      assignedOfficerName: currentUser.name,
      deadline: issueDeadline,
    });

    setIsAddIssueOpen(false);
    setIssueTitle("");
    setIssueDesc("");
  };

  const handleCreateRisk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!riskTitle.trim() || !riskProjId) return;

    let computedScore = 30;
    if (riskImpact === "CRITICAL") computedScore += 45;
    else if (riskImpact === "HIGH") computedScore += 30;
    if (riskProb === "HIGH") computedScore += 25;
    else if (riskProb === "MEDIUM") computedScore += 15;

    addRisk(riskProjId, {
      projectId: riskProjId,
      title: riskTitle,
      category: riskCategory,
      probability: riskProb,
      impact: riskImpact,
      mitigationPlan: riskMitigation,
      status: "IDENTIFIED",
      riskScore: Math.min(100, computedScore),
    });

    setIsAddRiskOpen(false);
    setRiskTitle("");
    setRiskMitigation("");
  };

  return (
    <div className="space-y-4">
      {/* Top Header & Tab Switcher */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("issues")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === "issues"
                ? "bg-gov-navy text-white shadow-md shadow-blue-900/20"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <AlertOctagon className="w-4 h-4 text-rose-400" />
            <span>Project Bottlenecks & Escalations ({allIssues.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("risks")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === "risks"
                ? "bg-gov-navy text-white shadow-md shadow-blue-900/20"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span>Risk Heatmap & Mitigation Matrix ({allRisks.length})</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          {activeTab === "issues" ? (
            <button
              onClick={() => setIsAddIssueOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Report Bottleneck Issue</span>
            </button>
          ) : (
            <button
              onClick={() => setIsAddRiskOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Register New Risk</span>
            </button>
          )}
        </div>
      </div>

      {/* ISSUES TAB */}
      {activeTab === "issues" && (
        <div className="space-y-3">
          {/* Filter Bar */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search issues..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg"
              />
            </div>

            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="text-xs py-1.5 px-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg font-medium"
            >
              <option value="ALL">All Priorities</option>
              <option value="CRITICAL">Critical Priority</option>
              <option value="HIGH">High Priority</option>
              <option value="MEDIUM">Medium Priority</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="text-xs py-1.5 px-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg font-medium"
            >
              <option value="ALL">All Statuses</option>
              <option value="OPEN">Open</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="ESCALATED">Escalated to Ministry</option>
              <option value="RESOLVED">Resolved</option>
            </select>
          </div>

          {/* Issues List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredIssues.length === 0 ? (
              <div className="col-span-2 bg-white dark:bg-slate-900 rounded-2xl p-8 text-center text-slate-400 border border-slate-200 dark:border-slate-800">
                No issues match your filter criteria.
              </div>
            ) : (
              filteredIssues.map((issue) => (
                <div
                  key={issue.id}
                  className={`bg-white dark:bg-slate-900 rounded-2xl p-5 border shadow-sm flex flex-col justify-between transition-all ${
                    issue.status === "ESCALATED"
                      ? "border-purple-300 dark:border-purple-900/60 bg-purple-50/30 dark:bg-purple-950/20"
                      : issue.priority === "CRITICAL"
                      ? "border-rose-200 dark:border-rose-900/40"
                      : "border-slate-200 dark:border-slate-800"
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getIssueStatusBadgeClass(issue.status)}`}>
                        {issue.status}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getPriorityBadgeClass(issue.priority)}`}>
                        {issue.priority}
                      </span>
                    </div>

                    <h4 className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
                      {issue.title}
                    </h4>

                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                      {issue.description}
                    </p>

                    {issue.resolution && (
                      <div className="mt-2.5 p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-[11px] text-emerald-900 dark:text-emerald-300">
                        <strong>Resolution:</strong> {issue.resolution}
                      </div>
                    )}

                    {issue.escalatedTo && (
                      <div className="mt-2 p-2 rounded-xl bg-purple-100 dark:bg-purple-950/60 border border-purple-300 dark:border-purple-800 text-[11px] text-purple-900 dark:text-purple-300 font-semibold flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-purple-500" />
                        <span>Escalated to: {issue.escalatedTo}</span>
                      </div>
                    )}
                  </div>

                  {/* Footer metadata & escalation actions */}
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
                    <div>
                      <div className="font-semibold text-slate-800 dark:text-slate-200">{issue.projectName}</div>
                      <div className="text-[10px]">Assigned: {issue.assignedOfficerName} • Due: {formatDate(issue.deadline)}</div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {issue.status !== "RESOLVED" && (
                        <button
                          onClick={() => updateIssue(issue.projectId, issue.id, { status: "RESOLVED", resolution: "Resolved on ground after site engineering inspection." })}
                          className="px-2.5 py-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 rounded-lg font-bold hover:bg-emerald-200"
                        >
                          Mark Resolved
                        </button>
                      )}

                      {issue.status !== "ESCALATED" && issue.status !== "RESOLVED" && (
                        <button
                          onClick={() => escalateIssue(issue.projectId, issue.id, "MoSPI High-Powered Review Committee")}
                          className="px-2.5 py-1 bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 rounded-lg font-bold hover:bg-purple-200 flex items-center gap-1"
                        >
                          <Send className="w-3 h-3" />
                          <span>Escalate</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* RISKS TAB */}
      {activeTab === "risks" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {allRisks.map((risk) => (
              <div
                key={risk.id}
                className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {risk.category}
                    </span>
                    <span className={`text-xs font-black px-2 py-0.5 rounded-full ${
                      risk.riskScore > 70 ? "bg-rose-100 text-rose-700" : risk.riskScore > 40 ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"
                    }`}>
                      Risk Score: {risk.riskScore}/100
                    </span>
                  </div>

                  <h4 className="font-bold text-xs text-slate-900 dark:text-white mb-1">
                    {risk.title}
                  </h4>
                  <div className="text-[11px] text-slate-500 font-semibold mb-2">
                    {risk.projectName}
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 text-xs">
                    <strong className="text-slate-700 dark:text-slate-300 block mb-0.5">Mitigation Strategy:</strong>
                    <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                      {risk.mitigationPlan}
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] text-slate-400 font-medium">
                  <span>Prob: <strong className="text-slate-700 dark:text-slate-200">{risk.probability}</strong></span>
                  <span>Impact: <strong className="text-slate-700 dark:text-slate-200">{risk.impact}</strong></span>
                  <span className="font-bold text-amber-500">{risk.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Issue Modal */}
      {isAddIssueOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full shadow-2xl p-5 text-xs">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <AlertOctagon className="w-4 h-4 text-rose-500" />
              <span>Log Infrastructure Bottleneck Issue</span>
            </h3>

            <form onSubmit={handleCreateIssue} className="space-y-3">
              <div>
                <label className="block font-semibold mb-1">Target Project</label>
                <select
                  value={issueProjId}
                  onChange={(e) => setIssueProjId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-semibold"
                >
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Issue Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Forest clearance delay for 14km stretch in wildlife corridor"
                  value={issueTitle}
                  onChange={(e) => setIssueTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Category</label>
                  <select
                    value={issueCategory}
                    onChange={(e) => setIssueCategory(e.target.value as IssueCategory)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg"
                  >
                    <option value="LAND_ACQUISITION">Land Acquisition</option>
                    <option value="ENVIRONMENTAL">Environmental & Forest</option>
                    <option value="APPROVAL">Statutory Approvals</option>
                    <option value="FINANCIAL">Financial / Liquidity</option>
                    <option value="TECHNICAL">Engineering & Technical</option>
                    <option value="RESOURCE">Labor & Machinery Shortage</option>
                    <option value="LEGAL">Legal / Litigation</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Priority</label>
                  <select
                    value={issuePriority}
                    onChange={(e) => setIssuePriority(e.target.value as IssuePriority)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-bold"
                  >
                    <option value="CRITICAL">Critical (Immediate Action)</option>
                    <option value="HIGH">High</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="LOW">Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Detailed Description & Ground Impact</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe the roadblock, specific location chainage, and affected project milestones..."
                  value={issueDesc}
                  onChange={(e) => setIssueDesc(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddIssueOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold"
                >
                  Submit Issue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Risk Modal */}
      {isAddRiskOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full shadow-2xl p-5 text-xs">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-500" />
              <span>Register New Risk & Mitigation Plan</span>
            </h3>

            <form onSubmit={handleCreateRisk} className="space-y-3">
              <div>
                <label className="block font-semibold mb-1">Target Project</label>
                <select
                  value={riskProjId}
                  onChange={(e) => setRiskProjId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-semibold"
                >
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Risk Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Extreme monsoon water table rise risking foundation collapse"
                  value={riskTitle}
                  onChange={(e) => setRiskTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Probability</label>
                  <select
                    value={riskProb}
                    onChange={(e) => setRiskProb(e.target.value as Risk["probability"])}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg"
                  >
                    <option value="HIGH">High Probability</option>
                    <option value="MEDIUM">Medium Probability</option>
                    <option value="LOW">Low Probability</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Impact</label>
                  <select
                    value={riskImpact}
                    onChange={(e) => setRiskImpact(e.target.value as Risk["impact"])}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-bold"
                  >
                    <option value="CRITICAL">Critical Impact</option>
                    <option value="HIGH">High Impact</option>
                    <option value="MEDIUM">Medium Impact</option>
                    <option value="LOW">Low Impact</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Pre-emptive Mitigation Plan</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Detail preventative engineering measures, early warning sensors, and contingency steps..."
                  value={riskMitigation}
                  onChange={(e) => setRiskMitigation(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddRiskOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold"
                >
                  Register Risk
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
