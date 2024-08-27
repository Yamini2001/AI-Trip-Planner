import { useEffect, useState } from 'react';
import { Button } from '../ui/Button'; // Ensure Button component is also using Tailwind classes

function Header() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
                console.log(parsedUser);
            } catch (error) {
                console.error('Error parsing user data from localStorage:', error);
            }
        }
    }, []);

    return (
        <div className="header bg-gradient-to-b from-white-300 via-white-100 to-white text-black">
            <div className="header-content p-3 shadow-sm flex justify-between items-center px-5">
                <img
                    src="/travelplanner.png"
                    alt="Travel Planner Logo"
                    className="logo max-w-[12%] h-auto max-h-[30%] ml-1 bg-blue rounded-lg -mt-4 shadow-none"
                />
                {user ? (
                    <div className="flex items-center gap-3">
                        <Button variant="outline" className="rounded-full">
                            My Trips
                        </Button>
                        {user.picture && (
                            <img src={user.picture} alt="User Avatar" className="h-[35px] w-[35px] rounded-full" />
                        )}
                    </div>
                ) : (
                    <Button
                        className="button bg-black text-white border-none py-2 px-4 text-lg cursor-pointer transition ease-in-out duration-300 mr-10 rounded-lg hover:bg-white hover:text-black -mt-4"
                    >
                        Sign In
                    </Button>
                )}
            </div>
        </div>
    );
}

export default Header;
