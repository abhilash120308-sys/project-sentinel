"use client";

import React from "react";
import { useParams } from "next/navigation";
import { ProjectDetailView } from "@/components/projects/ProjectDetailView";

export default function SingleProjectPage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : (params?.id as string);

  return <ProjectDetailView projectId={id || "prj-001"} />;
}
