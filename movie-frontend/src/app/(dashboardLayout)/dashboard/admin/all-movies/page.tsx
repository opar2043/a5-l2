import React from "react";
import { moviesRoute } from "@/src/app/components/service/movie";
import { Edit, Film, Calendar } from "lucide-react";
import Link from "next/link";
import DeleteMovieButton from "@/src/app/components/Layout/DeleteMovieButton";

export default async function AllMoviesPage() {
  const responseData = await moviesRoute.getMovies();
  const movies = Array.isArray(responseData) ? responseData : responseData?.data || [];

  return (
    <div className="w-full h-full animate-in fade-in slide-in-from-bottom-4 duration-500 text-black">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-black flex items-center gap-2">
            <Film className="w-6 h-6 text-[#D96C2C]" />
            Movie Catalog
          </h1>
          <p className="text-gray-500 mt-1">Manage and edit your entire movie library.</p>
        </div>
        <Link 
          href="/dashboard/admin/movies" 
          className="bg-[#D96C2C] hover:bg-[#b85b25] text-white px-4 py-2 rounded-md font-medium transition-colors text-sm text-center"
        >
          + Add New Movie
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-700 uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Director</th>
                <th className="px-6 py-4">Release Year</th>
                <th className="px-6 py-4">Pricing</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {movies.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    No movies found. Add one to get started!
                  </td>
                </tr>
              ) : (
                movies.map((movie: any) => (
                  <tr key={movie.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {movie.posterUrl ? (
                          <img src={movie.posterUrl} alt={movie.title} className="w-10 h-10 rounded-md object-cover border border-gray-200" />
                        ) : (
                          <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center border border-gray-200">
                            <Film className="w-5 h-5 text-gray-400" />
                          </div>
                        )}
                        <span className="font-medium text-black">{movie.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {movie.director || "Unknown"}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {movie.releaseYear || "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${movie.pricing === 'PREMIUM' ? 'bg-[#D96C2C]/10 text-[#D96C2C]' : 'bg-gray-100 text-gray-600'}`}>
                        {movie.pricing || "FREE"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/dashboard/admin/all-movies/${movie.id}`}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                          title="Edit Movie"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <DeleteMovieButton id={movie.id} movieTitle={movie.title} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
