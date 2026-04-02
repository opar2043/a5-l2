
import Image from "next/image";
import { MOVIE } from "../types/movies.type";
import Link from "next/link";

type Props = {
  m: MOVIE;
};

export default function MovieCard({ m }: Props) {
  return (
    <div className=" bg-white rounded-md shadow-md overflow-hidden hover:shadow-lg transition">
      
      {/* Image */}
      <div className="h-48 bg-gray-200">
        <Image
          src={m.posterUrl || "/placeholder.jpg"}
          alt={m.title}
          width={300}
          height={400}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h2 className="text-lg font-semibold">{m.title}</h2>
        <p className="text-sm text-gray-500">{m.releaseYear}</p>

        <p className="text-sm mt-2 line-clamp-2">
          {m.synopsis || "No description available"}
        </p>

        <div className="mt-3 flex justify-between items-center">
          <span className="text-xs bg-gray-200 px-2 py-1 rounded">
            {m.pricing}
          </span>

          <Link href={`/movies/${m.id}`} className="text-sm text-blue-600 hover:underline">
            View
          </Link>
        </div>
      </div>
    </div>
  );
}