import type { RequestHandler } from "express";
import { succes } from "../../lib/HandleStatus";
import { serviceReview } from "./review.service";

const createReview: RequestHandler = async (req, res) => {
  try {
    const body = req.body;
    const result = await serviceReview.createReview(body);

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(401).json({
      success: true,
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
      success: true,
    });
  }
};

const getSingleReview: RequestHandler = async (req, res) => {
  try {
    const id = req.body.id as string;
    const result = await serviceReview.getSingleReview(id);

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(401).json({
      success: true,
    });
  }
};

const deleteReview: RequestHandler = async (req, res) => {
  try {
    const id = req.body.id as string;
    const result = await serviceReview.deleteReview(id);

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(401).json({
      success: true,
    });
  }
};

const updateReview: RequestHandler = async (req, res) => {
  try {
    const id = req.body.id as string;
    const result = await serviceReview.updateReview(id , req.body);

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(401).json({
      success: true,
    });
  }
};



export const reviewsController = {
  createReview,
  updateReview,
  deleteReview,
  getReview,
  getSingleReview
};
