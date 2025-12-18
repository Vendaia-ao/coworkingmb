import React from 'react';

interface LogoProps {
  className?: string;
  lightMode?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = "h-12", lightMode = false }) => {
  return (
    <svg 
      viewBox="0 0 300 180" 
      className={className} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Mulato Business Logo"
    >
      <defs>
        <linearGradient id="goldGradient" x1="0" y1="0" x2="300" y2="180" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D4AF37" />
          <stop offset="40%" stopColor="#F4E285" />
          <stop offset="60%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#C5A059" />
        </linearGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.3"/>
        </filter>
      </defs>
      
      {/* Semi-circle Arch */}
      <path 
        d="M 50 140 A 100 100 0 0 1 250 140" 
        fill="url(#goldGradient)" 
        filter="url(#shadow)"
      />
      
      {/* Monogram MB */}
      <text 
        x="150" 
        y="125" 
        fontFamily="Playfair Display, serif" 
        fontSize="90" 
        fontWeight="bold" 
        fill="white" 
        textAnchor="middle"
        letterSpacing="0.05em"
      >
        MB
      </text>
      
      {/* Brand Name */}
      <text 
        x="150" 
        y="135" 
        fontFamily="Inter, sans-serif" 
        fontSize="14" 
        fontWeight="bold" 
        letterSpacing="0.3em" 
        fill="white" 
        textAnchor="middle"
        style={{ textShadow: '0px 1px 2px rgba(0,0,0,0.2)' }}
      >
        MULATO BUSINESS
      </text>

      {/* Tagline */}
      <text 
        x="150" 
        y="165" 
        fontFamily="Inter, sans-serif" 
        fontSize="10" 
        fontWeight="500" 
        letterSpacing="0.2em" 
        fill={lightMode ? '#1a1a1a' : '#F4E285'} 
        textAnchor="middle"
        className="uppercase"
      >
        O Cliente Vem Primeiro
      </text>
    </svg>
  );
};
