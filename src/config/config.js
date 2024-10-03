const config = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    projectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    databaseId: String(import.meta.env.VITE_APPWRITE_DATEBASE_ID),
    packageCollectionId: String(import.meta.env.VITE_APPWRITE_PACKAGE_COLLECTION),
    hotelCollectionId: String(import.meta.env.VITE_APPWRITE_HOTEL_COLLECTION),
    commonInclusionsCollectionId: String(import.meta.env.VITE_APPWRITE_COMMON_INCLUSIONS_COLLECTION),
    foodImagesCollectionId: String(import.meta.env.VITE_APPWRITE_FOOD_IMAGES_COLLECTION),
    foodImagesBucketId: String(import.meta.env.VITE_APPWRITE_FOOD_IMAGES_BUCKET_ID),
    bucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    customizePackageRequestCollectionId: String(import.meta.env.VITE_APPWRITE_CUSTOMIZE_PACKAGE_REQUEST_COLLECTION_ID),
    notificationsCollectionId: String(import.meta.env.VITE_APPWRITE_NOTIFICATIONS_COLLECTION_ID),
    instagramAccessToken: String(import.meta.env.VITE_INSTAGRAM_ACCESS_TOKEN),
};

export default config;