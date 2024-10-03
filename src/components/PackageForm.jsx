import { useState } from "react";

const PackageForm = () => {
  // Form tabs state
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["Basic Info", "Pricing & Duration", "Package Details"];

  // Form state
  const [formData, setFormData] = useState({
    type: "Budget",
    makkahHotel: "",
    madinahHotel: "",
    travelDate: "",
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

  // Form validation state
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.makkahHotel) newErrors.makkahHotel = "Makkah hotel is required";
    if (!formData.madinahHotel) newErrors.madinahHotel = "Madinah hotel is required";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form Data:", formData);
      alert("Package created successfully!");
    } else {
      alert("Please fill in all required fields");
    }
  };

  return (
    <div className="mx-auto max-w-7xl p-6 bg-lime-50">
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
                <div>
                  <label className="block text-lime-700">Package Type</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="rounded-xl p-4 border border-lime-200 focus:ring-lime-500 w-full"
                  >
                    <option value="Budget">Budget</option>
                    <option value="Deluxe">Deluxe</option>
                    <option value="5-Star">5-Star</option>
                    <option value="Hajj">Hajj</option>
                  </select>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-lime-700">Makkah Hotel *</label>
                    <input
                      name="makkahHotel"
                      value={formData.makkahHotel}
                      onChange={handleInputChange}
                      placeholder="Select Makkah Hotel"
                      className={`rounded-xl p-4 border ${errors.makkahHotel ? "border-red-500" : "border-lime-200"
                        } focus:ring-lime-500 w-full`}
                    />
                    {errors.makkahHotel && (
                      <p className="text-red-500 text-sm mt-1">{errors.makkahHotel}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-lime-700">Madinah Hotel *</label>
                    <input
                      name="madinahHotel"
                      value={formData.madinahHotel}
                      onChange={handleInputChange}
                      placeholder="Select Madinah Hotel"
                      className={`rounded-xl p-4 border ${errors.madinahHotel ? "border-red-500" : "border-lime-200"
                        } focus:ring-lime-500 w-full`}
                    />
                    {errors.madinahHotel && (
                      <p className="text-red-500 text-sm mt-1">{errors.madinahHotel}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-lime-700">Travel Date ( optional )</label>
                  <input
                    name="travelDate"
                    type="month"
                    value={formData.travelDate}
                    onChange={handleInputChange}
                    className={`rounded-xl p-4 border ${errors.travelDate ? "border-red-500" : "border-lime-200"
                      } focus:ring-lime-500 w-full`}
                  />
                  {errors.travelDate && (
                    <p className="text-red-500 text-sm mt-1">{errors.travelDate}</p>
                  )}
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
                  Create Package
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