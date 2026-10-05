# Project Sentinel – Intelligent Integrated Project Monitoring Platform
### Ministry of Statistics & Programme Implementation (MoSPI) | Problem Statement ID: SIH26103
**Domain:** Software / Smart Automation | **Smart India Hackathon 2026**

---

## 🏛️ Executive Summary

**Project Sentinel** is an enterprise-grade, centralized web platform engineered for government ministries, project authorities, and oversight bodies to monitor, predict, and govern large-scale national infrastructure projects from a unified digital cockpit. 

Built in compliance with the **Ministry of Statistics & Programme Implementation (MoSPI)** guidelines, Project Sentinel transitions public infrastructure monitoring from reactive post-mortem audits to proactive, real-time, predictive governance.

---

## 🚀 Key Innovations & SIH Differentiators

1. **Centralized Multi-Ministry Monitoring Cockpit**: Aggregates infrastructure investments across MoRTH, Railways, Jal Shakti, Urban Affairs, Power, and Health ministries.
2. **AI & Multi-Factor Delay Prediction Engine**: Computes dynamic **Project Health Scores (0-100)** and forecasts schedule slippages and cost variances.
3. **Planned vs. Actual Delivery S-Curve**: Automated ground verification comparing scheduled baselines with periodic physical and financial progress.
4. **Interactive Milestone & Gantt Timeline**: Full MoSPI standard visual hierarchy (Green = On Track, Yellow = At Risk, Red = Delayed, Blue = Completed).
5. **Real-Time Financial Governance & Anomaly Detection**: Automated detection of abnormal spending spikes and low fund absorption despite advanced civil works.
6. **Multi-Tiered Escalation Matrix**: Instant escalation of critical right-of-way, forest clearance, or contractor bottlenecks to MoSPI High-Powered Review Committees.
7. **National GIS Geo-Monitoring & Spatial Intelligence**: Interactive state-level GIS mapping of infrastructure assets with pin telemetry and satellite layer simulation.
8. **Cryptographically Verified Document Vault**: Central repository for DPRs, statutory clearances, running bills, and completion certificates with SHA-256 integrity verification.
9. **One-Click Parliamentary & CCEA Reporting**: Instant export of detailed progress dossiers, budget audits, and delay briefs to printable PDF and structured CSV.
10. **Immutable Government Audit Trail & 6-Role RBAC**: Sovereign security model with full previous-to-new state transition tracking and one-click role simulation for judges.

---

## 👥 Role-Based Access Control (RBAC)

Project Sentinel includes 6 specialized persona accounts:

| Role | Persona | Key Privileges |
|---|---|---|
| **Super Admin** | Dr. Arvind Subramanian (Director General, MoSPI) | Sovereign access across all ministries, projects, fiscal outlays, AI models, and user privileges. |
| **Project Admin** | Smt. Rajeshwari Iyer, IAS (Executive Director, NHAI) | Supervises ministry-level project portfolio, approves milestone baseline modifications, and coordinates inter-state issues. |
| **Project Manager** | Er. Vikramaditya Sharma (Chief Project Manager, DFCCIL) | In charge of specific mega projects (e.g., Western DFC), manages contractor works, submits IPC vouchers. |
| **Dept Officer** | Dr. Ananya Roy (Superintending Engineer, Jal Shakti) | Oversees sector-specific programs (e.g. Jal Jeevan Mission), verifies IoT telemetry, and reviews regional field data. |
| **Field Officer** | Er. Sanjay Kumar Gond (Resident Engineer, NHAI) | Performs ground physical inspections, uploads drone orthomosaics, logs GPS coordinates, flags roadblocks. |
| **Viewer / Auditor** | Shri Alok Vardhan (Senior Audit Inspector, CAG) | Read-only access for evaluation bodies, public oversight inspectors, and parliamentary researchers. |

---

## 🧠 AI & Predictive Intelligence Architecture

The Project Sentinel Intelligence Engine computes:

- **Project Health Score ($H \in [0, 100]$)**:
  $$H = \text{Milestone Compliance (35 pts)} + \text{Financial Health (25 pts)} + \text{Issue Resolution Rate (20 pts)} + \text{Risk Exposure (20 pts)}$$
- **Delay Probability ($P_{\text{delay}} \in [5\%, 99\%]$)**:
  Derived from schedule variance ($\Delta = \text{Planned} - \text{Physical}$), overdue milestone count, and escalated bottleneck severity.
- **Projected Completion Date & Cost Overrun Risk**:
  Calculated using velocity regression and contractor bill liquidity indicators.
- **Prescriptive AI Recommendations**:
  Tailored remedial interventions (e.g., deploying additional launching gantries, convening inter-ministerial clearance meetings).

---

## 📊 Seeded Mega Projects (Demonstration Dataset)

The system includes realistic, populated data across India's infrastructure corridors:

- **Delhi-Mumbai Expressway Phase-IV** (Vadodara-Virar Stretch | ₹24,500 Cr | MoRTH/NHAI)
- **Western Dedicated Freight Corridor** (JNPT to Dadri | ₹51,000 Cr | DFCCIL/Railways)
- **Jal Jeevan Mission** (Rural Piped Water Supply, Bundelkhand | ₹15,800 Cr | Jal Shakti)
- **Ultra Mega Solar Park** (4,000 MW Solar + 1,000 MWh BESS, Dholera SIR | ₹19,500 Cr | MNRE/SECI)
- **AIIMS Guwahati Super Speciality Hospital** (750-Bed Campus | ₹1,890 Cr | MoHFW/PMSSY)
- **Bengaluru Metro Phase 2A & 2B** (Silk Board to Airport Line | ₹14,820 Cr | MoHUA/BMRCL)
- **Mumbai-Ahmedabad High Speed Rail** (Bullet Train Shinkansen Corridor | ₹61,500 Cr | NHSRCL/Railways)
- **Polavaram National Irrigation & Hydro Project** (Godavari Basin Multi-Purpose | ₹29,000 Cr | Jal Shakti)
- **Zojila & Z-Morh Strategic Tunnel** (Srinagar-Leh Highway | ₹6,800 Cr | NHIDCL/MoRTH)
- **PM-eBus Sewa** (10,000 Electric Bus Nationwide Deployment | ₹20,000 Cr | MoHUA/CESL)
- **Trans-Arunachal Strategic Highway** (NH-13 Border Frontier Road | ₹12,400 Cr | MoRTH/BRTF)
- **Green Hydrogen & Offshore Grid Pilot** (Gulf of Mannar Coastal Hub | ₹8,900 Cr | MNRE)

---

## 🛠️ Technology Stack

- **Frontend & App Engine:** Next.js (App Router), React, TypeScript
- **Styling & UI:** Tailwind CSS, Custom Government Design System, Glassmorphism, Micro-animations
- **Analytics & Visualizations:** Recharts, Responsive Bar/Line/Donut/Area charts, SVG GIS Canvas
- **State Management & Persistence:** React Context API + LocalStorage synchronization
- **Relational Data Modeling:** Prisma ORM schema with PostgreSQL architecture
- **Icons & Visuals:** Lucide React icons, Unchecked responsive layouts
- **Auditing & Security:** Role-Based Access Control, cryptographically logged audit trail

---

## 🌟 Hackathon Demonstration Guide (10 Steps)

Judges can launch the **SIH Hackathon Tour** at any time by clicking the **"Judge Demo Tour"** button in the top role switcher banner:

1. **Multi-Department Dashboard** (National KPIs, department progress, status distribution)
2. **Project Deep Dive** (Detailed metadata, manager contacts, planned vs physical delivery)
3. **Milestones & Gantt Timeline** (Color-coded Gantt chart, overdue milestone alerts)
4. **Physical vs Planned Comparison** (Ground reality S-curve analysis)
5. **Budget Monitoring & Anomaly Flags** (Sanctioned vs Released vs Utilized fund absorption)
6. **Issue Escalation & Risk Heatmap** (Ministry-level escalation workflow)
7. **AI Insights & Delay Forecasting** (Health score 78/100, delay risk, remedial actions)
8. **National GIS Geo-Monitoring Map** (Interactive state-wise telemetry pins)
9. **Executive Report Generation** (One-click export to CSV & printable PDF)
10. **Immutable Audit Trail & Role Switcher** (Testing all 6 role permissions)

---

*Developed for the Smart India Hackathon (SIH26103) under the aegis of the Ministry of Statistics & Programme Implementation (MoSPI).*
>>>>>>> 26431d1 (Initial commit - Project Sentinel MoSPI platform)
