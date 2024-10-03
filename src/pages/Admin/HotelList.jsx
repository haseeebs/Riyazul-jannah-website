import { useSelector, useDispatch } from 'react-redux';
import hotelServices from '../../services/hotelService';
import { removeHotel } from '../../store/packageSlice';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const HotelList = () => {
    const { hotels, packages } = useSelector((store) => store.package);
    const { status } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleEditHotel = (hotelId) => {
        navigate(`/edit-hotel/${hotelId}`);
    };

    const handleDeleteHotel = async (hotelId) => {
        const isHotelInUse = packages.some(pkg => pkg.makkahHotelId === hotelId || pkg.madinahHotelId === hotelId);

        if (isHotelInUse) {
            toast.error('Cannot delete hotel. It is associated with a package.');
            return;
        }
        // Confirm user intent to delete the hotel
        if (window.confirm('Are you sure you want to delete this hotel?')) {
            const deleteOperation = async () => {
                try {
                    // Find the hotel by ID from the existing hotels list
                    const hotel = hotels.find(h => h.$id === hotelId);

                    // Delete all associated images from storage, if any
                    if (hotel?.images?.length > 0) {
                        await Promise.all(
                            // Filter out empty or invalid image IDs before deletion
                            hotel.images
                                .filter(imgId => imgId && imgId.trim() !== '')
                                .map(imgId => hotelServices.deleteFile(imgId))
                        );
                    }

                    // Delete the hotel document from the database
                    await hotelServices.deleteHotel(hotelId);

                    // Update Redux store to reflect changes
                    dispatch(removeHotel(hotelId));
                } catch (error) {
                    // Log detailed error for debugging purposes
                    console.error('Error occurred while deleting hotel:', error);

                    // Handle specific error scenarios
                    if (error.message?.includes('network')) {
                        toast.error('Network issue detected. Please check your connection.');
                    }

                    // Rethrow error to be handled by toast.promise
                    throw error;
                }
            };

            // Show feedback to the user during the delete process
            toast.promise(deleteOperation(), {
                loading: 'Deleting hotel...',
                success: 'Hotel deleted successfully!',
                error: 'Failed to delete hotel. Please try again.'
            });
        }
    };

    return (
        <div className="mx-auto max-w-7xl p-6">
            <div className="rounded-3xl border border-lime-200 bg-white shadow-lg">
                <div className="border-b border-lime-100 p-4">
                    <h2 className="text-2xl text-lime-800">Hotel List</h2>
                    <p className="text-lime-600">
                        Manage and view the list of hotels
                    </p>
                </div>

                <div className="p-4 space-y-4">
                    {hotels.length === 0 ? (
                        <div className="text-center text-lime-600">
                            No hotels found. Add a new hotel to get started.
                        </div>
                    ) : (
                        hotels.map((hotel) => (
                            <div
                                key={hotel.$id}
                                className="rounded-xl border border-lime-200 p-4 flex justify-between items-center hover:bg-lime-50 transition-colors"
                            >
                                <div>
                                    <h3 className="text-lg font-semibold text-lime-800">{hotel.name}</h3>
                                    <div className="text-lime-600 space-y-1">
                                        <p>City: {hotel.city}</p>
                                        <p>Category: {hotel.category}</p>
                                        <p>Distance: {hotel.distance} from Haram</p>
                                    </div>
                                </div>

                                {status && (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEditHotel(hotel.$id)}
                                            className="px-4 py-2 rounded-xl bg-lime-100 text-lime-700 hover:bg-lime-200"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteHotel(hotel.$id)}
                                            className="px-4 py-2 rounded-xl bg-red-100 text-red-700 hover:bg-red-200"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default HotelList;