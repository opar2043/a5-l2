'use client'
import { moviesRoute } from "@/src/app/components/service/movie";
import { Clapperboard, Calendar, Users, ListVideo, Link as LinkIcon, DollarSign, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { MOVIE } from "../types/movies.type";

export default function EditMovieForm({ id }: { id: string }) {
  const [movieData, setMovieData] = useState<MOVIE | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setIsLoading(true);
        const response = await moviesRoute.getSingleMovies(id);
        // Assuming the structure is { success: true, data: { ...movie } } or directly the movie
        // Based on service/movie.ts: const res = data.data; return res
        // If it's standard response, it might be response.data
        setMovieData(response.data || response);
      } catch (error: any) {
        console.error("Failed to fetch movie:", error);
        toast.error("Failed to load movie details");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchMovie();
    }
  }, [id]);

  async function editMovieAction(e: any) {
    e.preventDefault();
    const frm = e.target;
    const title = frm.title.value;
    const synopsis = frm.synopsis.value;
    const releaseYear = parseInt(frm.releaseYear.value);
    const director = frm.director.value;
    const cast = frm.cast.value;
    const streamingPlatforms = frm.streamingPlatforms.value
      .split(",")
      .map((item: string) => item.trim())
      .filter(Boolean);
    const pricing = frm.pricing.value;
    const posterUrl = frm.posterUrl.value;
    const trailerUrl = frm.trailerUrl.value;

    const payload = {
      title,
      synopsis,
      releaseYear,
      director,
      cast,
      streamingPlatforms,
      pricing,
      posterUrl,
      trailerUrl,
    } as MOVIE;

    try {
      const response = await moviesRoute.updateMovies(id, payload);
      console.log(response);
      toast.success("Movie updated successfully");
    } catch (error: any) {
      console.error("Update movie error:", error);
      toast.error(error.response?.data?.message || error.message || "Failed to update movie");
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <Loader2 className="w-12 h-12 text-[#D96C2C] animate-spin" />
        <p className="text-gray-500 font-medium">Loading movie details...</p>
      </div>
    );
  }

  if (!movieData) {
    return (
      <div className="text-center p-12 bg-white rounded-md border border-gray-200">
        <p className="text-red-500 font-medium text-lg">Movie not found</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-md p-6 sm:p-8 shadow-sm w-full max-w-4xl mx-auto text-black">
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight text-black mb-2 flex items-center gap-2">
          <Clapperboard className="w-6 h-6 text-[#D96C2C]" />
          EDIT YOUR MOVIE
        </h2>
        <p className="text-gray-500">Update the details for "{movieData.title}"</p>
      </div>

      <form onSubmit={editMovieAction} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-gray-700">Movie Title</label>
            <input
              name="title"
              required
              defaultValue={movieData.title}
              placeholder="Inception"
              className="w-full px-3 py-2 bg-white border border-gray-300 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D96C2C] focus:border-transparent rounded-md text-lg"
            />
          </div>

          {/* Synopsis */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-gray-700">Synopsis</label>
            <textarea
              name="synopsis"
              defaultValue={movieData.synopsis || ""}
              placeholder="A brief description of the movie..."
              className="w-full bg-white border border-gray-300 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D96C2C] rounded-md p-3 min-h-[100px]"
            />
          </div>

          {/* Release Year */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" /> Release Year
            </label>
            <input
              name="releaseYear"
              type="number"
              defaultValue={movieData.releaseYear}
              placeholder="2010"
              className="w-full px-3 py-2 bg-white border border-gray-300 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D96C2C] rounded-md"
            />
          </div>

          {/* Pricing */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-gray-400" /> Pricing Model
            </label>
            <select
              name="pricing"
              defaultValue={movieData.pricing}
              className="w-full bg-white border border-gray-300 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D96C2C] rounded-md p-2.5 cursor-pointer hover:bg-gray-50"
            >
              <option value="FREE">Free Tier</option>
              <option value="PREMIUM">Premium / Paid</option>
            </select>
          </div>

          {/* Director */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Users className="w-4 h-4 text-gray-400" /> Director
            </label>
            <input
              name="director"
              defaultValue={movieData.director}
              placeholder="Christopher Nolan"
              className="w-full px-3 py-2 bg-white border border-gray-300 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D96C2C] rounded-md"
            />
          </div>

          {/* Cast */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Users className="w-4 h-4 text-gray-400" /> Cast
            </label>
            <input
              name="cast"
              defaultValue={movieData.cast || ""}
              placeholder="Leonardo DiCaprio, Joseph Gordon-Levitt..."
              className="w-full px-3 py-2 bg-white border border-gray-300 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D96C2C] rounded-md"
            />
          </div>

          {/* Streaming Platforms */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <ListVideo className="w-4 h-4 text-gray-400" /> Streaming Platforms
            </label>
            <input
              name="streamingPlatforms"
              required
              defaultValue={movieData.streamingPlatforms?.join(", ")}
              placeholder="Netflix, Hulu, Amazon Prime (comma separated)"
              className="w-full px-3 py-2 bg-white border border-gray-300 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D96C2C] rounded-md"
            />
          </div>

          {/* Poster URL */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <LinkIcon className="w-4 h-4 text-gray-400" /> Poster Cover URL
            </label>
            <input
              name="posterUrl"
              defaultValue={movieData.posterUrl || ""}
              placeholder="https://example.com/poster.jpg"
              className="w-full px-3 py-2 bg-white border border-gray-300 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D96C2C] rounded-md"
            />
          </div>

          {/* Trailer URL */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <LinkIcon className="w-4 h-4 text-gray-400" /> Trailer Video URL
            </label>
            <input
              name="trailerUrl"
              defaultValue={movieData.trailerUrl || ""}
              placeholder="https://youtube.com/watch?v=..."
              className="w-full px-3 py-2 bg-white border border-gray-300 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D96C2C] rounded-md"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4 mt-8 border-t border-gray-200">
          <button
            type="submit"
            className="w-full md:w-auto md:px-12 bg-[#D96C2C] hover:bg-[#b85b25] text-white font-medium py-3 rounded-md transition-colors flex justify-center items-center ml-auto"
          >
            Update Movie details
          </button>
        </div>
      </form>
    </div>
  );
}


