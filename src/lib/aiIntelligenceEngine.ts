import { Project, Milestone, Issue, Risk, AIInsight, Transaction } from "@/types";

export interface AIAnalysisResult {
  insight: AIInsight;
  spendingAnomalies: string[];
  scheduleVarianceDays: number;
  criticalPathMilestones: Milestone[];
  healthScoreBreakdown: {
    milestoneCompliance: number; // Max 35
    financialHealth: number; // Max 25
    issueResolution: number; // Max 20
    riskExposure: number; // Max 20
  };
}

export function computeProjectAIInsight(project: Project): AIAnalysisResult {
  const milestones = project.milestones || [];
  const issues = project.issues || [];
  const risks = project.risks || [];
  const transactions = project.transactions || [];

  // 1. Milestone & Schedule Analysis
  const totalMilestones = milestones.length;
  const completedMilestones = milestones.filter((m) => m.status === "COMPLETED" || m.progressPercentage === 100);
  const delayedMilestones = milestones.filter((m) => m.status === "DELAYED");
  const atRiskMilestones = milestones.filter((m) => m.status === "AT_RISK");

  const progressVariance = (project.plannedProgress || 0) - (project.physicalProgress || 0);
  
  // 2. Financial & Budget Analysis
  const sanctioned = project.sanctionedBudget || 1;
  const released = project.releasedBudget || 0;
  const utilized = project.utilizedBudget || 0;
  const utilizationRate = released > 0 ? (utilized / released) * 100 : 0;
  
  // Abnormal spending / low utilization flags
  const spendingAnomalies: string[] = [];
  if (project.physicalProgress > 40 && utilizationRate < 20) {
    spendingAnomalies.push("Severe financial under-utilization despite advanced physical execution.");
  }
  if (utilizationRate > 85 && project.physicalProgress < 40) {
    spendingAnomalies.push("High fund drawdown with disproportionately low physical milestones delivered.");
  }
  if (utilized > sanctioned) {
    spendingAnomalies.push("Cost overrun detected: Utilized budget exceeds sanctioned limit.");
  }

  // 3. Issues & Risk Assessment
  const openIssues = issues.filter((i) => i.status === "OPEN" || i.status === "ESCALATED");
  const criticalIssues = issues.filter(
    (i) => (i.priority === "CRITICAL" || i.priority === "HIGH") && i.status !== "RESOLVED"
  );
  const escalatedIssues = issues.filter((i) => i.status === "ESCALATED");
  
  const highRisks = risks.filter((r) => r.impact === "CRITICAL" || r.probability === "HIGH");

  // --- HEALTH SCORE CALCULATION (0 - 100) ---
  // A. Milestone Compliance (Max 35 pts)
  let milestoneScore = 35;
  if (progressVariance > 25) milestoneScore -= 25;
  else if (progressVariance > 15) milestoneScore -= 18;
  else if (progressVariance > 5) milestoneScore -= 10;
  else if (progressVariance > 0) milestoneScore -= 4;

  if (delayedMilestones.length > 0) {
    milestoneScore -= Math.min(15, delayedMilestones.length * 5);
  }
  milestoneScore = Math.max(0, Math.min(35, Math.round(milestoneScore)));

  // B. Financial Health (Max 25 pts)
  let financialScore = 25;
  if (spendingAnomalies.length > 0) {
    financialScore -= spendingAnomalies.length * 8;
  }
  const expectedFinRate = project.plannedProgress;
  const finVariance = Math.abs(utilizationRate - expectedFinRate);
  if (finVariance > 30) financialScore -= 10;
  else if (finVariance > 15) financialScore -= 5;
  financialScore = Math.max(0, Math.min(25, Math.round(financialScore)));

  // C. Issue Resolution Rate (Max 20 pts)
  let issueScore = 20;
  if (escalatedIssues.length > 0) issueScore -= escalatedIssues.length * 8;
  if (criticalIssues.length > 0) issueScore -= criticalIssues.length * 4;
  if (openIssues.length > 3) issueScore -= 4;
  issueScore = Math.max(0, Math.min(20, Math.round(issueScore)));

  // D. Risk Exposure (Max 20 pts)
  let riskScore = 20;
  if (highRisks.length > 0) riskScore -= highRisks.length * 5;
  riskScore = Math.max(0, Math.min(20, Math.round(riskScore)));

  const totalHealthScore = Math.round(milestoneScore + financialScore + issueScore + riskScore);

  // --- DELAY PROBABILITY (0 - 100%) ---
  let delayProb = 10;
  if (project.status === "DELAYED") delayProb = 88;
  else if (project.status === "AT_RISK") delayProb = 65;
  else if (project.status === "COMPLETED") delayProb = 0;
  else {
    if (progressVariance > 10) delayProb += 30;
    if (delayedMilestones.length > 0) delayProb += delayedMilestones.length * 15;
    if (criticalIssues.length > 0) delayProb += criticalIssues.length * 10;
    if (highRisks.length > 0) delayProb += 15;
  }
  delayProb = Math.min(99, Math.max(5, delayProb));

  // Risk Level
  let riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' = 'LOW';
  if (totalHealthScore < 45 || delayProb > 75 || escalatedIssues.length > 0) {
    riskLevel = 'CRITICAL';
  } else if (totalHealthScore < 65 || delayProb > 50 || criticalIssues.length > 0) {
    riskLevel = 'HIGH';
  } else if (totalHealthScore < 80 || delayProb > 30) {
    riskLevel = 'MEDIUM';
  }

  // Budget Risk Level
  let budgetRisk: 'LOW' | 'MEDIUM' | 'HIGH' = 'LOW';
  if (spendingAnomalies.length >= 2 || utilized > sanctioned * 0.95 && project.physicalProgress < 80) {
    budgetRisk = 'HIGH';
  } else if (spendingAnomalies.length === 1 || Math.abs(utilizationRate - project.physicalProgress) > 20) {
    budgetRisk = 'MEDIUM';
  }

  // Milestone Risk Level
  let milestoneRisk: 'LOW' | 'MEDIUM' | 'HIGH' = 'LOW';
  if (delayedMilestones.length >= 2 || progressVariance > 20) {
    milestoneRisk = 'HIGH';
  } else if (delayedMilestones.length === 1 || atRiskMilestones.length >= 2 || progressVariance > 10) {
    milestoneRisk = 'MEDIUM';
  }

  // Generate Root Causes
  const rootCauses: string[] = [];
  if (delayedMilestones.length > 0) {
    rootCauses.push(`${delayedMilestones.length} milestone(s) past contractual deadline without completion confirmation.`);
  }
  if (progressVariance > 10) {
    rootCauses.push(`Physical progress lags behind planned baseline by ${progressVariance.toFixed(1)} percentage points.`);
  }
  if (escalatedIssues.length > 0) {
    rootCauses.push(`${escalatedIssues.length} unresolved issue(s) escalated to higher ministry nodal level.`);
  }
  if (criticalIssues.length > 0) {
    rootCauses.push(`${criticalIssues.length} high/critical priority bottlenecks in approvals or ground execution.`);
  }
  if (spendingAnomalies.length > 0) {
    rootCauses.push(spendingAnomalies[0]);
  }
  if (rootCauses.length === 0) {
    rootCauses.push("Project execution parameters are tracking within normal operational tolerances.");
  }

  // Prescriptive AI Recommendations
  const recommendedActions: string[] = [];
  if (escalatedIssues.length > 0) {
    recommendedActions.push("Convene an inter-ministerial coordination meeting to clear inter-departmental clearances.");
  }
  if (delayedMilestones.length > 0) {
    recommendedActions.push("Deploy supplementary field engineering crews and institute daily contractor monitoring for critical path items.");
  }
  if (budgetRisk === "HIGH") {
    recommendedActions.push("Conduct immediate financial audit of expenditure line items and reconcile contractor bill submissions.");
  }
  if (progressVariance > 15) {
    recommendedActions.push("Fast-track parallel non-dependent subtasks to compress residual timeline by 18-24 days.");
  }
  if (recommendedActions.length < 2) {
    recommendedActions.push("Maintain bi-weekly drone/geo-tagged physical verification and ensure prompt tranche fund release.");
    recommendedActions.push("Review vendor SLA compliance and conduct monthly executive progress review.");
  }

  // Predicted Completion Date
  const targetDate = new Date(project.targetEndDate || "2026-12-31");
  let predictedDaysOffset = 0;
  if (delayProb > 70) predictedDaysOffset = Math.round((progressVariance * 6) + 45);
  else if (delayProb > 40) predictedDaysOffset = Math.round((progressVariance * 3) + 15);
  else predictedDaysOffset = 0;

  const predictedDate = new Date(targetDate.getTime() + predictedDaysOffset * 24 * 60 * 60 * 1000);
  const predictedCompletionDate = predictedDate.toISOString().split("T")[0];

  // Cost Variance
  let costVariancePredictedPercent = 0;
  if (riskLevel === "CRITICAL") costVariancePredictedPercent = Math.round(8.5 + (progressVariance * 0.4));
  else if (riskLevel === "HIGH") costVariancePredictedPercent = Math.round(3.5 + (progressVariance * 0.2));
  else costVariancePredictedPercent = 0;

  const performanceSummary = `Project health is rated at ${totalHealthScore}/100 (${riskLevel} Risk). Physical progress is currently ${project.physicalProgress}% against a planned target of ${project.plannedProgress}%. Predicted completion date: ${predictedCompletionDate} with ${delayProb}% probability of schedule slippage.`;

  const insight: AIInsight = {
    projectId: project.id,
    healthScore: totalHealthScore,
    delayProbability: delayProb,
    riskLevel,
    budgetRisk,
    milestoneRisk,
    performanceSummary,
    rootCauses,
    recommendedActions,
    predictedCompletionDate,
    costVariancePredictedPercent,
    lastAnalysisTimestamp: new Date().toISOString(),
  };

  return {
    insight,
    spendingAnomalies,
    scheduleVarianceDays: predictedDaysOffset,
    criticalPathMilestones: delayedMilestones.concat(atRiskMilestones),
    healthScoreBreakdown: {
      milestoneCompliance: milestoneScore,
      financialHealth: financialScore,
      issueResolution: issueScore,
      riskExposure: riskScore,
    },
  };
}
