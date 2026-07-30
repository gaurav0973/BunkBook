import React from "react";
import { Upload, MessageCircle, Sparkles } from "lucide-react";

const steps = [
  {
    icon: <Upload size={28} strokeWidth={2.5} />,
    title: "Upload",
    description: "Drop your PDFs, paste YouTube links, or add websites",
    emoji: "📄",
  },
  {
    icon: <MessageCircle size={28} strokeWidth={2.5} />,
    title: "Ask",
    description: "Chat naturally — ask anything about your materials",
    emoji: "💬",
  },
  {
    icon: <Sparkles size={28} strokeWidth={2.5} />,
    title: "Learn",
    description: "Get AI answers grounded in your actual content",
    emoji: "✨",
  },
];

export default function DemoSection() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-pencil text-center mb-4">
          How it works
        </h2>
        <p className="font-body text-xl text-pencil/60 text-center mb-16 max-w-xl mx-auto">
          Three simple steps to start learning smarter
        </p>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Squiggly connecting line */}
          <svg
            className="hidden md:block absolute top-16 left-0 w-full h-8 z-0"
            viewBox="0 0 800 30"
            preserveAspectRatio="none"
          >
            <path
              d="M130 15 Q200 0 270 15 Q340 30 410 15 Q480 0 540 15 Q610 30 680 15"
              stroke="#2d2d2d"
              strokeWidth="2"
              strokeDasharray="8 6"
              fill="none"
              opacity="0.3"
            />
          </svg>

          {steps.map((step, i) => (
            <div key={i} className="relative z-10 text-center">
              {/* Step number */}
              <div
                className="mx-auto w-14 h-14 flex items-center justify-center border-3 border-pencil bg-postit font-heading text-2xl font-bold text-pencil mb-6"
                style={{
                  borderRadius: "60% 40% 50% 50% / 50% 60% 40% 50%",
                  boxShadow: "4px 4px 0px 0px #2d2d2d",
                }}
              >
                {i + 1}
              </div>

              <div
                className="border-2 border-pencil bg-card p-6 transition-all duration-100 hover:-rotate-1"
                style={{
                  borderRadius:
                    i % 2 === 0
                      ? "255px 15px 225px 15px / 15px 225px 15px 255px"
                      : "15px 225px 15px 255px / 255px 15px 225px 15px",
                  boxShadow: "3px 3px 0px 0px rgba(45, 45, 45, 0.1)",
                }}
              >
                <div className="text-4xl mb-3">{step.emoji}</div>
                <h3 className="font-heading text-2xl font-bold text-pencil mb-2">
                  {step.title}
                </h3>
                <p className="font-body text-lg text-pencil/70">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
