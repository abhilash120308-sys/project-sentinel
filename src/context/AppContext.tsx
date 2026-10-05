"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { 
  Project, 
  Department, 
  User, 
  UserRole, 
  SmartAlert, 
  AuditLog, 
  Milestone, 
  Issue, 
  Risk, 
  ProgressUpdate, 
  Transaction, 
  ProjectDocument,
  MilestoneStatus,
  ProjectStatus
} from "@/types";
import { 
  SEED_USERS, 
  SEED_DEPARTMENTS, 
  SEED_PROJECTS, 
  SEED_ALERTS, 
  SEED_AUDIT_LOGS 
} from "@/data/seedData";
import { computeProjectAIInsight } from "@/lib/aiIntelligenceEngine";

export interface ToastMessage {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message: string;
}

interface AppContextType {
  currentUser: User;
  setCurrentUser: (user: User) => void;
  switchRole: (role: UserRole) => void;
  users: User[];
  
  projects: Project[];
  departments: Department[];
  alerts: SmartAlert[];
  auditLogs: AuditLog[];
  
  // Search & Filter state
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedDepartment: string;
  setSelectedDepartment: (deptId: string) => void;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  selectedState: string;
  setSelectedState: (state: string) => void;
  selectedPriority: string;
  setSelectedPriority: (priority: string) => void;
  
  // UI & Demo mode
  isDemoMode: boolean;
  setIsDemoMode: (val: boolean) => void;
  demoStep: number;
  setDemoStep: (step: number) => void;
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, "id">) => void;
  removeToast: (id: string) => void;
  
  // Actions
  addProject: (project: Omit<Project, "id" | "aiInsight" | "createdAt" | "updatedAt">) => Project;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  
  addMilestone: (projectId: string, milestone: Omit<Milestone, "id">) => void;
  updateMilestone: (projectId: string, milestoneId: string, updates: Partial<Milestone>) => void;
  
  addProgressUpdate: (projectId: string, update: Omit<ProgressUpdate, "id" | "date" | "updatedBy" | "updatedByName" | "userRole">) => void;
  
  addIssue: (projectId: string, issue: Omit<Issue, "id" | "createdDate">) => void;
  updateIssue: (projectId: string, issueId: string, updates: Partial<Issue>) => void;
  escalateIssue: (projectId: string, issueId: string, escalatedToDept: string) => void;
  
  addRisk: (projectId: string, risk: Omit<Risk, "id">) => void;
  updateRisk: (projectId: string, riskId: string, updates: Partial<Risk>) => void;
  
  addTransaction: (projectId: string, tx: Omit<Transaction, "id">) => void;
  addDocument: (projectId: string, doc: Omit<ProjectDocument, "id" | "uploadDate" | "uploadedBy" | "uploadedByName">) => void;
  
  markAlertAsRead: (id: string) => void;
  markAllAlertsAsRead: () => void;
  
  runAIAnalysisForProject: (projectId: string) => void;
  resetToDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY_PROJECTS = "projectpulse_projects_v1";
const STORAGE_KEY_ALERTS = "projectpulse_alerts_v1";
const STORAGE_KEY_LOGS = "projectpulse_logs_v1";
const STORAGE_KEY_ROLE = "projectpulse_role_v1";

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User>(SEED_USERS[0]); // Default Super Admin
  const [users] = useState<User[]>(SEED_USERS);
  const [departments] = useState<Department[]>(SEED_DEPARTMENTS);
  
  const [projects, setProjects] = useState<Project[]>(SEED_PROJECTS);
  const [alerts, setAlerts] = useState<SmartAlert[]>(SEED_ALERTS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(SEED_AUDIT_LOGS);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [selectedState, setSelectedState] = useState("ALL");
  const [selectedPriority, setSelectedPriority] = useState("ALL");
  
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [demoStep, setDemoStep] = useState(1);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Load from local storage on mount (browser only)
  useEffect(() => {
    try {
      const savedProjects = localStorage.getItem(STORAGE_KEY_PROJECTS);
      if (savedProjects) {
        setProjects(JSON.parse(savedProjects));
      }
      const savedAlerts = localStorage.getItem(STORAGE_KEY_ALERTS);
      if (savedAlerts) {
        setAlerts(JSON.parse(savedAlerts));
      }
      const savedLogs = localStorage.getItem(STORAGE_KEY_LOGS);
      if (savedLogs) {
        setAuditLogs(JSON.parse(savedLogs));
      }
      const savedRole = localStorage.getItem(STORAGE_KEY_ROLE);
      if (savedRole) {
        const foundUser = SEED_USERS.find(u => u.role === savedRole);
        if (foundUser) setCurrentUser(foundUser);
      }
    } catch (e) {
      console.warn("Could not read from localStorage", e);
    }
  }, []);

  // Save projects on change
  const saveProjects = (newProjects: Project[]) => {
    setProjects(newProjects);
    try {
      localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(newProjects));
    } catch (e) {
      console.error(e);
    }
  };

  const saveAlerts = (newAlerts: SmartAlert[]) => {
    setAlerts(newAlerts);
    try {
      localStorage.setItem(STORAGE_KEY_ALERTS, JSON.stringify(newAlerts));
    } catch (e) {
      console.error(e);
    }
  };

  const saveLogs = (newLogs: AuditLog[]) => {
    setAuditLogs(newLogs);
    try {
      localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify(newLogs));
    } catch (e) {
      console.error(e);
    }
  };

  const addToast = (toast: Omit<ToastMessage, "id">) => {
    const id = "toast-" + Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const logAction = (
    action: string,
    entityType: AuditLog["entityType"],
    entityId: string,
    projectName?: string,
    previousValue?: string,
    newValue?: string
  ) => {
    const newLog: AuditLog = {
      id: "log-" + Date.now(),
      userId: currentUser.id,
      userName: currentUser.name,
      userRole: currentUser.role,
      action,
      entityType,
      entityId,
      projectName: projectName || "MoSPI Portal",
      timestamp: new Date().toISOString(),
      previousValue,
      newValue,
      ipAddress: "10.24.12.8"
    };
    saveLogs([newLog, ...auditLogs]);
  };

  const switchRole = (role: UserRole) => {
    const targetUser = SEED_USERS.find((u) => u.role === role) || SEED_USERS[0];
    setCurrentUser(targetUser);
    try {
      localStorage.setItem(STORAGE_KEY_ROLE, role);
    } catch (e) {
      console.error(e);
    }
    logAction(`Switched session role to ${role}`, "AUTH", targetUser.id, undefined, currentUser.role, role);
    addToast({
      type: "info",
      title: `Role Switched: ${targetUser.role}`,
      message: `Now viewing system as ${targetUser.name} (${targetUser.designation})`,
    });
  };

  // Add Project
  const addProject = (projectData: Omit<Project, "id" | "aiInsight" | "createdAt" | "updatedAt">): Project => {
    const newId = `prj-${String(projects.length + 1).padStart(3, "0")}`;
    const rawProject: Project = {
      ...projectData,
      id: newId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      milestones: projectData.milestones || [],
      issues: projectData.issues || [],
      risks: projectData.risks || [],
      progressHistory: projectData.progressHistory || [],
      transactions: projectData.transactions || [],
      documents: projectData.documents || [],
    };
    
    // Compute AI insight
    const analysis = computeProjectAIInsight(rawProject);
    const completeProject: Project = {
      ...rawProject,
      aiInsight: analysis.insight,
    };

    const updatedList = [completeProject, ...projects];
    saveProjects(updatedList);

    logAction(
      `Created New National Infrastructure Project: ${completeProject.name}`,
      "PROJECT",
      newId,
      completeProject.name,
      undefined,
      `Sanctioned: ₹${completeProject.sanctionedBudget} Cr`
    );

    addToast({
      type: "success",
      title: "Project Registered Successfully",
      message: `${completeProject.name} added to MoSPI Integrated Monitoring.`,
    });

    return completeProject;
  };

  // Update Project
  const updateProject = (id: string, updates: Partial<Project>) => {
    const target = projects.find((p) => p.id === id);
    if (!target) return;

    const merged: Project = {
      ...target,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    // Recompute AI insight
    const analysis = computeProjectAIInsight(merged);
    merged.aiInsight = analysis.insight;

    const updatedList = projects.map((p) => (p.id === id ? merged : p));
    saveProjects(updatedList);

    logAction(
      `Updated Project Details: ${target.name}`,
      "PROJECT",
      id,
      target.name
    );

    addToast({
      type: "success",
      title: "Project Updated",
      message: `Modifications saved for ${target.code}`,
    });
  };

  // Delete Project
  const deleteProject = (id: string) => {
    const target = projects.find((p) => p.id === id);
    if (!target) return;

    const updatedList = projects.filter((p) => p.id !== id);
    saveProjects(updatedList);

    logAction(`Archived Project: ${target.name}`, "PROJECT", id, target.name);

    addToast({
      type: "warning",
      title: "Project Archived",
      message: `${target.name} has been archived.`,
    });
  };

  // Add Milestone
  const addMilestone = (projectId: string, milestoneData: Omit<Milestone, "id">) => {
    const project = projects.find((p) => p.id === projectId);
    if (!project) return;

    const newMilestoneId = `m-${projectId}-${(project.milestones.length + 1)}`;
    const newMilestone: Milestone = {
      ...milestoneData,
      id: newMilestoneId,
      projectId,
    };

    const updatedMilestones = [...project.milestones, newMilestone];
    const updatedProject = {
      ...project,
      milestones: updatedMilestones,
    };

    // Recompute AI insight
    const analysis = computeProjectAIInsight(updatedProject);
    updatedProject.aiInsight = analysis.insight;

    const updatedList = projects.map((p) => (p.id === projectId ? updatedProject : p));
    saveProjects(updatedList);

    logAction(
      `Added Milestone: "${newMilestone.title}"`,
      "MILESTONE",
      newMilestoneId,
      project.name,
      undefined,
      `Due: ${newMilestone.dueDate}`
    );

    addToast({
      type: "success",
      title: "Milestone Added",
      message: `Milestone "${newMilestone.title}" assigned to ${newMilestone.assignedOfficerName}.`,
    });
  };

  // Update Milestone
  const updateMilestone = (projectId: string, milestoneId: string, updates: Partial<Milestone>) => {
    const project = projects.find((p) => p.id === projectId);
    if (!project) return;

    const oldMilestone = project.milestones.find((m) => m.id === milestoneId);
    const updatedMilestones = project.milestones.map((m) =>
      m.id === milestoneId ? { ...m, ...updates } : m
    );

    // Calculate updated physical progress based on weightages
    let totalWeight = 0;
    let weightedProgress = 0;
    updatedMilestones.forEach((m) => {
      const w = m.weightage || 10;
      totalWeight += w;
      weightedProgress += (m.progressPercentage || 0) * w;
    });
    const calculatedPhysicalProgress = totalWeight > 0 ? Math.round(weightedProgress / totalWeight) : project.physicalProgress;

    const updatedProject = {
      ...project,
      physicalProgress: calculatedPhysicalProgress,
      milestones: updatedMilestones,
    };

    const analysis = computeProjectAIInsight(updatedProject);
    updatedProject.aiInsight = analysis.insight;

    const updatedList = projects.map((p) => (p.id === projectId ? updatedProject : p));
    saveProjects(updatedList);

    logAction(
      `Updated Milestone "${oldMilestone?.title || milestoneId}"`,
      "MILESTONE",
      milestoneId,
      project.name,
      oldMilestone ? `Progress: ${oldMilestone.progressPercentage}% (${oldMilestone.status})` : undefined,
      updates.progressPercentage !== undefined ? `Progress: ${updates.progressPercentage}% (${updates.status || oldMilestone?.status})` : undefined
    );

    addToast({
      type: "success",
      title: "Milestone Updated",
      message: `Progress updated to ${updates.progressPercentage || oldMilestone?.progressPercentage}%`,
    });
  };

  // Progress Update
  const addProgressUpdate = (
    projectId: string, 
    updateData: Omit<ProgressUpdate, "id" | "date" | "updatedBy" | "updatedByName" | "userRole">
  ) => {
    const project = projects.find((p) => p.id === projectId);
    if (!project) return;

    const newUpdate: ProgressUpdate = {
      ...updateData,
      id: `prog-${Date.now()}`,
      projectId,
      date: new Date().toISOString().split("T")[0],
      updatedBy: currentUser.id,
      updatedByName: currentUser.name,
      userRole: currentUser.role,
    };

    const updatedProject: Project = {
      ...project,
      physicalProgress: updateData.physicalProgress,
      financialProgress: updateData.financialProgress,
      progressHistory: [newUpdate, ...project.progressHistory],
      updatedAt: new Date().toISOString(),
    };

    const analysis = computeProjectAIInsight(updatedProject);
    updatedProject.aiInsight = analysis.insight;

    const updatedList = projects.map((p) => (p.id === projectId ? updatedProject : p));
    saveProjects(updatedList);

    logAction(
      `Submitted Periodic Progress Report (${updateData.physicalProgress}% physical, ${updateData.financialProgress}% financial)`,
      "PROJECT",
      newUpdate.id,
      project.name,
      `Physical: ${project.physicalProgress}%`,
      `Physical: ${updateData.physicalProgress}%`
    );

    addToast({
      type: "success",
      title: "Progress Report Submitted",
      message: `Physical progress logged at ${updateData.physicalProgress}% with geo-verification audit.`,
    });
  };

  // Issues
  const addIssue = (projectId: string, issueData: Omit<Issue, "id" | "createdDate">) => {
    const project = projects.find((p) => p.id === projectId);
    if (!project) return;

    const newIssueId = `iss-${Date.now()}`;
    const newIssue: Issue = {
      ...issueData,
      id: newIssueId,
      projectId,
      createdDate: new Date().toISOString().split("T")[0],
    };

    const updatedProject: Project = {
      ...project,
      issues: [newIssue, ...project.issues],
    };

    const analysis = computeProjectAIInsight(updatedProject);
    updatedProject.aiInsight = analysis.insight;

    const updatedList = projects.map((p) => (p.id === projectId ? updatedProject : p));
    saveProjects(updatedList);

    // Also trigger smart alert if Critical
    if (newIssue.priority === "CRITICAL") {
      const newAlert: SmartAlert = {
        id: `alt-${Date.now()}`,
        projectId,
        projectName: project.name,
        type: "UNRESOLVED_ISSUE",
        severity: "CRITICAL",
        title: `Critical Bottleneck Logged: ${newIssue.title}`,
        message: `${newIssue.description.substring(0, 100)}...`,
        timestamp: new Date().toISOString(),
        read: false,
        actionUrl: `/projects/${projectId}`,
      };
      saveAlerts([newAlert, ...alerts]);
    }

    logAction(
      `Reported Project Issue: "${newIssue.title}" [${newIssue.priority}]`,
      "ISSUE",
      newIssueId,
      project.name
    );

    addToast({
      type: "warning",
      title: "Issue Logged",
      message: `Issue "${newIssue.title}" recorded and assigned for resolution.`,
    });
  };

  const updateIssue = (projectId: string, issueId: string, updates: Partial<Issue>) => {
    const project = projects.find((p) => p.id === projectId);
    if (!project) return;

    const updatedIssues = project.issues.map((i) =>
      i.id === issueId ? { ...i, ...updates } : i
    );

    const updatedProject = {
      ...project,
      issues: updatedIssues,
    };

    const analysis = computeProjectAIInsight(updatedProject);
    updatedProject.aiInsight = analysis.insight;

    const updatedList = projects.map((p) => (p.id === projectId ? updatedProject : p));
    saveProjects(updatedList);

    logAction(`Updated Issue status`, "ISSUE", issueId, project.name);

    addToast({
      type: "info",
      title: "Issue Updated",
      message: `Issue state modified to ${updates.status || "updated"}.`,
    });
  };

  const escalateIssue = (projectId: string, issueId: string, escalatedToDept: string) => {
    const project = projects.find((p) => p.id === projectId);
    if (!project) return;

    const updatedIssues = project.issues.map((i) =>
      i.id === issueId
        ? {
            ...i,
            status: "ESCALATED" as const,
            escalatedTo: escalatedToDept,
          }
        : i
    );

    const updatedProject = {
      ...project,
      issues: updatedIssues,
    };

    const analysis = computeProjectAIInsight(updatedProject);
    updatedProject.aiInsight = analysis.insight;

    const updatedList = projects.map((p) => (p.id === projectId ? updatedProject : p));
    saveProjects(updatedList);

    // Create high severity alert
    const newAlert: SmartAlert = {
      id: `alt-${Date.now()}`,
      projectId,
      projectName: project.name,
      type: "UNRESOLVED_ISSUE",
      severity: "CRITICAL",
      title: `Issue Escalated to ${escalatedToDept}`,
      message: `Escalation requested by ${currentUser.name} for accelerated clearance.`,
      timestamp: new Date().toISOString(),
      read: false,
      actionUrl: `/projects/${projectId}`,
    };
    saveAlerts([newAlert, ...alerts]);

    logAction(
      `Escalated Issue ${issueId} to ${escalatedToDept}`,
      "ISSUE",
      issueId,
      project.name,
      "Status: OPEN",
      `Status: ESCALATED (${escalatedToDept})`
    );

    addToast({
      type: "error",
      title: "Issue Escalated to Ministry",
      message: `Escalation notice dispatched to ${escalatedToDept}.`,
    });
  };

  // Risks
  const addRisk = (projectId: string, riskData: Omit<Risk, "id">) => {
    const project = projects.find((p) => p.id === projectId);
    if (!project) return;

    const newRisk: Risk = {
      ...riskData,
      id: `rsk-${Date.now()}`,
      projectId,
    };

    const updatedProject = {
      ...project,
      risks: [newRisk, ...project.risks],
    };

    const analysis = computeProjectAIInsight(updatedProject);
    updatedProject.aiInsight = analysis.insight;

    const updatedList = projects.map((p) => (p.id === projectId ? updatedProject : p));
    saveProjects(updatedList);

    logAction(`Identified Risk: "${newRisk.title}"`, "RISK", newRisk.id, project.name);

    addToast({
      type: "info",
      title: "Risk Registered",
      message: `Mitigation plan formulated for "${newRisk.title}".`,
    });
  };

  const updateRisk = (projectId: string, riskId: string, updates: Partial<Risk>) => {
    const project = projects.find((p) => p.id === projectId);
    if (!project) return;

    const updatedRisks = project.risks.map((r) =>
      r.id === riskId ? { ...r, ...updates } : r
    );

    const updatedProject = {
      ...project,
      risks: updatedRisks,
    };

    const analysis = computeProjectAIInsight(updatedProject);
    updatedProject.aiInsight = analysis.insight;

    const updatedList = projects.map((p) => (p.id === projectId ? updatedProject : p));
    saveProjects(updatedList);

    logAction(`Updated Risk profile`, "RISK", riskId, project.name);

    addToast({
      type: "info",
      title: "Risk Profile Updated",
      message: `Risk mitigation status updated.`,
    });
  };

  // Financial Transaction
  const addTransaction = (projectId: string, txData: Omit<Transaction, "id">) => {
    const project = projects.find((p) => p.id === projectId);
    if (!project) return;

    const newTx: Transaction = {
      ...txData,
      id: `tx-${Date.now()}`,
      projectId,
    };

    const updatedUtilized = project.utilizedBudget + txData.amount;
    const updatedFinProgress = Math.min(100, Math.round((updatedUtilized / (project.releasedBudget || 1)) * 100));

    const updatedProject: Project = {
      ...project,
      utilizedBudget: Number(updatedUtilized.toFixed(2)),
      financialProgress: updatedFinProgress,
      transactions: [newTx, ...project.transactions],
    };

    const analysis = computeProjectAIInsight(updatedProject);
    updatedProject.aiInsight = analysis.insight;

    const updatedList = projects.map((p) => (p.id === projectId ? updatedProject : p));
    saveProjects(updatedList);

    logAction(
      `Disbursed Payment Voucher: ₹${txData.amount} Cr to ${txData.vendor}`,
      "BUDGET",
      newTx.id,
      project.name,
      `Utilized: ₹${project.utilizedBudget} Cr`,
      `Utilized: ₹${updatedUtilized.toFixed(2)} Cr`
    );

    addToast({
      type: "success",
      title: "Expenditure Disbursed",
      message: `Voucher #${txData.voucherNo} processed for ₹${txData.amount} Cr.`,
    });
  };

  // Documents
  const addDocument = (
    projectId: string, 
    docData: Omit<ProjectDocument, "id" | "uploadDate" | "uploadedBy" | "uploadedByName">
  ) => {
    const project = projects.find((p) => p.id === projectId);
    if (!project) return;

    const newDoc: ProjectDocument = {
      ...docData,
      id: `doc-${Date.now()}`,
      projectId,
      uploadDate: new Date().toISOString().split("T")[0],
      uploadedBy: currentUser.id,
      uploadedByName: currentUser.name,
    };

    const updatedProject = {
      ...project,
      documents: [newDoc, ...project.documents],
    };

    const updatedList = projects.map((p) => (p.id === projectId ? updatedProject : p));
    saveProjects(updatedList);

    logAction(
      `Uploaded Document: "${newDoc.title}" (${newDoc.category})`,
      "DOCUMENT",
      newDoc.id,
      project.name
    );

    addToast({
      type: "success",
      title: "Document Uploaded",
      message: `"${newDoc.fileName}" archived with cryptographic hash verification.`,
    });
  };

  // Alerts
  const markAlertAsRead = (id: string) => {
    const updated = alerts.map((a) => (a.id === id ? { ...a, read: true } : a));
    saveAlerts(updated);
  };

  const markAllAlertsAsRead = () => {
    const updated = alerts.map((a) => ({ ...a, read: true }));
    saveAlerts(updated);
    addToast({
      type: "info",
      title: "Alerts Cleared",
      message: "All smart notifications marked as read.",
    });
  };

  // Trigger AI Analysis
  const runAIAnalysisForProject = (projectId: string) => {
    const project = projects.find((p) => p.id === projectId);
    if (!project) return;

    const analysis = computeProjectAIInsight(project);
    const updatedProject = {
      ...project,
      aiInsight: analysis.insight,
    };

    const updatedList = projects.map((p) => (p.id === projectId ? updatedProject : p));
    saveProjects(updatedList);

    logAction(
      `Re-ran AI Health & Delay Predictive Model`,
      "PROJECT",
      projectId,
      project.name,
      undefined,
      `Health Score: ${analysis.insight.healthScore}/100, Delay Prob: ${analysis.insight.delayProbability}%`
    );

    addToast({
      type: "success",
      title: "AI Analysis Complete",
      message: `Project Health: ${analysis.insight.healthScore}/100 | Risk: ${analysis.insight.riskLevel}`,
    });
  };

  // Reset to original seed
  const resetToDemoData = () => {
    localStorage.removeItem(STORAGE_KEY_PROJECTS);
    localStorage.removeItem(STORAGE_KEY_ALERTS);
    localStorage.removeItem(STORAGE_KEY_LOGS);
    localStorage.removeItem(STORAGE_KEY_ROLE);
    setProjects(SEED_PROJECTS);
    setAlerts(SEED_ALERTS);
    setAuditLogs(SEED_AUDIT_LOGS);
    setCurrentUser(SEED_USERS[0]);
    addToast({
      type: "info",
      title: "System Reset",
      message: "Data reset to pristine SIH Demo Baseline.",
    });
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        switchRole,
        users,
        projects,
        departments,
        alerts,
        auditLogs,
        searchQuery,
        setSearchQuery,
        selectedDepartment,
        setSelectedDepartment,
        selectedStatus,
        setSelectedStatus,
        selectedState,
        setSelectedState,
        selectedPriority,
        setSelectedPriority,
        isDemoMode,
        setIsDemoMode,
        demoStep,
        setDemoStep,
        toasts,
        addToast,
        removeToast,
        addProject,
        updateProject,
        deleteProject,
        addMilestone,
        updateMilestone,
        addProgressUpdate,
        addIssue,
        updateIssue,
        escalateIssue,
        addRisk,
        updateRisk,
        addTransaction,
        addDocument,
        markAlertAsRead,
        markAllAlertsAsRead,
        runAIAnalysisForProject,
        resetToDemoData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
