import MovieCard from "@/src/app/components/Layout/MovieCard";
import React from "react";
import { moviesRoute } from "../../components/service/movie";
import { MOVIE } from "../../components/types/movies.type";

export default async function MoviesPage() {
  const movies = await moviesRoute.getMovies();

  return (
    <div className="p-6 md:p-12">
      
      {/* Heading */}
      <h1 className="text-2xl font-bold mb-6">All Movies</h1>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4   gap-6">
        {movies?.map((m: MOVIE) => (
          <MovieCard key={m.id} m={m} />
        ))}
      </div>
    </div>
  );
}