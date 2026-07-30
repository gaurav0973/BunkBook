import React from "react";
import {
  Workflow,
  Wrench,
  Brain,
  FileText,
  Video,
  Globe,
  FileCode,
  FileType,
  Type,
  MessageSquare,
  Search,
  Target,
  Layers,
  Server,
  Shield,
  Database,
  Cpu,
  Zap,
} from "lucide-react";
import FeatureCard from "@/app/components/FeatureCard";

const sections = [
  {
    badge: "🤖 AI Agent",
    badgeColor: "bg-accent",
    title: "Intelligent reasoning",
    description: "A multi-step agent that thinks before it answers",
    features: [
      {
        icon: <Workflow size={24} strokeWidth={2.5} />,
        title: "LangGraph",
        description: "Stateful graph-based agent orchestration for complex workflows",
      },
      {
        icon: <Wrench size={24} strokeWidth={2.5} />,
        title: "Tool Calling",
        description: "AI selects and uses the right tools for each question automatically",
      },
      {
        icon: <Brain size={24} strokeWidth={2.5} />,
        title: "Multi-step Reasoning",
        description: "Breaks down complex queries into manageable steps for better answers",
      },
    ],
  },
  {
    badge: "📚 Knowledge Sources",
    badgeColor: "bg-postit text-pencil",
    title: "Feed it anything",
    description: "Import from any format you learn with",
    features: [
      {
        icon: <FileText size={24} strokeWidth={2.5} />,
        title: "PDF",
        description: "Upload and parse PDF documents with full text extraction",
      },
      {
        icon: <Video size={24} strokeWidth={2.5} />,
        title: "YouTube",
        description: "Auto-transcribe videos and chat with the content",
      },
      {
        icon: <Globe size={24} strokeWidth={2.5} />,
        title: "Websites",
        description: "Scrape, index, and query any public web page",
      },
      {
        icon: <FileCode size={24} strokeWidth={2.5} />,
        title: "Markdown",
        description: "Your .md files, perfectly parsed and indexed",
      },
      {
        icon: <FileType size={24} strokeWidth={2.5} />,
        title: "DOCX",
        description: "Microsoft Word documents, fully supported",
      },
      {
        icon: <Type size={24} strokeWidth={2.5} />,
        title: "TXT",
        description: "Plain text files and quick notes",
      },
    ],
  },
  {
    badge: "⚡ AI Features",
    badgeColor: "bg-accent-blue text-white",
    title: "Not just another chatbot",
    description: "Purpose-built for understanding your study materials",
    features: [
      {
        icon: <MessageSquare size={24} strokeWidth={2.5} />,
        title: "Chat with Documents",
        description: "Natural, conversational interface to explore your knowledge base",
      },
      {
        icon: <Search size={24} strokeWidth={2.5} />,
        title: "Semantic Search",
        description: "Finds meaning and context, not just keyword matches",
      },
      {
        icon: <Target size={24} strokeWidth={2.5} />,
        title: "Grounded Answers",
        description: "Every answer is backed by your actual uploaded content",
      },
      {
        icon: <Layers size={24} strokeWidth={2.5} />,
        title: "Context Awareness",
        description: "Maintains conversation context across multiple questions",
      },
    ],
  },
  {
    badge: "🛠️ Tech Stack",
    badgeColor: "bg-pencil text-white",
    title: "Built with the best",
    description: "Modern, production-grade technologies under the hood",
    features: [
      {
        icon: <Server size={24} strokeWidth={2.5} />,
        title: "Next.js",
        description: "Full-stack React framework with App Router and Server Components",
      },
      {
        icon: <Workflow size={24} strokeWidth={2.5} />,
        title: "LangGraph",
        description: "State machine-based agent framework for reliable AI workflows",
      },
      {
        icon: <Zap size={24} strokeWidth={2.5} />,
        title: "LangChain",
        description: "Composable building blocks for LLM applications",
      },
      {
        icon: <Cpu size={24} strokeWidth={2.5} />,
        title: "OpenAI",
        description: "GPT models for natural language understanding and generation",
      },
      {
        icon: <Database size={24} strokeWidth={2.5} />,
        title: "Qdrant",
        description: "High-performance vector database for semantic search",
      },
      {
        icon: <Shield size={24} strokeWidth={2.5} />,
        title: "Clerk",
        description: "Enterprise-grade authentication and user management",
      },
    ],
  },
];

export default function FeaturesPage() {
  return (
    <div className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Page header */}
        <div className="text-center mb-20">
          <h1 className="font-heading text-5xl md:text-6xl font-bold text-pencil mb-4">
            Everything BunkBook{" "}
            <span
              className="inline-block bg-accent text-white px-3 py-1 border-2 border-pencil"
              style={{
                borderRadius: "120px 10px 120px 10px / 10px 120px 10px 120px",
                transform: "rotate(-1deg)",
              }}
            >
              can do
            </span>
          </h1>
          <p className="font-body text-xl md:text-2xl text-pencil/60 max-w-2xl mx-auto">
            A deep dive into all the features that make learning smarter, faster,
            and way more fun
          </p>
        </div>

        {/* Feature sections */}
        <div className="space-y-24">
          {sections.map((section, si) => (
            <section key={si}>
              {/* Section header */}
              <div className="mb-12">
                <span
                  className={`inline-block border-2 border-pencil px-4 py-1 font-heading text-lg font-bold mb-4 ${section.badgeColor}`}
                  style={{
                    borderRadius:
                      "120px 10px 120px 10px / 10px 120px 10px 120px",
                    transform: `rotate(${si % 2 === 0 ? -1 : 1}deg)`,
                    boxShadow: "3px 3px 0px 0px rgba(45, 45, 45, 0.15)",
                  }}
                >
                  {section.badge}
                </span>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-pencil">
                  {section.title}
                </h2>
                <p className="font-body text-xl text-pencil/60 mt-2">
                  {section.description}
                </p>
              </div>

              {/* Feature cards grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {section.features.map((feature, fi) => (
                  <FeatureCard
                    key={fi}
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                    decoration={
                      fi % 3 === 0 ? "tape" : fi % 3 === 1 ? "tack" : "none"
                    }
                    rotate={fi % 3 === 0 ? -0.5 : fi % 3 === 1 ? 0.5 : 0}
                  />
                ))}
              </div>

              {/* Dashed divider */}
              {si < sections.length - 1 && (
                <div className="max-w-xl mx-auto border-t-2 border-dashed border-pencil/15 mt-16" />
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
