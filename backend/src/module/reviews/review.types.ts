export type ReviewStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface reviewType {
  id: string;
  userName: string;
  rating: number;
  content: string | null;
  createdAt: Date;
  updatedAt: Date;
  movieId: string;
  status: ReviewStatus;
  isSpoiler: boolean;
  tags: string[];
  userId: string;
}