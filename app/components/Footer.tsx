import React from "react";
import { Code2, Share2, BookOpen } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t-2 border-dashed border-pencil mt-auto">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-8 h-8 flex items-center justify-center border-2 border-pencil bg-postit"
                style={{
                  borderRadius: "60% 40% 50% 50% / 50% 60% 40% 50%",
                }}
              >
                <BookOpen size={16} strokeWidth={2.5} />
              </div>
              <span className="font-heading text-xl font-bold text-pencil">
                BunkBook
              </span>
            </div>
            <p className="font-body text-lg text-pencil/60">
              Bunk lectures. Don&apos;t bunk learning.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-heading text-lg font-bold text-pencil mb-4 wavy-underline inline-block">
              Links
            </h4>
            <ul className="space-y-2 mt-6">
              <li>
                <a
                  href="#"
                  className="font-body text-lg text-pencil/70 hover:text-pencil hover:line-through transition-colors"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="font-body text-lg text-pencil/70 hover:text-pencil hover:line-through transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="font-body text-lg text-pencil/70 hover:text-pencil hover:line-through transition-colors"
                >
                  About
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-heading text-lg font-bold text-pencil mb-4 wavy-underline inline-block">
              Connect
            </h4>
            <div className="flex gap-4 mt-6">
              <a
                href="#"
                className="w-12 h-12 flex items-center justify-center border-2 border-pencil bg-card hover:bg-accent hover:text-white transition-all duration-100 hover:rotate-6"
                style={{
                  borderRadius: "60% 40% 50% 50% / 50% 60% 40% 50%",
                }}
                title="GitHub"
              >
                <Code2 size={20} strokeWidth={2.5} />
              </a>
              <a
                href="#"
                className="w-12 h-12 flex items-center justify-center border-2 border-pencil bg-card hover:bg-accent-blue hover:text-white transition-all duration-100 hover:-rotate-6"
                style={{
                  borderRadius: "50% 60% 40% 50% / 60% 40% 50% 50%",
                }}
                title="LinkedIn"
              >
                <Share2 size={20} strokeWidth={2.5} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t-2 border-dashed border-pencil/30 text-center">
          <p className="font-body text-pencil/50 text-lg">
            ✏️ Sketched with love © {new Date().getFullYear()} BunkBook
          </p>
        </div>
      </div>
    </footer>
  );
}
