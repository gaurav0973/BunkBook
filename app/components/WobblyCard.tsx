"use client";

import React from "react";

type Decoration = "tape" | "tack" | "none";

interface WobblyCardProps {
  children: React.ReactNode;
  decoration?: Decoration;
  className?: string;
  variant?: "default" | "postit" | "speech";
  rotate?: number;
  hoverRotate?: boolean;
  onClick?: () => void;
}

export default function WobblyCard({
  children,
  decoration = "none",
  className = "",
  variant = "default",
  rotate = 0,
  hoverRotate = true,
  onClick,
}: WobblyCardProps) {
  const bgMap = {
    default: "bg-card",
    postit: "bg-postit",
    speech: "bg-card",
  };

  const rotateStyle = rotate !== 0 ? `rotate(${rotate}deg)` : undefined;

  return (
    <div
      className={`
        relative border-2 border-pencil p-6
        transition-all duration-100
        ${hoverRotate ? "hover:rotate-1" : ""}
        ${bgMap[variant]}
        ${decoration === "tape" ? "tape pt-8" : ""}
        ${decoration === "tack" ? "tack pt-8" : ""}
        ${onClick ? "cursor-pointer" : ""}
        ${className}
      `}
      style={{
        borderRadius: "15px 225px 15px 255px / 255px 15px 225px 15px",
        boxShadow: "3px 3px 0px 0px rgba(45, 45, 45, 0.1)",
        transform: rotateStyle,
      }}
      onClick={onClick}
    >
      {/* Speech bubble tail */}
      {variant === "speech" && (
        <div
          className="absolute -bottom-4 left-8"
          style={{
            width: 0,
            height: 0,
            borderLeft: "12px solid transparent",
            borderRight: "12px solid transparent",
            borderTop: "16px solid var(--fg-pencil)",
          }}
        >
          <div
            className="absolute"
            style={{
              top: "-18px",
              left: "-10px",
              width: 0,
              height: 0,
              borderLeft: "10px solid transparent",
              borderRight: "10px solid transparent",
              borderTop: "14px solid var(--card-white)",
            }}
          />
        </div>
      )}
      {children}
    </div>
  );
}
