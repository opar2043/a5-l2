import { Router } from "express";
import { reviewsController } from "./review.controller";

const router = Router();
router.post("/reviews", reviewsController.createReview);
router.get("/reviews", reviewsController.getReview);
router.get("/reviews/:id", reviewsController.getSingleReview);
router.delete("/reviews/:id", reviewsController.deleteReview);
router.patch("/reviews/:id", reviewsController.updateReview);
router.patch("/reviews/:id/status", reviewsController.updateReviewStatus);

export const reviewRouter = router;
