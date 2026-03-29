"use client";

import { useEffect, useState } from "react";
import { reviewRoute } from "../service/review";
import { toast } from "sonner";
import { Star, X, LogIn } from "lucide-react";
import { useSession } from "@/src/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ReviewModal({ movieId }: { movieId: string }) {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  // ESC key close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const resetForm = () => {
    setContent("");
    setRating(5);
    setIsOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session) {
      toast.error("You must be logged in to review.");
      return;
    }

    if (!content.trim()) {
      toast.error("Please write a review content.");
      return;
    }

    try {
      setLoading(true);

      await reviewRoute.createReview({
        movieId,
        rating,
        content,
      });

      toast.success("Review submitted successfully!");

      resetForm();

      // ✅ refresh Next.js data instead of full reload
      router.refresh();
    } catch (error: unknown) {
      const err = error as {
        response?: { data?: { message?: string } };
      };

      toast.error(
        err.response?.data?.message || "Failed to submit review"
      );
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return <div className="h-12 w-40 bg-gray-100 animate-pulse rounded-lg" />;
  }

  if (!session) {
    return (
      <Link
        href="/login"
        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 rounded-lg shadow font-medium transition-all flex items-center gap-2 group border border-gray-200"
      >
        <LogIn className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        Login to Review
      </Link>
    );
  }

  return (
    <>
      {/* Open Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-[#D96C2C] hover:bg-[#b85b25] text-white px-8 py-3 rounded-lg shadow-lg font-medium transition-all transform hover:scale-105 flex items-center gap-2"
      >
        <Star className="w-5 h-5 fill-current" />
        Rate and Review
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-2xl relative text-black animate-in fade-in zoom-in duration-200">
            
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Share Your Thoughts
              </h2>
              <p className="text-gray-500">
                Your feedback helps others discover great movies!
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Rating */}
              <div className="text-center space-y-3">
                <label className="text-sm font-semibold text-gray-700 block text-left">
                  Your Rating
                </label>

                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      aria-label={`Rate ${star} star`}
                      onClick={() => setRating(star)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-10 h-10 ${
                          star <= rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Review Text */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Detailed Review
                </label>

                <textarea
                  placeholder="What did you think of the story, acting, and visuals?"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 focus:border-[#D96C2C] focus:ring-2 focus:ring-[#D96C2C]/20 rounded-xl p-4 min-h-[150px] outline-none"
                />
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-3 pt-2">
                
                <button
                  type="submit"
                  disabled={loading || !content.trim()}
                  className="w-full py-4 bg-[#D96C2C] hover:bg-[#b85b25] disabled:bg-gray-400 text-white rounded-xl font-bold flex justify-center items-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Review"
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-3 bg-white border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50"
                >
                  Maybe Later
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}