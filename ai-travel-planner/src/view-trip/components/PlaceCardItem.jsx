import { useState, useEffect } from 'react';
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import fetchPhoto from '../../service/GlobalApi'; // Import the Unsplash service
import placeImage from '../place.png';

const PHOTO_REF_URL = 'https://via.placeholder.com/1000?text=Photo+Not+Available';

function PlaceCardItem({ place }) {
    const [photoUrl, setPhotoUrl] = useState(PHOTO_REF_URL);

    useEffect(() => {
        const fetchPlacePhoto = async () => {
            if (!place || !place.placeName) return;

            try {
                // Fetch photo based on the place name
                const photo = await fetchPhoto(place.placeName);
                setPhotoUrl(photo || PHOTO_REF_URL);
            } catch (error) {
                console.error('Error fetching place photo:', error.message);
                setPhotoUrl(PHOTO_REF_URL); // Use the placeholder in case of an error
            }
        };

        fetchPlacePhoto();
    }, [place]);

    return (
        <Link to={'https://www.google.com/maps/search/?api=1&query=' + place.placeName} target='_blank'>
            <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
                <img src={photoUrl || placeImage} className='w-[130px] h-[130px] rounded-xl object-cover' alt={place?.placeName} />
                <div>
                    <h2 className='font-bold text-lg'>{place.placeName}</h2>
                    <p className='text-sm text-gray-400'>{place.placeDetails}</p>
                    {/* <h2 className='mt-2'>🕙 {place.timeTravel}</h2> */}
                    <h2 className='mt-4'>🎟️ {place.ticketPricing}</h2>
                    <button size="sm"><FaMapLocationDot /></button>
                </div>
            </div>
        </Link>
    );
}

export default PlaceCardItem;
