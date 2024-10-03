import { Client, Databases, ID, Storage } from "appwrite";
import config from "../config/config";

class HotelServices {
    client = new Client();
    databases;
    storage;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.projectId);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    // Add a new hotel
    async addHotel(hotelData) {
        try {
            const response = await this.databases.createDocument(
                config.databaseId,
                config.hotelCollectionId,
                ID.unique(),
                hotelData
            );
            return response;
        } catch (error) {
            console.error("Error adding hotel:", error);
            throw error;
        }
    }

    // Fetch all hotels
    async fetchHotels() {
        try {
            const response = await this.databases.listDocuments(
                config.databaseId,
                config.hotelCollectionId
            );
            // return response.documents.map(hotel => ({
            //     $id: hotel.$id,
            //     name: hotel.name,
            //     city: hotel.city,
            //     category: hotel.category,
            //     distance: hotel.distance,
            //     walkingTime: hotel.walkingTime,
            //     hasShuttle: hotel.hasShuttle === '1',
            //     transport: hotel.transport,
            //     images: hotel.images ?? []
            // }));

            return response;
        } catch (error) {
            console.error("Error fetching hotels:", error);
            throw error;
        }
    }

    // Update hotel
    async updateHotel(hotelId, updateData) {
        try {
            const response = await this.databases.updateDocument(
                config.databaseId,
                config.hotelCollectionId,
                hotelId,
                updateData
            );
            return response;
        } catch (error) {
            console.error("Error updating hotel:", error);
            throw error;
        }
    }

    // Delete hotel
    async deleteHotel(hotelId) {
        try {
            await this.databases.deleteDocument(
                config.databaseId,
                config.hotelCollectionId,
                hotelId
            );
            return true;
        } catch (error) {
            console.error("Error deleting hotel:", error);
            throw error;
        }
    }

    // Get file view URL
    async fileUpload(file) {
        try {
            const response = await this.storage.createFile(
                config.bucketId,
                ID.unique(),
                file
            );
            return response;
        } catch (error) {
            console.error("Error uploading file:", error);
            throw error;
        }
    }

    // Get file preview URL
    getFilePreview(fileId) {
        try {
            return this.storage.getFilePreview(
                config.bucketId,
                fileId
            );
        } catch (error) {
            console.error("Error getting file preview:", error);
            throw error;
        }
    }

    async deleteFile(fileId) {
        try {
            return await this.storage.deleteFile(
                config.bucketId,
                fileId
            );
        } catch (error) {
            console.error("Error deleting file:", error);
            throw error;
        }
    }
}

const hotelServices = new HotelServices();
export default hotelServices;