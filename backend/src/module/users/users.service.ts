import { prisma } from "../../lib/prisma";


const createUser = async (payload : any ) => {
  console.log(payload);
  const result = await prisma.user.create({
    data: payload,
  });
  return result;
};

const getUsers = async () => {
  const result = await prisma.user.findMany();
  return result;
};


const getSingleUser = async (id: string) => {
  const result = await prisma.user.findUnique({
    where: { id },
  });
  return result;
};


const updateUser = async (id: string, payload: any) => {
  const result = await prisma.user.update({
    where: { id },
    data: payload,
  });
  return result;
};

const deleteUser = async (id: string) => {
  const result = await prisma.user.delete({
    where: { id },
  });
  return result;
};

export const serviceUser = {
  createUser,
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
