import React from 'react';
import { Link } from 'react-router-dom';
import placeImage from '../place.png'; // Adjust the path as needed

function Hotels({ trip }) {
  // Extract hotels from the trip object
  const hotels = trip?.tripData?.hotels;

  // Check if hotels is defined and is an array
  const hasHotels = Array.isArray(hotels) && hotels.length > 0;

  return (
    <div>
      <h2 className='font-bold text-xl mt-5'>Hotel Recommendation</h2>
      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
        {hasHotels ? (
          hotels.map((hotel, index) => (
            <Link
              key={index}
              to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel?.hotelAddress || '')}`}
              className="hover:scale-105 transition-transform cursor-pointer"
              target='_blank'
              rel='noopener noreferrer'
            >
              <div className="rounded-lg bg-white shadow-md p-2">
                <img src={placeImage} className='rounded-lg mb-2' alt="Hotel" />
                <div className="flex flex-col gap-2">
                  <h2 className='font-medium'>{hotel?.hotelName || 'Unknown Hotel'}</h2>
                  <h2 className='text-xs text-gray-500'>📍 {hotel?.hotelAddress || 'Address not available'}</h2>
                  <h2 className='text-sm'>💰 {hotel?.price || 'Price not available'}</h2>
                  <h2 className='text-sm'>⭐ {hotel?.rating || 'Rating not available'}</h2>
                </div>
              </div>
            </Link>
          ))
        ) : (
          // Display placeholder content if no hotels are available
          <div className="rounded-lg bg-white shadow-md p-2 flex flex-col items-center justify-center">
            <img src={placeImage} className='rounded-lg mb-2' alt="Hotel Placeholder" />
            <h2 className='text-gray-500'>No hotel data available</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default Hotels;
