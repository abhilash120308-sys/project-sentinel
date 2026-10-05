"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { Project, ProgressUpdate } from "@/types";
import { 
  getStatusBadgeClass, 
  getPriorityBadgeClass, 
  formatCurrencyINR, 
  formatDate,
  getHealthScoreColor,
  getDaysRemaining
} from "@/lib/utils";
import { 
  ArrowLeft, 
  FolderKanban, 
  Milestone, 
  IndianRupee, 
  AlertOctagon, 
  BrainCircuit, 
  FileText, 
  History, 
  MapPin, 
  Calendar, 
  UserCheck, 
  Plus, 
  UploadCloud, 
  Sparkles, 
  Activity, 
  TrendingUp, 
  ShieldAlert,
  CheckCircle2,
  Trash2,
  Edit,
  X,
  Camera
} from "lucide-react";
import { GanttTimeline } from "@/components/milestones/GanttTimeline";

interface ProjectDetailViewProps {
  projectId: string;
}

export const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({ projectId }) => {
  const router = useRouter();
  const { projects, deleteProject, addProgressUpdate, currentUser } = useApp();

  const [activeTab, setActiveTab] = useState<"overview" | "milestones" | "progress" | "budget" | "issues" | "ai" | "documents">("overview");
  const [isAddProgressOpen, setIsAddProgressOpen] = useState(false);

  // Progress submission form
  const [newPhysical, setNewPhysical] = useState("75");
  const [newFinancial, setNewFinancial] = useState("70");
  const [workCompleted, setWorkCompleted] = useState("");
  const [challenges, setChallenges] = useState("");
  const [nextActivities, setNextActivities] = useState("");

  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-4">
        <h3 className="font-bold text-lg text-slate-900 dark:text-white">Project Not Found</h3>
        <p className="text-xs text-slate-500">The requested infrastructure project ID &quot;{projectId}&quot; does not exist or has been archived.</p>
        <Link href="/projects" className="inline-flex items-center gap-1.5 px-4 py-2 bg-gov-blue text-white font-bold text-xs rounded-xl">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Project Directory</span>
        </Link>
      </div>
    );
  }

  const healthColors = getHealthScoreColor(project.aiInsight?.healthScore || 75);
  const daysInfo = getDaysRemaining(project.targetEndDate);
  const canEdit = currentUser.role !== "VIEWER";

  const handleProgressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProgressUpdate(project.id, {
      projectId: project.id,
      physicalProgress: parseFloat(newPhysical) || project.physicalProgress,
      financialProgress: parseFloat(newFinancial) || project.financialProgress,
      workCompleted: workCompleted.trim() || "Completed scheduled foundation casting and structural inspection.",
      currentChallenges: challenges.trim() || "None reported for current sprint.",
      nextPlannedActivities: nextActivities.trim() || "Mobilizing additional crews for next milestone stage.",
      photos: ["https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600&auto=format&fit=crop&q=80"],
      documents: ["PROGRESS-VERIFICATION.pdf"],
      geoVerification: {
        lat: project.location.lat,
        lng: project.location.lng,
        verified: true,
      },
    });

    setIsAddProgressOpen(false);
    setWorkCompleted("");
    setChallenges("");
    setNextActivities("");
  };

  const handleDelete = () => {
    if (confirm(`Are you sure you want to archive "${project.name}"?`)) {
      deleteProject(project.id);
      router.push("/projects");
    }
  };

  return (
    <div className="space-y-5">
      {/* Top Breadcrumbs & Back Bar */}
      <div className="flex items-center justify-between">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-gov-blue transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Projects Directory</span>
        </Link>

        {canEdit && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAddProgressOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gov-blue hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Submit Progress Update</span>
            </button>
            {(currentUser.role === "SUPER_ADMIN" || currentUser.role === "PROJECT_ADMIN") && (
              <button
                onClick={handleDelete}
                className="p-1.5 rounded-xl border border-rose-200 dark:border-rose-900/60 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs"
                title="Archive Project"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Hero Project Header Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusBadgeClass(project.status)}`}>
                {project.status.replace(/_/g, " ")}
              </span>
              <span className={`px-2.5 py-0.5 rounded text-xs font-bold border ${getPriorityBadgeClass(project.priority)}`}>
                {project.priority} Priority
              </span>
              <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                {project.code}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-heading tracking-tight leading-tight">
              {project.name}
            </h1>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
              {project.description}
            </p>

            {/* Quick Metadata chips */}
            <div className="flex items-center gap-4 flex-wrap text-xs text-slate-500 dark:text-slate-400 pt-1">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-gov-blue" />
                <span className="font-semibold text-slate-800 dark:text-slate-200">{project.location.district}, {project.location.state}</span>
              </div>
              <div>•</div>
              <div className="flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                <span>Nodal: <strong className="text-slate-700 dark:text-slate-300">{project.managerName}</strong></span>
              </div>
              <div>•</div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Target: <strong className="text-slate-700 dark:text-slate-300">{formatDate(project.targetEndDate)}</strong> ({daysInfo.isOverdue ? "Overdue" : `${daysInfo.days} days left`})</span>
              </div>
            </div>
          </div>

          {/* AI Health Score Badge in Hero */}
          <div className={`p-4 rounded-2xl border ${healthColors.bg} ${healthColors.border} flex flex-col items-center justify-center min-w-[170px] shrink-0 text-center shadow-sm`}>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              AI Health Score
            </div>
            <div className={`text-4xl font-black font-heading mt-1 ${healthColors.text}`}>
              {project.aiInsight?.healthScore || 75}
              <span className="text-xs text-slate-400 font-bold">/100</span>
            </div>
            <span className="text-[11px] font-bold mt-1 text-slate-700 dark:text-slate-300">
              {project.aiInsight?.riskLevel || "MEDIUM"} Risk Profile
            </span>
            <div className="text-[10px] text-slate-400 mt-0.5">
              Delay Prob: {project.aiInsight?.delayProbability || 25}%
            </div>
          </div>
        </div>

        {/* Progress Comparison Bar (Planned vs Actual vs Financial) */}
        <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800">
            <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
              <span className="text-slate-600 dark:text-slate-400">Physical Progress (Ground Delivery)</span>
              <span className="font-bold text-slate-900 dark:text-white font-mono text-sm">{project.physicalProgress}%</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
              <div className="bg-gov-blue h-full rounded-full transition-all" style={{ width: `${project.physicalProgress}%` }} />
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800">
            <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
              <span className="text-slate-600 dark:text-slate-400">Planned Target Progress (Baseline)</span>
              <span className="font-bold text-slate-900 dark:text-white font-mono text-sm">{project.plannedProgress}%</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
              <div className="bg-indigo-500 h-full rounded-full transition-all" style={{ width: `${project.plannedProgress}%` }} />
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800">
            <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
              <span className="text-slate-600 dark:text-slate-400">Financial Progress (Disbursed)</span>
              <span className="font-bold text-slate-900 dark:text-white font-mono text-sm">{project.financialProgress}%</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full transition-all" style={{ width: `${project.financialProgress}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto">
        {[
          { id: "overview", label: "Project Overview", icon: FolderKanban },
          { id: "milestones", label: `Milestones (${project.milestones?.length || 0})`, icon: Milestone },
          { id: "progress", label: `Progress Logs (${project.progressHistory?.length || 0})`, icon: Activity },
          { id: "budget", label: "Budget & Transactions", icon: IndianRupee },
          { id: "issues", label: `Issues & Risks (${(project.issues?.length || 0) + (project.risks?.length || 0)})`, icon: AlertOctagon },
          { id: "ai", label: "AI Insights Report", icon: BrainCircuit },
          { id: "documents", label: `Documents (${project.documents?.length || 0})`, icon: FileText },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                isActive
                  ? "bg-gov-navy text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Main Scope & Objectives */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Project Strategic Objectives
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800">
                {project.objectives}
              </p>

              {project.tags && project.tags.length > 0 && (
                <div className="flex items-center gap-1.5 flex-wrap pt-2">
                  <span className="text-xs font-semibold text-slate-400 mr-1">Classifications:</span>
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Milestones Snapshot */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  Key Milestone Deliverables
                </h3>
                <button
                  onClick={() => setActiveTab("milestones")}
                  className="text-xs text-gov-blue font-bold hover:underline"
                >
                  View Gantt Timeline →
                </button>
              </div>

              <div className="space-y-2">
                {project.milestones?.map((m) => (
                  <div key={m.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">{m.title}</div>
                      <div className="text-[10px] text-slate-400">Due: {formatDate(m.dueDate)} • Assigned: {m.assignedOfficerName}</div>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{m.progressPercentage}%</span>
                      <div className="text-[10px] font-bold text-blue-600">{m.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Summary Sidebar */}
          <div className="space-y-4">
            {/* Financial Overview */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <IndianRupee className="w-4 h-4 text-emerald-500" />
                <span>Financial Allocation</span>
              </h3>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500">Sanctioned Budget</span>
                  <strong className="text-slate-900 dark:text-white">{formatCurrencyINR(project.sanctionedBudget)}</strong>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500">Released Budget</span>
                  <strong className="text-blue-600">{formatCurrencyINR(project.releasedBudget)}</strong>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500">Utilized Expenditure</span>
                  <strong className="text-emerald-600">{formatCurrencyINR(project.utilizedBudget)}</strong>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-500">Remaining Balance</span>
                  <strong className="text-amber-600">{formatCurrencyINR(Math.max(0, project.releasedBudget - project.utilizedBudget))}</strong>
                </div>
              </div>
            </div>

            {/* Officer Contact */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2 text-xs">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-blue-500" />
                <span>Project Leadership</span>
              </h3>
              <div className="font-bold text-slate-800 dark:text-slate-200">{project.managerName}</div>
              <div className="text-slate-500">{project.managerEmail}</div>
              <div className="text-slate-500">{project.managerPhone}</div>
              <div className="text-[11px] text-gov-blue font-semibold pt-1">{project.departmentName}</div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "milestones" && (
        <GanttTimeline projectId={project.id} />
      )}

      {activeTab === "progress" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Periodic Ground Progress Log & Verification History
            </h3>
            {canEdit && (
              <button
                onClick={() => setIsAddProgressOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gov-blue text-white font-bold text-xs rounded-xl shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Submit Progress Update</span>
              </button>
            )}
          </div>

          <div className="space-y-3">
            {project.progressHistory?.map((pUpdate) => (
              <div
                key={pUpdate.id}
                className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 text-xs"
              >
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <span>Inspection Report: {formatDate(pUpdate.date)}</span>
                      <span className="px-2 py-0.2 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold text-[10px]">
                        Geo-Verified
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      Updated by {pUpdate.updatedByName} ({pUpdate.userRole})
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-right">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Physical</span>
                      <strong className="text-sm font-bold text-gov-blue">{pUpdate.physicalProgress}%</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Financial</span>
                      <strong className="text-sm font-bold text-emerald-600">{pUpdate.financialProgress}%</strong>
                    </div>
                  </div>
                </div>

                <div>
                  <strong className="text-slate-800 dark:text-slate-200 block mb-1">Work Executed:</strong>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{pUpdate.workCompleted}</p>
                </div>

                {pUpdate.currentChallenges && (
                  <div>
                    <strong className="text-rose-600 dark:text-rose-400 block mb-1">Bottlenecks & Challenges:</strong>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{pUpdate.currentChallenges}</p>
                  </div>
                )}

                {pUpdate.nextPlannedActivities && (
                  <div>
                    <strong className="text-indigo-600 dark:text-indigo-400 block mb-1">Next Planned Activities:</strong>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{pUpdate.nextPlannedActivities}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "budget" && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">
            Project Payment Voucher Register
          </h3>
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
              <tr>
                <th className="p-2.5">Voucher</th>
                <th className="p-2.5">Date</th>
                <th className="p-2.5">Category</th>
                <th className="p-2.5">Vendor</th>
                <th className="p-2.5 text-right">Amount (₹ Cr)</th>
                <th className="p-2.5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {project.transactions?.map((tx) => (
                <tr key={tx.id}>
                  <td className="p-2.5 font-mono font-bold text-slate-900 dark:text-white">{tx.voucherNo}</td>
                  <td className="p-2.5 text-slate-400">{formatDate(tx.date)}</td>
                  <td className="p-2.5">{tx.category}</td>
                  <td className="p-2.5 font-medium">{tx.vendor}</td>
                  <td className="p-2.5 text-right font-bold text-emerald-600">₹{tx.amount.toFixed(2)} Cr</td>
                  <td className="p-2.5 text-right"><span className="text-emerald-600 font-bold">{tx.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Submit Progress Update Modal */}
      {isAddProgressOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full shadow-2xl p-5 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-gov-blue" />
                <span>Submit Ground Progress Inspection</span>
              </h3>
              <button onClick={() => setIsAddProgressOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleProgressSubmit} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Physical Completion (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    required
                    value={newPhysical}
                    onChange={(e) => setNewPhysical(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-bold"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Financial Progress (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    required
                    value={newFinancial}
                    onChange={(e) => setNewFinancial(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Work Executed During Period *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Details on civil works, track laying, casting, or equipment energized..."
                  value={workCompleted}
                  onChange={(e) => setWorkCompleted(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Current Challenges & Roadblocks</label>
                <textarea
                  rows={2}
                  placeholder="Material delays, right of way issues, rainfall disruption..."
                  value={challenges}
                  onChange={(e) => setChallenges(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Next Planned Activities</label>
                <textarea
                  rows={2}
                  placeholder="Target tasks for upcoming fortnight..."
                  value={nextActivities}
                  onChange={(e) => setNextActivities(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddProgressOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gov-blue hover:bg-blue-700 text-white font-bold"
                >
                  Submit & Log
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
