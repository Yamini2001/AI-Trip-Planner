import { useEffect, useState } from 'react';
import fetchPhoto from '../../service/GlobalApi'; // Ensure this import path is correct
import placeImage from '../place.png'; // Ensure this path is correct
import { Link } from 'react-router-dom';

// Define a placeholder for photos as a fallback
const PHOTO_REF_URL = 'https://via.placeholder.com/1000?text=Photo+Not+Available';

function UserTripCardItem({ trip, onDelete }) {
    const [photoUrl, setPhotoUrl] = useState(PHOTO_REF_URL);

    useEffect(() => {
        const fetchPlacePhoto = async () => {
            // Check if trip and location data are available
            const location = trip?.userSelection?.location?.display_name;
            if (!location) return;

            try {
                // Fetch photo from Unsplash based on the location query
                const photo = await fetchPhoto(location);
                setPhotoUrl(photo || PHOTO_REF_URL); // Use fetched photo or fallback
            } catch (error) {
                console.error('Error fetching place photo:', error.message);
                setPhotoUrl(PHOTO_REF_URL); // Use the placeholder in case of an error
            }
        };

        fetchPlacePhoto();
    }, [trip]);

    // Check if trip and user selection data are available
    if (!trip || !trip.userSelection) {
        return <div>Loading...</div>;
    }

    // Destructure trip data for easy access
    const { userSelection } = trip;
    const { location, days, budget } = userSelection;

    // Handle delete action
    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this trip?")) {
            onDelete(trip.id); // Call the onDelete function passed as a prop with the trip ID
        }
    };

    return (
        <div className="relative flex flex-col items-center">
            <Link to={`/view-trip/${trip.id}`} className="hover:scale-105 transition-transform w-full max-w-sm">
                <img 
                    src={photoUrl || placeImage} 
                    alt={location?.display_name || 'Trip Location'} 
                    className="h-48 w-full object-cover rounded-xl mb-4" // Adjusted height
                />
                <div className="w-full flex flex-col items-start px-4 mt-4">
                    <h2 className="font-bold text-lg">
                        {location?.display_name || 'Location not available'}
                    </h2>
                    <h2 className="text-sm text-gray-500">
                        {days ? `${days} Days trip` : 'Duration not available'} with {budget ? `${budget} Budget` : 'Budget not available'}
                    </h2>
                </div>
            </Link>
            <button
                onClick={handleDelete}
                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors"
            >
                Delete
            </button>
        </div>
    );
}

export default UserTripCardItem;
