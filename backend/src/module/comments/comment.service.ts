import { prisma } from "../../lib/prisma";
import type { ReviewStatus } from "../reviews/review.types";

const createComment = async (payload: { content: string, userId: string, reviewId: string }) => {
  return await prisma.comment.create({
    data: {
      ...payload,
      status: "PENDING",
    },
  });
};

const getCommentsByReview = async (reviewId: string, isAdmin: boolean = false) => {
  if (isAdmin) {
    return await prisma.comment.findMany({
      where: { reviewId },
      include: { user: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
    });
  }
  return await prisma.comment.findMany({
    where: { reviewId, status: "APPROVED" },
    include: { user: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
  });
};

const getAllComments = async (isAdmin: boolean = false, status?: ReviewStatus) => {
  if (!isAdmin) throw new Error("Unauthorized");
  return await prisma.comment.findMany({
    where: status ? { status } : {},
    include: { 
      user: { select: { name: true, email: true } },
      review: { 
        include: { 
          movie: { select: { title: true } }
        }
      }
    },
    orderBy: { createdAt: "desc" },
  });
};

const updateCommentStatus = async (id: string, status: ReviewStatus) => {
  return await prisma.comment.update({
    where: { id },
    data: { status },
  });
};

const deleteComment = async (id: string, userId: string, isAdmin: boolean = false) => {
  const comment = await prisma.comment.findUnique({ where: { id } });
  if (!comment) throw new Error("Comment not found");

  if (!isAdmin && (comment.userId !== userId || comment.status !== "PENDING")) {
    throw new Error("Unauthorized or comment already processed");
  }

  return await prisma.comment.delete({
    where: { id },
  });
};

export const serviceComment = {
  createComment,
  getCommentsByReview,
  getAllComments,
  updateCommentStatus,
  deleteComment,
};
