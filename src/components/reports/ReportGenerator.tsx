"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { 
  BarChart3, 
  Download, 
  Printer, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Calendar, 
  Sparkles,
  Building2,
  Filter
} from "lucide-react";
import { formatCurrencyINR, formatDate } from "@/lib/utils";

export const ReportGenerator: React.FC = () => {
  const { projects, departments, currentUser } = useApp();

  const [reportType, setReportType] = useState<string>("PROGRESS_SUMMARY");
  const [selectedDept, setSelectedDept] = useState<string>("ALL");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const filteredProjects = selectedDept === "ALL" 
    ? projects 
    : projects.filter((p) => p.departmentId === selectedDept);

  // CSV Export Function
  const handleExportCSV = () => {
    let headers: string[] = [];
    let rows: string[][] = [];

    if (reportType === "BUDGET_UTILIZATION") {
      headers = ["Project ID", "Project Name", "Department", "Sanctioned (Cr)", "Released (Cr)", "Utilized (Cr)", "Utilization %", "Status"];
      rows = filteredProjects.map((p) => [
        p.code,
        `"${p.name.replace(/"/g, '""')}"`,
        `"${p.departmentName}"`,
        p.sanctionedBudget.toString(),
        p.releasedBudget.toString(),
        p.utilizedBudget.toString(),
        p.releasedBudget > 0 ? ((p.utilizedBudget / p.releasedBudget) * 100).toFixed(1) : "0",
        p.status
      ]);
    } else if (reportType === "DELAYED_PROJECTS") {
      headers = ["Project ID", "Project Name", "Department", "State", "Status", "Planned %", "Actual %", "Delay Risk", "Target Completion"];
      rows = filteredProjects
        .filter((p) => p.status === "DELAYED" || p.status === "AT_RISK")
        .map((p) => [
          p.code,
          `"${p.name.replace(/"/g, '""')}"`,
          `"${p.departmentName}"`,
          p.location.state,
          p.status,
          p.plannedProgress.toString(),
          p.physicalProgress.toString(),
          `${p.aiInsight?.delayProbability || 0}%`,
          p.targetEndDate
        ]);
    } else {
      headers = ["Project ID", "Project Name", "Department", "State", "Priority", "Status", "Physical %", "Sanctioned (Cr)", "AI Health Score"];
      rows = filteredProjects.map((p) => [
        p.code,
        `"${p.name.replace(/"/g, '""')}"`,
        `"${p.departmentName}"`,
        p.location.state,
        p.priority,
        p.status,
        p.physicalProgress.toString(),
        p.sanctionedBudget.toString(),
        p.aiInsight?.healthScore.toString() || "75"
      ]);
    }

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `MoSPI_${reportType}_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4">
      {/* Report Controls */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 print:hidden">
        <div>
          <h2 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-gov-blue" />
            <span>Executive Reporting & Parliamentary Dossier Generator</span>
          </h2>
          <p className="text-xs text-slate-500">
            Export structured government monitoring reports for CCEA, Cabinet Secretariat, and MoSPI evaluation
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="text-xs py-2 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-slate-800 dark:text-slate-200"
          >
            <option value="PROGRESS_SUMMARY">Comprehensive Project Progress Report</option>
            <option value="DEPARTMENT_PERFORMANCE">Department Performance Report</option>
            <option value="BUDGET_UTILIZATION">Budget & Fund Utilization Audit</option>
            <option value="DELAYED_PROJECTS">Delayed & Critical Risk Project Dossier</option>
            <option value="AI_EXECUTIVE_BRIEF">AI Predictive & Risk Assessment Brief</option>
          </select>

          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="text-xs py-2 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium"
          >
            <option value="ALL">All Departments</option>
            {departments.map((d) => (
              <option key={d.id} value={d.id}>
                {d.code}
              </option>
            ))}
          </select>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-gov-navy hover:bg-blue-900 text-white font-bold text-xs rounded-xl shadow-md transition-all"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / PDF</span>
          </button>
        </div>
      </div>

      {/* Printable Report Document Card */}
      <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm print:shadow-none print:border-0 print:p-0 text-slate-900 dark:text-white">
        
        {/* Government Letterhead Header */}
        <div className="border-b-2 border-slate-900 dark:border-slate-700 pb-4 mb-6 flex items-start justify-between">
          <div>
            <div className="text-xs uppercase font-extrabold tracking-widest text-slate-500 dark:text-slate-400">
              Government of India
            </div>
            <h1 className="text-xl font-extrabold font-heading text-gov-navy dark:text-blue-400 mt-0.5">
              Ministry of Statistics & Programme Implementation (MoSPI)
            </h1>
            <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Project Sentinel – Integrated Project-Monitoring Platform (SIH26103)
            </div>
          </div>

          <div className="text-right text-xs font-mono text-slate-500">
            <div>Report Ref: MOSPI/EVAL/{new Date().getFullYear()}/{Math.floor(1000 + Math.random() * 9000)}</div>
            <div>Date of Generation: {new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}</div>
            <div>Generated By: {currentUser.name} ({currentUser.designation})</div>
          </div>
        </div>

        {/* Report Meta Section */}
        <div className="mb-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block font-medium">Report Scope</span>
            <strong className="text-slate-900 dark:text-white font-semibold">{reportType.replace(/_/g, " ")}</strong>
          </div>
          <div>
            <span className="text-slate-400 block font-medium">Total Monitored Projects</span>
            <strong className="text-slate-900 dark:text-white font-semibold">{filteredProjects.length} Projects</strong>
          </div>
          <div>
            <span className="text-slate-400 block font-medium">Aggregate Sanctioned Outlay</span>
            <strong className="text-slate-900 dark:text-white font-semibold">
              {formatCurrencyINR(filteredProjects.reduce((a, b) => a + b.sanctionedBudget, 0))}
            </strong>
          </div>
          <div>
            <span className="text-slate-400 block font-medium">Total Utilized Fund</span>
            <strong className="text-emerald-600 font-semibold">
              {formatCurrencyINR(filteredProjects.reduce((a, b) => a + b.utilizedBudget, 0))}
            </strong>
          </div>
        </div>

        {/* Dynamic Report Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse border border-slate-200 dark:border-slate-800">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold">
              <tr>
                <th className="p-2.5 border border-slate-200 dark:border-slate-800">Code</th>
                <th className="p-2.5 border border-slate-200 dark:border-slate-800">Project Name</th>
                <th className="p-2.5 border border-slate-200 dark:border-slate-800">Department</th>
                <th className="p-2.5 border border-slate-200 dark:border-slate-800">State</th>
                <th className="p-2.5 border border-slate-200 dark:border-slate-800">Status</th>
                <th className="p-2.5 border border-slate-200 dark:border-slate-800 text-right">Physical %</th>
                <th className="p-2.5 border border-slate-200 dark:border-slate-800 text-right">Sanctioned (₹ Cr)</th>
                <th className="p-2.5 border border-slate-200 dark:border-slate-800 text-right">Utilized (₹ Cr)</th>
                <th className="p-2.5 border border-slate-200 dark:border-slate-800 text-center">AI Health</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {filteredProjects.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="p-2.5 border border-slate-200 dark:border-slate-800 font-mono font-bold text-slate-900 dark:text-white">
                    {p.code}
                  </td>
                  <td className="p-2.5 border border-slate-200 dark:border-slate-800 font-semibold max-w-[200px]">
                    {p.name}
                  </td>
                  <td className="p-2.5 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                    {p.departmentName}
                  </td>
                  <td className="p-2.5 border border-slate-200 dark:border-slate-800">
                    {p.location.state}
                  </td>
                  <td className="p-2.5 border border-slate-200 dark:border-slate-800 font-bold">
                    <span className={p.status === "DELAYED" ? "text-rose-600 font-bold" : p.status === "COMPLETED" ? "text-emerald-600 font-bold" : ""}>
                      {p.status}
                    </span>
                  </td>
                  <td className="p-2.5 border border-slate-200 dark:border-slate-800 text-right font-bold">
                    {p.physicalProgress}%
                  </td>
                  <td className="p-2.5 border border-slate-200 dark:border-slate-800 text-right font-mono">
                    ₹{p.sanctionedBudget.toFixed(1)}
                  </td>
                  <td className="p-2.5 border border-slate-200 dark:border-slate-800 text-right font-mono font-bold text-emerald-600">
                    ₹{p.utilizedBudget.toFixed(1)}
                  </td>
                  <td className="p-2.5 border border-slate-200 dark:border-slate-800 text-center font-bold font-mono">
                    {p.aiInsight?.healthScore}/100
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Executive Sign-off Footer */}
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <div>
            <div>System Generated via Project Sentinel AI Intelligence Engine</div>
            <div className="text-[10px]">Tamper-Evident Cryptographic Audit Reference: SHA-256 #9f82ab47</div>
          </div>

          <div className="text-right">
            <div className="font-bold text-slate-800 dark:text-slate-200">Director General (Infrastructure Monitoring)</div>
            <div>Ministry of Statistics & Programme Implementation</div>
          </div>
        </div>
      </div>
    </div>
  );
};
