import type { RequestHandler } from "express";
import { movieService } from "./movie.service";

const createmovie: RequestHandler = async (req, res, next) => {
  try {

   const body = req.body;
    const result = await movieService.createmovie(body);

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getmovie: RequestHandler = async (_req, res, next) => {
  try {
    const result = await movieService.getmovie();

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getsinglemovie: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;

    const result = await movieService.getsinglemovie(id as string);

    res.status(200).json({
      success: true,
      message : "movie find succesfull",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const deletemovie: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;

    const result = await movieService.deletemovie(id as string);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updatemovie: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;

    const result = await movieService.updatemovie(id as string, req.body);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const movieController = {
  createmovie,
  getmovie,
  deletemovie,
  updatemovie,
  getsinglemovie
};