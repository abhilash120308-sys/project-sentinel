"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  X, 
  CheckCircle2, 
  Award, 
  ArrowRight,
  Eye,
  ShieldAlert,
  Brain,
  MapPin,
  TrendingUp,
  FileCheck2
} from "lucide-react";

export const DemoTourModal: React.FC = () => {
  const router = useRouter();
  const { isDemoMode, setIsDemoMode, demoStep, setDemoStep } = useApp();

  if (!isDemoMode) return null;

  const tourSteps = [
    {
      step: 1,
      title: "1. Executive Multi-Department Dashboard",
      highlight: "Centralized Single-Pane Government Monitoring",
      desc: "Aggregates real-time KPIs across MoRTH, Railways, Jal Shakti, Urban Affairs, Power, and Health ministries. Tracks ₹3.8+ Lakh Crore of public infrastructure with dynamic status distribution and progress analytics.",
      route: "/",
      badge: "Cross-Ministry Visibility"
    },
    {
      step: 2,
      title: "2. Deep Project Drill-Down & Metadata",
      highlight: "Granular Project Tracking (20+ Seeded Mega Projects)",
      desc: "Inspect any project (e.g., Delhi-Mumbai Expressway or Western DFC) to view sanctioned budget, physical vs financial progress, manager hierarchy, and geotagged field updates.",
      route: "/projects/prj-001",
      badge: "Detailed Project View"
    },
    {
      step: 3,
      title: "3. Milestones, Tasks & Gantt Timeline",
      highlight: "Visual Timeline with MoSPI Standard Color-Coding",
      desc: "Color-coded milestones (Green = On Track, Yellow = At Risk, Red = Delayed, Blue = Completed). Automatic overdue milestone detection and critical path tracking.",
      route: "/milestones",
      badge: "Gantt Timeline Engine"
    },
    {
      step: 4,
      title: "4. Physical vs Planned Progress Comparison",
      highlight: "Ground Reality vs Baseline Target Analytics",
      desc: "Field officers submit periodic progress reports with drone orthomosaic imagery and GPS coords. The system compares actual execution against scheduled baseline curves to highlight slippages.",
      route: "/projects/prj-002",
      badge: "Variance Detection"
    },
    {
      step: 5,
      title: "5. Real-Time Budget & Expenditure Monitoring",
      highlight: "Sanctioned vs Released vs Utilized Fund Tracking",
      desc: "Detects financial bottlenecks, spending anomalies, low fund utilization despite advanced civil works, and cost overruns with detailed payment voucher ledgers.",
      route: "/budget",
      badge: "Financial Governance"
    },
    {
      step: 6,
      title: "6. Issue Escalation & Risk Matrix",
      highlight: "Multi-Tiered Escalation to Higher Ministry Nodal Level",
      desc: "Log technical, environmental, land acquisition, or financial bottlenecks. Critical unresolved issues automatically escalate to MoSPI High-Powered Review Committees.",
      route: "/issues",
      badge: "Automated Escalation"
    },
    {
      step: 7,
      title: "7. AI Insights & Delay Prediction Engine",
      highlight: "Health Score (0-100) & Predictive Slippage Model",
      desc: "Uses multi-factor regression to project project health, delay probabilities, root causes, and prescriptive AI recommendations for proactive intervention.",
      route: "/ai-insights",
      badge: "AI Predictive Engine"
    },
    {
      step: 8,
      title: "8. National GIS Geo-Monitoring Map",
      highlight: "Interactive Spatial Intelligence across Indian States",
      desc: "Visualise all ongoing projects on an interactive map filtered by State, Department, Priority, and Risk Level. Instant pin-level telemetry for ground overview.",
      route: "/map",
      badge: "GIS Geo-Monitoring"
    },
    {
      step: 9,
      title: "9. Instant Executive Report Generation",
      highlight: "One-Click Export to PDF & Structured CSV",
      desc: "Generate comprehensive Ministry Monitoring Reports, Delayed Projects Summaries, and Budget Utilization Audits ready for parliamentary and cabinet briefings.",
      route: "/reports",
      badge: "One-Click Reporting"
    },
    {
      step: 10,
      title: "10. Immutable Audit Trail & 6-Role Access",
      highlight: "Cryptographic Tamper-Evident History & RBAC",
      desc: "Complete audit log recording who changed what (previous vs new value, IP, timestamp). Effortlessly test Super Admin, Project Admin, Project Manager, Dept Officer, Field Officer, and Viewer roles.",
      route: "/audit",
      badge: "Audit & Security"
    }
  ];

  const current = tourSteps[demoStep - 1] || tourSteps[0];

  const handleNext = () => {
    if (demoStep < tourSteps.length) {
      const nextStep = demoStep + 1;
      setDemoStep(nextStep);
      router.push(tourSteps[nextStep - 1].route);
    } else {
      setIsDemoMode(false);
      setDemoStep(1);
    }
  };

  const handlePrev = () => {
    if (demoStep > 1) {
      const prevStep = demoStep - 1;
      setDemoStep(prevStep);
      router.push(tourSteps[prevStep - 1].route);
    }
  };

  const handleJump = (stepNumber: number) => {
    setDemoStep(stepNumber);
    router.push(tourSteps[stepNumber - 1].route);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-amber-500/40 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden text-slate-100 ring-1 ring-amber-500/20">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-gov-navy via-slate-900 to-gov-navy px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-extrabold text-sm text-white">
                  Smart India Hackathon 2026 Evaluation Tour
                </span>
                <span className="text-[10px] bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full font-bold">
                  Step {demoStep} of 10
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                MoSPI Problem Statement: Integrated Project-Monitoring Platform (SIH26103)
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsDemoMode(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-900/60 text-blue-300 border border-blue-700">
              {current.badge}
            </span>
            <span className="text-xs text-amber-400 font-bold">
              Feature #{demoStep} / 10
            </span>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white font-heading">
              {current.title}
            </h3>
            <div className="text-xs text-amber-300 font-semibold mt-0.5">
              {current.highlight}
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed bg-slate-800/60 p-3.5 rounded-xl border border-slate-700/60">
            {current.desc}
          </p>

          {/* Quick step thumbnails */}
          <div className="pt-2">
            <div className="text-[11px] font-semibold text-slate-400 mb-2">Jump to Demonstration Section:</div>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5">
              {tourSteps.map((s) => (
                <button
                  key={s.step}
                  onClick={() => handleJump(s.step)}
                  className={`h-7 text-xs font-bold rounded-lg transition-all flex items-center justify-center ${
                    demoStep === s.step
                      ? "bg-amber-400 text-slate-950 ring-2 ring-amber-300"
                      : "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                  }`}
                  title={s.title}
                >
                  {s.step}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-950/60 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={demoStep === 1}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border ${
              demoStep === 1
                ? "opacity-40 cursor-not-allowed border-slate-800 text-slate-500"
                : "border-slate-700 text-slate-300 hover:bg-slate-800"
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                router.push(current.route);
                setIsDemoMode(false);
              }}
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700"
            >
              Explore This Page
            </button>
            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-gov-saffron text-slate-950 hover:brightness-110 shadow-lg shadow-orange-500/20"
            >
              <span>{demoStep === tourSteps.length ? "Finish Tour" : "Next Demo Step"}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
