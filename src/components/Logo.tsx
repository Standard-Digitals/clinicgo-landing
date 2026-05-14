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
        {/* Clinic Go Stethoscope Icon */}
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full p-1.5 text-white drop-shadow-sm">
          {/* Left earpiece */}
          <circle cx="8" cy="6" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          {/* Right earpiece */}
          <circle cx="24" cy="6" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          {/* Connecting tube */}
          <path d="M 10 8 Q 8 12 8 16 Q 8 22 16 26 Q 24 22 24 16 Q 24 12 22 8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          {/* Diaphragm */}
          <circle cx="16" cy="27" r="4" fill="none" stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="16" cy="27" r="2.2" fill="currentColor" opacity="0.4"/>
          {/* Calendar accent */}
          <g opacity="0.6">
            <rect x="22" y="4" width="6" height="6" rx="1" fill="none" stroke="currentColor" strokeWidth="1"/>
            <line x1="22" y1="6" x2="28" y2="6" stroke="currentColor" strokeWidth="0.8"/>
          </g>
        </svg>
      </div>
      <span className={`font-extrabold tracking-tight ${light ? 'text-white' : 'bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700'} ${textSize}`}>
        Clinic Go
      </span>
    </div>
  );
}
