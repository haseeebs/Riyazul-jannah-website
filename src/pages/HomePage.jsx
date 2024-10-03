import { useSelector } from 'react-redux';
import Hero from '../components/Hero';
import UniquePackages from '../components/UniquePackages';
import HeroSkeleton from '../components/skeleton/HeroSkeleton';
import ReelCarousel from './ReelCarousel';
import CTA from '../components/CTA';

const HomePage = () => {
    const { isLoading } = useSelector(store => store.package)

    if (isLoading) {
        return <HeroSkeleton />;
    }

    return (
        <div>
            <Hero />
            <UniquePackages />
            <ReelCarousel />
            <CTA />
        </div>
    );
};

export default HomePage;