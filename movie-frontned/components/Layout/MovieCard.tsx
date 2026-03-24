"use client";

import React from "react";
import { Star, Play, Clock, Calendar } from "lucide-react";

interface MovieCardProps {
  image?: string;
  title?: string;
  genre?: string;
  rating?: number;
  duration?: string;
  year?: number;
  onView?: () => void;
}

export default function MovieCard({
  image = "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&q=80",
  title = "Shadow Protocol",
  genre = "Thriller",
  rating = 8.7,
  duration = "2h 15m",
  year = 2024,
  onView,
}: MovieCardProps) {
  return (
    <div className="group relative w-64 rounded-2xl overflow-hidden bg-slate-900 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">

      {/* ── Image ── */}
      <div className="relative h-80 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />

        {/* Rating badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded-full px-2.5 py-1">
          <Star className="w-3 h-3 text-[#D96C2C] fill-[#D96C2C]" />
          <span className="text-white text-xs font-bold">{rating}</span>
        </div>

        {/* Genre badge */}
        <div className="absolute top-3 right-3 bg-[#D96C2C] rounded-full px-2.5 py-1">
          <span className="text-white text-xs font-bold">{genre}</span>
        </div>

        {/* Play button — appears on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-14 h-14 rounded-full bg-[#D96C2C] flex items-center justify-center shadow-xl scale-90 group-hover:scale-100 transition-transform duration-300">
            <Play className="w-6 h-6 text-white fill-white ml-1" />
          </div>
        </div>
      </div>

      {/* ── Info ── */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-white font-bold text-base leading-tight mb-2 line-clamp-1">
          {title}
        </h3>

        {/* Meta */}
        <div className="flex items-center gap-3 mb-4">
          <span className="flex items-center gap-1 text-slate-400 text-xs">
            <Clock className="w-3 h-3" /> {duration}
          </span>
          <span className="flex items-center gap-1 text-slate-400 text-xs">
            <Calendar className="w-3 h-3" /> {year}
          </span>
        </div>

        {/* Button */}
        <button
          onClick={onView}
          className="w-full py-2.5 bg-[#D96C2C] hover:bg-[#c05f24] text-white font-bold text-xs tracking-widest uppercase rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-[#D96C2C]/20 active:scale-95"
        >
          View Details
        </button>
      </div>
    </div>
  );
}