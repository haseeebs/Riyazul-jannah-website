import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import notificationService from "../../services/notificationService";
import { useDispatch, useSelector } from "react-redux";
import { setNotifications, addNotification, removeNotification, deactivateNotification, activateNotification } from "../../store/notificationSlice";

const AdminNotifications = () => {
    const dispatch = useDispatch();
    const { notifications } = useSelector((store) => store.notification);

    const [notification, setNotification] = useState({
        title: "",
        message: "",
        expiryDate: "",
    });

    const [activeTab, setActiveTab] = useState("active");

    useEffect(() => {
        const fetchNotifications = async () => {
            if (notifications.length > 0) return;

            const fetchPromise = notificationService.fetchAllNotifications();

            toast.promise(fetchPromise, {
                loading: "Loading notifications...",
                success: "Notifications loaded successfully!",
                error: "Failed to load notifications."
            });

            try {
                const response = await fetchPromise;
                dispatch(setNotifications(response));
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        };

        fetchNotifications();
    }, [dispatch, notifications.length]);

    const handleDeactivate = async (id) => {
        const deactivatePromise = notificationService.deactivateNotification(id);

        toast.promise(deactivatePromise, {
            loading: "Deactivating notification...",
            success: "Notification deactivated successfully",
            error: "Failed to deactivate notification"
        });

        try {
            await deactivatePromise;
            dispatch(deactivateNotification(id));
        } catch (error) {
            console.error("Error deactivating notification:", error);
        }
    };

    const handleActivate = async (id) => {
        const activatePromise = notificationService.activateNotification(id);

        toast.promise(activatePromise, {
            loading: "Activating notification...",
            success: "Notification activated successfully",
            error: "Failed to activate notification"
        });

        try {
            await activatePromise;
            dispatch(activateNotification(id));
        } catch (error) {
            console.error("Error activating notification:", error);
        }
    };

    const handleDelete = async (id) => {
        const deletePromise = notificationService.deleteNotification(id);

        toast.promise(deletePromise, {
            loading: "Deleting notification...",
            success: "Notification deleted successfully",
            error: "Failed to delete notification"
        });

        try {
            await deletePromise;
            dispatch(removeNotification(id));
        } catch (error) {
            console.error("Error deleting notification:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const addNotificationPromise = notificationService.addNotification(notification);

        toast.promise(addNotificationPromise, {
            loading: "Adding notification...",
            success: "Notification added successfully!",
            error: "Failed to add notification. Please try again."
        });

        try {
            const newNotification = await addNotificationPromise;
            setNotification({ title: "", message: "", expiryDate: "" });
            dispatch(addNotification(newNotification));
        } catch (error) {
            console.error("Error adding notification:", error);
        }
    };

    // Filter notifications based on active tab
    const activeNotifications = notifications.filter(notif => notif.isActive);
    const inactiveNotifications = notifications.filter(notif => !notif.isActive);

    return (
        <div className="max-w-xl mx-auto p-6">
            <h2 className="text-2xl font-bold text-lime-800 mb-6">Add New Notification</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-lime-700 mb-2">Title</label>
                    <input
                        type="text"
                        value={notification.title}
                        onChange={(e) =>
                            setNotification((prev) => ({
                                ...prev,
                                title: e.target.value,
                            }))
                        }
                        className="w-full rounded-xl border-2 border-lime-200 p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-lime-700 mb-2">Message</label>
                    <textarea
                        value={notification.message}
                        onChange={(e) =>
                            setNotification((prev) => ({
                                ...prev,
                                message: e.target.value,
                            }))
                        }
                        className="w-full rounded-xl border-2 border-lime-200 p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-lime-700 mb-2">Expiry Date</label>
                    <input
                        type="date"
                        value={notification.expiryDate}
                        onChange={(e) =>
                            setNotification((prev) => ({
                                ...prev,
                                expiryDate: e.target.value,
                            }))
                        }
                        className="w-full rounded-xl border-2 border-lime-200 p-2"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-lime-500 text-white py-2 rounded-xl hover:bg-lime-600"
                >
                    Add Notification
                </button>
            </form>

            {/* Tabs */}
            <div className="flex justify-between mt-8 mb-4">
                <button
                    className={`w-full px-4 py-2 ${activeTab === 'active' ? 'bg-lime-500 text-white' : 'bg-lime-100 text-lime-800'} rounded-l-lg`}
                    onClick={() => setActiveTab('active')}
                >
                    Active Notifications
                </button>
                <button
                    className={`w-full px-4 py-2 ${activeTab === 'inactive' ? 'bg-lime-500 text-white' : 'bg-lime-100 text-lime-800'} rounded-r-lg`}
                    onClick={() => setActiveTab('inactive')}
                >
                    Inactive Notifications
                </button>
            </div>

            {/* Notifications List */}
            <div className="space-y-4">
                {activeTab === 'active' ? (
                    activeNotifications.length > 0 ? (
                        activeNotifications.map((notif) => (
                            <div
                                key={notif.$id}
                                className="border border-lime-200 rounded-xl p-4 flex justify-between items-center"
                            >
                                <div>
                                    <p className="font-medium">{notif.title}</p>
                                    <p className="text-sm text-gray-600">{notif.message}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleDeactivate(notif.$id)}
                                        className="px-3 py-1 text-yellow-600 bg-yellow-100 rounded-lg hover:bg-yellow-200"
                                    >
                                        Deactivate
                                    </button>
                                    <button
                                        onClick={() => handleDelete(notif.$id)}
                                        className="px-3 py-1 text-red-600 bg-red-100 rounded-lg hover:bg-red-200"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No active notifications</p>
                    )
                ) : (
                    inactiveNotifications.length > 0 ? (
                        inactiveNotifications.map((notif) => (
                            <div
                                key={notif.$id}
                                className="border border-lime-200 rounded-xl p-4 flex justify-between items-center"
                            >
                                <div>
                                    <p className="font-medium">{notif.title}</p>
                                    <p className="text-sm text-gray-600">{notif.message}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleActivate(notif.$id)}
                                        className="px-3 py-1 text-green-600 bg-green-100 rounded-lg hover:bg-green-200"
                                    >
                                        Activate
                                    </button>
                                    <button
                                        onClick={() => handleDelete(notif.$id)}
                                        className="px-3 py-1 text-red-600 bg-red-100 rounded-lg hover:bg-red-200"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No inactive notifications</p>
                    )
                )}
            </div>
        </div>
    );
};

export default AdminNotifications;