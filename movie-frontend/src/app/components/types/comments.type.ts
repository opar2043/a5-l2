import { ReviewStatus } from "./reviews.type";

export interface CommentType {
  id: string;
  content: string;
  userId: string;
  reviewId: string;
  status: ReviewStatus;
  createdAt: string;
  updatedAt: string;
  user?: {
    name: string;
  };
}
