import { Router } from "express";
import { statsController } from "./stats.controller";

const router = Router();

router.get("/dashboard", statsController.getAdminStats);

export const statsRouter = router;
