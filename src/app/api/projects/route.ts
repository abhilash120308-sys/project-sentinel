import { NextResponse } from "next/server";
import { SEED_PROJECTS } from "@/data/seedData";
import { computeProjectAIInsight } from "@/lib/aiIntelligenceEngine";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dept = searchParams.get("department");
  const status = searchParams.get("status");

  let result = SEED_PROJECTS;
  if (dept && dept !== "ALL") {
    result = result.filter((p) => p.departmentId === dept);
  }
  if (status && status !== "ALL") {
    result = result.filter((p) => p.status === status);
  }

  return NextResponse.json({
    success: true,
    total: result.length,
    data: result,
    timestamp: new Date().toISOString(),
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newProject = {
      ...body,
      id: `prj-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    const analysis = computeProjectAIInsight(newProject);
    newProject.aiInsight = analysis.insight;

    return NextResponse.json({
      success: true,
      message: "Infrastructure project registered successfully.",
      data: newProject,
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message || "Failed to create project",
    }, { status: 400 });
  }
}
