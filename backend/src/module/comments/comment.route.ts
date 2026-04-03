import { Router } from "express";
import { commentController } from "./comment.controller";

const router = Router();

router.post("/comments", commentController.createComment);
router.get("/comments", commentController.getAllComments);
router.get("/comments/review/:reviewId", commentController.getCommentsByReview);
router.patch("/comments/:id/status", commentController.updateCommentStatus);
router.delete("/comments/:id", commentController.deleteComment);

export const commentRouter = router;
