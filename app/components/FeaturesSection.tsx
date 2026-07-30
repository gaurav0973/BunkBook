import React from "react";
import {
  MessageSquare,
  Search,
  Brain,
  Wrench,
  Workflow,
} from "lucide-react";
import FeatureCard from "./FeatureCard";

const features = [
  {
    icon: <MessageSquare size={24} strokeWidth={2.5} />,
    title: "AI Chat",
    description:
      "Natural conversations about your documents with context-aware responses",
    decoration: "tape" as const,
  },
  {
    icon: <Search size={24} strokeWidth={2.5} />,
    title: "RAG Search",
    description:
      "Retrieval Augmented Generation for grounded, accurate answers",
    decoration: "tack" as const,
  },
  {
    icon: <Brain size={24} strokeWidth={2.5} />,
    title: "Semantic Search",
    description:
      "Find meaning, not just keywords — understands what you're really asking",
    decoration: "none" as const,
  },
  {
    icon: <Wrench size={24} strokeWidth={2.5} />,
    title: "Tool Calling",
    description:
      "AI uses specialized tools to retrieve, search, and analyze your content",
    decoration: "tape" as const,
  },
  {
    icon: <Workflow size={24} strokeWidth={2.5} />,
    title: "LangGraph Agent",
    description:
      "Multi-step reasoning agent that plans and executes complex queries",
    decoration: "none" as const,
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-20 px-6 relative">
      {/* Dashed background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-10 right-10 w-32 h-32 border-2 border-dashed border-pencil/10"
          style={{
            borderRadius: "60% 40% 50% 50% / 50% 60% 40% 50%",
            transform: "rotate(15deg)",
          }}
        />
        <div
          className="absolute bottom-20 left-10 w-24 h-24 border-2 border-dashed border-pencil/10"
          style={{
            borderRadius: "40% 60% 50% 50% / 50% 40% 60% 50%",
            transform: "rotate(-10deg)",
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span
            className="inline-block bg-accent text-white border-2 border-pencil px-4 py-1 font-heading text-lg font-bold mb-4"
            style={{
              borderRadius: "120px 10px 120px 10px / 10px 120px 10px 120px",
              transform: "rotate(1deg)",
              boxShadow: "3px 3px 0px 0px rgba(45, 45, 45, 0.3)",
            }}
          >
            ⚡ Superpowers
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-pencil mt-4">
            Built for real learning
          </h2>
          <p className="font-body text-xl text-pencil/60 mt-4 max-w-xl mx-auto">
            Not just another chatbot — a full AI study companion
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <FeatureCard
              key={i}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              decoration={feature.decoration}
              rotate={i % 3 === 0 ? -1 : i % 3 === 1 ? 0.5 : -0.5}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
