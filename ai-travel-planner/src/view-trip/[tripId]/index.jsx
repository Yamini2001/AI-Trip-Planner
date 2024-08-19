import {useState,useEffect} from 'react'
import { useParams} from "react-router-dom";
import {db} from "@/service/firebaseConfig";
import {doc,getDoc} from 'firebase/firestore';
import {toast} from 'sonner';
import InfoSection from '../components/InfoSection';

function ViewTrip() {
  const {tripId} = useParams();
  const [trip,setTrip] = useState([]);

  useEffect(()=>{
    tripId && GetTripData();

  },[tripId])

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
    <div>
      {/* Information Section */}
      <InfoSection trip = {trip}/>
      {/* Recommeded Hotels */}
      {/* Daily Plan */}
      {/* Footer */}
    </div>
  )
}

export default ViewTrip;
