import { useNavigate } from "react-router-dom";

const Card = ({ packageId, image, title, price, makkahLocation, madinahLocation, badge }) => {

    const navigate = useNavigate();

    const handleBookNow = () => {
        navigate(`/packages/${packageId}`);
    };

    return (
        <div className="relative w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
            {/* Featured Badge */}
            <div className="absolute top-4 right-4 bg-lime-600/90 backdrop-blur-sm text-white px-4 py-1.5 rounded-full z-10 text-sm font-medium">
                {badge}
            </div>

            {/* Image Container */}
            <div className="relative h-72">
                <img
                    src={image}
                    alt={title}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            </div>

            {/* Content */}
            <div className="p-7">
                {/* Title */}
                <h2 className="text-2xl font-bold mb-4 text-lime-950 line-clamp-2 cursor-default tracking-tight hover:text-lime-700 transition-colors">
                    {title}
                </h2>

                {/* Location */}
                <div className="flex items-center text-gray-600 mb-6 cursor-default group" title="Location">
                    <div className="p-2 bg-lime-50 rounded-full mr-3 group-hover:bg-lime-100 transition-colors">
                        <svg
                            className="w-5 h-5 text-lime-600"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                        </svg>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-medium text-sm text-gray-700">{makkahLocation}</span>
                        <span className="font-medium text-sm text-gray-700">{madinahLocation}</span>
                    </div>
                </div>

                {/* Price Section */}
                <div className="mb-3">
                    <p className="text-xs text-gray-500 font-medium mb-1">Starting from</p>
                    <div className="text-4xl font-bold text-lime-700 tracking-tight">
                        {price}
                    </div>
                </div>

                {/* Sharing Info */}
                <p className="text-sm text-gray-500 mb-8">per person on 4/5 sharing</p>

                {/* Book Now Button */}
                <button
                    onClick={handleBookNow}
                    className="w-full bg-lime-500 text-white py-4 rounded-xl font-semibold transition-all duration-300 hover:bg-lime-600 active:bg-lime-700 focus:ring-2 focus:ring-lime-400 focus:ring-offset-2 focus:outline-none flex items-center justify-center group text-base shadow-lg shadow-lime-200"
                    aria-label={`Book ${title}`}
                >
                    Book Now
                    <svg
                        className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Card;
