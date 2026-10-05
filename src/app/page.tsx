"use client";

import React, { useState } from "react";
import { StatCards } from "@/components/dashboard/StatCards";
import { InteractiveCharts } from "@/components/dashboard/InteractiveCharts";
import { CriticalAlertsTicker } from "@/components/dashboard/CriticalAlertsTicker";
import { RecentProjectsTable } from "@/components/dashboard/RecentProjectsTable";
import { CreateProjectModal } from "@/components/projects/CreateProjectModal";
import { useApp } from "@/context/AppContext";
import { 
  Building2, 
  Sparkles, 
  ArrowUpRight, 
  Layers, 
  TrendingUp, 
  ShieldCheck, 
  Activity,
  Plus
} from "lucide-react";

export default function DashboardPage() {
  const { currentUser, projects } = useApp();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Top Welcome & Quick Action Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-gov-navy via-slate-900 to-gov-navy p-6 rounded-3xl text-white shadow-xl border border-gov-blue/30 relative overflow-hidden">
        {/* Background glow circle */}
        <div className="absolute right-0 top-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950">
              National Project Cockpit
            </span>
            <span className="text-xs text-slate-300">
              MoSPI • Integrated Real-Time Surveillance
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black font-heading tracking-tight">
            Central Infrastructure Monitoring Dashboard
          </h1>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Live telemetry, predictive risk forecasting, milestone compliance, and multi-department budget utilization across India.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-2.5 shrink-0">
          {(currentUser.role === "SUPER_ADMIN" || currentUser.role === "PROJECT_ADMIN" || currentUser.role === "PROJECT_MANAGER") && (
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-gov-saffron hover:brightness-110 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-orange-500/20 flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-4 h-4 text-slate-950" />
              <span>Enroll New Project</span>
            </button>
          )}
        </div>
      </div>

      {/* Critical Bottlenecks Ticker */}
      <CriticalAlertsTicker />

      {/* National KPI Stat Cards */}
      <StatCards />

      {/* Interactive Charts Section */}
      <InteractiveCharts />

      {/* Monitored Projects Table */}
      <RecentProjectsTable onOpenCreateModal={() => setIsCreateModalOpen(true)} />

      {/* Create Project Modal */}
      <CreateProjectModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}
