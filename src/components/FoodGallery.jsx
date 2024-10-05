import React, { useState } from 'react';
import { ImagePlus, ChevronLeft, ChevronRight } from 'lucide-react';
import packageServices from '../services/packageService';

const FoodGallery = ({ foodImages = [] }) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const MAX_INITIAL_IMAGES = 3; // Number of images to show initially

    const handleImageClick = (index) => {
        setSelectedImageIndex(index);
    };

    const closeModal = () => {
        setSelectedImageIndex(null);
    };

    const nextImage = () => {
        setSelectedImageIndex((prevIndex) =>
            prevIndex === foodImages.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevImage = () => {
        setSelectedImageIndex((prevIndex) =>
            prevIndex === 0 ? foodImages.length - 1 : prevIndex - 1
        );
    };

    const initialImages = foodImages.slice(0, MAX_INITIAL_IMAGES);
    const remainingImagesCount = foodImages.length - MAX_INITIAL_IMAGES;

    return (
        <div className="bg-white rounded-3xl shadow-lg p-6 space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-800">Food Gallery</h3>
                {foodImages.length > 0 && (
                    <div className="text-sm text-gray-500">
                        {foodImages.length} Photo{foodImages.length !== 1 ? 's' : ''}
                    </div>
                )}
            </div>

            {foodImages.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                    <ImagePlus className="w-12 h-12 text-gray-400 mb-4" />
                    <p className="text-gray-600 mb-4 text-center">
                        No food images available for this package.
                    </p>
                </div>
            ) : (
                <>
                    <p className="text-gray-600">
                        Get a glimpse of the delicious meals and dining experiences included in your package:
                    </p>

                    <div className="grid md:grid-cols-3 gap-4">
                        {initialImages.map((image, index) => (
                            <div
                                key={image.$id}
                                className="relative group"
                            >
                                <div className="overflow-hidden rounded-lg shadow-md">
                                    <img
                                        src={packageServices.getFoodFilePreview(image.$id)}
                                        alt={image.alt || `Food photo ${index + 1}`}
                                        onClick={() => handleImageClick(index)}
                                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110 cursor-pointer"
                                    />
                                </div>
                            </div>
                        ))}

                    </div>
                    {remainingImagesCount > 0 && (
                        <div
                            className="px-2 py-4 flex items-center justify-center bg-lime-200 text-lime-800 font-bold text-lg rounded-lg hover:bg-lime-300 transition-colors duration-300 cursor-pointer"
                            onClick={() => handleImageClick(MAX_INITIAL_IMAGES)}
                        >
                            +{remainingImagesCount} more
                        </div>
                    )}

                    {selectedImageIndex !== null && (
                        <div
                            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
                            onClick={closeModal}
                        >
                            <div
                                className="relative max-w-4xl max-h-[90vh] w-full"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    onClick={closeModal}
                                    className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 z-10"
                                >
                                    ✕
                                </button>

                                <button
                                    onClick={prevImage}
                                    className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-black/50 rounded-full p-2 z-10"
                                >
                                    <ChevronLeft />
                                </button>

                                <button
                                    onClick={nextImage}
                                    className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-black/50 rounded-full p-2 z-10"
                                >
                                    <ChevronRight />
                                </button>

                                <img
                                    src={packageServices.getFoodFilePreview(foodImages[selectedImageIndex].$id)}
                                    alt={foodImages[selectedImageIndex].alt || 'Food image'}
                                    className="w-full max-h-[90vh] object-contain"
                                />
                                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
                                    {selectedImageIndex + 1} of {foodImages.length}
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default FoodGallery;