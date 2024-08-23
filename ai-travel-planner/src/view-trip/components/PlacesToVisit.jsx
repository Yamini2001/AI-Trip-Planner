import React from 'react'

function PlacesToVisit({trip}) {
  return (
    <div>
      <h2 className='font-bold text-lg mt-9'>Places To Visit</h2>
      <div className="">
        {trip.tripData?.itinerary.map((item,index)=>(
            <div className="">
                <h2 className='font-medium text-lg'>{item.day}</h2>
                {item.plan.map((place,index)=>(
                    <div className="">
                        <h2>{place.time}</h2>
                        <h2>{place.placeName}</h2>
                    </div>
                ))} 

            </div>

    
       ))}
      </div>
    </div>
  )
}

export default PlacesToVisit
