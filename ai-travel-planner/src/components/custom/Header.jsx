import { useEffect, useState } from 'react';
import { Button } from '../ui/Button'; 
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { Dialog, DialogContent, DialogHeader, DialogDescription } from '@/components/ui/dialog';
import travelPlannerLogo from '../../assets/travelplanner.png';
import axios from 'axios'; // Import axios for API requests
import { FcGoogle } from 'react-icons/fc'; // Import Google icon for sign-in button
// import { LuPlus } from "react-icons/lu";

function Header() {
  const [user, setUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false); // State to manage loading status for the sign-in button

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = useGoogleLogin({
    onSuccess: (tokenInfo) => GetUserProfile(tokenInfo),
    onError: (error) => console.log(error),
  });

  const GetUserProfile = (tokenInfo) => {
    setLoading(true); // Set loading to true when fetching user profile
    axios
      .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`, {
        headers: {
          Authorization: `Bearer ${tokenInfo.access_token}`,
          Accept: 'application/json',
        },
      })
      .then((resp) => {
        console.log(resp);
        localStorage.setItem('user', JSON.stringify(resp.data));
        setUser(resp.data); // Update user state with the fetched user data
        setOpenDialog(false);
        setLoading(false); // Set loading to false after fetching user profile
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        setLoading(false); // Set loading to false if there's an error
      });
  };

  const handleLogout = () => {
    googleLogout();
    localStorage.clear();
    setUser(null); // Update the state to reflect user is logged out
  };

  return (
    <div className="header bg-gradient-to-b from-white-300 via-white-100 to-white text-black">
      <div className="header-content p-3 shadow-sm flex justify-between items-center px-5">
        <img
          src={travelPlannerLogo}
          alt="Travel Planner Logo"
          className="logo max-w-[12%] h-auto max-h-[30%] ml-1 bg-blue rounded-lg -mt-4 shadow-none"
        />
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <a href='/create-trip'>
                <Button className="rounded-full">
                + Create Trip
                </Button>
              </a>
              <a href='/my-trips'>
                <Button className="rounded-full">
                  My Trips
                </Button>
              </a>
              {user.picture && (
                <Popover>
                  <PopoverTrigger>
                    <img src={user.picture} alt="User Avatar" className="h-[35px] w-[35px] rounded-full" />
                  </PopoverTrigger>
                  <PopoverContent>
                    <h2
                      className="cursor-pointer"
                      onClick={handleLogout}
                    >
                      Logout
                    </h2>
                  </PopoverContent>
                </Popover>
              )}
            </>
          ) : (
            <button
              onClick={() => setOpenDialog(true)}
              className="button bg-black text-white border-none py-2 px-4 text-lg cursor-pointer transition ease-in-out duration-300 mr-10 rounded-lg hover:bg-white hover:text-black -mt-4"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img
                src={travelPlannerLogo}
                className="w-1/4 h-auto mx-auto rounded-lg mb-5"
                alt="logo"
              />
              <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
              <p>Sign in to the App with Google authentication securely.</p>
              <button
                disabled={loading}
                onClick={login}
                className="w-full mt-5 flex gap-4 items-center justify-center p-3 bg-black text-white rounded hover:bg-gray-800 transition duration-300"
              >
                <FcGoogle className="h-7 w-7" />
                {loading ? 'Loading...' : 'Sign In With Google'}
              </button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;
