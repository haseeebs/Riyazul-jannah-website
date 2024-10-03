import { Client, Databases, ID, Query } from "appwrite";
import config from "../config/config";

class NotificationServices {
    client = new Client();
    databases;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.projectId);
        this.databases = new Databases(this.client);
    }

    // Fetch active notifications
    async fetchActiveNotifications() {
        try {
            const response = await this.databases.listDocuments(
                config.databaseId,
                config.notificationsCollectionId,
                [
                    Query.equal("isActive", true),
                    Query.orderDesc("$createdAt"),
                ]
            );
            return response.documents; // Return only documents
        } catch (error) {
            console.error("Error fetching active notifications:", error);
            throw error;
        }
    }

    async fetchAllNotifications() {
        try {
            const response = await this.databases.listDocuments(
                config.databaseId,
                config.notificationsCollectionId,
                [
                    Query.orderDesc("$createdAt"),
                ]
            );
            return response.documents;
        } catch (error) {
            console.error("Error fetching all notifications:", error);
            throw error;
        }
    }

    // Add a new notification
    async addNotification(notification) {
        try {
            const response = await this.databases.createDocument(
                config.databaseId,
                config.notificationsCollectionId,
                ID.unique(),
                {
                    title: notification.title,
                    message: notification.message,
                    isActive: true,
                    expiryDate: notification.expiryDate,
                }
            );
            return response;
        } catch (error) {
            console.error("Error adding notification:", error);
            throw error;
        }
    }

    async deactivateNotification(notificationId) {
        try {
            return await this.databases.updateDocument(
                config.databaseId,
                config.notificationsCollectionId,
                notificationId,
                {
                    isActive: false
                }
            );
        } catch (error) {
            console.error("Error deactivating notification:", error);
            throw error;
        }
    };

    async activateNotification(notificationId) {
        try {
            return await this.databases.updateDocument(
                config.databaseId,
                config.notificationsCollectionId,
                notificationId,
                {
                    isActive: false
                }
            );
        } catch (error) {
            console.error("Error deactivating notification:", error);
            throw error;
        }
    };

    // Delete a notification
    async deleteNotification(notificationId) {
        try {
            await this.databases.deleteDocument(
                config.databaseId,
                config.notificationsCollectionId,
                notificationId
            );
            return true;
        } catch (error) {
            console.error("Error deleting notification:", error);
            throw error;
        }
    }
}

const notificationServices = new NotificationServices();
export default notificationServices;