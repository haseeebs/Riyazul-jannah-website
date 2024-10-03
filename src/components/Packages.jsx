import packageServices from '../services/packageService';
import Card from './Card';
import PackagesSkeleton from './skeleton/CardSkeleton';
import { useSelector } from 'react-redux';

const Packages = () => {
    const { packages, hotels, loading } = useSelector((state) => state.package);
    
    // Filter unique packages by type
    const uniquePackages = packages.reduce((acc, pkg) => {
        if (!acc.some(existingPkg => existingPkg.type === pkg.type)) {
            acc.push(pkg);
        }
        return acc;
    }, []);

    const getHotelName = (hotelId) => {
        const hotel = hotels.find((h) => h.$id === hotelId);
        return hotel ? hotel.name : 'Hotel not found';
    };

    if (loading) {
        return <PackagesSkeleton />;
    }

    if (!uniquePackages || uniquePackages.length === 0) {
        return (
            <div className="mx-auto max-w-7xl p-4 bg-white rounded-3xl">
                <h2 className="text-center text-gray-600 text-xl font-semibold">
                    No packages found at the moment. Please check back later.
                </h2>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-7xl p-1 bg-gradient-to-b from-lime-500 to-lime-400 rounded-3xl">
            <div className="bg-white rounded-3xl p-8">
                <h2 className="text-lime-600 text-3xl font-bold text-center mb-12">
                    Our Popular Packages for Every Budget
                </h2>
                <div className="grid grid-col-1 md:grid-cols-3 gap-8">
                    {uniquePackages.map((pkg) => (
                        <Card
                            key={pkg.$id}
                            packageId={pkg.$id}
                            badge={pkg.type}
                            image={pkg.image && packageServices.getFilePreview(pkg.image)}
                            title={`${pkg.type} Package ${pkg.travelDate ? ` - ${pkg.travelDate}` : ''}`}
                            price={`₹${pkg.durations[0]?.basePrice?.toLocaleString() || '0'}`}
                            makkahLocation={`Makkah - ${getHotelName(pkg.makkahHotelId)}`}
                            madinahLocation={`Madinah - ${getHotelName(pkg.madinahHotelId)}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Packages;