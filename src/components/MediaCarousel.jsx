import { Play, ZoomIn } from "lucide-react";
import { NextButton, PrevButton } from "./EmblaCarouselArrowButtons";

const MediaCarousel = ({ items, type, emblaRef, prevDisabled, nextDisabled, onPrevClick, onNextClick, onMediaClick }) => {
    return (
        <div className="embla">
            <div className="embla__viewport mb-8" ref={emblaRef}>
                <div className="embla__container">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="embla__slide relative group"
                            onClick={() => onMediaClick(type, item.media_url, item.caption)}
                        >
                            <div className="border rounded-lg overflow-hidden shadow-md cursor-pointer">
                                {type === 'VIDEO' ? (
                                    <video
                                        src={item.media_url || ''}
                                        className="w-full h-96 object-cover transition-transform duration-300 group-hover:scale-105"
                                        controls
                                    />
                                ) : (
                                    <img
                                        src={item.media_url || ''}
                                        alt={item.caption || 'Image'}
                                        className="w-full h-96 object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                )}
                                <div className="absolute inset-0 bg-black/0 flex items-center justify-center transition-all duration-300">
                                    {type === 'VIDEO' ? (
                                        <Play className="text-white opacity-0 group-hover:opacity-100" size={48} />
                                    ) : (
                                        <ZoomIn className="text-white opacity-0 group-hover:opacity-100" size={48} />
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="embla__controls">
                <div className="embla__buttons">
                    <PrevButton onClick={onPrevClick} disabled={prevDisabled} />
                    <NextButton onClick={onNextClick} disabled={nextDisabled} />
                </div>
            </div>
        </div>
    );
};

export default MediaCarousel;