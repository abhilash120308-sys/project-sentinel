"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { 
  FolderKanban, 
  PlayCircle, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  IndianRupee, 
  TrendingUp, 
  Milestone, 
  AlertOctagon,
  ArrowUpRight,
  ShieldCheck
} from "lucide-react";
import { formatCurrencyINR } from "@/lib/utils";

export const StatCards: React.FC = () => {
  const { projects } = useApp();

  const totalProjects = projects.length;
  const activeProjects = projects.filter((p) => p.status === "IN_PROGRESS").length;
  const completedProjects = projects.filter((p) => p.status === "COMPLETED").length;
  const delayedProjects = projects.filter((p) => p.status === "DELAYED").length;
  const atRiskProjects = projects.filter((p) => p.status === "AT_RISK").length;

  const totalAllocatedBudget = projects.reduce((acc, p) => acc + (p.sanctionedBudget || 0), 0);
  const totalReleasedBudget = projects.reduce((acc, p) => acc + (p.releasedBudget || 0), 0);
  const totalUtilizedBudget = projects.reduce((acc, p) => acc + (p.utilizedBudget || 0), 0);

  const avgCompletion = totalProjects > 0
    ? Math.round(projects.reduce((acc, p) => acc + (p.physicalProgress || 0), 0) / totalProjects)
    : 0;

  // Pending milestones across all projects
  const allMilestones = projects.flatMap((p) => p.milestones || []);
  const pendingMilestones = allMilestones.filter((m) => m.status !== "COMPLETED").length;
  const delayedMilestones = allMilestones.filter((m) => m.status === "DELAYED").length;

  // Critical issues
  const allIssues = projects.flatMap((p) => p.issues || []);
  const criticalIssues = allIssues.filter(
    (i) => (i.priority === "CRITICAL" || i.status === "ESCALATED") && i.status !== "RESOLVED"
  ).length;

  const stats = [
    {
      title: "Total Projects",
      value: totalProjects,
      sub: `${activeProjects} Active • ${completedProjects} Done`,
      icon: FolderKanban,
      color: "from-blue-600 to-gov-navy",
      textColor: "text-blue-600 dark:text-blue-400",
      bgLight: "bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-900/50",
    },
    {
      title: "Active In-Progress",
      value: activeProjects,
      sub: `${Math.round((activeProjects / (totalProjects || 1)) * 100)}% of total portfolio`,
      icon: PlayCircle,
      color: "from-sky-600 to-blue-700",
      textColor: "text-sky-600 dark:text-sky-400",
      bgLight: "bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-900/50",
    },
    {
      title: "Delayed / At Risk",
      value: `${delayedProjects + atRiskProjects}`,
      sub: `${delayedProjects} Delayed • ${atRiskProjects} At Risk`,
      icon: AlertTriangle,
      color: "from-rose-600 to-red-700",
      textColor: "text-rose-600 dark:text-rose-400",
      bgLight: "bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900/50",
      badge: delayedProjects > 0 ? "Needs Review" : "Stable",
      badgeColor: "bg-rose-100 text-rose-700 dark:bg-rose-900 dark:text-rose-300",
    },
    {
      title: "Sanctioned Budget",
      value: formatCurrencyINR(totalAllocatedBudget),
      sub: `Released: ${formatCurrencyINR(totalReleasedBudget)}`,
      icon: IndianRupee,
      color: "from-amber-600 to-yellow-700",
      textColor: "text-amber-600 dark:text-amber-400",
      bgLight: "bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900/50",
    },
    {
      title: "Utilized Expenditure",
      value: formatCurrencyINR(totalUtilizedBudget),
      sub: `${totalReleasedBudget > 0 ? ((totalUtilizedBudget / totalReleasedBudget) * 100).toFixed(1) : 0}% of released funds`,
      icon: TrendingUp,
      color: "from-emerald-600 to-teal-700",
      textColor: "text-emerald-600 dark:text-emerald-400",
      bgLight: "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900/50",
    },
    {
      title: "Overall Completion",
      value: `${avgCompletion}%`,
      sub: "Weighted physical delivery",
      icon: CheckCircle2,
      color: "from-indigo-600 to-purple-700",
      textColor: "text-indigo-600 dark:text-indigo-400",
      bgLight: "bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-900/50",
    },
    {
      title: "Pending Milestones",
      value: pendingMilestones,
      sub: `${delayedMilestones} Overdue Milestones`,
      icon: Milestone,
      color: "from-violet-600 to-indigo-800",
      textColor: "text-violet-600 dark:text-violet-400",
      bgLight: "bg-violet-50 dark:bg-violet-950/40 border-violet-200 dark:border-violet-900/50",
    },
    {
      title: "Critical Issues & Escalations",
      value: criticalIssues,
      sub: "High-Powered Committee Escalated",
      icon: AlertOctagon,
      color: "from-red-600 to-rose-800",
      textColor: "text-red-600 dark:text-red-400",
      bgLight: "bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-900/50",
      badge: criticalIssues > 0 ? "Action Required" : "Cleared",
      badgeColor: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div
            key={idx}
            className={`rounded-2xl p-4 border transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 ${item.bgLight}`}
          >
            <div className="flex items-start justify-between">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                {item.title}
              </span>
              <div
                className={`w-9 h-9 rounded-xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center shadow-md`}
              >
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div className="mt-2 flex items-baseline justify-between">
              <div className="text-2xl font-extrabold text-slate-900 dark:text-white font-heading tracking-tight">
                {item.value}
              </div>
              {item.badge && (
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.badgeColor}`}>
                  {item.badge}
                </span>
              )}
            </div>

            <div className="mt-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
              {item.sub}
            </div>
          </div>
        );
      })}
    </div>
  );
};
