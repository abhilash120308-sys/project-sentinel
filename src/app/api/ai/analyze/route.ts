import { NextResponse } from "next/server";
import { computeProjectAIInsight } from "@/lib/aiIntelligenceEngine";
import { Project } from "@/types";

export async function POST(request: Request) {
  try {
    const project: Project = await request.json();
    if (!project || !project.id) {
      return NextResponse.json({ success: false, error: "Invalid project payload" }, { status: 400 });
    }

    const analysis = computeProjectAIInsight(project);

    return NextResponse.json({
      success: true,
      analysis,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message || "Failed to execute AI model",
    }, { status: 500 });
  }
}
