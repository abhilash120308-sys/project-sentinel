import { 
  Project, 
  Department, 
  User, 
  SmartAlert, 
  AuditLog 
} from "@/types";
import { computeProjectAIInsight } from "@/lib/aiIntelligenceEngine";

export const SEED_USERS: User[] = [
  {
    id: "usr-01",
    name: "Dr. Arvind Subramanian",
    email: "superadmin@mospi.gov.in",
    role: "SUPER_ADMIN",
    department: "Ministry of Statistics & Programme Implementation",
    departmentId: "dept-mospi",
    designation: "Chief Director General (Infrastructure Monitoring)",
    phone: "+91 11 2334 0001",
    state: "National (New Delhi)",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    createdAt: "2024-01-15T00:00:00Z"
  },
  {
    id: "usr-02",
    name: "Smt. Rajeshwari Iyer, IAS",
    email: "projadmin@nhai.gov.in",
    role: "PROJECT_ADMIN",
    department: "National Highways Authority of India (MoRTH)",
    departmentId: "dept-morth",
    designation: "Executive Director (Major Corridors)",
    phone: "+91 11 2507 4100",
    state: "New Delhi",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    createdAt: "2024-02-01T00:00:00Z"
  },
  {
    id: "usr-03",
    name: "Er. Vikramaditya Sharma",
    email: "pm.vikram@dfccil.gov.in",
    role: "PROJECT_MANAGER",
    department: "Ministry of Railways (DFCCIL)",
    departmentId: "dept-rail",
    designation: "Chief Project Manager (Western DFC)",
    phone: "+91 22 2657 8899",
    state: "Maharashtra",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    createdAt: "2024-02-10T00:00:00Z"
  },
  {
    id: "usr-04",
    name: "Dr. Ananya Roy",
    email: "officer.roy@jalshakti.gov.in",
    role: "DEPT_OFFICER",
    department: "Department of Water Resources (Jal Shakti)",
    departmentId: "dept-water",
    designation: "Superintending Engineer & Nodal Officer",
    phone: "+91 33 2455 1200",
    state: "West Bengal",
    avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    createdAt: "2024-03-01T00:00:00Z"
  },
  {
    id: "usr-05",
    name: "Er. Sanjay Kumar Gond",
    email: "field.sanjay@nhai.gov.in",
    role: "FIELD_OFFICER",
    department: "National Highways Authority of India (MoRTH)",
    departmentId: "dept-morth",
    designation: "Assistant Resident Engineer",
    phone: "+91 75 5267 9901",
    state: "Madhya Pradesh",
    avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    createdAt: "2024-03-15T00:00:00Z"
  },
  {
    id: "usr-06",
    name: "Shri Alok Vardhan",
    email: "viewer.audit@cag.gov.in",
    role: "VIEWER",
    department: "Comptroller & Auditor General (Evaluation Wing)",
    departmentId: "dept-cag",
    designation: "Senior Audit Inspector",
    phone: "+91 11 2323 5555",
    state: "New Delhi",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    createdAt: "2024-04-01T00:00:00Z"
  }
];

export const SEED_DEPARTMENTS: Department[] = [
  {
    id: "dept-morth",
    code: "MoRTH/NHAI",
    name: "Road Transport & Highways (NHAI)",
    ministry: "Ministry of Road Transport and Highways",
    nodalOfficer: "Smt. Rajeshwari Iyer, IAS",
    officerEmail: "projadmin@nhai.gov.in",
    totalProjects: 6,
    activeProjects: 5,
    delayedProjects: 2,
    totalSanctionedBudget: 84250.0,
    totalUtilizedBudget: 53120.0,
    avgPhysicalProgress: 64.2
  },
  {
    id: "dept-rail",
    code: "MOR/DFCCIL",
    name: "Ministry of Railways & High Speed Rail",
    ministry: "Ministry of Railways",
    nodalOfficer: "Er. Vikramaditya Sharma",
    officerEmail: "pm.vikram@dfccil.gov.in",
    totalProjects: 5,
    activeProjects: 4,
    delayedProjects: 1,
    totalSanctionedBudget: 112500.0,
    totalUtilizedBudget: 78900.0,
    avgPhysicalProgress: 71.5
  },
  {
    id: "dept-water",
    code: "MoJS/NMCG",
    name: "Jal Shakti & Namami Gange",
    ministry: "Ministry of Jal Shakti",
    nodalOfficer: "Dr. Ananya Roy",
    officerEmail: "officer.roy@jalshakti.gov.in",
    totalProjects: 4,
    activeProjects: 4,
    delayedProjects: 1,
    totalSanctionedBudget: 36800.0,
    totalUtilizedBudget: 22400.0,
    avgPhysicalProgress: 58.0
  },
  {
    id: "dept-mohua",
    code: "MoHUA/SCM",
    name: "Housing & Urban Affairs (Smart Cities / Metro)",
    ministry: "Ministry of Housing and Urban Affairs",
    nodalOfficer: "Shri Devendra Patil",
    officerEmail: "nodal.mohua@gov.in",
    totalProjects: 4,
    activeProjects: 3,
    delayedProjects: 1,
    totalSanctionedBudget: 45600.0,
    totalUtilizedBudget: 31200.0,
    avgPhysicalProgress: 68.4
  },
  {
    id: "dept-power",
    code: "MNRE/SECI",
    name: "New & Renewable Energy (Solar/Wind)",
    ministry: "Ministry of New and Renewable Energy",
    nodalOfficer: "Dr. K. Srinivas",
    officerEmail: "solar.nodal@mnre.gov.in",
    totalProjects: 3,
    activeProjects: 3,
    delayedProjects: 0,
    totalSanctionedBudget: 28400.0,
    totalUtilizedBudget: 19850.0,
    avgPhysicalProgress: 82.0
  },
  {
    id: "dept-health",
    code: "MoHFW/PMSSY",
    name: "Health & Family Welfare (AIIMS Infra)",
    ministry: "Ministry of Health and Family Welfare",
    nodalOfficer: "Dr. Meenakshi Sundaram",
    officerEmail: "pmssy.nodal@mohfw.gov.in",
    totalProjects: 2,
    activeProjects: 2,
    delayedProjects: 0,
    totalSanctionedBudget: 14200.0,
    totalUtilizedBudget: 9600.0,
    avgPhysicalProgress: 76.5
  }
];

const RAW_PROJECTS: Omit<Project, 'aiInsight'>[] = [
  {
    id: "prj-001",
    code: "MOSPI-NHAI-2024-001",
    name: "Delhi-Mumbai Expressway Phase-IV (Vadodara-Virar Stretch)",
    description: "Construction of 8-lane access-controlled greenfield expressway stretch spanning 354 km with wildlife crossings, smart ITS, and wayside amenities.",
    objectives: "Reduce transit time between Delhi and Mumbai to 12 hours, boost logistics efficiency, and provide world-class freight mobility.",
    departmentId: "dept-morth",
    departmentName: "Road Transport & Highways (NHAI)",
    ministry: "Ministry of Road Transport and Highways",
    priority: "CRITICAL",
    status: "IN_PROGRESS",
    startDate: "2022-04-01",
    targetEndDate: "2026-10-31",
    sanctionedBudget: 24500.0,
    releasedBudget: 18200.0,
    utilizedBudget: 16450.0,
    location: {
      state: "Gujarat",
      district: "Vadodara",
      address: "NH-48 Corridor, Bharuch - Valsad - Virar Section",
      lat: 22.3072,
      lng: 73.1812
    },
    managerId: "usr-02",
    managerName: "Smt. Rajeshwari Iyer, IAS",
    managerEmail: "projadmin@nhai.gov.in",
    managerPhone: "+91 11 2507 4100",
    plannedProgress: 78.0,
    physicalProgress: 72.5,
    financialProgress: 67.1,
    tags: ["Bharatmala", "Expressway", "Greenfield", "High Priority"],
    milestones: [
      {
        id: "m-001-1",
        projectId: "prj-001",
        title: "Land Acquisition & Forest Clearance (Package 1-4)",
        description: "100% Right of Way handover and MoEFCC clearance across 2,400 hectares.",
        startDate: "2022-04-01",
        dueDate: "2023-03-31",
        completionDate: "2023-04-15",
        progressPercentage: 100,
        status: "COMPLETED",
        assignedOfficer: "usr-02",
        assignedOfficerName: "Smt. Rajeshwari Iyer",
        weightage: 20,
        dependencies: []
      },
      {
        id: "m-001-2",
        projectId: "prj-001",
        title: "Subgrade, Earthwork & Major Bridges Construction",
        description: "Execution of 18 major river bridges including Narmada Cable-Stayed Bridge.",
        startDate: "2023-04-01",
        dueDate: "2024-12-31",
        completionDate: "2025-01-20",
        progressPercentage: 100,
        status: "COMPLETED",
        assignedOfficer: "usr-05",
        assignedOfficerName: "Er. Sanjay Kumar Gond",
        weightage: 30,
        dependencies: ["m-001-1"]
      },
      {
        id: "m-001-3",
        projectId: "prj-001",
        title: "Rigid Pavement Concrete Layer (PQC) Laying",
        description: "High performance PQC laying across Package 5 to Package 8.",
        startDate: "2025-01-01",
        dueDate: "2026-04-30",
        progressPercentage: 68,
        status: "ON_TRACK",
        assignedOfficer: "usr-05",
        assignedOfficerName: "Er. Sanjay Kumar Gond",
        weightage: 30,
        dependencies: ["m-001-2"]
      },
      {
        id: "m-001-4",
        projectId: "prj-001",
        title: "Intelligent Traffic Management (ITMS) & Toll Plazas",
        description: "Fiber-optic backbone, AI incident cameras, and high-speed ANPR toll gantries.",
        startDate: "2026-02-01",
        dueDate: "2026-09-30",
        progressPercentage: 25,
        status: "ON_TRACK",
        assignedOfficer: "usr-02",
        assignedOfficerName: "Smt. Rajeshwari Iyer",
        weightage: 20,
        dependencies: ["m-001-3"]
      }
    ],
    issues: [
      {
        id: "iss-001-1",
        projectId: "prj-001",
        title: "Local monsoon inundation along Daman Ganga bridge pier foundation",
        description: "Heavy rain in Valsad district necessitated cofferdam reinforcement and underwater inspection.",
        category: "TECHNICAL",
        priority: "MEDIUM",
        status: "RESOLVED",
        assignedOfficer: "usr-05",
        assignedOfficerName: "Er. Sanjay Kumar Gond",
        deadline: "2025-09-15",
        resolution: "Installed interlocking sheet piles and completed foundation grouting.",
        createdDate: "2025-08-01",
        resolvedDate: "2025-09-10"
      }
    ],
    risks: [
      {
        id: "rsk-001-1",
        projectId: "prj-001",
        title: "Bitumen and cement price escalation volatility",
        category: "Financial",
        probability: "MEDIUM",
        impact: "MEDIUM",
        mitigationPlan: "Standard price index variation clause invoked under FIDIC EPC contract.",
        status: "MITIGATING",
        riskScore: 45
      }
    ],
    progressHistory: [
      {
        id: "prog-001-1",
        projectId: "prj-001",
        date: "2026-08-20",
        physicalProgress: 72.5,
        financialProgress: 67.1,
        workCompleted: "Completed 248 km of PQC surface. Installed 14 overbridges in Bharuch section.",
        currentChallenges: "Slight delay in transformer delivery for toll plazas at Package 7.",
        nextPlannedActivities: "Commence smart variable messaging display installations.",
        photos: ["https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600&auto=format&fit=crop&q=80"],
        documents: ["DOC-MONTHLY-AUG2026.pdf"],
        updatedBy: "usr-05",
        updatedByName: "Er. Sanjay Kumar Gond",
        userRole: "FIELD_OFFICER"
      }
    ],
    transactions: [
      {
        id: "tx-001-1",
        projectId: "prj-001",
        date: "2026-08-10",
        amount: 850.5,
        category: "CIVIL_WORKS",
        description: "Milestone 3 IPC Running Account Bill #24 for PQC works",
        approvedBy: "Smt. Rajeshwari Iyer, IAS",
        voucherNo: "NHAI/VAD/2026/088",
        vendor: "Larsen & Toubro Infra Ltd.",
        status: "PROCESSED"
      },
      {
        id: "tx-001-2",
        projectId: "prj-001",
        date: "2026-07-02",
        amount: 420.0,
        category: "PROCUREMENT",
        description: "Smart Toll and ITMS electronics equipment advance",
        approvedBy: "Smt. Rajeshwari Iyer, IAS",
        voucherNo: "NHAI/VAD/2026/071",
        vendor: "Bharat Electronics Ltd (BEL)",
        status: "PROCESSED"
      }
    ],
    documents: [
      {
        id: "doc-001-1",
        projectId: "prj-001",
        title: "Detailed Project Report (DPR) Volume I & II",
        fileName: "DPR_Vadodara_Virar_Expressway.pdf",
        fileType: "PDF",
        fileSize: "18.4 MB",
        category: "DPR",
        uploadedBy: "usr-02",
        uploadedByName: "Smt. Rajeshwari Iyer",
        uploadDate: "2022-04-10",
        url: "#"
      },
      {
        id: "doc-001-2",
        projectId: "prj-001",
        title: "MoEFCC Environmental Clearance Certificate",
        fileName: "EC_MoEFCC_NHAI_Gujarat.pdf",
        fileType: "PDF",
        fileSize: "2.1 MB",
        category: "APPROVAL",
        uploadedBy: "usr-02",
        uploadedByName: "Smt. Rajeshwari Iyer",
        uploadDate: "2022-06-20",
        url: "#"
      }
    ],
    createdAt: "2022-04-01T00:00:00Z",
    updatedAt: "2026-08-20T10:00:00Z"
  },
  {
    id: "prj-002",
    code: "MOSPI-RAIL-2024-002",
    name: "Western Dedicated Freight Corridor (Jawaharlal Nehru Port to Dadri)",
    description: "1,504 km dedicated heavy-haul electrified double-line freight railway corridor designed for 25-tonne axle load trains operating at 100 km/h.",
    objectives: "Decongest Indian Railways trunk network, triple freight velocity, cut carbon footprint by 50% on key export corridors.",
    departmentId: "dept-rail",
    departmentName: "Ministry of Railways & High Speed Rail",
    ministry: "Ministry of Railways",
    priority: "CRITICAL",
    status: "AT_RISK",
    startDate: "2020-01-15",
    targetEndDate: "2026-12-31",
    sanctionedBudget: 51000.0,
    releasedBudget: 42000.0,
    utilizedBudget: 38750.0,
    location: {
      state: "Maharashtra",
      district: "Navi Mumbai",
      address: "JNPT Terminal - Vaitarna - Surat - Palanpur - Rewari - Dadri",
      lat: 18.9499,
      lng: 72.9515
    },
    managerId: "usr-03",
    managerName: "Er. Vikramaditya Sharma",
    managerEmail: "pm.vikram@dfccil.gov.in",
    managerPhone: "+91 22 2657 8899",
    plannedProgress: 94.0,
    physicalProgress: 81.0,
    financialProgress: 75.9,
    tags: ["DFCCIL", "Freight Corridor", "Railways", "High Impact"],
    milestones: [
      {
        id: "m-002-1",
        projectId: "prj-002",
        title: "Rewari to Madar Section Commissioning (306 km)",
        description: "Complete track laying, 2x25kV OHE electrification, and automatic signalling.",
        startDate: "2020-01-15",
        dueDate: "2021-01-31",
        completionDate: "2021-01-07",
        progressPercentage: 100,
        status: "COMPLETED",
        assignedOfficer: "usr-03",
        assignedOfficerName: "Er. Vikramaditya Sharma",
        weightage: 25,
        dependencies: []
      },
      {
        id: "m-002-2",
        projectId: "prj-002",
        title: "Madar to Palanpur & Sanand Feeder Lines (353 km)",
        description: "Double stack container train corridor operations commencement.",
        startDate: "2021-02-01",
        dueDate: "2023-06-30",
        completionDate: "2023-08-15",
        progressPercentage: 100,
        status: "COMPLETED",
        assignedOfficer: "usr-03",
        assignedOfficerName: "Er. Vikramaditya Sharma",
        weightage: 25,
        dependencies: ["m-002-1"]
      },
      {
        id: "m-002-3",
        projectId: "prj-002",
        title: "Vaitarna to JNPT Port Connectivity Tunnel & Bridge (108 km)",
        description: "Construction of 1 km tunnel across Parsik hill and elevated viaduct over creek.",
        startDate: "2023-07-01",
        dueDate: "2025-11-30",
        progressPercentage: 58,
        status: "DELAYED",
        assignedOfficer: "usr-03",
        assignedOfficerName: "Er. Vikramaditya Sharma",
        weightage: 30,
        dependencies: ["m-002-2"]
      },
      {
        id: "m-002-4",
        projectId: "prj-002",
        title: "Full Integrated Supervisory Control (SCADA) & Trial Runs",
        description: "Operations control center integration at Ahmedabad and OCC Prayagraj.",
        startDate: "2026-01-01",
        dueDate: "2026-11-30",
        progressPercentage: 35,
        status: "AT_RISK",
        assignedOfficer: "usr-03",
        assignedOfficerName: "Er. Vikramaditya Sharma",
        weightage: 20,
        dependencies: ["m-002-3"]
      }
    ],
    issues: [
      {
        id: "iss-002-1",
        projectId: "prj-002",
        title: "Right of Way land encroachment clearance near Diva junction",
        description: "12.4 hectares of rail boundary land has unauthorized settlements delaying feeder flyover construction.",
        category: "LAND_ACQUISITION",
        priority: "CRITICAL",
        status: "ESCALATED",
        assignedOfficer: "usr-03",
        assignedOfficerName: "Er. Vikramaditya Sharma",
        deadline: "2026-05-30",
        escalatedTo: "Ministry of Statistics & Programme Implementation (Nodal High Powered Committee)",
        createdDate: "2026-02-10"
      },
      {
        id: "iss-002-2",
        projectId: "prj-002",
        title: "Substation power grid synchronization delay at Palghar",
        description: "Delay in 220kV power feeder transmission line stringing by State DISCOM.",
        category: "TECHNICAL",
        priority: "HIGH",
        status: "IN_PROGRESS",
        assignedOfficer: "usr-03",
        assignedOfficerName: "Er. Vikramaditya Sharma",
        deadline: "2026-09-30",
        createdDate: "2026-04-18"
      }
    ],
    risks: [
      {
        id: "rsk-002-1",
        projectId: "prj-002",
        title: "JNPT port connectivity delay causing commercial revenue loss",
        category: "Operational",
        probability: "HIGH",
        impact: "CRITICAL",
        mitigationPlan: "Temporary single-line freight bypass operationalized via existing central railway grid.",
        status: "MITIGATING",
        riskScore: 82
      }
    ],
    progressHistory: [
      {
        id: "prog-002-1",
        projectId: "prj-002",
        date: "2026-08-15",
        physicalProgress: 81.0,
        financialProgress: 75.9,
        workCompleted: "Completed 80% tunnel boring at Parsik stretch; track laid up to Vaitarna North.",
        currentChallenges: "Land dispute near Diva corridor pending State Revenue clearance.",
        nextPlannedActivities: "Target completion of remaining 400m tunnel excavation by Q3 2026.",
        photos: ["https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80"],
        documents: ["WDFC-STATUS-Q2-2026.pdf"],
        updatedBy: "usr-03",
        updatedByName: "Er. Vikramaditya Sharma",
        userRole: "PROJECT_MANAGER"
      }
    ],
    transactions: [
      {
        id: "tx-002-1",
        projectId: "prj-002",
        date: "2026-08-01",
        amount: 1240.0,
        category: "CIVIL_WORKS",
        description: "Specialized viaduct launching contractor payment (Package CTP-12)",
        approvedBy: "Er. Vikramaditya Sharma",
        voucherNo: "DFCCIL/WDFC/2026/102",
        vendor: "Tata Projects - Aldesa JV",
        status: "PROCESSED"
      }
    ],
    documents: [
      {
        id: "doc-002-1",
        projectId: "prj-002",
        title: "Sanctioned Scheme & Alignment Approval (WDFC)",
        fileName: "WDFC_Sanction_Gazette_2020.pdf",
        fileType: "PDF",
        fileSize: "8.6 MB",
        category: "SANCTION_ORDER",
        uploadedBy: "usr-03",
        uploadedByName: "Er. Vikramaditya Sharma",
        uploadDate: "2020-01-20",
        url: "#"
      }
    ],
    createdAt: "2020-01-15T00:00:00Z",
    updatedAt: "2026-08-15T16:00:00Z"
  },
  {
    id: "prj-003",
    code: "MOSPI-JAL-2024-003",
    name: "Jal Jeevan Mission – Rural Piped Water Supply (Bundelkhand Region)",
    description: "Comprehensive surface-water multi-village scheme supplying safe potable tap water to 4,500 rural habitations across 7 drought-prone districts.",
    objectives: "Provide functional household tap connection (FHTC) of 55 LPCD potable water to 100% rural families.",
    departmentId: "dept-water",
    departmentName: "Jal Shakti & Namami Gange",
    ministry: "Ministry of Jal Shakti",
    priority: "HIGH",
    status: "IN_PROGRESS",
    startDate: "2021-08-15",
    targetEndDate: "2026-11-30",
    sanctionedBudget: 15800.0,
    releasedBudget: 12500.0,
    utilizedBudget: 10980.0,
    location: {
      state: "Uttar Pradesh",
      district: "Jhansi",
      address: "Jhansi, Lalitpur, Mahoba, Banda, Chitrakoot",
      lat: 25.4484,
      lng: 78.5685
    },
    managerId: "usr-04",
    managerName: "Dr. Ananya Roy",
    managerEmail: "officer.roy@jalshakti.gov.in",
    managerPhone: "+91 33 2455 1200",
    plannedProgress: 88.0,
    physicalProgress: 82.0,
    financialProgress: 69.5,
    tags: ["JalJeevanMission", "WaterSupply", "RuralInfra", "HarGharJal"],
    milestones: [
      {
        id: "m-003-1",
        projectId: "prj-003",
        title: "Intake Well & Raw Water Pumping Stations on Betwa River",
        description: "Construct 8 river intake structures with heavy duty centrifugal pumps.",
        startDate: "2021-08-15",
        dueDate: "2023-04-30",
        completionDate: "2023-05-10",
        progressPercentage: 100,
        status: "COMPLETED",
        assignedOfficer: "usr-04",
        assignedOfficerName: "Dr. Ananya Roy",
        weightage: 25,
        dependencies: []
      },
      {
        id: "m-003-2",
        projectId: "prj-003",
        title: "Water Treatment Plants (WTP) of 480 MLD Total Capacity",
        description: "Commissioning of modern clariflocculators and rapid gravity sand filters.",
        startDate: "2023-05-01",
        dueDate: "2025-02-28",
        completionDate: "2025-03-12",
        progressPercentage: 100,
        status: "COMPLETED",
        assignedOfficer: "usr-04",
        assignedOfficerName: "Dr. Ananya Roy",
        weightage: 30,
        dependencies: ["m-003-1"]
      },
      {
        id: "m-003-3",
        projectId: "prj-003",
        title: "Distribution Pipeline Network & Overhead Reservoirs",
        description: "Laying of 14,200 km ductile iron and HDPE pipes and 620 overhead tanks.",
        startDate: "2024-01-01",
        dueDate: "2026-08-31",
        progressPercentage: 86,
        status: "ON_TRACK",
        assignedOfficer: "usr-04",
        assignedOfficerName: "Dr. Ananya Roy",
        weightage: 30,
        dependencies: ["m-003-2"]
      },
      {
        id: "m-003-4",
        projectId: "prj-003",
        title: "IoT Smart Water Quality Sensor Installation & FHTC Handover",
        description: "Real-time residual chlorine, turbidity, and flow sensors integrated into MoSPI dashboard.",
        startDate: "2026-03-01",
        dueDate: "2026-11-30",
        progressPercentage: 45,
        status: "ON_TRACK",
        assignedOfficer: "usr-04",
        assignedOfficerName: "Dr. Ananya Roy",
        weightage: 15,
        dependencies: ["m-003-3"]
      }
    ],
    issues: [
      {
        id: "iss-003-1",
        projectId: "prj-003",
        title: "Underground rocky strata slowing trench excavation in Chitrakoot block",
        description: "Heavy granite bed required deployment of hydraulic rock breakers.",
        category: "TECHNICAL",
        priority: "MEDIUM",
        status: "RESOLVED",
        assignedOfficer: "usr-04",
        assignedOfficerName: "Dr. Ananya Roy",
        deadline: "2026-03-15",
        resolution: "Brought 4 additional hydraulic rock breakers and modified pipe alignment.",
        createdDate: "2026-01-10",
        resolvedDate: "2026-03-05"
      }
    ],
    risks: [
      {
        id: "rsk-003-1",
        projectId: "prj-003",
        title: "Groundwater depletion at secondary recharge borewells",
        category: "Environmental",
        probability: "LOW",
        impact: "HIGH",
        mitigationPlan: "Constructed check dams and artificial recharge shafts under convergence with MGNREGA.",
        status: "CONTROLLED",
        riskScore: 28
      }
    ],
    progressHistory: [
      {
        id: "prog-003-1",
        projectId: "prj-003",
        date: "2026-08-25",
        physicalProgress: 82.0,
        financialProgress: 69.5,
        workCompleted: "Supplied potable water to 3,690 habitations. 480 IoT telemetry nodes activated.",
        currentChallenges: "Last-mile household connection approvals in forested villages.",
        nextPlannedActivities: "Complete final 14% household connections by end of October.",
        photos: ["https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?w=600&auto=format&fit=crop&q=80"],
        documents: ["JJM-PROGRESS-AUG2026.pdf"],
        updatedBy: "usr-04",
        updatedByName: "Dr. Ananya Roy",
        userRole: "DEPT_OFFICER"
      }
    ],
    transactions: [
      {
        id: "tx-003-1",
        projectId: "prj-003",
        date: "2026-07-28",
        amount: 340.2,
        category: "PROCUREMENT",
        description: "IoT Telemetry Water Meters and Smart Sensors Phase-3 Delivery",
        approvedBy: "Dr. Ananya Roy",
        voucherNo: "JJM/UP/JHN/2026/044",
        vendor: "Schneider Electric India Pvt Ltd",
        status: "PROCESSED"
      }
    ],
    documents: [
      {
        id: "doc-003-1",
        projectId: "prj-003",
        title: "Administrative Sanction & Fund Allotment Order",
        fileName: "JJM_Bundelkhand_Sanction_2021.pdf",
        fileType: "PDF",
        fileSize: "4.2 MB",
        category: "SANCTION_ORDER",
        uploadedBy: "usr-04",
        uploadedByName: "Dr. Ananya Roy",
        uploadDate: "2021-08-20",
        url: "#"
      }
    ],
    createdAt: "2021-08-15T00:00:00Z",
    updatedAt: "2026-08-25T11:30:00Z"
  },
  {
    id: "prj-004",
    code: "MOSPI-RENEW-2024-004",
    name: "Ultra Mega Solar Park (4,000 MW Ultra Renewable Park, Dholera SIR)",
    description: "Development of Asia's largest single-location grid-connected solar park with 1,000 MWh Battery Energy Storage System (BESS) and 765kV green corridor substation.",
    objectives: "Generate 7.5 billion units of green electricity annually, avoiding 6 million tonnes of CO2 emissions.",
    departmentId: "dept-power",
    departmentName: "New & Renewable Energy (Solar/Wind)",
    ministry: "Ministry of New and Renewable Energy",
    priority: "HIGH",
    status: "IN_PROGRESS",
    startDate: "2023-01-10",
    targetEndDate: "2027-03-31",
    sanctionedBudget: 19500.0,
    releasedBudget: 14800.0,
    utilizedBudget: 13200.0,
    location: {
      state: "Gujarat",
      district: "Ahmedabad",
      address: "Dholera Special Investment Region (SIR), Gulf of Khambhat",
      lat: 22.2475,
      lng: 72.1956
    },
    managerId: "usr-01",
    managerName: "Dr. Arvind Subramanian",
    managerEmail: "superadmin@mospi.gov.in",
    managerPhone: "+91 11 2334 0001",
    plannedProgress: 65.0,
    physicalProgress: 68.0,
    financialProgress: 67.7,
    tags: ["SolarPark", "RenewableEnergy", "CleanEnergy", "DholeraSIR"],
    milestones: [
      {
        id: "m-004-1",
        projectId: "prj-004",
        title: "Land Boundary Development & Coastal Bund Protection",
        description: "11,000 hectares plot grading and anti-salinity bund construction.",
        startDate: "2023-01-10",
        dueDate: "2024-03-31",
        completionDate: "2024-03-15",
        progressPercentage: 100,
        status: "COMPLETED",
        assignedOfficer: "usr-01",
        assignedOfficerName: "Dr. Arvind Subramanian",
        weightage: 20,
        dependencies: []
      },
      {
        id: "m-004-2",
        projectId: "prj-004",
        title: "Phase-I 1,500 MW PV Arrays & Inverters Installation",
        description: "Installation of bifacial mono-PERC solar modules and robotic dry cleaners.",
        startDate: "2024-04-01",
        dueDate: "2025-06-30",
        completionDate: "2025-05-20",
        progressPercentage: 100,
        status: "COMPLETED",
        assignedOfficer: "usr-01",
        assignedOfficerName: "Dr. Arvind Subramanian",
        weightage: 35,
        dependencies: ["m-004-1"]
      },
      {
        id: "m-004-3",
        projectId: "prj-004",
        title: "Phase-II 2,500 MW PV Modules & 765kV Substation",
        description: "Grid integration with PowerGrid Inter-State Transmission System.",
        startDate: "2025-06-01",
        dueDate: "2026-09-30",
        progressPercentage: 62,
        status: "ON_TRACK",
        assignedOfficer: "usr-01",
        assignedOfficerName: "Dr. Arvind Subramanian",
        weightage: 30,
        dependencies: ["m-004-2"]
      },
      {
        id: "m-004-4",
        projectId: "prj-004",
        title: "1,000 MWh Battery Energy Storage System (BESS) Commissioning",
        description: "Grid stabilization and round-the-clock green power peak dispatch system.",
        startDate: "2026-01-01",
        dueDate: "2027-03-31",
        progressPercentage: 20,
        status: "ON_TRACK",
        assignedOfficer: "usr-01",
        assignedOfficerName: "Dr. Arvind Subramanian",
        weightage: 15,
        dependencies: ["m-004-3"]
      }
    ],
    issues: [],
    risks: [
      {
        id: "rsk-004-1",
        projectId: "prj-004",
        title: "High coastal salinity corrosion on tracker mounting structures",
        category: "Technical",
        probability: "MEDIUM",
        impact: "MEDIUM",
        mitigationPlan: "Mandated zinc-aluminum-magnesium (ZAM) 310gsm coating for all structural steel.",
        status: "CONTROLLED",
        riskScore: 32
      }
    ],
    progressHistory: [
      {
        id: "prog-004-1",
        projectId: "prj-004",
        date: "2026-08-18",
        physicalProgress: 68.0,
        financialProgress: 67.7,
        workCompleted: "Phase-I generation touched 1,420 MW peak. Commenced testing on 765kV switchyard.",
        currentChallenges: "Global container freight lead times for inverter transformers.",
        nextPlannedActivities: "Energize second 765kV ICT transformer bay.",
        photos: ["https://images.unsplash.com/photo-1509391365360-2e959784a276?w=600&auto=format&fit=crop&q=80"],
        documents: ["DHOLERA-PROGRESS-Q2.pdf"],
        updatedBy: "usr-01",
        updatedByName: "Dr. Arvind Subramanian",
        userRole: "SUPER_ADMIN"
      }
    ],
    transactions: [
      {
        id: "tx-004-1",
        projectId: "prj-004",
        date: "2026-07-15",
        amount: 890.0,
        category: "PROCUREMENT",
        description: "High-Efficiency Solar Modules Consignment #18 Delivery",
        approvedBy: "Dr. Arvind Subramanian",
        voucherNo: "MNRE/SECI/DHL/2026/012",
        vendor: "Tata Power Solar Systems Ltd",
        status: "PROCESSED"
      }
    ],
    documents: [
      {
        id: "doc-004-1",
        projectId: "prj-004",
        title: "Power Purchase Agreement (PPA) with SECI & DISCOMs",
        fileName: "Dholera_Solar_Park_PPA.pdf",
        fileType: "PDF",
        fileSize: "12.3 MB",
        category: "APPROVAL",
        uploadedBy: "usr-01",
        uploadedByName: "Dr. Arvind Subramanian",
        uploadDate: "2023-01-25",
        url: "#"
      }
    ],
    createdAt: "2023-01-10T00:00:00Z",
    updatedAt: "2026-08-18T14:20:00Z"
  },
  {
    id: "prj-005",
    code: "MOSPI-HEALTH-2024-005",
    name: "AIIMS Guwahati 750-Bed Super Speciality Hospital & Medical College",
    description: "Establishment of premier AIIMS healthcare campus with 750 hospital beds, 28 super-speciality departments, trauma center, and medical research block.",
    objectives: "Provide tertiary and quaternary healthcare access to North Eastern Region population and foster top-tier medical education.",
    departmentId: "dept-health",
    departmentName: "Health & Family Welfare (AIIMS Infra)",
    ministry: "Ministry of Health and Family Welfare",
    priority: "HIGH",
    status: "COMPLETED",
    startDate: "2020-09-01",
    targetEndDate: "2026-04-30",
    actualEndDate: "2026-04-14",
    sanctionedBudget: 1890.0,
    releasedBudget: 1890.0,
    utilizedBudget: 1845.0,
    location: {
      state: "Assam",
      district: "Kamrup",
      address: "Changsari, Kamrup Rural District",
      lat: 26.2441,
      lng: 91.6881
    },
    managerId: "usr-01",
    managerName: "Dr. Arvind Subramanian",
    managerEmail: "superadmin@mospi.gov.in",
    managerPhone: "+91 11 2334 0001",
    plannedProgress: 100.0,
    physicalProgress: 100.0,
    financialProgress: 97.6,
    tags: ["AIIMS", "Healthcare", "PMSSY", "NorthEast"],
    milestones: [
      {
        id: "m-005-1",
        projectId: "prj-005",
        title: "OPD & Academic Block Civil Construction",
        description: "Construction of 6-storey academic complex and student hostels.",
        startDate: "2020-09-01",
        dueDate: "2022-12-31",
        completionDate: "2022-11-20",
        progressPercentage: 100,
        status: "COMPLETED",
        assignedOfficer: "usr-01",
        assignedOfficerName: "Dr. Arvind Subramanian",
        weightage: 35,
        dependencies: []
      },
      {
        id: "m-005-2",
        projectId: "prj-005",
        title: "IPD Hospital Tower, ICUs & Modular Operation Theatres (MOT)",
        description: "16 State-of-the-art MOTs with laminar air flow and HEPA filters.",
        startDate: "2022-01-01",
        dueDate: "2024-06-30",
        completionDate: "2024-06-10",
        progressPercentage: 100,
        status: "COMPLETED",
        assignedOfficer: "usr-01",
        assignedOfficerName: "Dr. Arvind Subramanian",
        weightage: 40,
        dependencies: ["m-005-1"]
      },
      {
        id: "m-005-3",
        projectId: "prj-005",
        title: "Advanced Medical Equipment (3T MRI, 128-Slice CT, LINAC)",
        description: "Installation, radiation AERB safety clearance, and trial calibration.",
        startDate: "2024-07-01",
        dueDate: "2026-03-31",
        completionDate: "2026-04-10",
        progressPercentage: 100,
        status: "COMPLETED",
        assignedOfficer: "usr-01",
        assignedOfficerName: "Dr. Arvind Subramanian",
        weightage: 25,
        dependencies: ["m-005-2"]
      }
    ],
    issues: [],
    risks: [],
    progressHistory: [
      {
        id: "prog-005-1",
        projectId: "prj-005",
        date: "2026-04-15",
        physicalProgress: 100.0,
        financialProgress: 97.6,
        workCompleted: "Final occupancy certificate obtained. Facility fully commissioned for public service.",
        currentChallenges: "None. All snag list items resolved.",
        nextPlannedActivities: "Operational post-handover maintenance audits.",
        photos: ["https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=600&auto=format&fit=crop&q=80"],
        documents: ["COMPLETION-CERT-AIIMS-GHY.pdf"],
        updatedBy: "usr-01",
        updatedByName: "Dr. Arvind Subramanian",
        userRole: "SUPER_ADMIN"
      }
    ],
    transactions: [
      {
        id: "tx-005-1",
        projectId: "prj-005",
        date: "2026-04-12",
        amount: 85.4,
        category: "CONSULTING",
        description: "Final PMC Certification & Defect Liability Retainage Release",
        approvedBy: "Dr. Arvind Subramanian",
        voucherNo: "MOHFW/AIIMS/GHY/2026/099",
        vendor: "HSCC (India) Limited",
        status: "PROCESSED"
      }
    ],
    documents: [
      {
        id: "doc-005-1",
        projectId: "prj-005",
        title: "Final Completion & Handover Certificate",
        fileName: "Handover_AIIMS_Guwahati_2026.pdf",
        fileType: "PDF",
        fileSize: "3.4 MB",
        category: "CERTIFICATE",
        uploadedBy: "usr-01",
        uploadedByName: "Dr. Arvind Subramanian",
        uploadDate: "2026-04-14",
        url: "#"
      }
    ],
    createdAt: "2020-09-01T00:00:00Z",
    updatedAt: "2026-04-15T09:00:00Z"
  },
  {
    id: "prj-006",
    code: "MOSPI-URBAN-2024-006",
    name: "Bengaluru Metro Phase 2A & 2B (Silk Board to Kempegowda Airport Line)",
    description: "58.19 km elevated Metro rail corridor with 30 stations linking Central Silk Board, ORR IT Corridor, Hebbal, and Bengaluru International Airport.",
    objectives: "Provide mass rapid transit to over 800,000 daily commuters along Bengaluru's congested outer ring road tech corridor.",
    departmentId: "dept-mohua",
    departmentName: "Housing & Urban Affairs (Smart Cities / Metro)",
    ministry: "Ministry of Housing and Urban Affairs",
    priority: "CRITICAL",
    status: "DELAYED",
    startDate: "2021-06-01",
    targetEndDate: "2026-06-30",
    revisedEndDate: "2027-08-31",
    sanctionedBudget: 14820.0,
    releasedBudget: 11200.0,
    utilizedBudget: 8950.0,
    location: {
      state: "Karnataka",
      district: "Bengaluru Urban",
      address: "Silk Board - Marathahalli - KR Puram - Hebbal - Airport Line",
      lat: 12.9172,
      lng: 77.6229
    },
    managerId: "usr-02",
    managerName: "Smt. Rajeshwari Iyer, IAS",
    managerEmail: "projadmin@nhai.gov.in",
    managerPhone: "+91 11 2507 4100",
    plannedProgress: 85.0,
    physicalProgress: 56.5,
    financialProgress: 60.4,
    tags: ["MetroRail", "UrbanTransit", "BMRCL", "Bengaluru"],
    milestones: [
      {
        id: "m-006-1",
        projectId: "prj-006",
        title: "Utility Shifting & Tree Translocation on Outer Ring Road",
        description: "Underground high-tension cables and BWSSB water line relocation.",
        startDate: "2021-06-01",
        dueDate: "2022-12-31",
        completionDate: "2023-08-15",
        progressPercentage: 100,
        status: "COMPLETED",
        assignedOfficer: "usr-02",
        assignedOfficerName: "Smt. Rajeshwari Iyer",
        weightage: 20,
        dependencies: []
      },
      {
        id: "m-006-2",
        projectId: "prj-006",
        title: "Viaduct Pier & U-Girder Launching (Package 1 & 2)",
        description: "Casting and erection of 2,100 U-girders along ORR median.",
        startDate: "2023-01-01",
        dueDate: "2025-06-30",
        progressPercentage: 62,
        status: "DELAYED",
        assignedOfficer: "usr-02",
        assignedOfficerName: "Smt. Rajeshwari Iyer",
        weightage: 35,
        dependencies: ["m-006-1"]
      },
      {
        id: "m-006-3",
        projectId: "prj-006",
        title: "Airport Corridor Phase 2B Station Civil Structures",
        description: "17 elevated stations with multi-modal integration hubs.",
        startDate: "2024-01-01",
        dueDate: "2026-03-31",
        progressPercentage: 42,
        status: "DELAYED",
        assignedOfficer: "usr-02",
        assignedOfficerName: "Smt. Rajeshwari Iyer",
        weightage: 25,
        dependencies: ["m-006-2"]
      },
      {
        id: "m-006-4",
        projectId: "prj-006",
        title: "Rolling Stock & CBTC Driverless Signalling Integration",
        description: "Delivery and safety testing of 6-coach train sets with 750V third rail.",
        startDate: "2025-06-01",
        dueDate: "2026-06-30",
        progressPercentage: 20,
        status: "DELAYED",
        assignedOfficer: "usr-02",
        assignedOfficerName: "Smt. Rajeshwari Iyer",
        weightage: 20,
        dependencies: ["m-006-3"]
      }
    ],
    issues: [
      {
        id: "iss-006-1",
        projectId: "prj-006",
        title: "Contractor liquidity crunch & sluggish girder launching speed",
        description: "Primary civil contractor faced cash-flow constraints, operating only 2 out of 6 launching girders.",
        category: "RESOURCE",
        priority: "CRITICAL",
        status: "ESCALATED",
        assignedOfficer: "usr-02",
        assignedOfficerName: "Smt. Rajeshwari Iyer",
        deadline: "2026-04-30",
        escalatedTo: "MoHUA High Powered Committee & State Chief Secretary",
        createdDate: "2025-11-12"
      },
      {
        id: "iss-006-2",
        projectId: "prj-006",
        title: "Traffic police permission window restriction on ORR tech corridor",
        description: "Night-time crane movement restricted to 12 AM - 5 AM window due to heavy peak traffic.",
        category: "APPROVAL",
        priority: "HIGH",
        status: "IN_PROGRESS",
        assignedOfficer: "usr-02",
        assignedOfficerName: "Smt. Rajeshwari Iyer",
        deadline: "2026-08-30",
        createdDate: "2026-03-02"
      }
    ],
    risks: [
      {
        id: "rsk-006-1",
        projectId: "prj-006",
        title: "Project completion overrun leading to commercial dispute and tariff revisions",
        category: "Financial / Legal",
        probability: "HIGH",
        impact: "CRITICAL",
        mitigationPlan: "Infused direct vendor payments and inducted sub-contractors under tripartite agreement.",
        status: "MITIGATING",
        riskScore: 89
      }
    ],
    progressHistory: [
      {
        id: "prog-006-1",
        projectId: "prj-006",
        date: "2026-08-10",
        physicalProgress: 56.5,
        financialProgress: 60.4,
        workCompleted: "Erected 1,320 U-girders; station concourse slab completed at 8 stations.",
        currentChallenges: "Sluggish progress on Package 2 near Mahadevapura flyover.",
        nextPlannedActivities: "Mobilize 3 additional heavy hydraulic mobile cranes.",
        photos: ["https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=600&auto=format&fit=crop&q=80"],
        documents: ["BMRCL-MONTHLY-AUG2026.pdf"],
        updatedBy: "usr-02",
        updatedByName: "Smt. Rajeshwari Iyer",
        userRole: "PROJECT_ADMIN"
      }
    ],
    transactions: [
      {
        id: "tx-006-1",
        projectId: "prj-006",
        date: "2026-06-30",
        amount: 450.0,
        category: "CIVIL_WORKS",
        description: "Direct Material Advance for Prestressed Concrete Girder Strands",
        approvedBy: "Smt. Rajeshwari Iyer, IAS",
        voucherNo: "BMRCL/PH2A/2026/055",
        vendor: "Afcons - Shankaranarayana JV",
        status: "PROCESSED"
      }
    ],
    documents: [
      {
        id: "doc-006-1",
        projectId: "prj-006",
        title: "Cabinet Committee on Economic Affairs (CCEA) Approval",
        fileName: "CCEA_Approval_Bengaluru_Metro_2A_2B.pdf",
        fileType: "PDF",
        fileSize: "6.8 MB",
        category: "APPROVAL",
        uploadedBy: "usr-02",
        uploadedByName: "Smt. Rajeshwari Iyer",
        uploadDate: "2021-06-05",
        url: "#"
      }
    ],
    createdAt: "2021-06-01T00:00:00Z",
    updatedAt: "2026-08-10T12:00:00Z"
  },
  {
    id: "prj-007",
    code: "MOSPI-RAIL-2024-007",
    name: "Mumbai-Ahmedabad High Speed Rail (Bullet Train Project)",
    description: "508 km Shinkansen E5 technology high-speed rail corridor connecting Mumbai with Ahmedabad with 12 stations, 21 km undersea/underground tunnel, and 320 km/h operational speed.",
    objectives: "Transform high-speed intercity mobility, reducing Mumbai to Ahmedabad journey time from 6 hours to 2 hours.",
    departmentId: "dept-rail",
    departmentName: "Ministry of Railways & High Speed Rail",
    ministry: "Ministry of Railways",
    priority: "CRITICAL",
    status: "IN_PROGRESS",
    startDate: "2019-10-01",
    targetEndDate: "2027-12-31",
    sanctionedBudget: 61500.0,
    releasedBudget: 46800.0,
    utilizedBudget: 42350.0,
    location: {
      state: "Maharashtra",
      district: "Mumbai Suburban",
      address: "BKC Terminal, Thane Undersea Tunnel to Sabarmati HSR Hub",
      lat: 19.0664,
      lng: 72.8687
    },
    managerId: "usr-03",
    managerName: "Er. Vikramaditya Sharma",
    managerEmail: "pm.vikram@dfccil.gov.in",
    managerPhone: "+91 22 2657 8899",
    plannedProgress: 75.0,
    physicalProgress: 71.0,
    financialProgress: 68.8,
    tags: ["BulletTrain", "NHSRCL", "HighSpeedRail", "Shinkansen"],
    milestones: [
      {
        id: "m-007-1",
        projectId: "prj-007",
        title: "100% Land Acquisition in Gujarat & Maharashtra Corridors",
        description: "Acquisition of 1,396 hectares across 12 districts.",
        startDate: "2019-10-01",
        dueDate: "2023-08-31",
        completionDate: "2023-09-15",
        progressPercentage: 100,
        status: "COMPLETED",
        assignedOfficer: "usr-03",
        assignedOfficerName: "Er. Vikramaditya Sharma",
        weightage: 20,
        dependencies: []
      },
      {
        id: "m-007-2",
        projectId: "prj-007",
        title: "Viaduct Superstructure & River Bridges (Gujarat Section 352 km)",
        description: "Completed 280 km continuous viaduct box girder launching.",
        startDate: "2021-04-01",
        dueDate: "2025-12-31",
        progressPercentage: 88,
        status: "ON_TRACK",
        assignedOfficer: "usr-03",
        assignedOfficerName: "Er. Vikramaditya Sharma",
        weightage: 35,
        dependencies: ["m-007-1"]
      },
      {
        id: "m-007-3",
        projectId: "prj-007",
        title: "21 km Undersea & Underground Tunnel (BKC to Shilphata)",
        description: "Twin-tunnel excavation using 13.1m diameter mega slurry TBMs.",
        startDate: "2023-11-01",
        dueDate: "2026-12-31",
        progressPercentage: 46,
        status: "ON_TRACK",
        assignedOfficer: "usr-03",
        assignedOfficerName: "Er. Vikramaditya Sharma",
        weightage: 25,
        dependencies: ["m-007-2"]
      },
      {
        id: "m-007-4",
        projectId: "prj-007",
        title: "J-Slab High Speed Track System Laying & Rolling Stock Testing",
        description: "Precision Japanese ballastless track slab laying and trial runs.",
        startDate: "2025-06-01",
        dueDate: "2027-12-31",
        progressPercentage: 22,
        status: "ON_TRACK",
        assignedOfficer: "usr-03",
        assignedOfficerName: "Er. Vikramaditya Sharma",
        weightage: 20,
        dependencies: ["m-007-3"]
      }
    ],
    issues: [
      {
        id: "iss-007-1",
        projectId: "prj-007",
        title: "Subsea shaft water ingress mitigation near Thane creek",
        description: "Encountered fractured basalt strata during shaft sinking at Vikhroli.",
        category: "TECHNICAL",
        priority: "HIGH",
        status: "RESOLVED",
        assignedOfficer: "usr-03",
        assignedOfficerName: "Er. Vikramaditya Sharma",
        deadline: "2026-02-28",
        resolution: "Carried out micro-fine cement jet grouting and dewatering.",
        createdDate: "2025-12-10",
        resolvedDate: "2026-02-20"
      }
    ],
    risks: [
      {
        id: "rsk-007-1",
        projectId: "prj-007",
        title: "Currency exchange fluctuation on JICA bilateral soft loan yen component",
        category: "Financial",
        probability: "LOW",
        impact: "MEDIUM",
        mitigationPlan: "Forward currency hedging and sovereign debt coverage by DEA.",
        status: "CONTROLLED",
        riskScore: 22
      }
    ],
    progressHistory: [
      {
        id: "prog-007-1",
        projectId: "prj-007",
        date: "2026-08-28",
        physicalProgress: 71.0,
        financialProgress: 68.8,
        workCompleted: "Erected 294 km of viaduct. Commenced track laying in Surat - Bilimora trial section.",
        currentChallenges: "TBM #2 assembly in progress at BKC terminal shaft.",
        nextPlannedActivities: "Commission trial runs on 50 km Surat-Bilimora stretch by Nov 2026.",
        photos: ["https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&auto=format&fit=crop&q=80"],
        documents: ["MAHSR-STATUS-REPORT-AUG2026.pdf"],
        updatedBy: "usr-03",
        updatedByName: "Er. Vikramaditya Sharma",
        userRole: "PROJECT_MANAGER"
      }
    ],
    transactions: [
      {
        id: "tx-007-1",
        projectId: "prj-007",
        date: "2026-08-05",
        amount: 2150.0,
        category: "CIVIL_WORKS",
        description: "Specialized high-speed girder launcher Milestone Payment (Package C-4)",
        approvedBy: "Er. Vikramaditya Sharma",
        voucherNo: "NHSRCL/C4/2026/091",
        vendor: "L&T Infrastructure Engineering",
        status: "PROCESSED"
      }
    ],
    documents: [
      {
        id: "doc-007-1",
        projectId: "prj-007",
        title: "Inter-Governmental Agreement & JICA Loan Treaty",
        fileName: "India_Japan_HSR_Agreement.pdf",
        fileType: "PDF",
        fileSize: "15.7 MB",
        category: "APPROVAL",
        uploadedBy: "usr-03",
        uploadedByName: "Er. Vikramaditya Sharma",
        uploadDate: "2019-10-10",
        url: "#"
      }
    ],
    createdAt: "2019-10-01T00:00:00Z",
    updatedAt: "2026-08-28T18:00:00Z"
  },
  {
    id: "prj-008",
    code: "MOSPI-WATER-2024-008",
    name: "Polavaram National Irrigation & Hydroelectric Multi-Purpose Project",
    description: "Multi-purpose project across river Godavari to irrigate 7.2 lakh acres, supply 23.4 TMC drinking water to Vizag, and generate 960 MW hydro power.",
    objectives: "Drought-proofing Rayalaseema and coastal Andhra, interlinking Godavari with Krishna river basin.",
    departmentId: "dept-water",
    departmentName: "Jal Shakti & Namami Gange",
    ministry: "Ministry of Jal Shakti",
    priority: "CRITICAL",
    status: "AT_RISK",
    startDate: "2018-03-01",
    targetEndDate: "2026-12-31",
    sanctionedBudget: 29000.0,
    releasedBudget: 21500.0,
    utilizedBudget: 19800.0,
    location: {
      state: "Andhra Pradesh",
      district: "Eluru",
      address: "Polavaram Dam Site, Godavari River Basin",
      lat: 17.2536,
      lng: 81.6565
    },
    managerId: "usr-04",
    managerName: "Dr. Ananya Roy",
    managerEmail: "officer.roy@jalshakti.gov.in",
    managerPhone: "+91 33 2455 1200",
    plannedProgress: 89.0,
    physicalProgress: 74.0,
    financialProgress: 68.2,
    tags: ["Polavaram", "NationalProject", "Irrigation", "HydroPower"],
    milestones: [
      {
        id: "m-008-1",
        projectId: "prj-008",
        title: "Spillway & 48 Radial Gates Erection (50 Lakh Cusecs Capacity)",
        description: "World's largest spillway discharge capacity construction.",
        startDate: "2018-03-01",
        dueDate: "2022-06-30",
        completionDate: "2022-08-10",
        progressPercentage: 100,
        status: "COMPLETED",
        assignedOfficer: "usr-04",
        assignedOfficerName: "Dr. Ananya Roy",
        weightage: 30,
        dependencies: []
      },
      {
        id: "m-008-2",
        projectId: "prj-008",
        title: "Earth-cum-Rock Fill (ECRF) Dam Main Diaphragm Wall Reconstruction",
        description: "Rebuilding washed out diaphragm wall foundation sections.",
        startDate: "2023-01-01",
        dueDate: "2025-10-31",
        progressPercentage: 72,
        status: "AT_RISK",
        assignedOfficer: "usr-04",
        assignedOfficerName: "Dr. Ananya Roy",
        weightage: 35,
        dependencies: ["m-008-1"]
      },
      {
        id: "m-008-3",
        projectId: "prj-008",
        title: "Rehabilitation & Resettlement (R&R) of 1.06 Lakh Project Affected Families",
        description: "Colony construction, land compensation, and livelihood support packages.",
        startDate: "2022-01-01",
        dueDate: "2026-11-30",
        progressPercentage: 60,
        status: "AT_RISK",
        assignedOfficer: "usr-04",
        assignedOfficerName: "Dr. Ananya Roy",
        weightage: 25,
        dependencies: ["m-008-2"]
      },
      {
        id: "m-008-4",
        projectId: "prj-008",
        title: "960 MW Hydro-Electric Powerhouse (12 x 80 MW Units)",
        description: "Turbine generator erection and switchyard commissioning.",
        startDate: "2024-01-01",
        dueDate: "2026-12-31",
        progressPercentage: 45,
        status: "ON_TRACK",
        assignedOfficer: "usr-04",
        assignedOfficerName: "Dr. Ananya Roy",
        weightage: 10,
        dependencies: ["m-008-3"]
      }
    ],
    issues: [
      {
        id: "iss-008-1",
        projectId: "prj-008",
        title: "R&R compensation disbursement delays due to land record verification",
        description: "State revenue department verifying tribal land rights claims across 37 villages.",
        category: "FINANCIAL",
        priority: "CRITICAL",
        status: "ESCALATED",
        assignedOfficer: "usr-04",
        assignedOfficerName: "Dr. Ananya Roy",
        deadline: "2026-06-30",
        escalatedTo: "Ministry of Jal Shakti Polavaram Project Authority (PPA)",
        createdDate: "2026-01-20"
      }
    ],
    risks: [
      {
        id: "rsk-008-1",
        projectId: "prj-008",
        title: "Flash flood during monsoon season risking coffer dam integrity",
        category: "Environmental",
        probability: "HIGH",
        impact: "HIGH",
        mitigationPlan: "Heightened upstream coffer dam to +44.0m and reinforced rockfill slopes.",
        status: "MITIGATING",
        riskScore: 78
      }
    ],
    progressHistory: [
      {
        id: "prog-008-1",
        projectId: "prj-008",
        date: "2026-08-22",
        physicalProgress: 74.0,
        financialProgress: 68.2,
        workCompleted: "Sand vibro-compaction on gap-1 completed. Vibro replacement in progress on gap-2.",
        currentChallenges: "Coordinating R&R package release with state treasury.",
        nextPlannedActivities: "Commence new diaphragm wall concrete trenching.",
        photos: ["https://images.unsplash.com/photo-1544984243-ec57ea16fe25?w=600&auto=format&fit=crop&q=80"],
        documents: ["POLAVARAM-PPA-REPORT-AUG2026.pdf"],
        updatedBy: "usr-04",
        updatedByName: "Dr. Ananya Roy",
        userRole: "DEPT_OFFICER"
      }
    ],
    transactions: [
      {
        id: "tx-008-1",
        projectId: "prj-008",
        date: "2026-07-20",
        amount: 512.0,
        category: "CIVIL_WORKS",
        description: "Diaphragm wall foundation vibro-compaction running bill",
        approvedBy: "Dr. Ananya Roy",
        voucherNo: "PPA/POLA/2026/043",
        vendor: "Megha Engineering & Infrastructures Ltd (MEIL)",
        status: "PROCESSED"
      }
    ],
    documents: [
      {
        id: "doc-008-1",
        projectId: "prj-008",
        title: "CWC Dam Safety Review Panel (DSRP) Technical Approval",
        fileName: "DSRP_CWC_Approval_Polavaram.pdf",
        fileType: "PDF",
        fileSize: "7.1 MB",
        category: "APPROVAL",
        uploadedBy: "usr-04",
        uploadedByName: "Dr. Ananya Roy",
        uploadDate: "2023-02-15",
        url: "#"
      }
    ],
    createdAt: "2018-03-01T00:00:00Z",
    updatedAt: "2026-08-22T15:00:00Z"
  },
  {
    id: "prj-009",
    code: "MOSPI-MORTH-2024-009",
    name: "Zojila & Z-Morh Strategic Tunnel Project (Srinagar-Leh Highway)",
    description: "14.15 km bi-directional single-tube tunnel under Zojila pass at 11,578 ft elevation, providing all-weather connectivity between Kashmir valley and Ladakh.",
    objectives: "Provide year-round strategic military logistics and civilian transport to Ladakh region, cutting avalanche cutoff time.",
    departmentId: "dept-morth",
    departmentName: "Road Transport & Highways (NHAI)",
    ministry: "Ministry of Road Transport and Highways",
    priority: "CRITICAL",
    status: "IN_PROGRESS",
    startDate: "2020-10-15",
    targetEndDate: "2026-12-31",
    sanctionedBudget: 6800.0,
    releasedBudget: 5500.0,
    utilizedBudget: 5120.0,
    location: {
      state: "Jammu & Kashmir",
      district: "Ganderbal",
      address: "Baltal - Minamarg, Sonamarg to Dras NH-1",
      lat: 34.2818,
      lng: 75.4789
    },
    managerId: "usr-02",
    managerName: "Smt. Rajeshwari Iyer, IAS",
    managerEmail: "projadmin@nhai.gov.in",
    managerPhone: "+91 11 2507 4100",
    plannedProgress: 79.0,
    physicalProgress: 76.5,
    financialProgress: 75.3,
    tags: ["ZojilaTunnel", "StrategicInfra", "LadakhConnectivity", "NHIDCL"],
    milestones: [
      {
        id: "m-009-1",
        projectId: "prj-009",
        title: "Z-Morh 6.5 km Escape & Main Tunnel Breakthrough",
        description: "Completed excavation and civil lining with avalanche galleries.",
        startDate: "2020-10-15",
        dueDate: "2023-11-30",
        completionDate: "2023-11-10",
        progressPercentage: 100,
        status: "COMPLETED",
        assignedOfficer: "usr-02",
        assignedOfficerName: "Smt. Rajeshwari Iyer",
        weightage: 30,
        dependencies: []
      },
      {
        id: "m-009-2",
        projectId: "prj-009",
        title: "Zojila Main Tunnel 14.15 km Drill & Blast NATM Excavation",
        description: "Excavation of heading and benching across hard granitic gneiss.",
        startDate: "2021-04-01",
        dueDate: "2025-10-31",
        progressPercentage: 82,
        status: "ON_TRACK",
        assignedOfficer: "usr-05",
        assignedOfficerName: "Er. Sanjay Kumar Gond",
        weightage: 40,
        dependencies: ["m-009-1"]
      },
      {
        id: "m-009-3",
        projectId: "prj-009",
        title: "Tunnel Ventilation, Fire Hydrant Network & SCADA Control Center",
        description: "Longitudinal ventilation jet fans, CCTV surveillance, and emergency call niches.",
        startDate: "2025-06-01",
        dueDate: "2026-12-31",
        progressPercentage: 38,
        status: "ON_TRACK",
        assignedOfficer: "usr-05",
        assignedOfficerName: "Er. Sanjay Kumar Gond",
        weightage: 30,
        dependencies: ["m-009-2"]
      }
    ],
    issues: [],
    risks: [
      {
        id: "rsk-009-1",
        projectId: "prj-009",
        title: "Extreme sub-zero winter temperatures (-30°C) freezing water and concrete works",
        category: "Environmental",
        probability: "HIGH",
        impact: "MEDIUM",
        mitigationPlan: "Installed indoor heated batching plants and accelerated chemical admixtures.",
        status: "CONTROLLED",
        riskScore: 38
      }
    ],
    progressHistory: [
      {
        id: "prog-009-1",
        projectId: "prj-009",
        date: "2026-08-14",
        physicalProgress: 76.5,
        financialProgress: 75.3,
        workCompleted: "Excavated 11.2 km of main tube. Completed waterproof membrane lining across 8.8 km.",
        currentChallenges: "High ingress of seepage water near fault zone at Km 8.4.",
        nextPlannedActivities: "Advance pre-grouting and continue concrete invert pouring.",
        photos: ["https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=600&auto=format&fit=crop&q=80"],
        documents: ["ZOJILA-PROGRESS-REPORT-2026.pdf"],
        updatedBy: "usr-05",
        updatedByName: "Er. Sanjay Kumar Gond",
        userRole: "FIELD_OFFICER"
      }
    ],
    transactions: [
      {
        id: "tx-009-1",
        projectId: "prj-009",
        date: "2026-07-10",
        amount: 320.0,
        category: "CIVIL_WORKS",
        description: "NATM Tunnel Excavation & Shotcreting Running Account Bill #31",
        approvedBy: "Smt. Rajeshwari Iyer, IAS",
        voucherNo: "NHIDCL/ZOJ/2026/077",
        vendor: "MEIL Infrastructure Pvt Ltd",
        status: "PROCESSED"
      }
    ],
    documents: [
      {
        id: "doc-009-1",
        projectId: "prj-009",
        title: "Cabinet Approval & Security Clearance for Zojila",
        fileName: "Cabinet_Sanction_Zojila_Tunnel.pdf",
        fileType: "PDF",
        fileSize: "4.8 MB",
        category: "APPROVAL",
        uploadedBy: "usr-02",
        uploadedByName: "Smt. Rajeshwari Iyer",
        uploadDate: "2020-10-20",
        url: "#"
      }
    ],
    createdAt: "2020-10-15T00:00:00Z",
    updatedAt: "2026-08-14T14:00:00Z"
  },
  {
    id: "prj-010",
    code: "MOSPI-URBAN-2024-010",
    name: "PM-eBus Sewa – 10,000 Electric Bus Deployment & Charging Infrastructure",
    description: "Nationwide rollout of 10,000 electric buses on PPP model across 169 cities with depot modernization and behind-the-meter 33kV substations.",
    objectives: "Decarbonize urban bus mobility, cut diesel pollution, and establish green charging corridors.",
    departmentId: "dept-mohua",
    departmentName: "Housing & Urban Affairs (Smart Cities / Metro)",
    ministry: "Ministry of Housing and Urban Affairs",
    priority: "MEDIUM",
    status: "IN_PROGRESS",
    startDate: "2023-08-16",
    targetEndDate: "2027-08-15",
    sanctionedBudget: 20000.0,
    releasedBudget: 11000.0,
    utilizedBudget: 8900.0,
    location: {
      state: "Madhya Pradesh",
      district: "Bhopal",
      address: "Bhopal, Indore, Jabalpur, Gwalior & Multi-State Hubs",
      lat: 23.2599,
      lng: 77.4126
    },
    managerId: "usr-01",
    managerName: "Dr. Arvind Subramanian",
    managerEmail: "superadmin@mospi.gov.in",
    managerPhone: "+91 11 2334 0001",
    plannedProgress: 52.0,
    physicalProgress: 49.0,
    financialProgress: 44.5,
    tags: ["PMeBusSewa", "ElectricMobility", "CleanAir", "UrbanTransport"],
    milestones: [
      {
        id: "m-010-1",
        projectId: "prj-010",
        title: "City Selection, Demand Aggregation & Model Concession Agreements",
        description: "Standardized tender release for GCC model bus procurement.",
        startDate: "2023-08-16",
        dueDate: "2024-06-30",
        completionDate: "2024-05-28",
        progressPercentage: 100,
        status: "COMPLETED",
        assignedOfficer: "usr-01",
        assignedOfficerName: "Dr. Arvind Subramanian",
        weightage: 25,
        dependencies: []
      },
      {
        id: "m-010-2",
        projectId: "prj-010",
        title: "Depot Infrastructure Upgradation & 240kW Fast DC Chargers",
        description: "Transformer upgrades and automated pantograph charging slots across 85 depots.",
        startDate: "2024-06-01",
        dueDate: "2026-03-31",
        progressPercentage: 55,
        status: "ON_TRACK",
        assignedOfficer: "usr-01",
        assignedOfficerName: "Dr. Arvind Subramanian",
        weightage: 35,
        dependencies: ["m-010-1"]
      },
      {
        id: "m-010-3",
        projectId: "prj-010",
        title: "Delivery & Commissioning of First Batch (4,500 e-Buses)",
        description: "Induction of low-floor 12m and 9m AC electric buses with ITS telematics.",
        startDate: "2025-01-01",
        dueDate: "2026-12-31",
        progressPercentage: 42,
        status: "ON_TRACK",
        assignedOfficer: "usr-01",
        assignedOfficerName: "Dr. Arvind Subramanian",
        weightage: 40,
        dependencies: ["m-010-2"]
      }
    ],
    issues: [],
    risks: [
      {
        id: "rsk-010-1",
        projectId: "prj-010",
        title: "State DISCOM power evacuation delays for high capacity EV depots",
        category: "Infrastructure",
        probability: "MEDIUM",
        impact: "MEDIUM",
        mitigationPlan: "Unified single-window power clearance mechanism via Ministry of Power portal.",
        status: "MITIGATING",
        riskScore: 36
      }
    ],
    progressHistory: [
      {
        id: "prog-010-1",
        projectId: "prj-010",
        date: "2026-08-01",
        physicalProgress: 49.0,
        financialProgress: 44.5,
        workCompleted: "Operationalized 2,150 e-buses across 28 tier-2 cities. Completed 42 depot chargers.",
        currentChallenges: "Grid sanction delays at 11 depot sites in eastern region.",
        nextPlannedActivities: "Issue second procurement tranche for 3,000 midi-buses.",
        photos: ["https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=600&auto=format&fit=crop&q=80"],
        documents: ["PM-EBUS-REPORT-Q2.pdf"],
        updatedBy: "usr-01",
        updatedByName: "Dr. Arvind Subramanian",
        userRole: "SUPER_ADMIN"
      }
    ],
    transactions: [
      {
        id: "tx-010-1",
        projectId: "prj-010",
        date: "2026-07-18",
        amount: 680.0,
        category: "PROCUREMENT",
        description: "Capital Subsidy Tranche-II Disbursement for 1,200 EV Buses",
        approvedBy: "Dr. Arvind Subramanian",
        voucherNo: "MOHUA/EBUS/2026/044",
        vendor: "Convergence Energy Services Ltd (CESL)",
        status: "PROCESSED"
      }
    ],
    documents: [
      {
        id: "doc-010-1",
        projectId: "prj-010",
        title: "Scheme Guidelines for PM-eBus Sewa",
        fileName: "PMeBus_Sewa_Guidelines_MoHUA.pdf",
        fileType: "PDF",
        fileSize: "5.1 MB",
        category: "SANCTION_ORDER",
        uploadedBy: "usr-01",
        uploadedByName: "Dr. Arvind Subramanian",
        uploadDate: "2023-08-20",
        url: "#"
      }
    ],
    createdAt: "2023-08-16T00:00:00Z",
    updatedAt: "2026-08-01T17:00:00Z"
  },
  {
    id: "prj-011",
    code: "MOSPI-MORTH-2024-011",
    name: "Trans-Arunachal Highway (NH-13 & NH-215 Border Connectivity)",
    description: "2,407 km strategically critical two-lane highway connecting Tawang with Kanubari, providing frontier connectivity across 16 district headquarters.",
    objectives: "Strengthen frontier defence logistics, socio-economic integration, and tourism in the Eastern Himalayas.",
    departmentId: "dept-morth",
    departmentName: "Road Transport & Highways (NHAI)",
    ministry: "Ministry of Road Transport and Highways",
    priority: "HIGH",
    status: "ON_HOLD",
    startDate: "2019-03-01",
    targetEndDate: "2026-08-31",
    revisedEndDate: "2027-10-31",
    sanctionedBudget: 12400.0,
    releasedBudget: 8900.0,
    utilizedBudget: 7400.0,
    location: {
      state: "Arunachal Pradesh",
      district: "Papum Pare",
      address: "Itanagar - Ziro - Along - Pasighat - Roing Highway",
      lat: 27.0844,
      lng: 93.6053
    },
    managerId: "usr-02",
    managerName: "Smt. Rajeshwari Iyer, IAS",
    managerEmail: "projadmin@nhai.gov.in",
    managerPhone: "+91 11 2507 4100",
    plannedProgress: 88.0,
    physicalProgress: 61.2,
    financialProgress: 59.6,
    tags: ["ArunachalHighway", "BorderRoads", "NorthEast", "Strategic"],
    milestones: [
      {
        id: "m-011-1",
        projectId: "prj-011",
        title: "Tawang to Bomdila Sector Road Widening (185 km)",
        description: "Hard rock cutting and slope stabilization with gabion walls.",
        startDate: "2019-03-01",
        dueDate: "2022-09-30",
        completionDate: "2022-10-15",
        progressPercentage: 100,
        status: "COMPLETED",
        assignedOfficer: "usr-02",
        assignedOfficerName: "Smt. Rajeshwari Iyer",
        weightage: 35,
        dependencies: []
      },
      {
        id: "m-011-2",
        projectId: "prj-011",
        title: "Ziro to Daporijo Sector Heavy Landslide Zone Realignment",
        description: "Construction of 12 viaducts over active cloudburst zones.",
        startDate: "2022-10-01",
        dueDate: "2025-05-31",
        progressPercentage: 45,
        status: "DELAYED",
        assignedOfficer: "usr-05",
        assignedOfficerName: "Er. Sanjay Kumar Gond",
        weightage: 40,
        dependencies: ["m-011-1"]
      },
      {
        id: "m-011-3",
        projectId: "prj-011",
        title: "Pasighat to Roing Major Bridge over Dibang River Basin",
        description: "14 RCC balanced cantilever bridges and slope micro-piling.",
        startDate: "2024-01-01",
        dueDate: "2026-08-31",
        progressPercentage: 35,
        status: "AT_RISK",
        assignedOfficer: "usr-05",
        assignedOfficerName: "Er. Sanjay Kumar Gond",
        weightage: 25,
        dependencies: ["m-011-2"]
      }
    ],
    issues: [
      {
        id: "iss-011-1",
        projectId: "prj-011",
        title: "Major flash floods destroyed 4km formation at Subansiri river crossing",
        description: "Severe mountain slope wash-away halted all construction machinery movement.",
        category: "ENVIRONMENTAL",
        priority: "CRITICAL",
        status: "OPEN",
        assignedOfficer: "usr-05",
        assignedOfficerName: "Er. Sanjay Kumar Gond",
        deadline: "2026-06-30",
        createdDate: "2026-05-14"
      }
    ],
    risks: [
      {
        id: "rsk-011-1",
        projectId: "prj-011",
        title: "Active seismic Zone-V geological instability along fault line",
        category: "Geological",
        probability: "HIGH",
        impact: "CRITICAL",
        mitigationPlan: "Redesigning road profile with flexible geogrid reinforced soil walls.",
        status: "MITIGATING",
        riskScore: 84
      }
    ],
    progressHistory: [
      {
        id: "prog-011-1",
        projectId: "prj-011",
        date: "2026-06-20",
        physicalProgress: 61.2,
        financialProgress: 59.6,
        workCompleted: "Completed 1,480 km bituminous surface. Suspended work temporarily at Subansiri wash-away.",
        currentChallenges: "Continuous landslide restoration required before restarting blacktopping.",
        nextPlannedActivities: "Mobilize specialized slope stabilization teams with CRRI guidance.",
        photos: ["https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600&auto=format&fit=crop&q=80"],
        documents: ["TRANS-ARUNACHAL-AUG2026.pdf"],
        updatedBy: "usr-05",
        updatedByName: "Er. Sanjay Kumar Gond",
        userRole: "FIELD_OFFICER"
      }
    ],
    transactions: [
      {
        id: "tx-011-1",
        projectId: "prj-011",
        date: "2026-05-10",
        amount: 210.0,
        category: "CIVIL_WORKS",
        description: "Emergency Slope Retaining Structure Bill (Km 110 to 124)",
        approvedBy: "Smt. Rajeshwari Iyer, IAS",
        voucherNo: "MORTH/TAH/2026/029",
        vendor: "Border Roads Task Force (BRTF)",
        status: "PROCESSED"
      }
    ],
    documents: [
      {
        id: "doc-011-1",
        projectId: "prj-011",
        title: "Strategic Highway Sanction & Special Hill Area Norms",
        fileName: "Sanction_Order_Trans_Arunachal.pdf",
        fileType: "PDF",
        fileSize: "6.2 MB",
        category: "SANCTION_ORDER",
        uploadedBy: "usr-02",
        uploadedByName: "Smt. Rajeshwari Iyer",
        uploadDate: "2019-03-10",
        url: "#"
      }
    ],
    createdAt: "2019-03-01T00:00:00Z",
    updatedAt: "2026-06-20T11:00:00Z"
  },
  {
    id: "prj-012",
    code: "MOSPI-POWER-2024-012",
    name: "Green Hydrogen Mobility & Offshore Transmission Grid (Tamil Nadu)",
    description: "Pilot 500 MW green hydrogen electrolysis facility paired with 1,000 MW offshore wind evacuation transmission substation in Gulf of Mannar.",
    objectives: "Kickstart national green hydrogen mission industrial decarbonization and maritime refueling.",
    departmentId: "dept-power",
    departmentName: "New & Renewable Energy (Solar/Wind)",
    ministry: "Ministry of New and Renewable Energy",
    priority: "MEDIUM",
    status: "PLANNING",
    startDate: "2025-01-15",
    targetEndDate: "2028-12-31",
    sanctionedBudget: 8900.0,
    releasedBudget: 1500.0,
    utilizedBudget: 820.0,
    location: {
      state: "Tamil Nadu",
      district: "Thoothukudi",
      address: "V.O. Chidambaranar Port & Gulf of Mannar Coastal Hub",
      lat: 8.7642,
      lng: 78.1348
    },
    managerId: "usr-01",
    managerName: "Dr. Arvind Subramanian",
    managerEmail: "superadmin@mospi.gov.in",
    managerPhone: "+91 11 2334 0001",
    plannedProgress: 18.0,
    physicalProgress: 15.0,
    financialProgress: 9.2,
    tags: ["GreenHydrogen", "OffshoreWind", "CleanEnergy", "TamilNadu"],
    milestones: [
      {
        id: "m-012-1",
        projectId: "prj-012",
        title: "Feasibility Study & Oceanographic Bathymetry Survey",
        description: "Subsea geotechnical soil borings and environmental impact assessment.",
        startDate: "2025-01-15",
        dueDate: "2025-10-31",
        completionDate: "2025-10-20",
        progressPercentage: 100,
        status: "COMPLETED",
        assignedOfficer: "usr-01",
        assignedOfficerName: "Dr. Arvind Subramanian",
        weightage: 30,
        dependencies: []
      },
      {
        id: "m-012-2",
        projectId: "prj-012",
        title: "Port Land Allocation & EPC Electrolyzer Package Bidding",
        description: "Global tender float for 500 MW PEM & alkaline electrolyzers.",
        startDate: "2025-11-01",
        dueDate: "2026-11-30",
        progressPercentage: 40,
        status: "ON_TRACK",
        assignedOfficer: "usr-01",
        assignedOfficerName: "Dr. Arvind Subramanian",
        weightage: 35,
        dependencies: ["m-012-1"]
      },
      {
        id: "m-012-3",
        projectId: "prj-012",
        title: "High Voltage Subsea Cable Laying & Onshore Gas Liquefaction Unit",
        description: "220kV export subsea cable pulling and cryogenic hydrogen storage spheres.",
        startDate: "2026-10-01",
        dueDate: "2028-12-31",
        progressPercentage: 0,
        status: "ON_TRACK",
        assignedOfficer: "usr-01",
        assignedOfficerName: "Dr. Arvind Subramanian",
        weightage: 35,
        dependencies: ["m-012-2"]
      }
    ],
    issues: [],
    risks: [
      {
        id: "rsk-012-1",
        projectId: "prj-012",
        title: "Electrolyzer technology supply chain dependencies on imported iridium catalysts",
        category: "Supply Chain",
        probability: "MEDIUM",
        impact: "HIGH",
        mitigationPlan: "Encouraged domestic manufacturing PLI scheme participation for local supply.",
        status: "IDENTIFIED",
        riskScore: 42
      }
    ],
    progressHistory: [
      {
        id: "prog-012-1",
        projectId: "prj-012",
        date: "2026-07-30",
        physicalProgress: 15.0,
        financialProgress: 9.2,
        workCompleted: "Completed coastal boundary demarcation; pre-bid conference held with 14 global OEMs.",
        currentChallenges: "Evaluating marine ecological clearances near coral reef boundary.",
        nextPlannedActivities: "Award EPC contract for 500 MW green hydrogen facility by Q4 2026.",
        photos: ["https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=600&auto=format&fit=crop&q=80"],
        documents: ["GREEN-H2-REPORT-Q2.pdf"],
        updatedBy: "usr-01",
        updatedByName: "Dr. Arvind Subramanian",
        userRole: "SUPER_ADMIN"
      }
    ],
    transactions: [
      {
        id: "tx-012-1",
        projectId: "prj-012",
        date: "2026-06-15",
        amount: 45.0,
        category: "CONSULTING",
        description: "Offshore Wind & Bathymetry Geotechnical Investigation Settlement",
        approvedBy: "Dr. Arvind Subramanian",
        voucherNo: "MNRE/GH2/2026/007",
        vendor: "National Institute of Ocean Technology (NIOT)",
        status: "PROCESSED"
      }
    ],
    documents: [
      {
        id: "doc-012-1",
        projectId: "prj-012",
        title: "National Green Hydrogen Mission Cabinet Approval",
        fileName: "Cabinet_Sanction_Green_Hydrogen_Pilot.pdf",
        fileType: "PDF",
        fileSize: "5.4 MB",
        category: "SANCTION_ORDER",
        uploadedBy: "usr-01",
        uploadedByName: "Dr. Arvind Subramanian",
        uploadDate: "2025-01-20",
        url: "#"
      }
    ],
    createdAt: "2025-01-15T00:00:00Z",
    updatedAt: "2026-07-30T10:00:00Z"
  }
];

// Enrich seed projects with AI insights
export const SEED_PROJECTS: Project[] = RAW_PROJECTS.map((rawProj) => {
  const p = rawProj as Project;
  const analysis = computeProjectAIInsight(p);
  return {
    ...p,
    aiInsight: analysis.insight,
  };
});

export const SEED_ALERTS: SmartAlert[] = [
  {
    id: "alt-001",
    projectId: "prj-006",
    projectName: "Bengaluru Metro Phase 2A & 2B",
    type: "OVERDUE_MILESTONE",
    severity: "CRITICAL",
    title: "Critical Milestone Overdue: Viaduct U-Girder Launching",
    message: "Girder launching on Outer Ring Road is 14 months past schedule. Contractor operating at 33% crane capacity.",
    timestamp: "2026-09-02T10:30:00Z",
    read: false,
    actionUrl: "/projects/prj-006"
  },
  {
    id: "alt-002",
    projectId: "prj-002",
    projectName: "Western Dedicated Freight Corridor",
    type: "UNRESOLVED_ISSUE",
    severity: "CRITICAL",
    title: "Escalated Issue: Diva Junction Land Clearance",
    message: "12.4 hectares of critical railway land encroachment unresolved for > 180 days. High risk to port connectivity.",
    timestamp: "2026-09-01T15:00:00Z",
    read: false,
    actionUrl: "/projects/prj-002"
  },
  {
    id: "alt-003",
    projectId: "prj-008",
    projectName: "Polavaram Irrigation Project",
    type: "CRITICAL_RISK",
    severity: "WARNING",
    title: "Monsoon Coffer Dam Flood Alert",
    message: "Godavari river water level rising. PPA engineering team reinforcing upstream rockfill diaphragm wall.",
    timestamp: "2026-08-31T09:15:00Z",
    read: false,
    actionUrl: "/projects/prj-008"
  },
  {
    id: "alt-004",
    projectId: "prj-003",
    projectName: "Jal Jeevan Mission Bundelkhand",
    type: "DEADLINE_UPCOMING",
    severity: "INFO",
    title: "Milestone Due in 60 Days: Pipeline Network & OHT Handover",
    message: "86% completed. Inspection scheduled for 620 overhead reservoirs across Jhansi & Mahoba blocks.",
    timestamp: "2026-08-30T11:45:00Z",
    read: true,
    actionUrl: "/projects/prj-003"
  },
  {
    id: "alt-005",
    projectId: "prj-001",
    projectName: "Delhi-Mumbai Expressway Phase-IV",
    type: "SYSTEM",
    severity: "INFO",
    title: "Physical Progress Verification Confirmed",
    message: "Field Officer Er. Sanjay Kumar Gond verified 72.5% physical completion with geo-tagged drone imagery.",
    timestamp: "2026-08-28T16:20:00Z",
    read: true,
    actionUrl: "/projects/prj-001"
  }
];

export const SEED_AUDIT_LOGS: AuditLog[] = [
  {
    id: "log-001",
    userId: "usr-01",
    userName: "Dr. Arvind Subramanian",
    userRole: "SUPER_ADMIN",
    action: "Triggered MoSPI Automated AI Portfolio Health Assessment",
    entityType: "PROJECT",
    entityId: "SYSTEM-WIDE",
    projectName: "All Active National Infrastructure Projects",
    timestamp: "2026-09-03T13:45:00Z",
    ipAddress: "10.24.18.9"
  },
  {
    id: "log-002",
    userId: "usr-02",
    userName: "Smt. Rajeshwari Iyer, IAS",
    userRole: "PROJECT_ADMIN",
    action: "Escalated Bottleneck to Cabinet Infrastructure Committee",
    entityType: "ISSUE",
    entityId: "iss-006-1",
    projectName: "Bengaluru Metro Phase 2A & 2B",
    previousValue: "Status: IN_PROGRESS",
    newValue: "Status: ESCALATED (To MoHUA High Powered Committee)",
    timestamp: "2026-09-02T11:15:00Z",
    ipAddress: "10.24.45.101"
  },
  {
    id: "log-003",
    userId: "usr-05",
    userName: "Er. Sanjay Kumar Gond",
    userRole: "FIELD_OFFICER",
    action: "Uploaded Bi-Weekly Physical Progress & Drone Orthomosaic Report",
    entityType: "PROJECT",
    entityId: "prj-001",
    projectName: "Delhi-Mumbai Expressway Phase-IV",
    previousValue: "Physical Progress: 69.8%",
    newValue: "Physical Progress: 72.5%",
    timestamp: "2026-08-20T10:05:00Z",
    ipAddress: "172.16.8.23"
  },
  {
    id: "log-004",
    userId: "usr-03",
    userName: "Er. Vikramaditya Sharma",
    userRole: "PROJECT_MANAGER",
    action: "Processed Contractor Milestone Payment Voucher #102",
    entityType: "BUDGET",
    entityId: "tx-002-1",
    projectName: "Western Dedicated Freight Corridor",
    previousValue: "Utilized: ₹37,510 Cr",
    newValue: "Utilized: ₹38,750 Cr (+₹1,240 Cr)",
    timestamp: "2026-08-01T14:30:00Z",
    ipAddress: "10.22.67.12"
  },
  {
    id: "log-005",
    userId: "usr-04",
    userName: "Dr. Ananya Roy",
    userRole: "DEPT_OFFICER",
    action: "Marked Milestone m-003-2 as Completed after IoT telemetry test",
    entityType: "MILESTONE",
    entityId: "m-003-2",
    projectName: "Jal Jeevan Mission – Rural Piped Water Supply",
    previousValue: "Status: IN_PROGRESS (88%)",
    newValue: "Status: COMPLETED (100%)",
    timestamp: "2026-07-28T12:20:00Z",
    ipAddress: "10.33.19.88"
  }
];
