"use client";

import { useEffect, useState } from "react";
import { reviewRoute } from "../service/review";
import { ReviewType } from "../types/reviews.type";
import { Star, ChevronLeft, ChevronRight, MessageSquare, AlertTriangle } from "lucide-react";
import CommentSection from "./CommentSection";

export default function ReviewSlider({ movieId }: { movieId: string }) {
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [revealedSpoilers, setRevealedSpoilers] = useState<Record<string, boolean>>({});
  const [activeComments, setActiveComments] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const allReviews = await reviewRoute.getReview();
        const data = allReviews.data || allReviews;
        const filtered = data.filter(
          (rev: ReviewType) => rev.movieId === movieId && rev.status === "APPROVED"
        );
        setReviews(filtered);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    if (movieId) fetchReviews();
  }, [movieId]);

  useEffect(() => {
    if (reviews.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % reviews.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  const toggleSpoiler = (id: string) => setRevealedSpoilers((prev) => ({ ...prev, [id]: !prev[id] }));
  const toggleComments = (id: string) => setActiveComments((prev) => ({ ...prev, [id]: !prev[id] }));

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <div className="w-6 h-6 border-2 border-[#D96C2C] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="max-w-xl mx-auto text-center py-10 bg-white border border-dashed border-slate-200 rounded-md">
        <p className="text-slate-500 text-sm font-medium">No approved reviews yet.</p>
        <p className="text-slate-400 text-xs mt-1">Be the first to share your thoughts!</p>
      </div>
    );
  }

  const review = reviews[currentIndex];

  return (
    <div className="max-w-3xl mx-auto">

      {/* Counter */}
      <div className="flex items-center justify-between mb-3 px-1">
        <p className="text-xs text-slate-400 font-medium">
          Review <span className="text-slate-600 font-semibold">{currentIndex + 1}</span> of{" "}
          <span className="text-slate-600 font-semibold">{reviews.length}</span>
        </p>
        {reviews.length > 1 && (
          <div className="flex items-center gap-1">
            <button
              onClick={prevSlide}
              className="p-1.5 bg-white border border-slate-200 hover:border-slate-300 text-slate-500 rounded-md transition-all active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              className="p-1.5 bg-white border border-slate-200 hover:border-slate-300 text-slate-500 rounded-md transition-all active:scale-95"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Review Card */}
      <div className="bg-white border border-slate-200 rounded-md overflow-hidden">

        {/* Card Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-orange-50 border border-orange-100 rounded-md flex items-center justify-center text-[#D96C2C] font-semibold text-sm flex-shrink-0">
              {review.userName?.[0]?.toUpperCase() || "U"}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900 leading-tight">
                {review.userName || "Anonymous"}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {new Date(review.createdAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Rating */}
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-1 bg-amber-50 border border-amber-100 px-2 py-1 rounded-md">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-xs font-semibold text-amber-700">{review.rating}/10</span>
            </div>
            <div className="flex gap-0.5">
              {Array.from({ length: 10 }, (_, i) => (
                <Star
                  key={i}
                  className={`w-2.5 h-2.5 ${
                    i < review.rating
                      ? "fill-amber-400 text-amber-400"
                      : "fill-slate-100 text-slate-200"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Tags */}
        {review.tags && review.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 px-4 pt-3">
            {review.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 bg-slate-50 text-slate-500 border border-slate-200 rounded-md text-[10px] font-medium uppercase tracking-wide"
              >
                #{tag}
              </span>
            ))}
            {review.isSpoiler && (
              <span className="px-2 py-0.5 bg-red-50 text-red-500 border border-red-100 rounded-md text-[10px] font-medium uppercase tracking-wide flex items-center gap-1">
                <AlertTriangle className="w-2.5 h-2.5" />
                Spoiler
              </span>
            )}
          </div>
        )}

        {/* Review Body */}
        <div className="px-4 py-3">
          {review.isSpoiler && !revealedSpoilers[review.id] ? (
            <div className="relative rounded-md border border-dashed border-orange-200 bg-orange-50/30 p-4">
              <p className="text-slate-400 blur-sm select-none text-sm leading-relaxed">
                {review.content}
              </p>
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <p className="text-xs font-semibold text-orange-700 uppercase tracking-wider">
                  Contains spoilers
                </p>
                <button
                  onClick={() => toggleSpoiler(review.id)}
                  className="px-3 py-1.5 bg-[#D96C2C] hover:bg-[#b85b25] text-white text-xs font-medium rounded-md transition-colors"
                >
                  Reveal content
                </button>
              </div>
            </div>
          ) : (
            <p className="text-slate-600 text-sm leading-relaxed">
              "{review.content}"
            </p>
          )}
        </div>

        {/* Card Footer */}
        <div className="px-4 pb-3 border-t border-slate-100 pt-3">
          <button
            onClick={() => toggleComments(review.id)}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            {activeComments[review.id] ? "Hide discussion" : "View discussion"}
          </button>
        </div>

        {/* Comment Section */}
        {activeComments[review.id] && (
          <div className="border-t border-slate-100 px-4 py-3 bg-slate-50">
            <CommentSection reviewId={review.id} />
          </div>
        )}
      </div>

      {/* Dots */}
      {reviews.length > 1 && (
        <div className="flex justify-center gap-1.5 mt-4">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === currentIndex ? "w-5 bg-[#D96C2C]" : "w-1.5 bg-slate-200 hover:bg-slate-300"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}