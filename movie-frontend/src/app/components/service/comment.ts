import api from "./api";

export interface CommentPayload {
  content: string;
  userId: string;
  reviewId: string;
}

// ✅ Get comments for a review
const getCommentsByReview = async (reviewId: string, isAdmin: boolean = false) => {
  const res = await api.get(`/comments/review/${reviewId}?admin=${isAdmin}`);
  return res.data;
};

// ✅ Create comment
const createComment = async (payload: CommentPayload) => {
  const res = await api.post("/comments", payload);
  return res.data;
};

// ✅ Update comment status (Admin only)
const updateCommentStatus = async (id: string, status: string) => {
  const res = await api.patch(`/comments/${id}/status`, { status });
  return res.data;
};

// ✅ Delete comment
const deleteComment = async (id: string, userId?: string, isAdmin: boolean = false) => {
  const res = await api.delete(`/comments/${id}?admin=${isAdmin}`, { data: { userId } });
  return res.data;
};

// ✅ Get all comments (Admin)
const getAllComments = async (isAdmin: boolean = false, status?: string) => {
  const query = status ? `&status=${status}` : "";
  const res = await api.get(`/comments?admin=${isAdmin}${query}`);
  return res.data;
};

export const commentRoute = {
  getCommentsByReview,
  getAllComments,
  createComment,
  updateCommentStatus,
  deleteComment,
};
