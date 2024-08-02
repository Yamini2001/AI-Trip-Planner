import { useState } from 'react';
import axios from 'axios';
import { SelectBudgetOptions, selectTravelList } from '../constants/options';

function CreateTrip() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [place, setPlace] = useState(null);
  const [days, setDays] = useState('');

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 2) {
      try {
        const response = await axios.get(`https://api.locationiq.com/v1/autocomplete.php`, {
          params: {
            key: 'pk.c51ba700c7aa3288f19b95fbaddbaeff',
            q: value,
            limit: 25,
            dedupe: 1
          }
        });
        setSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching autocomplete suggestions:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setPlace(suggestion);
    setQuery(suggestion.display_name);
    setSuggestions([]);
    console.log(suggestion);
  };

  const handleDaysChange = (e) => {
    setDays(e.target.value);
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl">Tell us your travel preferences🏕️🌴</h2>
      <p className="mt-3 text-gray-500 text-xl">Just provide basic information, and our trip planner will generate a customized itinerary based on your preferences.</p>
      <div className="mt-20 flex flex-col gap-9">
        <div>
          <h2 className="text-xl my-3 font-medium">What is your destination of choice?</h2>
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Enter a location"
            className="w-full p-2 border border-gray-300 rounded"
          />
          {suggestions.length > 0 && (
            <ul className="border border-gray-300 rounded mt-2 max-w-md">
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion.place_id}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                >
                  {suggestion.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">How many days are you planning your trip?</h2>
          <input
            type="number"
            value={days}
            onChange={handleDaysChange}
            placeholder="Ex. 3"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
      </div>
      <div>
        <h2 className="text-xl my-3 font-medium">What is Your Budget?</h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
          {SelectBudgetOptions.map((item, index) => (
            <div key={index} className='p-4 border cursor-pointer rounded-lg hover:shadow-lg'>
              <h2 className='text-4xl'>{item.icons}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-xl my-3 font-medium">Who do you plan on traveling with on your next adventure?</h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
          {selectTravelList.map((item, index) => (
            <div key={index} className='p-4 border cursor-pointer rounded-lg hover:shadow-lg'>
              <h2 className='text-4xl'>{item.icons}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>
      <div className="my-10 justify-center">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Generate Trip</button>
      </div>
    </div>
  );
}

export default CreateTrip;
