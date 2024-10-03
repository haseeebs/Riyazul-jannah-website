import { Client, Databases, ID, Storage } from "appwrite";
import config from "../config/config";
import toast from "react-hot-toast";

class PackageServices {
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

    // Fetch all packages
    async fetchPackages() {
        try {
            const response = await this.databases.listDocuments(
                config.databaseId,
                config.packageCollectionId
            );
            return response;
        } catch (error) {
            console.error("Error fetching pacakges:", error)
            throw error;
        }
    }

    // Add a new package
    async addPackage(packageData) {
        try {
            const response = await this.databases.createDocument(
                config.databaseId,
                config.packageCollectionId,
                ID.unique(),
                packageData
            );
            return response;
        } catch (error) {
            console.error("Error adding package:", error);
            toast.error(error.response);
        }
    }

    // Update an existing package
    async updatePackage(packageId, updateData) {
        try {
            const response = await this.databases.updateDocument(
                config.databaseId,
                config.packageCollectionId,
                packageId,
                updateData
            );
            return response;
        } catch (error) {
            console.error("Error updating package:", error);
            throw error;
        }
    }

    // Delete a package
    async deletePackage(packageId) {
        try {
            await this.databases.deleteDocument(
                config.databaseId,
                config.packageCollectionId,
                packageId
            );
            return true;
        } catch (error) {
            console.error("Error deleting package:", error);
            throw error;
        }
    }

    // File upload service
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

    // Delete file
    async deleteFile(fileId) {
        try {
            await this.storage.deleteFile(
                config.bucketId,
                fileId
            );
            return true;
        } catch (error) {
            console.error("Error deleting file:", error);
            throw error;
        }
    }

    // Get file preview URL
    getFilePreview(fileId) {
        try {
            return this.storage.getFilePreview(
                config.bucketId,
                fileId,
            );
        } catch (error) {
            console.error("Error getting file preview:", error);
            throw error;
        }
    }

    // Get optimized file preview URL
    getOptimizedFilePreview(fileId) {
        try {
            return this.storage.getFilePreview(
                config.bucketId,
                fileId,
                400, // width
                300, // height
                'center', // Gravity
                50, // 75 quality - slightly reduced quality but still good
                // 'webp', // modern image format
            );
        } catch (error) {
            console.error("Error getting file preview:", error);
            throw error;
        }
    }

    // List all files
    async listFiles() {
        try {
            const response = await this.storage.listFiles(
                config.bucketId,
            );
            return response;
        } catch (error) {
            console.error("Error listing files:", error);
            throw error;
        }
    }

    async addCommonInclusion(commonInclutionData) {
        try {
            return await this.databases.createDocument(
                config.databaseId,
                config.commonInclusionsCollectionId,
                ID.unique(),
                commonInclutionData
            )
        } catch (error) {
            console.error("Error adding common inclusions:", error);
            throw error;
        }
    }

    async fetchCommonInclusions() {
        try {
            return await this.databases.listDocuments(
                config.databaseId,
                config.commonInclusionsCollectionId
            );
        } catch (error) {
            console.error("Error fetching common inclusions:", error);
            throw error;
        }
    }

    async removeCommonInclusion(inclusionId) {
        try {
            await this.databases.deleteDocument(
                config.databaseId,
                config.commonInclusionsCollectionId,
                inclusionId
            );
            return true;
        } catch (error) {
            console.error("Error deleting common inclusion:", error.response);
            throw error.response;
        }
    }

    async addFoodImage(file) {
        try {
            const response = await this.storage.createFile(
                config.foodImagesBucketId,
                ID.unique(),
                file
            );
            return response;
        } catch (error) {
            console.error("Error uploading file:", error);
            throw error;
        }
    }

    async deleteFoodImage(fileId) {
        try {
            await this.storage.deleteFile(
                config.foodImagesBucketId,
                fileId
            );
            return true;
        } catch (error) {
            console.error("Error deleting file:", error);
            throw error;
        }
    }

    async fetchFoodImages() {
        try {
            const response = await this.storage.listFiles(
                config.foodImagesBucketId,
            )
            return response;
        } catch (error) {
            console.error("Error listing files:", error);
            throw error;
        }
    }

    getFoodFilePreview(fileId) {
        try {
            if (!fileId) {
                throw new Error("FileId is required");
            }
            return this.storage.getFilePreview(
                config.foodImagesBucketId,
                fileId,
                400,
                300,
            );
        } catch (error) {
            console.error("Error getting file preview:", error);
            throw error;
        }
    }

    async addCustomizePackageRequest(customizePackageData) {
        try {
            return this.databases.createDocument(
                config.databaseId,
                config.customizePackageRequestCollectionId,
                ID.unique(),
                customizePackageData
            )
        } catch (error) {
            console.error('Error adding customize package request:', error.message);
            toast.error(
                error.message.includes('network')
                    ? 'Network error. Please check your connection.'
                    : 'Error sending customize package request'
            );
        }
    }

    async fetchCustomizePackageRequests() {
        try {
            const response = await this.databases.listDocuments(
                config.databaseId,
                config.customizePackageRequestCollectionId
            );
            return response;
        } catch (error) {
            console.error("Error fetching customize package requests:", error);
            throw error;
        }
    }

}

const packageServices = new PackageServices();

export default packageServices;