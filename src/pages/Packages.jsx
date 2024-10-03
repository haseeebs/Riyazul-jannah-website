import { useState } from 'react';
import CTA from '../components/CTA';
import PackageComparison from '../components/PackageComparison';
import WhyChooseUs from '../components/WhyChooseUs';
import packageServices from '../services/packageService';

const Packages = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div className="min-h-screen mx-auto max-w-7xl py-0 lg:py-10 lg:pt-28 bg-lime-50">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 sm:py-32 lg:px-8 rounded-none lg:rounded-3xl">
        {/* Gradient Placeholder */}
        {!isImageLoaded && (
          <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-gradient-x"></div>
        )}
        <img
          alt=""
          src={packageServices.getFilePreview('675324460026600732d8')}
          className={`absolute inset-0 -z-10 h-full w-full object-cover transition-opacity duration-700 ${
            isImageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsImageLoaded(true)}
        />
        {/* Add a dark overlay */}
        <div className="absolute inset-0 bg-black/50 -z-5"></div>

        <div className="mx-auto max-w-2xl text-center relative z-10">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Umrah Packages for Every Budget
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            From Economy to 5-Star Luxury, Tailored to Your Comfort & Budget
          </p>
        </div>
      </div>

      <div className="py-10">
        <PackageComparison />
      </div>

      <WhyChooseUs />

      <CTA />
    </div>
  );
};

export default Packages;