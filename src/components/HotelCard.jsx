import { X, Star, MapPin, Clock, Bus, ChevronRight, ChevronLeft } from "lucide-react";
import { useState } from "react";
import packageServices from "../services/packageService";

const HotelCard = ({ hotel }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedHotel, setSelectedHotel] = useState(null);

    const openImageModal = (hotel) => {
        setSelectedHotel(hotel);
        setCurrentImageIndex(0);
        setIsModalOpen(true);
    };

    const nextImage = () => {
        if (selectedHotel) {
            setCurrentImageIndex((prev) =>
                (prev + 1) % selectedHotel.images.length
            );
        }
    };

    const prevImage = () => {
        if (selectedHotel) {
            setCurrentImageIndex((prev) =>
                (prev - 1 + selectedHotel.images.length) % selectedHotel.images.length
            );
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{hotel.name}</h3>
                <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{hotel.city}, {hotel.distance} from Haram</span>
                </div>

                <div
                    className="relative w-full aspect-video mb-4 cursor-pointer overflow-hidden rounded-lg"
                    onClick={() => openImageModal(hotel)}
                >
                    <img
                        src={hotel.images && packageServices.getFilePreview(hotel.images[0])}
                        alt={hotel.name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
                        {hotel.images.length} photos
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-2" />
                        <span>{hotel.category}</span>
                    </div>
                    {!hotel.hasShuttle && (
                        <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2" />
                            <span>{hotel.walkingTime} walk to Haram</span>
                        </div>
                    )}
                    {hotel.hasShuttle && (
                        <div className="flex items-center">
                            <Bus className="w-4 h-4 mr-2" />
                            <span>{hotel.transport}</span>
                        </div>
                    )}
                </div>

            </div>

            {/* Image Modal */}
            {isModalOpen && selectedHotel && (
                <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
                    <div className="relative w-full max-w-4xl">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute -top-10 right-0 text-white hover:text-gray-300"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                            <img
                                src={packageServices.getFilePreview(selectedHotel.images[currentImageIndex])}
                                alt={`${selectedHotel.name} - Image ${currentImageIndex + 1}`}
                                className="w-full h-full object-contain"
                            />

                            <button
                                onClick={prevImage}
                                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 text-white hover:text-gray-300"
                            >
                                <ChevronLeft className="w-8 h-8" />
                            </button>

                            <button
                                onClick={nextImage}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-white hover:text-gray-300"
                            >
                                <ChevronRight className="w-8 h-8" />
                            </button>

                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full">
                                {currentImageIndex + 1} / {selectedHotel.images.length}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default HotelCard