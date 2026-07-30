"use client";

import React, { useState } from "react";
import { X, FileText, Video, Globe, Upload } from "lucide-react";

interface UploadDialogProps {
  open: boolean;
  onClose: () => void;
  onUpload: (resource: {
    title: string;
    type: "pdf" | "youtube" | "website";
  }) => void;
}

const tabs = [
  { type: "pdf" as const, label: "PDF", icon: FileText },
  { type: "youtube" as const, label: "YouTube", icon: Video },
  { type: "website" as const, label: "Website", icon: Globe },
];

export default function UploadDialog({
  open,
  onClose,
  onUpload,
}: UploadDialogProps) {
  const [activeTab, setActiveTab] = useState<"pdf" | "youtube" | "website">(
    "pdf"
  );
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onUpload({ title: title.trim(), type: activeTab });
      setTitle("");
      setUrl("");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-pencil/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}
      <div
        className="relative bg-paper border-3 border-pencil p-6 md:p-8 w-full max-w-md z-10"
        style={{
          borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px",
          boxShadow: "8px 8px 0px 0px #2d2d2d",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-pencil/60 hover:text-pencil hover:bg-muted/30 transition-colors"
          style={{ borderRadius: "50%" }}
        >
          <X size={20} strokeWidth={2.5} />
        </button>

        <h2 className="font-heading text-2xl font-bold text-pencil mb-6">
          📎 Add Resource
        </h2>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.type}
                onClick={() => setActiveTab(tab.type)}
                className={`
                  flex items-center gap-2 px-4 py-2 border-2 border-pencil font-body text-base
                  transition-all duration-100
                  ${
                    activeTab === tab.type
                      ? "bg-postit shadow-hard-sm"
                      : "bg-card text-pencil/60 hover:bg-muted/30"
                  }
                `}
                style={{
                  borderRadius:
                    "120px 10px 120px 10px / 10px 120px 10px 120px",
                }}
              >
                <Icon size={16} strokeWidth={2.5} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-body text-base text-pencil/70 mb-1 block">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={
                activeTab === "pdf"
                  ? "e.g., React Documentation"
                  : activeTab === "youtube"
                  ? "e.g., Next.js Tutorial"
                  : "e.g., MDN Web Docs"
              }
              className="input-sketchy"
              required
            />
          </div>

          {activeTab !== "pdf" && (
            <div>
              <label className="font-body text-base text-pencil/70 mb-1 block">
                URL
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder={
                  activeTab === "youtube"
                    ? "https://youtube.com/watch?v=..."
                    : "https://example.com/docs"
                }
                className="input-sketchy"
              />
            </div>
          )}

          {activeTab === "pdf" && (
            <div
              className="border-2 border-dashed border-pencil/40 p-8 text-center bg-muted/20 cursor-pointer hover:bg-muted/40 transition-colors"
              style={{
                borderRadius:
                  "15px 225px 15px 255px / 255px 15px 225px 15px",
              }}
            >
              <Upload
                size={32}
                strokeWidth={2}
                className="mx-auto mb-2 text-pencil/40"
              />
              <p className="font-body text-pencil/50">
                Drag & drop or click to upload
              </p>
              <p className="font-body text-sm text-pencil/30 mt-1">
                PDF files up to 10MB
              </p>
            </div>
          )}

          <button type="submit" className="btn-sketchy w-full justify-center">
            <Upload size={18} strokeWidth={2.5} />
            Add Resource
          </button>
        </form>
      </div>
    </div>
  );
}
