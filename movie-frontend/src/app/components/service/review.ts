import api from "./api";

export interface ReviewPayload {
  movieId: string;
  rating: number;
  content: string;
  isSpoiler?: boolean;
  tags?: string[];
  userId?: string;
  userName?: string;
}

// ✅ Get all reviews
const getReview = async (isAdmin: boolean = false) => {
  const res = await api.get(`/reviews?admin=${isAdmin}`);
  return res.data;
};

// ✅ Get single review
const getSingleReview = async (id: string) => {
  const res = await api.get(`/reviews/${id}`);
  return res.data;
};

// ✅ Create review
const createReview = async (payload: ReviewPayload) => {
  const res = await api.post("/reviews", payload);
  return res.data;
};

// ✅ Update review
const updateReview = async (id: string, payload: Partial<ReviewPayload>) => {
  const res = await api.patch(`/reviews/${id}`, payload);
  return res.data;
};

// ✅ Update review status (Admin only)
const updateReviewStatus = async (id: string, status: string) => {
  const res = await api.patch(`/reviews/${id}/status`, { status });
  return res.data;
};

// ✅ Delete review
const deleteReview = async (id: string, userId?: string, isAdmin: boolean = false) => {
  const res = await api.delete(`/reviews/${id}?admin=${isAdmin}`, { data: { userId } });
  return res.data;
};

export const reviewRoute = {
  getReview,
  getSingleReview,
  createReview,
  updateReview,
  updateReviewStatus,
  deleteReview,
};