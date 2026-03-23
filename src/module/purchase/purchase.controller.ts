import type { RequestHandler } from "express";
import { purchaseService } from "./purchase.service";

const createPurchase: RequestHandler = async (req, res) => {
  try {
    const body = req.body;
    const result = await purchaseService.createPurchase(body);

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

const getPurchase: RequestHandler = async (req, res) => {
  try {
    const result = await purchaseService.getPurchase();

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

const getSinglePurchase: RequestHandler = async (req, res) => {
  try {
    const id = req.body.id as string;
    const result = await purchaseService.getsinglePurchase(id);

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

const deletePurchase: RequestHandler = async (req, res) => {
  try {
    const id = req.body.id as string;
    const result = await purchaseService.deletePurchase(id);

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

const updatePurchase: RequestHandler = async (req, res) => {
  try {
    const id = req.body.id as string;
    const result = await purchaseService.updatePurchase(id, req.body);

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

export const purchasesController = {
  createPurchase,
  updatePurchase,
  deletePurchase,
  getPurchase,
  getSinglePurchase,
};
