"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  FolderKanban, 
  Milestone, 
  IndianRupee, 
  AlertOctagon, 
  BrainCircuit, 
  MapPin, 
  FileText, 
  BarChart3, 
  History, 
  Users, 
  Settings,
  Sparkles,
  HelpCircle,
  Building,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";
import { useApp } from "@/context/AppContext";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const { projects, alerts, setIsDemoMode } = useApp();

  const delayedCount = projects.filter((p) => p.status === "DELAYED" || p.status === "AT_RISK").length;
  const criticalAlertCount = alerts.filter((a) => !a.read && a.severity === "CRITICAL").length;

  const navItems = [
    {
      label: "Main Dashboard",
      icon: LayoutDashboard,
      href: "/",
      badge: null,
    },
    {
      label: "Project Management",
      icon: FolderKanban,
      href: "/projects",
      badge: `${projects.length} Total`,
    },
    {
      label: "Milestones & Gantt",
      icon: Milestone,
      href: "/milestones",
      badge: null,
    },
    {
      label: "Budget Monitoring",
      icon: IndianRupee,
      href: "/budget",
      badge: "₹3.8L Cr",
    },
    {
      label: "Issue & Risk Management",
      icon: AlertOctagon,
      href: "/issues",
      badge: delayedCount > 0 ? `${delayedCount} Attention` : null,
      badgeColor: "bg-rose-500 text-white",
    },
    {
      label: "AI Insights & Delay Prediction",
      icon: BrainCircuit,
      href: "/ai-insights",
      badge: "AI Active",
      badgeColor: "bg-purple-600 text-white animate-pulse",
    },
    {
      label: "GIS Map & Geo Monitoring",
      icon: MapPin,
      href: "/map",
      badge: "National",
    },
    {
      label: "Document Management",
      icon: FileText,
      href: "/documents",
      badge: null,
    },
    {
      label: "Executive Reports",
      icon: BarChart3,
      href: "/reports",
      badge: "PDF/CSV",
    },
    {
      label: "Audit Trail & Activity Log",
      icon: History,
      href: "/audit",
      badge: "Immutable",
    },
    {
      label: "User & Role Management",
      icon: Users,
      href: "/roles",
      badge: "6 Roles",
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Top Logo Branding inside sidebar */}
        <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-gov-navy to-gov-cyan flex items-center justify-center text-white font-black text-base ring-2 ring-amber-400">
              PP
            </div>
            <div>
              <div className="font-heading font-extrabold text-white text-base tracking-tight leading-none">
                Project<span className="text-gov-saffron">Pulse</span>
              </div>
              <div className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase mt-1">
                MoSPI Govt of India
              </div>
            </div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            >
              ✕
            </button>
          )}
        </div>

        {/* Quick Launch Demo Mode Banner */}
        <div className="p-3">
          <button
            onClick={() => {
              setIsDemoMode(true);
              if (onClose) onClose();
            }}
            className="w-full bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20 hover:from-amber-500/30 hover:to-orange-500/30 border border-amber-500/40 rounded-xl p-2.5 text-left transition-all group flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-amber-300 group-hover:text-amber-200">
                  SIH Hackathon Tour
                </div>
                <div className="text-[10px] text-slate-400">
                  Judges 10-Point Guided Walkthrough
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-gov-navy text-white shadow-md shadow-blue-900/30 font-semibold"
                    : "text-slate-400 hover:bg-slate-800/80 hover:text-slate-100"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? "text-amber-400" : "text-slate-400 group-hover:text-amber-400 transition-colors"}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.badgeColor || "bg-slate-800 text-slate-300 border border-slate-700"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer Government Compliance Tag */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/40 text-[11px] text-slate-400 space-y-1">
          <div className="flex items-center justify-between font-medium">
            <span className="text-slate-300 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>MoSPI Data Engine</span>
            </span>
            <span className="text-[10px] bg-emerald-950 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-800">
              Live v2.6
            </span>
          </div>
          <p className="text-[10px] text-slate-500">
            Secure Role-Based Integrated Platform • NIC / CPGRAMS Interlinked
          </p>
        </div>
      </aside>
    </>
  );
};
