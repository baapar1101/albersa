import React from 'react';

interface FashionVisualProps {
  type: 'coat' | 'trouser' | 'shirt' | 'jacket' | 'knit' | 'bag' | 'look1' | 'look2' | 'look3' | 'look4' | 'weave';
  className?: string;
  label?: string;
}

export const FashionVisual: React.FC<FashionVisualProps> = ({ type, className = '', label }) => {
  return (
    <div
      className={`relative w-full h-full overflow-hidden bg-[#121214] select-none flex items-center justify-center group ${className}`}
    >
      {/* Background Architectural Grid Lines & Lighting Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06)_0%,rgba(10,10,10,0.95)_100%)]" />
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* SVG Procedural Haute Couture Silhouette & Shading */}
      <div className="relative z-10 w-full h-full flex items-center justify-center p-6 md:p-10 transition-transform duration-700 ease-out group-hover:scale-105">
        {type === 'coat' && (
          <svg viewBox="0 0 400 520" className="w-full h-full max-h-[460px] drop-shadow-2xl">
            <defs>
              <linearGradient id="coatGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#252528" />
                <stop offset="45%" stopColor="#141416" />
                <stop offset="100%" stopColor="#0a0a0c" />
              </linearGradient>
              <linearGradient id="lapelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#35353a" />
                <stop offset="100%" stopColor="#121214" />
              </linearGradient>
            </defs>
            {/* Architectural Coat Silhouette */}
            <path
              d="M140 70 L200 85 L260 70 L340 160 L320 250 L290 240 L315 480 L85 480 L110 240 L80 250 L60 160 Z"
              fill="url(#coatGrad)"
              stroke="#F1EFE9"
              strokeWidth="0.8"
              strokeOpacity="0.4"
            />
            {/* Dramatic Asymmetric Lapel */}
            <path
              d="M200 85 L260 180 L200 320 L160 160 Z"
              fill="url(#lapelGrad)"
              stroke="#ffffff"
              strokeWidth="0.5"
              strokeOpacity="0.6"
            />
            {/* Deep Pleat & Cantilever Pocket Line */}
            <path d="M200 320 L200 480" stroke="#3a3a40" strokeWidth="1.5" />
            <path d="M120 310 L160 310" stroke="#F1EFE9" strokeWidth="1" strokeOpacity="0.7" />
            <path d="M240 310 L280 310" stroke="#F1EFE9" strokeWidth="1" strokeOpacity="0.7" />
            {/* Titanium bead chain hem marker */}
            <line x1="85" y1="480" x2="315" y2="480" stroke="#d4d4d8" strokeWidth="1" strokeDasharray="3 3" />
          </svg>
        )}

        {type === 'trouser' && (
          <svg viewBox="0 0 400 520" className="w-full h-full max-h-[460px] drop-shadow-2xl">
            <defs>
              <linearGradient id="trouserGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1c1c1f" />
                <stop offset="50%" stopColor="#2c2c32" />
                <stop offset="100%" stopColor="#121214" />
              </linearGradient>
            </defs>
            {/* Radical Volume Trousers */}
            <path
              d="M130 90 L270 90 L290 200 L320 480 L220 480 L200 240 L180 480 L80 480 L110 200 Z"
              fill="url(#trouserGrad)"
              stroke="#F1EFE9"
              strokeWidth="0.8"
              strokeOpacity="0.3"
            />
            {/* Deep Inverted Pleats */}
            <path d="M165 90 L160 380" stroke="#3f3f46" strokeWidth="1.2" />
            <path d="M235 90 L240 380" stroke="#3f3f46" strokeWidth="1.2" />
            {/* Extended Waistband and Gunmetal Buckle */}
            <rect x="130" y="80" width="140" height="14" fill="#18181b" stroke="#71717a" strokeWidth="0.8" />
            <rect x="250" y="78" width="18" height="18" fill="#a1a1aa" stroke="#ffffff" strokeWidth="0.5" />
          </svg>
        )}

        {type === 'shirt' && (
          <svg viewBox="0 0 400 520" className="w-full h-full max-h-[460px] drop-shadow-2xl">
            <defs>
              <linearGradient id="shirtGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f4f4f2" />
                <stop offset="60%" stopColor="#e2dfd7" />
                <stop offset="100%" stopColor="#c5c3bc" />
              </linearGradient>
            </defs>
            {/* Poplin Architectural Shirt */}
            <path
              d="M150 90 L200 110 L250 90 L330 180 L310 240 L280 230 L290 440 Q200 470 110 440 L120 230 L90 240 L70 180 Z"
              fill="url(#shirtGrad)"
              stroke="#1a1a1a"
              strokeWidth="0.6"
            />
            {/* Origami Wing Collar */}
            <path d="M200 110 L160 160 L200 150 L240 160 Z" fill="#ffffff" stroke="#262626" strokeWidth="0.8" />
            {/* Concealed Placket Line */}
            <line x1="200" y1="150" x2="200" y2="445" stroke="#a8a29e" strokeWidth="1.5" strokeDasharray="6 4" />
          </svg>
        )}

        {type === 'jacket' && (
          <svg viewBox="0 0 400 520" className="w-full h-full max-h-[460px] drop-shadow-2xl">
            <defs>
              <linearGradient id="jacketGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2c2d30" />
                <stop offset="50%" stopColor="#1a1a1c" />
                <stop offset="100%" stopColor="#0e0e10" />
              </linearGradient>
            </defs>
            {/* Monolith Boxed Shoulder Jacket */}
            <path
              d="M130 90 Q200 110 270 90 L350 120 L330 290 L295 280 L290 440 L110 440 L105 280 L70 290 L50 120 Z"
              fill="url(#jacketGrad)"
              stroke="#F1EFE9"
              strokeWidth="0.8"
              strokeOpacity="0.4"
            />
            {/* Brutalist Zero-Lapel Collar Line */}
            <path d="M155 95 L200 210 L245 95" stroke="#71717a" strokeWidth="1.5" fill="none" />
            {/* Gunmetal Front Clasp */}
            <rect x="194" y="225" width="12" height="24" rx="2" fill="#d4d4d8" stroke="#ffffff" strokeWidth="0.5" />
            {/* Chest Welt */}
            <line x1="135" y1="200" x2="175" y2="200" stroke="#52525b" strokeWidth="1.5" />
          </svg>
        )}

        {type === 'knit' && (
          <svg viewBox="0 0 400 520" className="w-full h-full max-h-[460px] drop-shadow-2xl">
            <defs>
              <linearGradient id="knitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3f3f46" />
                <stop offset="50%" stopColor="#27272a" />
                <stop offset="100%" stopColor="#18181b" />
              </linearGradient>
            </defs>
            {/* Frame Knit Silhouette */}
            <path
              d="M160 70 L240 70 L250 120 L330 200 L300 300 L270 280 L270 450 L130 450 L130 280 L100 300 L70 200 L150 120 Z"
              fill="url(#knitGrad)"
              stroke="#F1EFE9"
              strokeWidth="0.8"
              strokeOpacity="0.3"
            />
            {/* Engineered Rib Chevron Vectors */}
            {[160, 200, 240, 280, 320, 360, 400].map((y, idx) => (
              <path
                key={idx}
                d={`M145 ${y} L200 ${y + 15} L255 ${y}`}
                stroke="#52525b"
                strokeWidth="1.2"
                fill="none"
              />
            ))}
            {/* Funnel Sculptural Neck */}
            <rect x="165" y="70" width="70" height="45" fill="#27272a" stroke="#71717a" strokeWidth="1" />
          </svg>
        )}

        {type === 'bag' && (
          <svg viewBox="0 0 400 520" className="w-full h-full max-h-[460px] drop-shadow-2xl">
            <defs>
              <linearGradient id="leatherGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#18181b" />
                <stop offset="35%" stopColor="#323238" />
                <stop offset="70%" stopColor="#18181b" />
                <stop offset="100%" stopColor="#09090b" />
              </linearGradient>
              <linearGradient id="metalHandle" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="50%" stopColor="#a1a1aa" />
                <stop offset="100%" stopColor="#52525b" />
              </linearGradient>
            </defs>
            {/* Billet Aluminum Sculpted Handle */}
            <path
              d="M170 120 C170 60, 230 60, 230 120"
              stroke="url(#metalHandle)"
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
            />
            {/* Cylindrical Column Bag Body */}
            <rect x="140" y="130" width="120" height="280" rx="20" fill="url(#leatherGrad)" stroke="#52525b" strokeWidth="1" />
            {/* Classical Fluting Ridges */}
            {[160, 180, 200, 220, 240].map((x, i) => (
              <line key={i} x1={x} y1="140" x2={x} y2="400" stroke="#3f3f46" strokeWidth="1.5" />
            ))}
            {/* Milled Anodized Base */}
            <rect x="140" y="405" width="120" height="12" rx="4" fill="url(#metalHandle)" />
          </svg>
        )}

        {/* LOOKBOOK CAMPAIGN EDITORIAL VISUALS */}
        {type === 'look1' && (
          <div className="w-full h-full flex flex-col justify-between p-4 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <svg viewBox="0 0 320 440" className="w-full h-full opacity-80">
                <path d="M110 50 L210 50 L280 200 L240 430 L80 430 L40 200 Z" fill="#18181b" stroke="#fff" strokeWidth="0.5" strokeOpacity="0.4" />
                <path d="M160 50 L160 430" stroke="#3f3f46" strokeWidth="1" strokeDasharray="4 4" />
                <circle cx="160" cy="35" r="18" fill="#3f3f46" />
                {/* Architectural pavilion backdrop lines */}
                <line x1="0" y1="120" x2="320" y2="80" stroke="#ffffff15" strokeWidth="1" />
                <line x1="0" y1="280" x2="320" y2="240" stroke="#ffffff15" strokeWidth="1" />
              </svg>
            </div>
            <div className="relative z-10 flex justify-between text-[9px] font-mono tracking-widest text-[#a3a3a3]">
              <span>PARIS / 2026</span>
              <span>PAVILLON ARSENAL</span>
            </div>
            <div className="relative z-10 text-right">
              <span className="font-editorial-serif italic text-2xl text-[#f1efe9]">Monolithic Mass</span>
            </div>
          </div>
        )}

        {type === 'look2' && (
          <div className="w-full h-full flex flex-col justify-between p-4 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <svg viewBox="0 0 320 440" className="w-full h-full opacity-80">
                <rect x="90" y="60" width="140" height="220" fill="#232328" stroke="#e4e4e7" strokeWidth="0.8" />
                <line x1="90" y1="60" x2="230" y2="280" stroke="#52525b" strokeWidth="1" />
                <line x1="230" y1="60" x2="90" y2="280" stroke="#52525b" strokeWidth="1" />
                <path d="M120 280 L100 420 L150 420 L160 300 L170 420 L220 420 L200 280 Z" fill="#141416" />
                <circle cx="160" cy="35" r="16" fill="#52525b" />
              </svg>
            </div>
            <div className="relative z-10 flex justify-between text-[9px] font-mono tracking-widest text-[#a3a3a3]">
              <span>STUDY OF FORM</span>
              <span>PALAIS DE TOKYO</span>
            </div>
            <div className="relative z-10 text-right">
              <span className="font-editorial-serif italic text-2xl text-[#f1efe9]">Planar Geometry</span>
            </div>
          </div>
        )}

        {type === 'look3' && (
          <div className="w-full h-full flex flex-col justify-between p-4 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <svg viewBox="0 0 320 440" className="w-full h-full opacity-80">
                <path d="M160 40 Q260 120 220 280 Q160 340 100 280 Q60 120 160 40 Z" fill="#27272a" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.5" />
                <path d="M120 280 L90 430 L150 430 L160 320 L170 430 L230 430 L200 280 Z" fill="#121214" />
                <circle cx="160" cy="25" r="14" fill="#3f3f46" />
              </svg>
            </div>
            <div className="relative z-10 flex justify-between text-[9px] font-mono tracking-widest text-[#a3a3a3]">
              <span>KINETIC TENSION</span>
              <span>MILANO</span>
            </div>
            <div className="relative z-10 text-right">
              <span className="font-editorial-serif italic text-2xl text-[#f1efe9]">Fluid Volume</span>
            </div>
          </div>
        )}

        {type === 'look4' && (
          <div className="w-full h-full flex flex-col justify-between p-4 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <svg viewBox="0 0 320 440" className="w-full h-full opacity-80">
                <polygon points="160,20 270,120 240,420 80,420 50,120" fill="#18181b" stroke="#d4d4d8" strokeWidth="0.8" strokeOpacity="0.4" />
                <line x1="80" y1="420" x2="240" y2="420" stroke="#f4f4f5" strokeWidth="2" />
                <circle cx="160" cy="40" r="16" fill="#3f3f46" />
              </svg>
            </div>
            <div className="relative z-10 flex justify-between text-[9px] font-mono tracking-widest text-[#a3a3a3]">
              <span>TECTONIC ANATOMY</span>
              <span>ATELIER EDITION</span>
            </div>
            <div className="relative z-10 text-right">
              <span className="font-editorial-serif italic text-2xl text-[#f1efe9]">Weighted Drape</span>
            </div>
          </div>
        )}

        {type === 'weave' && (
          <div className="w-full h-full flex items-center justify-center">
            <svg viewBox="0 0 400 300" className="w-full h-full opacity-70">
              <pattern id="weavePattern" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 0 10 L 20 10 M 10 0 L 10 20" stroke="#52525b" strokeWidth="2.5" />
                <rect x="6" y="6" width="8" height="8" fill="#a1a1aa" opacity="0.6" />
              </pattern>
              <rect width="400" height="300" fill="url(#weavePattern)" />
              <circle cx="200" cy="150" r="90" fill="none" stroke="#F1EFE9" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="200" y1="40" x2="200" y2="260" stroke="#F1EFE9" strokeWidth="0.8" strokeOpacity="0.4" />
              <line x1="90" y1="150" x2="310" y2="150" stroke="#F1EFE9" strokeWidth="0.8" strokeOpacity="0.4" />
            </svg>
          </div>
        )}
      </div>

      {/* Technical Corner Annotations */}
      <div className="absolute top-3 left-3 text-[9px] font-mono tracking-widest text-[#737373] uppercase">
        {label || 'ALBERSA / ARCHIVE'}
      </div>
      <div className="absolute bottom-3 right-3 text-[9px] font-mono tracking-widest text-[#737373] uppercase">
        REF. 026-F
      </div>
    </div>
  );
};
