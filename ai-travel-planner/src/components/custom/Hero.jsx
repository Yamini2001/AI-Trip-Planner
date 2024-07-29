// import React from 'react';
import { Button } from "../ui/Button";
import './Hero.css'; 

function Hero() {
  return (
    <div className="hero">
      <h1>
        <span>Discover Your Next Adventure with AI:</span><br/> Personalized Itineraries at Your Fingertips
      </h1>
      <p className="text">
        Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
      </p>
      <Button className="button">Get Started, Its Free</Button>
    </div>
  );
}

export default Hero;
