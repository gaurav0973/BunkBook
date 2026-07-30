import React from "react";
import {
  FileText,
  Video,
  Globe,
  FileCode,
  FileType,
  Type,
} from "lucide-react";

const resources = [
  {
    icon: <FileText size={28} strokeWidth={2.5} />,
    title: "PDF",
    description: "Upload and chat with PDF documents",
    rotation: -1,
    decoration: "tape" as const,
  },
  {
    icon: <Video size={28} strokeWidth={2.5} />,
    title: "YouTube",
    description: "Paste a video link and learn from it",
    rotation: 1,
    decoration: "tack" as const,
  },
  {
    icon: <Globe size={28} strokeWidth={2.5} />,
    title: "Website",
    description: "Scrape and index any web page",
    rotation: -0.5,
    decoration: "none" as const,
  },
  {
    icon: <FileCode size={28} strokeWidth={2.5} />,
    title: "DOCX",
    description: "Word documents, imported and indexed",
    rotation: 1.5,
    decoration: "tape" as const,
  },
  {
    icon: <FileType size={28} strokeWidth={2.5} />,
    title: "Markdown",
    description: "Your .md notes and documentation",
    rotation: -1,
    decoration: "none" as const,
  },
  {
    icon: <Type size={28} strokeWidth={2.5} />,
    title: "Text",
    description: "Plain text files and snippets",
    rotation: 0.5,
    decoration: "tack" as const,
  },
];

export default function SupportedResourcesSection() {
  return (
    <section className="py-20 px-6 relative">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span
            className="inline-block bg-postit border-2 border-pencil px-4 py-1 font-heading text-lg font-bold text-pencil mb-4"
            style={{
              borderRadius: "120px 10px 120px 10px / 10px 120px 10px 120px",
              transform: "rotate(-2deg)",
              boxShadow: "3px 3px 0px 0px rgba(45, 45, 45, 0.15)",
            }}
          >
            📚 Knowledge Sources
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-pencil mt-4">
            Feed it anything
          </h2>
          <p className="font-body text-xl text-pencil/60 mt-4 max-w-xl mx-auto">
            Upload your learning materials and let AI do the heavy lifting
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {resources.map((resource, i) => (
            <div
              key={i}
              className={`
                relative border-2 border-pencil p-6 bg-card
                transition-all duration-100 hover:rotate-1
                ${resource.decoration === "tape" ? "tape pt-8" : ""}
                ${resource.decoration === "tack" ? "tack pt-8" : ""}
              `}
              style={{
                borderRadius:
                  i % 2 === 0
                    ? "255px 15px 225px 15px / 15px 225px 15px 255px"
                    : "15px 225px 15px 255px / 255px 15px 225px 15px",
                boxShadow: "3px 3px 0px 0px rgba(45, 45, 45, 0.1)",
                transform: `rotate(${resource.rotation}deg)`,
              }}
            >
              <div
                className="w-12 h-12 flex items-center justify-center border-2 border-pencil bg-postit mb-4"
                style={{
                  borderRadius: "50% 60% 40% 50% / 60% 40% 50% 50%",
                }}
              >
                {resource.icon}
              </div>
              <h3 className="font-heading text-xl font-bold text-pencil mb-1">
                {resource.title}
              </h3>
              <p className="font-body text-base text-pencil/60">
                {resource.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
