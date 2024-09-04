// import React from 'react';
import placeImage from '../place.png'; // Ensure this path is correct
import HotelCardItem from './HotelCardItem'; // Ensure this import path is correct

function Hotels({ trip }) {
  // Extract hotel options from the trip object
  const hotelOptions = trip?.tripData?.hotelOptions || [];

  // Check if hotelOptions exists and is an array
  const hasHotels = Array.isArray(hotelOptions) && hotelOptions.length > 0;

  // Log hotelOptions to verify its structure
  console.log('Hotel Options:', hotelOptions);

  return (
    <div className="mb-10">
      {/* Adjust the top margin to control vertical spacing */}
      <h2 className="font-bold text-xl mb-3">Hotel Recommendation</h2>
      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
        {hasHotels ? (
          hotelOptions.map((hotel, index) => (
            <HotelCardItem 
              key={hotel.id || index} // Use hotel.id if available, otherwise fallback to index
              hotel={hotel} 
            />
          ))
        ) : (
          <div className="rounded-lg bg-white shadow-md p-2 flex flex-col items-center justify-center">
            <img 
              src={placeImage} 
              className="w-32 h-32 rounded-lg mb-2 object-cover" 
              alt="Hotel Placeholder" 
            />
            <h2 className="text-gray-500 text-center">No hotels available for this location.</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default Hotels;
