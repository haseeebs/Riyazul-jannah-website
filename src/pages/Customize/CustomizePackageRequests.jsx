import { useEffect, useState } from 'react';
import packageServices from '../../services/packageService';
import CustomizePackageDetails from './CustomizePackageDetails';
import toast from 'react-hot-toast';

const CustomizePackageRequests = () => {
    const [requestsData, setRequestsData] = useState(null);
    const [error, setError] = useState(null);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchCustomizePackageDetails = async () => {
            try {
                toast.success("Fetching started...");
                setIsLoading(true);
                const response = await packageServices.fetchCustomizePackageRequests();
                setRequestsData(response.documents);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching package details:', error);
                setError('Unable to fetch package details. Please try again later.');
                setIsLoading(false);
            }
        };

        // Fetch data only if not already loaded
        if (!requestsData) {
            fetchCustomizePackageDetails();
        }
    }, [requestsData]);

    if (error) {
        return (
            <div className="text-center mt-20">
                <div className="inline-flex items-center text-red-500">
                    <span className="material-icons text-4xl mr-2">error</span>
                    {error}
                </div>
                <button
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    onClick={() => setRequestsData(null)} // Trigger re-fetch on retry
                    aria-label="Retry Fetch"
                >
                    Retry
                </button>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
            </div>
        );
    }

    if (requestsData && requestsData.length === 0) {
        return (
            <div className="flex items-center justify-center text-center text-gray-500 h-screen">
                <div className="inline-flex flex-col items-center">
                    <span className="material-icons text-6xl text-gray-300 mb-4">inbox</span>
                    <p className="text-lg font-semibold">No requests found</p>
                    <p className="text-sm text-gray-400 mt-2">
                        There are no customize package requests at the moment.
                    </p>
                </div>
            </div>
        );
    }

    if (!requestsData) {
        return <div className="text-center text-gray-500 mt-10">Loading package details...</div>;
    }

    return (
        <div className="max-w-7xl mx-auto min-h-screen p-4">
            {selectedRequest ? (
                <div>
                    <button
                        className="mb-4 px-4 py-2 bg-lime-500 text-white rounded hover:bg-lime-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => setSelectedRequest(null)}
                        disabled={isLoading}
                        aria-label="Back to Requests"
                    >
                        Back to Requests
                    </button>
                    <CustomizePackageDetails packageDetail={selectedRequest} />
                </div>
            ) : (
                <div>
                    <h2 className="text-2xl font-bold mb-6 text-lime-900">Customize Package Requests</h2>
                    <ul className="space-y-4">
                        {requestsData.map((data, index) => (
                            <li
                                key={index}
                                className="p-10 bg-lime-50 shadow-md rounded-lg cursor-pointer hover:bg-lime-200 focus:ring-2 focus:ring-lime-500 focus:outline-none transition transform hover:-translate-y-1"
                                onClick={() => setSelectedRequest(data)}
                                tabIndex={0}
                                aria-label={`Request from ${data.fullName}`}
                                role="button"
                            >
                                <div className="flex items-center justify-between">
                                    <p className="text-lg font-semibold text-lime-800">Request From: {data.fullName}</p>
                                    <p className="text-md text-gray-500">{new Date(data.$createdAt).toLocaleString()}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default CustomizePackageRequests;