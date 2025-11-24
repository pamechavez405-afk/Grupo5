import React from 'react';

export const MotivationIllustration: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 400 300"
    fill="none"
    {...props}
  >
    <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{stopColor:'#BFDBFE', stopOpacity:0.6}} />
            <stop offset="100%" style={{stopColor:'#FEF08A', stopOpacity:0.6}} />
        </linearGradient>
    </defs>
    
    {/* Background Elements */}
    <circle cx="200" cy="150" r="130" fill="url(#grad1)" />
    
    {/* Floating elements */}
    <g className="animate-pulse" style={{animationDuration: '3s'}}>
         <text x="60" y="80" fontFamily="monospace" fontSize="32" fill="#60A5FA" fontWeight="bold">a²</text>
    </g>
    <g className="animate-pulse" style={{animationDuration: '4s'}}>
        <text x="310" y="220" fontFamily="monospace" fontSize="32" fill="#60A5FA" fontWeight="bold">b²</text>
    </g>
     <g className="animate-bounce" style={{animationDuration: '5s'}}>
        <text x="290" y="80" fontFamily="monospace" fontSize="40" fill="#EAB308" fontWeight="bold">?</text>
    </g>

    {/* Character: A happy mascot */}
    <path d="M170 240 C170 240 170 280 160 300 H240 C230 280 230 240 230 240" fill="#93C5FD" /> 
    
    {/* Head */}
    <ellipse cx="200" cy="180" rx="60" ry="55" fill="#FFFFFF" stroke="#93C5FD" strokeWidth="4" />
    
    {/* Eyes */}
    <circle cx="180" cy="170" r="6" fill="#1E3A8A" />
    <circle cx="220" cy="170" r="6" fill="#1E3A8A" />
    
    {/* Smile */}
    <path d="M180 195 Q200 215 220 195" stroke="#1E3A8A" strokeWidth="4" strokeLinecap="round" fill="none" />
    
    {/* Graduation Cap */}
    <path d="M130 130 L200 155 L270 130 L200 105 Z" fill="#3B82F6" stroke="#1E40AF" strokeWidth="2"/>
    <path d="M270 130 V150" stroke="#FCD34D" strokeWidth="3" />
    <circle cx="270" cy="150" r="5" fill="#FCD34D" />

    {/* Stars */}
    <path d="M100 200 L105 215 H120 L110 225 L115 240 L100 230 L85 240 L90 225 L80 215 H95 Z" fill="#FDE047" />
  </svg>
);