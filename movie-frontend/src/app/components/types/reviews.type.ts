export interface ReviewType {
  id: string;
  userName: string;
  rating: number;
  content: string | null;
  createdAt: Date;
  updatedAt: Date;
  movieId: string;
}