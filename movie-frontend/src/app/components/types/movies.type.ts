enum Pricing {
  FREE,
  PREMIUM
}
export type MOVIE = {
  id: string;
  title: string;
  synopsis: string | null;
  releaseYear: number;
  director: string;
  cast: string | null;
  streamingPlatforms: string[];
  pricing: Pricing
  posterUrl: string | null;
  trailerUrl: string | null;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
};