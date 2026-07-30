"use client";

import React, { useState, useEffect } from "react";
import { FolderOpen, Plus } from "lucide-react";
import ResourceCard from "@/app/components/ResourceCard";
import UploadDialog, { UploadPayload } from "@/app/components/UploadDialog";
import EmptyState from "@/app/components/EmptyState";

interface Resource {
  id: string;
  title: string;
  type: "pdf" | "youtube" | "website";
  uploadedAt: string;
}

const STORAGE_KEY = "resources";

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Load from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setResources(JSON.parse(stored));
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(resources));
  }, [resources]);

  const handleUpload = async (data: UploadPayload) => {
    let response: Response;

    if (data.type === "pdf" && data.file) {
      const formData = new FormData();
      formData.append("file", data.file);
      formData.append("title", data.title);
      formData.append("sourceType", "pdf");

      response = await fetch("/api/index", {
        method: "POST",
        body: formData,
      });
    } else {
      response = await fetch("/api/index", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: data.title,
          sourceType: data.type,
          url: data.url,
        }),
      });
    }

    const resultData = await response.json();

    if (!response.ok || !resultData.success) {
      throw new Error(resultData.message || resultData.error || "Failed to index document.");
    }

    const newResource: Resource = {
      id: Date.now().toString(),
      title: data.title,
      type: data.type,
      uploadedAt: new Date().toISOString(),
    };

    setResources((prev) => [newResource, ...prev]);
  };

  const handleDelete = (id: string) => {
    setResources((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b-2 border-dashed border-pencil/30 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 flex items-center justify-center border-2 border-pencil bg-accent-blue text-white"
            style={{
              borderRadius: "60% 40% 50% 50% / 50% 60% 40% 50%",
            }}
          >
            <FolderOpen size={18} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="font-heading text-xl font-bold text-pencil">
              Resources
            </h1>
            <p className="font-body text-sm text-pencil/50">
              {resources.length} resource{resources.length !== 1 ? "s" : ""}{" "}
              indexed into Qdrant
            </p>
          </div>
        </div>
        <button
          className="btn-sketchy text-base px-4 py-2"
          onClick={() => setDialogOpen(true)}
        >
          <Plus size={16} strokeWidth={2.5} />
          Add Resource
        </button>
      </div>

      {/* Content */}
      {resources.length === 0 ? (
        <EmptyState
          icon={
            <FolderOpen size={32} strokeWidth={2} className="text-pencil/30" />
          }
          title="No resources yet"
          description="Upload PDFs, paste YouTube links, or add websites to index them into your Qdrant vector database."
          action={
            <button
              className="btn-sketchy"
              onClick={() => setDialogOpen(true)}
            >
              <Plus size={18} strokeWidth={2.5} />
              Add your first resource
            </button>
          }
        />
      ) : (
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource) => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      )}

      {/* Upload Dialog */}
      <UploadDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onUpload={handleUpload}
      />
    </div>
  );
}
