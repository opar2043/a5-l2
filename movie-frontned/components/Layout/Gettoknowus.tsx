"use client";

import React from "react";
import { Film, Trophy, Clapperboard } from "lucide-react";

const features = [
  {
    icon: <Trophy className="w-5 h-5" />,
    title: "Unlimited Awards",
    desc: "We've designed a culture that allows our stewards to assimilate.",
  },
  {
    icon: <Clapperboard className="w-5 h-5" />,
    title: "Our Directors",
    desc: "We've designed a culture that allows our stewards to assimilate.",
  },
];

export default function GetToKnowUs() {
  return (
    <section className="relative py-20 px-4 sm:px-8 bg-white overflow-hidden">
      {/* Dot pattern — top right */}
      <div
        className="absolute right-0 top-0 w-64 h-64 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #D96C2C 1.5px, transparent 1.5px)",
          backgroundSize: "18px 18px",
        }}
      />
      {/* Dot pattern — bottom left */}
      <div
        className="absolute left-32 bottom-0 w-48 h-48 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #D96C2C 1.5px, transparent 1.5px)",
          backgroundSize: "18px 18px",
        }}
      />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        {/* ── LEFT: Images ── */}
        <div className="relative h-[420px] hidden md:flex items-center">
          {/* Film reel ghost */}
          <svg
            className="absolute left-0 bottom-6 w-36 h-36 text-slate-200"
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <circle cx="50" cy="50" r="46" />
            <circle cx="50" cy="50" r="18" />
            <circle cx="50" cy="22" r="6" />
            <circle cx="50" cy="78" r="6" />
            <circle cx="22" cy="50" r="6" />
            <circle cx="78" cy="50" r="6" />
          </svg>

          {/* Photo 1 — back left, rotated */}
          <div className="absolute left-6 top-4 w-48 h-[280px] rounded-2xl overflow-hidden shadow-lg -rotate-3 border-4 border-white z-0">
            <img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80"
              alt="scene"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Photo 2 — front right, rotated other way */}
          <div className="absolute left-44 top-10 w-44 h-[260px] rounded-2xl overflow-hidden shadow-xl rotate-3 border-4 border-white z-10">
            <img
              src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&q=80"
              alt="movie"
              className="w-full h-full object-cover"
            />
          </div>

          {/* 20 Years badge */}
          <div className="absolute left-28 bottom-4 z-20 bg-white rounded-2xl shadow-xl px-5 py-4 border border-orange-100">
            <p className="text-5xl font-black text-[#D96C2C] leading-none">20</p>
            <p className="text-slate-500 text-xs font-medium mt-1 leading-tight">
              Years of
              <br />
              Producing
            </p>
          </div>

          {/* Dashed arrow */}
          <svg
            className="absolute bottom-2 left-4 w-24 h-14 text-[#D96C2C]"
            viewBox="0 0 90 45"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="5 4"
          >
            <path d="M5 40 Q35 5 80 22" />
            <polyline
              points="72,15 80,22 72,29"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </div>

        {/* ── RIGHT: Content ── */}
        <div>
          {/* Label */}
          <div className="flex items-center gap-2 mb-3">
            <Film className="w-5 h-5 text-[#D96C2C]" />
            <span className="text-[#D96C2C] text-sm font-semibold tracking-widest uppercase">
              Get To Know Us
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-slate-900 font-black text-4xl sm:text-5xl leading-tight mb-5">
            The Best Movie Ticket
            <br />
            Distributor
          </h2>

          {/* Body */}
          <p className="text-slate-500 text-base leading-relaxed mb-8">
            Lorem ipsum dolor sit amet consectur adipiscing elit sed eiusmod
            tempor incididunt labore dolore magna aliquaenim ad minim. Sed risus
            augue, commodo ornare felis non, eleifend pharetra eleifend.
          </p>

          {/* Feature list */}
          <div className="flex flex-col gap-5 mb-8">
            {features.map((f) => (
              <div key={f.title} className="flex gap-4 items-start">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-orange-50 text-[#D96C2C] flex items-center justify-center border border-orange-100">
                  {f.icon}
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-sm">{f.title}</p>
                  <p className="text-slate-500 text-sm leading-relaxed mt-0.5">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA row */}
          <div className="flex items-stretch gap-4 flex-wrap">
            <button className="px-8 py-3.5 bg-[#D96C2C] hover:bg-[#c05f24] text-white font-bold text-sm tracking-widest uppercase rounded transition-all duration-200 shadow hover:shadow-lg hover:scale-105 active:scale-95">
              Discover More
            </button>

            {/* Join Us card */}
            <div className="border-l-4 border-[#D96C2C] bg-orange-50 px-4 py-3 rounded-r-xl">
              <p className="text-[#D96C2C] text-[10px] font-bold uppercase tracking-widest mb-1">
                Join Us
              </p>
              <p className="text-slate-800 font-bold text-sm leading-snug">
                Seeking a Career in
                <br />a Movie Production
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}