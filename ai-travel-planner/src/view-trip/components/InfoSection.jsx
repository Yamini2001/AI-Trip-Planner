import { useState, useEffect } from 'react';
import { IoIosSend } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5"; // Import location icon
import { GetPlaceDetails } from '../../service/GlobalApi';

const PHOTO_REF_URL = 'https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key=' + import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

function InfoSection({ trip }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    const fetchPlacePhoto = async () => {
      if (!trip || !trip.userSelection || !trip.userSelection.location) return;
      
      const data = {
        textQuery: trip.userSelection.location?.display_place
      };

      try {
        const result = await GetPlaceDetails(data);
        const photoName = result.data.places[0].photos[3].name;
        const photoUrl = PHOTO_REF_URL.replace('{NAME}', photoName);
        setPhotoUrl(photoUrl);
      } catch (error) {
        console.error('Error fetching place details:', error.response ? error.response.data : error.message);
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
          src={photoUrl}
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
            {trip.userSelection.location?.display_place || 'Location not available'}
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
