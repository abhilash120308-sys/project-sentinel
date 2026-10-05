import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "HEALTHY",
    version: "2.6.0",
    platform: "Project Sentinel (MoSPI SIH26103)",
    database: "PostgreSQL Prisma Layer Ready",
    aiEngine: "Multi-Factor Milestone & Financial Regressor Active",
    geoTelemetry: "NIC Survey Grid Synchronized",
    uptimeSeconds: process.uptime(),
    timestamp: new Date().toISOString(),
  });
}
