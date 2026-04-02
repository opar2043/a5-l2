export type ReviewStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface ReviewType {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  content: string | null;
  isSpoiler: boolean;
  tags: string[];
  status: ReviewStatus;
  createdAt: string;
  updatedAt: string;
  movieId: string;
}