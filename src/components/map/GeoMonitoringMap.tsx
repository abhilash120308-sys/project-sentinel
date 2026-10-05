"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { Project } from "@/types";
import { 
  MapPin, 
  Filter, 
  Layers, 
  Search, 
  Navigation, 
  ArrowUpRight, 
  Building2, 
  IndianRupee, 
  Activity,
  ShieldAlert,
  X
} from "lucide-react";
import { 
  getStatusBadgeClass, 
  formatCurrencyINR, 
  getHealthScoreColor 
} from "@/lib/utils";

export const GeoMonitoringMap: React.FC = () => {
  const { projects, departments } = useApp();

  const [selectedState, setSelectedState] = useState<string>("ALL");
  const [selectedDept, setSelectedDept] = useState<string>("ALL");
  const [selectedRisk, setSelectedRisk] = useState<string>("ALL");
  const [activeProject, setActiveProject] = useState<Project | null>(projects[0] || null);

  // States list
  const statesList = Array.from(new Set(projects.map((p) => p.location.state))).sort();

  // Filtered
  const filteredProjects = projects.filter((p) => {
    const matchesState = selectedState === "ALL" || p.location.state === selectedState;
    const matchesDept = selectedDept === "ALL" || p.departmentId === selectedDept;
    const matchesRisk = selectedRisk === "ALL" || p.aiInsight?.riskLevel === selectedRisk;
    return matchesState && matchesDept && matchesRisk;
  });

  // Calculate relative map coordinates on India SVG grid (lat ~8 to 36, lng ~68 to 97)
  // Map normalized to 0-100% (X: lng 68->97 => 29 deg range, Y: lat 36->8 => 28 deg range reversed)
  const getMapPosition = (lat: number, lng: number) => {
    const minLng = 68.0;
    const maxLng = 97.0;
    const minLat = 8.0;
    const maxLat = 36.0;

    const x = Math.max(5, Math.min(95, ((lng - minLng) / (maxLng - minLng)) * 100));
    const y = Math.max(5, Math.min(95, ((maxLat - lat) / (maxLat - minLat)) * 100));

    return { top: `${y}%`, left: `${x}%` };
  };

  return (
    <div className="space-y-4">
      {/* Filter Toolbar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-500 flex items-center justify-center font-bold">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-base text-slate-900 dark:text-white">
              National GIS Geo-Monitoring & Spatial Intelligence
            </h2>
            <p className="text-xs text-slate-500">
              Interactive geographic tracking across {statesList.length} States & Union Territories
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* State Filter */}
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="text-xs py-1.5 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 font-medium"
          >
            <option value="ALL">All States ({statesList.length})</option>
            {statesList.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          {/* Department Filter */}
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="text-xs py-1.5 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 font-medium"
          >
            <option value="ALL">All Departments</option>
            {departments.map((d) => (
              <option key={d.id} value={d.id}>
                {d.code}
              </option>
            ))}
          </select>

          {/* Risk Filter */}
          <select
            value={selectedRisk}
            onChange={(e) => setSelectedRisk(e.target.value)}
            className="text-xs py-1.5 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 font-medium"
          >
            <option value="ALL">All Risk Levels</option>
            <option value="LOW">Low Risk</option>
            <option value="MEDIUM">Medium Risk</option>
            <option value="HIGH">High Risk</option>
            <option value="CRITICAL">Critical Risk</option>
          </select>
        </div>
      </div>

      {/* Main Map & Detail Split Pane */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Interactive India Map Canvas */}
        <div className="lg:col-span-2 bg-slate-950 rounded-2xl border border-slate-800 p-6 relative overflow-hidden min-h-[500px] flex items-center justify-center shadow-2xl">
          
          {/* Subtle Grid Lines & Background radar circle */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
          <div className="absolute w-96 h-96 rounded-full border border-cyan-500/10 animate-pulse pointer-events-none" />

          {/* Map Title overlay */}
          <div className="absolute top-4 left-4 z-10 bg-slate-900/90 backdrop-blur border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white">
            <div className="font-bold flex items-center gap-1.5 text-cyan-400">
              <Navigation className="w-3.5 h-3.5" />
              <span>India Geospatial Satellite Overlay</span>
            </div>
            <div className="text-[10px] text-slate-400">
              Showing {filteredProjects.length} geo-tagged infrastructure assets
            </div>
          </div>

          {/* SVG Map Shape Representation */}
          <div className="relative w-full max-w-lg aspect-square">
            <svg
              viewBox="0 0 500 550"
              className="w-full h-full opacity-30 stroke-cyan-500/50 fill-slate-900/60 stroke-[1.5]"
            >
              {/* Generalized Stylized Map of India Silhouette */}
              <path d="M 230 40 L 270 50 L 300 70 L 310 90 L 340 100 L 350 140 L 420 150 L 460 170 L 480 200 L 450 230 L 400 230 L 350 250 L 330 280 L 310 320 L 290 380 L 250 480 L 230 490 L 200 440 L 170 380 L 150 330 L 120 280 L 100 240 L 80 220 L 100 180 L 130 160 L 150 120 L 190 70 Z" />
            </svg>

            {/* Render Geo Project Markers */}
            {filteredProjects.map((proj) => {
              const pos = getMapPosition(proj.location.lat, proj.location.lng);
              const isSelected = activeProject?.id === proj.id;
              
              let markerColor = "bg-blue-500 ring-blue-300";
              if (proj.status === "COMPLETED") markerColor = "bg-emerald-500 ring-emerald-300";
              else if (proj.status === "DELAYED") markerColor = "bg-rose-500 ring-rose-300";
              else if (proj.status === "AT_RISK") markerColor = "bg-amber-500 ring-amber-300";

              return (
                <button
                  key={proj.id}
                  onClick={() => setActiveProject(proj)}
                  style={{ top: pos.top, left: pos.left }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 group transition-all transform ${
                    isSelected ? "scale-150 z-30" : "hover:scale-125"
                  }`}
                >
                  <div className="relative">
                    {/* Pulsing ring for active or high-risk markers */}
                    {(isSelected || proj.status === "DELAYED") && (
                      <span className="absolute -inset-1.5 rounded-full bg-rose-500/40 animate-ping" />
                    )}
                    <div
                      className={`w-4 h-4 rounded-full ${markerColor} border-2 border-slate-950 shadow-lg ring-2 flex items-center justify-center text-[8px] font-black text-white`}
                    >
                      •
                    </div>

                    {/* Tooltip on hover */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover:block bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded-md border border-slate-700 whitespace-nowrap shadow-xl pointer-events-none">
                      {proj.name} ({proj.physicalProgress}%)
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Map Legend */}
          <div className="absolute bottom-4 right-4 z-10 bg-slate-900/90 backdrop-blur border border-slate-800 rounded-xl p-2.5 text-[10px] text-slate-300 space-y-1">
            <div className="font-bold text-white mb-1">Status Legend:</div>
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Completed</div>
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> In Progress</div>
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> At Risk</div>
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Delayed</div>
          </div>
        </div>

        {/* Selected Project Telemetry Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm flex flex-col justify-between">
          {activeProject ? (
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadgeClass(activeProject.status)}`}>
                    {activeProject.status.replace(/_/g, " ")}
                  </span>
                  <span className="text-xs font-black text-gov-blue">
                    {activeProject.code}
                  </span>
                </div>

                <h3 className="font-bold text-base text-slate-900 dark:text-white leading-tight">
                  {activeProject.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {activeProject.departmentName}
                </p>
              </div>

              {/* Geo Location details */}
              <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800 text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">State:</span>
                  <strong className="text-slate-800 dark:text-slate-200">{activeProject.location.state}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">District:</span>
                  <strong className="text-slate-800 dark:text-slate-200">{activeProject.location.district}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">GPS Coordinates:</span>
                  <span className="font-mono text-slate-600 dark:text-slate-400">
                    {activeProject.location.lat.toFixed(4)}° N, {activeProject.location.lng.toFixed(4)}° E
                  </span>
                </div>
              </div>

              {/* Progress & Financial Bar */}
              <div className="space-y-2 text-xs">
                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span>Physical Progress</span>
                    <span className="font-bold text-slate-900 dark:text-white">{activeProject.physicalProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div className="bg-gov-blue h-full rounded-full" style={{ width: `${activeProject.physicalProgress}%` }} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 text-[11px]">
                  <div>
                    <span className="text-slate-400 block">Sanctioned:</span>
                    <strong className="text-slate-900 dark:text-white">{formatCurrencyINR(activeProject.sanctionedBudget)}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Utilized:</span>
                    <strong className="text-emerald-600">{formatCurrencyINR(activeProject.utilizedBudget)}</strong>
                  </div>
                </div>
              </div>

              {/* AI Health badge */}
              <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/60 text-xs flex items-center justify-between">
                <div>
                  <div className="font-bold text-purple-900 dark:text-purple-200">
                    AI Health: {activeProject.aiInsight?.healthScore}/100
                  </div>
                  <div className="text-[10px] text-purple-700 dark:text-purple-300">
                    Risk Level: {activeProject.aiInsight?.riskLevel}
                  </div>
                </div>
                <Link
                  href={`/projects/${activeProject.id}`}
                  className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-bold text-[11px] shadow-sm flex items-center gap-1"
                >
                  <span>Inspect</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400 text-xs">
              Select any project marker on the map to inspect telemetry
            </div>
          )}

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400 flex items-center justify-between">
            <span>NIC / Survey of India Standard Grid</span>
            <span>Real-time Geo-Telemetry</span>
          </div>
        </div>
      </div>
    </div>
  );
};
