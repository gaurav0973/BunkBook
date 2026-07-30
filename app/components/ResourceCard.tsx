"use client";

import React from "react";
import { Trash2, FileText, Video, Globe } from "lucide-react";

interface Resource {
  id: string;
  title: string;
  type: "pdf" | "youtube" | "website";
  uploadedAt: string;
}

interface ResourceCardProps {
  resource: Resource;
  onDelete: (id: string) => void;
}

const typeConfig = {
  pdf: {
    icon: FileText,
    label: "PDF",
    color: "bg-accent",
  },
  youtube: {
    icon: Video,
    label: "YouTube",
    color: "bg-accent-blue",
  },
  website: {
    icon: Globe,
    label: "Website",
    color: "bg-pencil",
  },
};

export default function ResourceCard({ resource, onDelete }: ResourceCardProps) {
  const config = typeConfig[resource.type];
  const Icon = config.icon;

  return (
    <div
      className="relative border-2 border-pencil bg-card p-5 transition-all duration-100 hover:rotate-1 group"
      style={{
        borderRadius: "15px 225px 15px 255px / 255px 15px 225px 15px",
        boxShadow: "3px 3px 0px 0px rgba(45, 45, 45, 0.1)",
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          {/* Type badge */}
          <div
            className={`shrink-0 w-10 h-10 flex items-center justify-center border-2 border-pencil ${config.color} text-white`}
            style={{
              borderRadius: "60% 40% 50% 50% / 50% 60% 40% 50%",
            }}
          >
            <Icon size={18} strokeWidth={2.5} />
          </div>

          <div className="min-w-0">
            <h3 className="font-heading text-lg font-bold text-pencil truncate">
              {resource.title}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span
                className="inline-block px-2 py-0.5 border border-pencil/30 font-body text-xs text-pencil/60"
                style={{
                  borderRadius: "120px 10px 120px 10px / 10px 120px 10px 120px",
                }}
              >
                {config.label}
              </span>
              <span className="font-body text-xs text-pencil/40">
                {new Date(resource.uploadedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Delete button */}
        <button
          onClick={() => onDelete(resource.id)}
          className="shrink-0 p-2 text-pencil/30 hover:text-accent hover:bg-accent/10 transition-all opacity-0 group-hover:opacity-100"
          style={{ borderRadius: "50%" }}
          title="Delete resource"
        >
          <Trash2 size={16} strokeWidth={2.5} />
        </button>
      </div>

      {/* Status indicator */}
      <div className="mt-3 flex items-center gap-2">
        <div className="w-2 h-2 bg-green-500 rounded-full" />
        <span className="font-body text-sm text-pencil/50">Indexed</span>
      </div>
    </div>
  );
}
