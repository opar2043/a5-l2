import { Router } from "express";
import { movieController } from "./movie.controller";

const router = Router();

router.post("/movies", movieController.createmovie);
router.get("/movies", movieController.getmovie);
router.get("/movies/:id", movieController.getsinglemovie);
router.delete("/movies/:id", movieController.deletemovie);
router.patch("/movies/:id", movieController.updatemovie);

export const movieRouter = router;