import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import config from '../config/config';
import useEmblaCarousel from 'embla-carousel-react';
import { PrevButton, NextButton, usePrevNextButtons } from '../components/EmblaCarouselArrowButtons';
import { Play, Image as ImageIcon, ZoomIn, CircleCheck } from 'lucide-react';
import '../css/embla.css';
import MediaZoomModal from '../components/MediaZoomModal';

const ReelCarousel = () => {
  const [videos, setVideos] = useState([]);
  const [carouselAlbum, setCarouselAlbum] = useState([]);
  const [media, setMedia] = useState({
    items: [],
    loading: false,
    error: null,
    pagination: null,
  });

  const [zoomModal, setZoomModal] = useState({
    isOpen: false,
    mediaType: null,
    mediaUrl: null,
    caption: null,
  });

  const [videoEmblaRef, videoEmblaApi] = useEmblaCarousel({ loop: true, slidesToScroll: 1 });
  const [imageEmblaRef, imageEmblaApi] = useEmblaCarousel({ loop: true, slidesToScroll: 1 });

  const { prevBtnDisabled: videoPrevDisabled, nextBtnDisabled: videoNextDisabled, onPrevButtonClick: onVideoPrevClick, onNextButtonClick: onVideoNextClick } =
    usePrevNextButtons(videoEmblaApi);

  const { prevBtnDisabled: imagePrevDisabled, nextBtnDisabled: imageNextDisabled, onPrevButtonClick: onImagePrevClick, onNextButtonClick: onImageNextClick } =
    usePrevNextButtons(imageEmblaApi);

  const fetchInstagramMedia = useCallback(async (nextCursor = null) => {
    setMedia((prev) => ({ ...prev, loading: true }));
    try {
      const params = {
        access_token: config.instagramAccessToken,
        fields: 'media_url,media_type,caption,thumbnail_url',
        limit: 20,
      };

      if (nextCursor) params.after = nextCursor

      const response = await axios.get('https://graph.instagram.com/me/media', { params });
      const data = response.data.data;

      // Filter videos and carousel albums
      const videosData = data.filter((item) => item.media_type === 'VIDEO');
      const carouselAlbumData = data.filter((item) => item.media_type === 'CAROUSEL_ALBUM');

      setVideos((prev) => (nextCursor ? [...prev, ...videosData] : videosData));
      setCarouselAlbum((prev) => (nextCursor ? [...prev, ...carouselAlbumData] : carouselAlbumData));

      setMedia((prev) => ({
        ...prev,
        items: nextCursor ? [...prev.items, ...data] : data,
        loading: false,
        pagination: response.data.paging,
      }));
    } catch (error) {
      console.error('Fetch Error:', error);
      setMedia((prev) => ({
        ...prev,
        loading: false,
        error: error.response?.data?.error?.message || 'Failed to fetch media',
      }));
    }
  }, []);

  useEffect(() => {
    fetchInstagramMedia();
  }, [fetchInstagramMedia]);

  const handleLoadMore = () => {
    if (media.pagination?.next) {
      const nextCursor = media.pagination?.cursors?.after;
      fetchInstagramMedia(nextCursor);
    }
  };

  const openZoomModal = (mediaType, mediaUrl, caption) => {
    setZoomModal({ isOpen: true, mediaType, mediaUrl, caption });
  };

  const closeZoomModal = () => {
    setZoomModal({ isOpen: false, mediaType: null, mediaUrl: null, caption: null });
  };

  // Error state component
  const ErrorFallback = ({ error }) => (
    <div className="py-20 px-4">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-lime-600">
          Our Instagram Moments
        </h2>
        <p className="text-gray-600">
          We'd love to show you our journey photos and videos right here, but we're having some technical difficulties.
        </p>
        <div className="space-y-4">
          <p className="text-gray-500">
            Meanwhile, you can visit our Instagram page to see all our updates:
          </p>
          <a
            href="https://www.instagram.com/riyazuljannahtourandtravels/"
            target="_blank"
            rel="noopener noreferrer"
            // className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium rounded-xl hover:from-purple-600 hover:to-indigo-600 transition-all duration-300"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            Follow us on Instagram
          </a>
        </div>
      </div>
    </div>
  );

  if (media.error) {
    return <ErrorFallback error={media.error} />;
  }
  
  return (
    <div className='pt-20 bg-lime-50'>
      <MediaZoomModal {...zoomModal} onClose={closeZoomModal} />

      <h1 className="text-3xl sm:text-5xl text-center font-extrabold text-lime-600 mb-10 tracking-tight">
        What Our Travelers Say...
      </h1>

      <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 mb-10">

        {/* Media Counts */}
        <div className="flex items-center space-x-2 bg-lime-100 px-4 py-2 rounded-lg">
          <ImageIcon className="text-lime-600" />
          <span className="font-bold text-lime-800">
            {carouselAlbum.length} Images
          </span>
        </div>
        <div className="flex items-center space-x-2 bg-lime-100 px-4 py-2 rounded-lg">
          <Play className="text-lime-600" />
          <span className="font-bold text-lime-800">
            {videos.length} Videos
          </span>
        </div>

        {/* Load More Button */}
        {media.pagination?.next ? (
          <button
            onClick={handleLoadMore}
            className="bg-lime-500 text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300 hover:bg-lime-600 active:bg-lime-700 focus:ring-2 focus:ring-lime-400 focus:ring-offset-2 focus:outline-none flex items-center justify-center text-base shadow-lg shadow-lime-200"
            disabled={media.loading}
          >
            {media.loading ? (
              <>
                <span className="loader animate-spin w-4 h-4 border-2 border-t-2 border-white rounded-lg mr-2"></span>
                Loading...
              </>
            ) : (
              'Load More'
            )}
          </button>
        ) : (
          <div className="flex items-center justify-center text-lime-600 bg-lime-100 py-2 px-4 rounded-full shadow-md space-x-2 cursor-not-allowed">
            <span className="font-semibold">All media loaded</span>
            <CircleCheck />
          </div>
        )}

      </div>


      {media.loading && <p className="text-center text-blue-500">Loading...</p>}
      {media.error && <p className="text-center text-red-500">Error: {media.error}</p>}

      {/* Image Carousel */}
      <div className="embla">
        <div className="embla__viewport mb-8" ref={imageEmblaRef}>
          <div className="embla__container">
            {carouselAlbum.map((item, index) => (
              <div key={index} className="embla__slide relative group" onClick={() => openZoomModal('IMAGE', item.media_url, item.caption)}>
                <div className="border rounded-lg overflow-hidden shadow-md cursor-pointer">
                  <img
                    src={item.media_url || item.thumbnail_url || ''}
                    alt={item.caption || 'Image Item'}
                    className="w-full h-96 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 flex items-center justify-center transition-all duration-300">
                    <ZoomIn className="text-white opacity-0 group-hover:opacity-100" size={48} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="embla__controls">
          <div className="embla__buttons">
            <PrevButton onClick={onImagePrevClick} disabled={imagePrevDisabled} />
            <NextButton onClick={onImageNextClick} disabled={imageNextDisabled} />
          </div>
        </div>
      </div>

      {/* Video Carousel */}
      <div className="embla">
        <div className="embla__viewport mb-8" ref={videoEmblaRef}>
          <div className="embla__container">
            {videos.map((video, index) => (
              <div key={index} className="embla__slide relative group" onClick={() => openZoomModal('VIDEO', video.media_url, video.caption)}>
                <div className="border rounded-lg overflow-hidden shadow-md cursor-pointer">
                  <video
                    src={video.media_url || video.thumbnail_url || ''}
                    className="w-full h-96 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 flex items-center justify-center transition-all duration-300">
                    <Play className="text-white opacity-0 group-hover:opacity-100" size={48} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="embla__controls">
          <div className="embla__buttons">
            <PrevButton onClick={onVideoPrevClick} disabled={videoPrevDisabled} />
            <NextButton onClick={onVideoNextClick} disabled={videoNextDisabled} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReelCarousel;