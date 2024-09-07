import { useState } from 'react';
import UserTripCardItem from './UserTripCardItem'; // Ensure this import path is correct

function UserTripList() {
    // The state to store all user trips
    const [trips, setTrips] = useState([
        // Sample trips; replace with actual trips data from API or database
        { id: 1, userSelection: { location: { display_name: 'Paris' }, days: 3, budget: '$1000' } },
        { id: 2, userSelection: { location: { display_name: 'Tokyo' }, days: 5, budget: '$1500' } },
    ]);

    // This function deletes a single trip when the Delete button is clicked on a trip card
    const handleDelete = (id) => {
        setTrips((prevTrips) => prevTrips.filter((trip) => trip.id !== id));
    };

    // This function clears all trips when the Delete All button is clicked
    const handleDeleteAll = () => {
        if (window.confirm('Are you sure you want to delete all trips?')) {
            setTrips([]); // Clear all trips
        }
    };

    return (
        <div className="trip-list">
            {/* Delete All Trips button */}
            <button
                onClick={handleDeleteAll}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors mb-4"
            >
                Delete All Trips
            </button>
            
            {/* Display trips as a grid of trip cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Conditionally render the trips or show a message when no trips exist */}
                {trips.length > 0 ? (
                    trips.map((trip) => (
                        <UserTripCardItem
                            key={trip.id}  // Unique identifier for each trip
                            trip={trip}    // Trip data
                            onDelete={handleDelete}  // Callback to delete a trip
                        />
                    ))
                ) : (
                    <p>No trips available.</p>
                )}
            </div>
        </div>
    );
}

export
