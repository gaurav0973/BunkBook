"use client";

import React, { useState, useEffect } from "react";
import { Settings, Palette, Cpu, Thermometer } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

interface AppSettings {
  theme: "hand-drawn" | "minimal";
  model: "gpt-4o" | "gpt-4o-mini" | "gpt-3.5-turbo";
  temperature: number;
}

const SETTINGS_KEY = "app-settings";

const defaultSettings: AppSettings = {
  theme: "hand-drawn",
  model: "gpt-4o-mini",
  temperature: 0.7,
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(SETTINGS_KEY);
      if (stored) {
        setSettings({ ...defaultSettings, ...JSON.parse(stored) });
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }, [settings]);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b-2 border-dashed border-pencil/30 px-6 py-4 flex items-center gap-3">
        <div
          className="w-9 h-9 flex items-center justify-center border-2 border-pencil bg-muted"
          style={{
            borderRadius: "60% 40% 50% 50% / 50% 60% 40% 50%",
          }}
        >
          <Settings size={18} strokeWidth={2.5} />
        </div>
        <div>
          <h1 className="font-heading text-xl font-bold text-pencil">
            Settings
          </h1>
          <p className="font-body text-sm text-pencil/50">
            Customize your BunkBook experience
          </p>
        </div>
      </div>

      {/* Settings form */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-xl mx-auto space-y-8">
          {/* Account */}
          <div
            className="border-2 border-pencil bg-card p-6"
            style={{
              borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px",
              boxShadow: "3px 3px 0px 0px rgba(45, 45, 45, 0.1)",
            }}
          >
            <h2 className="font-heading text-xl font-bold text-pencil mb-4 flex items-center gap-2">
              👤 Account
            </h2>
            <div className="flex items-center gap-4">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-12 h-12 border-2 border-pencil",
                  },
                }}
              />
              <p className="font-body text-lg text-pencil/60">
                Manage your account through Clerk
              </p>
            </div>
          </div>

          {/* Theme */}
          <div
            className="border-2 border-pencil bg-card p-6"
            style={{
              borderRadius: "15px 225px 15px 255px / 255px 15px 225px 15px",
              boxShadow: "3px 3px 0px 0px rgba(45, 45, 45, 0.1)",
            }}
          >
            <h2 className="font-heading text-xl font-bold text-pencil mb-4 flex items-center gap-2">
              <Palette size={20} strokeWidth={2.5} />
              Theme
            </h2>
            <div className="flex gap-3">
              {(["hand-drawn", "minimal"] as const).map((theme) => (
                <button
                  key={theme}
                  onClick={() => setSettings((s) => ({ ...s, theme }))}
                  className={`
                    px-4 py-3 border-2 border-pencil font-body text-lg
                    transition-all duration-100
                    ${
                      settings.theme === theme
                        ? "bg-postit shadow-hard-sm font-bold"
                        : "bg-card text-pencil/60 hover:bg-muted/30"
                    }
                  `}
                  style={{
                    borderRadius:
                      "120px 10px 120px 10px / 10px 120px 10px 120px",
                  }}
                >
                  {theme === "hand-drawn" ? "✏️ Hand-Drawn" : "◻️ Minimal"}
                </button>
              ))}
            </div>
          </div>

          {/* Model */}
          <div
            className="border-2 border-pencil bg-card p-6"
            style={{
              borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px",
              boxShadow: "3px 3px 0px 0px rgba(45, 45, 45, 0.1)",
            }}
          >
            <h2 className="font-heading text-xl font-bold text-pencil mb-4 flex items-center gap-2">
              <Cpu size={20} strokeWidth={2.5} />
              AI Model
            </h2>
            <div className="space-y-2">
              {(
                [
                  { value: "gpt-4o", label: "GPT-4o", desc: "Most capable" },
                  {
                    value: "gpt-4o-mini",
                    label: "GPT-4o Mini",
                    desc: "Fast & affordable",
                  },
                  {
                    value: "gpt-3.5-turbo",
                    label: "GPT-3.5 Turbo",
                    desc: "Legacy",
                  },
                ] as const
              ).map((model) => (
                <button
                  key={model.value}
                  onClick={() =>
                    setSettings((s) => ({ ...s, model: model.value }))
                  }
                  className={`
                    w-full flex items-center justify-between px-4 py-3 border-2 border-pencil font-body text-lg
                    transition-all duration-100
                    ${
                      settings.model === model.value
                        ? "bg-postit shadow-hard-sm"
                        : "bg-card text-pencil/60 hover:bg-muted/30"
                    }
                  `}
                  style={{
                    borderRadius:
                      "255px 15px 225px 15px / 15px 225px 15px 255px",
                  }}
                >
                  <span className="font-bold">{model.label}</span>
                  <span className="text-sm text-pencil/40">{model.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Temperature */}
          <div
            className="border-2 border-pencil bg-card p-6"
            style={{
              borderRadius: "15px 225px 15px 255px / 255px 15px 225px 15px",
              boxShadow: "3px 3px 0px 0px rgba(45, 45, 45, 0.1)",
            }}
          >
            <h2 className="font-heading text-xl font-bold text-pencil mb-4 flex items-center gap-2">
              <Thermometer size={20} strokeWidth={2.5} />
              Temperature
            </h2>
            <div className="space-y-3">
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={settings.temperature}
                onChange={(e) =>
                  setSettings((s) => ({
                    ...s,
                    temperature: parseFloat(e.target.value),
                  }))
                }
                className="w-full accent-[#ff4d4d]"
              />
              <div className="flex justify-between font-body text-sm text-pencil/50">
                <span>🎯 Precise (0)</span>
                <span
                  className="px-3 py-1 border-2 border-pencil bg-postit font-bold text-pencil"
                  style={{
                    borderRadius:
                      "120px 10px 120px 10px / 10px 120px 10px 120px",
                  }}
                >
                  {settings.temperature}
                </span>
                <span>🎨 Creative (1)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
