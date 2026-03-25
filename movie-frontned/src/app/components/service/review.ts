import api from "./api";

const getReview = async () => {
  const data = await api.get("/reviews");
  const res = data.data;
  return res;
};
const getSingleReview = async (id: string) => {
  const data = await api.get("/reviews" + id);
  const res = data.data;
  return res;
};
const deleteReview = async (id: string) => {
  const data = await api.delete("/reviews" + id);
  const res = data.data;
  return res;
};
const updateReview = async (id: string) => {
  const data = await api.patch("/reviews" + id);
  const res = data.data;
  return res;
};
const createReview = async () => {
  const data = await api.post("/reviews");
  const res = data.data;
  return res;
};

export const reviewaRoute = {
  getReview,
  getSingleReview,
  updateReview,
  createReview,
  deleteReview,
};
