import {useEffect} from 'react';
import { Button } from '../components/ui/Button'; // Correct usage for named export
import {useNavigation} from 'react-router-dom';
import {db} from '@/service/firebaseConfig';
import {collection,query,where,getDocs} from 'firebase/firestore';

function Index() {
    const navigation = useNavigation();
    useEffect(()=>{
        GetUserTrips();

    },[])
    const GetUserTrips=async() =>{
        const user = JSON.parse(localStorage.getItem('user'));
        if(!user)
        {
              navigation('/');
              return;
        }
        const q = query(collection(db,'AITrips'),where('userEmail','==',user?.email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ",doc.data());
        });
    }
  return (
    <div>
      <Button variant="outline" className="rounded-full">
        MyTrips
      </Button>
    </div>
  );
}

export default Index;
