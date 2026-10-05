"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { UserRole } from "@/types";
import { 
  Users, 
  ShieldCheck, 
  CheckCircle2, 
  Lock, 
  Key, 
  Building2, 
  UserCheck, 
  Sparkles,
  ArrowRight,
  ShieldAlert
} from "lucide-react";

export default function RolesManagementPage() {
  const { currentUser, switchRole, users, setIsDemoMode } = useApp();

  const roleDefinitions: {
    role: UserRole;
    title: string;
    description: string;
    permissions: string[];
    sampleUser: string;
    designation: string;
    department: string;
    badgeColor: string;
  }[] = [
    {
      role: "SUPER_ADMIN",
      title: "Super Admin (MoSPI Leadership)",
      description: "Complete sovereign access across all ministries, projects, fiscal approvals, AI parameters, and user privileges.",
      permissions: [
        "Create & archive projects nationwide",
        "Override AI health & delay models",
        "Disburse multi-crore fund sanctions",
        "Appoint & reassign Nodal Officers",
        "Export parliamentary audit dossiers",
        "Manage system-wide cryptographic keys",
      ],
      sampleUser: "Dr. Arvind Subramanian",
      designation: "Chief Director General (Infrastructure)",
      department: "Ministry of Statistics & Programme Implementation",
      badgeColor: "bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950 dark:text-purple-300",
    },
    {
      role: "PROJECT_ADMIN",
      title: "Project Administrator (Line Ministry / NHAI)",
      description: "Supervises ministry-level project portfolio, approves milestone baseline modifications, and coordinates inter-state issues.",
      permissions: [
        "Register projects under line ministry",
        "Sanction milestone progress updates",
        "Escalate bottlenecks to Cabinet Committee",
        "Authorize contractor payment vouchers",
        "Appoint Project Managers & Field Engineers",
      ],
      sampleUser: "Smt. Rajeshwari Iyer, IAS",
      designation: "Executive Director (Major Corridors)",
      department: "National Highways Authority of India (MoRTH)",
      badgeColor: "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950 dark:text-blue-300",
    },
    {
      role: "PROJECT_MANAGER",
      title: "Project Manager (Ground Execution Head)",
      description: "Directly in charge of specific mega projects (e.g. Western DFC), manages contractor works, submits IPC vouchers, and updates Gantt charts.",
      permissions: [
        "Update milestone completion %",
        "Submit physical/financial progress logs",
        "Record contractor expenditure bills",
        "Log technical bottlenecks & risk mitigations",
        "Upload verified DPR & drawings",
      ],
      sampleUser: "Er. Vikramaditya Sharma",
      designation: "Chief Project Manager (Western DFC)",
      department: "Ministry of Railways (DFCCIL)",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300",
    },
    {
      role: "DEPT_OFFICER",
      title: "Department Nodal Officer",
      description: "Oversees sector-specific programs (e.g. Jal Jeevan Mission, Solar Parks), reviews regional field data, and coordinates state DISCOMs.",
      permissions: [
        "Monitor regional project progress",
        "Verify IoT telemetry data & sensors",
        "Review contractor milestone claims",
        "Submit state departmental reports",
      ],
      sampleUser: "Dr. Ananya Roy",
      designation: "Superintending Engineer & Nodal Officer",
      department: "Department of Water Resources (Jal Shakti)",
      badgeColor: "bg-cyan-100 text-cyan-800 border-cyan-300 dark:bg-cyan-950 dark:text-cyan-300",
    },
    {
      role: "FIELD_OFFICER",
      title: "Field Officer (On-site Resident Engineer)",
      description: "Performs ground physical inspections, uploads drone imagery, records GPS coordinates, and flags on-site roadblock issues.",
      permissions: [
        "Submit geo-tagged inspection reports",
        "Upload site photos and orthomosaics",
        "Report contractor machinery downtime",
        "Flag environmental & weather delays",
      ],
      sampleUser: "Er. Sanjay Kumar Gond",
      designation: "Assistant Resident Engineer",
      department: "National Highways Authority of India",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-300",
    },
    {
      role: "VIEWER",
      title: "Viewer / Auditor (CAG / Evaluation Wing)",
      description: "Read-only access for evaluation bodies, public oversight inspectors, CAG performance auditors, and policy researchers.",
      permissions: [
        "View public dashboards & GIS map",
        "Inspect project milestones & timelines",
        "Audit expenditure transaction register",
        "Export CSV & printable monitoring summaries",
        "No modification permissions",
      ],
      sampleUser: "Shri Alok Vardhan",
      designation: "Senior Audit Inspector",
      department: "Comptroller & Auditor General (Evaluation Wing)",
      badgeColor: "bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-800 dark:text-slate-300",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-heading tracking-tight flex items-center gap-2.5">
            <Users className="w-6 h-6 text-gov-blue" />
            <span>Role-Based Access Control (RBAC) & Demo Authentication</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Demonstrate the 6 specialized government persona accounts configured for Smart India Hackathon evaluation
          </p>
        </div>

        <button
          onClick={() => setIsDemoMode(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-amber-500 to-gov-saffron text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all shrink-0"
        >
          <Sparkles className="w-4 h-4 text-slate-950" />
          <span>Launch Judge Guided Tour</span>
        </button>
      </div>

      {/* Current User Active Session Callout */}
      <div className="bg-gradient-to-r from-gov-navy via-slate-900 to-gov-navy p-5 rounded-2xl border border-gov-blue/40 text-white shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 font-black text-lg flex items-center justify-center shadow-md ring-2 ring-white/20">
            {currentUser.name.split(" ").map(n => n[0]).slice(0, 2).join("")}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base font-heading">{currentUser.name}</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400 text-slate-950">
                ACTIVE: {currentUser.role}
              </span>
            </div>
            <div className="text-xs text-slate-300 mt-0.5">
              {currentUser.designation} • {currentUser.department}
            </div>
          </div>
        </div>

        <div className="text-right text-xs text-slate-400">
          <div>Email: <strong className="text-white font-mono">{currentUser.email}</strong></div>
          <div>Phone: <strong className="text-white">{currentUser.phone}</strong></div>
        </div>
      </div>

      {/* 6 Role Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {roleDefinitions.map((item) => {
          const isSelected = currentUser.role === item.role;

          return (
            <div
              key={item.role}
              className={`rounded-2xl p-5 border transition-all flex flex-col justify-between ${
                isSelected
                  ? "bg-blue-50/50 dark:bg-blue-950/20 border-gov-blue ring-2 ring-gov-blue/40 shadow-lg"
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${item.badgeColor}`}>
                    {item.role}
                  </span>
                  {isSelected && (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-gov-blue">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Current Session</span>
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-sm text-slate-900 dark:text-white leading-tight">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                  {item.description}
                </p>

                {/* Permissions checklist */}
                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Assigned Role Privileges:
                  </div>
                  {item.permissions.map((perm, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="leading-snug text-[11px]">{perm}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button & Demo User */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="text-[11px]">
                  <div className="font-bold text-slate-800 dark:text-slate-200">{item.sampleUser}</div>
                  <div className="text-[10px] text-slate-400 truncate max-w-[130px]">{item.department}</div>
                </div>

                <button
                  onClick={() => switchRole(item.role)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                    isSelected
                      ? "bg-slate-200 dark:bg-slate-800 text-slate-500 cursor-default"
                      : "bg-gov-blue hover:bg-blue-700 text-white shadow-sm"
                  }`}
                >
                  <span>{isSelected ? "Active" : "Switch to Role"}</span>
                  {!isSelected && <ArrowRight className="w-3 h-3" />}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
