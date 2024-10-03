import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, useFieldArray } from 'react-hook-form';
import packageServices from '../../services/packageService';
import { removeCommonInclusion, setCommonInclusions, setFoodImages } from '../../store/packageSlice';
import toast from 'react-hot-toast';

const ExtraDataFormPage = () => {
  const dispatch = useDispatch();
  const { commonInclusions, foodImages } = useSelector((store) => store.package);

  const [activeTab, setActiveTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const tabs = ['Common Inclusions', 'Food Images'];

  const [showSuggestions, setShowSuggestions] = useState(false);
  const predefinedSuggestions = [
    'Transportation to Haram',
    'Guided Ziyarat Tours',
    'Daily Meals',
    'Air-conditioned Accommodation',
    'Visa Processing Assistance',
  ];

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      inclusions: [],
      foodImages: [],
    },
  });

  const { fields: inclusionFields, append: appendInclusion, remove: removeInclusion } = useFieldArray({
    control,
    name: 'inclusions',
  });

  const handleAddInclusion = async (index) => {
    const description = watch(`inclusions.${index}.description`);
    const label = watch(`inclusions.${index}.label`);

    if (!description || !label) {
      toast.error('Both label and description are required.');
      return;
    }

    try {
      setIsLoading(true);
      await packageServices.addCommonInclusion({ description, label });
      const updatedInclusions = await packageServices.fetchCommonInclusions();
      dispatch(setCommonInclusions(updatedInclusions.documents));
      setValue(`inclusions.${index}.description`, '');
      setValue(`inclusions.${index}.label`, '');
      toast.success('Inclusion added successfully.');
    } catch (error) {
      console.error('Error adding inclusion:', error);
      toast.error('Failed to add inclusion.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveCommonInclusion = async (inclusionId) => {
    try {
      setIsLoading(true);
      await packageServices.removeCommonInclusion(inclusionId);
      dispatch(removeCommonInclusion(inclusionId));
      toast.success('Inclusion removed successfully.');
    } catch (error) {
      console.error('Error removing inclusion:', error);
      toast.error('Failed to remove inclusion.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocalRemoveInclusion = (index) => {
    // Locally remove the inclusion field
    removeInclusion(index);
  };

  const handleAddNewInclusionField = () => {
    appendInclusion({
      description: '',
      label: ''
    });
  };

  const handleAddSuggestion = (suggestion) => {
    appendInclusion({ label: suggestion, description: '' });
    setShowSuggestions(false);
  };

  const handleLoadFoodImages = async () => {
    try {
      setIsLoading(true);
      const foodImagesResponse = await packageServices.fetchFoodImages();

      if (foodImagesResponse.files.length === 0) {
        toast.error("No food images found");
        return;
      }

      dispatch(setFoodImages(foodImagesResponse.files));
      toast.success("Images loaded successfully");
    } catch (error) {
      console.error('Error loading food images:', error);
      toast.error('Failed to load images');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddFoodImage = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      toast.error('Please select an image file.');
      return;
    }

    try {
      setIsLoading(true);
      await packageServices.addFoodImage(file);

      // Fetch updated food images after upload
      const updatedFoodImages = await packageServices.fetchFoodImages();
      dispatch(setFoodImages(updatedFoodImages.files));

      toast.success('Image added successfully.');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFoodImageDelete = async (imageId) => {
    try {
      setIsLoading(true);
      await packageServices.deleteFoodImage(imageId);

      // Fetch updated food images after deletion
      const updatedFoodImages = await packageServices.fetchFoodImages();
      dispatch(setFoodImages(updatedFoodImages.files));

      toast.success('Image deleted successfully.');
    } catch (error) {
      console.error('Error removing image:', error);
      toast.error('Failed to delete image.');
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      toast.success('Data saved successfully.');
    } catch (error) {
      console.error('Error submitting data:', error);
      toast.error('Failed to save data.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-7xl p-6">
      <div className="rounded-3xl border border-lime-200 bg-white shadow-lg">
        <div className="border-b border-lime-100 p-4">
          <h2 className="text-2xl text-lime-800">Manage Common Inclusions and Food Images</h2>
          <p className="text-lime-600">Add or remove common inclusions and food images for your packages</p>
        </div>

        <div className="p-4 space-y-6">
          <div className="grid w-full grid-cols-2 bg-lime-50 p-1 rounded-xl">
            {tabs.map((tab, index) => (
              <button
                key={tab}
                type="button"
                className={`rounded-lg py-2 ${activeTab === index ? 'bg-lime-500 text-white' : ''}`}
                onClick={() => setActiveTab(index)}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === 0 && (
            <div className="space-y-4">
              <h3 className="text-lg text-lime-800">Common Inclusions</h3>
              {inclusionFields.map((inclusion, index) => (
                <div key={inclusion.id}>
                  <div className='flex flex-col lg:flex-row'>
                    <div className="flex-1">
                      <input
                        {...register(`inclusions.${index}.label`)}
                        placeholder="Enter inclusion label"
                        className="w-full rounded-xl p-4 border border-lime-200"
                      />
                      <input
                        {...register(`inclusions.${index}.description`)}
                        placeholder="Enter inclusion description"
                        className="w-full rounded-xl p-4 border border-lime-200"
                      />
                    </div>
                    <div className="flex-2">
                      <button
                        type="button"
                        onClick={() => handleAddInclusion(index)}
                        disabled={isLoading}
                        className="w-full p-4 border border-lime-200 text-lime-500 hover:text-lime-700 hover:bg-lime-300 px-6 rounded-xl"
                      >
                        Add
                      </button>
                      <button
                        type="button"
                        onClick={() => handleLocalRemoveInclusion(index)}
                        className="w-full p-4 border border-lime-200 text-red-500 hover:bg-lime-100 px-4 rounded-xl"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="mt-4">
                <h4 className="text-md text-lime-700 mb-2">Existing Common Inclusions</h4>
                {commonInclusions.length === 0 ? (
                  <p className="text-lime-600 text-center py-8 text-lg font-semibold">No common inclusions found.</p>
                ) : (
                  <div className="space-y-4">
                    {commonInclusions.map((inclusion) => (
                      <div
                        key={inclusion.$id}
                        className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gradient-to-r from-lime-50 to-lime-100 p-4 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md"
                      >
                        <div className="flex items-center gap-10 mb-2 sm:mb-0">
                          <p className="text-md font-semibold text-lime-700"><span className='text-lime-900'>Label:</span> {inclusion.label}</p>
                          <p className="text-md text-lime-700"><span className='text-lime-900'>Description:</span> {inclusion.description}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveCommonInclusion(inclusion.$id)}
                          className="text-red-500 hover:text-white hover:bg-red-500 px-4 py-2 rounded-full transition-colors duration-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex gap-5">
                <button
                  type="button"
                  onClick={handleAddNewInclusionField}
                  className="flex-1 px-4 py-2 rounded-xl bg-lime-500 text-white hover:bg-lime-600"
                >
                  Add New Inclusion Field
                </button>
                <button
                  type="button"
                  onClick={() => setShowSuggestions(!showSuggestions)}
                  className="flex-1 px-4 py-2 rounded-xl bg-lime-400 text-white hover:bg-lime-500"
                >
                  Show Suggestions
                </button>
              </div>
              {showSuggestions && (
                <div className="mt-4 p-6 bg-lime-50 border border-lime-300 rounded-2xl shadow-md">
                  <h4 className="text-lg font-semibold text-lime-800 mb-4">Suggested Inclusions</h4>
                  <ul className="divide-y divide-lime-200">
                    {predefinedSuggestions.map((suggestion, index) => (
                      <li key={index} className="flex justify-between items-center py-2">
                        <span className="text-lime-700 text-sm">{suggestion}</span>
                        <button
                          type="button"
                          onClick={() => handleAddSuggestion(suggestion)}
                          className="text-white bg-lime-500 hover:bg-lime-600 px-3 py-1 rounded-lg text-sm"
                        >
                          Add
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-lime-600 text-white hover:bg-lime-700"
              >
                {isLoading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          )}

          {activeTab === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg text-lime-800">Food Images</h3>
              <div className="flex space-x-4 mb-4">
                <button
                  type="button"
                  onClick={handleLoadFoodImages}
                  disabled={isLoading}
                  className="px-4 py-2 rounded-xl bg-lime-100 text-lime-700 hover:bg-lime-200 disabled:opacity-50"
                >
                  {isLoading ? 'Loading...' : 'Load Images'}
                </button>

                <label
                  htmlFor="foodImageUpload"
                  className="px-4 py-2 rounded-xl bg-lime-500 text-white hover:bg-lime-600 cursor-pointer"
                >
                  {isLoading ? 'Uploading...' : 'Upload New Image'}
                  <input
                    id="foodImageUpload"
                    type="file"
                    accept="image/*"
                    onChange={handleAddFoodImage}
                    className="hidden"
                    disabled={isLoading}
                  />
                </label>
              </div>

              {foodImages.length === 0 ? (
                <div className="text-center py-8 text-lime-600">
                  No food images available. Click 'Load Images' or upload a new image.
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {foodImages.map((image) => (
                    <div
                      key={image.$id}
                      className="border border-lime-200 rounded-xl p-2 relative"
                    >
                      <img
                        src={packageServices.getFoodFilePreview(image.$id)}
                        alt="Food"
                        className="w-full h-40 object-cover rounded-lg mb-2"
                      />
                      <button
                        type="button"
                        onClick={() => handleFoodImageDelete(image.$id)}
                        disabled={isLoading}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 disabled:opacity-50"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default ExtraDataFormPage;