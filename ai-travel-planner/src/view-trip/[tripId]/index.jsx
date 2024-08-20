import {useState,useEffect} from 'react'
import { useParams} from "react-router-dom";
import {db} from "@/service/firebaseConfig";
import {doc,getDoc} from 'firebase/firestore';
import {toast} from 'sonner';
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';

function ViewTrip() {
  const {tripId} = useParams();
  const [trip,setTrip] = useState([]);

  useEffect(()=>{
    tripId && GetTripData();

  },[tripId]);

  // Used to get information from firebase
  const GetTripData =async()=>{
    const docRef = doc(db,'AITrips',tripId);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
      console.log("Document", docSnap.data());
      setTrip(docSnap.data());
    }
    else{
      console.log("No Such Document");
      toast('No trip found!');
    }
  }
  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
      {/* Information Section */}
      <InfoSection trip = {trip}/>
      {/* Recommeded Hotels */}
      <Hotels trip = {trip}/>
      {/* Daily Plan */}
      {/* Footer */}
    </div>
  )
}

export default ViewTrip;
