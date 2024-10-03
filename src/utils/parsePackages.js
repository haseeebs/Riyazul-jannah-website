import toast from "react-hot-toast";

export const parsePackages = (packagesResponse) => {
    if (!packagesResponse || !packagesResponse.documents) {
        console.warn('Invalid packages response');
        toast.error('Invalid packages response');
        return [];
    }

    return packagesResponse.documents.map(pkg => {
        try {
            return {
                ...pkg,
                durations: pkg.durations?.map(duration => JSON.parse(duration)) || [],
                inclusions: pkg.inclusions?.map(inc => JSON.parse(inc).description) || [],
                exclusions: pkg.exclusions?.map(exc => JSON.parse(exc).description) || [],
            };
        } catch (error) {
            console.error('Error parsing package data:', error, pkg);
            return pkg;
        }
    });
};