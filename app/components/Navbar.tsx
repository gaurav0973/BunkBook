"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BookOpen, Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav
      className="sticky top-0 z-50 border-b-2 border-dashed border-pencil bg-paper/95 backdrop-blur-sm"
    >
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div
            className="w-10 h-10 flex items-center justify-center border-2 border-pencil bg-postit"
            style={{
              borderRadius: "60% 40% 50% 50% / 50% 60% 40% 50%",
            }}
          >
            <BookOpen size={20} strokeWidth={2.5} />
          </div>
          <span className="font-heading text-2xl font-bold text-pencil">
            BunkBook
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="font-body text-lg text-pencil wavy-underline"
          >
            Home
          </Link>
          <Link
            href="/features"
            className="font-body text-lg text-pencil wavy-underline"
          >
            Features
          </Link>
          <Link href="/dashboard/chat">
            <button className="btn-sketchy text-lg">Get Started →</button>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 border-2 border-pencil wobbly-sm"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X size={24} strokeWidth={2.5} />
          ) : (
            <Menu size={24} strokeWidth={2.5} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t-2 border-dashed border-pencil bg-paper px-6 py-4 flex flex-col gap-4">
          <Link
            href="/"
            className="font-body text-lg text-pencil"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/features"
            className="font-body text-lg text-pencil"
            onClick={() => setMobileMenuOpen(false)}
          >
            Features
          </Link>
          <Link href="/dashboard/chat" onClick={() => setMobileMenuOpen(false)}>
            <button className="btn-sketchy text-lg w-full">
              Get Started →
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
}
