import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import placeImage from '../place.png'; // Ensure this path is correct

const UNSPLASH_API_URL = 'https://api.unsplash.com/search/photos';
const UNSPLASH_ACCESS_KEY = 'YOUR_UNSPLASH_ACCESS_KEY'; // Replace with your actual Unsplash access key
const PHOTO_REF_URL = 'https://via.placeholder.com/1000?text=Photo+Not+Available';

function HotelCardItem({ hotel }) {
    const [photoUrl, setPhotoUrl] = useState(PHOTO_REF_URL);

    useEffect(() => {
        const fetchHotelPhoto = async () => {
            // Check if hotel object is valid
            if (!hotel || !hotel.hotelName || !hotel.hotelAddress) {
                console.warn('Missing hotel data:', hotel);
                return;
            }

            const query = `${hotel.hotelName} hotel ${hotel.hotelAddress}`;
            try {
                const response = await axios.get(UNSPLASH_API_URL, {
                    params: {
                        query: query,
                        client_id: UNSPLASH_ACCESS_KEY,
                        per_page: 1,
                    },
                });

                // Ensure there are results and access the URLs object safely
                const photo = response.data.results[0];
                if (photo && photo.urls && photo.urls.small) {
                    setPhotoUrl(photo.urls.small);
                } else {
                    console.warn('No photos found for query:', query);
                    setPhotoUrl(PHOTO_REF_URL); // Use placeholder if no photo found
                }
            } catch (error) {
                console.error('Error fetching hotel photo:', error.message);
                setPhotoUrl(PHOTO_REF_URL); // Fallback to placeholder in case of error
            }
        };

        fetchHotelPhoto();
    }, [hotel]);

    return (
        <Link
            to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${hotel.hotelName}, ${hotel.hotelAddress}`)}`}
            className="hover:scale-105 transition-transform cursor-pointer"
            target="_blank"
            rel="noopener noreferrer"
        >
            <div className="rounded-lg bg-white shadow-lg p-4">
                <img 
                    src={photoUrl} 
                    alt={`${hotel.hotelName || 'Hotel'}`} 
                    className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <div className="flex flex-col gap-2">
                    <h2 className="font-medium text-lg">{hotel.hotelName || 'Unknown Hotel'}</h2>
                    <h2 className="text-sm text-gray-500">📍 {hotel.hotelAddress || 'Address not available'}</h2>
                    <h2 className="text-sm text-gray-700">💰 {hotel.price || 'Price not available'}</h2>
                    <h2 className="text-sm text-yellow-500">⭐ {hotel.rating || 'Rating not available'}</h2>
                </div>
            </div>
        </Link>
    );
}

export default HotelCardItem;
