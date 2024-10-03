import { CircleCheck, Group, Lock, User, Users } from 'lucide-react';
import { useState, useEffect } from 'react';
import SelectMenu from '../../components/Form components/SelectMenu';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import FormInput from '../../components/Form components/FormInput';
import PackageSummary from '../../components/PackageSummary';
import packageServices from '../../services/packageService';

const CustomizePackage = () => {
  const { commonInclusions } = useSelector(store => store.package);

  const [formState, setFormState] = useState({
    packageType: 'customized',
    hotelCategory: '',
    travelMode: '',
    flightType: '',
    date: {
      from: new Date(),
      to: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
    },
    numberOfDays: 7,
    roomSharing: '',
    inclusions: [],
    groupSize: '',
    customGroupSize: '',
    activeTab: 0,
    contactDetails: {
      fullName: '',
      phoneNumber: '',
      email: '',
      specialRequests: '',
    },
    contactErrors: {},
    formError: '',
  });

  const [inclusions, setInclusions] = useState([]);
  const tabs = ["Basic Info", "Travel & Stay", "Contact Details"];

  const updateState = (field, value) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  };

  const updateNestedState = (parentField, field, value) => {
    setFormState(prev => ({
      ...prev,
      [parentField]: {
        ...prev[parentField],
        [field]: value,
      },
    }));
  };

  useEffect(() => {
    const calculateDays = () => {
      const fromDate = new Date(formState.date.from);
      const toDate = new Date(formState.date.to);
      const timeDifference = toDate - fromDate;
      const days = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
      updateState('numberOfDays', days);
    };

    calculateDays();
  }, [formState.date]);

  const validateContactDetails = () => {
    const errors = {};
    const { fullName, phoneNumber, email } = formState.contactDetails;

    if (!fullName.trim()) errors.fullName = 'Full Name is required';
    if (!/^[0-9]{10}$/.test(phoneNumber.trim())) errors.phoneNumber = 'Invalid phone number';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errors.email = 'Invalid email';

    updateState('contactErrors', errors);
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateContactDetails();
    if (Object.keys(errors).length > 0) return;

    try {
      const formData = {
        packageDetails: {
          packageType: formState.packageType,
          hotelCategory: formState.hotelCategory,
          groupSize: formState.customGroupSize || formState.groupSize,
          travelMode: formState.travelMode,
          flightType: formState.flightType,
          travelDates: JSON.stringify(formState.date),
          roomSharing: formState.roomSharing,
          inclusions: inclusions
        },
        contactDetails: formState.contactDetails,
      };

      await packageServices.addCustomizePackageRequest({ ...formData.packageDetails, ...formData.contactDetails });

      // Reset form after successful submission
      setFormState(prev => ({
        ...prev,
        hotelCategory: '',
        travelMode: '',
        flightType: '',
        roomSharing: '',
        inclusions: [],
        groupSize: '',
        customGroupSize: '',
        contactDetails: {
          fullName: '',
          phoneNumber: '',
          email: '',
          specialRequests: '',
        },
        formError: '',
        contactErrors: {},
      }));

      // First personalized toast
      toast.success(`Jazak Allah Khair, ${formState.contactDetails.fullName}! Your spiritual journey to Umrah is being prepared.`, {
        duration: 5000,
        icon: '✨🕌'
      });

      // Second confirmation toast
      setTimeout(() => {
        toast.success('Your Umrah package request is received. May Allah make your journey blessed and smooth.', {
          duration: 5500,
          icon: '🤲'
        });
      }, 5000);

    } catch (error) {
      console.error('Error submitting package request:', error);

      // Error notification
      toast.error('Failed to submit package request. Please try again.', {
        duration: 4000,
        position: 'top-center'
      });
    }
  };

  const handleInclusionChange = (inclusion) => {
    setInclusions(prev =>
      prev.includes(inclusion)
        ? prev.filter(i => i !== inclusion)
        : [...prev, inclusion]
    );
  };

  return (
    <div className="min-h-screen bg-lime-50 pt-28">
      <div className="mx-auto max-w-7xl pb-14">
        <form
          onSubmit={() => handleSubmit}
          className="bg-white rounded-3xl shadow-xl overflow-hidden"
        >
          {/* Header Section */}
          <div className="bg-lime-500 px-6 py-8">
            <h1 className="text-3xl font-bold text-white text-center">
              Customize Your Umrah Package
            </h1>
            <p className="text-emerald-50 text-center mt-2">
              Create your perfect spiritual journey with our customizable packages
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-lime-100 flex">
            {tabs.map((tab, index) => (
              <button
                key={tab}
                type="button"
                className={`
                  flex-1 px-6 py-4 text-sm font-medium 
                  transition-all duration-300
                  ${formState.activeTab === index
                    ? "bg-lime-50 border-b-2 border-lime-500 text-lime-600"
                    : "text-gray-500 hover:bg-lime-50/50"
                  }
                `}
                onClick={() => updateState('activeTab', index)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Form Content */}
          <div className="p-6 space-y-6">
            {formState.activeTab === 0 && (
              <div className="space-y-6">
                <FormInput
                  label="Package Type"
                  value="Customize Package"
                  disabled
                  icon={Lock}
                />

                <div className="grid md:grid-cols-2 gap-4">
                  <FormInput
                    type="date"
                    label="From Date"
                    value={formState.date.from.toISOString().split('T')[0]}
                    onChange={(e) => updateNestedState('date', 'from', new Date(e.target.value))}
                  />
                  <FormInput
                    type="date"
                    label="To Date"
                    value={formState.date.to.toISOString().split('T')[0]}
                    onChange={(e) => updateNestedState('date', 'to', new Date(e.target.value))}
                  />
                </div>

                {/* Group Size Section */}
                <div className="space-y-4">
                  <label className="block text-sm font-semibold text-lime-700">
                    Number of Travelers
                  </label>
                  <div className="grid md:grid-cols-4 gap-4">
                    {[
                      { value: "2", label: "2 People", icon: User },
                      { value: "family-of-4-5", label: "Family of 4 to 5", icon: Users },
                      { value: "more-than-10", label: "10+ People", icon: Group },
                      { value: "more-than-15", label: "15+ People", icon: Group }
                    ].map((option) => (
                      <div
                        key={option.value}
                        onClick={() => {
                          updateState('groupSize', option.value);
                          updateState('customizeGroupSize', '');

                        }}
                        className={`
                          rounded-xl p-4 cursor-pointer 
                          transition-all duration-300 
                          flex items-center justify-center
                          ${formState.groupSize === option.value
                            ? "bg-lime-500 text-white shadow-lg"
                            : "bg-white border-2 border-lime-200 text-lime-800 hover:border-lime-300"
                          }
                        `}
                      >
                        <div className="flex items-center space-x-3">
                          <option.icon
                            className={`text-xl ${formState.groupSize === option.value ? "text-white" : "text-lime-500"}`}
                          />
                          <span className="font-medium">{option.label}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <FormInput
                    type="number"
                    placeholder="Or enter custom group size"
                    value={formState.customGroupSize}
                    onChange={(e) => {
                      updateState('customGroupSize', e.target.value);
                      updateState('groupSize', '');
                    }}
                    min="1"
                  />

                  {/* Group Discount Information */}
                  {(formState.groupSize === 'more-than-10' || formState.groupSize === 'more-than-15' ||
                    (formState.customGroupSize && parseInt(formState.customGroupSize) >= 10)) && (
                      <div className="bg-gradient-to-r from-lime-500 to-lime-400 rounded-xl p-4 shadow-lg">
                        <p className="text-white font-medium flex items-center">
                          <span className="mr-2">🎉</span>
                          {formState.groupSize === 'more-than-15' || (formState.customGroupSize && parseInt(formState.customGroupSize) >= 15)
                            ? 'Amazing! 15% off + One Free Package!'
                            : 'Great! 10% off for your group'}
                        </p>
                      </div>
                    )}
                </div>
              </div>
            )}

            {formState.activeTab === 1 && (
              <div className="space-y-6">
                {/* Hotel Category */}
                <SelectMenu
                  id="hotelCategory"
                  label="Hotel Category"
                  value={formState.hotelCategory}
                  onChange={(value) => updateState('hotelCategory', value)}
                  options={[
                    { value: "economy", label: "Economy" },
                    { value: "deluxe", label: "Deluxe" },
                    { value: "5-star", label: "5-Star" },
                  ]}
                  helperText="Choose your preferred accommodation level"
                />

                {/* Room Sharing */}
                <SelectMenu
                  id="roomSharing"
                  label="Room Sharing Preference"
                  value={formState.roomSharing}
                  onChange={(value) => updateState('roomSharing', value)}
                  options={[
                    { value: "4-5", label: "4-5 People" },
                    { value: "3", label: "3 People" },
                    { value: "2", label: "2 People" },
                    { value: "1", label: "Single Room" },
                  ]}
                  helperText="Select the number of people sharing the room"
                />

                {/* Travel Mode */}
                <div className="space-y-4">
                  <label className="block text-sm font-semibold text-lime-700">
                    Select Travel Mode
                  </label>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      {
                        value: 'flight',
                        label: 'Flight',
                        description: 'We\'ll arrange your flights'
                      },
                      {
                        value: 'self',
                        label: 'Self-Arranged',
                        description: 'Arrange your own transportation'
                      }
                    ].map((mode) => (
                      <div
                        key={mode.value}
                        onClick={() => updateState('travelMode', mode.value)}
                        className={` rounded-xl p-4 cursor-pointer border-2 transition-all duration-300
                          ${formState.travelMode === mode.value
                            ? 'border-lime-600 ring-2 ring-lime-600 bg-lime-50'
                            : 'border-gray-300 hover:border-lime-300'
                          }
                        `}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {mode.label}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {mode.description}
                            </p>
                          </div>
                          {formState.travelMode === mode.value && (
                            <CircleCheck color='#65a30d' />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Flight Type (conditional) */}
                  {formState.travelMode === 'flight' && (
                    <SelectMenu
                      id="flightType"
                      label="Flight Type"
                      value={formState.flightType}
                      onChange={(value) => updateState('flightType', value)}
                      options={[
                        { value: "direct", label: "Direct Flight" },
                        { value: "connecting", label: "Connecting Flight" },
                      ]}
                      helperText="Choose your preferred flight routing"
                    />
                  )}
                </div>

                {/* Inclusions */}
                <div className="space-y-4">
                  <label className="block text-sm font-semibold text-lime-700">
                    Package Inclusions
                  </label>
                  <div className="grid md:grid-cols-2 gap-4">
                    {commonInclusions.map((inclusion) => (
                      <div
                        key={inclusion.$id}
                        className={` rounded-xl p-4 border-2 transition-all duration-300 cursor-pointer
                          ${inclusions.includes(inclusion.$id)
                            ? 'border-lime-500 bg-lime-50'
                            : 'border-gray-200 hover:border-lime-300'
                          }
                        `}
                        onClick={() => handleInclusionChange(inclusion.$id)}
                      >
                        <div className="flex items-start space-x-4">
                          <input
                            type="checkbox"
                            checked={inclusions.includes(inclusion.$id)}
                            onChange={() => handleInclusionChange(inclusion.$id)}
                            className="h-4 w-4 rounded text-lime-600 focus:ring-lime-500"
                          />
                          <div>
                            <p className="font-medium text-gray-900">
                              {inclusion.label}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {inclusion.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Contact Information */}
            {formState.activeTab === 2 && (
              <div className="space-y-6">
                <FormInput
                  label="Full Name"
                  value={formState.contactDetails.fullName}
                  onChange={(e) =>
                    updateNestedState('contactDetails', 'fullName', e.target.value)
                  }
                  placeholder="Enter your full name"
                  error={formState.contactErrors.fullName}
                />

                <FormInput
                  type="tel"
                  label="Phone Number"
                  value={formState.contactDetails.phoneNumber}
                  onChange={(e) =>
                    updateNestedState('contactDetails', 'phoneNumber', e.target.value)
                  }
                  placeholder="Enter your phone number"
                  error={formState.contactErrors.phoneNumber}
                />

                <FormInput
                  type="email"
                  label="Email Address"
                  value={formState.contactDetails.email}
                  onChange={(e) =>
                    updateNestedState('contactDetails', 'email', e.target.value)
                  }
                  placeholder="Enter your email"
                  error={formState.contactErrors.email}
                />

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-lime-700">
                    Special Requests (Optional)
                  </label>
                  <textarea
                    value={formState.contactDetails.specialRequests}
                    onChange={(e) =>
                      updateNestedState('contactDetails', 'specialRequests', e.target.value)
                    }
                    placeholder="Any additional requests or requirements"
                    className=" w-full rounded-xl border-2 border-lime-200  py-3 px-4 text-lime-800   hover:border-lime-300 focus:border-lime-500 min-h-[120px] "
                  />
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="border-t border-lime-100 p-4 flex justify-between bg-lime-50">
            <button
              type="button"
              onClick={() => updateState('activeTab', formState.activeTab - 1)}
              className={` px-4 py-2 rounded-md transition-all duration-300 ${formState.activeTab === 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-lime-600 hover:bg-lime-100'
                }
    `}
              disabled={formState.activeTab === 0}
            >
              Previous
            </button>
            {formState.activeTab === tabs.length - 1 ? (
              <button
                type="button"
                onClick={handleSubmit}
                className=" px-4 py-2 text-white bg-lime-500 rounded-md hover:bg-lime-600  transition-all duration-300 "
              >
                Submit Package
              </button>
            ) : (
              <button
                type="button"
                onClick={() => updateState('activeTab', formState.activeTab + 1)}
                className=" px-4 py-2 text-lime-600 hover:bg-lime-100 rounded-md transition-all duration-300 "
              >
                Next
              </button>
            )}
          </div>

          <PackageSummary packageDetails={formState} inclusions={inclusions} commonInclusions={commonInclusions} />
        </form>
      </div>
    </div>
  );
};

export default CustomizePackage;