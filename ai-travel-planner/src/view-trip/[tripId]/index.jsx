import {useEffect} from 'react'
import { useParams} from "react-router-dom";
import {db} from "@/service/firebaseConfig";
import {doc,getDoc} from 'firebase/firestore';
import {toast} from 'sonner';

function ViewTrip() {
  const {tripId} = useParams();
  useEffect(()=>{
    tripId && GetTripData();

  },[tripId])
  const GetTripData =async()=>{
    const docRef = doc(db,'AITrips',tripId);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
      console.log("Document", docSnap.data());
    }
    else{
      console.log("No Such Document");
      toast('No trip found!');
    }
  }
  return (
    <div>
      ViewTrip: {tripId}
    </div>
  )
}

export default ViewTrip;
