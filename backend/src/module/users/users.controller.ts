import type { RequestHandler } from "express";
import { serviceUser } from "./users.service";

const createUser: RequestHandler = async (req, res) => {
  try {
    const body = req.body;
    console.log(body);

    const result = await serviceUser.createUser(body);
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

const getUsers: RequestHandler = async (req, res) => {
  try {
    const result = await serviceUser.getUsers();

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

const getSingleUser: RequestHandler = async (req, res) => {
  try {
    const id = req.params.id as string;
    const result = await serviceUser.getSingleUser(id);

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

const deleteUser: RequestHandler = async (req, res) => {
  try {
    const id = req.params.id as string;
    const result = await serviceUser.deleteUser(id);

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

const updateUser: RequestHandler = async (req, res) => {
  try {
    const id = req.params.id as string;
    const result = await serviceUser.updateUser(id, req.body);

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

const getMe: RequestHandler = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: req.user,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
    });
  }
}

export const userController = {
  createUser,
  updateUser,
  deleteUser,
  getUsers,
  getSingleUser,
  getMe,
};
