"use client";

import React, { useEffect, useState } from "react";
import { reviewRoute } from "@/src/app/components/service/review";
import { useSession } from "@/src/lib/auth-client";
import { Trash2, Edit3, MessageSquare, Star, Clock, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { ReviewType } from "@/src/app/components/types/reviews.type";

export default function UserReviewsPage() {
  const { data: session } = useSession();
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUserReviews = async () => {
    if (!session?.user?.id) return;
    setLoading(true);
    try {
      const res = await reviewRoute.getReview(false);
      const data = res?.data || res || [];
      // Filter by current user ID (We need to ensure the API returns user reviews for non-admins too)
      // Actually, for user dashboard, we might need a specific getMyReviews endpoint 
      // but let's filter what we have for now.
      setReviews(data.filter((r: ReviewType) => r.userId === session.user.id));
    } catch (error) {
      console.error("Fetch Error:", error);
      toast.error("Failed to load your reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserReviews();
  }, [session]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    try {
      await reviewRoute.deleteReview(id, session?.user?.id);
      toast.success("Review deleted successfully");
      setReviews(prev => prev.filter(r => r.id !== id));
    } catch (error) {
      toast.error("You can only delete pending reviews.");
    }
  };

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500 text-black">
      <div className="mb-8">
        <h1 className="text-3xl font-black tracking-tight text-slate-900 flex items-center gap-3">
          <Star className="w-8 h-8 text-[#D96C2C] fill-[#D96C2C]" />
          My Reviews
        </h1>
        <p className="text-slate-500 mt-1 font-medium">Manage your reviews and feedback across CineVerse.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-20 flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-12 border-4 border-[#D96C2C] border-t-transparent rounded-full animate-spin" />
            <p className="text-slate-400 font-bold animate-pulse text-xs uppercase tracking-widest">Gathering your thoughts...</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="col-span-full py-20 text-center bg-white rounded-3xl border-2 border-dashed border-slate-200">
            <MessageSquare className="w-16 h-16 text-slate-100 mx-auto mb-4" />
            <p className="text-xl font-black text-slate-900 italic">No Reviews Found</p>
            <p className="text-slate-500 font-medium">Start reviewing movies to see them here!</p>
          </div>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-100 border border-slate-50 flex flex-col justify-between group hover:-translate-y-2 transition-all duration-300">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2 bg-yellow-400/10 px-3 py-1 rounded-xl">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-yellow-700 font-black">{review.rating}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    review.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-600' : 
                    review.status === 'REJECTED' ? 'bg-red-50 text-red-600' : 'bg-orange-50 text-orange-600'
                  }`}>
                    {review.status}
                  </span>
                </div>

                <p className="text-slate-700 font-medium italic mb-4 line-clamp-4">
                  "{review.content}"
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {review.tags?.map((tag, i) => (
                    <span key={i} className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-slate-400 text-xs font-bold">
                  <Clock className="w-3.5 h-3.5" />
                  {new Date(review.createdAt).toLocaleDateString()}
                </div>

                {review.status === "PENDING" && (
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => toast.info("Editing coming soon!")}
                      className="p-2 text-slate-400 hover:text-[#D96C2C] hover:bg-orange-50 rounded-lg transition-all"
                      title="Edit Review"
                    >
                      <Edit3 className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => handleDelete(review.id)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      title="Delete Review"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                )}
                {review.status === "APPROVED" && (
                   <div className="flex items-center gap-1 text-[10px] font-black text-emerald-500 uppercase">
                     <AlertCircle className="w-3 h-3" />
                     Live on Portal
                   </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
