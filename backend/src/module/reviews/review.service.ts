import { prisma } from "../../lib/prisma";
import type { ReviewType, ReviewStatus } from "./review.types";

const createReview = async (payload: ReviewType) => {
  return await prisma.review.create({
    data: {
      ...payload,
      status: "PENDING", // Force pending status for all new reviews
    },
  });
};

const getReviews = async (isAdmin: boolean = false) => {
  if (isAdmin) {
    return await prisma.review.findMany({
      orderBy: { createdAt: "desc" },
    });
  }
  return await prisma.review.findMany({
    where: { status: "APPROVED" },
    orderBy: { createdAt: "desc" },
  });
};

const getSingleReview = async (id: string) => {
  return await prisma.review.findUnique({
    where: { id },
  });
};

const updateReviewStatus = async (id: string, status: ReviewStatus) => {
  return await prisma.review.update({
    where: { id },
    data: { status },
  });
};

const updateReview = async (id: string, userId: string, payload: Partial<ReviewType>) => {
  // Only allow updating if the review is PENDING and owned by the user
  const review = await prisma.review.findUnique({ where: { id } });
  if (!review || review.userId !== userId || review.status !== "PENDING") {
    throw new Error("Unauthorized or review already processed");
  }
  return await prisma.review.update({
    where: { id },
    data: payload,
  });
};

const deleteReview = async (id: string, userId: string, isAdmin: boolean = false) => {
  const review = await prisma.review.findUnique({ where: { id } });
  if (!review) throw new Error("Review not found");

  if (!isAdmin && (review.userId !== userId || review.status !== "PENDING")) {
    throw new Error("Unauthorized or review already processed");
  }

  return await prisma.review.delete({
    where: { id },
  });
};

export const serviceReview = {
  createReview,
  getReviews,
  getSingleReview,
  updateReviewStatus,
  updateReview,
  deleteReview,
};
