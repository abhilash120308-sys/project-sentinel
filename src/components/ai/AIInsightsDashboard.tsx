"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Project } from "@/types";
import { 
  BrainCircuit, 
  Sparkles, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle2, 
  RefreshCw, 
  ArrowRight, 
  Calendar, 
  DollarSign, 
  Target, 
  ShieldCheck, 
  Activity,
  Zap,
  HelpCircle
} from "lucide-react";
import { getHealthScoreColor, formatCurrencyINR, formatDate } from "@/lib/utils";
import { computeProjectAIInsight } from "@/lib/aiIntelligenceEngine";

export const AIInsightsDashboard: React.FC = () => {
  const { projects, runAIAnalysisForProject } = useApp();
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || "");

  const selectedProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  if (!selectedProject) {
    return <div className="p-8 text-center text-slate-400">No project available for AI analysis.</div>;
  }

  const analysis = computeProjectAIInsight(selectedProject);
  const insight = selectedProject.aiInsight || analysis.insight;
  const healthColor = getHealthScoreColor(insight.healthScore);

  return (
    <div className="space-y-4">
      {/* AI Center Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 rounded-2xl p-5 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-500 to-amber-400 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-purple-900/40 ring-2 ring-amber-400/50">
            <BrainCircuit className="w-6 h-6 text-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-lg font-heading tracking-tight">
                MoSPI AI & Predictive Analytics Engine
              </h2>
              <span className="text-[10px] bg-purple-500/20 text-purple-300 font-extrabold px-2 py-0.5 rounded-full border border-purple-500/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Multi-Factor ML Model</span>
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Automated delay forecasting, budget slippage anomalies, and prescriptive remedial actions
            </p>
          </div>
        </div>

        {/* Project Selector & Re-run Button */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <select
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className="text-xs py-2 px-3 bg-slate-800 border border-slate-700 rounded-xl text-white font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.code})
              </option>
            ))}
          </select>

          <button
            onClick={() => runAIAnalysisForProject(selectedProject.id)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 text-white font-bold text-xs rounded-xl shadow-md shadow-purple-900/40 transition-all shrink-0"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Re-Run AI Engine</span>
          </button>
        </div>
      </div>

      {/* Main AI KPI Scores Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Project Health Score */}
        <div className={`p-5 rounded-2xl border ${healthColor.bg} ${healthColor.border} shadow-sm flex flex-col justify-between`}>
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Project Health Score
              </span>
              <Activity className={`w-5 h-5 ${healthColor.text}`} />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <div className={`text-4xl font-black font-heading tracking-tight ${healthColor.text}`}>
                {insight.healthScore}
              </div>
              <span className="text-xs text-slate-400 font-bold">/ 100</span>
            </div>
          </div>
          <div className="mt-3 text-[11px] text-slate-500 dark:text-slate-400 font-medium pt-2 border-t border-slate-200/60 dark:border-slate-800">
            Overall Health Grade: <strong>{insight.riskLevel} Risk</strong>
          </div>
        </div>

        {/* Delay Probability */}
        <div className="p-5 rounded-2xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Delay Probability
              </span>
              <TrendingDown className={`w-5 h-5 ${insight.delayProbability > 50 ? "text-rose-500" : "text-emerald-500"}`} />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <div className={`text-4xl font-black font-heading tracking-tight ${
                insight.delayProbability > 60 ? "text-rose-600 dark:text-rose-400" : insight.delayProbability > 30 ? "text-amber-600 dark:text-amber-400" : "text-emerald-600 dark:text-emerald-400"
              }`}>
                {insight.delayProbability}%
              </div>
              <span className="text-xs text-slate-400 font-medium">Likelihood of Slippage</span>
            </div>
          </div>
          <div className="mt-3 text-[11px] text-slate-500 dark:text-slate-400 font-medium pt-2 border-t border-slate-100 dark:border-slate-800">
            Target End Date: <strong>{formatDate(selectedProject.targetEndDate)}</strong>
          </div>
        </div>

        {/* Projected Completion Date */}
        <div className="p-5 rounded-2xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                AI Predicted Completion
              </span>
              <Calendar className="w-5 h-5 text-indigo-500" />
            </div>
            <div className="mt-3">
              <div className="text-xl font-black font-heading text-slate-900 dark:text-white tracking-tight">
                {formatDate(insight.predictedCompletionDate)}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                {analysis.scheduleVarianceDays > 0
                  ? `+${analysis.scheduleVarianceDays} Days schedule slippage forecasted`
                  : "Tracking on baseline schedule"}
              </div>
            </div>
          </div>
          <div className="mt-3 text-[11px] text-slate-500 dark:text-slate-400 font-medium pt-2 border-t border-slate-100 dark:border-slate-800">
            Milestone Risk: <strong className={insight.milestoneRisk === "HIGH" ? "text-rose-500" : "text-slate-700 dark:text-slate-300"}>{insight.milestoneRisk}</strong>
          </div>
        </div>

        {/* Projected Cost Variance */}
        <div className="p-5 rounded-2xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Predicted Cost Variance
              </span>
              <DollarSign className="w-5 h-5 text-amber-500" />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <div className="text-3xl font-black font-heading text-slate-900 dark:text-white tracking-tight">
                +{insight.costVariancePredictedPercent}%
              </div>
              <span className="text-xs text-slate-400 font-medium">Estimated Escalation</span>
            </div>
          </div>
          <div className="mt-3 text-[11px] text-slate-500 dark:text-slate-400 font-medium pt-2 border-t border-slate-100 dark:border-slate-800">
            Budget Risk: <strong className={insight.budgetRisk === "HIGH" ? "text-rose-500" : "text-slate-700 dark:text-slate-300"}>{insight.budgetRisk}</strong>
          </div>
        </div>
      </div>

      {/* Health Score Sub-Factor Breakdown */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1">
          Health Score Component Analysis
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          Multi-variable weightage matrix used in MoSPI AI scoring algorithm
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
            <div className="flex justify-between items-center text-xs mb-1 font-semibold">
              <span className="text-slate-600 dark:text-slate-300">Milestone Delivery</span>
              <span className="font-mono text-gov-blue">{analysis.healthScoreBreakdown.milestoneCompliance} / 35</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
              <div className="bg-blue-600 h-full rounded-full" style={{ width: `${(analysis.healthScoreBreakdown.milestoneCompliance / 35) * 100}%` }} />
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
            <div className="flex justify-between items-center text-xs mb-1 font-semibold">
              <span className="text-slate-600 dark:text-slate-300">Financial Health</span>
              <span className="font-mono text-emerald-600">{analysis.healthScoreBreakdown.financialHealth} / 25</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${(analysis.healthScoreBreakdown.financialHealth / 25) * 100}%` }} />
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
            <div className="flex justify-between items-center text-xs mb-1 font-semibold">
              <span className="text-slate-600 dark:text-slate-300">Issue Resolution</span>
              <span className="font-mono text-purple-600">{analysis.healthScoreBreakdown.issueResolution} / 20</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
              <div className="bg-purple-600 h-full rounded-full" style={{ width: `${(analysis.healthScoreBreakdown.issueResolution / 20) * 100}%` }} />
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
            <div className="flex justify-between items-center text-xs mb-1 font-semibold">
              <span className="text-slate-600 dark:text-slate-300">Risk Exposure</span>
              <span className="font-mono text-amber-600">{analysis.healthScoreBreakdown.riskExposure} / 20</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
              <div className="bg-amber-500 h-full rounded-full" style={{ width: `${(analysis.healthScoreBreakdown.riskExposure / 20) * 100}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Root Causes & Prescriptive Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Identified Root Causes */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 flex items-center justify-center font-bold">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Identified Root Causes & Slippage Drivers
              </h3>
            </div>

            <div className="space-y-2.5">
              {insight.rootCauses.map((cause, idx) => (
                <div
                  key={idx}
                  className="bg-rose-50/50 dark:bg-rose-950/20 p-3 rounded-xl border border-rose-100 dark:border-rose-900/40 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2"
                >
                  <span className="w-5 h-5 rounded-full bg-rose-200 dark:bg-rose-900 text-rose-800 dark:text-rose-200 flex items-center justify-center shrink-0 font-bold text-[10px]">
                    {idx + 1}
                  </span>
                  <p className="leading-relaxed">{cause}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Prescriptive Remedial Actions */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 flex items-center justify-center font-bold">
                <Zap className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Prescriptive AI Recommended Interventions
              </h3>
            </div>

            <div className="space-y-2.5">
              {insight.recommendedActions.map((action, idx) => (
                <div
                  key={idx}
                  className="bg-emerald-50/50 dark:bg-emerald-950/20 p-3 rounded-xl border border-emerald-100 dark:border-emerald-900/40 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">{action}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
