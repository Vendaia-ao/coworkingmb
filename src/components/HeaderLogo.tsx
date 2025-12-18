import React from 'react';

interface HeaderLogoProps {
  className?: string;
  lightMode?: boolean; 
}

export const HeaderLogo: React.FC<HeaderLogoProps> = ({ className = "h-8", lightMode = false }) => {
  const textColor = lightMode ? "#1a1a1a" : "#ffffff";
  const goldColor = "#D4AF37";

  return (
    <svg 
      viewBox="0 0 280 50" 
      className={className} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Coworking MB"
    >
      <text 
        x="0" 
        y="38" 
        fontFamily="Inter, sans-serif" 
        fontSize="36" 
        fontWeight="300" 
        letterSpacing="-0.03em" 
        fill={textColor}
      >
        COWORKING
      </text>
      <text 
        x="225" 
        y="38" 
        fontFamily="Playfair Display, serif" 
        fontSize="36" 
        fontWeight="400" 
        fill={goldColor}
      >
        MB
      </text>
    </svg>
  );
};
