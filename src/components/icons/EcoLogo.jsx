// Logo SVG Personalizado de Alta Gama para la Campaña Ambiental
const EcoLogo = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="globe-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0ea5e9" />
        <stop offset="100%" stopColor="#1e3a8a" />
      </linearGradient>
      <linearGradient id="leaf-grad" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#16a34a" />
        <stop offset="100%" stopColor="#4ade80" />
      </linearGradient>
    </defs>
    
    <circle cx="100" cy="95" r="55" fill="url(#globe-grad)" />
    <path d="M100 40 C125 40 145 65 145 95 C145 125 125 150 100 150 C75 150 55 125 55 95 C55 65 75 40 100 40 Z" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2"/>
    <ellipse cx="100" cy="95" rx="25" ry="55" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
    <line x1="45" y1="95" x2="155" y2="95" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />

    <path d="M 100 175 C 30 175 10 95 40 45 C 55 75 75 95 100 95 C 125 95 155 70 170 30 C 180 85 165 175 100 175 Z" fill="url(#leaf-grad)" opacity="0.95"/>
    
    <path d="M 40 45 Q 85 90 100 95" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
    <path d="M 170 30 Q 135 75 100 95" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
    <path d="M 100 95 L 100 155" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity="0.7"/>
  </svg>
);

export default EcoLogo;
