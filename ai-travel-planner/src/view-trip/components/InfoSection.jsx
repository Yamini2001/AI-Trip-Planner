import React from 'react';
import placeHolder from '../placeholder.png';

function InfoSection({ trip }) {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <img 
        src={placeHolder}
        alt="Trip Placeholder" 
        className="h-[450px] w-[1300px] object-cover mb-18" // Adjusted size and margin
      />
      <div className="flex flex-col items-center gap-4">
        <h2 className='font-bold text-2xl mb-4'>
          {trip?.userSelection?.location?.label}
        </h2>
        <div className='flex gap-4'>
          <h2 className="p-2 px-4 bg-gray-200 rounded-full text-gray-700">
            {trip.userSelection?.noOfDays} Day
          </h2>
          <h2 className="p-2 px-4 bg-gray-200 rounded-full text-gray-700">
            {trip?.userSelection?.budget} Budget
          </h2>
          <h2 className="p-2 px-4 bg-gray-200 rounded-full text-gray-700">
            No. of travelers: {trip.userSelection?.traveler}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default InfoSection;
