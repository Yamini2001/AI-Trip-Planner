// import React from 'react';
import { Button } from '../ui/Button';
import './Header.css'; 

function Header() {
  return (
    <div className="header">
      <div className="header-content p-3 shadow-sm flex justify-between items-center px-5">
        <img src='/travel1.png' alt='Travel Logo' className="logo"/>
        <Button className="button">Sign In</Button>
      </div>
    </div>
  );
}

export default Header;
