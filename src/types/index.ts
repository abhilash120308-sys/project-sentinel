export type UserRole = 
  | 'SUPER_ADMIN'
  | 'PROJECT_ADMIN'
  | 'PROJECT_MANAGER'
  | 'DEPT_OFFICER'
  | 'FIELD_OFFICER'
  | 'VIEWER';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  departmentId: string;
  designation: string;
  phone: string;
  state: string;
  avatarUrl?: string;
  createdAt: string;
}

export type ProjectStatus =
  | 'PLANNING'
  | 'NOT_STARTED'
  | 'IN_PROGRESS'
  | 'AT_RISK'
  | 'DELAYED'
  | 'COMPLETED'
  | 'ON_HOLD';

export type ProjectPriority = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export type MilestoneStatus = 'ON_TRACK' | 'AT_RISK' | 'DELAYED' | 'COMPLETED';

export type IssuePriority = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
export type IssueStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'ESCALATED';
export type IssueCategory = 
  | 'FINANCIAL' 
  | 'APPROVAL' 
  | 'TECHNICAL' 
  | 'RESOURCE' 
  | 'LAND_ACQUISITION' 
  | 'ENVIRONMENTAL' 
  | 'LEGAL'
  | 'OTHER';

export interface TaskSubtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Task {
  id: string;
  milestoneId: string;
  projectId: string;
  title: string;
  assignedTo: string;
  assignedOfficerName: string;
  dueDate: string;
  status: 'TODO' | 'IN_PROGRESS' | 'BLOCKED' | 'COMPLETED';
  priority: ProjectPriority;
  progressPercentage: number;
  subtasks: TaskSubtask[];
}

export interface Milestone {
  id: string;
  projectId: string;
  title: string;
  description: string;
  startDate: string;
  dueDate: string;
  completionDate?: string;
  progressPercentage: number;
  status: MilestoneStatus;
  assignedOfficer: string;
  assignedOfficerName: string;
  weightage: number; // percentage contribution to overall project
  dependencies: string[]; // Milestone IDs
  tasks?: Task[];
}

export interface Transaction {
  id: string;
  projectId: string;
  date: string;
  amount: number; // In Crores (INR)
  category: 'CAPEX' | 'OPEX' | 'PROCUREMENT' | 'CIVIL_WORKS' | 'CONSULTING' | 'CONTINGENCY';
  description: string;
  approvedBy: string;
  voucherNo: string;
  vendor: string;
  status: 'PROCESSED' | 'PENDING' | 'FLAGGED';
}

export interface ProgressUpdate {
  id: string;
  projectId: string;
  date: string;
  physicalProgress: number; // 0-100
  financialProgress: number; // 0-100
  workCompleted: string;
  currentChallenges: string;
  nextPlannedActivities: string;
  photos: string[];
  documents: string[];
  updatedBy: string;
  updatedByName: string;
  userRole: UserRole;
  geoVerification?: {
    lat: number;
    lng: number;
    verified: boolean;
  };
}

export interface Issue {
  id: string;
  projectId: string;
  title: string;
  description: string;
  category: IssueCategory;
  priority: IssuePriority;
  status: IssueStatus;
  assignedOfficer: string;
  assignedOfficerName: string;
  deadline: string;
  resolution?: string;
  escalatedTo?: string;
  createdDate: string;
  resolvedDate?: string;
}

export interface Risk {
  id: string;
  projectId: string;
  title: string;
  category: string;
  probability: 'HIGH' | 'MEDIUM' | 'LOW';
  impact: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  mitigationPlan: string;
  status: 'IDENTIFIED' | 'MITIGATING' | 'CONTROLLED' | 'CLOSED';
  riskScore: number; // calculated 1-100
}

export interface AIInsight {
  projectId: string;
  healthScore: number; // 0 - 100
  delayProbability: number; // 0 - 100%
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  budgetRisk: 'LOW' | 'MEDIUM' | 'HIGH';
  milestoneRisk: 'LOW' | 'MEDIUM' | 'HIGH';
  performanceSummary: string;
  rootCauses: string[];
  recommendedActions: string[];
  predictedCompletionDate: string;
  costVariancePredictedPercent: number;
  lastAnalysisTimestamp: string;
}

export type DocumentCategory = 
  | 'REPORT'
  | 'PROGRESS_REPORT'
  | 'APPROVAL'
  | 'BILL'
  | 'PHOTO'
  | 'CERTIFICATE'
  | 'DPR'
  | 'SANCTION_ORDER';

export interface ProjectDocument {
  id: string;
  projectId: string;
  title: string;
  fileName: string;
  fileType: string;
  fileSize: string;
  category: DocumentCategory;
  uploadedBy: string;
  uploadedByName: string;
  uploadDate: string;
  url: string;
}

export type AlertSeverity = 'CRITICAL' | 'WARNING' | 'INFO';
export type AlertType = 
  | 'OVERDUE_MILESTONE'
  | 'DEADLINE_UPCOMING'
  | 'BUDGET_EXCEEDED'
  | 'LOW_PROGRESS'
  | 'CRITICAL_RISK'
  | 'UNRESOLVED_ISSUE'
  | 'PROJECT_INACTIVITY'
  | 'SYSTEM';

export interface SmartAlert {
  id: string;
  projectId?: string;
  projectName?: string;
  type: AlertType;
  severity: AlertSeverity;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  action: string;
  entityType: 'PROJECT' | 'MILESTONE' | 'BUDGET' | 'ISSUE' | 'RISK' | 'DOCUMENT' | 'USER' | 'AUTH';
  entityId: string;
  projectName?: string;
  timestamp: string;
  previousValue?: string;
  newValue?: string;
  ipAddress?: string;
}

export interface ProjectLocation {
  state: string;
  district: string;
  address: string;
  lat: number;
  lng: number;
}

export interface Project {
  id: string;
  code: string; // e.g., MOSPI-PRJ-2026-001
  name: string;
  description: string;
  objectives: string;
  departmentId: string;
  departmentName: string;
  ministry: string;
  priority: ProjectPriority;
  status: ProjectStatus;
  startDate: string;
  targetEndDate: string;
  revisedEndDate?: string;
  actualEndDate?: string;
  
  // Financial figures in Crores INR (₹ Cr)
  sanctionedBudget: number;
  releasedBudget: number;
  utilizedBudget: number;
  
  location: ProjectLocation;
  
  managerId: string;
  managerName: string;
  managerEmail: string;
  managerPhone: string;
  
  plannedProgress: number; // 0-100%
  physicalProgress: number; // 0-100%
  financialProgress: number; // 0-100%
  
  tags: string[];
  
  milestones: Milestone[];
  issues: Issue[];
  risks: Risk[];
  progressHistory: ProgressUpdate[];
  transactions: Transaction[];
  documents: ProjectDocument[];
  aiInsight?: AIInsight;
  
  createdAt: string;
  updatedAt: string;
}

export interface Department {
  id: string;
  code: string;
  name: string;
  ministry: string;
  nodalOfficer: string;
  officerEmail: string;
  totalProjects: number;
  activeProjects: number;
  delayedProjects: number;
  totalSanctionedBudget: number; // in ₹ Cr
  totalUtilizedBudget: number; // in ₹ Cr
  avgPhysicalProgress: number;
}
