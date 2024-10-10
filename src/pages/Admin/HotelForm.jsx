import { useEffect, useState } from "react";
import hotelServices from "../../services/hotelService";
import { setHotels } from "../../store/packageSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import packageServices from "../../services/packageService";

const HotelForm = () => {
    const { id } = useParams();
    const isEditing = Boolean(id);
    const { hotels } = useSelector(store => store.package);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState(0);
    const tabs = ["Basic Info", "Location & Transport", "Images"];

    const [hotelData, setHotelData] = useState({
        city: "Makkah",
        name: "",
        category: "Economy",
        distance: "",
        walkingTime: "",
        hasShuttle: false,
        transport: "",
        images: []
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (isEditing && id) {
            const currentHotel = hotels.find(hotel => hotel.$id === id);

            if (currentHotel) {
                setHotelData({
                    city: currentHotel.ciry,
                    name: currentHotel.name,
                    category: currentHotel.category,
                    distance: currentHotel.distance,
                    walkingTime: currentHotel.walkingTime,
                    hasShuttle: currentHotel.hasShuttle,
                    transport: currentHotel.transport,
                    images: currentHotel.images
                })
            }
        }
    }, [])

    const validateForm = () => {
        const newErrors = {};

        if (!hotelData.name) newErrors.name = "Hotel name is required";
        if (!hotelData.distance) newErrors.distance = "Distance is required";
        if (!hotelData.walkingTime) newErrors.walkingTime = "Walking time is required";
        // if (!hotelData.transport) newErrors.transport = "Transport details are required";
        if (hotelData.images.length === 0) newErrors.images = "At least one image is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        setHotelData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleDeleteImage = async (index) => {
        try {
            const imageId = hotelData.images[index];
            if (imageId) {
                await hotelServices.deleteFile(imageId);
                console.log(`Image with ID ${imageId} deleted successfully.`);
                toast.success(`Image deleted successfully.`);
            }

            setHotelData((prev) => ({
                ...prev,
                images: prev.images.filter((_, i) => i !== index),
            }));
        } catch (error) {
            console.error("Error deleting image:", error);
            toast.error("Failed to delete the image. Please try again.");
        }
    };

    // Handle multiple images upload with improved file tracking
    const handleMultipleImageUpload = async (e) => {
        try {
            const files = Array.from(e.target.files);

            if (files.length > 0) {
                // Upload multiple files with Promise.all for concurrent uploads
                const uploadPromises = files.map(async (file) => {
                    try {
                        const response = await hotelServices.fileUpload(file);
                        return response.$id;
                    } catch (error) {
                        console.error(`Error uploading image ${file.name}:`, error);
                        toast.error(`Failed to upload ${file.name}`);
                        return null;
                    }
                });

                const uploadedImages = await Promise.all(uploadPromises);

                // Filter out any null values (failed uploads)
                const validImages = uploadedImages.filter(imageId => imageId !== null);

                // Add new images to existing images
                setHotelData(prev => ({
                    ...prev,
                    images: [...prev.images, ...validImages]
                }));

                if (validImages.length > 0) {
                    toast.success(`${validImages.length} image(s) uploaded successfully`);
                }
            }
        } catch (error) {
            console.error("Error uploading multiple images:", error);
            toast.error("Failed to upload images");
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                if (isEditing) {
                    const loadingToast = toast.loading('Updating hotel...');

                    await hotelServices.updateHotel(id, { ...hotelData });

                    const hotelsResponse = await hotelServices.fetchHotels();
                    dispatch(setHotels(hotelsResponse.documents));

                    toast.dismiss(loadingToast);
                    toast.success("Hotel updated successfully!");
                    navigate('/hotel-lists');
                } else {
                    await toast.promise(
                        hotelServices.addHotel({ ...hotelData }),
                        {
                            loading: 'Adding hotel...',
                            success: 'Hotel added successfully!',
                            error: 'Failed to add hotel'
                        }
                    );

                    const hotelsResponse = await hotelServices.fetchHotels();
                    dispatch(setHotels(hotelsResponse.documents));

                    navigate('/hotel-lists');
                }

                // Reset form
                setHotelData({
                    city: "Makkah",
                    name: "",
                    category: "Economy",
                    distance: "",
                    walkingTime: "",
                    hasShuttle: false,
                    transport: "",
                    images: []
                });
            } catch (error) {
                console.error(isEditing ? "Error updating hotel:" : "Error adding hotel:", error);
                toast.error(isEditing ? "Failed to update hotel" : "Failed to add hotel");
            }
        } else {
            toast.error("Please fill in all required fields");
        }
    };

    return (
        <div className="mx-auto container min-h-screen pt-28 p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="rounded-3xl border border-lime-200 bg-white shadow-lg">
                    <div className="border-b border-lime-100 p-4">
                        <h2 className="text-2xl text-lime-800">Add New Hotel</h2>
                        <p className="text-lime-600">
                            Add a new hotel by filling in the details below
                        </p>
                    </div>

                    <div className="p-4 space-y-6">
                        {/* Tabs */}
                        <div className="grid w-full grid-cols-3 bg-lime-50 p-1 rounded-xl">
                            {tabs.map((tab, index) => (
                                <button
                                    key={tab}
                                    type="button"
                                    className={`rounded-lg py-2 ${activeTab === index ? "bg-lime-500 text-white" : ""
                                        }`}
                                    onClick={() => setActiveTab(index)}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        {activeTab === 0 && (
                            <div className="space-y-4">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="block text-lime-700">City *</label>
                                        <select
                                            name="city"
                                            value={hotelData.city}
                                            onChange={handleInputChange}
                                            className="rounded-xl p-4 border border-lime-200 focus:ring-lime-500 w-full cursor-pointer"
                                        >
                                            <option value="Makkah">Makkah</option>
                                            <option value="Madinah">Madinah</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-lime-700">Category *</label>
                                        <select
                                            name="category"
                                            value={hotelData.category}
                                            onChange={handleInputChange}
                                            className="rounded-xl p-4 border border-lime-200 focus:ring-lime-500 w-full cursor-pointer"
                                        >
                                            <option value="Budget">Budget</option>
                                            <option value="Economy">Economy</option>
                                            <option value="Deluxe">Deluxe</option>
                                            <option value="5 Star">5 Star</option>
                                            <option value="Hajj">Hajj</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-lime-700">Hotel Name *</label>
                                    <input
                                        name="name"
                                        value={hotelData.name}
                                        onChange={handleInputChange}
                                        placeholder="Enter hotel name"
                                        className={`rounded-xl p-4 border ${errors.name ? "border-red-500" : "border-lime-200"
                                            } focus:ring-lime-500 w-full`}
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === 1 && (
                            <div className="space-y-4">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="block text-lime-700">Distance from Haram *</label>
                                        <input
                                            name="distance"
                                            value={hotelData.distance}
                                            onChange={handleInputChange}
                                            placeholder="e.g. 700m"
                                            className={`rounded-xl p-4 border ${errors.distance ? "border-red-500" : "border-lime-200"
                                                } focus:ring-lime-500 w-full`}
                                        />
                                        {errors.distance && (
                                            <p className="text-red-500 text-sm mt-1">{errors.distance}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-lime-700">Walking Time *</label>
                                        <input
                                            name="walkingTime"
                                            value={hotelData.walkingTime}
                                            onChange={handleInputChange}
                                            placeholder="e.g. 8-10 mins"
                                            className={`rounded-xl p-4 border ${errors.walkingTime ? "border-red-500" : "border-lime-200"
                                                } focus:ring-lime-500 w-full`}
                                        />
                                        {errors.walkingTime && (
                                            <p className="text-red-500 text-sm mt-1">{errors.walkingTime}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            name="hasShuttle"
                                            checked={hotelData.hasShuttle}
                                            onChange={handleInputChange}
                                            className="rounded border-lime-300 text-lime-500 focus:ring-lime-500 mr-2"
                                        />
                                        <label className="text-lime-700">Has Shuttle Service</label>
                                    </div>

                                    <div>
                                        <label className="block text-lime-700">Transport Details *</label>
                                        <input
                                            name="transport"
                                            value={hotelData.transport}
                                            onChange={handleInputChange}
                                            placeholder="e.g. Free Shuttle Bus (5 min journey)"
                                            className={`rounded-xl p-4 border ${errors.transport ? "border-red-500" : "border-lime-200"
                                                } focus:ring-lime-500 w-full`}
                                        />
                                        {errors.transport && (
                                            <p className="text-red-500 text-sm mt-1">{errors.transport}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 2 && (
                            <div className="space-y-4">
                                <h3 className="text-lg text-lime-800">Hotel Images</h3>

                                {/* Multiple image upload input */}
                                <div className="mb-4">
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleMultipleImageUpload}
                                        className="rounded-xl p-4 border border-lime-200 focus:ring-lime-500 w-full"
                                    />
                                    {errors.images && (
                                        <p className="text-red-500 text-sm mt-1">{errors.images}</p>
                                    )}
                                </div>

                                {/* Display uploaded images */}
                                {hotelData.images.length > 0 && (
                                    <div className="grid grid-cols-3 gap-4">
                                        {hotelData.images.map((imageId, index) => (
                                            <div key={index} className="relative">
                                                <img
                                                    src={packageServices.getOptimizedFilePreview(imageId)}
                                                    alt={`Hotel image ${index + 1}`}
                                                    className="w-full h-40 object-cover rounded-lg"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => handleDeleteImage(index)}
                                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 text-xs"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Navigation and Submit Buttons */}
                    <div className="border-t border-lime-100 p-4 flex justify-between">
                        <button
                            type="button"
                            onClick={() => setActiveTab(Math.max(0, activeTab - 1))}
                            className={`px-4 py-2 rounded-xl ${activeTab === 0
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : "bg-lime-100 text-lime-700 hover:bg-lime-200"
                                }`}
                            disabled={activeTab === 0}
                        >
                            Previous
                        </button>

                        <div className="flex gap-2">
                            {activeTab < tabs.length - 1 && (
                                <button
                                    type="button"
                                    onClick={() => setActiveTab(activeTab + 1)}
                                    className="px-4 py-2 rounded-xl bg-lime-500 text-white hover:bg-lime-600"
                                >
                                    Next
                                </button>
                            )}
                            {activeTab === tabs.length - 1 && (
                                <button
                                    type="submit"
                                    className="px-4 py-2 rounded-xl bg-lime-500 text-white hover:bg-lime-600"
                                >
                                    {isEditing ? "Update Hotel" : "Add Hotel"}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default HotelForm;