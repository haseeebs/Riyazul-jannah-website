import { useEffect } from "react";
import { X } from "lucide-react";

const MediaZoomModal = ({ isOpen, onClose, mediaType, mediaUrl, caption }) => {
  // Handle closing the modal with the ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackgroundClick = (e) => {
    // Close modal if clicking outside the content area
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleBackgroundClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4 transition-opacity"
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative max-w-[calc(100%-2rem)] max-h-[90vh] w-fit rounded-lg overflow-hidden bg-black shadow-lg"
        tabIndex="-1"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 z-50 bg-white/30 hover:bg-white/50 focus:outline-none focus:ring-2 focus:ring-white rounded-full p-2 transition"
          aria-label="Close"
        >
          <X className="text-white" size={24} />
        </button>

        {/* Media Content */}
        {mediaType === "VIDEO" ? (
          <video
            src={mediaUrl}
            controls
            autoPlay
            className="object-contain max-w-full max-h-[80vh] w-auto h-auto"
          />
        ) : (
          <img
            src={mediaUrl}
            alt={caption || "Zoomed media"}
            className="object-contain max-w-full max-h-[100vh] w-auto h-auto"
          />
        )}

        {/* Caption */}
        {/* {caption && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-sm p-4 overflow-y-auto max-h-[20%]">
            <p>{caption}</p>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default MediaZoomModal;