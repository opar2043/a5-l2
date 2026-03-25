"use client";

import React from "react";
import Link from "next/link";
import { Film } from "lucide-react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaPinterestP,
} from "react-icons/fa";

const movieLinks = [
  { label: "Action",    href: "/movies/action" },
  { label: "Adventure", href: "/movies/adventure" },
  { label: "Animation", href: "/movies/animation" },
  { label: "Comedy",    href: "/movies/comedy" },
  { label: "Crime",     href: "/movies/crime" },
];

const quickLinks = [
  { label: "About",      href: "/about" },
  { label: "My Account", href: "/account" },
  { label: "News",       href: "/news" },
];

const socialLinks = [
  { icon: <FaFacebookF className="w-3.5 h-3.5" />,  href: "#", label: "Facebook" },
  { icon: <FaTwitter className="w-3.5 h-3.5" />,    href: "#", label: "Twitter" },
  { icon: <FaInstagram className="w-3.5 h-3.5" />,  href: "#", label: "Instagram" },
  { icon: <FaYoutube className="w-3.5 h-3.5" />,    href: "#", label: "YouTube" },
  { icon: <FaPinterestP className="w-3.5 h-3.5" />, href: "#", label: "Pinterest" },
];

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white">

      {/* ── TOP BAR: Brand + Socials ── */}
      <div className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-5 flex items-center justify-between gap-4">

          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-full bg-[#D96C2C] flex items-center justify-center shadow group-hover:scale-105 transition-transform duration-200">
              <Film className="w-5 h-5 text-white" strokeWidth={2.2} />
            </div>
            <span className="text-white font-black text-xl tracking-tight">
              Movies <span className="text-[#D96C2C]">Ok</span>
            </span>
          </Link>

          {/* Social Icons */}
          <div className="flex items-center gap-2">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="w-8 h-8 rounded-full border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-[#D96C2C] hover:bg-[#D96C2C] transition-all duration-200"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT: 3 columns ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14">
        <div className="flex flex-col md:flex-row gap-10 md:gap-6">

          {/* Col 1 — About text */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-full bg-[#D96C2C] flex items-center justify-center">
                <Film className="w-3.5 h-3.5 text-white" strokeWidth={2.2} />
              </div>
              <span className="font-black text-base">
                Movies <span className="text-[#D96C2C]">Ok</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-5 max-w-xs">
              Your ultimate destination for discovering, booking, and experiencing
              the world's best cinema. From blockbusters to hidden indie gems — we
              bring every story to your screen.
            </p>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Trusted by millions of movie lovers across 40+ countries since 2004.
            </p>
          </div>

          {/* Col 2 — Movies */}
          <div className="w-40 shrink-0">
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5 flex items-center gap-2">
              <span className="w-5 h-0.5 bg-[#D96C2C] inline-block rounded-full" />
              Movies
            </h4>
            <ul className="flex flex-col gap-3">
              {movieLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-slate-400 hover:text-[#D96C2C] text-sm transition-colors duration-150 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-[#D96C2C] transition-colors duration-150 shrink-0" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Links */}
          <div className="w-40 shrink-0">
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5 flex items-center gap-2">
              <span className="w-5 h-0.5 bg-[#D96C2C] inline-block rounded-full" />
              Links
            </h4>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-slate-400 hover:text-[#D96C2C] text-sm transition-colors duration-150 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-[#D96C2C] transition-colors duration-150 shrink-0" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* ── BOTTOM BAR: Copyright ── */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-center">
          <p className="text-slate-500 text-xs text-center">
            © Copyright 2023 by{" "}
            <a
              href="https://ovatheme.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D96C2C] hover:text-orange-400 transition-colors duration-150 font-medium"
            >
              Ovatheme.com
            </a>
          </p>
        </div>
      </div>

    </footer>
  );
}