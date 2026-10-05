"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { CheckCircle, AlertCircle, AlertTriangle, Info, X } from "lucide-react";

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let bgClass = "bg-slate-900 border-slate-700 text-white";
        let Icon = Info;
        let iconColor = "text-blue-400";

        if (toast.type === "success") {
          bgClass = "bg-slate-900 border-emerald-500/40 text-white";
          Icon = CheckCircle;
          iconColor = "text-emerald-400";
        } else if (toast.type === "error") {
          bgClass = "bg-slate-900 border-rose-500/40 text-white";
          Icon = AlertCircle;
          iconColor = "text-rose-400";
        } else if (toast.type === "warning") {
          bgClass = "bg-slate-900 border-amber-500/40 text-white";
          Icon = AlertTriangle;
          iconColor = "text-amber-400";
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border shadow-2xl backdrop-blur-md transition-all transform animate-in slide-in-from-bottom-5 duration-200 ${bgClass}`}
          >
            <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${iconColor}`} />
            <div className="flex-1 text-xs">
              <div className="font-bold text-white leading-snug">{toast.title}</div>
              <div className="text-slate-300 mt-0.5 leading-relaxed">{toast.message}</div>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white p-1 rounded transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
