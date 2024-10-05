import { useState } from 'react';
import { ImagePlus } from 'lucide-react';
import packageServices from '../services/packageService';

const FoodGallery = ({ foodImages = [] }) => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

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
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {foodImages.map((image, index) => (
                            <div
                                key={image.$id}
                                className="relative group"
                            >
                                <div className="overflow-hidden rounded-lg shadow-md">
                                    <img
                                        src={packageServices.getFoodFilePreview(image.$id)}
                                        alt={image.alt || `Food photo ${index + 1}`}
                                        onClick={() => handleImageClick(image)}
                                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110 cursor-pointer"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Image Modal */}
                    {selectedImage && (
                        <div
                            className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4"
                            onClick={closeModal}
                        >
                            <div
                                className="max-w-4xl max-h-[90vh] overflow-hidden rounded-lg shadow-2xl"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <img
                                    src={packageServices.getFoodFilePreview(selectedImage.$id)}
                                    alt={selectedImage.alt || 'Food image'}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default FoodGallery;