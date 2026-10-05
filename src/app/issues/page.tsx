"use client";

import React from "react";
import { IssueRiskManager } from "@/components/issues/IssueRiskManager";
import { AlertOctagon } from "lucide-react";

export default function IssuesPage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-heading tracking-tight flex items-center gap-2.5">
          <AlertOctagon className="w-6 h-6 text-rose-500" />
          <span>Issues, Escalations & Risk Mitigation Management</span>
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Multi-tiered issue resolution and probabilistic risk heatmap across all centrally monitored infrastructure projects
        </p>
      </div>

      <IssueRiskManager />
    </div>
  );
}
