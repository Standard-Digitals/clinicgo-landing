import React from 'react';

interface LogoProps {
  className?: string;
  iconSize?: string;
  textSize?: string;
  light?: boolean;
}

export default function Logo({ 
  className = "", 
  iconSize = "w-9 h-9", 
  textSize = "text-xl",
  light = false
}: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 shadow-lg shadow-blue-500/30 shrink-0 ${iconSize} overflow-hidden border border-white/20`}>
        {/* Premium SD Monogram */}
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full p-1.5 text-white drop-shadow-sm">
          <path d="M 20 12 C 20 9.79 18.21 8 16 8 H 13 C 10.79 8 9 9.79 9 12 C 9 14.21 10.79 16 13 16 H 16 C 18.21 16 20 17.79 20 20 C 20 22.21 18.21 24 16 24 H 13 C 10.79 24 9 22.21 9 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M 14 8 H 17 C 21.418 8 25 11.582 25 16 C 25 20.418 21.418 24 17 24 H 14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          {/* Accent dot */}
          <circle cx="25" cy="8" r="1.5" fill="currentColor" />
        </svg>
      </div>
      <span className={`font-extrabold tracking-tight ${light ? 'text-white' : 'bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700'} ${textSize}`}>
        SD Booking
      </span>
    </div>
  );
}
