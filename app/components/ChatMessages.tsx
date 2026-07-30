"use client";

import React, { useRef, useEffect } from "react";

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

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (messages.length === 0) {
    return null;
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex items-start gap-3 ${
            message.role === "user" ? "flex-row-reverse" : ""
          }`}
        >
          {/* Avatar */}
          <div
            className={`
              w-9 h-9 shrink-0 flex items-center justify-center border-2 border-pencil
              font-heading text-xs font-bold
              ${
                message.role === "user"
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
              max-w-[75%] border-2 border-pencil p-4
              ${
                message.role === "user"
                  ? "bg-card"
                  : "bg-postit"
              }
            `}
            style={{
              borderRadius:
                message.role === "user"
                  ? "255px 15px 225px 15px / 15px 225px 15px 255px"
                  : "15px 225px 15px 255px / 255px 15px 225px 15px",
              boxShadow: "3px 3px 0px 0px rgba(45, 45, 45, 0.08)",
            }}
          >
            <p className="font-body text-lg text-pencil whitespace-pre-wrap">
              {message.content}
            </p>
          </div>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
