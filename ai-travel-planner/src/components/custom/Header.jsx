// Header.jsx
// import React from 'react';
import {Button} from '../ui/Button';
import './Header.css'; 
function Header() {
  return (
    <div className="header">
    <div className='p-3 shadow-sm flex justify-between items-center px-5'>
      <img src='/travel1.png' alt='Travel Logo'/>
      <div>
        <Button>Sign In</Button>
      </div>
      </div>
    </div>
  )
}

export default Header;
