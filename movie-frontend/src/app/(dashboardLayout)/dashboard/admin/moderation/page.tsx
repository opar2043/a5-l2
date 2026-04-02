"use client";

import React, { useEffect, useState } from "react";
import { reviewRoute } from "@/src/app/components/service/review";
import { commentRoute } from "@/src/app/components/service/comment";
import { ShieldAlert, Check, X } from "lucide-react";
import { toast } from "sonner";
import { ReviewType } from "@/src/app/components/types/reviews.type";
import { CommentType } from "@/src/app/components/types/comments.type";

export default function ModerationPage() {
  const [activeTab, setActiveTab] = useState<"reviews" | "comments">("reviews");
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === "reviews") {
        const res = await reviewRoute.getReview(true);
        const data = res?.data || res || [];
        setReviews(data.filter((r: ReviewType) => r.status === "PENDING"));
      } else {
        const res = await commentRoute.getAllComments(true, "PENDING");
        const data = res?.data || res || [];
        setComments(data);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      toast.error("Failed to fetch moderation data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const handleReviewStatus = async (id: string, status: "APPROVED" | "REJECTED") => {
    try {
      await reviewRoute.updateReviewStatus(id, status);
      toast.success(`Review ${status.toLowerCase()} successfully`);
      setReviews((prev) => prev.filter((r) => r.id !== id));
    } catch (error: any) {
      console.error("Review action error:", error);
      toast.error(error.response?.data?.message || "Action failed");
    }
  };

  const handleCommentStatus = async (id: string, status: "APPROVED" | "REJECTED") => {
    try {
      await commentRoute.updateCommentStatus(id, status);
      toast.success(`Comment ${status.toLowerCase()} successfully`);
      setComments((prev) => prev.filter((c) => c.id !== id));
    } catch (error: any) {
      console.error("Comment action error:", error);
      toast.error(error.response?.data?.message || "Action failed");
    }
  };

  const pendingCount = activeTab === "reviews" ? reviews.length : comments.length;

  return (
    <div className="w-full text-black">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-orange-50 rounded-md flex items-center justify-center flex-shrink-0">
            <ShieldAlert className="w-5 h-5 text-[#D96C2C]" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-slate-900">Content moderation</h1>
            <p className="text-sm text-slate-600 mt-0.5">Manage pending reviews and comments for CineVerse</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-slate-100 border border-slate-200 rounded-md p-0.5 gap-0.5">
          <button
            onClick={() => setActiveTab("reviews")}
            className={`px-5 py-1.5 rounded text-sm font-medium transition-all ${
              activeTab === "reviews"
                ? "bg-white text-[#D96C2C] border border-slate-200 shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Reviews
          </button>
          <button
            onClick={() => setActiveTab("comments")}
            className={`px-5 py-1.5 rounded text-sm font-medium transition-all ${
              activeTab === "comments"
                ? "bg-white text-[#D96C2C] border border-slate-200 shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Comments
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="bg-slate-50 rounded-md p-4">
          <p className="text-[10px] font-medium text-slate-600 uppercase tracking-widest mb-1.5">Pending</p>
          <p className="text-2xl font-semibold text-[#D96C2C]">{pendingCount}</p>
        </div>
        <div className="bg-slate-50 rounded-md p-4">
          <p className="text-[10px] font-medium text-slate-600 uppercase tracking-widest mb-1.5">Approved today</p>
          <p className="text-2xl font-semibold text-slate-800">—</p>
        </div>
        <div className="bg-slate-50 rounded-md p-4">
          <p className="text-[10px] font-medium text-slate-600 uppercase tracking-widest mb-1.5">Rejected today</p>
          <p className="text-2xl font-semibold text-slate-800">—</p>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white border border-slate-200 rounded-md overflow-hidden">
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 border-2 border-[#D96C2C] border-t-transparent rounded-full animate-spin" />
            <p className="text-xs font-medium text-slate-600 uppercase tracking-widest">Loading...</p>
          </div>
        ) : activeTab === "reviews" ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-5 py-3 text-[10px] font-medium text-slate-600 uppercase tracking-widest">User & rating</th>
                  <th className="px-5 py-3 text-[10px] font-medium text-slate-600 uppercase tracking-widest">Content</th>
                  <th className="px-5 py-3 text-[10px] font-medium text-slate-600 uppercase tracking-widest">Metadata</th>
                  <th className="px-5 py-3 text-[10px] font-medium text-slate-600 uppercase tracking-widest text-right">Decision</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {reviews.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-20 text-center">
                      <div className="flex flex-col items-center gap-2 opacity-30">
                        <Check className="w-10 h-10 text-slate-600" />
                        <p className="text-base font-medium text-slate-700">Queue is empty</p>
                        <p className="text-sm text-slate-600">All reviews have been processed.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  reviews.map((review) => (
                    <tr key={review.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-orange-50 rounded-md flex items-center justify-center text-[#D96C2C] font-medium text-sm flex-shrink-0">
                            {review.userName?.[0]?.toUpperCase() || "?"}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-900">{review.userName || "Unknown"}</p>
                            <span className="inline-flex items-center gap-1 mt-1 bg-amber-50 text-amber-700 text-[11px] font-medium px-2 py-0.5 rounded-full">
                              ★ {review.rating}/10
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 max-w-sm">
                        <p className="text-sm text-slate-700 leading-relaxed line-clamp-2">
                          "{review.content}"
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex flex-col gap-1.5">
                          <div className="flex flex-wrap gap-1.5">
                            {review.isSpoiler && (
                              <span className="px-2 py-0.5 bg-red-50 text-red-600 border border-red-100 rounded-full text-[10px] font-medium">
                                Spoiler
                              </span>
                            )}
                            {review.tags?.map((tag, i) => (
                              <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-700 border border-slate-200 rounded-full text-[12.5px] font-medium">
                                #{tag}
                              </span>
                            ))}
                          </div>
                          <p className="text-[11px] text-slate-600 font-medium">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleReviewStatus(review.id, "APPROVED")}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-100 hover:bg-emerald-100 rounded-md text-xs font-medium transition-all active:scale-95"
                          >
                            <Check className="w-3.5 h-3.5" />
                            Approve
                          </button>
                          <button
                            onClick={() => handleReviewStatus(review.id, "REJECTED")}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 rounded-md text-xs font-medium transition-all active:scale-95"
                          >
                            <X className="w-3.5 h-3.5" />
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-5 py-3 text-[10px] font-medium text-slate-600 uppercase tracking-widest">User</th>
                  <th className="px-5 py-3 text-[10px] font-medium text-slate-600 uppercase tracking-widest">Comment</th>
                  <th className="px-5 py-3 text-[10px] font-medium text-slate-600 uppercase tracking-widest">Parent review</th>
                  <th className="px-5 py-3 text-[10px] font-medium text-slate-600 uppercase tracking-widest text-right">Decision</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {comments.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-20 text-center">
                      <div className="flex flex-col items-center gap-2 opacity-30">
                        <Check className="w-10 h-10 text-slate-600" />
                        <p className="text-base font-medium text-slate-700">No pending comments</p>
                        <p className="text-sm text-slate-600">Everyone's being polite.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  comments.map((comment: any) => (
                    <tr key={comment.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-orange-50 rounded-md flex items-center justify-center text-[#D96C2C] font-medium text-sm flex-shrink-0">
                            {comment.user?.name?.[0]?.toUpperCase() || "?"}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-900">{comment.user?.name || "Unknown"}</p>
                            <p className="text-[12px] text-slate-600 mt-0.5">
                              {comment.review?.movie?.title || "Movie discussion"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 max-w-xs">
                        <p className="text-sm text-slate-700 leading-relaxed line-clamp-2">
                          "{comment.content}"
                        </p>
                        <p className="text-[11px] text-slate-400 font-medium mt-1.5">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        <div className="border-l-2 border-slate-200 pl-3 max-w-xs">
                          <p className="text-[10px] text-slate-600 font-medium uppercase tracking-widest mb-1">In reply to</p>
                          <p className="text-xs text-slate-600 italic leading-relaxed line-clamp-2">
                            "{comment.review?.content}"
                          </p>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleCommentStatus(comment.id, "APPROVED")}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-100 hover:bg-emerald-100 rounded-md text-xs font-medium transition-all active:scale-95"
                          >
                            <Check className="w-3.5 h-3.5" />
                            Approve
                          </button>
                          <button
                            onClick={() => handleCommentStatus(comment.id, "REJECTED")}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 rounded-md text-xs font-medium transition-all active:scale-95"
                          >
                            <X className="w-3.5 h-3.5" />
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}