import { CheckCircle, MapPin, Hotel, Plane, Users, XCircle } from 'lucide-react';

const PackageSummary = ({ packageDetails, inclusions, commonInclusions }) => {

    const selectedInclusions = commonInclusions.filter(inclusion =>
        inclusions.includes(inclusion.$id)
    );

    const hotelCategoryMap = {
        'economy': 'Economy - Standard Accommodation',
        'deluxe': 'Deluxe - Premium Accommodation',
        '5-star': '5-star - Luxury Accommodation'
    };

    return (
        <div className="bg-white rounded-b-3xl shadow-xl overflow-hidden">
            {/* Header */}
            <div className="bg-lime-500 px-6 py-8">
                <h2 className="text-2xl font-bold text-white text-center">
                    Your Umrah Package Summary
                </h2>
                <p className="text-emerald-50 text-center mt-2">
                    Spiritual Journey Customized Just for You
                </p>
            </div>

            {/* Package Details */}
            <div className="p-6 space-y-6">
                {/* Travel Dates */}
                <div className="flex items-center space-x-4 bg-lime-50 rounded-xl p-4">
                    <MapPin className="text-lime-600" />
                    <div>
                        <p className="font-semibold text-lime-800">Travel Dates</p>
                        <p className="text-gray-600">
                            {new Date(packageDetails.date.from).toLocaleDateString()} -
                            {new Date(packageDetails.date.to).toLocaleDateString()}
                            <span className="ml-2 text-sm text-lime-600">
                                ({packageDetails.numberOfDays || 7} Days)
                            </span>
                        </p>
                    </div>
                </div>

                {/* Number of Travelers */}
                <div className="flex items-center space-x-4 bg-lime-50 rounded-xl p-4">
                    <Users className="text-lime-600" />
                    <div>
                        <p className="font-semibold text-lime-800">Number of Travelers</p>
                        <p className="text-gray-600">
                            {packageDetails.customGroupSize || packageDetails.groupSize || '1'} Travelers
                        </p>
                    </div>
                </div>

                {/* Accommodation */}
                <div className="flex items-center space-x-4 bg-lime-50 rounded-xl p-4">
                    <Hotel className="text-lime-600" />
                    <div>
                        <p className="font-semibold text-lime-800">Accommodation</p>
                        <p className="text-gray-600">
                            {hotelCategoryMap[packageDetails.hotelCategory]}
                            <span className="ml-2 text-sm text-lime-600">
                                ({packageDetails.roomSharing} People Sharing)
                            </span>
                        </p>
                    </div>
                </div>

                {/* Travel Mode */}
                <div className="flex items-center space-x-4 bg-lime-50 rounded-xl p-4">
                    <Plane className="text-lime-600" />
                    <div>
                        <p className="font-semibold text-lime-800">Travel Arrangement</p>
                        <p className="text-gray-600">
                            {packageDetails.travelMode === 'flight' ? 'Flight Included' : 'Self-Arranged Travel'}
                            {packageDetails.travelMode === 'flight' && packageDetails.flightType && (
                                <span className="ml-2 text-sm text-lime-600">
                                    ({packageDetails.flightType === 'direct' ? 'Direct Flight' : 'Connecting Flight'})
                                </span>
                            )}
                        </p>
                    </div>
                </div>

                {/* Inclusions */}
                <div className="bg-lime-50 rounded-xl p-4">
                    <div className="flex items-center space-x-4 mb-3">
                        <CheckCircle className="text-lime-600" />
                        <p className="font-semibold text-lime-800">Package Inclusions</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-2">
                        {selectedInclusions.length === 0 ? (
                            <div className="flex items-center space-x-2">
                                <XCircle className="text-red-500 w-4 h-4" />
                                <span className="text-gray-700 text-sm">No inclusion selected</span>
                            </div>
                        ) : (
                            selectedInclusions.map((inclusion) => (
                                <div key={inclusion.$id} className="flex items-center space-x-2">
                                    <CheckCircle className="text-lime-500 w-4 h-4" />
                                    <span className="text-gray-700 text-sm">{inclusion.label}</span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PackageSummary;