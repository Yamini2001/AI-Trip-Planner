// import React from 'react';
import PlaceCardItem from "./PlaceCardItem";

function PlacesToVisit({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-lg mt-9">Places To Visit</h2>
      <div>
        {trip?.tripData?.itinerary?.map((item, dayIndex) => (
          <div key={dayIndex}>
            <h2 className="font-medium text-lg">{item.day}</h2>
            <div className="grid grid-cols-2 gap-5">
              {item.plan.map((place, placeIndex) => (
                <div key={placeIndex} className="my-3">
                  <h2 className="font-medium text-sm text-orange-600">{place.timeTravel}</h2>
                  <PlaceCardItem place={place} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlacesToVisit;
