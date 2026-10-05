import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ProjectStatus, MilestoneStatus, ProjectPriority, IssuePriority, IssueStatus } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format numbers in Indian numbering system (Crores / Lakhs)
export function formatCurrencyINR(amountInCrores: number): string {
  if (isNaN(amountInCrores) || amountInCrores === null || amountInCrores === undefined) {
    return "₹0 Cr";
  }
  if (amountInCrores >= 1000) {
    return `₹${(amountInCrores / 1000).toFixed(2)}k Cr`;
  }
  if (amountInCrores >= 1) {
    return `₹${amountInCrores.toFixed(2)} Cr`;
  }
  const inLakhs = amountInCrores * 100;
  return `₹${inLakhs.toFixed(2)} Lakh`;
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-IN').format(num);
}

export function formatDate(dateString: string | undefined): string {
  if (!dateString) return "N/A";
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateString;
  }
}

export function getDaysRemaining(targetDate: string): { days: number; isOverdue: boolean } {
  const target = new Date(targetDate).getTime();
  const now = new Date().getTime();
  const diffTime = target - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return {
    days: Math.abs(diffDays),
    isOverdue: diffDays < 0,
  };
}

export function getStatusBadgeClass(status: ProjectStatus): string {
  switch (status) {
    case "COMPLETED":
      return "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800";
    case "IN_PROGRESS":
      return "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800";
    case "ON_HOLD":
      return "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800";
    case "AT_RISK":
      return "bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-950/60 dark:text-orange-300 dark:border-orange-800";
    case "DELAYED":
      return "bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800";
    case "PLANNING":
      return "bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800";
    case "NOT_STARTED":
    default:
      return "bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700";
  }
}

export function getMilestoneStatusBadgeClass(status: MilestoneStatus): string {
  switch (status) {
    case "COMPLETED":
      return "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800"; // MoSPI Requirement: Blue = Completed
    case "ON_TRACK":
      return "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800"; // Green = On Track
    case "AT_RISK":
      return "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800"; // Yellow = At Risk
    case "DELAYED":
      return "bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800"; // Red = Delayed
    default:
      return "bg-slate-100 text-slate-700 border-slate-300";
  }
}

export function getPriorityBadgeClass(priority: ProjectPriority | IssuePriority): string {
  switch (priority) {
    case "CRITICAL":
      return "bg-rose-100 text-rose-700 border-rose-200 font-semibold";
    case "HIGH":
      return "bg-orange-100 text-orange-700 border-orange-200";
    case "MEDIUM":
      return "bg-amber-100 text-amber-700 border-amber-200";
    case "LOW":
      return "bg-slate-100 text-slate-600 border-slate-200";
  }
}

export function getIssueStatusBadgeClass(status: IssueStatus): string {
  switch (status) {
    case "OPEN":
      return "bg-rose-100 text-rose-800 border-rose-300";
    case "IN_PROGRESS":
      return "bg-amber-100 text-amber-800 border-amber-300";
    case "RESOLVED":
      return "bg-emerald-100 text-emerald-800 border-emerald-300";
    case "ESCALATED":
      return "bg-purple-100 text-purple-800 border-purple-300 font-semibold animate-pulse";
  }
}

export function getHealthScoreColor(score: number): { text: string; bg: string; border: string; ring: string } {
  if (score >= 80) {
    return {
      text: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-950/40",
      border: "border-emerald-200 dark:border-emerald-800",
      ring: "text-emerald-500",
    };
  } else if (score >= 60) {
    return {
      text: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-950/40",
      border: "border-amber-200 dark:border-amber-800",
      ring: "text-amber-500",
    };
  } else if (score >= 40) {
    return {
      text: "text-orange-600 dark:text-orange-400",
      bg: "bg-orange-50 dark:bg-orange-950/40",
      border: "border-orange-200 dark:border-orange-800",
      ring: "text-orange-500",
    };
  } else {
    return {
      text: "text-rose-600 dark:text-rose-400",
      bg: "bg-rose-50 dark:bg-rose-950/40",
      border: "border-rose-200 dark:border-rose-800",
      ring: "text-rose-500",
    };
  }
}
