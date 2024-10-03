const CardSkeleton = () => (
  <div className="w-full max-w-sm rounded-2xl bg-white shadow-lg p-4 animate-pulse">
    <div className="h-48 bg-gray-200 rounded-xl mb-4"></div>
    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
    <div className="h-10 bg-gray-200 rounded-full"></div>
  </div>
);

const PackagesSkeleton = () => {
  return (
    <div className="mx-auto max-w-7xl p-1 bg-gradient-to-b from-lime-500 to-lime-400 rounded-3xl">
      <div className="bg-white rounded-3xl p-8">
        <div className="h-10 bg-gray-200 rounded w-3/4 mx-auto mb-12"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>
    </div>
  );
};

export default PackagesSkeleton;