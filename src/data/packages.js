import { MadinahImage2, MadinahImage3, MadinahImage4 } from "../assets/images";

const packageImages = {
    Budget: MadinahImage4,
    Deluxe: MadinahImage2,
    "5-Star": MadinahImage3,
};
const packages = [
    {
        id: 1,
        type: "Budget",
        makkahHotelId: 1,
        madinahHotelId: 6,
        date: "10th March 2024",
        image: packageImages.Budget,
        durations: {
            15: {
                basePrice: 65000,
                sharedRoomPrices: { quad: 65000, triple: 67500, double: 70000 },
            },
            20: {
                basePrice: 75000,
                sharedRoomPrices: { quad: 75000, triple: 77500, double: 80000 },
            },
            25: {
                basePrice: 85000,
                sharedRoomPrices: { quad: 85000, triple: 87500, double: 90000 },
            },
        },
        inclusions: [],
        exclusions: [
            { id: 6, description: "Luxury Accommodation" },
            { id: 7, description: "Premium Meals" },
            { id: 8, description: "Personal Guide" },
            { id: 9, description: "Shopping Assistance" },
        ],
    },
    {
        id: 2,
        type: "Deluxe",
        makkahHotelId: 2,
        madinahHotelId: 7,
        // date: "10th March 2024",
        image: packageImages.Deluxe,
        durations: {
            15: {
                basePrice: 75000,
                sharedRoomPrices: { quad: 75000, triple: 77500, double: 80000 },
            },
            20: {
                basePrice: 85000,
                sharedRoomPrices: { quad: 85000, triple: 87500, double: 90000 },
            },
            25: {
                basePrice: 95000,
                sharedRoomPrices: { quad: 95000, triple: 97500, double: 100000 },
            },
        },
        inclusions: [
            { id: 6, description: "Ziyarat Tours" },
            { id: 10, description: "Luxury Dining" },
        ],
        exclusions: [
            { id: 8, description: "Personal Guide" },
            { id: 9, description: "Shopping Assistance" },
            { id: 11, description: "Optional luxury services" },
        ],
    },
    {
        id: 3,
        type: "5-Star",
        makkahHotelId: 3,
        madinahHotelId: 8,
        // date: "20th April 2024",
        image: packageImages["5-Star"],
        durations: {
            15: {
                basePrice: 115000,
                sharedRoomPrices: { quad: 115000, triple: 117500, double: 120000 },
            },
            20: {
                basePrice: 135000,
                sharedRoomPrices: { quad: 135000, triple: 137500, double: 140000 },
            },
            25: {
                basePrice: 155000,
                sharedRoomPrices: { quad: 155000, triple: 157500, double: 160000 },
            },
        },
        inclusions: [
            { id: 6, description: "Ziyarat Tours" },
            { id: 12, description: "Comprehensive Ziyarat Tours" },
            { id: 13, description: "Special Souvenir Package" },
            { id: 14, description: "Personalized Assistance" },
        ],
        exclusions: [
            { id: 8, description: "Personal Guide" },
            { id: 9, description: "Shopping Assistance" },
            { id: 15, description: "Optional luxury services" },
        ],
    },
];



const commonInclusions = [
    { id: 1, description: "Economy Flights" },
    { id: 2, description: "Visa Processing" },
    { id: 3, description: "Standard Transport" },
    { id: 4, description: "Basic Meals" },
    { id: 5, description: "Indian Guide" },
    { id: 6, description: "Ziyarat Tours" },
    { id: 7, description: "Indian Guide" },
    { id: 8, description: "Personalized Assistance" },
];

const hotels = [
    // Makkah Hotels
    {
        id: 1,
        city: "Makkah",
        name: "Hotel Al Safwah",
        distance: "700m",
        category: "Economy",
        walkingTime: "8-10 mins",
        hasShuttle: true,
        transport: "Free Shuttle Bus (5 min journey)",
        images: [
        "https://images.unsplash.com/photo-1731351621470-8aebda14d242?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1731412468777-79db0b37cfda?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1731351621470-8aebda14d242?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1731412468777-79db0b37cfda?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1731351621470-8aebda14d242?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ]
    },
    {
        id: 2,
        city: "Makkah",
        name: "Hotel Al Ghufran",
        distance: "500m",
        category: "Deluxe",
        walkingTime: "6-7 mins",
        hasShuttle: true,
        transport: "Free Shuttle Bus (5 min journey)",
        images: [
        "https://images.unsplash.com/photo-1731351621470-8aebda14d242?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1731412468777-79db0b37cfda?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1731351621470-8aebda14d242?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1731412468777-79db0b37cfda?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1731351621470-8aebda14d242?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ]
    },
    {
        id: 3,
        city: "Makkah",
        name: "Le Meridien",
        distance: "300m",
        category: "5-Star",
        walkingTime: "4-5 mins",
        hasShuttle: false,
        transport: "",
        images: [
        "https://images.unsplash.com/photo-1731351621470-8aebda14d242?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1731412468777-79db0b37cfda?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1731351621470-8aebda14d242?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1731412468777-79db0b37cfda?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1731351621470-8aebda14d242?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ]
    },
    {
        id: 4,
        city: "Makkah",
        name: "Swissotel Al Maqam",
        distance: "100m",
        category: "Luxury",
        walkingTime: "2-3 mins",
        hasShuttle: false,
        transport: "",
        images: [
        "https://images.unsplash.com/photo-1731351621470-8aebda14d242?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1731412468777-79db0b37cfda?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1731351621470-8aebda14d242?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1731412468777-79db0b37cfda?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1731351621470-8aebda14d242?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ]
    },
    {
        id: 5,
        city: "Makkah",
        name: "Anjum Hotel",
        distance: "50m",
        category: "Elite 5★",
        walkingTime: "1-2 mins",
        hasShuttle: false,
        transport: "",
        images: [
        "https://images.unsplash.com/photo-1731351621470-8aebda14d242?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1731412468777-79db0b37cfda?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1731351621470-8aebda14d242?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1731412468777-79db0b37cfda?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1731351621470-8aebda14d242?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ]
    },

    // Madinah Hotels
    {
        id: 6,
        city: "Madinah",
        name: "Al Eiman Royal",
        distance: "300m",
        category: "Economy",
        walkingTime: "4-5 mins",
        hasShuttle: true,
        transport: "Free Shuttle Bus (5 min journey)",
        images: [
        "https://images.unsplash.com/photo-1731351621470-8aebda14d242?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1731412468777-79db0b37cfda?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1731351621470-8aebda14d242?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1731412468777-79db0b37cfda?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1731351621470-8aebda14d242?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ]
    },
    {
        id: 7,
        city: "Madinah",
        name: "Al Safwah Royal Orchid",
        distance: "200m",
        category: "Deluxe",
        walkingTime: "3-4 mins",
        hasShuttle: true,
        transport: "Free Shuttle Bus (5 min journey)",
        images: [
        "https://images.unsplash.com/photo-1731351621470-8aebda14d242?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1731412468777-79db0b37cfda?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1731351621470-8aebda14d242?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1731412468777-79db0b37cfda?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1731351621470-8aebda14d242?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ]
    },
    {
        id: 8,
        city: "Madinah",
        name: "Le Meridien Medina",
        distance: "150m",
        category: "5-Star",
        walkingTime: "2-3 mins",
        hasShuttle: false,
        transport: "",
        images: [
        "https://images.unsplash.com/photo-1731351621470-8aebda14d242?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1731412468777-79db0b37cfda?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1731351621470-8aebda14d242?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1731412468777-79db0b37cfda?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1731351621470-8aebda14d242?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ]
    },
    {
        id: 9,
        city: "Madinah",
        name: "Pullman Zamzam",
        distance: "100m",
        category: "Luxury",
        walkingTime: "1-2 mins",
        hasShuttle: false,
        transport: "",
        images: [
        "https://images.unsplash.com/photo-1731351621470-8aebda14d242?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1731412468777-79db0b37cfda?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1731351621470-8aebda14d242?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1731412468777-79db0b37cfda?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1731351621470-8aebda14d242?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ]
    },
    {
        id: 10,
        city: "Madinah",
        name: "Anwar Al Madinah Mövenpick",
        distance: "50m",
        category: "Elite 5★",
        walkingTime: "1 min",
        hasShuttle: false,
        transport: "",
        images: [
        "https://images.unsplash.com/photo-1731351621470-8aebda14d242?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1731412468777-79db0b37cfda?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1731351621470-8aebda14d242?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1731412468777-79db0b37cfda?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1731351621470-8aebda14d242?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ]
    },
];

export { hotels, packages, commonInclusions };