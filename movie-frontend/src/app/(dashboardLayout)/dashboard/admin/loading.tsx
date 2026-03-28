import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center py-20 text-gray-600 animate-pulse">
      
      {/* Spinner */}
      <Loader2 className="w-8 h-8 animate-spin text-[#D96C2C] mb-4" />

      {/* Text */}
      <p className="text-sm font-medium">Loading users...</p>

      {/* Fake table skeleton */}
      <div className="w-full max-w-4xl mt-10 space-y-4">
        {[1, 2, 3, 4, 5].map((item) => (
          <div
            key={item}
            className="flex items-center justify-between bg-gray-100 rounded-md px-6 py-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-300 rounded-full" />
              <div className="space-y-2">
                <div className="w-32 h-3 bg-gray-300 rounded" />
                <div className="w-24 h-3 bg-gray-200 rounded" />
              </div>
            </div>

            <div className="w-20 h-3 bg-gray-300 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}