import { prisma } from "../../lib/prisma";
import type { reviewType } from "./review.types";

const createReview = async (payload : reviewType) => {
  const result = await prisma.review.create({
    data: payload,
  });
  return result;
};

const getReview = async () => {
  const result = await prisma.review.findMany();
  return result;
};


const getSingleReview = async (id: string) => {
  const result = await prisma.review.findUnique({
    where: { id },
  });
  return result;
};


const updateReview = async (id: string, payload: any) => {
  const result = await prisma.review.update({
    where: { id },
    data: payload,
  });
  return result;
};

const deleteReview = async (id: string) => {
  const result = await prisma.review.delete({
    where: { id },
  });
  return result;
};

export const serviceReview = {
  createReview,
  getReview,
  getSingleReview,
  updateReview,
  deleteReview,
};
