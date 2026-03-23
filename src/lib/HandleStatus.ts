import type { RequestHandler } from "express";

export const succes: RequestHandler = (req,res, result) => {
  res.status(201).json({
    success: true,
    data: result,
  });
};

export const error: RequestHandler = (req,res) => {
  res.status(401).json({
    success: false,
  });
};
