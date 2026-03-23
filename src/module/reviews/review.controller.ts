import type { RequestHandler } from "express";
import { serviceReview } from "./review.service";

const createReview: RequestHandler = async (req, res) => {
  try {
    const body = req.body;
    console.log(body);

    const result = await serviceReview.createReview(body);
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

const getReview: RequestHandler = async (req, res) => {
  try {
    const result = await serviceReview.getReview();

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
    const result = await serviceReview.deleteReview(id);

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

const updateReview: RequestHandler = async (req, res) => {
  try {
    const id = req.params.id as string;
    const result = await serviceReview.updateReview(id, req.body);

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

export const reviewsController = {
  createReview,
  updateReview,
  deleteReview,
  getReview,
  getSingleReview,
};
