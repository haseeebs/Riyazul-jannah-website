import { format } from 'date-fns';
import { Package, Hotel, Users, Plane, Calendar, Bed, Phone, Mail, MessageSquare } from 'lucide-react';
import { useSelector } from 'react-redux';

const DetailItem = ({ icon, label, value }) => {
    return (
        <div className="flex items-center space-x-3">
            <div className="flex-shrink-0 text-gray-500">{icon}</div>
            <div>
                <p className="text-sm font-medium text-gray-500">{label}</p>
                <p className="text-base font-semibold">{value}</p>
            </div>
        </div>
    );
};

const CustomizePackageDetails = ({ packageDetail }) => {
    const { commonInclusions } = useSelector(store => store.package); // Assuming commonInclusions is an array of objects like [{ id: '675921da00316a39230c', label: 'Hotel Stay' }, ...]

    if (!packageDetail) {
        return <div className="text-center text-gray-500">No package details available.</div>;
    }

    const travelDates = packageDetail.travelDates ? JSON.parse(packageDetail.travelDates) : null;

    const inclusions =
    packageDetail.inclusions?.map(id =>
        commonInclusions.find(inclusion => inclusion.$id === id)?.label || 'Unknown Inclusion'
    ) || [];

    return (
        <div className="max-w-7xl mx-auto p-4">
            <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
                <div className="p-6">
                    <h2 className="text-2xl font-bold mb-2">Package Details</h2>
                    <p className="text-gray-600 mb-6">Your customized travel package information</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <DetailItem icon={<Package size={20} />} label="Package Type" value={packageDetail.packageType || 'N/A'} />
                        <DetailItem icon={<Hotel size={20} />} label="Hotel Category" value={packageDetail.hotelCategory || 'N/A'} />
                        <DetailItem icon={<Users size={20} />} label="Group Size" value={packageDetail.groupSize?.replace('-', ' ') || 'N/A'} />
                        <DetailItem
                            icon={<Plane size={20} />}
                            label="Travel Mode"
                            value={`${packageDetail.travelMode || 'N/A'} (${packageDetail.flightType || 'N/A'})`}
                        />
                        <DetailItem
                            icon={<Calendar size={20} />}
                            label="Travel Dates"
                            value={
                                travelDates
                                    ? `${format(new Date(travelDates.from), 'dd MMM yyyy')} - ${format(new Date(travelDates.to), 'dd MMM yyyy')}`
                                    : 'N/A'
                            }
                        />
                        <DetailItem icon={<Bed size={20} />} label="Room Sharing" value={packageDetail.roomSharing?.replace('-', ' ') || 'N/A'} />
                    </div>
                    <div className="border-t border-gray-200 my-6"></div>
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Inclusions</h3>
                        <div className="flex flex-wrap gap-2">
                            {inclusions?.length ? (
                                inclusions.map((inclusion, idx) => (
                                    <span key={idx} className="bg-gray-200 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded">
                                        {inclusion}
                                    </span>
                                ))
                            ) : (
                                <span className="text-gray-500">No inclusions specified.</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-6">
                    <h2 className="text-2xl font-bold mb-2">Contact Details</h2>
                    <p className="text-gray-600 mb-6">Your personal information for this trip</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <DetailItem icon={<Users size={20} />} label="Full Name" value={packageDetail.fullName || 'N/A'} />
                        <DetailItem icon={<Phone size={20} />} label="Phone Number" value={packageDetail.phoneNumber || 'N/A'} />
                        <DetailItem icon={<Mail size={20} />} label="Email" value={packageDetail.email || 'N/A'} />
                        <DetailItem icon={<MessageSquare size={20} />} label="Special Requests" value={packageDetail.specialRequests || 'None'} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomizePackageDetails;