"use client";

import React, { useRef, useEffect, useState } from "react";
import { Download, Maximize2, Sparkles, X, Palette, Copy, Check } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface ChatMessagesProps {
  messages: Message[];
}

export default function ChatMessages({ messages }: ChatMessagesProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<{ url: string; alt: string } | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownloadImage = async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename || "generated-image.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch {
      window.open(url, "_blank");
    }
  };

  // Helper to parse content and render markdown text + inline sketchy image cards
  const renderFormattedContent = (content: string, msgId: string) => {
    // Check if the message indicates an image is currently being generated via tool call
    const isGeneratingImage = content.includes("[Using tool: generate_image");

    // Regex for markdown images: ![alt](url) OR raw /api/images/ or /generated-images/ paths
    const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)|((?:\/api\/images\/|\/generated-images\/|\/public\/generated-images\/|public\/generated-images\/)[a-zA-Z0-9\-_.]+\.(?:png|jpg|jpeg|webp))/g;

    const elements: React.ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = imageRegex.exec(content)) !== null) {
      const textBefore = content.substring(lastIndex, match.index);
      if (textBefore) {
        elements.push(
          <p key={`text-${lastIndex}`} className="whitespace-pre-wrap leading-relaxed">
            {textBefore}
          </p>
        );
      }

      const altText = match[1] || "AI Generated Image";
      let rawUrl = (match[2] || match[3] || "").trim();

      // Normalize URL to /api/images/[filename] for guaranteed Next.js API rendering
      let imageUrl = rawUrl;
      const filenameMatch = rawUrl.match(/([a-zA-Z0-9\-_.]+\.(?:png|jpg|jpeg|webp))$/);
      if (filenameMatch) {
        imageUrl = `/api/images/${filenameMatch[1]}`;
      }

      elements.push(
        <div key={`img-${match.index}`} className="my-4 my-2">
          {/* Sketchy Polaroid Image Frame */}
          <div
            className="group relative bg-card border-3 border-pencil p-3 shadow-hard transition-all duration-200 hover:-translate-y-1 hover:shadow-hard-lg"
            style={{
              borderRadius: "15px 225px 15px 255px / 255px 15px 225px 15px",
            }}
          >
            {/* Decorative Tape */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-pencil/10 border border-pencil/20 rotate-[-1deg] z-10 pointer-events-none" />

            {/* Badge Header */}
            <div className="flex items-center justify-between mb-2.5 px-1 pt-1 border-b-2 border-dashed border-pencil/20 pb-2">
              <div className="flex items-center gap-1.5 text-accent font-heading font-bold text-sm">
                <Sparkles size={16} className="animate-spin-slow" />
                <span>AI Generated Artwork</span>
              </div>
              <span className="text-xs font-body text-pencil/50 bg-paper px-2 py-0.5 border border-pencil/30 rounded-full">
                bunkbook-ai
              </span>
            </div>

            {/* Image Container */}
            <div className="relative overflow-hidden border-2 border-pencil rounded-md bg-paper flex items-center justify-center min-h-[220px]">
              <img
                src={imageUrl}
                alt={altText}
                className="w-full h-auto max-h-[480px] object-contain transition-transform duration-300 group-hover:scale-[1.02] cursor-pointer"
                onClick={() => setLightbox({ url: imageUrl, alt: altText })}
              />

              {/* Hover Quick Overlay */}
              <div className="absolute inset-0 bg-pencil/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]">
                <button
                  onClick={() => setLightbox({ url: imageUrl, alt: altText })}
                  className="bg-card text-pencil border-2 border-pencil p-2.5 rounded-full shadow-hard-hover hover:bg-postit transition-transform hover:scale-110"
                  title="Expand Full View"
                >
                  <Maximize2 size={18} />
                </button>
                <button
                  onClick={() => handleDownloadImage(imageUrl, `${altText.toLowerCase().replace(/\s+/g, "-")}.png`)}
                  className="bg-accent text-white border-2 border-pencil p-2.5 rounded-full shadow-hard-hover hover:bg-accent-blue transition-transform hover:scale-110"
                  title="Download Image"
                >
                  <Download size={18} />
                </button>
              </div>
            </div>

            {/* Caption & Actions Footer */}
            <div className="mt-3 flex items-center justify-between gap-3 px-1">
              <p className="font-body text-base text-pencil font-bold line-clamp-2 italic">
                "{altText}"
              </p>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleDownloadImage(imageUrl, `${altText.toLowerCase().replace(/\s+/g, "-")}.png`)}
                  className="btn-sketchy-secondary text-xs px-3 py-1.5 h-8 min-h-0 flex items-center gap-1.5 font-bold"
                >
                  <Download size={14} />
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      );

      lastIndex = match.index + match[0].length;
    }

    // Remaining text after last image match
    const textAfter = content.substring(lastIndex);
    if (textAfter) {
      elements.push(
        <p key={`text-${lastIndex}`} className="whitespace-pre-wrap leading-relaxed">
          {textAfter}
        </p>
      );
    }

    // Render skeleton/loader if tool is currently running generate_image
    if (isGeneratingImage && !content.includes("![")) {
      elements.push(
        <div
          key="generating-loader"
          className="my-3 p-4 bg-postit/60 border-2 border-dashed border-pencil/50 rounded-lg flex items-center gap-3 animate-pulse"
        >
          <div className="w-10 h-10 border-2 border-pencil bg-accent text-white rounded-full flex items-center justify-center animate-bounce-gentle">
            <Palette size={20} />
          </div>
          <div>
            <p className="font-heading font-bold text-pencil text-base">
              🎨 Painting your image...
            </p>
            <p className="font-body text-xs text-pencil/70">
              Generating high-quality artwork with DALL-E/GPT Image model
            </p>
          </div>
        </div>
      );
    }

    return elements.length > 0 ? elements : <p className="whitespace-pre-wrap">{content}</p>;
  };

  if (messages.length === 0) {
    return null;
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex items-start gap-3 ${message.role === "user" ? "flex-row-reverse" : ""
            }`}
        >
          {/* Avatar */}
          <div
            className={`
              w-9 h-9 shrink-0 flex items-center justify-center border-2 border-pencil
              font-heading text-xs font-bold shadow-hard-sm
              ${message.role === "user"
                ? "bg-accent-blue text-white"
                : "bg-accent text-white"
              }
            `}
            style={{
              borderRadius:
                message.role === "user"
                  ? "50% 60% 40% 50% / 60% 40% 50% 50%"
                  : "60% 40% 50% 50% / 50% 60% 40% 50%",
            }}
          >
            {message.role === "user" ? "You" : "AI"}
          </div>

          {/* Message bubble */}
          <div
            className={`
              relative group max-w-[85%] sm:max-w-[75%] border-2 border-pencil p-4
              ${message.role === "user"
                ? "bg-card text-pencil"
                : "bg-postit text-pencil"
              }
            `}
            style={{
              borderRadius:
                message.role === "user"
                  ? "255px 15px 225px 15px / 15px 225px 15px 255px"
                  : "15px 225px 15px 255px / 255px 15px 225px 15px",
              boxShadow: "4px 4px 0px 0px rgba(45, 45, 45, 0.12)",
            }}
          >
            {/* Copy button */}
            <button
              onClick={() => handleCopyText(message.content, message.id)}
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-paper/80 border border-pencil/30 rounded text-pencil hover:bg-paper"
              title="Copy message"
            >
              {copiedId === message.id ? (
                <Check size={14} className="text-green-600" />
              ) : (
                <Copy size={14} />
              )}
            </button>

            <div className="font-body text-lg text-pencil space-y-2">
              {renderFormattedContent(message.content, message.id)}
            </div>
          </div>
        </div>
      ))}

      {/* Lightbox Modal for Image Zoom */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-pencil/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative bg-paper border-4 border-pencil p-4 max-w-4xl max-h-[90vh] flex flex-col items-center shadow-hard-lg overflow-hidden"
            style={{
              borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="w-full flex items-center justify-between pb-3 border-b-2 border-pencil mb-3">
              <div className="flex items-center gap-2 font-heading text-lg font-bold text-pencil">
                <Sparkles size={20} className="text-accent" />
                <span>{lightbox.alt || "Generated Image"}</span>
              </div>
              <button
                onClick={() => setLightbox(null)}
                className="p-1.5 border-2 border-pencil bg-card rounded-full hover:bg-accent hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Image View */}
            <div className="overflow-auto max-h-[70vh] flex items-center justify-center rounded-lg border-2 border-pencil bg-card p-2">
              <img
                src={lightbox.url}
                alt={lightbox.alt}
                className="max-w-full max-h-[65vh] object-contain rounded"
              />
            </div>

            {/* Modal Footer */}
            <div className="w-full flex items-center justify-between pt-3 mt-3 border-t-2 border-dashed border-pencil/30">
              <p className="font-body text-sm text-pencil/70 truncate max-w-[60%]">
                {lightbox.alt}
              </p>
              <button
                onClick={() => handleDownloadImage(lightbox.url, `${lightbox.alt.toLowerCase().replace(/\s+/g, "-")}.png`)}
                className="btn-sketchy text-sm px-4 py-2 flex items-center gap-2"
              >
                <Download size={16} />
                Download High-Res
              </button>
            </div>
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}

