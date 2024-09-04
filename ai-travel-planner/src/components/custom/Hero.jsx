import { Button } from "../ui/Button";
import {Link} from 'react-router-dom';
// import React from 'react';
import placeImage from '../../assets/tripplan.png';


function Hero() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black gap-9">
      <h1 className="font-extrabold text-4xl lg:text-5xl text-center mt-[-22rem]">
        <span className="text-red-500">Discover Your Next Adventure with AI:</span>
        <br /> Personalized Itineraries at Your Fingertips
      </h1>
      <p className="text-sm lg:text-lg text-black text-center">
        Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
      </p>
      <Link to={'/create-trip'}>
      <Button className="mt-8 bg-black text-white py-2 px-4 rounded hover:bg-white hover:text-black mt-[-8rem]">
        Get Started, It&#39;s Free
      </Button>
      </Link>
      <img src = {placeImage} className=" h-[420px] -mb-[380px]"/>
    </div>
  );
}

export default Hero;
