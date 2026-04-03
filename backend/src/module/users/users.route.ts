import { Router } from "express";
import { userController } from "./users.controller";
import checker from "../../middleware/checker";


const router = Router();
router.get("/me", checker(), userController.getMe);
router.post("/users", userController.createUser);
router.get("/users", userController.getUsers);
router.get("/users/:id", userController.getSingleUser);
router.delete("/users/:id", userController.deleteUser);
router.patch("/users/:id", userController.updateUser);

export const userRouter = router;
