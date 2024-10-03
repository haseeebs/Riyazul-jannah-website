import { useState } from 'react';
import { Link } from 'react-router-dom';
import SimpleState from './SimpleState';
import packageServices from '../services/packageService';
import NotificationBanner from './NotificationBanner';

const Hero = () => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    return (
        <div>
            {/* Hero Section */}
            <div className={`relative w-full`}>
                {/* Hero Background */}
                <div className="absolute inset-0 z-0">
                    {!isImageLoaded && (
                        <div className="w-full h-full bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-gradient-x"></div>
                    )}
                    <img
                        className={`w-full h-full object-cover bg-center transition-opacity duration-700 ${isImageLoaded ? 'opacity-100' : 'opacity-0'
                            }`}
                        src={packageServices.getFilePreview('67532310001c18214f1d')}
                        onLoad={() => setIsImageLoaded(true)}
                        alt="Umrah Journey"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-60" />
                </div>

                {/* Hero Content */}
                <div className="relative z-10 container mx-auto px-4">
                    <div className="py-24 md:py-32 lg:py-40 lg:pt-52 lg:pb-30 max-w-[800px]">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            Stress-Free Umrah Led by Knowledgeable Aalim
                        </h1>
                        <p className="text-lg md:text-xl text-white text-opacity-90 mb-8 max-w-[600px]">
                            Complete Care, Peaceful Travel, and Trusted Guidance for Your Umrah Journey — Backed by Over 10 Years of Experience.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                to="/packages"
                                className="inline-block rounded-md bg-lime-500 px-6 py-3 text-base font-medium text-white hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500"
                            >
                                View Packages
                            </Link>
                            <Link
                                to="/customize-package"
                                className="inline-block rounded-md bg-lime-50 bg-opacity-10 px-6 py-3 text-base font-medium text-white border border-white border-opacity-20 hover:bg-white hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500"
                            >
                                Customize Your Package
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Featured Package Card */}
                <NotificationBanner />
            </div>

            <SimpleState />
        </div>
    );
};

export default Hero;