import packageServices from '../services/packageService';
import Card from './Card';
import PackagesSkeleton from './skeleton/CardSkeleton';
import { useSelector } from 'react-redux';
import { Settings, Wallet } from 'lucide-react';

const OfferCard = ({ title, description, icon }) => (
    <div className="bg-white rounded-xl shadow-md p-6 border border-lime-500">
        <div className="flex items-center mb-4">
            <div className="bg-lime-100 rounded-full p-3 mr-4">
                {icon}
            </div>
            <h3 className="text-xl font-semibold text-lime-950">{title}</h3>
        </div>
        <p className="text-lime-900">{description}</p>
    </div>
);

const UniquePackages = () => {
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
            <div className="mx-auto max-w-7xl p-4 bg-lime-50 rounded-3xl">
                <h2 className="text-center text-gray-600 text-xl font-semibold">
                    No packages found at the moment. Please check back later.
                </h2>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-7xl p-1 bg-gradient-to-b from-lime-500 to-lime-400 rounded-3xl">
            <div className="bg-lime-50 rounded-3xl p-4 lg:p-8">
                <h2 className="text-lime-600 text-3xl font-bold text-center mb-12">
                    Our Popular Packages for Every Budget
                </h2>
                <div className="grid grid-col-1 md:grid-cols-3 gap-8">
                    {uniquePackages.map((pkg) => (
                        <Card
                            key={pkg.$id}
                            packageId={pkg.$id}
                            badge={pkg.type}
                            image={pkg.image && packageServices.getOptimizedFilePreview(pkg.image)}
                            title={`${pkg.type} Package ${pkg.travelDate ? ` - ${pkg.travelDate}` : ''}`}
                            price={`₹${pkg.durations[0]?.basePrice?.toLocaleString() || '0'}`}
                            makkahLocation={`Makkah - ${getHotelName(pkg.makkahHotelId)}`}
                            madinahLocation={`Madinah - ${getHotelName(pkg.madinahHotelId)}`}
                        />
                    ))}
                </div>

            <div className="bg-lime-50">
                <div className="max-w-7xl mx-auto px-4 pt-12 pb-5">
                    <div className="grid md:grid-cols-2 gap-8">
                        <OfferCard
                            title="Flexible Budget to Luxury Packages"
                            // description="Hamare paas har budget ke liye options hain! Saste packages se lekar luxury 5-star packages tak, apni zarurat aur pasand ke mutabiq select karein."
                            description="We have options for every budget! From affordable packages to luxurious 5-star options, choose according to your needs and preferences."
                            icon={<Wallet className="w-6 h-6 text-lime-600" />}
                        />
                        <OfferCard
                            title="Customizable Land Packages"
                            // description="Apni specific zaruratein poori karein! Flight aur visa khud manage karein, aur hum aap ke liye hotel, stay aur khane ka intezam karenge."
                            description="Fulfill your specific needs! Manage your flight and visa on your own, and we’ll take care of hotel accommodations, stay, and meals for you."
                            icon={<Settings className="w-6 h-6 text-lime-600" />}
                        />
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
};

export default UniquePackages;