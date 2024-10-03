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