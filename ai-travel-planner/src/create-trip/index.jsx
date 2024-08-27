import { useState, useEffect } from 'react';
import axios from 'axios';
import { SelectBudgetOptions, selectTravelList } from '../constants/options';
import { toast } from 'react-toastify';
import { chatSession } from '../service/AIModal';
import { Dialog, DialogContent, DialogHeader,DialogDescription} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import { setDoc, doc } from 'firebase/firestore';
import { db } from "@/service/firebaseConfig";
import travelPlannerLogo from '@/assets/travelplanner.png';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {useNavigate} from 'react-router-dom';
// import placeImage from './place.png';


const AI_PROMPT = `Plan a trip to {location} for {totalDays} days. I will be traveling with {traveler} and my budget is {budget}.`;

function CreateTrip() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [place, setPlace] = useState(null);
  const [days, setDays] = useState('');
  const [formData, setFormData] = useState({});
  const [selectedBudget, setSelectedBudget] = useState('');
  const [selectedTraveler, setSelectedTraveler] = useState('');
  const [openDialog,setOpenDialog] = useState();
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();

  // Helper to update form data
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

  // Function to generate trip plan
  const onGenerateTrip = async () => {
    const user = localStorage.getItem('user');
    if(!user){
      setOpenDialog(true);
      return;
    }

    if (!formData?.location || !formData?.days || !formData?.budget || !formData?.traveler) {
      toast("Please fill all the details");
      return;
    }
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location?.label || '')
      .replace('{totalDays}', formData?.days || '')
      .replace('{traveler}', formData?.traveler || '')
      .replace('{budget}', formData?.budget || '');

    console.log("Final prompt:", FINAL_PROMPT);

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      setLoading(false);
      const responseText = await result?.response?.text();
      console.log("AI Response:", responseText);
      // Save AI-generated trip data
      await saveAITrip(responseText);
    } catch (error) {
      console.error('Error generating trip:', error);
      toast("An error occurred while generating the trip");
    }
  };

  // Function to save AI-generated trip data
  const saveAITrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString();
    try {
      await setDoc(doc(db, "AITrips", docId), {
        userSelection: formData,
        tripData: JSON.parse(TripData),
        userEmail:user?.email,
        id:docId
      });
      setLoading(false);
      navigate('/view-trip/'+docId)
      toast("Trip saved successfully!");
    } catch (error) {
      console.error('Error saving trip:', error);
      toast("An error occurred while saving the trip");
    }
  };

  // Function to get user profile after Google login
  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'Application/json',
      },
    }).then((resp) => {
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false); 
      onGenerateTrip();
    })
  };

  // Handle location input change and suggestions
  const handleInputChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 2) {
      try {
        const response = await axios.get('https://api.locationiq.com/v1/autocomplete.php', {
          params: {
            key: 'pk.c51ba700c7aa3288f19b95fbaddbaeff',
            q: value,
            limit: 100,
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

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setPlace(suggestion);
    setQuery(suggestion.display_name);
    setSuggestions([]);
    handleData('location', suggestion);
  };

  // Handle number of days input change
  const handleDaysChange = (e) => {
    const value = e.target.value;
    setDays(value);
    handleData('days', value);
  };

  // Handle budget selection
  const handleBudgetClick = (item) => {
    setSelectedBudget(item.title);
    handleData('budget', item.title);
  };

  // Handle traveler selection
  const handleTravelerClick = (item) => {
    setSelectedTraveler(item.people);
    handleData('traveler', item.people);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white-300 via-blue-100 to-white p-2 relative border-none">
      <h2 className="font-bold text-3xl text-gray-800">Tell us your travel preferences🏕️🌴</h2>
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
              <h2 className="text-2xl">{item.icons}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>
      <div className='my-10 justify-end flex'>
        <button disabled={loading}
        className="bg-black text-white rounded px-4 py-2 mt-10 transition-all duration-200 hover:bg-blue-500" onClick={onGenerateTrip}>
        {
              loading?
              <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin'/>: 'Generate Trip'
        }
          </button>
      </div>
      {/* Dialog for Google login */}
      <Dialog open={openDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogDescription>
          <img
              src={travelPlannerLogo}
              className="w-1/4 h-auto mx-auto rounded-lg mb-5"
              alt="logo"/>
          <h2 className='font-bold text-lg mt-7'>Sign In With Google</h2>
          <p>Sign in to the App with Google authentication securely.</p>
          <button disabled={loading}
          onClick={login}
          className='w-full mt-5 flex gap-4 items-center justify-center p-3 bg-green-600 text-white rounded hover:bg-green-700 transition duration-300'>
              <FcGoogle className='h-7 w-7'/>
              Sign In With Google
            </button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>

      </Dialog> 
    </div>
  );
}

export default CreateTrip;
