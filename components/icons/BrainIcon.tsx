import React from 'react';

export const BrainIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="url(#brain-gradient)"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <defs>
      <linearGradient id="brain-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#93C5FD' }} />
        <stop offset="100%" style={{ stopColor: '#FDE047' }} />
      </linearGradient>
    </defs>
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.98-1.95 2.5 2.5 0 0 1-1.3-4.24 2.5 2.5 0 0 1 .24-4.52A2.5 2.5 0 0 1 6 3.5a2.5 2.5 0 0 1 3.5-1.5z" />
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.98-1.95 2.5 2.5 0 0 0 1.3-4.24 2.5 2.5 0 0 0-.24-4.52A2.5 2.5 0 0 0 18 3.5a2.5 2.5 0 0 0-3.5-1.5z" />
  </svg>
);