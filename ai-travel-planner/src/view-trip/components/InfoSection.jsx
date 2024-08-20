// import React from 'react';
import placeHolder from '../placeholder.png';
import { IoIosSend } from "react-icons/io";

function InfoSection({ trip }) {
  // Check if trip data is available
  if (!trip || !trip.userSelection) {
    return <div>Loading...</div>;
  }
  console.log(trip);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <img 
        src={placeHolder}
        alt="Trip Placeholder" 
        className="h-[550px] w-full object-cover rounded-xl" // Adjusted size and margin
      />
      <div className='flex justify-between items-center'>
      <div className="my-5 flex flex-col gap-2">
        <h2 className='font-bold text-2xl mb-4'>
          {trip?.userSelection?.location?.label || 'Location not available'}
        </h2>
        <div className='flex gap-5'>
          <h2 className="p-2 px-4 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">📆
           {trip.userSelection?.noOfDays} Day
          </h2>
          <h2 className="p-2 px-4 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
          💰 {trip.userSelection.budget ? `${trip.userSelection.budget} Budget` : 'Budget not specified'}
          </h2>
          <h2 className="p-2 px-4 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
          🥂 {trip.userSelection.traveler ? `No. of travelers: ${trip.userSelection.traveler}` : 'Travelers not specified'}
          </h2>
        </div>
        </div>
        <button><IoIosSend /></button>
      </div>
    </div>
  );
}

export default InfoSection;
