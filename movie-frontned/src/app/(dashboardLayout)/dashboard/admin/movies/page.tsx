
import AddMovieForm from "@/src/app/components/Layout/AddMovieForm";


export default function ManageMoviePage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl">

        {/* Card */}
        <div className="bg-white border border-black/10 shadow-xl rounded-2xl p-8">

          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-black tracking-tight">
              Add New Movie
            </h1>
            <p className="text-gray-500 mt-2 text-sm">
              Fill in the details to add a new movie.
            </p>
          </div>

          <div className="h-px bg-black/10 mb-8" />

          {/* Form */}
          <AddMovieForm />

        </div>
      </div>
    </div>
  );
}