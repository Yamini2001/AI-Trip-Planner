// src/ui/Button.jsx
import React from 'react';

export const Button = ({ children, className, ...props }) => (
  <button
    className={`bg-[#f56551] text-white font-bold py-2 px-4 rounded hover:bg-[#f34c39] ${className}`}
    {...props}
  >
    {children}
  </button>
);
