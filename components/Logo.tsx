import React from 'react';

const Logo: React.FC = () => {
  return (
    <div 
      className="relative animate-float"
      style={{
        filter: `
          drop-shadow(0 0 20px rgba(212, 175, 55, 0.3)) 
          drop-shadow(0 5px 5px rgba(10, 26, 47, 0.6))
          drop-shadow(0 10px 10px rgba(10, 26, 47, 0.4))
          drop-shadow(0 15px 15px rgba(10, 26, 47, 0.2))
        `
      }}
    >
      <svg
        width="160"
        height="160"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        className="transform-gpu"
      >
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#F7E7CE' }} /> 
            <stop offset="50%" style={{ stopColor: '#D4AF37' }} />
            <stop offset="100%" style={{ stopColor: '#B8860B' }} />
          </linearGradient>
        </defs>
        <g>
          <circle 
            cx="50" 
            cy="50" 
            r="46" 
            stroke="url(#goldGradient)" 
            strokeWidth="3" 
            fill="none" 
          />
          <text
            x="50"
            y="50"
            fontFamily="Playfair Display, serif"
            fontSize="38"
            fontWeight="600"
            fill="url(#goldGradient)"
            textAnchor="middle"
            dominantBaseline="central"
          >
            E&amp;A
          </text>
        </g>
      </svg>
    </div>
  );
};

export default Logo;
