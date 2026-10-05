"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { UserRole } from "@/types";
import { Shield, Sparkles, CheckCircle2, ChevronRight, HelpCircle } from "lucide-react";

export const RoleBanner: React.FC = () => {
  const { currentUser, switchRole, setIsDemoMode } = useApp();

  const roles: { role: UserRole; label: string; desc: string; badge: string }[] = [
    { role: "SUPER_ADMIN", label: "Super Admin", desc: "MoSPI Director General (Full Control)", badge: "bg-purple-700 text-white" },
    { role: "PROJECT_ADMIN", label: "Project Admin", desc: "NHAI / Ministry Exec Director", badge: "bg-blue-700 text-white" },
    { role: "PROJECT_MANAGER", label: "Project Manager", desc: "Western DFC / Ground Manager", badge: "bg-emerald-700 text-white" },
    { role: "DEPT_OFFICER", label: "Dept Officer", desc: "Jal Shakti Superintending Eng.", badge: "bg-cyan-700 text-white" },
    { role: "FIELD_OFFICER", label: "Field Officer", desc: "On-site Resident Engineer", badge: "bg-amber-700 text-white" },
    { role: "VIEWER", label: "Viewer / Auditor", desc: "CAG Evaluation Inspector", badge: "bg-slate-700 text-white" },
  ];

  return (
    <div className="bg-gradient-to-r from-slate-900 via-gov-navy to-slate-900 text-white border-b border-gov-blue/30 px-4 py-2 text-xs">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Left identity */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-amber-500/20 text-amber-300 px-2.5 py-1 rounded-full border border-amber-500/30 font-semibold tracking-wide">
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            <span>Active Role:</span>
            <span className="text-white font-bold">{currentUser.role}</span>
          </div>
          <span className="hidden md:inline text-slate-300">
            Logged in as <strong className="text-white">{currentUser.name}</strong> ({currentUser.designation})
          </span>
        </div>

        {/* Quick Role Switcher Chips for Hackathon Judges */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="hidden lg:inline text-slate-400 font-medium mr-1">Switch Role Demo:</span>
          {roles.map((r) => {
            const isSelected = currentUser.role === r.role;
            return (
              <button
                key={r.role}
                onClick={() => switchRole(r.role)}
                title={r.desc}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all flex items-center gap-1 ${
                  isSelected
                    ? "bg-amber-400 text-slate-950 font-bold shadow-sm shadow-amber-500/50 ring-2 ring-amber-300"
                    : "bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700"
                }`}
              >
                {isSelected && <CheckCircle2 className="w-3 h-3 text-slate-950" />}
                {r.label}
              </button>
            );
          })}

          {/* Quick Demo Tour Button */}
          <button
            onClick={() => setIsDemoMode(true)}
            className="ml-2 px-3 py-1 bg-gradient-to-r from-amber-500 to-gov-saffron text-slate-950 font-bold rounded-md hover:brightness-110 flex items-center gap-1.5 shadow-sm shadow-orange-500/40"
          >
            <Sparkles className="w-3.5 h-3.5 text-slate-950" />
            <span>Judge Demo Tour</span>
          </button>
        </div>
      </div>
    </div>
  );
};
