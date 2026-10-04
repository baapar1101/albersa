import React from 'react';

interface AlbersaLogoProps {
  className?: string;
  variant?: 'full' | 'mark' | 'horizontal' | 'wordmark';
  color?: string; // e.g. '#F1EFE9' or '#0A0A0A' or 'currentColor'
  isPersian?: boolean;
}

export const AlbersaLogo: React.FC<AlbersaLogoProps> = ({
  className = 'h-7',
  variant = 'horizontal',
  color = 'currentColor',
  isPersian = false,
}) => {
  // Vector Architectural Monogram Emblem (Planar geometric 'A' ligature with cantilevered facets)
  const Emblem = (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full aspect-square inline-block select-none transition-transform duration-300 group-hover:scale-105"
      aria-hidden="true"
    >
      {/* Outer brutalist architectural facet */}
      <path
        d="M60 8 L112 112 H84 L60 58 L36 112 H8 L60 8Z"
        fill={color}
      />
      {/* Internal floating geometric void */}
      <polygon
        points="60,26 80,72 40,72"
        fill="#0A0A0A"
        className="dark:fill-[#0A0A0A]"
      />
      {/* Cantilevered horizontal cross-member */}
      <rect
        x="24"
        y="78"
        width="72"
        height="8"
        fill={color}
      />
      {/* Razor-sharp vertical incision */}
      <line
        x1="60"
        y1="8"
        x2="60"
        y2="52"
        stroke="#0A0A0A"
        strokeWidth="3"
      />
    </svg>
  );

  // Vector Custom Architectural Typographic Wordmark
  const Wordmark = (
    <span
      className={`font-editorial-display font-bold tracking-[0.24em] select-none uppercase inline-flex items-center text-current ${
        isPersian ? 'text-lg tracking-normal font-sans' : 'text-xl'
      }`}
    >
      {isPersian ? (
        <span className="flex items-center gap-2">
          <span className="font-editorial-display tracking-[0.2em] font-bold">ALBERSA</span>
          <span className="text-xs font-light text-current/60 font-sans tracking-normal">آلبرسا</span>
        </span>
      ) : (
        <span>ALBERSA</span>
      )}
    </span>
  );

  if (variant === 'mark') {
    return <div className={`inline-flex items-center ${className}`}>{Emblem}</div>;
  }

  if (variant === 'wordmark') {
    return <div className={`inline-flex items-center ${className}`}>{Wordmark}</div>;
  }

  return (
    <div
      className={`inline-flex items-center gap-3 group select-none text-current ${className}`}
      aria-label="ALBERSA"
    >
      <div className="h-full flex items-center">{Emblem}</div>
      <div className="flex flex-col justify-center">
        {Wordmark}
      </div>
    </div>
  );
};
