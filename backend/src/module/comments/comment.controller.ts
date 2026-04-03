import type { RequestHandler } from "express";
import { serviceComment } from "./comment.service";
import type { ReviewStatus } from "../reviews/review.types";

const createComment: RequestHandler = async (req, res) => {
  try {
    const { content, userId, reviewId } = req.body;
    const result = await serviceComment.createComment({ content, userId, reviewId });
    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getCommentsByReview: RequestHandler = async (req, res) => {
  try {
    const reviewId = req.params.reviewId as string;
    const isAdmin = req.query.admin === 'true';
    const result = await serviceComment.getCommentsByReview(reviewId, isAdmin);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const updateCommentStatus: RequestHandler = async (req, res) => {
  try {
    const id = req.params.id as string;
    const { status } = req.body;
    const result = await serviceComment.updateCommentStatus(id, status);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteComment: RequestHandler = async (req, res) => {
  try {
    const id = req.params.id as string;
    const { userId } = req.body;
    const isAdmin = req.query.admin === 'true';
    const result = await serviceComment.deleteComment(id, userId, isAdmin);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllComments: RequestHandler = async (req, res) => {
  try {
    const isAdmin = req.query.admin === 'true';
    const status = req.query.status as any;
    const result = await serviceComment.getAllComments(isAdmin, status);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const commentController = {
  createComment,
  getCommentsByReview,
  getAllComments,
  updateCommentStatus,
  deleteComment,
};
