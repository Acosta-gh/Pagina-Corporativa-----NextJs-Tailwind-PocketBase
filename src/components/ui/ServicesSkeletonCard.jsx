export function SkeletonCard() {
  return (
    <div className="bg-white rounded-sm p-8" style={{ border: '1px solid #ede8dc' }}>
      {/* Accent bar */}
      <div className="skeleton-box w-8 h-1 mb-5 rounded-full" />

      {/* Título */}
      <div className="skeleton-box h-6 w-2/3 mb-3 rounded" />

      {/* Descripción */}
      <div className="space-y-2 mb-6">
        <div className="skeleton-box h-4 w-full rounded" />
        <div className="skeleton-box h-4 w-full rounded" />
        <div className="skeleton-box h-4 w-3/4 rounded" />
      </div>

      {/* Features */}
      <ul className="space-y-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <li key={i} className="flex items-center gap-2">
            <div className="skeleton-box w-3.5 h-3.5 rounded-full flex-shrink-0" />
            <div className="skeleton-box h-3 rounded" style={{ width: `${[60, 75, 50, 65][i]}%` }} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ServicesSkeletonGrid({ count = 9 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </>
  );
}