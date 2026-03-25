import api from "./api";

const getPurchase = async () => {
  const data = await api.get("/purchase");
  const res = data.data;
  return res;
};
const getSinglePurchase = async (id: string) => {
  const data = await api.get("/purchase" + id);
  const res = data.data;
  return res;
};
const deletePurchase = async (id: string) => {
  const data = await api.delete("/purchase" + id);
  const res = data.data;
  return res;
};
const updatePurchase = async (id: string) => {
  const data = await api.patch("/purchase" + id);
  const res = data.data;
  return res;
};
const createPurchase = async () => {
  const data = await api.post("/purchase");
  const res = data.data;
  return res;
};

export const reviewaRoute = {
  getPurchase,
  getSinglePurchase,
  createPurchase,
  updatePurchase,
  deletePurchase,
};
