export default function Loading() {
  return (
    <main className="p-5 space-y-4 lg:w-[50%] lg:relative lg:left-[25%]">
      <div className="h-10 w-48 bg-gray-200 animate-pulse rounded mb-8" /> {/* Title Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="border rounded-xl p-4 space-y-4">
            <div className="aspect-square bg-gray-200 animate-pulse rounded-lg" />
            <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4" />
            <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2" />
          </div>
        ))}
      </div>
    </main>
  );
}