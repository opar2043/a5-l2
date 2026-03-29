import ReviewModal from "@/src/app/components/Layout/ReviewModal";
import ReviewSlider from "@/src/app/components/Layout/ReviewSlider";
import { moviesRoute } from "@/src/app/components/service/movie";
import Image from "next/image";
import { Clapperboard, Star, Video, Ticket } from "lucide-react";

export default async function ViewMovie({
  params,
}: {
  params: Promise<{ id: string }>; 
}) {
  const { id } = await params;
  const movie = await moviesRoute.getSingleMovies(id);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto p-6 md:py-12 flex flex-col md:flex-row gap-8">
          {/* Poster Section */}
          <div className="w-full md:w-80 shrink-0 group relative cursor-pointer">
            <div className="aspect-2/3 bg-gray-200 rounded-2xl overflow-hidden shadow-2xl transition-transform hover:scale-[1.02]">
              {movie.posterUrl ? (
                <Image
                  width={400}
                  height={600}
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                  <Clapperboard className="w-16 h-16 mb-2" />
                  <p className="font-medium text-sm">No Poster Available</p>
                </div>
              )}
            </div>
          </div>

          {/* Details Section */}
          <div className="grow space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase ${
                  movie.pricing === "FREE" ? "bg-green-100 text-green-700" : "bg-purple-100 text-purple-700"
                }`}>
                  {movie.pricing} ACCESS
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
                {movie.title}
              </h1>
            </div>

            <div className="flex flex-wrap gap-6 text-sm font-medium text-gray-500">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">👤</span>
                <span className="text-gray-900">Dir. {movie.director}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">📅</span>
                <span className="text-gray-900">{movie.releaseYear}</span>
              </div>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed max-w-2xl italic">
              {movie.synopsis || "No description available for this cinematic masterpiece."}
            </p>

            <div className="space-y-3">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Streaming On</h3>
              <div className="flex gap-2 flex-wrap">
                {movie.streamingPlatforms?.map((platform: string, i: number) => (
                  <span
                    key={i}
                    className="bg-white border border-gray-200 text-gray-700 px-4 py-1.5 rounded-full text-xs font-semibold shadow-sm hover:border-[#D96C2C] hover:text-[#D96C2C] transition-colors cursor-default"
                  >
                    {platform}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-gray-100">
              <button className="bg-[#D96C2C] hover:bg-[#b85b25] text-white px-10 py-4 rounded-xl shadow-lg shadow-[#D96C2C]/30 font-bold transition-all transform hover:scale-105 flex items-center gap-3 active:scale-95">
                <Ticket className="w-5 h-5" />
                Book Ticket
              </button>
              <ReviewModal movieId={id} />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-12 space-y-20">
        {/* Trailer Section */}
        {movie.trailerUrl && (
          <section className="space-y-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center text-white">
                <Video className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Official Trailer</h2>
                <p className="text-gray-500 text-sm">Experience the thrill before watching</p>
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-black aspect-video relative group">
              <iframe
                src={movie.trailerUrl}
                className="w-full h-full"
                allowFullScreen
              />
            </div>
          </section>
        )}

        {/* Reviews Section */}
        <section className="space-y-8">
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="w-14 h-1 px-4 bg-[#D96C2C] rounded-full" />
            <h2 className="text-3xl font-bold text-gray-900">Audience Reviews</h2>
            <p className="text-gray-500 max-w-lg">
              Check out what other movie enthusiasts are saying about this title.
            </p>
          </div>
          <ReviewSlider movieId={id} />
        </section>
      </div>
    </div>
  );
}