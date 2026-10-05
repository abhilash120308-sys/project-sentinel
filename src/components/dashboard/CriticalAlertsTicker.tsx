"use client";

import React from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { AlertCircle, AlertTriangle, Info, ArrowRight, ExternalLink, ShieldAlert, Sparkles } from "lucide-react";
import { formatDate } from "@/lib/utils";

export const CriticalAlertsTicker: React.FC = () => {
  const { alerts, markAlertAsRead } = useApp();

  const activeAlerts = alerts.filter((a) => !a.read).slice(0, 3);
  if (activeAlerts.length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-slate-900 via-rose-950/40 to-slate-900 border border-rose-500/30 rounded-2xl p-4 shadow-lg text-white">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-rose-600/30 border border-rose-500/50 flex items-center justify-center text-rose-400">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-rose-300 uppercase tracking-wider flex items-center gap-2">
              <span>National High-Alert Project Escalations</span>
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            </h4>
            <p className="text-[11px] text-slate-400">
              Immediate MoSPI intervention required for overdue bottlenecks
            </p>
          </div>
        </div>

        <Link
          href="/issues"
          className="text-xs text-rose-300 hover:text-white font-semibold flex items-center gap-1 hover:underline"
        >
          <span>View All Escalations</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {activeAlerts.map((alert) => (
          <div
            key={alert.id}
            className="bg-slate-900/90 border border-rose-900/60 hover:border-rose-500/50 rounded-xl p-3 text-xs transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-1 mb-1">
                <span className="font-bold text-rose-200 line-clamp-1">{alert.projectName}</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 font-bold shrink-0">
                  {alert.type.replace(/_/g, " ")}
                </span>
              </div>
              <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                {alert.message}
              </p>
            </div>

            <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
              <span>{formatDate(alert.timestamp)}</span>
              {alert.actionUrl && (
                <Link
                  href={alert.actionUrl}
                  onClick={() => markAlertAsRead(alert.id)}
                  className="text-amber-400 font-bold hover:underline flex items-center gap-1"
                >
                  <span>Resolve Now</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
