// import React from 'react'

function UserTripCardItem({trip}) {
  return (
    <div>
      <img src='../../create-trip/place.png' className="object-cover rounded-xl"/>
      <div>
        <h2 className="font-bold text-lg">{trip?.userSelection?.location?.label}</h2>
        <h2 className="text-sm text-gray-500">{trip?.userSelection?.noOfDays} Days trip with {trip?.userSelection?.budget} Budget</h2>
      </div>
    </div>
  )
}

export default UserTripCardItem
