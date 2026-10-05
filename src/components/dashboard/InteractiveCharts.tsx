"use client";

import React, { useState } from "react";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  PieChart, 
  Pie, 
  Cell, 
  LineChart, 
  Line, 
  CartesianGrid,
  AreaChart,
  Area
} from "recharts";
import { useApp } from "@/context/AppContext";
import { BarChart3, PieChart as PieIcon, TrendingUp, IndianRupee, MapPin } from "lucide-react";
import { formatCurrencyINR } from "@/lib/utils";

export const InteractiveCharts: React.FC = () => {
  const { projects, departments } = useApp();
  const [activeTab, setActiveTab] = useState<"overview" | "budget" | "timeline" | "states">("overview");

  // 1. Department Progress Data
  const deptProgressData = departments.map((d) => {
    const deptProjects = projects.filter((p) => p.departmentId === d.id);
    const count = deptProjects.length;
    const avgProg = count > 0 
      ? Math.round(deptProjects.reduce((acc, p) => acc + (p.physicalProgress || 0), 0) / count) 
      : 0;
    const sanctioned = deptProjects.reduce((acc, p) => acc + (p.sanctionedBudget || 0), 0);
    const utilized = deptProjects.reduce((acc, p) => acc + (p.utilizedBudget || 0), 0);

    return {
      name: d.code,
      fullName: d.name,
      avgProgress: avgProg,
      projectsCount: count,
      sanctioned: Math.round(sanctioned),
      utilized: Math.round(utilized),
    };
  });

  // 2. Status Distribution Data
  const statusCounts: { [key: string]: number } = {
    IN_PROGRESS: 0,
    COMPLETED: 0,
    DELAYED: 0,
    AT_RISK: 0,
    PLANNING: 0,
    ON_HOLD: 0,
  };

  projects.forEach((p) => {
    if (statusCounts[p.status] !== undefined) {
      statusCounts[p.status]++;
    } else {
      statusCounts[p.status] = 1;
    }
  });

  const pieData = [
    { name: "In Progress", value: statusCounts.IN_PROGRESS, color: "#3B82F6" },
    { name: "Completed", value: statusCounts.COMPLETED, color: "#10B981" },
    { name: "Delayed", value: statusCounts.DELAYED, color: "#EF4444" },
    { name: "At Risk", value: statusCounts.AT_RISK, color: "#F59E0B" },
    { name: "Planning", value: statusCounts.PLANNING, color: "#6366F1" },
    { name: "On Hold", value: statusCounts.ON_HOLD, color: "#94A3B8" },
  ].filter((item) => item.value > 0);

  // 3. Monthly Progress Trend Data (6 Months)
  const monthlyTrendData = [
    { month: "Mar 2026", planned: 54, actual: 51, capex: 12400 },
    { month: "Apr 2026", planned: 59, actual: 56, capex: 15800 },
    { month: "May 2026", planned: 64, actual: 60, capex: 18900 },
    { month: "Jun 2026", planned: 70, actual: 64, capex: 22100 },
    { month: "Jul 2026", planned: 75, actual: 69, capex: 26400 },
    { month: "Aug 2026", planned: 81, actual: 73, capex: 31200 },
  ];

  // 4. State / Region Wise Performance
  const statePerformanceMap: { [state: string]: { count: number; totalProgress: number; budget: number } } = {};
  projects.forEach((p) => {
    const s = p.location.state || "Other";
    if (!statePerformanceMap[s]) {
      statePerformanceMap[s] = { count: 0, totalProgress: 0, budget: 0 };
    }
    statePerformanceMap[s].count += 1;
    statePerformanceMap[s].totalProgress += p.physicalProgress || 0;
    statePerformanceMap[s].budget += p.sanctionedBudget || 0;
  });

  const stateData = Object.keys(statePerformanceMap).map((state) => ({
    state,
    count: statePerformanceMap[state].count,
    avgProgress: Math.round(statePerformanceMap[state].totalProgress / statePerformanceMap[state].count),
    budget: Math.round(statePerformanceMap[state].budget),
  })).sort((a, b) => b.budget - a.budget).slice(0, 7);

  return (
    <div className="space-y-4">
      {/* Chart Navigation Tabs */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === "overview"
                ? "bg-gov-navy text-white shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Progress & Status</span>
          </button>
          <button
            onClick={() => setActiveTab("budget")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === "budget"
                ? "bg-gov-navy text-white shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <IndianRupee className="w-3.5 h-3.5" />
            <span>Budget vs Expenditure</span>
          </button>
          <button
            onClick={() => setActiveTab("timeline")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === "timeline"
                ? "bg-gov-navy text-white shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Planned vs Actual Monthly</span>
          </button>
          <button
            onClick={() => setActiveTab("states")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === "states"
                ? "bg-gov-navy text-white shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>State Performance</span>
          </button>
        </div>

        <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">
          Live MoSPI Telemetry Analytics
        </span>
      </div>

      {/* Main Chart Panels */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Department Progress Bar Chart */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  Project Progress by Ministry & Department
                </h3>
                <p className="text-xs text-slate-500">Average physical execution completion rate (%)</p>
              </div>
              <span className="text-[10px] bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 font-bold px-2 py-0.5 rounded">
                6 Line Ministries
              </span>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={deptProgressData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} angle={-15} textAnchor="end" />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl text-xs border border-slate-700">
                            <div className="font-bold text-amber-400">{data.fullName}</div>
                            <div className="mt-1">Average Physical Progress: <strong>{data.avgProgress}%</strong></div>
                            <div>Active Projects: <strong>{data.projectsCount}</strong></div>
                            <div>Sanctioned: <strong>₹{data.sanctioned} Cr</strong></div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="avgProgress" fill="#2563EB" radius={[6, 6, 0, 0]} barSize={36} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Project Status Distribution Donut Chart */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Project Status Distribution
              </h3>
              <p className="text-xs text-slate-500">Portfolio health breakdown</p>
            </div>
            
            <div className="h-52 w-full my-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const d = payload[0].payload;
                        return (
                          <div className="bg-slate-900 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-lg">
                            {d.name}: {d.value} Projects
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Custom Legend */}
            <div className="grid grid-cols-2 gap-1.5 text-[11px] pt-2 border-t border-slate-100 dark:border-slate-800">
              {pieData.map((entry) => (
                <div key={entry.name} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                  <span className="text-slate-600 dark:text-slate-400 truncate">{entry.name}:</span>
                  <strong className="text-slate-900 dark:text-slate-200">{entry.value}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "budget" && (
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Departmental Budget Sanctioned vs Actual Expenditure (₹ in Crores)
              </h3>
              <p className="text-xs text-slate-500">Comparison of capital outlays and utilized financial disbursements</p>
            </div>
            <div className="flex items-center gap-3 text-xs font-semibold">
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-blue-600" /> Sanctioned</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-emerald-500" /> Utilized</span>
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptProgressData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}k`} />
                <Tooltip
                  formatter={(value: any) => [`₹${formatCurrencyINR(Number(value))}`, ""]}
                  contentStyle={{ backgroundColor: "#0F172A", borderColor: "#334155", borderRadius: "12px", color: "#fff", fontSize: "12px" }}
                />
                <Bar dataKey="sanctioned" name="Sanctioned Budget (₹ Cr)" fill="#2563EB" radius={[4, 4, 0, 0]} />
                <Bar dataKey="utilized" name="Utilized Expenditure (₹ Cr)" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {activeTab === "timeline" && (
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Monthly Planned vs Actual Physical Progress Curve (%)
              </h3>
              <p className="text-xs text-slate-500">6-Month portfolio-level delivery S-Curve tracking</p>
            </div>
            <span className="text-[10px] bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-bold px-2 py-0.5 rounded">
              8% Baseline Slippage Detected
            </span>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyTrendData} margin={{ top: 10, right: 20, left: -10, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis domain={[40, 100]} tick={{ fontSize: 11 }} unit="%" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#0F172A", borderColor: "#334155", borderRadius: "12px", color: "#fff", fontSize: "12px" }}
                />
                <Legend />
                <Line type="monotone" dataKey="planned" name="Target Planned Progress (%)" stroke="#94A3B8" strokeWidth={2.5} strokeDasharray="5 5" />
                <Line type="monotone" dataKey="actual" name="Actual Physical Progress (%)" stroke="#3B82F6" strokeWidth={3} activeDot={{ r: 7 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {activeTab === "states" && (
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                State & Regional Infrastructure Performance
              </h3>
              <p className="text-xs text-slate-500">Total sanctioned outlay and average project completion by state</p>
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stateData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#334155" opacity={0.2} />
                <XAxis type="number" domain={[0, 100]} unit="%" tick={{ fontSize: 11 }} />
                <YAxis dataKey="state" type="category" tick={{ fontSize: 11 }} />
                <Tooltip
                  formatter={(val: any, name: string) => [
                    name === "avgProgress" ? `${val}%` : `₹${val} Cr`,
                    name === "avgProgress" ? "Average Progress" : "Sanctioned Budget",
                  ]}
                  contentStyle={{ backgroundColor: "#0F172A", borderColor: "#334155", borderRadius: "12px", color: "#fff", fontSize: "12px" }}
                />
                <Bar dataKey="avgProgress" name="avgProgress" fill="#0EA5E9" radius={[0, 6, 6, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};
