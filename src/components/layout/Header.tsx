"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { 
  Bell, 
  Search, 
  Sparkles, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Building2, 
  FileText, 
  ChevronDown, 
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  LogOut,
  UserCheck
} from "lucide-react";
import { formatDate } from "@/lib/utils";

interface HeaderProps {
  onToggleSidebar?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const { 
    currentUser, 
    projects, 
    alerts, 
    markAlertAsRead, 
    markAllAlertsAsRead, 
    searchQuery, 
    setSearchQuery,
    resetToDemoData,
    setIsDemoMode
  } = useApp();

  const [timeString, setTimeString] = useState<string>("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Live time ticker
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleDateString("en-IN", {
          weekday: "short",
          day: "2-digit",
          month: "short",
          year: "numeric",
        }) + " | " + now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" }) + " IST"
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const unreadAlerts = alerts.filter((a) => !a.read);

  // Filtered projects for header quick search dropdown
  const searchResults = searchQuery.trim() === "" ? [] : projects.filter((p) => {
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.code.toLowerCase().includes(q) ||
      p.departmentName.toLowerCase().includes(q) ||
      p.location.state.toLowerCase().includes(q) ||
      p.managerName.toLowerCase().includes(q)
    );
  }).slice(0, 6);

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        
        {/* Left: Branding & National Emblem */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            aria-label="Toggle Sidebar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <Link href="/" className="flex items-center gap-3 group">
            {/* Government Emblem Styled Icon */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gov-navy via-gov-blue to-gov-cyan flex items-center justify-center shadow-md shadow-blue-900/20 text-white font-bold text-lg ring-2 ring-amber-400/50">
              <span className="tracking-tighter">PS</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-extrabold text-lg text-slate-900 dark:text-white tracking-tight group-hover:text-gov-blue transition-colors">
                  Project<span className="text-gov-saffron">Sentinel</span>
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300">
                  MoSPI
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block font-medium">
                Integrated Project-Monitoring Platform (SIH26103)
              </p>
            </div>
          </Link>
        </div>

        {/* Middle: Global Search Bar with Live Quick-Results */}
        <div className="relative flex-1 max-w-xl hidden md:block">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search 20+ projects by ID, Name, Department, State, Officer..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchResults(true);
              }}
              onFocus={() => setShowSearchResults(true)}
              className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-gov-blue focus:bg-white dark:focus:bg-slate-900 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* Search Dropdown Results */}
          {showSearchResults && searchQuery.trim() !== "" && (
            <div className="absolute top-full left-0 right-0 mt-1.5 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 p-2 z-50 max-h-96 overflow-y-auto">
              <div className="text-[11px] font-semibold text-slate-400 px-3 py-1 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <span>Matching Projects ({searchResults.length})</span>
                <span className="text-[10px] text-slate-500">Press ESC or click outside</span>
              </div>
              {searchResults.length === 0 ? (
                <div className="py-6 text-center text-xs text-slate-500">
                  No infrastructure project matches &quot;{searchQuery}&quot;
                </div>
              ) : (
                searchResults.map((proj) => (
                  <Link
                    key={proj.id}
                    href={`/projects/${proj.id}`}
                    onClick={() => {
                      setShowSearchResults(false);
                      setSearchQuery("");
                    }}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors border-b last:border-0 border-slate-100 dark:border-slate-800/50"
                  >
                    <div className="flex flex-col">
                      <span className="font-semibold text-xs text-slate-800 dark:text-slate-100">{proj.name}</span>
                      <span className="text-[10px] text-slate-500 flex items-center gap-2">
                        <span>{proj.code}</span>
                        <span>•</span>
                        <span>{proj.departmentName}</span>
                        <span>•</span>
                        <span>{proj.location.state}</span>
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-slate-900 dark:text-slate-200">{proj.physicalProgress}%</span>
                      <div className="text-[10px] text-slate-400">Health: {proj.aiInsight?.healthScore}/100</div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          )}
        </div>

        {/* Right Section: Live Time, Notifications, User Menu */}
        <div className="flex items-center gap-3">
          {/* Live Government Clock */}
          <div className="hidden xl:flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg font-mono">
            <Clock className="w-3.5 h-3.5 text-gov-blue" />
            <span>{timeString}</span>
          </div>

          {/* Quick Demo Mode Launch */}
          <button
            onClick={() => setIsDemoMode(true)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs rounded-lg shadow-sm transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>SIH Demo Mode</span>
          </button>

          {/* Notifications Center */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Smart Alert Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadAlerts.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-600 text-white font-bold text-[10px] rounded-full flex items-center justify-center animate-pulse">
                  {unreadAlerts.length}
                </span>
              )}
            </button>

            {/* Notification Dropdown Drawer */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 p-3 z-50">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-gov-saffron" />
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white">Smart Alert Notifications</h4>
                  </div>
                  {unreadAlerts.length > 0 && (
                    <button
                      onClick={markAllAlertsAsRead}
                      className="text-[11px] text-gov-blue hover:underline font-semibold"
                    >
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="max-h-80 overflow-y-auto space-y-2">
                  {alerts.length === 0 ? (
                    <p className="text-center text-xs text-slate-500 py-4">No notifications present</p>
                  ) : (
                    alerts.map((alert) => (
                      <div
                        key={alert.id}
                        onClick={() => markAlertAsRead(alert.id)}
                        className={`p-2.5 rounded-lg border text-xs transition-colors cursor-pointer ${
                          alert.read
                            ? "bg-slate-50/60 dark:bg-slate-800/40 border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400"
                            : alert.severity === "CRITICAL"
                            ? "bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900/60 text-slate-800 dark:text-slate-200"
                            : "bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-900/60 text-slate-800 dark:text-slate-200"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-1">
                          <span className={`font-semibold text-[11px] ${alert.severity === "CRITICAL" ? "text-rose-700 dark:text-rose-400" : "text-slate-900 dark:text-slate-100"}`}>
                            {alert.title}
                          </span>
                          {!alert.read && <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0 mt-1" />}
                        </div>
                        <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 line-clamp-2">
                          {alert.message}
                        </p>
                        <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-400">
                          <span>{formatDate(alert.timestamp)}</span>
                          {alert.actionUrl && (
                            <Link href={alert.actionUrl} className="text-gov-blue font-bold hover:underline flex items-center gap-0.5">
                              <span>Inspect</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </Link>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gov-navy text-white font-bold flex items-center justify-center text-xs ring-2 ring-amber-400/40">
                {currentUser.name.split(" ").map(n => n[0]).slice(0, 2).join("")}
              </div>
              <div className="hidden lg:block text-left">
                <div className="text-xs font-bold text-slate-900 dark:text-white leading-tight">{currentUser.name}</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">{currentUser.role}</div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden lg:block" />
            </button>

            {showUserDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 p-3 z-50">
                <div className="pb-2 border-b border-slate-100 dark:border-slate-800">
                  <div className="font-bold text-xs text-slate-900 dark:text-white">{currentUser.name}</div>
                  <div className="text-[11px] text-slate-500">{currentUser.email}</div>
                  <div className="text-[10px] text-gov-blue font-semibold mt-1">{currentUser.designation}</div>
                  <div className="text-[10px] text-slate-400">{currentUser.department}</div>
                </div>

                <div className="py-2 space-y-1">
                  <button
                    onClick={() => {
                      resetToDemoData();
                      setShowUserDropdown(false);
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-amber-500" />
                    <span>Reset to Pristine Demo Data</span>
                  </button>
                  <Link
                    href="/audit"
                    onClick={() => setShowUserDropdown(false)}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
                    <span>Security & Audit Trail</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};
