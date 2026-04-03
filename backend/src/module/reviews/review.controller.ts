import type { RequestHandler } from "express";
import { serviceReview } from "./review.service";

const createReview: RequestHandler = async (req, res) => {
  try {
    const { movieId, rating, content, isSpoiler, tags, userId, userName } = req.body;

    const result = await serviceReview.createReview({
      movieId,
      rating: Number(rating),
      content,
      isSpoiler: Boolean(isSpoiler),
      tags: Array.isArray(tags) ? tags : [],
      userId,
      userName,
    });
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

const getReview: RequestHandler = async (req, res) => {
  try {
    const isAdmin = req.query.admin === 'true'; // Simplified admin check for now
    const result = await serviceReview.getReviews(isAdmin);

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

const getSingleReview: RequestHandler = async (req, res) => {
  try {
    const id = req.params.id as string;
    const result = await serviceReview.getSingleReview(id);

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
    });
  }
};

const deleteReview: RequestHandler = async (req, res) => {
  try {
    const id = req.params.id as string;
    const userId = req.body.userId; // In a real app, this comes from the auth middleware
    const isAdmin = req.query.admin === 'true';

    const result = await serviceReview.deleteReview(id, userId, isAdmin);
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

const updateReview: RequestHandler = async (req, res) => {
  try {
    const id = req.params.id as string;
    const userId = req.body.userId; // In a real app, this comes from the auth middleware
    const result = await serviceReview.updateReview(id, userId, req.body);

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

const updateReviewStatus: RequestHandler = async (req, res) => {
  try {
    const id = req.params.id as string;
    const { status } = req.body;
    const result = await serviceReview.updateReviewStatus(id, status);

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

export const reviewsController = {
  createReview,
  updateReview,
  deleteReview,
  getReview,
  getSingleReview,
  updateReviewStatus,
};
