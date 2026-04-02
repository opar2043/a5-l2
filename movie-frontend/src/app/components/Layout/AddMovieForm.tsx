'use client'
import { moviesRoute } from "@/src/app/components/service/movie";
import { Clapperboard, Calendar, Users, ListVideo, Link as LinkIcon, DollarSign } from "lucide-react";
import { toast } from "sonner";

export default function AddMovieForm() {
  
  // async function createMovieAction(formData: FormData) {
  //   "use server";
    
  //   // In a real implementation you'd grab user.id from verified `auth_session` cookie
  //   const cookieStore = await cookies();
  //   const userId = cookieStore.get("auth_session")?.value || "admin-fallback";

  //   // Reconstruct data cleanly
  //   const rawReleaseYear = formData.get("releaseYear") as string;
  //   const rawStreaming = formData.get("streamingPlatforms") as string;

  //   const formattedData = {
  //     userId,
  //     title: formData.get("title") as string,
  //     synopsis: formData.get("synopsis") as string,
  //     releaseYear: rawReleaseYear ? Number(rawReleaseYear) : undefined,
  //     director: formData.get("director") as string,
  //     cast: formData.get("cast") as string,
  //     streamingPlatforms: rawStreaming ? rawStreaming.split(",").map((p) => p.trim()).filter(Boolean) : [],
  //     pricing: formData.get("pricing") as string || "FREE",
  //     posterUrl: formData.get("posterUrl") as string,
  //     trailerUrl: formData.get("trailerUrl") as string,
  //   };

  //   try {
  //     await moviesRoute.createMovies(formattedData);
  //   } catch (error) {
  //      console.error("Failed to create movie:", error);
  //      // Return error to UI in production
  //   }

  //   // Safely redirect out to the Catalog
  //   redirect("/dashboard/admin/all-movies");
  // }


  async function createMovieAction(e : any){
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
     const movie = {
      title,
      synopsis,
      releaseYear,
      director,
      cast,
      streamingPlatforms,
      pricing,
      posterUrl,
      trailerUrl,
     };
     console.log(movie);

     try {
      const response = await moviesRoute.createMovies(movie as any);
      console.log(response);
      toast.success("Movie added successfully");
     } catch (error: any) {
      console.error("Add movie error:", error);
      toast.error(error.response?.data?.message || error.message || "Failed to add movie");
     }
    //  redirect("/dashboard/admin/all-movies");
  }
  return (
    <div className="bg-white border border-gray-200 rounded-md p-6 sm:p-8 shadow-sm w-full max-w-4xl mx-auto text-black">
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight text-black mb-2 flex items-center gap-2">
          <Clapperboard className="w-6 h-6 text-[#D96C2C]" />
          Add New Movie
        </h2>
        <p className="text-gray-500">Fill out the details to add a new movie to the CineVerse catalog.</p>
      </div>

      <form onSubmit={createMovieAction} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-gray-700">Movie Title</label>
            <input 
              name="title"
              required
              placeholder="Inception" 
              className="w-full px-3 py-2 bg-white border border-gray-300 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D96C2C] focus:border-transparent rounded-md text-lg"
            />
          </div>

          {/* Synopsis */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-gray-700">Synopsis</label>
            <textarea 
              name="synopsis"
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
            Add Movie to Catalog
          </button>
        </div>
      </form>
    </div>
  );
}

