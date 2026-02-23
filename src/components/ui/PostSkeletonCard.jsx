export function PostSkeletonCard() {
  return (
    <div
      className="bg-white rounded-sm overflow-hidden flex flex-col"
      style={{ border: '1px solid #ede8dc' }}
    >
      {/* Accent top bar */}
      <div className="skeleton-box h-1 w-full" />

      <div className="p-7 flex flex-col flex-1">
        {/* Categoría */}
        <div className="skeleton-box h-3 w-1/4 mb-3 rounded" />

        {/* Título */}
        <div className="space-y-2 mb-3">
          <div className="skeleton-box h-4 w-full rounded" />
          <div className="skeleton-box h-4 w-3/4 rounded" />
        </div>

        {/* Excerpt */}
        <div className="space-y-2 mb-4 flex-1">
          <div className="skeleton-box h-3 w-full rounded" />
          <div className="skeleton-box h-3 w-full rounded" />
          <div className="skeleton-box h-3 w-2/3 rounded" />
        </div>

        {/* Footer: fecha + flecha */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="skeleton-box w-3.5 h-3.5 rounded-full" />
            <div className="skeleton-box h-3 w-24 rounded" />
          </div>
          <div className="skeleton-box w-4 h-4 rounded" />
        </div>
      </div>
    </div>
  );
}

export function PostSkeletonGrid({ count = 9 }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <PostSkeletonCard key={i} />
      ))}
    </div>
  );
}