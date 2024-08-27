import { useState, useEffect } from 'react';
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import axios from 'axios'; // Make sure axios is imported
import placeImage from '../place.png';

const UNSPLASH_API_URL = 'https://api.unsplash.com/search/photos';
const UNSPLASH_ACCESS_KEY = 'MYf-UXFsQbzryZ52hZ_F7d_VZXu6X4Jh3lQVbrDVETA'; 
const PHOTO_REF_URL = 'https://via.placeholder.com/1000?text=Photo+Not+Available';

function PlaceCardItem({ place }) {
    const [photoUrl, setPhotoUrl] = useState(PHOTO_REF_URL);
    const [placeAddress, setplaceAddress] = useState(place?.placeAddress || 'Address not available');

    useEffect(() => {
        if (place) {
            fetchPlacePhoto();
        }
    }, [place]);

    const fetchPlacePhoto = async () => {
        try {
            const response = await axios.get(UNSPLASH_API_URL, {
                params: {
                    query: place.placeName, // Make sure this is meaningful
                    client_id: UNSPLASH_ACCESS_KEY,
                    per_page: 1,
                },
            });

            const photo = response.data.results[0];
            if (photo) {
                setPhotoUrl(photo.urls.small);
            } else {
                console.warn('No photos found for:', place.placeName);
                setPhotoUrl(PHOTO_REF_URL);
            }
        } catch (error) {
            console.error('Error fetching place photo:', error);
            setPhotoUrl(PHOTO_REF_URL); // Fallback to placeholder if there's an error
        }
    };

    return (
        <Link to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.placeName)}`} target='_blank'>
            <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
                <img 
                    src={photoUrl?photoUrl:placeImage}
                    className="w-[180px] h-[180px] rounded-xl object-cover"
                    alt="Place"
                />
                <div className="">
                    <h2 className='font-bold text-lg'>{place.placeName}</h2>
                    <p className='text-sm text-gray-400'>{place.placeDetails}</p>
                    {/* <h2 className='mt-2'>🕙 {place.timeToTravel}</h2> */}
                    <button size="sm"><FaMapLocationDot/></button>
                </div>
            </div>
        </Link>
    );
}

export default PlaceCardItem;
