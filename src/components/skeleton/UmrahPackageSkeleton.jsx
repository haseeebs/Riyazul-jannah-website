const UmrahPackageSkeleton = () => {
  return (
    <div className="bg-lime-50">
      <div className="min-h-screen mx-auto max-w-7xl py-0 lg:py-10 bg-lime-50">
        {/* Hero Section Skeleton */}
        <div className="relative overflow-hidden bg-gray-300 px-6 py-24 sm:py-32 lg:px-8 rounded-none lg:rounded-3xl animate-pulse">
          <div className="mx-auto max-w-2xl text-center relative z-10">
            <div className="h-12 bg-gray-400 rounded w-3/4 mx-auto mb-6"></div>
            <div className="h-4 bg-gray-400 rounded w-full mx-auto mt-6"></div>
          </div>
        </div>

        {/* Packages Comparison Skeleton */}
        <div className="py-10">
          <div className="mx-auto max-w-7xl bg-lime-400 px-4 py-4 rounded-3xl">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
              <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto"></div>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section Skeleton */}
        <section className="py-0 pt-12 lg:py-32 px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="max-w-7xl mx-auto w-full">
            <div className="text-center mb-16">
              <div className="h-10 bg-gray-300 rounded w-1/2 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8 items-stretch">
              {/* Customer Satisfaction Card Skeleton */}
              <div className="bg-white/80 border border-lime-500 rounded-3xl mb-8 md:mb-0 p-6">
                <div className="h-16 w-16 bg-gray-300 rounded-full mx-auto mb-6"></div>
                <div className="h-8 bg-gray-300 rounded w-1/4 mx-auto mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto mb-6"></div>
                <div className="h-20 bg-gray-300 rounded w-full mx-auto"></div>
              </div>
              {/* What Sets Us Apart Skeleton */}
              <div className="bg-white/80 border border-lime-500 rounded-3xl col-span-2 p-6">
                <div className="h-8 bg-gray-300 rounded w-1/4 mb-6"></div>
                {[1, 2, 3].map((item) => (
                  <div key={item} className="mb-4 bg-lime-50 rounded-lg p-4">
                    <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-full"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Need Help Section Skeleton */}
        <div className="bg-lime-50 px-6 py-24 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="h-10 bg-gray-300 rounded w-3/4 mx-auto mb-6"></div>
            <div className="h-4 bg-gray-300 rounded w-full mx-auto mb-10"></div>
            <div className="h-12 bg-gray-300 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UmrahPackageSkeleton;