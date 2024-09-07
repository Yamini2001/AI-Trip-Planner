import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import placeImage from '../place.png'; // Optional fallback image

const GEOAPIFY_API_URL = 'https://api.geoapify.com/v1/places';
const GEOAPIFY_API_KEY = '8e56074190904084a094bca1b0f47485'; // Your Geoapify API key

function HotelCardItem() {
    const [hotels, setHotels] = useState([]);
    const [userLocation, setUserLocation] = useState(null);

    // Get user's current location
    useEffect(() => {
        const getUserLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ latitude, longitude });
                }, (error) => {
                    console.error('Error getting user location:', error);
                });
            } else {
                console.warn('Geolocation is not supported by this browser.');
            }
        };

        getUserLocation();
    }, []);

    // Fetch nearby hotels from Geoapify
    useEffect(() => {
        const fetchHotels = async (latitude, longitude) => {
            try {
                const response = await axios.get(GEOAPIFY_API_URL, {
                    params: {
                        categories: 'accommodation.hotel',
                        bias: `proximity:${longitude},${latitude}`, // Ensure longitude, latitude order is correct
                        limit: 5,
                        apiKey: GEOAPIFY_API_KEY,
                    },
                });

                const hotelData = response.data.features.map((hotel) => ({
                    hotelName: hotel.properties.name || 'Hotel Name Not Available',
                    hotelAddress: hotel.properties.address_line1 || 'Address Not Available',
                    image: hotel.properties.datasource.raw.image || placeImage, // Fallback to placeholder if no image
                    latitude: hotel.geometry.coordinates[1],
                    longitude: hotel.geometry.coordinates[0],
                    price: hotel.properties.price || 'Price Not Available',
                    rating: hotel.properties.rating || 'Rating Not Available',
                }));

                setHotels(hotelData);
            } catch (error) {
                // Log the full error for better debugging
                console.error('Error fetching hotels from Geoapify:', error.response?.data || error.message);
            }
        };

        if (userLocation) {
            fetchHotels(userLocation.latitude, userLocation.longitude);
        }
    }, [userLocation]);

    return (
        <div className="hotel-list">
            {hotels.map((hotel, index) => (
                <Link
                    key={index}
                    to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${hotel.hotelName}, ${hotel.hotelAddress}`)}&ll=${hotel.latitude},${hotel.longitude}`}
                    className="hover:scale-105 transition-transform cursor-pointer"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <div className="rounded-lg bg-white shadow-lg p-4">
                        <img 
                            src={hotel.image || placeImage} // Fallback to placeImage if no image is provided
                            alt={hotel.hotelName}
                            className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                        <div className="flex flex-col gap-2">
                            <h2 className="font-medium text-lg">{hotel.hotelName}</h2>
                            <h2 className="text-sm text-gray-500">📍 {hotel.hotelAddress}</h2>
                            <h2 className="text-sm text-gray-700">💰 {hotel.price}</h2>
                            <h2 className="text-sm text-yellow-500">⭐ {hotel.rating}</h2>
                            <p className="text-sm text-gray-600">🌍 Latitude: {hotel.latitude}, Longitude: {hotel.longitude}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default HotelCardItem;
