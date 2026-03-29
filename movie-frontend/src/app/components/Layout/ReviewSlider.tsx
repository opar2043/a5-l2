"use client";

import { useEffect, useState } from "react";
import { reviewRoute } from "../service/review";
import { ReviewType } from "../types/reviews.type";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Card, CardContent } from "../ui/card";

export default function ReviewSlider({ movieId }: { movieId: string }) {
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const allReviews = await reviewRoute.getReview();
        // Assuming allReviews is like { success: true, data: [...] } or just [...]
        const data = allReviews.data || allReviews;
        const filtered = data.filter((rev: ReviewType) => rev.movieId === movieId);
        setReviews(filtered);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    if (movieId) {
      fetchReviews();
    }
  }, [movieId]);

  // Auto-slide logic
  useEffect(() => {
    if (reviews.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [reviews.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-8 h-8 border-4 border-[#D96C2C] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
        <Quote className="w-12 h-12 text-gray-200 mx-auto mb-4" />
        <p className="text-gray-500 font-medium text-lg">No reviews yet for this movie.</p>
        <p className="text-gray-400 text-sm">Be the first to share your thoughts!</p>
      </div>
    );
  }

  return (
    <div className="relative group max-w-4xl mx-auto px-4 py-8">
      <div className="overflow-hidden rounded-3xl bg-white shadow-xl border border-gray-100">
        <div 
          className="transition-transform duration-700 ease-in-out flex"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {reviews.map((review) => (
            <div key={review.id} className="min-w-full p-8 md:p-12 flex flex-col items-center text-center space-y-6">
              <div className="relative">
                <div className="w-16 h-16 bg-[#D96C2C]/10 rounded-full flex items-center justify-center text-[#D96C2C] font-bold text-2xl uppercase border-2 border-[#D96C2C]/20">
                  {review.userName?.[0] || "U"}
                </div>
                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-md">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-xl text-gray-800">{review.userName || "CineVerse User"}</h3>
                <div className="flex justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating ? "fill-yellow-400 text-yellow-400" : "fill-transparent text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="relative max-w-2xl">
                <Quote className="absolute -top-4 -left-6 w-8 h-8 text-gray-100 -z-10 transform -scale-x-100" />
                <p className="text-gray-600 text-lg leading-relaxed italic">
                  "{review.content}"
                </p>
                <Quote className="absolute -bottom-4 -right-6 w-8 h-8 text-gray-100 -z-10" />
              </div>

              <p className="text-xs text-gray-400 uppercase tracking-widest">
                {new Date(review.createdAt).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      {reviews.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 md:-translate-x-6 bg-white hover:bg-gray-50 text-gray-800 p-3 rounded-full shadow-lg border border-gray-100 transition-all opacity-0 group-hover:opacity-100 z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 md:translate-x-6 bg-white hover:bg-gray-50 text-gray-800 p-3 rounded-full shadow-lg border border-gray-100 transition-all opacity-0 group-hover:opacity-100 z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === currentIndex ? "w-8 bg-[#D96C2C]" : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
