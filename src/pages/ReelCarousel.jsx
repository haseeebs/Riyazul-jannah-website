import { useEffect, useState, useCallback, useMemo } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { usePrevNextButtons } from '../components/EmblaCarouselArrowButtons';
import { Play, Image as ImageIcon, CircleCheck } from 'lucide-react';
import '../css/embla.css';
import MediaZoomModal from '../components/MediaZoomModal';
import packageServices from '../services/packageService';
import { appendInstagramMedia, setInstagramMedia, setLoading } from '../store/packageSlice';
import { useDispatch, useSelector } from 'react-redux';
import MediaErrorFallback from '../components/MediaErrorFallback';
import MediaCarousel from '../components/MediaCarousel';

const ReelCarousel = () => {
  const dispatch = useDispatch();
  const { instagramMedia, loading } = useSelector((store) => store.package);
  const { items: instagramMediaItems = [], nextCursor, error } = instagramMedia;

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

  const videos = useMemo(() =>
    Array.isArray(instagramMediaItems) ? instagramMediaItems.filter(item => item.media_type === 'VIDEO') : [],
    [instagramMediaItems]
  );

  const carouselAlbum = useMemo(() =>
    Array.isArray(instagramMediaItems) ? instagramMediaItems.filter(item => item.media_type === 'CAROUSEL_ALBUM') : [],
    [instagramMediaItems]
  );

  const fetchMedia = useCallback(async (cursor = null) => {
    try {
      dispatch(setLoading(true));
      
      const { items, nextCursor } = await packageServices.fetchInstagramMedia(20, cursor);

      if (cursor) {
        dispatch(appendInstagramMedia({ items, nextCursor }));
      } else {
        dispatch(setInstagramMedia({ items, nextCursor }));
      }
    } catch (error) {
      console.error('Fetch Error:', error);
      dispatch(setInstagramMedia({ error: error.response?.data?.error?.message || 'Failed to fetch media' }));
    } finally {
      dispatch(setLoading(false))
    }
  }, [dispatch]);

  useEffect(() => {
    if (instagramMediaItems.length === 0 && !loading && !error) {
      fetchMedia();
    }
  }, [fetchMedia, instagramMediaItems.length, loading, error]);

  const handleLoadMore = () => {
    if (nextCursor?.next) {
      fetchMedia(nextCursor?.cursors?.after);
    }
  };

  const openZoomModal = (mediaType, mediaUrl, caption) => {
    setZoomModal({ isOpen: true, mediaType, mediaUrl, caption });
  };

  const closeZoomModal = () => {
    setZoomModal({ isOpen: false, mediaType: null, mediaUrl: null, caption: null });
  };

  if (error) {
    return <MediaErrorFallback error={error} retry={() => fetchMedia()} />;
  }

  return (
    <div className="pt-20 bg-lime-50">
      <MediaZoomModal {...zoomModal} onClose={closeZoomModal} />

      <h1 className="text-3xl sm:text-5xl text-center font-extrabold text-lime-600 mb-10 tracking-tight">
        What Our Travelers Say...
      </h1>

      <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 mb-10">
        <div className="flex items-center space-x-2 bg-lime-100 px-4 py-2 rounded-lg">
          <ImageIcon className="text-lime-600" />
          <span className="font-bold text-lime-800">{carouselAlbum.length} Images</span>
        </div>
        <div className="flex items-center space-x-2 bg-lime-100 px-4 py-2 rounded-lg">
          <Play className="text-lime-600" />
          <span className="font-bold text-lime-800">{videos.length} Videos</span>
        </div>

        {nextCursor?.next ? (
          <button
            onClick={handleLoadMore}
            className="bg-lime-500 text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300 hover:bg-lime-600"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        ) : (
          <div className="flex items-center justify-center text-lime-600 bg-lime-100 py-2 px-4 rounded-lg shadow-md space-x-2 cursor-not-allowed">
            <span className="font-semibold">All media loaded</span>
            <CircleCheck />
          </div>
        )}

      </div>

      {loading && <p className="text-center text-blue-500">Loading...</p>}

      <MediaCarousel
        items={carouselAlbum}
        type="IMAGE"
        emblaRef={imageEmblaRef}
        prevDisabled={imagePrevDisabled}
        nextDisabled={imageNextDisabled}
        onPrevClick={onImagePrevClick}
        onNextClick={onImageNextClick}
        onMediaClick={openZoomModal}
      />

      <MediaCarousel
        items={videos}
        type="VIDEO"
        emblaRef={videoEmblaRef}
        prevDisabled={videoPrevDisabled}
        nextDisabled={videoNextDisabled}
        onPrevClick={onVideoPrevClick}
        onNextClick={onVideoNextClick}
        onMediaClick={openZoomModal}
      />

    </div>
  );
};

export default ReelCarousel;