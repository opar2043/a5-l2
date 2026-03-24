"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { FaFacebook, FaTwitter } from "react-icons/fa";
interface Slide {
  id: number;
  genre: string;
  title: string;
  subtitle: string;
  releaseLabel: string;
  releaseDate: string;
  bgImage: string;
  bgColor: string;
}

const slides: Slide[] = [
  {
    id: 1,
    genre: "Adventure Movie",
    title: "THE WAY OF WATER",
    subtitle: "Writen and Directed by James / United Kingdom 2024",
    releaseLabel: "Coming in",
    releaseDate: "April 2024",
    bgImage: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1600&q=80",
    bgColor: "#0f172a",
  },
  {
    id: 2,
    genre: "Action Thriller",
    title: "SHADOW PROTOCOL",
    subtitle: "Directed by Elena Vasquez / United States 2024",
    releaseLabel: "Coming in",
    releaseDate: "June 2024",
    bgImage: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1600&q=80",
    bgColor: "#0c0a09",
  },
  {
    id: 3,
    genre: "Sci-Fi Epic",
    title: "BEYOND THE STARS",
    subtitle: "Written and Directed by Chen Wei / Japan 2024",
    releaseLabel: "Coming in",
    releaseDate: "August 2024",
    bgImage: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1600&q=80",
    bgColor: "#0a0f1e",
  },
];

export default function Banner() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const goTo = useCallback(
    (index: number, dir: "left" | "right") => {
      if (animating) return;
      setDirection(dir);
      setAnimating(true);
      setTimeout(() => {
        setCurrent(index);
        setAnimating(false);
      }, 500);
    },
    [animating]
  );

  const prev = () => {
    const index = (current - 1 + slides.length) % slides.length;
    goTo(index, "left");
  };

  const next = useCallback(() => {
    const index = (current + 1) % slides.length;
    goTo(index, "right");
  }, [current, goTo]);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <section className="relative w-full h-[calc(100vh-72px)] min-h-[500px] overflow-hidden select-none">
      {/* Background layers */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-700",
            i === current ? "opacity-100" : "opacity-0"
          )}
        >
          {/* Image */}
          <img
            src={s.bgImage}
            alt={s.title}
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
          />
          {/* Grayscale + dark overlay */}
          <div className="absolute inset-0 bg-slate-950/70 mix-blend-multiply" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(2,6,23,0.85) 30%, rgba(2,6,23,0.3) 100%)",
            }}
          />
        </div>
      ))}

      {/* Left social sidebar */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-4 pl-4">
        <span
          className="text-slate-400 text-xs tracking-widest"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          Share
        </span>
        <div className="w-px h-10 bg-slate-600" />
        <a
          href="#"
          className="text-slate-400 hover:text-[#D96C2C] transition-colors duration-200"
        >
          <FaTwitter className="w-4 h-4" />
        </a>
        <a
          href="#"
          className="text-slate-400 hover:text-[#D96C2C] transition-colors duration-200"
        >
          <FaFacebook className="w-4 h-4" />
        </a>
        <a
          href="#"
          className="text-slate-400 hover:text-[#D96C2C] transition-colors duration-200"
        >
          <Share2 className="w-4 h-4" />
        </a>
      </div>

      {/* Coming in — top right */}
      <div
        className={cn(
          "absolute top-10 right-10 z-20 text-right transition-all duration-500",
          animating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
        )}
      >
        <p className="text-slate-300 text-sm font-medium tracking-wide">
          {slide.releaseLabel}
        </p>
        <p className="text-white text-3xl font-extrabold leading-tight">
          {slide.releaseDate}
        </p>
        <div className="mt-1 h-0.5 bg-[#D96C2C] ml-auto w-3/4 rounded-full" />
      </div>

      {/* Main content */}
      <div className="relative z-20 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-16 sm:px-20 w-full">
          <div
            className={cn(
              "max-w-2xl transition-all duration-500 ease-out",
              animating
                ? direction === "right"
                  ? "opacity-0 -translate-x-8"
                  : "opacity-0 translate-x-8"
                : "opacity-100 translate-x-0"
            )}
          >
            {/* Genre */}
            <p
              className="text-[#D96C2C] text-lg font-medium mb-2"
              style={{ fontFamily: "'Dancing Script', cursive" }}
            >
              {slide.genre}
            </p>

            {/* Title */}
            <h1 className="text-white font-black leading-none tracking-tight mb-4"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
              {slide.title}
            </h1>

            {/* Subtitle */}
            <p className="text-slate-300 text-base mb-8">{slide.subtitle}</p>

            {/* CTA */}
            <button className="px-9 py-4 bg-[#D96C2C] hover:bg-[#c05f24] text-white font-bold text-sm tracking-widest uppercase rounded transition-all duration-200 shadow-lg hover:shadow-[#D96C2C]/30 hover:scale-105 active:scale-95">
              Get Ticket
            </button>
          </div>
        </div>
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i, i > current ? "right" : "left")}
            className={cn(
              "transition-all duration-300 rounded-full",
              i === current
                ? "w-8 h-2 bg-[#D96C2C]"
                : "w-2 h-2 bg-slate-500 hover:bg-slate-300"
            )}
          />
        ))}
      </div>

      {/* Slide number display */}
      <div className="absolute bottom-8 right-10 z-20 flex items-center gap-2 text-slate-400 text-sm font-mono">
        <span className="text-white font-bold text-lg">
          {String(current + 1).padStart(2, "0")}
        </span>
        <span>/</span>
        <span>{String(slides.length).padStart(2, "0")}</span>
      </div>

      {/* Arrow Controls */}
      <button
        onClick={prev}
        className="absolute left-16 sm:left-20 bottom-6 z-20 p-2 rounded-full border border-slate-600 text-slate-300 hover:text-white hover:border-[#D96C2C] hover:bg-[#D96C2C]/10 transition-all duration-200"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute left-32 sm:left-36 bottom-6 z-20 p-2 rounded-full border border-slate-600 text-slate-300 hover:text-white hover:border-[#D96C2C] hover:bg-[#D96C2C]/10 transition-all duration-200"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Bottom orange bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#D96C2C] z-20" />
    </section>
  );
}