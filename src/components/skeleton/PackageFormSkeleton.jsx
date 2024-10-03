const PackageFormSkeleton = () => {
  return (
    <div className="mx-auto max-w-7xl p-6 bg-lime-50">
      <div className="rounded-3xl border border-lime-200 bg-white shadow-lg">
        <div className="border-b border-lime-100 p-4">
          <div className="h-8 w-64 bg-lime-200" />
          <div className="h-4 w-96 mt-2 bg-lime-100" />
        </div>

        <div className="p-4 space-y-6">
          {/* Tabs Skeleton */}
          <div className="grid w-full grid-cols-3 bg-lime-50 p-1 rounded-xl">
            {[0, 1, 2].map((_, index) => (
              <div key={index} className="h-10 rounded-lg bg-lime-200" />
            ))}
          </div>

          {/* Content Skeleton */}
          <div className="space-y-4">
            <div className="h-40 w-full rounded-xl bg-lime-100" />
            <div className="grid gap-4 md:grid-cols-2">
              <div className="h-20 rounded-xl bg-lime-100" />
              <div className="h-20 rounded-xl bg-lime-100" />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <div className="h-10 w-full rounded-xl bg-lime-100" />
                <div className="h-32 w-full rounded-xl bg-lime-50" />
              </div>
              <div className="space-y-2">
                <div className="h-10 w-full rounded-xl bg-lime-100" />
                <div className="h-32 w-full rounded-xl bg-lime-50" />
              </div>
            </div>
            <div className="h-14 w-full rounded-xl bg-lime-100" />
          </div>
        </div>

        {/* Navigation and Submit Buttons Skeleton */}
        <div className="border-t border-lime-100 p-4 flex justify-between">
          <div className="h-10 w-24 rounded-xl bg-lime-200" />
          <div className="h-10 w-24 rounded-xl bg-lime-500" />
        </div>
      </div>
    </div>
  )
}

export default PackageFormSkeleton