import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    packages: [],
    hotels: [],
    commonInclusions: [],
    allImages: [],
    foodImages: [],
    instagramMedia: {
        items: [],
        nextCursor: null,
        error: null
    },
    loading: false,
    error: null
}

const packageSlice = createSlice({
    name: "package",
    initialState,
    reducers: {
        setPackages: (state, action) => {
            state.packages = action.payload;
        },
        removePackage: (state, action) => {
            state.packages = state.packages.filter(pkg => pkg.$id !== action.payload);
        },
        setHotels: (state, action) => {
            state.hotels = action.payload;
        },
        removeHotel: (state, action) => {
            state.hotels = state.hotels.filter(hotel => hotel.$id !== action.payload);
        },
        setCommonInclusions: (state, action) => {
            state.commonInclusions = action.payload;
        },
        removeCommonInclusion: (state, action) => {
            state.commonInclusions = state.commonInclusions.filter(
                inclusion => inclusion.$id !== action.payload
            )
        },
        setAllImages: (state, action) => {
            state.allImages = action.payload;
        },
        removeImages: (state, action) => {
            state.allImages = state.allImages.filter(
                image => image.$id !== action.payload
            )
        },
        setFoodImages: (state, action) => {
            state.foodImages = action.payload;
        },
        removeFoodImage: (state, action) => {
            state.foodImages = state.foodImages.filter(
                image => image.$id !== action.payload
            )
        },
        setInstagramMedia: (state, action) => {
            const { items, nextCursor } = action.payload;
            state.instagramMedia.items = items;
            state.instagramMedia.nextCursor = nextCursor;
        },
        appendInstagramMedia: (state, action) => {
            const { items, nextCursor } = action.payload;
            state.instagramMedia.items = [...state.instagramMedia.items, ...items];
            state.instagramMedia.nextCursor = nextCursor;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    }
});

export const { setPackages, removePackage, setHotels, removeHotel, setCommonInclusions, removeCommonInclusion, setAllImages, removeImages, setFoodImages, removeFoodImage, setInstagramMedia, appendInstagramMedia, setLoading, setError } = packageSlice.actions;
export default packageSlice.reducer;