import { Button } from '../ui/Button'; // Ensure Button component is also using Tailwind classes

function Header() {
  return (
    <div className="header bg-gradient-to-b from-white-300 via-white-100 to-white text-black">
      <div className="header-content p-3 shadow-sm flex justify-between items-center px-5">
        <img 
          src='/travelplanner.png' 
          alt='Travel Logo' 
          className="logo max-w-[12%] h-auto max-h-[30%] ml-1 bg-blue rounded-lg -mt-4 shadow-none" 
        />
        <Button 
          className="button bg-black text-white border-none py-2 px-4 text-lg cursor-pointer transition ease-in-out duration-300 mr-10 rounded-lg hover:bg-white hover:text-black -mt-4"
        >
          Sign In
        </Button>
      </div>
    </div>
  );
}

export default Header;
