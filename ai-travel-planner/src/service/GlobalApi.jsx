import axios from 'axios';

const BASE_URL = '/api/v1/places:searchText'; // Use proxy path
const config = {
    headers:{
        'Content-Type': 'application/json',
        'X-Google-Api-Key': import.meta.env.VITE_GOOGLE_PLACE_API_KEY,
        'X-Goog-FieldMask': [
            'places.photos',
            'places.displayName',
            'places.id',
        ],
    },
};

export const GetPlaceDetails = (data) => axios.post(BASE_URL, data, config);
