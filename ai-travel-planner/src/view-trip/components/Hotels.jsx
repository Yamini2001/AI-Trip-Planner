// import React from 'react';
import { Link } from 'react-router-dom'; // Ensure to import Link from react-router-dom

function Hotels({ trip }) {
  return (
    <div>
      <h2 className='font-bold text-xl mt-5'>Hotel Recommendation</h2>
      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
        {trip?.tripData?.hotels?.map((hotel, index) => (
          <Link 
            key={index}
            to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel?.hotelAddress)}`}
            className="hover:scale-105 transition-transform cursor-pointer"
          >
            <div className="rounded-lg bg-white shadow-md">
              <img src='../place.png' className='rounded-lg mb-2' alt="Hotel" />
              <div className="my-2 flex flex-col gap-2">
                <h2 className='font-medium'>{hotel?.hotelName}</h2>
                <h2 className='text-xs text-gray-500'>📍 {hotel?.hotelAddress}</h2>
                <h2 className='text-sm'>💰 {hotel?.price}</h2>
                <h2 className='text-sm'>⭐ {hotel?.rating}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Hotels;
