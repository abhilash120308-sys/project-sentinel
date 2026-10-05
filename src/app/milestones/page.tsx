"use client";

import React from "react";
import { GanttTimeline } from "@/components/milestones/GanttTimeline";
import { Milestone as MilestoneIcon } from "lucide-react";

export default function MilestonesPage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-heading tracking-tight flex items-center gap-2.5">
          <MilestoneIcon className="w-6 h-6 text-gov-blue" />
          <span>Integrated Milestones & Gantt Timeline</span>
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          MoSPI standard milestone delivery tracker with critical path monitoring and automated overdue detection
        </p>
      </div>

      <GanttTimeline />
    </div>
  );
}
