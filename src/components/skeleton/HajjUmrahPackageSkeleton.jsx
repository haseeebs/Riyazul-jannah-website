const HajjUmrahPackageSkeleton = () => {
  return (
    <div className="pt-20 bg-lime-50">
      <div className="min-h-screen">
        <header className="sticky top-0 z-50 w-full bg-white shadow-md transition-all duration-300 py-4">
          <div className="container mx-auto px-4 flex items-center justify-between">
            <div className="w-16 h-6 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-48 h-8 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8 space-y-8 pb-24">
          <div className="bg-gradient-to-br from-lime-400 to-lime-500 rounded-3xl p-6 shadow-lg">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="space-y-2">
                  <div className="w-24 h-4 bg-lime-300 rounded animate-pulse"></div>
                  <div className="w-32 h-8 bg-white rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-3xl shadow-lg p-6">
            <div className="w-48 h-8 bg-gray-200 rounded animate-pulse mb-4"></div>
            <div className="w-full h-40 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="bg-white rounded-3xl shadow-lg p-6">
            <div className="w-64 h-8 bg-gray-200 rounded animate-pulse mb-6"></div>
            <div className="flex flex-wrap gap-3 mb-6">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="w-24 h-10 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="bg-lime-50 p-4 rounded-xl">
                  <div className="w-32 h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="w-24 h-6 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[...Array(2)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <div className="w-48 h-8 bg-gray-200 rounded animate-pulse mb-4"></div>
                <div className="w-full h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse mb-4"></div>
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-start mb-4">
                    <div className="w-4 h-4 bg-gray-200 rounded-full mr-3 mt-1"></div>
                    <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="bg-white rounded-3xl shadow-lg p-6">
            <div className="w-48 h-8 bg-gray-200 rounded animate-pulse mb-4"></div>
            <div className="w-full h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse mb-4"></div>
            <div className="grid md:grid-cols-2 gap-x-6 gap-y-4">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
          </div>
          <div className="w-full h-12 bg-lime-500 rounded-3xl animate-pulse"></div>
          <div className="w-full h-12 bg-red-500 rounded-3xl animate-pulse"></div>
        </main>
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4">
          <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <div className="w-32 h-8 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="w-full sm:w-48 h-12 bg-lime-500 rounded-xl animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HajjUmrahPackageSkeleton;