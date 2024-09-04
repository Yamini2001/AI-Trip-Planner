import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import placeImage from '../place.png'; // Ensure this path is correct
import fetchPhoto from '../../service/GlobalApi';

const PHOTO_REF_URL = 'https://via.placeholder.com/1000?text=Photo+Not+Available';

function HotelCardItem({ hotelOptions }) {
    const [photoUrl, setPhotoUrl] = useState(PHOTO_REF_URL);

    useEffect(() => {
        const fetchHotelPhoto = async () => {
            if (!hotelOptions || !hotelOptions.hotelName || !hotelOptions.hotelAddress) {
                console.warn('Missing hotel data:', hotelOptions);
                return;
            }

            const query = `${hotelOptions.hotelName} hotel ${hotelOptions.hotelAddress}`;
            console.log('Fetching photo for:', query); // Log the query

            try {
                const response = await axios.get(UNSPLASH_API_URL, {
                    params: {
                        query: query,
                        client_id: UNSPLASH_ACCESS_KEY,
                        per_page: 1,
                    },
                });
                console.log('Unsplash response:', response.data); // Log the response

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
    }, [hotelOptions]);

    return (
        <Link
            to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${hotelOptions.hotelName}, ${hotelOptions.hotelAddress}`)}`}
            className="hover:scale-105 transition-transform cursor-pointer"
            target="_blank"
            rel="noopener noreferrer"
        >
            <div className="rounded-lg bg-white shadow-lg p-4">
                <img 
                    src={photoUrl || placeImage} 
                    alt={`${hotelOptions.hotelName || 'Hotel'}`} 
                    className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <div className="flex flex-col gap-2">
                    <h2 className="font-medium text-lg">{hotelOptions.hotelName || 'Unknown Hotel'}</h2>
                    <h2 className="text-sm text-gray-500">📍 {hotelOptions.hotelAddress || 'Address not available'}</h2>
                    <h2 className="text-sm text-gray-700">💰 {hotelOptions.price || 'Price not available'}</h2>
                    <h2 className="text-sm text-yellow-500">⭐ {hotelOptions.rating || 'Rating not available'}</h2>
                </div>
            </div>
        </Link>
    );
}

export default HotelCardItem;
