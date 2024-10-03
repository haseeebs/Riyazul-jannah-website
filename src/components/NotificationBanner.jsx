import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import notificationService from "../services/notificationService";
import { setNotifications } from "../store/notificationSlice";

const NotificationBanner = () => {
    const dispatch = useDispatch();
    const { notifications } = useSelector((store) => store.notification);

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchNotifications = async () => {
            if (notifications.length === 0) {
                try {
                    const response = await notificationService.fetchActiveNotifications();
                    dispatch(setNotifications(response));
                } catch (error) {
                    console.error("Error fetching notifications:", error);
                }
            }
        };

        fetchNotifications();
    }, [dispatch, notifications.length]);

    useEffect(() => {
        if (notifications.length > 1) {
            const interval = setInterval(() => {
                setCurrentIndex((prev) =>
                    prev === notifications.length - 1 ? 0 : prev + 1
                );
            }, 5000);

            return () => clearInterval(interval);
        }
    }, [notifications.length]);

    if (notifications.length === 0) return null;

    const currentNotification = notifications[currentIndex];

    return (
        <div className="fixed -bottom-8 z-20 right-0 mx-auto px-4 pb-12">
            <div className="relative overflow-hidden bg-gradient-to-r from-lime-700 via-lime-600 to-lime-800 rounded-lg p-4 max-w-xs animate-gradient-x">
                <div className="absolute inset-0 bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm"></div>
                <div className="relative flex items-start gap-3">
                    <div className="rounded-full bg-white bg-opacity-20 p-2">
                        <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-white">
                            {currentNotification.title}
                        </p>
                        <p className="text-xs text-white text-opacity-80">
                            {currentNotification.message}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotificationBanner;