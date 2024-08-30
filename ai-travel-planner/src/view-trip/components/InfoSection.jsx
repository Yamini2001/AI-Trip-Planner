import { useState, useEffect } from 'react';
import { IoIosSend } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5"; // Import location icon
import fetchPhoto from '../../service/GlobalApi'; // Import the Unsplash service
import placeImage from '../place.png';

// Define a placeholder for photos as fallback
const PHOTO_REF_URL = 'https://via.placeholder.com/1000?text=Photo+Not+Available';

function InfoSection({ trip }) {
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
    <div className="flex flex-col justify-start items-center h-screen">
      <div className="relative w-full">
        <img 
          src={photoUrl?photoUrl:placeImage}
          alt="Trip Placeholder" 
          className="h-[470px] w-full object-cover rounded-xl mb-4"
        />
        <button className="absolute bottom-[-55px] right-8 p-2 px-4 bg-black text-white rounded-full hover:bg-gray-800 flex items-center gap-2">
          <IoIosSend />
          Send
        </button>
      </div>
      <div className="w-full flex flex-col items-start px-4 mt-4">
        <div className="flex items-center gap-2 mb-4">
          <IoLocationSharp className="text-xl text-gray-600" />
          <h2 className='font-bold text-2xl'>
            {trip.userSelection.location?.display_name || 'Location not available'}
          </h2>
        </div>
        <div className='flex gap-5 justify-start'>
          <h2 className="p-2 px-4 bg-gray-200 rounded-full text-gray-600 text-xs md:text-md">
            📆 {trip.userSelection.days || 'Days not specified'} Day
          </h2>
          <h2 className="p-2 px-4 bg-gray-200 rounded-full text-gray-600 text-xs md:text-md">
            💰 {trip.userSelection.budget ? `${trip.userSelection.budget} Budget` : 'Budget not specified'}
          </h2>
          <h2 className="p-2 px-4 bg-gray-200 rounded-full text-gray-600 text-xs md:text-md">
            🥂 No. Of Travelers: {trip.userSelection.traveler || 'Travelers not specified'}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default InfoSection;
