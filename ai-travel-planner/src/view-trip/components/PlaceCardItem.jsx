// import React from 'react'
import placeImage from '../place.png';

function PlaceCardItem(place) {
  return (
    <div className='border rounded-xl p-3 mt-2 flex gap-5'>
      <img src = {placeImage}
      className="w-[130px] h-[130px] rounded-xl"
      />
      <div className="">
        <h2 className='font-bold text-lg'>{place.placeName}</h2>
      </div>
    </div>
  )
}

export default PlaceCardItem
