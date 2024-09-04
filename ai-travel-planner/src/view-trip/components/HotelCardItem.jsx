import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import fetchPhoto from '../../service/GlobalApi'; // Import the Unsplash service
import placeImage from '../place.png';

const PHOTO_REF_URL = 'https://via.placeholder.com/1000?text=Photo+Not+Available';

function HotelCardItem({ hotel }) {
    const [photoUrl, setPhotoUrl] = useState(PHOTO_REF_URL);

    useEffect(() => {
        const fetchHotelPhoto = async () => {
            if (!hotel || !hotel.hotelName) return;

            try {
                // Fetch photo based on the hotel name
                const photo = await fetchPhoto(hotel.hotelName);
                setPhotoUrl(photo || PHOTO_REF_URL);
            } catch (error) {
                console.error('Error fetching hotel photo:', error.message);
                setPhotoUrl(PHOTO_REF_URL); // Use the placeholder in case of an error
            }
        };

        fetchHotelPhoto();
    }, [hotel]);

    return (
        <Link to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.hotelName)},${encodeURIComponent(hotel.hotelAddress)}`}>
            <div className="hover:scale-105 transition-all cursor-pointer">
                <img 
                    src={photoUrl} 
                    className="rounded-xl h-[100px] w-full object-cover" 
                    alt={`Image of ${hotel.hotelName}`} 
                />
                <div className="my-2 flex flex-col gap-2">
                    <h2 className="font-medium">{hotel?.hotelName || 'Hotel Name Not Available'}</h2>
                    <h2 className="text-xs text-gray-500">
                        📍 {hotel?.hotelAddress || 'Address Not Available'}
                    </h2>
                    <h2 className="text-xs text-gray-500">
                        💰 {hotel?.price || 'Price Not Available'}
                    </h2>
                    <h2 className="text-xs text-gray-500">
                        ⭐ {hotel?.rating || 'Rating Not Available'}
                    </h2>
                </div>
            </div>
        </Link>
    );
}

export default HotelCardItem;
