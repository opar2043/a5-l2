import ReviewModal from "@/src/app/components/Layout/ReviewModal";
import { moviesRoute } from "@/src/app/components/service/movie";
import Image from "next/image";

export default async function ViewMovie({
  params,
}: {
  params: Promise<{ id: string }>; // ✅ FIX TYPE
}) {
  const { id } = await params; // ✅ MUST await

  const movie = await moviesRoute.getSingleMovies(id);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">

        {/* Poster */}
        <div className="h-80 bg-gray-300 flex items-center justify-center">
          {movie.posterUrl ? (
            <Image
              width={300}
              height={400}
              src={movie.posterUrl}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <p className="text-gray-500 text-lg">No Poster Available</p>
          )}
        </div>

        <div className="p-6 space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">
            {movie.title}
          </h1>

          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <span>🎬 Director: {movie.director}</span>
            <span>📅 Year: {movie.releaseYear}</span>
            <span>💰 Pricing: {movie.pricing}</span>
          </div>

          {/* Platforms */}
          <div>
            <h2 className="font-semibold text-gray-700 mb-1">
              Streaming Platforms:
            </h2>
            <div className="flex gap-2 flex-wrap">
              {movie.streamingPlatforms?.map((platform: string, i: number) => (
                <span
                  key={i}
                  className="bg-pink-500 text-white px-3 py-1 rounded-full text-xs"
                >
                  {platform}
                </span>
              ))}
            </div>
          </div>

          {/* Synopsis */}
          <div>
            <h2 className="font-semibold text-gray-700 mb-1">
              Synopsis:
            </h2>
            <p className="text-gray-600">
              {movie.synopsis || "No description available."}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mt-6">
            <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg shadow">
              🎟️ Book Ticket
            </button>

            {/* ✅ use id, not movie.id (safer) */}
            <ReviewModal movieId={id} />
          </div>

          {/* Trailer */}
          {movie.trailerUrl && (
            <div className="mt-6">
              <h2 className="font-semibold text-gray-700 mb-2">
                Watch Trailer:
              </h2>
              <iframe
                src={movie.trailerUrl}
                className="w-full h-64 rounded-lg"
                allowFullScreen
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}