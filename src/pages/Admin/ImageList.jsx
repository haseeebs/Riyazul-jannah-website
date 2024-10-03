import { useEffect, useMemo, useState } from "react";
import packageServices from "../../services/packageService";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { removeImages, setAllImages } from "../../store/packageSlice";
import { Trash2, RefreshCcw, Image as ImageIcon } from "lucide-react";

const ImageList = () => {
  const dispatch = useDispatch();
  const { allImages } = useSelector((store) => store.package);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const fetchImages = async () => {
    setLoading(true);
    return toast.promise(
      (async () => {
        const fetchedImages = await packageServices.listFiles();

        if (!fetchedImages.files || fetchedImages.total === 0) {
          toast.error("No images found...");
          dispatch(setAllImages([]));
          return [];
        }

        dispatch(setAllImages(fetchedImages.files));
        return fetchedImages.files;
      })(),
      {
        loading: "Fetching all images...",
        success: "All images fetched successfully",
        error: "Error fetching images",
      }
    ).finally(() => setLoading(false));
  };

  useEffect(() => {
    if (allImages.length === 0) {
      fetchImages();
    }
  }, [allImages.length]);

  const handleImageDelete = async () => {
    if (!confirmDelete) return;

    try {
      setDeleting(confirmDelete);
      await packageServices.deleteFile(confirmDelete);
      dispatch(removeImages(confirmDelete));
      toast.success("Image deleted successfully...");
    } catch (error) {
      toast.error("Error deleting image...");
    } finally {
      setConfirmDelete(null);
      setDeleting(null);
    }
  };

  const imageList = useMemo(
    () =>
      allImages.map((image) => (
        <div
          key={image.$id}
          className="border-2 border-lime-200 rounded-2xl p-2 relative 
          transition-all duration-300 hover:shadow-lg hover:border-lime-400 
          group overflow-hidden"
        >
          <img
            src={packageServices.getOptimizedFilePreview(image.$id)}
            alt="Food"
            className="w-full h-40 object-cover rounded-xl mb-2 
            group-hover:scale-105 transition-transform duration-300"
          />
          <button
            type="button"
            onClick={() => setConfirmDelete(image.$id)}
            disabled={deleting === image.$id}
            className="absolute top-2 right-2 
            bg-red-500 text-white p-2 rounded-full 
            hover:bg-red-600 
            transition-all duration-300 
            opacity-0 group-hover:opacity-100 
            focus:opacity-100
            disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )),
    [allImages, deleting]
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4 text-lime-800">Confirm Deletion</h2>
            <p className="mb-6 text-gray-600">Are you sure you want to delete this image?</p>
            <div className="flex justify-between space-x-4">
              <button
                onClick={() => setConfirmDelete(null)}
                className="flex-1 px-4 py-2 
                bg-lime-100 text-lime-800 
                rounded-lg 
                hover:bg-lime-200 
                transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleImageDelete}
                disabled={deleting === confirmDelete}
                className="flex-1 px-4 py-2 
                bg-red-500 text-white 
                rounded-lg 
                hover:bg-red-600 
                transition-colors
                disabled:opacity-50 
                disabled:cursor-not-allowed 
                flex items-center justify-center 
                space-x-2"
              >
                {deleting === confirmDelete ? (
                  <>
                    <span>Deleting...</span>
                    <RefreshCcw size={16} className="animate-spin" />
                  </>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Load New Images Button */}
      <div className="text-center py-6">
        <button
          onClick={fetchImages}
          disabled={loading}
          className={`
            px-6 py-3 
            bg-lime-500 
            text-white 
            rounded-lg 
            hover:bg-lime-600 
            transition-colors 
            flex items-center 
            justify-center 
            mx-auto 
            space-x-2
            ${loading ? "opacity-50 cursor-not-allowed" : ""}
          `}
        >
          {loading ? (
            <>
              <RefreshCcw size={16} className="animate-spin mr-2" />
              <span>Loading...</span>
            </>
          ) : (
            <>
              <RefreshCcw size={16} className="mr-2" />
              <span>Load New Images</span>
            </>
          )}
        </button>
      </div>

      {/* Image Grid */}
      {allImages.length === 0 ? (
        <div className="text-center py-12 bg-lime-50 rounded-2xl">
          <ImageIcon size={64} className="mx-auto text-lime-400 mb-4" />
          <p className="text-lime-700 text-lg">
            No food images available. Click 'Load New Images' to fetch images.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {imageList}
        </div>
      )}
    </div>
  );
};

export default ImageList;