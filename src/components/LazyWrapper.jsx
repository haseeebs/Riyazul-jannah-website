import { Suspense } from "react";

const LoadingFallback = () => (
    <div className="flex justify-center items-center h-screen">
        <div>Loading...</div>
    </div>
);

const LazyWrapper = ({ children }) => (
    <Suspense fallback={<LoadingFallback />}>
        {children}
    </Suspense>
);

export default LazyWrapper;