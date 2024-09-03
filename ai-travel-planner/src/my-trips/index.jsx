import {useState,useEffect} from 'react';
// import { Button } from '../components/ui/Button'; 
import {useNavigation} from 'react-router-dom';
import {db} from '@/service/firebaseConfig';
import {collection,query,where,getDocs} from 'firebase/firestore';
import UserTripCardItem from './components/UserTripCardItem';

function Index() {
    const navigation = useNavigation();
    const [userTrips,setuserTrips] = useState([]);
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
        setuserTrips([]);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ",doc.data());
            setuserTrips(prevVal=>[...prevVal,doc.data()])
        });
    }
  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
        <h2 className='font-bold text-3xl'>MyTrips</h2>
        <div className='grid grid-cols-2 mt-10 md:grid-cols-3 gap-5'>
            {userTrips?.length>0?userTrips.map((trip,index)=>(
                <UserTripCardItem trip={trip} key={index} />
            ))
            :[1,2,3,4,5,6].map((item,index)=>(
                <div key={index} className='h-[290px] w-full bg-slate-200 animate-pulse rounded-xl'>

                    </div>

            ))
        }
        </div>
    </div>
  );
}

export default Index;
