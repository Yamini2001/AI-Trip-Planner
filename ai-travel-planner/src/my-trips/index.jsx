import { useState, useEffect } from 'react';
import { useNavigation } from 'react-router-dom';
import { db } from '@/service/firebaseConfig';
import { collection, query, where, getDocs, doc, deleteDoc } from 'firebase/firestore';
import UserTripCardItem from './components/UserTripCardItem';

function Index() {
    const navigation = useNavigation();
    const [userTrips, setUserTrips] = useState([]);

    useEffect(() => {
        GetUserTrips();
    }, []);

    const GetUserTrips = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigation('/');
            return;
        }
        const q = query(collection(db, 'AITrips'), where('userEmail', '==', user?.email));
        const querySnapshot = await getDocs(q);
        setUserTrips([]);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            setUserTrips(prevVal => [...prevVal, { id: doc.id, ...doc.data() }]);
        });
    };

    const deleteTrip = async (tripId) => {
        try {
            await deleteDoc(doc(db, 'AITrips', tripId));
            setUserTrips(prevTrips => prevTrips.filter(trip => trip.id !== tripId)); // Update state after deletion
            console.log('Trip deleted successfully!');
        } catch (error) {
            console.error('Error deleting trip:', error);
        }
    };

    return (
        <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
            <h2 className='font-bold text-3xl'>My Trips</h2>
            <div className='grid grid-cols-2 mt-10 md:grid-cols-3 gap-5'>
                {userTrips?.length > 0 ? userTrips.map((trip, index) => (
                    <UserTripCardItem trip={trip} key={index} onDelete={() => deleteTrip(trip.id)} />
                ))
                : [1, 2, 3, 4, 5, 6].map((item, index) => (
                    <div key={index} className='h-[290px] w-full bg-slate-200 animate-pulse rounded-xl'></div>
                ))}
            </div>
        </div>
    );
}

export default Index;
