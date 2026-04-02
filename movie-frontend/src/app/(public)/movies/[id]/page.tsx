import ReviewModal from "@/src/app/components/Layout/ReviewModal";
import ReviewSlider from "@/src/app/components/Layout/ReviewSlider";
import { moviesRoute } from "@/src/app/components/service/movie";
import Image from "next/image";
import { Clapperboard, Star, Video, Ticket, User, Calendar } from "lucide-react";

export default async function ViewMovie({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movieData = await moviesRoute.getSingleMovies(id);
  const movie = movieData.data;
  return (
    <div className="min-h-screen bg-slate-50 pb-20">

      {/* Hero */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-8">

          {/* Poster */}
          <div className="w-full md:w-72 shrink-0">
            <div className="aspect-[2/3] bg-slate-100 rounded-md overflow-hidden border border-slate-200">
              {movie.posterUrl ? (
                <Image
                  width={400}
                  height={600}
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 gap-2">
                  <Clapperboard className="w-12 h-12" />
                  <p className="text-sm font-medium">No poster available</p>
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col gap-5 grow">

            {/* Access badge + title */}
            <div className="flex flex-col gap-2">
              <span
                className={`w-fit px-3 py-1 rounded-md text-[10px] font-semibold tracking-widest uppercase ${
                  movie.pricing === "FREE"
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                    : "bg-purple-50 text-purple-700 border border-purple-100"
                }`}
              >
                {movie.pricing} Access
              </span>
              <h1 className="text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight leading-tight">
                {movie.title}
              </h1>
            </div>

            {/* Meta */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <div className="w-7 h-7 rounded-md bg-slate-100 flex items-center justify-center">
                  <User className="w-3.5 h-3.5 text-slate-500" />
                </div>
                <span>Dir. <span className="font-medium text-slate-800">{movie.director}</span></span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <div className="w-7 h-7 rounded-md bg-slate-100 flex items-center justify-center">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                </div>
                <span className="font-medium text-slate-800">{movie.releaseYear}</span>
              </div>
            </div>

            {/* Synopsis */}
            <p className="text-slate-500 text-base leading-relaxed max-w-2xl">
              {movie.synopsis || "No description available for this title."}
            </p>

            {/* Platforms */}
            {movie.streamingPlatforms?.length > 0 && (
              <div className="flex flex-col gap-2">
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Streaming on</p>
                <div className="flex flex-wrap gap-2">
                  {movie.streamingPlatforms.map((platform: string, i: number) => (
                    <span
                      key={i}
                      className="bg-white border border-slate-200 text-slate-600 px-3 py-1 rounded-md text-xs font-medium hover:border-[#D96C2C] hover:text-[#D96C2C] transition-colors cursor-default"
                    >
                      {platform}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-100 mt-auto">
              <button className="inline-flex items-center gap-2 bg-[#D96C2C] hover:bg-[#b85b25] text-white px-6 py-2.5 rounded-md text-sm font-medium transition-all active:scale-95">
                <Ticket className="w-4 h-4" />
                Book ticket
              </button>
              <ReviewModal movieId={id} />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-10 space-y-14">

        {/* Trailer */}
        {movie.trailerUrl && (
          <section className="">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 bg-slate-900 rounded-md flex items-center justify-center">
                <Video className="w-4 h-4 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Official trailer</h2>
                <p className="text-sm text-slate-400">Experience the thrill before watching</p>
              </div>
            </div>
            <div className="rounded-md overflow-hidden border border-slate-200 bg-black aspect-video">
              <iframe
                src={movie.trailerUrl}
                className="w-full h-full"
                allowFullScreen
              />
            </div>
          </section>
        )}

        {/* Reviews */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 bg-orange-50 rounded-md flex items-center justify-center">
              <Star className="w-4 h-4 text-[#D96C2C]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Audience reviews</h2>
              <p className="text-sm text-slate-400">What other movie enthusiasts are saying</p>
            </div>
          </div>
          <ReviewSlider movieId={id} />
        </section>

      </div>
    </div>
  );
}