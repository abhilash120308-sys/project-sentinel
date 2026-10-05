"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Transaction } from "@/types";
import { 
  IndianRupee, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Plus, 
  Search, 
  FileText, 
  Download, 
  Building2,
  Calendar,
  Layers,
  Sparkles,
  ShieldCheck,
  X
} from "lucide-react";
import { formatCurrencyINR, formatDate } from "@/lib/utils";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  PieChart, 
  Pie, 
  Cell 
} from "recharts";

export const BudgetMonitoringView: React.FC = () => {
  const { projects, addTransaction, currentUser } = useApp();
  const [selectedProject, setSelectedProject] = useState<string>("ALL");
  const [searchTx, setSearchTx] = useState<string>("");
  const [isVoucherModalOpen, setIsVoucherModalOpen] = useState(false);

  // Voucher Form state
  const [targetProjectId, setTargetProjectId] = useState<string>(projects[0]?.id || "");
  const [voucherNo, setVoucherNo] = useState(`VOUCHER-${Date.now().toString().slice(-5)}`);
  const [amount, setAmount] = useState("450.0");
  const [category, setCategory] = useState<Transaction["category"]>("CIVIL_WORKS");
  const [vendor, setVendor] = useState("Larsen & Toubro Ltd");
  const [description, setDescription] = useState("Payment against Running Account Bill for Section 3 Works");

  const canDisburse = currentUser.role === "SUPER_ADMIN" || currentUser.role === "PROJECT_ADMIN" || currentUser.role === "PROJECT_MANAGER";

  // Calculations
  const relevantProjects = selectedProject === "ALL" ? projects : projects.filter((p) => p.id === selectedProject);

  const totalSanctioned = relevantProjects.reduce((acc, p) => acc + (p.sanctionedBudget || 0), 0);
  const totalReleased = relevantProjects.reduce((acc, p) => acc + (p.releasedBudget || 0), 0);
  const totalUtilized = relevantProjects.reduce((acc, p) => acc + (p.utilizedBudget || 0), 0);
  const totalRemaining = Math.max(0, totalReleased - totalUtilized);
  const overallUtilizationPercent = totalReleased > 0 ? ((totalUtilized / totalReleased) * 100).toFixed(1) : "0";

  // Financial Anomaly Flags
  const anomalies: { project: string; message: string; severity: "HIGH" | "MEDIUM" }[] = [];
  projects.forEach((p) => {
    const rel = p.releasedBudget || 1;
    const util = p.utilizedBudget || 0;
    const rate = (util / rel) * 100;
    if (p.physicalProgress > 40 && rate < 20) {
      anomalies.push({
        project: p.name,
        message: `Low fund utilization (${rate.toFixed(1)}%) despite ${p.physicalProgress}% physical progress delivered. Contractor bills may be delayed.`,
        severity: "HIGH",
      });
    }
    if (rate > 85 && p.physicalProgress < 40) {
      anomalies.push({
        project: p.name,
        message: `Disproportionately high expenditure (${rate.toFixed(1)}%) against low physical delivery (${p.physicalProgress}%). Potential cost overrun risk.`,
        severity: "HIGH",
      });
    }
  });

  // All Transactions
  const allTransactions = relevantProjects.flatMap((p) =>
    (p.transactions || []).map((t) => ({
      ...t,
      projectName: p.name,
      projectCode: p.code,
    }))
  );

  const filteredTransactions = allTransactions.filter((t) => {
    const q = searchTx.toLowerCase();
    return (
      t.voucherNo.toLowerCase().includes(q) ||
      t.vendor.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.projectName.toLowerCase().includes(q)
    );
  });

  // Category Breakdown Data
  const categoryMap: { [cat: string]: number } = {};
  allTransactions.forEach((t) => {
    categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
  });

  const categoryPieData = Object.keys(categoryMap).map((cat) => ({
    name: cat.replace(/_/g, " "),
    value: Math.round(categoryMap[cat]),
  }));

  const COLORS = ["#2563EB", "#10B981", "#F59E0B", "#8B5CF6", "#EC4899", "#06B6D4"];

  const handleCreateVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetProjectId || !amount) return;

    addTransaction(targetProjectId, {
      projectId: targetProjectId,
      date: new Date().toISOString().split("T")[0],
      amount: parseFloat(amount) || 0,
      category,
      description,
      approvedBy: `${currentUser.name} (${currentUser.role})`,
      voucherNo,
      vendor,
      status: "PROCESSED",
    });

    setIsVoucherModalOpen(false);
  };

  return (
    <div className="space-y-4">
      {/* Top Filter & Actions Header */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center font-bold">
            <IndianRupee className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-base text-slate-900 dark:text-white">
              Integrated Financial & Budget Monitoring
            </h2>
            <p className="text-xs text-slate-500">
              Sanctioned outlays, fund release tranches, running account bill disbursements
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className="text-xs py-2 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 font-semibold focus:outline-none focus:ring-1 focus:ring-gov-blue"
          >
            <option value="ALL">All National Projects (Consolidated)</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          {canDisburse && (
            <button
              onClick={() => setIsVoucherModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-gov-blue hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-900/20 transition-all shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Record Payment Voucher</span>
            </button>
          )}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Sanctioned Budget</span>
          <div className="text-xl font-black text-slate-900 dark:text-white font-heading mt-1">
            {formatCurrencyINR(totalSanctioned)}
          </div>
          <span className="text-[10px] text-slate-400 mt-1 block">Approved CCEA Outlay</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Released Amount</span>
          <div className="text-xl font-black text-blue-600 dark:text-blue-400 font-heading mt-1">
            {formatCurrencyINR(totalReleased)}
          </div>
          <span className="text-[10px] text-slate-400 mt-1 block">{totalSanctioned > 0 ? Math.round((totalReleased / totalSanctioned) * 100) : 0}% of Sanctioned</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Utilized Expenditure</span>
          <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 font-heading mt-1">
            {formatCurrencyINR(totalUtilized)}
          </div>
          <span className="text-[10px] text-slate-400 mt-1 block">Verified Contractor Bills</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Remaining Balance</span>
          <div className="text-xl font-black text-amber-600 dark:text-amber-400 font-heading mt-1">
            {formatCurrencyINR(totalRemaining)}
          </div>
          <span className="text-[10px] text-slate-400 mt-1 block">Unutilized in Treasury</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Utilization Rate</span>
          <div className="text-xl font-black text-indigo-600 dark:text-indigo-400 font-heading mt-1">
            {overallUtilizationPercent}%
          </div>
          <span className="text-[10px] text-slate-400 mt-1 block">Fund Absorption Efficiency</span>
        </div>
      </div>

      {/* Spending Anomalies Alert Banner */}
      {anomalies.length > 0 && selectedProject === "ALL" && (
        <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/80 rounded-2xl p-4 text-xs">
          <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-bold mb-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>Automated AI Budget & Spending Anomalies Flagged ({anomalies.length})</span>
          </div>
          <div className="space-y-2">
            {anomalies.map((ano, idx) => (
              <div key={idx} className="bg-white/80 dark:bg-slate-900/80 p-2.5 rounded-xl border border-amber-200 dark:border-amber-900/50 flex items-start justify-between">
                <div>
                  <strong className="text-slate-900 dark:text-white">{ano.project}:</strong>{" "}
                  <span className="text-slate-700 dark:text-slate-300">{ano.message}</span>
                </div>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 shrink-0 ml-2">
                  Anomaly Flag
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Category Chart & Transactions Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Category Breakdown Chart */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Expenditure by Head of Account
            </h3>
            <p className="text-xs text-slate-500">Distribution across Capex, Civil Works & Procurement</p>
          </div>

          <div className="h-52 w-full my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryPieData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={4} dataKey="value">
                  {categoryPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val) => [`₹${val} Cr`, "Amount"]}
                  contentStyle={{ backgroundColor: "#0F172A", borderColor: "#334155", borderRadius: "12px", color: "#fff", fontSize: "12px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-1.5 text-[11px] pt-2 border-t border-slate-100 dark:border-slate-800">
            {categoryPieData.map((entry, idx) => (
              <div key={entry.name} className="flex items-center gap-1.5 truncate">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                <span className="text-slate-600 dark:text-slate-400 truncate">{entry.name}:</span>
                <strong className="text-slate-900 dark:text-white font-mono">₹{entry.value}Cr</strong>
              </div>
            ))}
          </div>
        </div>

        {/* Transaction Ledger Table */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Payment Voucher Disbursement Ledger
              </h3>
              <p className="text-xs text-slate-500">Audited transaction records and contractor bills</p>
            </div>

            <div className="relative w-48">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search vouchers..."
                value={searchTx}
                onChange={(e) => setSearchTx(e.target.value)}
                className="w-full pl-8 pr-3 py-1 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none"
              />
            </div>
          </div>

          <div className="overflow-x-auto flex-1 max-h-80 overflow-y-auto">
            <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 font-semibold sticky top-0">
                <tr>
                  <th className="py-2.5 px-3">Voucher & Date</th>
                  <th className="py-2.5 px-3">Project</th>
                  <th className="py-2.5 px-3">Category</th>
                  <th className="py-2.5 px-3">Vendor / Recipient</th>
                  <th className="py-2.5 px-3 text-right">Amount (₹ Cr)</th>
                  <th className="py-2.5 px-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-400">
                      No payment transactions found.
                    </td>
                  </tr>
                ) : (
                  filteredTransactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                      <td className="py-2.5 px-3">
                        <div className="font-mono font-bold text-slate-900 dark:text-white">{tx.voucherNo}</div>
                        <div className="text-[10px] text-slate-400">{formatDate(tx.date)}</div>
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[140px]">{tx.projectName}</div>
                        <div className="text-[10px] text-slate-400 truncate max-w-[140px]">{tx.description}</div>
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          {tx.category}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 font-medium text-slate-800 dark:text-slate-200">
                        {tx.vendor}
                      </td>
                      <td className="py-2.5 px-3 text-right font-black text-slate-900 dark:text-white font-mono">
                        ₹{tx.amount.toFixed(2)} Cr
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300">
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Record Payment Voucher Modal */}
      {isVoucherModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full shadow-2xl p-5 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-bold">
                  <IndianRupee className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  Record Expenditure Payment Voucher
                </h3>
              </div>
              <button onClick={() => setIsVoucherModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateVoucher} className="space-y-3.5">
              <div>
                <label className="block font-semibold mb-1">Target Infrastructure Project</label>
                <select
                  value={targetProjectId}
                  onChange={(e) => setTargetProjectId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 font-semibold"
                >
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.code})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Disbursement Amount (₹ Cr)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-bold text-slate-900 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Voucher / IPC Number</label>
                  <input
                    type="text"
                    required
                    value={voucherNo}
                    onChange={(e) => setVoucherNo(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Head of Account</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Transaction["category"])}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
                  >
                    <option value="CIVIL_WORKS">Civil Works Construction</option>
                    <option value="PROCUREMENT">Procurement & Hardware</option>
                    <option value="CAPEX">Capital Expenditure (Capex)</option>
                    <option value="OPEX">Operational Expenditure (Opex)</option>
                    <option value="CONSULTING">Project Management Consultancy</option>
                    <option value="CONTINGENCY">Contingency Fund</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Contractor / Vendor Name</label>
                  <input
                    type="text"
                    required
                    value={vendor}
                    onChange={(e) => setVendor(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Bill Description & Purpose</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsVoucherModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                >
                  Disburse Voucher
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
