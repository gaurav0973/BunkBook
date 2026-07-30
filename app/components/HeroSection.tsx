import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="py-20 px-6 relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="relative z-10">
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-pencil leading-tight mb-6">
              Bunk{" "}
              <span
                className="inline-block bg-accent text-white px-3 py-1 border-2 border-pencil"
                style={{
                  borderRadius: "120px 10px 120px 10px / 10px 120px 10px 120px",
                  transform: "rotate(-2deg)",
                }}
              >
                lectures
              </span>
              <br />
              Don&apos;t bunk{" "}
              <span className="relative inline-block">
                learning
                <span
                  className="absolute -bottom-1 left-0 w-full h-2 bg-accent-blue/30"
                  style={{ transform: "rotate(-1deg)" }}
                />
              </span>
              <span
                className="inline-block text-accent ml-1 animate-bounce-gentle"
                style={{ transform: "rotate(12deg)", transformOrigin: "bottom" }}
              >
                !
              </span>
            </h1>

            <p className="font-body text-xl md:text-2xl text-pencil/70 mb-8 max-w-md">
              Chat with your PDFs, YouTube videos, websites, and notes — powered
              by AI that actually understands your stuff.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <Link href="/dashboard/chat">
                <button className="btn-sketchy text-lg md:text-2xl">
                  Get Started <ArrowRight size={20} strokeWidth={2.5} />
                </button>
              </Link>
              <Link href="/features">
                <button className="btn-sketchy-secondary text-lg md:text-2xl">
                  See Features
                </button>
              </Link>
            </div>

            {/* Hand-drawn arrow pointing to CTA */}
            <svg
              className="hidden md:block absolute -bottom-4 left-48 w-24 h-20 text-pencil"
              viewBox="0 0 100 80"
              fill="none"
            >
              <path
                d="M10 60 Q30 10 70 30 Q90 40 85 55"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="6 4"
                fill="none"
              />
              <path
                d="M80 48 L88 56 L76 56"
                stroke="currentColor"
                strokeWidth="2"
                fill="currentColor"
              />
            </svg>
          </div>

          {/* Hero "Sketch" Illustration */}
          <div className="relative">
            <div
              className="relative border-3 border-pencil bg-card p-8 md:p-10"
              style={{
                borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px",
                boxShadow: "8px 8px 0px 0px #2d2d2d",
                transform: "rotate(1deg)",
              }}
            >
              {/* Corner frame marks */}
              <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-pencil" />
              <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-pencil" />
              <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-pencil" />
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-pencil" />

              {/* Fake chat mockup */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div
                    className="w-8 h-8 bg-accent-blue border-2 border-pencil shrink-0"
                    style={{ borderRadius: "50% 60% 40% 50%" }}
                  />
                  <div
                    className="bg-muted border-2 border-pencil p-3 max-w-xs"
                    style={{
                      borderRadius: "15px 225px 15px 255px / 255px 15px 225px 15px",
                    }}
                  >
                    <p className="font-body text-sm text-pencil">
                      📄 Uploaded: React Docs.pdf
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div
                    className="w-8 h-8 bg-postit border-2 border-pencil shrink-0"
                    style={{ borderRadius: "40% 50% 60% 50%" }}
                  />
                  <div
                    className="bg-card border-2 border-pencil p-3 max-w-xs"
                    style={{
                      borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px",
                    }}
                  >
                    <p className="font-body text-sm text-pencil">
                      What is useEffect?
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div
                    className="w-8 h-8 bg-accent border-2 border-pencil shrink-0 text-white flex items-center justify-center font-heading text-xs font-bold"
                    style={{ borderRadius: "60% 40% 50% 50%" }}
                  >
                    AI
                  </div>
                  <div
                    className="bg-postit border-2 border-pencil p-3 max-w-xs"
                    style={{
                      borderRadius: "15px 225px 15px 255px / 255px 15px 225px 15px",
                    }}
                  >
                    <p className="font-body text-sm text-pencil">
                      useEffect is a React Hook that lets you synchronize a
                      component with an external system... ✨
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bouncing decorative circle */}
            <div
              className="hidden md:block absolute -top-6 -right-6 w-16 h-16 border-2 border-dashed border-accent animate-bounce-gentle"
              style={{
                borderRadius: "60% 40% 50% 50% / 50% 60% 40% 50%",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
