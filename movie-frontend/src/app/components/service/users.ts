import api from "./api";



// ✅ Get all users
const getUsers = async () => {
  const res = await api.get("/users");
  return res.data;
};

// ✅ Get single review
const getSingleUser = async (id: string) => {
  const res = await api.get(`/users/${id}`);
  return res.data;
};

// ✅ Create review
const createUser =   async () => {
  const res = await api.post("/users");
  return res.data;
};

// ✅ Update review
const updateUser = async (id: string) => {
  const res = await api.patch(`/users/${id}`);
  return res.data;
};

// ✅ Delete review
const deleteUser = async (id: string) => {
  const res = await api.delete(`/users/${id}`);
  return res.data;
};

export const userRoute = {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
};