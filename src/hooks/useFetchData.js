import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCommonInclusions, setError, setHotels, setLoading, setPackages } from '../store/packageSlice';
import packageServices from '../services/packageService';
import hotelServices from '../services/hotelService';
import { parsePackages } from '../utils/parsePackages';

const useFetchData = () => {
    const dispatch = useDispatch();
    const { packages, hotels, commonInclusions } = useSelector(store => store.package);

    useEffect(() => {
        if (packages.length > 0 && hotels.length > 0 && commonInclusions.length > 0) {
            console.log("Data already exists, no need to fetch...");
            return;
        } else {
            console.log(`Missing data: Packages (${packages.length}), Hotels (${hotels.length}), Common Inclusions (${commonInclusions.length})`);
        }        

        const fetchData = async () => {
            dispatch(setLoading(true));
            try {
                const [packagesResponse, hotelsResponse, commonInclusionsResponse] = await Promise.all([
                    packageServices.fetchPackages(),
                    hotelServices.fetchHotels(),
                    packageServices.fetchCommonInclusions()
                ]);

                // Parse and structure the data
                const parsedPackages = parsePackages(packagesResponse);

                dispatch(setPackages(parsedPackages));
                dispatch(setHotels(hotelsResponse.documents));
                dispatch(setCommonInclusions(commonInclusionsResponse.documents))
            } catch (error) {
                console.error('Error fetching home data:', error);
                dispatch(setError(error.message));
            } finally {
                dispatch(setLoading(false));
            }
        };

        fetchData();
    }, [dispatch]);
};

export default useFetchData;