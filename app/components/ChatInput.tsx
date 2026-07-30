"use client";

import React, { useState } from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSend, disabled = false }: ChatInputProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() && !disabled) {
      onSend(value.trim());
      setValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t-2 border-dashed border-pencil/30 p-4"
    >
      <div
        className="flex items-end gap-3 border-2 border-pencil bg-card p-3"
        style={{
          borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px",
          boxShadow: "3px 3px 0px 0px rgba(45, 45, 45, 0.08)",
        }}
      >
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about your documents..."
          disabled={disabled}
          rows={1}
          className="flex-1 bg-transparent font-body text-lg text-pencil placeholder:text-pencil/40 outline-none resize-none min-h-[44px] max-h-[120px]"
          style={{
            scrollbarWidth: "thin",
          }}
        />
        <button
          type="submit"
          disabled={disabled || !value.trim()}
          className="shrink-0 w-11 h-11 flex items-center justify-center border-2 border-pencil bg-accent text-white
            transition-all duration-100
            hover:bg-accent-blue
            disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            borderRadius: "60% 40% 50% 50% / 50% 60% 40% 50%",
            boxShadow: "3px 3px 0px 0px #2d2d2d",
          }}
        >
          <Send size={18} strokeWidth={2.5} />
        </button>
      </div>
      <p className="font-body text-sm text-pencil/40 mt-2 text-center">
        Press Enter to send · Shift+Enter for new line
      </p>
    </form>
  );
}
