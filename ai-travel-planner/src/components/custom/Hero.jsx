// import React from 'react';
import { Button } from "../ui/Button";

function Hero() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white gap-9">
      <h1 className="font-extrabold text-[60px] text-center mt-16">
        <span className="text-[#f56551]">Discover Your Next Adventure with AI</span>: Personalized Itineraries at Your Fingertips
      </h1>
      <p className="text-2xl lg:text-3xl text-gray-400 text-center">
        Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
      </p>
      <Button className="mt-8">Get Started, Its Free</Button>
    </div>
  );
}

export default Hero;
