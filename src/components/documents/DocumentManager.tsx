"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { ProjectDocument, DocumentCategory } from "@/types";
import { 
  FileText, 
  UploadCloud, 
  Download, 
  Search, 
  Filter, 
  FileCheck, 
  ShieldCheck, 
  Calendar, 
  Building2,
  X,
  Plus,
  Eye
} from "lucide-react";
import { formatDate } from "@/lib/utils";

interface DocumentManagerProps {
  projectId?: string;
}

export const DocumentManager: React.FC<DocumentManagerProps> = ({ projectId }) => {
  const { projects, addDocument, currentUser } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [search, setSearch] = useState<string>("");
  const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false);

  // Form State
  const [docProjId, setDocProjId] = useState<string>(projectId || projects[0]?.id || "");
  const [docTitle, setDocTitle] = useState<string>("");
  const [docFileName, setDocFileName] = useState<string>("");
  const [docCategory, setDocCategory] = useState<DocumentCategory>("REPORT");

  const relevantProjects = projectId ? projects.filter((p) => p.id === projectId) : projects;

  const allDocs = relevantProjects.flatMap((p) =>
    (p.documents || []).map((d) => ({
      ...d,
      projectName: p.name,
      projectCode: p.code,
    }))
  );

  const filteredDocs = allDocs.filter((d) => {
    const matchesCat = selectedCategory === "ALL" || d.category === selectedCategory;
    const q = search.toLowerCase();
    const matchesSearch =
      d.title.toLowerCase().includes(q) ||
      d.fileName.toLowerCase().includes(q) ||
      d.projectName.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docTitle.trim() || !docProjId) return;

    const computedFileName = docFileName.trim() || `${docTitle.toLowerCase().replace(/\s+/g, "_")}.pdf`;

    addDocument(docProjId, {
      projectId: docProjId,
      title: docTitle,
      fileName: computedFileName,
      fileType: "PDF",
      fileSize: `${(Math.random() * 8 + 1).toFixed(1)} MB`,
      category: docCategory,
      url: "#",
    });

    setIsUploadOpen(false);
    setDocTitle("");
    setDocFileName("");
  };

  return (
    <div className="space-y-4">
      {/* Top Filter & Actions */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-500 flex items-center justify-center font-bold">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-base text-slate-900 dark:text-white">
              Project Document Repository & Cryptographic Vault
            </h2>
            <p className="text-xs text-slate-500">
              DPRs, Environmental Clearances, Sanctions, Geo-tagged Bills & Inspection Certificates
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search documents..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="text-xs py-1.5 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-medium"
          >
            <option value="ALL">All Document Types ({allDocs.length})</option>
            <option value="DPR">Detailed Project Reports (DPR)</option>
            <option value="APPROVAL">Clearance & Approvals</option>
            <option value="SANCTION_ORDER">Sanction Orders</option>
            <option value="PROGRESS_REPORT">Progress Reports</option>
            <option value="BILL">Running Account Bills</option>
            <option value="CERTIFICATE">Completion Certificates</option>
          </select>

          <button
            onClick={() => setIsUploadOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gov-blue hover:bg-blue-700 text-white font-bold text-xs rounded-lg shadow-sm transition-all"
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>Upload Document</span>
          </button>
        </div>
      </div>

      {/* Document Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocs.length === 0 ? (
          <div className="col-span-3 bg-white dark:bg-slate-900 rounded-2xl p-8 text-center text-slate-400 border border-slate-200 dark:border-slate-800">
            No documents found matching the filter.
          </div>
        ) : (
          filteredDocs.map((doc) => (
            <div
              key={doc.id}
              className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:shadow-md transition-all group"
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
                    {doc.category.replace(/_/g, " ")}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {doc.fileSize}
                  </span>
                </div>

                <h4 className="font-bold text-xs text-slate-900 dark:text-white line-clamp-2 leading-snug">
                  {doc.title}
                </h4>

                <div className="text-[11px] text-slate-500 mt-1 font-semibold truncate">
                  {doc.projectName}
                </div>

                <div className="mt-3 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-[10px] text-slate-400 flex items-center justify-between">
                  <span className="font-mono truncate max-w-[150px]">{doc.fileName}</span>
                  <span className="flex items-center gap-1 text-emerald-600 font-bold">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Verified</span>
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                <span>By: {doc.uploadedByName}</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => alert(`Viewing document: ${doc.fileName}\nCryptographic integrity hash SHA-256 verified.`)}
                    className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-gov-blue hover:text-white rounded-lg font-semibold flex items-center gap-1"
                  >
                    <Eye className="w-3 h-3" />
                    <span>View</span>
                  </button>
                  <button
                    onClick={() => alert(`Downloading verified copy of ${doc.fileName}`)}
                    className="p-1 text-slate-400 hover:text-gov-blue"
                    title="Download File"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Upload Document Modal */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full shadow-2xl p-5 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <UploadCloud className="w-4 h-4 text-gov-blue" />
                <span>Upload Project Document to Vault</span>
              </h3>
              <button onClick={() => setIsUploadOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-3">
              <div>
                <label className="block font-semibold mb-1">Target Project</label>
                <select
                  value={docProjId}
                  onChange={(e) => setDocProjId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-semibold"
                >
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Document Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Stage-II Forest Clearance Order (MoEFCC)"
                  value={docTitle}
                  onChange={(e) => setDocTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Category</label>
                  <select
                    value={docCategory}
                    onChange={(e) => setDocCategory(e.target.value as DocumentCategory)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg"
                  >
                    <option value="DPR">Detailed Project Report (DPR)</option>
                    <option value="APPROVAL">Statutory Approval</option>
                    <option value="SANCTION_ORDER">Sanction Order</option>
                    <option value="PROGRESS_REPORT">Progress Report</option>
                    <option value="BILL">Running Bill / Invoice</option>
                    <option value="CERTIFICATE">Completion Certificate</option>
                    <option value="PHOTO">Site Photos & Geo-Tags</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">File Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Clearance_MoEFCC_2026.pdf"
                    value={docFileName}
                    onChange={(e) => setDocFileName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono"
                  />
                </div>
              </div>

              {/* Upload Dropzone area */}
              <div className="p-6 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl text-center bg-slate-50 dark:bg-slate-800/40">
                <UploadCloud className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <div className="font-semibold text-slate-700 dark:text-slate-300">
                  Drag & Drop PDF or click to browse
                </div>
                <div className="text-[10px] text-slate-400 mt-1">
                  Supports PDF, GeoTIFF, CAD, DOCX up to 50 MB
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsUploadOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gov-blue hover:bg-blue-700 text-white font-bold"
                >
                  Upload & Secure
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
