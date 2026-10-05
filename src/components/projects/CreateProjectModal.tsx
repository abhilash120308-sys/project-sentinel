"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { ProjectPriority, ProjectStatus } from "@/types";
import { X, Plus, Building2, MapPin, Calendar, IndianRupee, UserCheck, Shield } from "lucide-react";

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateProjectModal: React.FC<CreateProjectModalProps> = ({ isOpen, onClose }) => {
  const { addProject, departments, currentUser } = useApp();

  const [name, setName] = useState("");
  const [code, setCode] = useState(`MOSPI-PRJ-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`);
  const [description, setDescription] = useState("");
  const [objectives, setObjectives] = useState("");
  const [departmentId, setDepartmentId] = useState(departments[0]?.id || "dept-morth");
  const [priority, setPriority] = useState<ProjectPriority>("HIGH");
  const [status, setStatus] = useState<ProjectStatus>("PLANNING");
  const [startDate, setStartDate] = useState(new Date().toISOString().split("T")[0]);
  const [targetEndDate, setTargetEndDate] = useState("2027-12-31");
  const [sanctionedBudget, setSanctionedBudget] = useState("5000");
  const [releasedBudget, setReleasedBudget] = useState("2500");
  const [state, setState] = useState("Maharashtra");
  const [district, setDistrict] = useState("Mumbai");
  const [address, setAddress] = useState("Corridor Sector-4");
  const [managerName, setManagerName] = useState(currentUser.name);
  const [managerEmail, setManagerEmail] = useState(currentUser.email);
  const [managerPhone, setManagerPhone] = useState(currentUser.phone || "+91 11 2334 0001");
  const [tags, setTags] = useState("Infrastructure, Greenfield, High Priority");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const selectedDept = departments.find((d) => d.id === departmentId);

    addProject({
      name,
      code,
      description,
      objectives,
      departmentId,
      departmentName: selectedDept?.name || "National Highways Authority",
      ministry: selectedDept?.ministry || "Ministry of Road Transport and Highways",
      priority,
      status,
      startDate,
      targetEndDate,
      sanctionedBudget: parseFloat(sanctionedBudget) || 1000,
      releasedBudget: parseFloat(releasedBudget) || 500,
      utilizedBudget: 0,
      location: {
        state,
        district,
        address,
        lat: 20.5937 + (Math.random() - 0.5) * 8,
        lng: 78.9629 + (Math.random() - 0.5) * 8,
      },
      managerId: currentUser.id,
      managerName,
      managerEmail,
      managerPhone,
      plannedProgress: 10,
      physicalProgress: 0,
      financialProgress: 0,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      milestones: [
        {
          id: `m-init-1`,
          projectId: "",
          title: "Preliminary Feasibility & Land Demarcation",
          description: "Topographic survey, right-of-way demarcation and utility shifting plan.",
          startDate,
          dueDate: "2026-12-31",
          progressPercentage: 15,
          status: "ON_TRACK",
          assignedOfficer: currentUser.id,
          assignedOfficerName: currentUser.name,
          weightage: 25,
          dependencies: [],
        },
      ],
      issues: [],
      risks: [],
      progressHistory: [],
      transactions: [],
      documents: [],
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-3xl w-full shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-gov-navy to-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base font-heading">Register New Infrastructure Project</h3>
              <p className="text-xs text-slate-300">
                MoSPI Integrated Central Monitoring Enrolment
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Project Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Mumbai Coastal Road (Versova-Dahisar Extension)"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-gov-blue focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Project Code / ID
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-gov-blue focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Project Description & Scope
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detailed scope of works, engineering specifications, and intended economic impact..."
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-gov-blue focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Line Ministry / Department
              </label>
              <select
                value={departmentId}
                onChange={(e) => setDepartmentId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-gov-blue focus:outline-none"
              >
                {departments.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Project Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as ProjectPriority)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-gov-blue focus:outline-none"
              >
                <option value="CRITICAL">Critical (High Impact)</option>
                <option value="HIGH">High</option>
                <option value="MEDIUM">Medium</option>
                <option value="LOW">Low</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Project Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ProjectStatus)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-gov-blue focus:outline-none"
              >
                <option value="PLANNING">Planning</option>
                <option value="NOT_STARTED">Not Started</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="AT_RISK">At Risk</option>
                <option value="DELAYED">Delayed</option>
                <option value="ON_HOLD">On Hold</option>
              </select>
            </div>
          </div>

          {/* Budget & Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 bg-slate-50 dark:bg-slate-800/40 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/60">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Sanctioned Budget (₹ Cr)
              </label>
              <input
                type="number"
                step="0.1"
                required
                value={sanctionedBudget}
                onChange={(e) => setSanctionedBudget(e.target.value)}
                className="w-full px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 font-bold focus:ring-2 focus:ring-gov-blue"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Initial Released (₹ Cr)
              </label>
              <input
                type="number"
                step="0.1"
                value={releasedBudget}
                onChange={(e) => setReleasedBudget(e.target.value)}
                className="w-full px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-gov-blue"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-gov-blue"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Target Completion Date
              </label>
              <input
                type="date"
                value={targetEndDate}
                onChange={(e) => setTargetEndDate(e.target.value)}
                className="w-full px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-gov-blue"
              />
            </div>
          </div>

          {/* Location & Manager */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                State
              </label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="e.g. Gujarat, UP, Assam"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-gov-blue focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                District / Region
              </label>
              <input
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                placeholder="e.g. Ahmedabad"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-gov-blue focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Project Manager Name
              </label>
              <input
                type="text"
                value={managerName}
                onChange={(e) => setManagerName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-gov-blue focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Project Tags (comma-separated)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Bharatmala, Greenfield, High Priority"
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-gov-blue focus:outline-none"
            />
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-gov-blue hover:bg-blue-700 text-white font-bold shadow-md shadow-blue-900/20 transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Enroll Project</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
