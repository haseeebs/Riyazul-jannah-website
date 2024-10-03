const HeroSkeleton = () => {
    return (
        <div className="relative w-full h-screen">
            {/* Hero Background Skeleton */}
            <div className="absolute inset-0 z-0 bg-lime-200 animate-pulse" />

            {/* Hero Content Skeleton */}
            <div className="relative z-10 container mx-auto px-4">
                <div className="py-24 md:py-32 lg:py-40 lg:pt-52 lg:pb-30 max-w-[800px]">
                    <div className="h-12 md:h-14 lg:h-16 w-3/4 bg-lime-400 rounded mb-6 animate-pulse" />
                    <div className="h-6 md:h-7 w-full max-w-[600px] bg-lime-400 rounded mb-4 animate-pulse" />
                    <div className="h-6 md:h-7 w-5/6 max-w-[500px] bg-lime-400 rounded mb-8 animate-pulse" />
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="h-12 w-40 bg-lime-400 rounded-md animate-pulse" />
                        <div className="h-12 w-56 bg-lime-400 rounded-md animate-pulse" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeroSkeleton;