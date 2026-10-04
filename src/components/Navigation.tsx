import React, { useState, useEffect } from 'react';
import { ShoppingBag, Volume2, VolumeX, Menu, X, Globe } from 'lucide-react';
import { CursorMode } from './CustomCursor';
import { AlbersaLogo } from './AlbersaLogo';
import { Language, TranslationData } from '../data/translations';

interface NavigationProps {
  cartCount: number;
  onOpenCart: () => void;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
  onSetCursorMode: (mode: CursorMode) => void;
  lang: Language;
  onToggleLang: () => void;
  t: TranslationData;
}

export const Navigation: React.FC<NavigationProps> = ({
  cartCount,
  onOpenCart,
  isAudioPlaying,
  onToggleAudio,
  onSetCursorMode,
  lang,
  onToggleLang,
  t,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: lang === 'fa' ? 'آرشیو آتلیه' : 'ARCHIVE', href: '#atelier-showcase' },
    { label: t.nav.collection, href: '#collection' },
    { label: t.nav.interactive, href: '#interactive-view' },
    { label: t.nav.lookbook, href: '#lookbook' },
    { label: t.nav.materials, href: '#materials' },
    { label: t.nav.manifesto, href: '#manifesto' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#0A0A0A]/85 backdrop-blur-md border-b border-white/10 py-3.5 shadow-xl'
            : 'bg-transparent py-5 md:py-7'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-14 flex items-center justify-between">
          {/* Zone 1: Official ALBERSA Vector Logo */}
          <a
            href="#"
            onMouseEnter={() => onSetCursorMode('hover')}
            onMouseLeave={() => onSetCursorMode('default')}
            className="flex items-center text-[#F1EFE9] hover:opacity-85 transition-opacity"
            aria-label="ALBERSA Home"
          >
            <AlbersaLogo className="h-7 sm:h-8 text-[#F1EFE9]" isPersian={lang === 'fa'} />
          </a>

          {/* Zone 2: Clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-[11px] font-mono tracking-[0.2em] text-[#A3A3A3]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onMouseEnter={() => onSetCursorMode('hover')}
                onMouseLeave={() => onSetCursorMode('default')}
                className="hover:text-[#F1EFE9] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#F1EFE9] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary Actions (Language, Audio, Cart, Mobile Toggle) */}
          <div className="flex items-center gap-4 sm:gap-5">
            {/* Language Switcher Toggle */}
            <button
              onClick={onToggleLang}
              onMouseEnter={() => onSetCursorMode('hover')}
              onMouseLeave={() => onSetCursorMode('default')}
              aria-label="Toggle language between English and Persian"
              className="flex items-center gap-1.5 text-xs font-mono tracking-widest text-[#F1EFE9] bg-white/5 hover:bg-white/15 border border-white/15 px-3 py-1.5 transition-all"
              title={lang === 'fa' ? 'Switch to English' : 'تغییر به زبان فارسی'}
            >
              <Globe size={13} className="text-[#A3A3A3]" />
              <span className="font-semibold text-[11px]">
                {lang === 'fa' ? 'EN' : 'فا'}
              </span>
            </button>

            {/* Ambient Sound Generator Toggle */}
            <button
              onClick={onToggleAudio}
              onMouseEnter={() => onSetCursorMode('hover')}
              onMouseLeave={() => onSetCursorMode('default')}
              aria-label={isAudioPlaying ? 'Mute ambient sound' : 'Enable runway soundscape'}
              className="hidden sm:flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] text-[#A3A3A3] hover:text-[#F1EFE9] transition-colors p-2"
              title="Toggle Atelier Atmosphere"
            >
              {isAudioPlaying ? (
                <>
                  <Volume2 size={14} className="text-[#F1EFE9] animate-pulse" />
                  <span>{t.nav.soundOn}</span>
                </>
              ) : (
                <>
                  <VolumeX size={14} />
                  <span>{t.nav.soundOff}</span>
                </>
              )}
            </button>

            {/* Shopping Bag Button */}
            <button
              onClick={onOpenCart}
              onMouseEnter={() => onSetCursorMode('hover')}
              onMouseLeave={() => onSetCursorMode('default')}
              aria-label="Open Shopping Bag"
              className="flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-[#F1EFE9] bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-1.5 transition-all"
            >
              <ShoppingBag size={14} />
              <span>{t.nav.bag}</span>
              <span className="w-5 h-5 flex items-center justify-center rounded-full bg-[#F1EFE9] text-[#0A0A0A] text-[10px] font-bold">
                {cartCount}
              </span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              onMouseEnter={() => onSetCursorMode('hover')}
              onMouseLeave={() => onSetCursorMode('default')}
              aria-label="Open Navigation Menu"
              className="lg:hidden text-[#F1EFE9] p-2 hover:opacity-80"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Fashion Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#0A0A0A] flex flex-col justify-between p-8 md:p-14 animate-in fade-in duration-300">
          <div className="flex justify-between items-center border-b border-white/10 pb-6">
            <AlbersaLogo className="h-7 text-[#F1EFE9]" isPersian={lang === 'fa'} />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#F1EFE9] p-2"
              aria-label="Close Menu"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex flex-col gap-6 py-8">
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#A3A3A3] uppercase">
              {lang === 'fa' ? 'فهرست ناوبری / ۰۲۶' : 'INDEX / 026'}
            </span>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-editorial-display text-2xl sm:text-3xl text-[#F1EFE9] hover:text-[#A3A3A3] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="border-t border-white/10 pt-6 flex flex-col gap-4 text-xs font-mono tracking-widest text-[#A3A3A3]">
            <div className="flex justify-between items-center">
              <span>{lang === 'fa' ? 'تغییر زبان' : 'LANGUAGE'}</span>
              <button
                onClick={() => {
                  onToggleLang();
                  setMobileMenuOpen(false);
                }}
                className="text-[#F1EFE9] uppercase underline underline-offset-4 flex items-center gap-1.5"
              >
                <Globe size={13} />
                <span>{lang === 'fa' ? 'English (EN)' : 'فارسی (FA)'}</span>
              </button>
            </div>
            <div className="flex justify-between items-center">
              <span>{lang === 'fa' ? 'صدای آتلیه' : 'ATMOSPHERE'}</span>
              <button
                onClick={onToggleAudio}
                className="text-[#F1EFE9] uppercase underline underline-offset-4"
              >
                {isAudioPlaying ? (lang === 'fa' ? 'قطع صدا' : 'Mute') : (lang === 'fa' ? 'پخش صدا' : 'Play Atmosphere')}
              </button>
            </div>
            <div className="flex justify-between text-[10px] pt-2">
              <span>PARIS / MILAN</span>
              <span>© ALBERSA 2026</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
