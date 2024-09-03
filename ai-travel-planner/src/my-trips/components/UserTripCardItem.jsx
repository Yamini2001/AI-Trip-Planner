import { useEffect, useState } from 'react';
import fetchPhoto from '../../service/GlobalApi'; // Import the Unsplash service
import placeImage from '../place.png';

// Define a placeholder for photos as fallback
const PHOTO_REF_URL = 'https://via.placeholder.com/1000?text=Photo+Not+Available';

function UserTripCardItem({ trip }) {
    const [photoUrl, setPhotoUrl] = useState(PHOTO_REF_URL);

    useEffect(() => {
        const fetchPlacePhoto = async () => {
            if (!trip || !trip.userSelection || !trip.userSelection.location) return;

            const query = trip.userSelection.location?.display_name;

            try {
                // Fetch photo from Unsplash based on the location query
                const photo = await fetchPhoto(query);
                setPhotoUrl(photo);
            } catch (error) {
                console.error('Error fetching place photo:', error.message);
                setPhotoUrl(PHOTO_REF_URL); // Use the placeholder in case of an error
            }
        };

        fetchPlacePhoto();
    }, [trip]);

    if (!trip || !trip.userSelection) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col items-center">
            <div className="relative w-full max-w-sm"> {/* Adjusted the max width */}
                <img 
                    src={photoUrl || placeImage} 
                    alt="Trip Location" 
                    className="h-48 w-full object-cover rounded-xl mb-4" // Adjusted height
                />
                <div className="w-full flex flex-col items-start px-4 mt-4">
                    <h2 className="font-bold text-lg">
                        {trip.userSelection.location?.display_name || 'Location not available'}
                    </h2>
                    <h2 className="text-sm text-gray-500">
                        {trip?.userSelection?.noOfDays || 'N/A'} Days trip with {trip?.userSelection?.budget || 'N/A'} Budget
                    </h2>
                </div>
            </div>
        </div>
    );
}

export default UserTripCardItem;
