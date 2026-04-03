import { ReviewStatus } from "../reviews/review.types";

export type CommentType = {
  id?: string;
  content: string;
  userId: string;
  reviewId: string;
  status: ReviewStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
