'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-10 text-center">
      <h2 className="text-2xl font-bold text-gray-800">Something went wrong!</h2>
      <p className="text-gray-500 mt-2 mb-6">{error.message || "Failed to load products."}</p>
      <button
        onClick={() => reset()}
        className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
      >
        Try again
      </button>
    </div>
  );
}