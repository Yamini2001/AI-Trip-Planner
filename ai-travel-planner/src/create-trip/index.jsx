import { useState, useEffect } from 'react';
import axios from 'axios';
import { SelectBudgetOptions, selectTravelList } from '../constants/options';
import { toast } from 'react-toastify';
import { chatSession } from '../service/AIModal';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog"
import travelPlannerLogo from '@/assets/travelplanner.png';
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';



const AI_PROMPT = `Plan a trip to {location} for {totalDays} days. I will be traveling with {traveler} and my budget is {budget}.`;

function CreateTrip() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [place, setPlace] = useState(null);
  const [days, setDays] = useState('');
  const [formData, setFormData] = useState({});
  const [selectedBudget, setSelectedBudget] = useState('');
  const [selectedTraveler, setSelectedTraveler] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  const handleData = (name, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log('Form data:', formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const onGenerateTrip = async () => {
    const user = localStorage.getItem('user');
    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (!formData?.location || !formData?.days || !formData?.budget || !formData?.traveler) {
      toast("Please fill all the details");
      return;
    }

    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location?.label || '')
      .replace('{totalDays}', formData?.days || '')
      .replace('{traveler}', formData?.traveler || '')
      .replace('{budget}', formData?.budget || '');

    console.log("Final prompt:", FINAL_PROMPT);

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const responseText = await result?.response?.text();
      console.log(responseText);
    } catch (error) {
      console.error('Error generating trip:', error);
      toast("An error occurred while generating the trip");
    }
  };

  const GetUserProfile=(tokenInfo)=>{
    axios.get(`http://www.googleapis.com/oauth2/v1/userinfo?acess_token=${tokenInfo?.access_token}`,{
      headers:{
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'Application/json'
      }
    }).then((resp)=>{
      console.log(resp);

    })
  }

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 2) {
      try {
        const response = await axios.get('https://api.locationiq.com/v1/autocomplete.php', {
          params: {
            key: 'pk.c51ba700c7aa3288f19b95fbaddbaeff',
            q: value,
            limit: 50,
            dedupe: 1,
          },
        });
        setSuggestions(response.data);
      } catch (error) {
        console.error('Error fetching autocomplete suggestions:', error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setPlace(suggestion);
    setQuery(suggestion.display_name);
    setSuggestions([]);
    handleData('location', suggestion);
  };

  const handleDaysChange = (e) => {
    const value = e.target.value;
    setDays(value);
    handleData('days', value);
  };

  const handleBudgetClick = (item) => {
    setSelectedBudget(item.title);
    handleData('budget', item.title);
  };

  const handleTravelerClick = (item) => {
    setSelectedTraveler(item.people);
    handleData('traveler', item.people);
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl">Tell us your travel preferences🏕️🌴</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide basic information, and our trip planner will generate a customized itinerary based on your preferences.
      </p>
      <div className="mt-20 flex flex-col gap-9">
        <div className="w-full md:w-1/2 lg:w-1/2">
          <h2 className="text-xl my-3 font-medium">What is your destination of choice?</h2>
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Enter a location"
            className="w-[181%] p-2 border border-gray-300 rounded"
          />
          {suggestions.length > 0 && (
            <ul className="border border-gray-300 rounded mt-2 max-w-md mx-auto">
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
        <div className="w-full md:w-1/2 lg:w-1/2">
          <h2 className="text-xl my-3 font-medium">How many days are you planning your trip?</h2>
          <input
            type="number"
            value={days}
            onChange={handleDaysChange}
            placeholder="Ex. 3"
            className="w-[181%] p-2 border border-gray-300 rounded"
          />
        </div>
      </div>
      <div>
        <h2 className="text-xl my-3 font-medium">What is Your Budget?</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5 justify-center">
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleBudgetClick(item)}
              className={`p-2 border cursor-pointer rounded-lg text-center w-80 transition-all duration-200
                ${selectedBudget === item.title ? 'shadow-xl border-2 border-black' : 'hover:shadow-lg border-gray-300'}
              `}
            >
              <h2 className="text-2xl">{item.icons}</h2>
              <h2 className="font-bold text-md">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-xl my-3 font-medium">Who do you plan on traveling with on your next adventure?</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5 justify-center">
          {selectTravelList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleTravelerClick(item)}
              className={`p-2 border cursor-pointer rounded-lg text-center w-80 transition-all duration-200
                ${selectedTraveler === item.people ? 'shadow-xl border-2 border-black' : 'hover:shadow-lg border-gray-300'}
              `}
            >
              <h2 className="text-4xl">{item.icons}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>
      <div className="my-10 flex justify-start">
        <button onClick={onGenerateTrip} className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800">
          Generate Trip
        </button>
      </div>
      <Dialog open={openDialog} onOpenChange={() => setOpenDialog(false)}>
  <DialogContent>
    <DialogHeader>
    <DialogDescription className="flex flex-col items-start">
  <div className="flex items-center mb-2">
    <img src={travelPlannerLogo} alt="travelplanner" className="h-8 w-14" />
    <span className="ml-2 text-[#0973BC] text-2xl font-bold tracking-wide">
      travel<span className="text-[#1C3B5C]">planner</span>
    </span>
  </div>
  <h2 className="font-bold text-lg text-gray-700 mt-2 mb-1">
    Sign In With Google
  </h2>
  <p className="text-gray-600 text-sm">
    Sign in to the App with Google authentication securely
  </p>
  <button onClick={login} className="w-full mt-5 flex gap-4 items-center justify-center bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800">
  <FcGoogle className="h-6 w-6 mr-2" />
  <span className="text-center">Sign In With Google</span>
</button>

</DialogDescription>
    </DialogHeader>
    {/* <DialogFooter>
      <button onClick={() => setOpenDialog(false)} className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-600">
        Close
      </button>
    </DialogFooter> */}
  </DialogContent>
</Dialog>
    </div>
  );
}

export default CreateTrip;
