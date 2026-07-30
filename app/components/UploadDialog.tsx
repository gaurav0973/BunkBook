"use client";

import React, { useState, useRef } from "react";
import { X, FileText, Video, Globe, Upload, CheckCircle2 } from "lucide-react";

export interface UploadPayload {
  title: string;
  type: "pdf" | "youtube" | "website";
  url?: string;
  file?: File | null;
}

interface UploadDialogProps {
  open: boolean;
  onClose: () => void;
  onUpload: (payload: UploadPayload) => Promise<void> | void;
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
  const [activeTab, setActiveTab] = useState<"pdf" | "youtube" | "website">("pdf");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!open) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      if (!title) {
        // Auto-fill title from filename
        setTitle(selectedFile.name.replace(/\.[^/.]+$/, ""));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (activeTab === "pdf" && !file) {
      alert("Please select a PDF file to upload.");
      return;
    }

    if (activeTab !== "pdf" && !url.trim()) {
      alert("Please enter a valid URL.");
      return;
    }

    setIsSubmitting(true);
    try {
      await onUpload({
        title: title.trim(),
        type: activeTab,
        url: url.trim(),
        file: file,
      });

      // Reset form
      setTitle("");
      setUrl("");
      setFile(null);
      onClose();
    } catch (err: any) {
      alert(`Indexing failed: ${err?.message || "Unknown error"}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-pencil/30 backdrop-blur-sm"
        onClick={() => !isSubmitting && onClose()}
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
          disabled={isSubmitting}
          className="absolute top-4 right-4 p-2 text-pencil/60 hover:text-pencil hover:bg-muted/30 transition-colors disabled:opacity-30"
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
                type="button"
                onClick={() => {
                  setActiveTab(tab.type);
                  setFile(null);
                }}
                disabled={isSubmitting}
                className={`
                  flex items-center gap-2 px-4 py-2 border-2 border-pencil font-body text-base
                  transition-all duration-100 disabled:opacity-50
                  ${
                    activeTab === tab.type
                      ? "bg-postit shadow-hard-sm"
                      : "bg-card text-pencil/60 hover:bg-muted/30"
                  }
                `}
                style={{
                  borderRadius: "120px 10px 120px 10px / 10px 120px 10px 120px",
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
              Title / Resource Name
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
              disabled={isSubmitting}
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
                required
                disabled={isSubmitting}
              />
            </div>
          )}

          {activeTab === "pdf" && (
            <div>
              <input
                type="file"
                ref={fileInputRef}
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
              />
              <div
                onClick={() => fileInputRef.current?.click()}
                className={`
                  border-2 border-dashed p-6 text-center bg-card cursor-pointer
                  transition-all duration-100 hover:bg-postit/30
                  ${file ? "border-accent bg-postit/20" : "border-pencil/40"}
                `}
                style={{
                  borderRadius: "15px 225px 15px 255px / 255px 15px 225px 15px",
                }}
              >
                {file ? (
                  <div className="flex items-center justify-center gap-2 text-pencil">
                    <CheckCircle2 size={24} className="text-accent shrink-0" />
                    <div className="text-left truncate">
                      <p className="font-heading text-base font-bold truncate">
                        {file.name}
                      </p>
                      <p className="font-body text-xs text-pencil/50">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <Upload
                      size={32}
                      strokeWidth={2}
                      className="mx-auto mb-2 text-pencil/40"
                    />
                    <p className="font-body text-pencil">
                      Click to choose a PDF file
                    </p>
                    <p className="font-body text-sm text-pencil/40 mt-1">
                      PDF files up to 10MB
                    </p>
                  </>
                )}
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-sketchy w-full justify-center disabled:opacity-50"
          >
            <Upload size={18} strokeWidth={2.5} />
            {isSubmitting ? "Indexing into Qdrant..." : "Upload & Index Resource"}
          </button>
        </form>
      </div>
    </div>
  );
}
