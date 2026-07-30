"use client";

import React from "react";
import { BookOpen } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  decoration?: "tape" | "tack" | "none";
  rotate?: number;
}

export default function FeatureCard({
  icon,
  title,
  description,
  decoration = "none",
  rotate = 0,
}: FeatureCardProps) {
  return (
    <div
      className={`
        relative border-2 border-pencil p-6 bg-card
        transition-all duration-100
        hover:-rotate-1 hover:shadow-hard
        ${decoration === "tape" ? "tape pt-8" : ""}
        ${decoration === "tack" ? "tack pt-8" : ""}
      `}
      style={{
        borderRadius: "15px 225px 15px 255px / 255px 15px 225px 15px",
        boxShadow: "3px 3px 0px 0px rgba(45, 45, 45, 0.1)",
        transform: rotate !== 0 ? `rotate(${rotate}deg)` : undefined,
      }}
    >
      {/* Icon in rough circle */}
      <div
        className="w-14 h-14 flex items-center justify-center border-2 border-pencil bg-postit mb-4"
        style={{
          borderRadius: "60% 40% 50% 50% / 50% 60% 40% 50%",
        }}
      >
        {icon}
      </div>

      <h3 className="font-heading text-xl font-bold text-pencil mb-2">
        {title}
      </h3>
      <p className="font-body text-lg text-pencil/70">{description}</p>
    </div>
  );
}
