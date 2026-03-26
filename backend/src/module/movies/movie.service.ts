import { prisma } from "../../lib/prisma";



const createmovie = async (payload: any ) => {
  const result = await prisma.movie.create({
    data: payload
  });
  return result;
};
const getmovie = async () => {
  return prisma.movie.findMany();
};

const getsinglemovie = async (id: string) => {
  return prisma.movie.findUnique({
    where: { id },
  });
};
const deletemovie = async (id: string) => {
  return prisma.movie.delete({
    where: { id },
  });
};

const updatemovie = async (id: string, payload: any) => {
  return prisma.movie.update({
    where: { id },
    data: payload,
  });
};

export const movieService = {
  createmovie,
  getmovie,
  deletemovie,
  updatemovie,
  getsinglemovie,
};