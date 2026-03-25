"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, User, Menu, X, ChevronDown, Film } from "lucide-react";
import { cn } from "@/src/app/components/lib/utils";

const navLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Movies",
    href: "/movies",
  },
  {
    label: "Ticket",
    href: "/ticket",
    children: [
      { label: "Buy Ticket", href: "/ticket/buy" },
      { label: "My Tickets", href: "/ticket/my-tickets" },
    ],
  },
  {
    label: "About",
    href: "/about",
  },
  { label: "Contact", href: "/contact" },
  { label: "Dashboard", href: "/dashboard" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Spacer so content doesn't hide under sticky navbar */}
      <div className="h-[72px]" />

      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          "bg-slate-950 border-b border-slate-800",
          isScrolled ? "shadow-[0_4px_30px_rgba(0,0,0,0.6)]" : "",
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group shrink-0">
              <div className="w-9 h-9 rounded-full bg-[#D96C2C] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-200">
                <Film className="w-5 h-5 text-white" strokeWidth={2.2} />
              </div>
              <span className="text-white font-bold text-xl ">Movies OK</span>
            </Link>

            {/* Desktop Nav */}
            <ul className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <li
                  key={link.label}
                  className="relative"
                  onMouseEnter={() =>
                    link.children && setActiveDropdown(link.label)
                  }
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center gap-1 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150",
                      "text-slate-300 hover:text-white hover:bg-slate-800",
                    )}
                  >
                    {link.label}
                    {link.children && (
                      <ChevronDown
                        className={cn(
                          "w-3.5 h-3.5 text-slate-400 transition-transform duration-200",
                          activeDropdown === link.label ? "rotate-180" : "",
                        )}
                      />
                    )}
                  </Link>

                  {/* Dropdown */}
                  {link.children && activeDropdown === link.label && (
                    <div className="absolute top-full left-0 mt-1 w-48 bg-slate-900 border border-slate-700 rounded-lg shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-slate-800 transition-colors duration-100 border-b border-slate-800 last:border-0"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <button
                aria-label="Search"
                className="p-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-800 transition-colors duration-150"
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                aria-label="Account"
                className="p-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-800 transition-colors duration-150"
              >
                <User className="w-5 h-5" />
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Toggle menu"
                className="lg:hidden p-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-800 transition-colors duration-150"
              >
                {mobileOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-slate-950 border-t border-slate-800 px-4 pb-4">
            <ul className="flex flex-col gap-1 pt-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <div
                    className="flex items-center justify-between px-3 py-2.5 rounded-md text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer transition-colors duration-150"
                    onClick={() =>
                      link.children
                        ? setMobileExpanded(
                            mobileExpanded === link.label ? null : link.label,
                          )
                        : setMobileOpen(false)
                    }
                  >
                    <Link
                      href={link.href}
                      className="text-sm font-medium flex-1"
                      onClick={() => !link.children && setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                    {link.children && (
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 text-slate-400 transition-transform duration-200",
                          mobileExpanded === link.label ? "rotate-180" : "",
                        )}
                      />
                    )}
                  </div>

                  {link.children && mobileExpanded === link.label && (
                    <ul className="ml-4 mt-1 flex flex-col gap-0.5 border-l-2 border-[#D96C2C] pl-3">
                      {link.children.map((child) => (
                        <li key={child.label}>
                          <Link
                            href={child.href}
                            className="block px-2 py-2 text-sm text-slate-400 hover:text-white transition-colors duration-100"
                            onClick={() => setMobileOpen(false)}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>
    </>
  );
}
