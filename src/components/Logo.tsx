import React from 'react';

interface LogoProps {
  className?: string;
  iconSize?: string;
}

export default function Logo({ 
  className = "", 
  iconSize = "w-42", 
}: LogoProps) {
  return (
    <div className={className}>
      <img src="/logo.png" alt="Clinic Go" className={iconSize} />
    </div>
  );
}
