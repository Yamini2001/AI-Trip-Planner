import React from 'react';
import { Link } from 'react-router-dom';
import placeImage from '../place.png'; // Ensure this path is correct

function Hotels({ trip }) {
  // Extract hotel options from the trip object
  const hotelOptions = trip?.tripData?.hotelOptions;

  // Check if hotelOptions exists and is an array
  const hasHotels = Array.isArray(hotelOptions) && hotelOptions.length > 0;

  // Log hotelOptions to verify its structure
  console.log('Hotel Options:', hotelOptions);

  return (
    <div className="mt-1">
      <h2 className='font-bold text-xl mb-1'>Hotel Recommendations</h2>
      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
        {hasHotels ? (
          hotelOptions.map((hotel, index) => (
            <Link
              key={index}
              to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel?.address || '')}`}
              className="hover:scale-105 transition-transform cursor-pointer"
              target='_blank'
              rel='noopener noreferrer'
            >
              <div className="rounded-lg bg-white shadow-md p-2">
                <img src={hotel?.image || placeImage} className='rounded-lg mb-2' alt="Hotel" />
                <div className="flex flex-col gap-2">
                  <h2 className='font-medium'>{hotel?.hotelName || 'Unknown Hotel'}</h2>
                  <h2 className='text-xs text-gray-500'>📍 {hotel?.hotelAddress}</h2>
                  <h2 className='text-sm'>💰 {hotel?.price || 'Price not available'}</h2>
                  <h2 className='text-sm'>⭐ {hotel?.rating || 'Rating not available'}</h2>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="rounded-lg bg-white shadow-md p-2 flex flex-col items-center justify-center">
            <img src={placeImage} className='rounded-lg mb-2' alt="Hotel Placeholder" />
            <h2 className='text-gray-500'>No hotels available for this location.</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default Hotels;
