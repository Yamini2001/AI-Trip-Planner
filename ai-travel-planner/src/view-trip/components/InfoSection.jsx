// import React from 'react';
import placeHolder from '../placeholder.png';

function InfoSection({ trip }) {
  return (
    <div className="flex justify-center items-center h-screen">
      <img 
       src={placeHolder}
       alt="Trip Placeholder" 
        className="h-136 w-500 object-cover mb-40"
        />
    </div>
  );
}

export default InfoSection;
