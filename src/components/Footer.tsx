import React, { useState, useEffect } from 'react';
import { CursorMode } from './CustomCursor';
import { ArrowUp, Globe } from 'lucide-react';
import { AlbersaLogo } from './AlbersaLogo';
import { Language, TranslationData } from '../data/translations';

interface FooterProps {
  onSetCursorMode: (mode: CursorMode) => void;
  lang: Language;
  onToggleLang: () => void;
  t: TranslationData;
}

export const Footer: React.FC<FooterProps> = ({
  onSetCursorMode,
  lang,
  onToggleLang,
  t,
}) => {
  const [parisTime, setParisTime] = useState('');
  const [milanTime, setMilanTime] = useState('');

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat(lang === 'fa' ? 'fa-IR' : 'en-GB', {
        timeZone: 'Europe/Paris',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
      const timeStr = formatter.format(now);
      setParisTime(timeStr);
      setMilanTime(timeStr);
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, [lang]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full bg-[#0A0A0A] text-[#F1EFE9] pt-28 pb-16 px-6 md:px-14 overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col justify-between">
        {/* Top Info Bar: Live Atelier Times & Back to Top */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-16 border-b border-white/10 text-xs font-mono tracking-widest text-[#A3A3A3]">
          <div>
            <span className="block text-[#737373] text-[10px] mb-1">{t.footer.parisClock}</span>
            <span className="text-[#F1EFE9] tabular-nums font-semibold text-sm">
              {parisTime || '10:39:56'}
            </span>
            <span className="block text-[10px] text-[#52525b] mt-1">
              {t.footer.parisAddress}
            </span>
          </div>

          <div>
            <span className="block text-[#737373] text-[10px] mb-1">{t.footer.milanClock}</span>
            <span className="text-[#F1EFE9] tabular-nums font-semibold text-sm">
              {milanTime || '10:39:56'}
            </span>
            <span className="block text-[10px] text-[#52525b] mt-1">
              {t.footer.milanAddress}
            </span>
          </div>

          <div className="flex md:justify-end items-center gap-6">
            <button
              onClick={onToggleLang}
              onMouseEnter={() => onSetCursorMode('hover')}
              onMouseLeave={() => onSetCursorMode('default')}
              className="flex items-center gap-2 text-xs font-mono text-[#A3A3A3] hover:text-white transition-colors"
            >
              <Globe size={13} />
              <span>{lang === 'fa' ? 'زبان: فارسی' : 'Language: English'}</span>
            </button>

            <button
              onClick={scrollToTop}
              onMouseEnter={() => onSetCursorMode('hover')}
              onMouseLeave={() => onSetCursorMode('default')}
              className="flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-[#F1EFE9] hover:text-white transition-colors"
            >
              <span>{t.footer.returnTop}</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>

        {/* Middle Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-16 border-b border-white/10 text-xs font-mono tracking-[0.2em] uppercase">
          <div>
            <span className="block text-[#737373] text-[10px] mb-4">{t.footer.colIndex}</span>
            <ul className="space-y-3">
              <li>
                <a href="#collection" className="hover:text-[#A3A3A3] transition-colors">
                  {t.nav.collection}
                </a>
              </li>
              <li>
                <a href="#lookbook" className="hover:text-[#A3A3A3] transition-colors">
                  {t.nav.lookbook}
                </a>
              </li>
              <li>
                <a href="#interactive-view" className="hover:text-[#A3A3A3] transition-colors">
                  {t.nav.interactive}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <span className="block text-[#737373] text-[10px] mb-4">{t.footer.colRep}</span>
            <ul className="space-y-3">
              <li>
                <a href="#manifesto" className="hover:text-[#A3A3A3] transition-colors">
                  {t.nav.manifesto}
                </a>
              </li>
              <li>
                <a href="#materials" className="hover:text-[#A3A3A3] transition-colors">
                  {t.nav.materials}
                </a>
              </li>
              <li>
                <span className="text-[#737373]">{lang === 'fa' ? 'فروشگاه‌های مرکزی (Q4)' : 'FLAGSHIP STORES (Q4)'}</span>
              </li>
            </ul>
          </div>

          <div>
            <span className="block text-[#737373] text-[10px] mb-4">{t.footer.colDispatches}</span>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#A3A3A3] transition-colors"
                >
                  INSTAGRAM
                </a>
              </li>
              <li>
                <span className="text-[#737373]">{lang === 'fa' ? 'کاتالوگ آرشیوی' : 'ARCHIVE CATALOGUE'}</span>
              </li>
              <li>
                <span className="text-[#737373]">{lang === 'fa' ? 'تشریفات ویژه مشتریان' : 'PRIVATE CLIENT CONCIERGE'}</span>
              </li>
            </ul>
          </div>

          <div>
            <span className="block text-[#737373] text-[10px] mb-4">{t.footer.colEthics}</span>
            <p className="text-[11px] font-sans text-[#737373] normal-case leading-relaxed">
              {t.footer.ethicsText}
            </p>
          </div>
        </div>

        {/* Grand Vector Brand Logo Lockup */}
        <div className="py-14 select-none flex flex-col items-center justify-center text-center">
          <AlbersaLogo className="h-16 sm:h-24 md:h-28 text-[#F1EFE9]" variant="full" isPersian={lang === 'fa'} />
        </div>

        {/* Bottom Legal & Colophon */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono tracking-widest text-[#737373] pt-6 border-t border-white/5 gap-2">
          <div>{lang === 'fa' ? 'پاریس / میلان' : 'PARIS / MILAN'}</div>
          <div>{t.footer.rights}</div>
          <div>{t.footer.editionTag}</div>
        </div>
      </div>
    </footer>
  );
};
