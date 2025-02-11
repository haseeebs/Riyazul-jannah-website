import { ArrowLeft, Calendar, CalendarCheck, Check, Phone, Users, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import HotelCard from '../components/HotelCard';
import { getWhatsappUrl } from '../utils/whatsappUtils';
import packageServices from '../services/packageService';
import { removePackage, setFoodImages, setFoodImagesFetched } from '../store/packageSlice';
import toast from 'react-hot-toast';
import FoodGallery from '../components/FoodGallery';

const PackageDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isDeleting, setIsDeleting] = useState(false);

  const { status } = useSelector(store => store.auth);
  const { packages, hotels, commonInclusions, foodImages, foodImagesFetched } = useSelector((store) => store.package);

  const [selectedDays, setSelectedDays] = useState(null);
  const [pageError, setPageError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const currentPackage = packages.find((pkg) => pkg.$id === id);
  const makkahHotel = hotels.find((hotel) => hotel.$id === currentPackage?.makkahHotelId);
  const madinahHotel = hotels.find((hotel) => hotel.$id === currentPackage?.madinahHotelId);

  const [foodImagesError, setFoodImagesError] = useState(null);

  useEffect(() => {
    // Comprehensive package and hotel validation
    if (!currentPackage) {
      setPageError('Package not found. Invalid package ID.');
      toast.error('Package not found. Redirecting to packages...');
      setTimeout(() => navigate('/packages'), 2000);
      setIsLoading(false);
      return;
    }

    if (!makkahHotel || !madinahHotel) {
      setPageError('Hotel information is incomplete.');
      toast.error('Unable to load hotel details.');
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
  }, [currentPackage, makkahHotel, madinahHotel, id, navigate]);

  useEffect(() => {
    const fetchFoodImages = async () => {
      try {
        if (foodImages.length > 0) {
          console.log('Food images already loaded. Skipping fetch.');
          return;
        }

        const response = await packageServices.fetchFoodImages();
        dispatch(setFoodImagesFetched(true));

        if (!response || !response.files || response.files.length === 0) {
          throw new Error('No food images available');
        }
        dispatch(setFoodImages(response.files));
      } catch (error) {
        console.error(`Food images fetch error: ${error}`);
        setFoodImagesError('Failed to load food images');
      }
    };

    if (!foodImagesFetched) {
      fetchFoodImages();
    }
  }, []);

  // Set a sensible default for selectedDays
  useEffect(() => {
    if (currentPackage?.durations?.length > 0) {
      const sortedDurations = [...currentPackage.durations].sort((a, b) => a.days - b.days);
      setSelectedDays(sortedDurations[0].days);
    }
  }, [currentPackage]);

  const selectedDurationIndex = currentPackage?.durations?.findIndex(
    (duration) => duration.days === selectedDays
  ) ?? -1;

  // Safely retrieve data based on the selected duration index
  const basePrice =
    selectedDurationIndex >= 0 ? currentPackage.durations[selectedDurationIndex]?.basePrice : null;

  const sharedRoomPrices =
    selectedDurationIndex >= 0
      ? currentPackage.durations[selectedDurationIndex]?.sharedRoomPrices
      : null;

  const availableDurations = currentPackage?.durations
    ?.map((duration) => duration.days)
    .sort((a, b) => a - b);

    useEffect(() => {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth' 
      });
    }, []);

  const formatDate = (dateString) => {
    if (!dateString) return ''; // Return empty string if no date

    const options = {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };

  // Error State Rendering
  if (pageError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Oops! Something went wrong</h2>
          <p className="text-gray-700 mb-6">{pageError}</p>
          <button
            onClick={() => navigate('/packages')}
            className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition"
          >
            Back to Packages
          </button>
        </div>
      </div>
    );
  }

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-lime-600"></div>
      </div>
    );
  }

  const handleDeletePackage = async () => {
    if (window.confirm('Are you sure you want to delete this package? This action cannot be undone.')) {
      try {
        setIsDeleting(true);
        await toast.promise(
          (async () => {
            await packageServices.deletePackage(id);
            if (currentPackage.image) {
              await packageServices.deleteFile(currentPackage.image);
            }
            navigate('/packages');
            dispatch(removePackage(id));
          })(),
          {
            loading: 'Deleting package...',
            success: 'Package deleted successfully',
            error: 'Failed to delete package'
          }
        );
      } catch (error) {
        console.error('Delete failed:', error);
        // This catch block is now redundant due to toast.promise's error handling
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="min-h-screen pt-16">
      <header
        className="sticky top-0 z-10 w-full bg-white shadow-md transition-all duration-300"
      >

      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8 pb-24 mt-4">
        {/* Package Summary */}
        <div className="border border-lime-400 text-lime-600 rounded-3xl p-6 shadow-lg">
          <div className={`grid ${currentPackage.travelDate ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'} gap-6 items-center`}>
            <div className="space-y-2">
              <div className="text-gray-500">Starting From</div>
              <div className="text-3xl font-semibold">
                ₹{basePrice?.toLocaleString('en-IN') || 'N/A'}
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-gray-500">Duration</div>
              <div className="text-2xl font-semibold flex items-center gap-2">
                <Calendar className="w-6 h-6" />
                {selectedDays || 'Select'} Days
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-gray-500">Base Occupancy</div>
              <div className="text-2xl font-semibold flex items-center gap-2">
                <Users className="w-6 h-6" />
                Quad Sharing
              </div>
            </div>
            {currentPackage.travelDate && (
              <div className="space-y-2">
                <div className="text-gray-500">Travel Date</div>
                <div className="text-2xl font-semibold flex items-center gap-2">
                  <CalendarCheck className="w-6 h-6" />
                  <p>{formatDate(currentPackage.travelDate)}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Hotels Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <HotelCard hotel={makkahHotel} />
          <HotelCard hotel={madinahHotel} />
        </div>

        {/* Food Photos */}
        <FoodGallery foodImages={foodImages} />

        {/* Duration Tabs */}
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Choose Your Duration</h3>
          <div className="flex flex-wrap gap-3 mb-6">
            {availableDurations?.map((days) => (
              <button
                key={days}
                onClick={() => setSelectedDays(days)}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${selectedDays === days
                  ? 'bg-lime-500 text-white shadow-lg scale-105'
                  : 'bg-lime-50 text-lime-700 hover:bg-lime-100'
                  }`}
              >
                {days} Days
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {/* Pricing */}
            {['quad', 'triple', 'double'].map((type) => (
              <div key={type} className="bg-lime-50 p-4 rounded-xl">
                <div className="font-semibold text-gray-700">
                  {type.charAt(0).toUpperCase() + type.slice(1)} Sharing
                </div>
                <div className="text-xl font-bold text-lime-700">
                  ₹{sharedRoomPrices?.[type]?.toLocaleString('en-IN') || 'N/A'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add remaining sections like Inclusions, Exclusions, and Common Features */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Specific Package Inclusions */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Package Benefits</h3>
            <p className="text-gray-600 mb-4">
              Along with the common features, this package includes the following exclusive benefits:
            </p>
            {currentPackage.inclusions.length > 0 ? (
              <ul className="space-y-4">
                {currentPackage.inclusions.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="mt-1">
                      <Check className="w-5 h-5 text-lime-500" />
                    </div>
                    <span className="ml-3 text-gray-600">{item.description}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">
                This package includes all common features for a budget-friendly Umrah experience.
              </p>
            )}
          </div>

          {/* Specific Package Exclusions */}
          <div className="bg-white rounded-3xl shadow-lg p-6">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Not Included</h3>
            <p className="text-gray-600 mb-4">
              The following services and features are not included in this package:
            </p>
            {currentPackage.exclusions.length > 0 ? (
              <ul className="space-y-4">
                {currentPackage.exclusions.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="mt-1">
                      <X className="w-5 h-5 text-red-500" />
                    </div>
                    <span className="ml-3 text-gray-600">{item.description}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">
                All essential services are included in this comprehensive package.
              </p>
            )}
          </div>
        </div>

        {/* Common Inclusions */}
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">Standard Features</h3>
          <p className="text-gray-600 mb-4">
            Every package we offer comes with the following essentials to ensure a smooth and memorable Umrah journey:
          </p>
          <div className="grid md:grid-cols-2 gap-x-6 gap-y-4">
            {commonInclusions.length > 0 ? (
              commonInclusions.map((inclusion, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-lime-500" />
                  <span className="ml-3 text-gray-600">{inclusion.description}</span>
                </li>
              ))
            ) : (
              <p className="text-gray-500">No inclusions available at the moment.</p>
            )}
          </div>
        </div>
        {status && (
          <button
            onClick={() => navigate(`/edit-package/${id}`)}
            className="px-4 py-4 w-full bg-lime-500 text-white rounded-3xl hover:bg-lime-600"
          >
            Edit Package
          </button>
        )}
        {status && (
          <button
            onClick={handleDeletePackage}
            disabled={isDeleting}
            className="px-4 py-4 w-full bg-red-500 text-white rounded-3xl hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDeleting ? 'Deleting...' : 'Delete Package'}
          </button>
        )}
      </main>

      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-transparent p-4">
        <div className="container mx-auto flex sm:flex-row justify-between items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center border border-lime-600 text-lime-600 hover:text-lime-700 font-medium 
  bg-lime-50 rounded-xl px-4 py-2 hover:bg-lime-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
          <button className="w-full sm:w-auto flex items-center border border-lime-500 text-lime-100 hover:text-lime-700 font-medium 
  bg-lime-500 rounded-xl sm:px-6 sm:py-4 px-3 py-3 hover:bg-lime-100 transition-colors duration-300">
            <Phone className="w-5 h-5 mr-2" />
            <a href={getWhatsappUrl()} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackageDetail;