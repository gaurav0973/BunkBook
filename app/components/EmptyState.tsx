import React from "react";
import { BookOpen } from "lucide-react";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export default function EmptyState({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="text-center max-w-sm">
        {/* Sketch illustration */}
        <div
          className="mx-auto w-20 h-20 flex items-center justify-center border-2 border-dashed border-pencil/30 mb-6 animate-float"
          style={{
            borderRadius: "60% 40% 50% 50% / 50% 60% 40% 50%",
          }}
        >
          {icon || (
            <BookOpen size={32} strokeWidth={2} className="text-pencil/30" />
          )}
        </div>

        <h3 className="font-heading text-2xl font-bold text-pencil mb-2">
          {title}
        </h3>
        <p className="font-body text-lg text-pencil/50 mb-6">{description}</p>
        {action}
      </div>
    </div>
  );
}
