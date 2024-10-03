const UmrahPackageCustomizationSkeleton = () => {
  return (
    <div className="min-h-screen bg-lime-50">
      <div className="mx-auto max-w-7xl p-6">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden animate-pulse">
          <div className="bg-lime-500 px-6 py-8">
            <div className="h-8 bg-white/50 rounded w-3/4 mx-auto mb-4"></div>
            <div className="h-4 bg-white/30 rounded w-full mx-auto"></div>
          </div>
          <div className="border-b border-lime-100 flex">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="flex-1 px-6 py-4">
                <div className="h-5 bg-gray-200 rounded w-3/4 mx-auto"></div>
              </div>
            ))}
          </div>
          <div className="p-6 space-y-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="h-5 bg-gray-200 rounded w-1/4"></div>
                <div className="h-10 bg-gray-100 rounded-xl w-full"></div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {[1, 2].map((_, index) => (
                  <div key={index} className="space-y-2">
                    <div className="h-5 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-10 bg-gray-100 rounded-xl w-full"></div>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                <div className="h-5 bg-gray-200 rounded w-1/4"></div>
                <div className="grid md:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((_, index) => (
                    <div key={index} className="h-14 bg-gray-100 rounded-xl"></div>
                  ))}
                </div>
                <div className="h-10 bg-gray-100 rounded-xl w-full"></div>
              </div>
            </div>
          </div>
          <div className="border-t border-lime-100 p-4 flex justify-between bg-lime-50">
            <div className="h-10 w-24 bg-gray-200 rounded-md"></div>
            <div className="h-10 w-24 bg-gray-200 rounded-md"></div>
          </div>
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden mt-6">
            <div className="bg-lime-500 px-6 py-8">
              <div className="h-7 bg-white/50 rounded w-3/4 mx-auto mb-4"></div>
              <div className="h-4 bg-white/30 rounded w-full mx-auto"></div>
            </div>
            <div className="p-6 space-y-6">
              {[1, 2, 3, 4].map((_, index) => (
                <div key={index} className="flex items-center space-x-4 bg-lime-50 rounded-xl p-4">
                  <div className="w-full">
                    <div className="h-5 bg-gray-200 rounded w-1/4 mb-2"></div>
                    <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                  </div>
                </div>
              ))}
              <div className="bg-lime-50 rounded-xl p-4">
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="h-4 bg-gray-100 rounded w-24 mb-2"></div>
                    <div className="h-8 bg-gray-200 rounded w-32"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UmrahPackageCustomizationSkeleton;