import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import placeImage from '../place.png';

const UNSPLASH_API_URL = 'https://api.unsplash.com/search/photos';
const UNSPLASH_ACCESS_KEY = 'MYf-UXFsQbzryZ52hZ_F7d_VZXu6X4Jh3lQVbrDVETA'; 
const PHOTO_REF_URL = 'https://via.placeholder.com/1000?text=Photo+Not+Available';

function HotelCardItem({ hotel }) {
    const [photoUrl, setPhotoUrl] = useState(PHOTO_REF_URL);
    const [hotelAddress, setHotelAddress] = useState(hotel?.hotelAddress || 'Address not available');

    useEffect(() => {
        if (hotel) {
            fetchHotelPhoto();
        }
    }, [hotel]);

    const fetchHotelPhoto = async () => {
    try {
        const response = await axios.get(UNSPLASH_API_URL, {
            params: {
                query: `${hotel.hotelName} hotel ${hotel.hotelAddress}`,
                client_id: UNSPLASH_ACCESS_KEY,
                per_page: 1,
            },
        });

        const photo = response.data.results[0];
        if (photo) {
            setPhotoUrl(photo.urls.small);
        }
    } catch (error) {
        console.error('Error fetching hotel photo:', error);
        setPhotoUrl(PHOTO_REF_URL); // Fallback to placeholder if there's an error
    }
};


    return (
        <Link
            to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel?.hotelName + "," + hotel?.hotelAddress)}`}
            className="hover:scale-105 transition-transform cursor-pointer"
            target="_blank"
            rel="noopener noreferrer"
        >
            <div className="rounded-lg bg-white shadow-lg p-4">
                <img 
                    src={photoUrl?photoUrl:placeImage} 
                    alt="Hotel" 
                    className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <div className="flex flex-col gap-2">
                    <h2 className="font-medium text-lg">{hotel?.hotelName || 'Unknown Hotel'}</h2>
                    <h2 className="text-sm text-gray-500">📍 {hotel?.hotelAddress}</h2>
                    <h2 className="text-sm text-gray-700">💰 {hotel?.price || 'Price not available'}</h2>
                    <h2 className="text-sm text-yellow-500">⭐ {hotel?.rating || 'Rating not available'}</h2>
                </div>
            </div>
        </Link>
    );
}

export default HotelCardItem;
