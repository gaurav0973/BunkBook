"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MessageSquare,
  FolderOpen,
  Sparkles,
  Settings,
  BookOpen,
  PanelLeftClose,
  PanelLeft,
} from "lucide-react";
import { UserButton } from "@clerk/nextjs";

const navItems = [
  {
    href: "/dashboard/chat",
    label: "Chat",
    icon: MessageSquare,
  },
  {
    href: "/dashboard/resources",
    label: "Resources",
    icon: FolderOpen,
  },
  {
    href: "/features",
    label: "Features",
    icon: Sparkles,
  },
  {
    href: "/dashboard/settings",
    label: "Settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Mobile overlay */}
      <aside
        className={`
          ${collapsed ? "w-[72px]" : "w-64"}
          h-full flex flex-col border-r-2 border-dashed border-pencil bg-paper
          transition-all duration-200 shrink-0
        `}
      >
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b-2 border-dashed border-pencil/30">
          {!collapsed && (
            <Link href="/" className="flex items-center gap-2">
              <div
                className="w-8 h-8 flex items-center justify-center border-2 border-pencil bg-postit shrink-0"
                style={{
                  borderRadius: "60% 40% 50% 50% / 50% 60% 40% 50%",
                }}
              >
                <BookOpen size={16} strokeWidth={2.5} />
              </div>
              <span className="font-heading text-lg font-bold text-pencil">
                BunkBook
              </span>
            </Link>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 hover:bg-muted/50 transition-colors"
            style={{ borderRadius: "50%" }}
          >
            {collapsed ? (
              <PanelLeft size={18} strokeWidth={2.5} />
            ) : (
              <PanelLeftClose size={18} strokeWidth={2.5} />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || pathname?.startsWith(item.href + "/");
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3 px-3 py-3 font-body text-lg
                  transition-all duration-100
                  ${collapsed ? "justify-center" : ""}
                  ${
                    isActive
                      ? "bg-postit border-2 border-pencil text-pencil font-bold"
                      : "text-pencil/60 hover:text-pencil hover:bg-muted/30 border-2 border-transparent"
                  }
                `}
                style={{
                  borderRadius: isActive
                    ? "255px 15px 225px 15px / 15px 225px 15px 255px"
                    : "12px",
                  boxShadow: isActive
                    ? "3px 3px 0px 0px rgba(45, 45, 45, 0.1)"
                    : "none",
                }}
                title={collapsed ? item.label : undefined}
              >
                <Icon size={20} strokeWidth={isActive ? 3 : 2.5} />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User Button */}
        <div
          className={`p-4 border-t-2 border-dashed border-pencil/30 ${
            collapsed ? "flex justify-center" : ""
          }`}
        >
          <div className="flex items-center gap-3">
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-9 h-9 border-2 border-pencil",
                },
              }}
            />
            {!collapsed && (
              <span className="font-body text-sm text-pencil/60">
                Account
              </span>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
