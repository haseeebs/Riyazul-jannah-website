import { useEffect, useState } from "react";
import packageServices from "../../services/packageService";
import { useDispatch, useSelector } from "react-redux";
import { setPackages } from "../../store/packageSlice";
import PackageFormSkeleton from "../../components/skeleton/PackageFormSkeleton";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { parsePackages } from "../../utils/parsePackages";

const PackageForm = () => {
  const { id } = useParams();
  const isEditing = Boolean(id);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { packages } = useSelector(store => store.package);

  const [activeTab, setActiveTab] = useState(0);
  const { hotels, loading } = useSelector(store => store.package);
  const tabs = ["Basic Info", "Pricing & Duration", "Package Details"];

  // Form state
  const [formData, setFormData] = useState({
    type: "Budget",
    makkahHotelId: "",
    madinahHotelId: "",
    travelDate: "",
    image: "",
    durations: [
      {
        days: 15,
        basePrice: 75000,
        sharedRoomPrices: { quad: 75000, triple: 85000, double: 95000 },
      },
    ],
    inclusions: [{ description: "Special Ziyarat" }],
    exclusions: [{ description: "Visa Fees" }],
  });

  useEffect(() => {
    // If editing, fetch and populate form data
    if (isEditing && id) {
      const currentPackage = packages.find(pkg => pkg.$id === id);
      if (currentPackage) {
        setFormData({
          type: currentPackage.type,
          makkahHotelId: currentPackage.makkahHotelId,
          madinahHotelId: currentPackage.madinahHotelId,
          durations: currentPackage.durations,
          inclusions: currentPackage.inclusions,
          exclusions: currentPackage.exclusions,
          image: currentPackage.image,
          travelDate: currentPackage.travelDate
        });
      }
    }
  }, [isEditing, id, packages]);

  // Filter hotels by city
  const makkahHotels = hotels.filter(hotel => hotel?.city === "Makkah");
  const madinahHotels = hotels.filter(hotel => hotel?.city === "Madinah");

  // Selected hotels state for displaying details
  const [selectedMakkahHotel, setSelectedMakkahHotel] = useState(null);
  const [selectedMadinahHotel, setSelectedMadinahHotel] = useState(null);
  // Form validation state
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.makkahHotelId) newErrors.makkahHotelId = "Makkah hotel is required";
    if (!formData.madinahHotelId) newErrors.madinahHotelId = "Madinah hotel is required";
    if (!formData.image) newErrors.image = "Package image is required";
    // if (!formData.travelDate) newErrors.travelDate = "Travel date is required";

    formData.durations.forEach((duration, index) => {
      if (!duration.days) newErrors[`duration${index}Days`] = "Days are required";
      if (!duration.basePrice) newErrors[`duration${index}BasePrice`] = "Base price is required";
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Update selected hotel details
    if (name === "makkahHotelId") {
      const hotel = hotels.find(h => h.$id.toString() === value);
      setSelectedMakkahHotel(hotel);
    }
    if (name === "madinahHotelId") {
      const hotel = hotels.find(h => h.$id.toString() === value);
      setSelectedMadinahHotel(hotel);
    }
  };

  const handleDurationChange = (index, field, value) => {
    const newDurations = [...formData.durations];
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      newDurations[index][parent][child] = Number(value);
    } else {
      newDurations[index][field] = Number(value);
    }
    setFormData((prev) => ({
      ...prev,
      durations: newDurations,
    }));
  };

  const handleAddDuration = () => {
    setFormData((prev) => ({
      ...prev,
      durations: [
        ...prev.durations,
        {
          days: 0,
          basePrice: 0,
          sharedRoomPrices: { quad: 0, triple: 0, double: 0 },
        },
      ],
    }));
  };

  const handleDeleteDuration = (index) => {
    setFormData((prev) => ({
      ...prev,
      durations: prev.durations.filter((_, i) => i !== index),
    }));
  };

  const handleAddInclusion = () => {
    setFormData((prev) => ({
      ...prev,
      inclusions: [...prev.inclusions, { description: "" }],
    }));
  };

  const handleDeleteInclusion = (index) => {
    setFormData((prev) => ({
      ...prev,
      inclusions: prev.inclusions.filter((_, i) => i !== index),
    }));
  };

  const handleAddExclusion = () => {
    setFormData((prev) => ({
      ...prev,
      exclusions: [...prev.exclusions, { description: "" }],
    }));
  };

  const handleDeleteExclusion = (index) => {
    setFormData((prev) => ({
      ...prev,
      exclusions: prev.exclusions.filter((_, i) => i !== index),
    }));
  };

  const handleImageUpload = async (e) => {
    try {
      const file = e.target.files[0];
      if (file) {
        // Store current image as oldImage before updating
        const oldImage = formData.image;
        const response = await packageServices.fileUpload(file);
        if (response) {
          setFormData(prev => ({
            ...prev,
            oldImage: oldImage,
            image: response.$id
          }));
        }
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
    }
  };

  const handleRemoveImage = async () => {
    try {
      if (formData.image) {
        await packageServices.deleteFile(formData.image);

        setFormData(prev => ({
          ...prev,
          image: ""
        }));
      }
    } catch (error) {
      console.error("Error removing image:", error);
    }
  };

  const handleUpdatePackage = async (packageId, updatedData) => {
    // Create a promise-based toast for loading state
    const loadingToast = toast.loading('Updating package...');

    try {
      if (updatedData.oldImage) {
        const result = await packageServices.deleteFile(updatedData.oldImage);
        if(result){
          toast.success("Old image deleted successfully")
        } else {
          toast.error("Error deleting old file...")
        }
      }

      // Format the data similar to how it's done in PackageForm
      const formattedData = {
        type: updatedData.type,
        makkahHotelId: updatedData.makkahHotelId,
        madinahHotelId: updatedData.madinahHotelId,
        durations: updatedData.durations.map(duration => JSON.stringify(duration)),
        inclusions: updatedData.inclusions.map(inclusion =>
          JSON.stringify({ description: inclusion })),
        exclusions: updatedData.exclusions.map(exclusion =>
          JSON.stringify({ description: exclusion })),
        image: updatedData.image,
        travelDate: updatedData.travelDate
      };

      await packageServices.updatePackage(packageId, formattedData);
      
      // Fetch updated packages and update Redux store
      const packagesResponse = await packageServices.fetchPackages();
      const parsedPackages = parsePackages(packagesResponse);
      dispatch(setPackages(parsedPackages));

      // Dismiss loading toast and show success
      toast.dismiss(loadingToast);
      toast.success('Package updated successfully', {
        duration: 3000,
        position: 'top-right'
      });
      navigate('/packages');
    } catch (error) {
      console.error('Error updating package:', error);
      // Dismiss loading toast and show error
      toast.dismiss(loadingToast);
      toast.error(`Failed to update package: ${error.message}`, {
        duration: 4000,
        position: 'top-right'
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      let loadingToast;
      try {
        if (isEditing) {
          await handleUpdatePackage(id, formData);
        } else {
          // Show loading toast before the async operation
          loadingToast = toast.loading('Creating package...');

          const formattedData = {
            type: formData.type,
            makkahHotelId: formData.makkahHotelId,
            madinahHotelId: formData.madinahHotelId,
            durations: formData.durations.map(duration => JSON.stringify(duration)),
            inclusions: formData.inclusions.map(inclusion => JSON.stringify({ description: inclusion })),
            exclusions: formData.exclusions.map(exclusion => JSON.stringify({ description: exclusion })),
            image: formData.image,
            travelDate: formData.travelDate
          };

          await packageServices.addPackage(formattedData);

          const packagesResponse = await packageServices.fetchPackages();
          const parsedPackages = parsePackages(packagesResponse);
          dispatch(setPackages(parsedPackages));

          // Dismiss loading toast and show success
          toast.dismiss(loadingToast);
          toast.success('Package created successfully');

          // Optional: Reset form or navigate
          navigate('/packages');
        }
      } catch (error) {
        // Always check if loadingToast exists before dismissing
        if (loadingToast) {
          toast.dismiss(loadingToast);
        }

        console.error("Error creating/updating package:", error);

        // More detailed error handling
        const errorMessage = error.response?.message || error.message || 'An unexpected error occurred';

        toast.error(`Failed to ${isEditing ? 'update' : 'create'} package: ${errorMessage}`, {
          duration: 4000,
          position: 'top-right'
        });
      }
    }
  };

  if (loading || !hotels) {
    return <PackageFormSkeleton />
  }

  return (
    <div className="mx-auto max-w-7xl p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-3xl border border-lime-200 bg-white shadow-lg">
          <div className="border-b border-lime-100 p-4">
            <h2 className="text-2xl text-lime-800">Create New Package</h2>
            <p className="text-lime-600">
              Create a new travel package by filling in the details below
            </p>
          </div>

          <div className="p-4 space-y-6">
            {/* Tabs */}
            <div className="grid w-full grid-cols-3 bg-lime-50 p-1 rounded-xl">
              {tabs.map((tab, index) => (
                <button
                  key={tab}
                  type="button"
                  className={`rounded-lg py-2 ${activeTab === index ? "bg-lime-500 text-white" : ""}`}
                  onClick={() => setActiveTab(index)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === 0 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-lime-700">Package Image *</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className={`rounded-xl p-4 border ${errors.image ? "border-red-500" : "border-lime-200"
                      } focus:ring-lime-500 w-full`}
                  />
                  {errors.image && (
                    <p className="text-red-500 text-sm mt-1">{errors.image}</p>
                  )}
                  {formData.image && (
                    <div className="mt-2">
                      <img
                        src={packageServices.getOptimizedFilePreview(formData.image)}
                        alt="Package preview"
                        className="w-40 h-40 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="text-red-500 hover:bg-red-50 px-2 py-1 rounded"

                      >
                        Remove image
                      </button>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-lime-700">Package Type</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="rounded-xl p-4 border border-lime-200 focus:ring-lime-500 w-full cursor-pointer"
                  >
                    <option value="Budget">Budget</option>
                    <option value="Deluxe">Deluxe</option>
                    <option value="5-Star">5-Star</option>
                    <option value="Hajj">Hajj</option>
                  </select>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  {/* Makkah Hotel Selection */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-lime-700">Makkah Hotel *</label>
                      <select
                        name="makkahHotelId"
                        value={formData.makkahHotelId}
                        onChange={handleInputChange}
                        className={`rounded-xl p-4 border ${errors.makkahHotelId ? "border-red-500" : "border-lime-200"} focus:ring-lime-500 w-full cursor-pointer`}
                      >
                        <option value="">Select Makkah Hotel</option>
                        {makkahHotels.map(hotel => (
                          <option key={hotel.$id} value={hotel.$id}>
                            {hotel.name} - {hotel.category}
                          </option>
                        ))}
                      </select>
                      {errors.makkahHotelId && (
                        <p className="text-red-500 text-sm mt-1">{errors.makkahHotelId}</p>
                      )}
                    </div>

                    {selectedMakkahHotel && (
                      <div className="bg-lime-50 p-4 rounded-xl">
                        <h4 className="font-medium text-lime-800">{selectedMakkahHotel.name}</h4>
                        <p className="text-sm text-lime-600">Distance: {selectedMakkahHotel.distance}</p>
                        <p className="text-sm text-lime-600">Walking Time: {selectedMakkahHotel.walkingTime}</p>
                        <p className="text-sm text-lime-600">Transport: {selectedMakkahHotel.transport}</p>
                      </div>
                    )}
                  </div>

                  {/* Madinah Hotel Selection */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-lime-700">Madinah Hotel *</label>
                      <select
                        name="madinahHotelId"
                        value={formData.madinahHotelId}
                        onChange={handleInputChange}
                        className={`rounded-xl p-4 border ${errors.madinahHotelId ? "border-red-500" : "border-lime-200"} focus:ring-lime-500 w-full cursor-pointer`}
                      >
                        <option value="">Select Madinah Hotel</option>
                        {madinahHotels.map(hotel => (
                          <option key={hotel.$id} value={hotel.$id}>
                            {hotel.name} - {hotel.category}
                          </option>
                        ))}
                      </select>
                      {errors.madinahHotelId && (
                        <p className="text-red-500 text-sm mt-1">{errors.madinahHotelId}</p>
                      )}
                    </div>

                    {selectedMadinahHotel && (
                      <div className="bg-lime-50 p-4 rounded-xl">
                        <h4 className="font-medium text-lime-800">{selectedMadinahHotel.name}</h4>
                        <p className="text-sm text-lime-600">Distance: {selectedMadinahHotel.distance}</p>
                        <p className="text-sm text-lime-600">Walking Time: {selectedMadinahHotel.walkingTime}</p>
                        <p className="text-sm text-lime-600">Transport: {selectedMadinahHotel.transport}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-lime-700">Travel Date (optional)</label>
                  <input
                    name="travelDate"
                    type="month"
                    value={formData.travelDate}
                    onChange={handleInputChange}
                    className="rounded-xl p-4 border border-lime-200 focus:ring-lime-500 w-full cursor-pointer"
                  />
                </div>
              </div>
            )}

            {activeTab === 1 && (
              <div className="space-y-4">
                {formData.durations.map((duration, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-lime-200 bg-lime-50/50 p-4 space-y-4"
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg text-lime-800">
                        Duration Package {index + 1}
                      </h3>
                      {formData.durations.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleDeleteDuration(index)}
                          className="text-red-500 hover:bg-lime-100 px-2 py-1 rounded"
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="block text-lime-700">Number of Days *</label>
                        <input
                          type="number"
                          value={duration.days}
                          onChange={(e) =>
                            handleDurationChange(index, "days", e.target.value)
                          }
                          className="rounded-xl p-4 border border-lime-200 focus:ring-lime-500 w-full"
                          min="1"
                        />
                      </div>
                      <div>
                        <label className="block text-lime-700">Base Price (₹) *</label>
                        <input
                          type="number"
                          value={duration.basePrice}
                          onChange={(e) =>
                            handleDurationChange(index, "basePrice", e.target.value)
                          }
                          className="rounded-xl p-4 border border-lime-200 focus:ring-lime-500 w-full"
                          min="0"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                      <div>
                        <label className="block text-lime-700">Quad Room Price (₹)</label>
                        <input
                          type="number"
                          value={duration.sharedRoomPrices.quad}
                          onChange={(e) =>
                            handleDurationChange(
                              index,
                              "sharedRoomPrices.quad",
                              e.target.value
                            )
                          }
                          className="rounded-xl p-4 border border-lime-200 focus:ring-lime-500 w-full"
                          min="0"
                        />
                      </div>
                      <div>
                        <label className="block text-lime-700">Triple Room Price (₹)</label>
                        <input
                          type="number"
                          value={duration.sharedRoomPrices.triple}
                          onChange={(e) =>
                            handleDurationChange(
                              index,
                              "sharedRoomPrices.triple",
                              e.target.value
                            )
                          }
                          className="rounded-xl p-4 border border-lime-200 focus:ring-lime-500 w-full"
                          min="0"
                        />
                      </div>
                      <div>
                        <label className="block text-lime-700">Double Room Price (₹)</label>
                        <input
                          type="number"
                          value={duration.sharedRoomPrices.double}
                          onChange={(e) =>
                            handleDurationChange(
                              index,
                              "sharedRoomPrices.double",
                              e.target.value
                            )
                          }
                          className="rounded-xl p-4 border border-lime-200 focus:ring-lime-500 w-full"
                          min="0"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={handleAddDuration}
                  className="w-full rounded-xl border border-lime-400 text-lime-700 hover:bg-lime-50 py-2"
                >
                  Add Duration Package
                </button>
              </div>
            )}

            {activeTab === 2 && (
              <div className="space-y-6">
                {/* Inclusions */}
                <div className="space-y-4">
                  <h3 className="text-lg text-lime-800">Package Inclusions</h3>
                  {formData.inclusions.map((inclusion, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        value={inclusion.description}
                        onChange={(e) => {
                          const newInclusions = [...formData.inclusions];
                          newInclusions[index].description = e.target.value;
                          setFormData((prev) => ({
                            ...prev,
                            inclusions: newInclusions,
                          }));
                        }}
                        placeholder="Enter inclusion"
                        className="rounded-xl p-4 border border-lime-200 focus:ring-lime-500 flex-1"
                      />
                      <button
                        type="button"
                        onClick={() => handleDeleteInclusion(index)}
                        className="text-red-500 hover:bg-lime-100 px-4 rounded-xl"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddInclusion}
                    className="w-full rounded-xl border border-lime-400 text-lime-700 hover:bg-lime-50 py-2"
                  >
                    Add Inclusion
                  </button>
                </div>

                {/* Exclusions */}
                <div className="space-y-4">
                  <h3 className="text-lg text-lime-800">Package Exclusions</h3>
                  {formData.exclusions.map((exclusion, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        value={exclusion.description}
                        onChange={(e) => {
                          const newExclusions = [...formData.exclusions];
                          newExclusions[index].description = e.target.value;
                          setFormData((prev) => ({
                            ...prev,
                            exclusions: newExclusions,
                          }));
                        }}
                        placeholder="Enter exclusion"
                        className="rounded-xl p-4 border border-lime-200 focus:ring-lime-500 flex-1"
                      />
                      <button
                        type="button"
                        onClick={() => handleDeleteExclusion(index)}
                        className="text-red-500 hover:bg-lime-100 px-4 rounded-xl"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddExclusion}
                    className="w-full rounded-xl border border-lime-400 text-lime-700 hover:bg-lime-50 py-2"
                  >
                    Add Exclusion
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Navigation and Submit Buttons section should be updated as follows */}
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
                  {isEditing ? "Update Package" : "Create Package"}
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PackageForm;