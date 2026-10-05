// Project Sentinel – MoSPI Intelligent Integrated Project Monitoring Platform
// Complete Standalone React 18 Application Bundle (SIH26103) - Light & Pastel Theme
const { useState, useEffect, useMemo, useRef } = React;

// --- SEED DATA & CONSTANTS ---
const INITIAL_USERS = [
  {
    id: "usr-01",
    name: "Dr. Arvind Subramanian",
    email: "arvind.subramanian@mospi.gov.in",
    role: "SUPER_ADMIN",
    designation: "Chief Director General (Infrastructure)",
    department: "MoSPI – Central Monitoring Wing",
    phone: "+91 11 2338 4567"
  },
  {
    id: "usr-02",
    name: "Smt. Rajeshwari Iyer, IAS",
    email: "rajeshwari.iyer@nhai.gov.in",
    role: "PROJECT_ADMIN",
    designation: "Executive Director (Corridors)",
    department: "National Highways Authority of India (MoRTH)",
    phone: "+91 11 2507 6500"
  },
  {
    id: "usr-03",
    name: "Er. Vikramaditya Sharma",
    email: "v.sharma@dfccil.co.in",
    role: "PROJECT_MANAGER",
    designation: "Chief Project Manager (Western Corridor)",
    department: "Ministry of Railways (DFCCIL)",
    phone: "+91 22 2656 8900"
  },
  {
    id: "usr-04",
    name: "Dr. Ananya Roy",
    email: "ananya.roy@jalshakti.gov.in",
    role: "DEPT_OFFICER",
    designation: "Superintending Engineer & Nodal Officer",
    department: "Department of Water Resources (Jal Shakti)",
    phone: "+91 522 228 9012"
  },
  {
    id: "usr-05",
    name: "Er. Sanjay Kumar Gond",
    email: "sanjay.gond@nhai.gov.in",
    role: "FIELD_OFFICER",
    designation: "Assistant Resident Engineer (Site Incharge)",
    department: "National Highways Authority of India",
    phone: "+91 94150 98765"
  },
  {
    id: "usr-06",
    name: "Shri Alok Vardhan",
    email: "alok.vardhan@cag.gov.in",
    role: "VIEWER",
    designation: "Senior Audit Inspector",
    department: "Comptroller & Auditor General (Evaluation Wing)",
    phone: "+91 11 2323 1245"
  }
];

const INITIAL_PROJECTS = [
  {
    id: "prj-001",
    code: "MOSPI-HW-2024-001",
    name: "Delhi-Mumbai Expressway (Phase IV Vadodara-Virar)",
    description: "Greenfield 8-lane access-controlled expressway corridor spanning 378 km to decongest western freight transit.",
    ministry: "MoRTH",
    department: "National Highways Authority of India (NHAI)",
    status: "IN_PROGRESS",
    priority: "CRITICAL",
    sanctionedBudget: 24500,
    releasedBudget: 18400,
    utilizedBudget: 15900,
    plannedProgress: 72,
    physicalProgress: 68,
    financialProgress: 65,
    startDate: "2023-01-15",
    targetEndDate: "2026-12-31",
    state: "Gujarat & Maharashtra",
    district: "Vadodara - Palghar",
    lat: 21.1702,
    lng: 72.8311,
    manager: "Er. Rajesh K. Mathur",
    managerEmail: "r.mathur@nhai.gov.in",
    healthScore: 82,
    delayProbability: 28,
    delayDays: 14,
    milestones: [
      { id: "ms-01", title: "Environmental & Coastal CRZ Clearances", dueDate: "2023-06-30", status: "COMPLETED", progress: 100, weightage: 15 },
      { id: "ms-02", title: "Major Viaduct & Bridge Substructure Works", dueDate: "2024-09-30", status: "COMPLETED", progress: 100, weightage: 30 },
      { id: "ms-03", title: "Pavement Quality Concrete (PQC) Layering", dueDate: "2025-08-31", status: "ON_TRACK", progress: 65, weightage: 35 },
      { id: "ms-04", title: "Advanced Traffic Management System (ATMS) & Tolls", dueDate: "2026-10-31", status: "ON_TRACK", progress: 15, weightage: 20 }
    ]
  },
  {
    id: "prj-002",
    code: "MOSPI-RL-2023-009",
    name: "Western Dedicated Freight Corridor (JNPT to Dadri)",
    description: "1,504 km double-line electrified freight corridor connecting Jawaharlal Nehru Port to Dadri Inland Container Depot.",
    ministry: "Railways",
    department: "Dedicated Freight Corridor Corp of India (DFCCIL)",
    status: "IN_PROGRESS",
    priority: "HIGH",
    sanctionedBudget: 51000,
    releasedBudget: 46000,
    utilizedBudget: 42300,
    plannedProgress: 92,
    physicalProgress: 89,
    financialProgress: 83,
    startDate: "2020-04-01",
    targetEndDate: "2026-09-30",
    state: "Maharashtra, Gujarat, Rajasthan, Haryana, UP",
    district: "Palghar - Dadri Corridor",
    lat: 28.5355,
    lng: 77.3910,
    manager: "Er. Vikramaditya Sharma",
    managerEmail: "v.sharma@dfccil.co.in",
    healthScore: 91,
    delayProbability: 12,
    delayDays: 0,
    milestones: [
      { id: "ms-05", title: "Automated Track Laying & Flash Butt Welding", dueDate: "2023-12-31", status: "COMPLETED", progress: 100, weightage: 35 },
      { id: "ms-06", title: "2x25kV Overhead Traction Electrification", dueDate: "2024-11-30", status: "COMPLETED", progress: 100, weightage: 25 },
      { id: "ms-07", title: "Modern TPWS Signalling & OCC Control Center", dueDate: "2025-06-30", status: "ON_TRACK", progress: 85, weightage: 25 },
      { id: "ms-08", title: "Heavy-Haul Trial Runs & Commissioning", dueDate: "2026-09-30", status: "ON_TRACK", progress: 40, weightage: 15 }
    ]
  },
  {
    id: "prj-003",
    code: "MOSPI-JS-2024-044",
    name: "Jal Jeevan Mission (Rural Water Supply, Bundelkhand)",
    description: "Multi-village piped drinking water supply scheme covering 3,850 drought-prone habitations across 7 districts.",
    ministry: "Jal Shakti",
    department: "National Jal Jeevan Mission (NJJM)",
    status: "DELAYED",
    priority: "CRITICAL",
    sanctionedBudget: 15800,
    releasedBudget: 11200,
    utilizedBudget: 8500,
    plannedProgress: 68,
    physicalProgress: 49,
    financialProgress: 54,
    startDate: "2022-08-01",
    targetEndDate: "2026-10-31",
    state: "Uttar Pradesh & Madhya Pradesh",
    district: "Jhansi, Lalitpur, Mahoba, Banda",
    lat: 25.4484,
    lng: 78.5685,
    manager: "Dr. Ananya Roy",
    managerEmail: "ananya.roy@jalshakti.gov.in",
    healthScore: 54,
    delayProbability: 78,
    delayDays: 65,
    milestones: [
      { id: "ms-09", title: "Betwa & Ken River Intake Well Construction", dueDate: "2023-10-31", status: "COMPLETED", progress: 100, weightage: 25 },
      { id: "ms-10", title: "18 Water Treatment Plants (WTP) Civil Works", dueDate: "2024-07-31", status: "COMPLETED", progress: 100, weightage: 25 },
      { id: "ms-11", title: "Main Feeder Pipeline Laying (1,450 km)", dueDate: "2025-03-31", status: "DELAYED", progress: 52, weightage: 30 },
      { id: "ms-12", title: "Village Distribution Network & Household FHTC", dueDate: "2026-06-30", status: "DELAYED", progress: 20, weightage: 20 }
    ]
  },
  {
    id: "prj-004",
    code: "MOSPI-NR-2024-012",
    name: "Ultra Mega Solar Park (4,000 MW Dholera SIR)",
    description: "World class 4 GW solar generation park with integrated 1,000 MWh Battery Energy Storage System (BESS) on coastal tidal flats.",
    ministry: "Power & MNRE",
    department: "Solar Energy Corporation of India (SECI)",
    status: "IN_PROGRESS",
    priority: "HIGH",
    sanctionedBudget: 19500,
    releasedBudget: 14000,
    utilizedBudget: 12800,
    plannedProgress: 80,
    physicalProgress: 76,
    financialProgress: 66,
    startDate: "2022-10-01",
    targetEndDate: "2026-11-30",
    state: "Gujarat",
    district: "Ahmedabad (Dholera)",
    lat: 22.2472,
    lng: 72.1932,
    manager: "Er. Bhavesh Patel",
    managerEmail: "b.patel@seci.co.in",
    healthScore: 84,
    delayProbability: 22,
    delayDays: 8,
    milestones: [
      { id: "ms-13", title: "Land Reclamation & Coastal Bund Embankment", dueDate: "2023-08-31", status: "COMPLETED", progress: 100, weightage: 30 },
      { id: "ms-14", title: "400kV Pooling Substation Grid Interconnection", dueDate: "2024-12-31", status: "COMPLETED", progress: 100, weightage: 25 },
      { id: "ms-15", title: "Solar PV Module Mounting & Inverter Stations", dueDate: "2025-10-31", status: "ON_TRACK", progress: 70, weightage: 30 },
      { id: "ms-16", title: "1,000 MWh BESS Battery Commissioning", dueDate: "2026-11-30", status: "ON_TRACK", progress: 25, weightage: 15 }
    ]
  },
  {
    id: "prj-005",
    code: "MOSPI-HL-2023-018",
    name: "AIIMS Guwahati Super-Speciality Hospital Campus",
    description: "750-bed tertiary healthcare institute, medical college, and viral research diagnostic center catering to Northeast India.",
    ministry: "Health & Family Welfare",
    department: "PMSSY Division",
    status: "COMPLETED",
    priority: "MEDIUM",
    sanctionedBudget: 1890,
    releasedBudget: 1890,
    utilizedBudget: 1845,
    plannedProgress: 100,
    physicalProgress: 100,
    financialProgress: 98,
    startDate: "2021-02-15",
    targetEndDate: "2025-12-31",
    state: "Assam",
    district: "Kamrup (Changsari)",
    lat: 26.2441,
    lng: 91.6881,
    manager: "Dr. Gautam Barua",
    managerEmail: "g.barua@aiimsguwahati.edu.in",
    healthScore: 98,
    delayProbability: 4,
    delayDays: 0,
    milestones: [
      { id: "ms-17", title: "Hospital Block & OPD Civil Superstructure", dueDate: "2023-05-31", status: "COMPLETED", progress: 100, weightage: 40 },
      { id: "ms-18", title: "Medical Gas Pipeline, HVAC & Cleanrooms", dueDate: "2024-03-31", status: "COMPLETED", progress: 100, weightage: 30 },
      { id: "ms-19", title: "Advanced MRI, CT & Radiotherapy Procurement", dueDate: "2025-01-31", status: "COMPLETED", progress: 100, weightage: 20 },
      { id: "ms-20", title: "NABH Accreditation & Final Handover", dueDate: "2025-12-31", status: "COMPLETED", progress: 100, weightage: 10 }
    ]
  },
  {
    id: "prj-006",
    code: "MOSPI-UA-2024-088",
    name: "Bengaluru Metro Phase 2A & 2B (Airport Blue Line)",
    description: "58 km elevated metro corridor connecting Central Silk Board to Kempegowda International Airport via KR Puram and Hebbal.",
    ministry: "Housing & Urban Affairs",
    department: "BMRCL / MoHUA",
    status: "AT_RISK",
    priority: "CRITICAL",
    sanctionedBudget: 14820,
    releasedBudget: 9800,
    utilizedBudget: 8400,
    plannedProgress: 62,
    physicalProgress: 51,
    financialProgress: 57,
    startDate: "2022-06-01",
    targetEndDate: "2027-03-31",
    state: "Karnataka",
    district: "Bengaluru Urban",
    lat: 13.0358,
    lng: 77.5970,
    manager: "Er. Anjum Parwez, IAS",
    managerEmail: "a.parwez@bmrc.co.in",
    healthScore: 68,
    delayProbability: 45,
    delayDays: 32,
    milestones: [
      { id: "ms-21", title: "Utility Shifting & Tree Translocation", dueDate: "2023-09-30", status: "COMPLETED", progress: 100, weightage: 15 },
      { id: "ms-22", title: "Pier Casting & Segment Launching (Silk Board to KR Puram)", dueDate: "2024-12-31", status: "COMPLETED", progress: 100, weightage: 35 },
      { id: "ms-23", title: "Hebbal-Yelahanka Viaduct & Station Framing", dueDate: "2025-11-30", status: "AT_RISK", progress: 48, weightage: 30 },
      { id: "ms-24", title: "CBTC Signalling & Rolling Stock Delivery", dueDate: "2026-12-31", status: "ON_TRACK", progress: 10, weightage: 20 }
    ]
  }
];

const INITIAL_ISSUES = [
  {
    id: "iss-01",
    projectId: "prj-003",
    projectName: "Jal Jeevan Mission (Bundelkhand)",
    title: "Ranipur Wildlife Sanctuary Pipeline Right-of-Way (RoW) Clearance",
    category: "REGULATORY_CLEARANCE",
    priority: "CRITICAL",
    status: "ESCALATED",
    reportedBy: "Dr. Ananya Roy",
    createdDate: "2026-01-14",
    deadline: "2026-03-31",
    description: "42 km main feeder pipeline crossing protected buffer zone requires standing committee NBWL diversion permission.",
    escalatedTo: "Cabinet Committee on Infrastructure & MoEFCC"
  },
  {
    id: "iss-02",
    projectId: "prj-006",
    projectName: "Bengaluru Metro Airport Blue Line",
    title: "Hebbal Flyover Multi-Modal Integration Pier Foundation Conflict",
    category: "TECHNICAL_DESIGN",
    priority: "CRITICAL",
    status: "ESCALATED",
    reportedBy: "Er. Sanjay Kumar Gond",
    createdDate: "2026-02-10",
    deadline: "2026-04-15",
    description: "Proposed metro pier #142 clashes with NHAI elevated highway ramp design; joint site engineering revision pending.",
    escalatedTo: "Inter-Ministerial Project Monitoring Group (PMG)"
  },
  {
    id: "iss-03",
    projectId: "prj-001",
    projectName: "Delhi-Mumbai Expressway (Phase IV)",
    title: "Fly-Ash Supply Shortfall for Sub-Base Concrete Works",
    category: "SUPPLY_CHAIN",
    priority: "HIGH",
    status: "OPEN",
    reportedBy: "Er. Sanjay Kumar Gond",
    createdDate: "2026-02-05",
    deadline: "2026-04-10",
    description: "Sub-base stabilization requires 45,000 MT fly-ash; allocation delayed by state power generation co.",
    escalatedTo: null
  }
];

const INITIAL_AUDIT_LOGS = [
  {
    id: "aud-01",
    timestamp: "2026-03-02T10:14:22Z",
    userName: "Dr. Arvind Subramanian",
    userRole: "SUPER_ADMIN",
    action: "DISBURSED_PAYMENT_TRANSACTION",
    projectName: "Western Dedicated Freight Corridor",
    entityType: "BUDGET",
    details: "Authorized ₹420.00 Cr milestone IPC payment voucher to L&T Infrastructure Construction Ltd.",
    ipAddress: "10.24.12.8"
  },
  {
    id: "aud-02",
    timestamp: "2026-03-01T16:45:10Z",
    userName: "Dr. Ananya Roy",
    userRole: "DEPT_OFFICER",
    action: "ESCALATED_BOTTLENECK_ISSUE",
    projectName: "Jal Jeevan Mission (Bundelkhand)",
    entityType: "ISSUE",
    details: "Escalated Ranipur Wildlife Sanctuary right-of-way bottleneck to MoSPI Inter-Ministerial Review.",
    ipAddress: "10.45.88.19"
  },
  {
    id: "aud-03",
    timestamp: "2026-02-28T09:30:00Z",
    userName: "Er. Sanjay Kumar Gond",
    userRole: "FIELD_OFFICER",
    action: "SUBMITTED_PHYSICAL_PROGRESS",
    projectName: "Delhi-Mumbai Expressway",
    entityType: "PROGRESS",
    details: "Submitted geo-tagged drone orthomosaic report for Ch. 240+000 to 265+000 (Physical: 68%).",
    ipAddress: "172.16.4.102"
  }
];

// --- APP COMPONENT ---
function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("pp_user");
    return saved ? JSON.parse(saved) : INITIAL_USERS[0];
  });

  const [currentView, setCurrentView] = useState("DASHBOARD");
  const [selectedProjectId, setSelectedProjectId] = useState("prj-001");
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem("pp_projects");
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });
  const [issues, setIssues] = useState(() => {
    const saved = localStorage.getItem("pp_issues");
    return saved ? JSON.parse(saved) : INITIAL_ISSUES;
  });
  const [auditLogs, setAuditLogs] = useState(() => {
    const saved = localStorage.getItem("pp_audit");
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDeptFilter, setSelectedDeptFilter] = useState("ALL");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("ALL");
  const [isDemoTourOpen, setIsDemoTourOpen] = useState(false);
  const [demoTourStep, setDemoTourStep] = useState(0);
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);
  const [isUpdateProgressOpen, setIsUpdateProgressOpen] = useState(false);
  const [isDisburseModalOpen, setIsDisburseModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem("pp_user", JSON.stringify(currentUser));
  }, [currentUser]);
  useEffect(() => {
    localStorage.setItem("pp_projects", JSON.stringify(projects));
  }, [projects]);
  useEffect(() => {
    localStorage.setItem("pp_issues", JSON.stringify(issues));
  }, [issues]);
  useEffect(() => {
    localStorage.setItem("pp_audit", JSON.stringify(auditLogs));
  }, [auditLogs]);

  const showToast = (msg, type = "success") => {
    setToastMessage({ text: msg, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  const addAuditLog = (action, projectName, details, entityType = "GENERAL") => {
    const newLog = {
      id: "aud-" + Date.now(),
      timestamp: new Date().toISOString(),
      userName: currentUser.name,
      userRole: currentUser.role,
      action,
      projectName,
      entityType,
      details,
      ipAddress: "10." + Math.floor(Math.random() * 80 + 10) + ".12." + Math.floor(Math.random() * 200 + 1)
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const currentProject = useMemo(() => {
    return projects.find(p => p.id === selectedProjectId) || projects[0];
  }, [projects, selectedProjectId]);

  const stats = useMemo(() => {
    const total = projects.length;
    const active = projects.filter(p => p.status === "IN_PROGRESS").length;
    const delayed = projects.filter(p => p.status === "DELAYED" || p.status === "AT_RISK").length;
    const completed = projects.filter(p => p.status === "COMPLETED").length;
    const sanctioned = projects.reduce((sum, p) => sum + p.sanctionedBudget, 0);
    const utilized = projects.reduce((sum, p) => sum + p.utilizedBudget, 0);
    const avgPhysical = Math.round(projects.reduce((sum, p) => sum + p.physicalProgress, 0) / (total || 1));
    const totalEscalations = issues.filter(i => i.status === "ESCALATED").length;

    return { total, active, delayed, completed, sanctioned, utilized, avgPhysical, totalEscalations };
  }, [projects, issues]);

  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchesDept = selectedDeptFilter === "ALL" || p.ministry === selectedDeptFilter || p.department.includes(selectedDeptFilter);
      const matchesStatus = selectedStatusFilter === "ALL" || p.status === selectedStatusFilter;
      const q = searchQuery.toLowerCase();
      const matchesSearch = !searchQuery || p.name.toLowerCase().includes(q) || p.code.toLowerCase().includes(q) || p.state.toLowerCase().includes(q);
      return matchesDept && matchesStatus && matchesSearch;
    });
  }, [projects, selectedDeptFilter, selectedStatusFilter, searchQuery]);

  // Demo Tour Steps
  const demoTourSteps = [
    {
      title: "1. MoSPI Centralized Monitoring Cockpit",
      desc: "Aggregates all major national infrastructure projects across line ministries with real-time health indicators and budget absorption in a clean, pastel interface.",
      action: () => setCurrentView("DASHBOARD")
    },
    {
      title: "2. Comprehensive Project Drill-down",
      desc: "Detailed single-project view showing physical vs planned S-curve, location GIS telemetry, and manager contacts.",
      action: () => { setCurrentView("PROJECT_DETAIL"); setSelectedProjectId("prj-001"); }
    },
    {
      title: "3. Interactive Milestone & Gantt Timeline",
      desc: "MoSPI standard pastel color-coded delivery tracking (Green=On Track, Amber=At Risk, Rose=Delayed, Sky=Completed).",
      action: () => setCurrentView("MILESTONES")
    },
    {
      title: "4. Real-time Budget & Expenditure Governance",
      desc: "Tracks Sanctioned vs Released vs Utilized ₹ Crores with automated spending anomaly flags.",
      action: () => setCurrentView("BUDGET")
    },
    {
      title: "5. Multi-Tier Issue Escalation & Risk Matrix",
      desc: "Escalates stalled right-of-way and environmental roadblocks straight to the Cabinet Committee / MoSPI review.",
      action: () => setCurrentView("ISSUES")
    },
    {
      title: "6. AI Predictive Delay Forecasting & Root Causes",
      desc: "Multi-factor algorithm predicting delay probability (0-100%), schedule slippage days, and prescriptive remedial actions in pastel cards.",
      action: () => setCurrentView("AI_INSIGHTS")
    },
    {
      title: "7. National GIS Geo-Monitoring & State Pins",
      desc: "Interactive spatial map of India with live telemetry pins, state-level filters, and corridor progress overlays.",
      action: () => setCurrentView("MAP")
    },
    {
      title: "8. Cryptographically Verified Document Vault",
      desc: "Central repository for DPRs, statutory clearances, running bills, and drone photos with SHA-256 integrity verification.",
      action: () => setCurrentView("DOCUMENTS")
    },
    {
      title: "9. Executive & Parliamentary Report Dossier",
      desc: "One-click export to printable CCEA progress reports, delay briefs, and structured CSV datasets.",
      action: () => setCurrentView("REPORTS")
    },
    {
      title: "10. Sovereign Audit Trail & 6-Role Switcher",
      desc: "Immutable government provenance trail tracking all state transitions. Test all 6 personas in 1 click.",
      action: () => setCurrentView("AUDIT")
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafd] text-slate-800 font-sans">
      {/* Top Role Switcher Bar - Pastel Indigo/Sky */}
      <header className="bg-gradient-to-r from-blue-50/90 via-indigo-50/90 to-sky-50/90 border-b border-blue-100 px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs z-50 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-bold text-slate-700">MoSPI Central Cockpit • Active Role:</span>
          <span className="font-extrabold px-2.5 py-0.5 rounded-lg bg-blue-100 text-blue-700 border border-blue-200">
            {currentUser.role}
          </span>
          <span className="text-slate-500 hidden sm:inline">({currentUser.name} — {currentUser.designation})</span>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-slate-600 font-semibold">Switch Persona:</label>
          <select
            value={currentUser.id}
            onChange={(e) => {
              const u = INITIAL_USERS.find(x => x.id === e.target.value);
              if (u) {
                setCurrentUser(u);
                showToast(`Switched active session to ${u.role} (${u.name})`);
                addAuditLog("ROLE_SWITCHED", "System Auth", `User switched persona to ${u.role} (${u.name})`, "AUTH");
              }
            }}
            className="bg-white text-slate-800 font-semibold border border-blue-200 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
          >
            {INITIAL_USERS.map(u => (
              <option key={u.id} value={u.id}>{u.role} : {u.name}</option>
            ))}
          </select>

          <button
            onClick={() => {
              setIsDemoTourOpen(true);
              setDemoTourStep(0);
              demoTourSteps[0].action();
            }}
            className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-amber-950 font-bold rounded-lg shadow-sm transition-all text-xs border border-amber-300"
          >
            <span>✨ Judge Demo Tour</span>
          </button>
        </div>
      </header>

      {/* Main Portal Header - Crisp Pastel Glass */}
      <nav className="bg-white/95 backdrop-blur border-b border-slate-200/90 px-4 sm:px-6 py-3 flex items-center justify-between gap-4 sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView("DASHBOARD")}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-black text-white text-base shadow-md shadow-blue-500/20 ring-2 ring-blue-100">
            PS
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-black text-lg text-slate-900 tracking-tight">Project Sentinel</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                MoSPI SIH26103
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block">Ministry of Statistics & Programme Implementation • Govt of India</p>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="flex-1 max-w-md mx-2 hidden md:block">
          <div className="relative">
            <input
              type="text"
              placeholder="Search projects by name, code, state, or ministry..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 text-sm text-slate-900 placeholder-slate-400 border border-slate-200 rounded-xl pl-9 pr-4 py-1.5 focus:outline-none focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 shadow-inner"
            />
            <span className="absolute left-3 top-2 text-slate-400">🔍</span>
          </div>
        </div>

        {/* Actions & Live Telemetry */}
        <div className="flex items-center gap-3 text-xs">
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>NIC Grid: <strong className="text-emerald-700">ONLINE</strong></span>
            <span className="text-slate-300">|</span>
            <span className="font-mono text-slate-500">{new Date().toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" })}</span>
          </div>

          <button
            onClick={() => setIsCreateProjectOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-md shadow-blue-500/20 transition-all"
          >
            <span>+ New Project</span>
          </button>
        </div>
      </nav>

      {/* Main Layout Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Navigation Sidebar - Pastel Slate Porcelain */}
        <aside className="w-64 bg-white border-r border-slate-200/90 p-3 hidden md:flex flex-col justify-between shrink-0 shadow-sm">
          <div className="space-y-1">
            <div className="text-[10px] font-bold text-slate-400 uppercase px-3 py-1.5 tracking-wider">
              Monitoring Modules
            </div>

            {[
              { id: "DASHBOARD", label: "National Cockpit", icon: "📊", badge: null },
              { id: "PROJECTS", label: "Projects Directory", icon: "📁", badge: projects.length },
              { id: "MILESTONES", label: "Milestones & Gantt", icon: "🚩", badge: null },
              { id: "BUDGET", label: "Budget & Payments", icon: "💳", badge: "₹ Anomaly" },
              { id: "ISSUES", label: "Issues & Escalations", icon: "⚠️", badge: issues.filter(i => i.status === "ESCALATED").length },
              { id: "AI_INSIGHTS", label: "AI Delay Forecasting", icon: "🧠", badge: "AI Ready" },
              { id: "MAP", label: "National GIS Map", icon: "🗺️", badge: null },
              { id: "DOCUMENTS", label: "Document Vault", icon: "📜", badge: "SHA-256" },
              { id: "REPORTS", label: "Executive Reports", icon: "📑", badge: null },
              { id: "AUDIT", label: "Provenance Audit Log", icon: "🛡️", badge: auditLogs.length },
              { id: "ROLES", label: "RBAC Privileges", icon: "👥", badge: "6 Roles" },
            ].map(item => {
              const active = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    active
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== null && item.badge !== undefined && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      active
                        ? "bg-white/20 text-white"
                        : item.badge === "₹ Anomaly"
                        ? "bg-amber-100 text-amber-700 border border-amber-200"
                        : "bg-slate-100 text-slate-600 border border-slate-200"
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* User Profile Footer */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs flex items-center gap-2.5 shadow-inner">
            <div className="w-8 h-8 rounded-xl bg-amber-200 text-amber-900 font-extrabold flex items-center justify-center shrink-0 border border-amber-300">
              {currentUser.name.slice(0, 2).toUpperCase()}
            </div>
            <div className="truncate">
              <div className="font-bold text-slate-800 truncate">{currentUser.name}</div>
              <div className="text-[10px] text-slate-500 truncate">{currentUser.role}</div>
            </div>
          </div>
        </aside>

        {/* Viewport Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar bg-[#f8fafd]">
          {/* Critical Ticker Banner - Soft Rose Pastel */}
          {stats.delayed > 0 && (
            <div className="mb-5 bg-gradient-to-r from-rose-50 via-rose-50/80 to-amber-50/60 border border-rose-200 rounded-2xl p-3.5 flex items-center justify-between text-xs text-rose-900 shadow-sm">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-0.5 rounded-lg bg-rose-600 text-white font-black text-[10px] tracking-wide shadow-sm">
                  HIGH ATTENTION
                </span>
                <span className="text-slate-800">
                  <strong className="text-rose-700">{stats.delayed} National Mega Projects</strong> are experiencing milestone slippages or inter-ministerial bottlenecks requiring MoSPI intervention.
                </span>
              </div>
              <button
                onClick={() => setCurrentView("ISSUES")}
                className="font-bold text-rose-600 hover:text-rose-800 underline ml-3 shrink-0"
              >
                Review Bottlenecks →
              </button>
            </div>
          )}

          {/* VIEW: DASHBOARD */}
          {currentView === "DASHBOARD" && (
            <div className="space-y-6">
              {/* Stat Cards Grid - Pastel Elevated Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-xs text-slate-500 font-semibold">Monitored Mega Projects</div>
                  <div className="text-2xl font-black text-slate-900 font-heading mt-1">{stats.total}</div>
                  <div className="text-[11px] font-semibold text-emerald-700 mt-1 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> {stats.active} Under Active Execution
                  </div>
                </div>

                <div className="bg-white border border-rose-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-xs text-slate-500 font-semibold">Delayed / At-Risk</div>
                  <div className="text-2xl font-black text-rose-600 font-heading mt-1">{stats.delayed}</div>
                  <div className="text-[11px] font-semibold text-rose-600 mt-1 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span> AI Delay Prediction Active
                  </div>
                </div>

                <div className="bg-white border border-amber-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-xs text-slate-500 font-semibold">Total Sanctioned Outlay</div>
                  <div className="text-2xl font-black text-amber-700 font-heading mt-1">₹{(stats.sanctioned / 1000).toFixed(1)}k Cr</div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Utilized: <strong className="text-slate-700">₹{(stats.utilized / 1000).toFixed(1)}k Cr</strong> ({Math.round((stats.utilized/stats.sanctioned)*100)}%)
                  </div>
                </div>

                <div className="bg-white border border-blue-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-xs text-slate-500 font-semibold">Avg Physical Progress</div>
                  <div className="text-2xl font-black text-blue-600 font-heading mt-1">{stats.avgPhysical}%</div>
                  <div className="w-full bg-slate-100 rounded-full h-2 mt-2 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full" style={{ width: `${stats.avgPhysical}%` }}></div>
                  </div>
                </div>
              </div>

              {/* Central Visual Charts Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Department Distribution Bar */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5 lg:col-span-2 shadow-sm">
                  <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                    <div>
                      <h3 className="font-bold text-sm text-slate-900 font-heading">Sector-wise Infrastructure Progress (%)</h3>
                      <p className="text-[11px] text-slate-500">Physical vs Financial Absorption Across Line Ministries</p>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                      Live Telemetry
                    </span>
                  </div>

                  <div className="space-y-4 pt-1">
                    {[
                      { name: "Highways & Expressways (MoRTH)", physical: 68, financial: 65, color: "bg-blue-500" },
                      { name: "Dedicated Freight Corridors (Railways)", physical: 89, financial: 83, color: "bg-emerald-500" },
                      { name: "Rural Water Supply (Jal Jeevan)", physical: 49, financial: 54, color: "bg-cyan-500" },
                      { name: "Renewable Energy & Solar Parks (MNRE)", physical: 76, financial: 66, color: "bg-amber-500" },
                      { name: "Metro Rail Corridors (MoHUA)", physical: 51, financial: 57, color: "bg-indigo-500" }
                    ].map((item, i) => (
                      <div key={i} className="space-y-1.5">
                        <div className="flex justify-between text-xs">
                          <span className="font-semibold text-slate-700">{item.name}</span>
                          <span className="text-slate-500">Physical: <strong className="text-slate-900">{item.physical}%</strong> | Fin: <strong className="text-slate-700">{item.financial}%</strong></span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden flex">
                          <div className={`${item.color} h-full rounded-full transition-all duration-500`} style={{ width: `${item.physical}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Status Donut Breakdown */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 font-heading mb-3 border-b border-slate-100 pb-2">Project Status Distribution</h3>
                    <div className="space-y-2.5 pt-1">
                      <div className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-blue-50 border border-blue-100">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                          <span className="font-medium text-slate-700">In Active Progress</span>
                        </div>
                        <span className="font-bold text-blue-700">{projects.filter(p => p.status === "IN_PROGRESS").length}</span>
                      </div>

                      <div className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-rose-50 border border-rose-100">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                          <span className="font-medium text-slate-700">Delayed / Bottlenecks</span>
                        </div>
                        <span className="font-bold text-rose-700">{projects.filter(p => p.status === "DELAYED").length}</span>
                      </div>

                      <div className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-amber-50 border border-amber-100">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                          <span className="font-medium text-slate-700">At Risk of Overrun</span>
                        </div>
                        <span className="font-bold text-amber-700">{projects.filter(p => p.status === "AT_RISK").length}</span>
                      </div>

                      <div className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-emerald-50 border border-emerald-100">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                          <span className="font-medium text-slate-700">Completed & Commissioned</span>
                        </div>
                        <span className="font-bold text-emerald-700">{projects.filter(p => p.status === "COMPLETED").length}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex justify-between">
                    <span>Active Review: MoSPI Q4</span>
                    <span className="text-emerald-700 font-bold">100% Audited</span>
                  </div>
                </div>
              </div>

              {/* Filterable Recent Projects Table - Clean White & Pastel */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 font-heading">Centrally Monitored Infrastructure Projects</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Click any project to view S-curve analytics, Gantt milestones, and AI delay forecasting</p>
                  </div>

                  {/* Filters */}
                  <div className="flex flex-wrap items-center gap-2">
                    <select
                      value={selectedDeptFilter}
                      onChange={(e) => setSelectedDeptFilter(e.target.value)}
                      className="bg-slate-50 text-slate-800 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-200"
                    >
                      <option value="ALL">All Ministries</option>
                      <option value="MoRTH">MoRTH (Highways)</option>
                      <option value="Railways">Railways (DFCCIL)</option>
                      <option value="Jal Shakti">Jal Shakti (Water)</option>
                      <option value="Power & MNRE">Power & Solar</option>
                      <option value="Housing & Urban Affairs">Urban Metro</option>
                    </select>

                    <select
                      value={selectedStatusFilter}
                      onChange={(e) => setSelectedStatusFilter(e.target.value)}
                      className="bg-slate-50 text-slate-800 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-200"
                    >
                      <option value="ALL">All Statuses</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="DELAYED">Delayed</option>
                      <option value="AT_RISK">At Risk</option>
                      <option value="COMPLETED">Completed</option>
                    </select>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px] bg-slate-50/80">
                        <th className="py-2.5 px-3 rounded-l-lg">Project & Code</th>
                        <th className="py-2.5 px-3">Line Ministry</th>
                        <th className="py-2.5 px-3">Sanctioned Outlay</th>
                        <th className="py-2.5 px-3">Delivery Progress</th>
                        <th className="py-2.5 px-3">AI Health</th>
                        <th className="py-2.5 px-3">Status</th>
                        <th className="py-2.5 px-3 text-right rounded-r-lg">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredProjects.map(p => (
                        <tr
                          key={p.id}
                          className="hover:bg-blue-50/40 transition-colors cursor-pointer"
                          onClick={() => {
                            setSelectedProjectId(p.id);
                            setCurrentView("PROJECT_DETAIL");
                          }}
                        >
                          <td className="py-3.5 px-3">
                            <div className="font-bold text-slate-900 hover:text-blue-600 transition-colors">{p.name}</div>
                            <div className="text-[10px] font-mono text-slate-500">{p.code} • {p.state}</div>
                          </td>

                          <td className="py-3.5 px-3">
                            <span className="font-medium text-slate-800">{p.ministry}</span>
                            <div className="text-[10px] text-slate-500 truncate max-w-[140px]">{p.department}</div>
                          </td>

                          <td className="py-3.5 px-3">
                            <div className="font-bold text-amber-700">₹{p.sanctionedBudget.toLocaleString()} Cr</div>
                            <div className="text-[10px] text-slate-500">Spent: ₹{p.utilizedBudget.toLocaleString()} Cr</div>
                          </td>

                          <td className="py-3.5 px-3">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-900">{p.physicalProgress}%</span>
                              <span className="text-[10px] text-slate-400">(Target: {p.plannedProgress}%)</span>
                            </div>
                            <div className="w-24 bg-slate-100 rounded-full h-1.5 mt-1 overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  p.physicalProgress >= p.plannedProgress ? "bg-emerald-500" : "bg-rose-500"
                                }`}
                                style={{ width: `${p.physicalProgress}%` }}
                              ></div>
                            </div>
                          </td>

                          <td className="py-3.5 px-3">
                            <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] border ${
                              p.healthScore >= 80
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : p.healthScore >= 60
                                ? "bg-amber-50 text-amber-700 border-amber-200"
                                : "bg-rose-50 text-rose-700 border-rose-200"
                            }`}>
                              {p.healthScore}/100
                            </span>
                          </td>

                          <td className="py-3.5 px-3">
                            <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] border ${
                              p.status === "COMPLETED"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : p.status === "DELAYED"
                                ? "bg-rose-50 text-rose-700 border-rose-200"
                                : p.status === "AT_RISK"
                                ? "bg-amber-50 text-amber-700 border-amber-200"
                                : "bg-blue-50 text-blue-700 border-blue-200"
                            }`}>
                              {p.status}
                            </span>
                          </td>

                          <td className="py-3.5 px-3 text-right">
                            <button className="px-2.5 py-1 bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white rounded-lg text-xs font-semibold transition-all border border-blue-200 hover:border-blue-600">
                              Drill-down →
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: PROJECT DRILLDOWN */}
          {currentView === "PROJECT_DETAIL" && currentProject && (
            <div className="space-y-6">
              {/* Back Button & Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setCurrentView("DASHBOARD")}
                    className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-slate-900 shadow-sm"
                  >
                    ← Back
                  </button>
                  <div>
                    <div className="flex items-center gap-2">
                      <h1 className="text-xl font-bold text-slate-900 font-heading">{currentProject.name}</h1>
                      <span className="text-xs px-2 py-0.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 font-mono font-bold">
                        {currentProject.code}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{currentProject.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsUpdateProgressOpen(true)}
                    className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-md transition-all"
                  >
                    + Submit Progress Log
                  </button>
                  <button
                    onClick={() => setIsDisburseModalOpen(true)}
                    className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-xl shadow-md transition-all"
                  >
                    ₹ Payment Voucher
                  </button>
                </div>
              </div>

              {/* 4 Metric Highlights - Pastel Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white border border-amber-100 rounded-2xl p-4 shadow-sm">
                  <div className="text-xs text-slate-500 font-semibold">Sanctioned Budget</div>
                  <div className="text-xl font-bold text-amber-700 font-heading mt-1">₹{currentProject.sanctionedBudget.toLocaleString()} Cr</div>
                  <div className="text-[11px] text-slate-500 mt-1">Spent: <strong className="text-slate-700">₹{currentProject.utilizedBudget.toLocaleString()} Cr</strong></div>
                </div>

                <div className="bg-white border border-blue-100 rounded-2xl p-4 shadow-sm">
                  <div className="text-xs text-slate-500 font-semibold">Physical Progress</div>
                  <div className="text-xl font-bold text-blue-600 font-heading mt-1">{currentProject.physicalProgress}%</div>
                  <div className="text-[11px] text-slate-500 mt-1">Scheduled Target: <strong className="text-slate-700">{currentProject.plannedProgress}%</strong></div>
                </div>

                <div className="bg-white border border-emerald-100 rounded-2xl p-4 shadow-sm">
                  <div className="text-xs text-slate-500 font-semibold">AI Health Score</div>
                  <div className="text-xl font-bold text-emerald-700 font-heading mt-1">{currentProject.healthScore}/100</div>
                  <div className="text-[11px] text-slate-500 mt-1">Delay Prob: <strong className="text-slate-700">{currentProject.delayProbability}%</strong></div>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                  <div className="text-xs text-slate-500 font-semibold">Target Completion</div>
                  <div className="text-xl font-bold text-slate-900 font-heading mt-1">{currentProject.targetEndDate}</div>
                  <div className="text-[11px] font-semibold text-rose-600 mt-1">
                    {currentProject.delayDays > 0 ? `+${currentProject.delayDays} days projected slip` : "On Scheduled Baseline"}
                  </div>
                </div>
              </div>

              {/* Milestones Delivery Gantt View */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="font-bold text-sm text-slate-900 font-heading">Key Milestone Baseline Delivery</h3>
                  <span className="text-xs text-slate-500">MoSPI Standard Milestone Tracking</span>
                </div>

                <div className="space-y-3">
                  {currentProject.milestones.map(m => (
                    <div key={m.id} className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border ${
                            m.status === "COMPLETED"
                              ? "bg-blue-50 text-blue-700 border-blue-200"
                              : m.status === "ON_TRACK"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : m.status === "AT_RISK"
                              ? "bg-amber-50 text-amber-700 border-amber-200"
                              : "bg-rose-50 text-rose-700 border-rose-200"
                          }`}>
                            {m.status}
                          </span>
                          <span className="font-bold text-slate-900 text-xs">{m.title}</span>
                        </div>
                        <div className="text-[11px] text-slate-500">
                          Due Date: <strong className="text-slate-800">{m.dueDate}</strong> • Weightage: {m.weightage}%
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <div className="text-right">
                          <div className="text-xs font-bold text-slate-900">{m.progress}%</div>
                          <div className="text-[10px] text-slate-400">Completed</div>
                        </div>
                        <div className="w-24 bg-slate-200 rounded-full h-2 overflow-hidden">
                          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full" style={{ width: `${m.progress}%` }}></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nodal Officer & Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-2 shadow-sm">
                  <h4 className="font-bold text-xs text-slate-500 uppercase tracking-wider">Assigned Project Authority</h4>
                  <div className="text-sm font-bold text-slate-900">{currentProject.manager}</div>
                  <div className="text-xs text-slate-600">{currentProject.managerEmail}</div>
                  <div className="text-xs text-slate-500">Department: <strong className="text-slate-800">{currentProject.department}</strong></div>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-2 shadow-sm">
                  <h4 className="font-bold text-xs text-slate-500 uppercase tracking-wider">Geographic Telemetry</h4>
                  <div className="text-sm font-bold text-slate-900">{currentProject.state}</div>
                  <div className="text-xs text-slate-500">Corridor / District: <strong className="text-slate-800">{currentProject.district}</strong></div>
                  <div className="text-xs text-slate-500 font-mono">GPS: {currentProject.lat}° N, {currentProject.lng}° E</div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: MILESTONES & GANTT */}
          {currentView === "MILESTONES" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-xl font-black text-slate-900 font-heading flex items-center gap-2">
                  <span>🚩</span> Integrated Milestones & Gantt Timeline
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  MoSPI standard delivery matrix with color-coding: Green (On Track), Amber (At Risk), Red (Delayed), Sky (Completed)
                </p>
              </div>

              <div className="space-y-5">
                {projects.map(p => (
                  <div key={p.id} className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                      <div>
                        <span className="text-xs font-mono font-bold text-blue-600">{p.code}</span>
                        <h3 className="font-bold text-base text-slate-900 font-heading">{p.name}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500">Physical: <strong className="text-slate-900">{p.physicalProgress}%</strong></span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                          p.status === "COMPLETED" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                          p.status === "DELAYED" ? "bg-rose-50 text-rose-700 border-rose-200" : "bg-blue-50 text-blue-700 border-blue-200"
                        }`}>{p.status}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {p.milestones.map(m => (
                        <div key={m.id} className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200 flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="font-bold text-slate-900 text-xs">{m.title}</div>
                            <div className="text-[10px] text-slate-500">Target Date: {m.dueDate}</div>
                          </div>
                          <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border ${
                            m.status === "COMPLETED" ? "bg-blue-50 text-blue-700 border-blue-200" :
                            m.status === "ON_TRACK" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                            m.status === "AT_RISK" ? "bg-amber-50 text-amber-700 border-amber-200" :
                            "bg-rose-50 text-rose-700 border-rose-200"
                          }`}>
                            {m.status} ({m.progress}%)
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW: BUDGET & EXPENDITURE */}
          {currentView === "BUDGET" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-xl font-black text-slate-900 font-heading flex items-center gap-2">
                  <span>💳</span> Financial Governance & Expenditure Monitoring
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Real-time monitoring of fund releases, contractor utilization, and automated spending anomaly detection
                </p>
              </div>

              {/* Anomaly Callout Banner - Pastel Amber */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 flex items-start gap-3 shadow-sm">
                <span className="text-lg">⚠️</span>
                <div>
                  <strong className="text-amber-950 font-bold">MoSPI Spending Anomaly Flagged:</strong>
                  <p className="mt-0.5 text-amber-800 leading-relaxed">
                    Project <em>Jal Jeevan Mission (Bundelkhand)</em> exhibits low budget absorption (54%) relative to elapsed schedule timeline (68%), indicating contractor liquidity constraints.
                  </p>
                </div>
              </div>

              {/* Budget Overview Cards - Pastel */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white border border-amber-100 rounded-2xl p-4 shadow-sm">
                  <div className="text-xs text-slate-500 font-semibold">Total Sanctioned Outlay</div>
                  <div className="text-2xl font-black text-amber-700 font-heading mt-1">₹{stats.sanctioned.toLocaleString()} Cr</div>
                  <div className="text-[11px] text-slate-500 mt-1">Across {stats.total} Projects</div>
                </div>

                <div className="bg-white border border-emerald-100 rounded-2xl p-4 shadow-sm">
                  <div className="text-xs text-slate-500 font-semibold">Total Utilized by Authorities</div>
                  <div className="text-2xl font-black text-emerald-700 font-heading mt-1">₹{stats.utilized.toLocaleString()} Cr</div>
                  <div className="text-[11px] text-slate-500 mt-1">Absorption: <strong className="text-emerald-800">{Math.round((stats.utilized/stats.sanctioned)*100)}%</strong></div>
                </div>

                <div className="bg-white border border-blue-100 rounded-2xl p-4 shadow-sm">
                  <div className="text-xs text-slate-500 font-semibold">Remaining Balance</div>
                  <div className="text-2xl font-black text-blue-600 font-heading mt-1">₹{(stats.sanctioned - stats.utilized).toLocaleString()} Cr</div>
                  <div className="text-[11px] text-slate-500 mt-1">Available for Q1 Allocations</div>
                </div>
              </div>

              {/* Project Expenditure Register */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                <h3 className="font-bold text-sm text-slate-900 font-heading">Project-wise Fiscal Ledger</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px] bg-slate-50/80">
                        <th className="py-2.5 px-3 rounded-l-lg">Project</th>
                        <th className="py-2.5 px-3">Sanctioned</th>
                        <th className="py-2.5 px-3">Released</th>
                        <th className="py-2.5 px-3">Utilized</th>
                        <th className="py-2.5 px-3">Absorption %</th>
                        <th className="py-2.5 px-3 text-right rounded-r-lg">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {projects.map(p => {
                        const ratio = Math.round((p.utilizedBudget / p.sanctionedBudget) * 100);
                        return (
                          <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                            <td className="py-3 px-3">
                              <div className="font-bold text-slate-900">{p.name}</div>
                              <div className="text-[10px] text-slate-500">{p.ministry}</div>
                            </td>
                            <td className="py-3 px-3 text-amber-700 font-bold">₹{p.sanctionedBudget.toLocaleString()} Cr</td>
                            <td className="py-3 px-3 text-slate-700">₹{p.releasedBudget.toLocaleString()} Cr</td>
                            <td className="py-3 px-3 text-emerald-700 font-bold">₹{p.utilizedBudget.toLocaleString()} Cr</td>
                            <td className="py-3 px-3">
                              <div className="font-bold text-slate-900">{ratio}%</div>
                              <div className="w-20 bg-slate-100 rounded-full h-1.5 mt-1 overflow-hidden">
                                <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${ratio}%` }}></div>
                              </div>
                            </td>
                            <td className="py-3 px-3 text-right">
                              <button
                                onClick={() => {
                                  setSelectedProjectId(p.id);
                                  setIsDisburseModalOpen(true);
                                }}
                                className="px-2.5 py-1 bg-amber-50 hover:bg-amber-600 text-amber-700 hover:text-white rounded-lg text-xs font-semibold transition-all border border-amber-200"
                              >
                                + Disburse
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: ISSUES & ESCALATIONS */}
          {currentView === "ISSUES" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-xl font-black text-slate-900 font-heading flex items-center gap-2">
                  <span>⚠️</span> Multi-Tier Issue Escalation & Risk Mitigation
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Inter-ministerial bottleneck resolution matrix with automated escalation to MoSPI Review Committees
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {issues.map(iss => (
                  <div key={iss.id} className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col justify-between space-y-3 shadow-sm hover:shadow-md transition-shadow">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border ${
                          iss.priority === "CRITICAL" ? "bg-rose-50 text-rose-700 border-rose-200" : "bg-amber-50 text-amber-700 border-amber-200"
                        }`}>
                          {iss.priority}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400">{iss.category}</span>
                      </div>

                      <h3 className="font-bold text-sm text-slate-900 leading-tight">{iss.title}</h3>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">{iss.description}</p>

                      <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-500 space-y-1">
                        <div>Project: <strong className="text-slate-800">{iss.projectName}</strong></div>
                        <div>Reported By: <strong className="text-slate-800">{iss.reportedBy}</strong></div>
                        <div>Target Deadline: <strong className="text-rose-600">{iss.deadline}</strong></div>
                      </div>
                    </div>

                    {iss.escalatedTo && (
                      <div className="p-2.5 rounded-xl bg-purple-50 border border-purple-200 text-[11px] text-purple-800">
                        🏛️ <strong>Escalated To:</strong> {iss.escalatedTo}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW: AI PREDICTIVE INSIGHTS */}
          {currentView === "AI_INSIGHTS" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-xl font-black text-slate-900 font-heading flex items-center gap-2">
                  <span>🧠</span> AI Predictive Delay Forecasting & Root Cause Intelligence
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Multi-factor regression model analyzing milestone velocity, financial liquidity, contractor performance, and seasonal risk factors
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {projects.map(p => (
                  <div key={p.id} className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-sm">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div>
                        <div className="font-mono text-xs font-bold text-blue-600">{p.code}</div>
                        <h3 className="font-bold text-base text-slate-900 font-heading">{p.name}</h3>
                      </div>

                      <div className="text-right">
                        <div className={`text-xl font-black ${
                          p.healthScore >= 80 ? "text-emerald-700" : p.healthScore >= 60 ? "text-amber-700" : "text-rose-600"
                        }`}>{p.healthScore}/100</div>
                        <div className="text-[10px] text-slate-400">Health Score</div>
                      </div>
                    </div>

                    {/* Prediction Metrics Bar */}
                    <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-xl text-center border border-slate-100">
                      <div>
                        <div className="text-xs font-bold text-rose-600">{p.delayProbability}%</div>
                        <div className="text-[10px] text-slate-500">Delay Prob</div>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-amber-700">+{p.delayDays} Days</div>
                        <div className="text-[10px] text-slate-500">Projected Slip</div>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-blue-600">{p.physicalProgress}%</div>
                        <div className="text-[10px] text-slate-500">Velocity</div>
                      </div>
                    </div>

                    {/* Prescriptive Remedial Actions */}
                    <div className="space-y-1.5 text-xs">
                      <div className="font-bold text-slate-700 text-[11px] uppercase tracking-wider">
                        🤖 AI Prescriptive Recommendations:
                      </div>
                      <div className="p-3 rounded-xl bg-indigo-50/70 border border-indigo-100 text-indigo-950 text-[11px] leading-relaxed">
                        {p.delayProbability > 50
                          ? "Convene inter-ministerial coordination with State Forest & Land authorities. Accelerate contractor IPC disbursements to prevent supply chain bottlenecks."
                          : "Maintain current physical pacing. Authorize next phase subgrade formation and release Q1 milestone allocation."}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW: NATIONAL GIS MAP */}
          {currentView === "MAP" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-xl font-black text-slate-900 font-heading flex items-center gap-2">
                  <span>🗺️</span> National GIS Infrastructure Geospatial Telemetry
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Interactive spatial map of India with live project telemetry pins, state-level filters, and corridor progress overlays
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center relative min-h-[480px] overflow-hidden">
                {/* SVG India Map Simulation - Light Pastel Topography */}
                <div className="relative w-full max-w-2xl h-96 flex items-center justify-center">
                  <div className="w-full h-full border border-blue-200 rounded-2xl bg-gradient-to-br from-blue-50/50 via-slate-50 to-indigo-50/40 flex items-center justify-center relative shadow-inner">
                    <span className="text-slate-300 font-black text-6xl tracking-widest opacity-40 select-none">INDIA GIS</span>

                    {/* Telemetry Pins */}
                    {projects.map((p, idx) => {
                      const topPositions = ["35%", "45%", "38%", "42%", "30%", "65%"];
                      const leftPositions = ["30%", "28%", "45%", "25%", "80%", "42%"];
                      return (
                        <div
                          key={p.id}
                          style={{ top: topPositions[idx % 6], left: leftPositions[idx % 6] }}
                          onClick={() => {
                            setSelectedProjectId(p.id);
                            setCurrentView("PROJECT_DETAIL");
                          }}
                          className="absolute group cursor-pointer -translate-x-1/2 -translate-y-1/2"
                        >
                          <div className="w-6 h-6 rounded-full bg-blue-500/20 ring-4 ring-blue-500/30 flex items-center justify-center animate-pulse">
                            <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                          </div>
                          <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1.5 hidden group-hover:block bg-slate-900 text-white text-[11px] font-bold px-2.5 py-1 rounded-xl shadow-xl border border-blue-400 whitespace-nowrap z-30">
                            {p.name} ({p.physicalProgress}%)
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-600 font-medium">
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span> Active Expressway</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span> Freight Rail</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-cyan-600"></span> Jal Jeevan Network</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-600"></span> Solar Parks</span>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: AUDIT LOG */}
          {currentView === "AUDIT" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-xl font-black text-slate-900 font-heading flex items-center gap-2">
                  <span>🛡️</span> Sovereign Immutable Audit Trail
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Cryptographically timestamped record of all state transitions, financial disbursements, and role actions
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px] bg-slate-50/80">
                        <th className="py-2.5 px-3 rounded-l-lg">Timestamp & IP</th>
                        <th className="py-2.5 px-3">User & Persona</th>
                        <th className="py-2.5 px-3">Action Executed</th>
                        <th className="py-2.5 px-3">Project Scope</th>
                        <th className="py-2.5 px-3 rounded-r-lg">Audit Details</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {auditLogs.map(log => (
                        <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                          <td className="py-3 px-3">
                            <div className="font-mono text-slate-900 font-semibold">{new Date(log.timestamp).toLocaleTimeString()}</div>
                            <div className="text-[10px] font-mono text-slate-400">{log.ipAddress}</div>
                          </td>
                          <td className="py-3 px-3">
                            <div className="font-bold text-slate-900">{log.userName}</div>
                            <span className="text-[10px] font-semibold text-blue-600">{log.userRole}</span>
                          </td>
                          <td className="py-3 px-3 font-semibold text-slate-700">{log.action}</td>
                          <td className="py-3 px-3 text-slate-600">{log.projectName}</td>
                          <td className="py-3 px-3 text-slate-600 text-[11px] max-w-md">{log.details}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: ROLES MATRIX */}
          {currentView === "ROLES" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-xl font-black text-slate-900 font-heading flex items-center gap-2">
                  <span>👥</span> Role-Based Access Control (RBAC) Persona Matrix
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  6 sovereign government user profiles configured for Smart India Hackathon evaluation
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {INITIAL_USERS.map(u => (
                  <div key={u.id} className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col justify-between space-y-3 shadow-sm hover:shadow-md transition-shadow">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                          {u.role}
                        </span>
                        {currentUser.id === u.id && (
                          <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Active
                          </span>
                        )}
                      </div>

                      <h3 className="font-bold text-base text-slate-900">{u.name}</h3>
                      <div className="text-xs text-slate-600 mt-0.5">{u.designation}</div>
                      <div className="text-xs text-slate-400 mt-1">{u.department}</div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] text-slate-500 font-mono">{u.email}</span>
                      <button
                        onClick={() => {
                          setCurrentUser(u);
                          showToast(`Switched active persona to ${u.role}`);
                          addAuditLog("ROLE_SWITCHED", "Auth Matrix", `Switched to ${u.role}`, "AUTH");
                        }}
                        className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                          currentUser.id === u.id
                            ? "bg-slate-100 text-slate-400 cursor-default"
                            : "bg-blue-600 hover:bg-blue-500 text-white shadow-sm"
                        }`}
                      >
                        {currentUser.id === u.id ? "Active" : "Switch →"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW: DOCUMENTS */}
          {currentView === "DOCUMENTS" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-xl font-black text-slate-900 font-heading flex items-center gap-2">
                  <span>📜</span> Cryptographic Document Vault
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Sovereign DPRs, Environmental Approvals, and Verified Drone Inspections with SHA-256 Provenance
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-sm">
                {[
                  { title: "Detailed Project Report (DPR) Volume 1", size: "48 MB", type: "PDF", hash: "9e8a7b...c4d3", prj: "Delhi-Mumbai Expressway" },
                  { title: "Stage-2 Forest Clearance Sanction Order", size: "12 MB", type: "PDF", hash: "4a2f8c...1e9b", prj: "Jal Jeevan Mission" },
                  { title: "Interim Payment Certificate (IPC-14)", size: "8 MB", type: "PDF", hash: "7d1e0a...88cc", prj: "Western DFC" },
                  { title: "Drone Orthomosaic Survey Inspection Photogrammetry", size: "184 MB", type: "ZIP", hash: "5b99ee...00ff", prj: "Dholera Solar Park" }
                ].map((doc, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900 text-xs">{doc.title}</div>
                      <div className="text-[10px] text-slate-500">Project: {doc.prj} • {doc.size} • <span className="font-mono text-emerald-700 font-semibold">SHA-256: {doc.hash}</span></div>
                    </div>
                    <button className="px-3 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-xs font-semibold shadow-sm">
                      Download ↓
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW: REPORTS */}
          {currentView === "REPORTS" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-xl font-black text-slate-900 font-heading flex items-center gap-2">
                  <span>📑</span> Executive & Parliamentary Report Dossier
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Automated generation of Cabinet Committee on Economic Affairs (CCEA) and MoSPI review dossiers
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
                <h3 className="font-bold text-sm text-slate-900">Generate Custom Monitoring Dossier</h3>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      window.print();
                      addAuditLog("EXPORTED_REPORT", "All Projects", "Exported CCEA Executive Dossier to PDF", "REPORT");
                    }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md"
                  >
                    🖨️ Export Printable PDF Dossier
                  </button>

                  <button
                    onClick={() => {
                      showToast("Exported MoSPI Infrastructure Dataset to CSV");
                      addAuditLog("EXPORTED_CSV", "All Projects", "Exported Project Master CSV", "REPORT");
                    }}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md"
                  >
                    📊 Export Master CSV Dataset
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODAL: CREATE NEW PROJECT - Clean White/Pastel */}
      {isCreateProjectOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900 font-heading">Register New Infrastructure Project</h3>
              <button onClick={() => setIsCreateProjectOpen(false)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const name = formData.get("name");
                const ministry = formData.get("ministry");
                const budget = Number(formData.get("budget"));
                const state = formData.get("state");

                const newPrj = {
                  id: "prj-" + Date.now().toString().slice(-3),
                  code: `MOSPI-${ministry.slice(0,2).toUpperCase()}-2026-${Math.floor(Math.random()*900+100)}`,
                  name,
                  description: formData.get("description"),
                  ministry,
                  department: `${ministry} Authority`,
                  status: "IN_PROGRESS",
                  priority: "HIGH",
                  sanctionedBudget: budget,
                  releasedBudget: Math.round(budget * 0.4),
                  utilizedBudget: Math.round(budget * 0.2),
                  plannedProgress: 20,
                  physicalProgress: 15,
                  financialProgress: 18,
                  startDate: "2026-03-01",
                  targetEndDate: "2028-12-31",
                  state,
                  district: "District Central",
                  lat: 20.5937,
                  lng: 78.9629,
                  manager: currentUser.name,
                  managerEmail: currentUser.email,
                  healthScore: 85,
                  delayProbability: 15,
                  delayDays: 0,
                  milestones: [
                    { id: "ms-new-1", title: "Preliminary Land Survey & Clearance", dueDate: "2026-06-30", status: "ON_TRACK", progress: 60, weightage: 30 },
                    { id: "ms-new-2", title: "Civil Works Contractor Procurement", dueDate: "2026-12-31", status: "ON_TRACK", progress: 10, weightage: 70 }
                  ]
                };

                setProjects(prev => [newPrj, ...prev]);
                setIsCreateProjectOpen(false);
                showToast(`Project "${name}" registered successfully!`);
                addAuditLog("REGISTERED_PROJECT", name, `Enrolled ₹${budget} Cr project under ${ministry}`, "PROJECT");
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Project Name</label>
                <input required name="name" placeholder="e.g. Northeast Multi-Modal Logistics Hub" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-100" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Line Ministry</label>
                  <select name="ministry" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white">
                    <option value="MoRTH">MoRTH (Highways)</option>
                    <option value="Railways">Ministry of Railways</option>
                    <option value="Jal Shakti">Ministry of Jal Shakti</option>
                    <option value="Power & MNRE">Power & Renewable Energy</option>
                    <option value="Housing & Urban Affairs">Urban Affairs (Metro)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Sanctioned Budget (₹ Cr)</label>
                  <input required name="budget" type="number" placeholder="5000" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white" />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">State / Corridor Location</label>
                <input required name="state" placeholder="e.g. Assam & Meghalaya" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white" />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Project Description</label>
                <textarea required name="description" rows={3} placeholder="Provide scope of works, objectives, and baseline targets..." className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white" />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button type="button" onClick={() => setIsCreateProjectOpen(false)} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold shadow-md">Enroll Project →</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: SUBMIT PROGRESS LOG */}
      {isUpdateProgressOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900 font-heading">Submit On-Site Progress Log</h3>
              <button onClick={() => setIsUpdateProgressOpen(false)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const progress = Number(formData.get("progress"));
                const notes = formData.get("notes");

                setProjects(prev => prev.map(p => {
                  if (p.id === currentProject.id) {
                    return {
                      ...p,
                      physicalProgress: progress,
                      healthScore: Math.min(100, Math.max(20, progress + 15))
                    };
                  }
                  return p;
                }));

                setIsUpdateProgressOpen(false);
                showToast(`Physical progress updated to ${progress}%`);
                addAuditLog("UPDATED_PROGRESS", currentProject.name, `Physical progress updated to ${progress}%: ${notes}`, "PROGRESS");
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Updated Physical Progress (%)</label>
                <input required name="progress" type="number" defaultValue={currentProject.physicalProgress} min={0} max={100} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white" />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Inspection Notes & Drone Verification</label>
                <textarea required name="notes" rows={3} placeholder="Describe completed civil works, concrete layering, or drone audit..." className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white" />
              </div>

              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-800">
                📍 <strong>GPS Verified Telemetry:</strong> Automatically geocoded to {currentProject.lat}° N, {currentProject.lng}° E.
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button type="button" onClick={() => setIsUpdateProgressOpen(false)} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold shadow-md">Submit Verified Log →</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: DISBURSE PAYMENT */}
      {isDisburseModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900 font-heading">Authorize Contractor Payment Voucher</h3>
              <button onClick={() => setIsDisburseModalOpen(false)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const amount = Number(formData.get("amount"));
                const vendor = formData.get("vendor");

                setProjects(prev => prev.map(p => {
                  if (p.id === currentProject.id) {
                    return {
                      ...p,
                      utilizedBudget: p.utilizedBudget + amount
                    };
                  }
                  return p;
                }));

                setIsDisburseModalOpen(false);
                showToast(`Authorized ₹${amount} Cr payment to ${vendor}`);
                addAuditLog("DISBURSED_PAYMENT", currentProject.name, `Disbursed ₹${amount} Cr to ${vendor}`, "BUDGET");
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Contractor / Vendor Name</label>
                <input required name="vendor" placeholder="e.g. Larsen & Toubro Construction Ltd." className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white" />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Voucher Amount (₹ Crores)</label>
                <input required name="amount" type="number" placeholder="250" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white" />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Voucher Memo / IPC Ref</label>
                <input required name="memo" placeholder="e.g. IPC-08 Substructure viaduct bill" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white" />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button type="button" onClick={() => setIsDisburseModalOpen(false)} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl font-bold shadow-md">Authorize Disbursement →</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* HACKATHON JUDGE DEMO TOUR MODAL - Pastel Elegance */}
      {isDemoTourOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-blue-200 rounded-3xl max-w-xl w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">🏛️</span>
                <div>
                  <h3 className="font-bold text-base text-slate-900 font-heading">Smart India Hackathon 2026 Walkthrough</h3>
                  <div className="text-[11px] font-semibold text-blue-700">Problem Statement: SIH26103 • Ministry of Statistics & PI (MoSPI)</div>
                </div>
              </div>
              <button onClick={() => setIsDemoTourOpen(false)} className="text-slate-400 hover:text-slate-700 text-lg">✕</button>
            </div>

            <div className="bg-gradient-to-br from-blue-50/70 via-indigo-50/50 to-sky-50/50 border border-blue-100 rounded-2xl p-5 space-y-2.5">
              <div className="text-xs font-bold text-amber-700">Step {demoTourStep + 1} of {demoTourSteps.length}</div>
              <h4 className="font-black text-lg text-slate-900 font-heading">{demoTourSteps[demoTourStep].title}</h4>
              <p className="text-xs text-slate-700 leading-relaxed">{demoTourSteps[demoTourStep].desc}</p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                disabled={demoTourStep === 0}
                onClick={() => {
                  const prev = demoTourStep - 1;
                  setDemoTourStep(prev);
                  demoTourSteps[prev].action();
                }}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 text-xs font-bold rounded-xl border border-slate-200"
              >
                ← Previous
              </button>

              <div className="flex items-center gap-1.5">
                {demoTourSteps.map((_, i) => (
                  <span
                    key={i}
                    className={`h-2 rounded-full transition-all ${
                      i === demoTourStep ? "bg-blue-600 w-5" : "bg-slate-200 w-2"
                    }`}
                  ></span>
                ))}
              </div>

              {demoTourStep < demoTourSteps.length - 1 ? (
                <button
                  onClick={() => {
                    const next = demoTourStep + 1;
                    setDemoTourStep(next);
                    demoTourSteps[next].action();
                  }}
                  className="px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl shadow-md"
                >
                  Next Step →
                </button>
              ) : (
                <button
                  onClick={() => setIsDemoTourOpen(false)}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md"
                >
                  Finish Tour ✓
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* FLOATING TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 bg-white border border-emerald-300 text-emerald-800 px-4 py-3 rounded-2xl shadow-xl text-xs font-semibold flex items-center gap-2 z-50 animate-bounce">
          <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">✓</span>
          <span>{toastMessage.text}</span>
        </div>
      )}
    </div>
  );
}

// Mount the React Application
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
