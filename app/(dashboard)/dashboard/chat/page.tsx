"use client";

import React, { useState, useCallback } from "react";
import { MessageSquare, Plus } from "lucide-react";
import ChatMessages from "@/app/components/ChatMessages";
import ChatInput from "@/app/components/ChatInput";
import EmptyState from "@/app/components/EmptyState";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = useCallback(
    async (content: string) => {
      const userMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        content,
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [...messages, userMessage].map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
        });

        if (!response.ok) throw new Error("Failed to send message");

        const data = await response.json();

        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.message || data.content || "I couldn't process that. Try again!",
        };

        setMessages((prev) => [...prev, aiMessage]);
      } catch {
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content:
            "✏️ Oops! Something went wrong. Make sure the backend is running and try again.",
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    },
    [messages]
  );

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="border-b-2 border-dashed border-pencil/30 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 flex items-center justify-center border-2 border-pencil bg-postit"
            style={{
              borderRadius: "60% 40% 50% 50% / 50% 60% 40% 50%",
            }}
          >
            <MessageSquare size={18} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="font-heading text-xl font-bold text-pencil">Chat</h1>
            <p className="font-body text-sm text-pencil/50">
              Ask anything about your documents
            </p>
          </div>
        </div>
        <button
          className="btn-sketchy-secondary text-base px-4 py-2"
          onClick={() => setMessages([])}
        >
          <Plus size={16} strokeWidth={2.5} />
          New Chat
        </button>
      </div>

      {/* Messages or Empty State */}
      {messages.length === 0 ? (
        <EmptyState
          icon={
            <MessageSquare
              size={32}
              strokeWidth={2}
              className="text-pencil/30"
            />
          }
          title="Start a conversation"
          description="Upload some resources and ask questions about them. I'll help you learn!"
        />
      ) : (
        <ChatMessages messages={messages} />
      )}

      {/* Input */}
      <ChatInput onSend={handleSend} disabled={isLoading} />
    </div>
  );
}
