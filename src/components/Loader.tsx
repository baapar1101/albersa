import React, { useEffect, useState } from 'react';
import { AlbersaLogo } from './AlbersaLogo';
import { Language } from '../data/translations';

interface LoaderProps {
  onComplete: () => void;
  lang: Language;
}

export const Loader: React.FC<LoaderProps> = ({ onComplete, lang }) => {
  const [percent, setPercent] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsFading(true), 300);
          setTimeout(() => onComplete(), 900);
          return 100;
        }
        const step = prev < 40 ? 4 : prev < 75 ? 3 : prev < 95 ? 2 : 1;
        return Math.min(100, prev + step);
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between bg-[#0A0A0A] p-8 md:p-14 transition-opacity duration-700 pointer-events-auto ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="w-full flex justify-between items-center text-[10px] uppercase tracking-[0.3em] text-[#A3A3A3]">
        <span>{lang === 'fa' ? 'آتلیه آلبرسا' : 'ALBERSA ATELIER'}</span>
        <span>{lang === 'fa' ? 'پاریس / میلان' : 'PARIS / MILAN'}</span>
      </div>

      <div className="flex flex-col items-center text-center">
        {/* Official ALBERSA Logo */}
        <div className="mb-4">
          <AlbersaLogo className="h-14 sm:h-16 text-[#F1EFE9]" variant="full" isPersian={lang === 'fa'} />
        </div>
        <p className="font-editorial-serif italic text-sm md:text-base text-[#A3A3A3] tracking-widest">
          {lang === 'fa' ? 'مجموعه ۰۲۶ / معماری فرم' : 'Collection 026 / Architecture of Form'}
        </p>
      </div>

      <div className="w-full max-w-xs flex flex-col items-center gap-3">
        <div className="w-full h-[1px] bg-[#222222] overflow-hidden relative">
          <div
            className="absolute top-0 left-0 h-full bg-[#F1EFE9] transition-all duration-100 ease-out"
            style={{ width: `${percent}%` }}
          />
        </div>
        <div className="w-full flex justify-between text-[11px] font-mono tabular-nums text-[#A3A3A3] tracking-widest">
          <span>{lang === 'fa' ? 'آماده‌سازی فضا' : 'INITIALIZING SPACE'}</span>
          <span>{percent.toString().padStart(2, '0')} — 100</span>
        </div>
      </div>
    </div>
  );
};
