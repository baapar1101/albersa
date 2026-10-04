import React, { useState } from 'react';
import { LOOKBOOK_LOOKS } from '../data/fashionData';
import { Look } from '../types';
import { FashionVisual } from './FashionVisual';
import { CursorMode } from './CustomCursor';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import { Language, TranslationData } from '../data/translations';

interface LookbookProps {
  onSetCursorMode: (mode: CursorMode) => void;
  lang: Language;
  t: TranslationData;
}

export const Lookbook: React.FC<LookbookProps> = ({ onSetCursorMode, lang, t }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxLook, setLightboxLook] = useState<Look | null>(null);

  const activeLook = LOOKBOOK_LOOKS[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? LOOKBOOK_LOOKS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === LOOKBOOK_LOOKS.length - 1 ? 0 : prev + 1));
  };

  const getVisualType = (id: string): 'look1' | 'look2' | 'look3' | 'look4' => {
    switch (id) {
      case 'look-01':
        return 'look1';
      case 'look-02':
        return 'look2';
      case 'look-03':
        return 'look3';
      case 'look-04':
        return 'look4';
      default:
        return 'look1';
    }
  };

  const getLookTitle = (l: Look) => (lang === 'fa' && l.titleFa ? l.titleFa : l.title);
  const getLookSubtitle = (l: Look) => (lang === 'fa' && l.subtitleFa ? l.subtitleFa : l.subtitle);
  const getLookLocation = (l: Look) => (lang === 'fa' && l.locationFa ? l.locationFa : l.location);
  const getLookConcept = (l: Look) => (lang === 'fa' && l.conceptFa ? l.conceptFa : l.concept);
  const getLookGarments = (l: Look) => (lang === 'fa' && l.garmentsFa ? l.garmentsFa : l.garments);

  return (
    <section
      id="lookbook"
      className="relative w-full py-32 px-6 md:px-14 bg-[#0A0A0A] border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-white/10 pb-8">
          <div>
            <div className="text-[11px] font-mono tracking-[0.25em] text-[#A3A3A3] uppercase mb-3">
              {t.lookbook.tag}
            </div>
            <h2 className="font-editorial-display text-4xl sm:text-6xl font-bold tracking-tight text-[#F1EFE9]">
              {t.lookbook.title}
            </h2>
          </div>

          <div className="flex items-center gap-6 mt-6 md:mt-0">
            <span className="text-xs font-mono tracking-widest text-[#A3A3A3] tabular-nums">
              0{activeIndex + 1} — 0{LOOKBOOK_LOOKS.length}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={lang === 'fa' ? handleNext : handlePrev}
                onMouseEnter={() => onSetCursorMode('hover')}
                onMouseLeave={() => onSetCursorMode('default')}
                aria-label="Previous Look"
                className="w-10 h-10 border border-white/15 flex items-center justify-center text-[#F1EFE9] hover:bg-white/10 transition-colors"
              >
                <ChevronLeft size={16} className={lang === 'fa' ? 'rotate-180' : ''} />
              </button>
              <button
                onClick={lang === 'fa' ? handlePrev : handleNext}
                onMouseEnter={() => onSetCursorMode('hover')}
                onMouseLeave={() => onSetCursorMode('default')}
                aria-label="Next Look"
                className="w-10 h-10 border border-white/15 flex items-center justify-center text-[#F1EFE9] hover:bg-white/10 transition-colors"
              >
                <ChevronRight size={16} className={lang === 'fa' ? 'rotate-180' : ''} />
              </button>
            </div>
          </div>
        </div>

        {/* Spread Viewport */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Main Visual Frame */}
          <div
            className="lg:col-span-8 relative aspect-[4/3] sm:aspect-[16/10] bg-[#141416] border border-white/10 overflow-hidden cursor-pointer group"
            onClick={() => setLightboxLook(activeLook)}
            onMouseEnter={() => onSetCursorMode('explore')}
            onMouseLeave={() => onSetCursorMode('default')}
          >
            <FashionVisual type={getVisualType(activeLook.id)} label={`CAMPAIGN // ${getLookTitle(activeLook)}`} />

            <div className={`absolute top-6 ${lang === 'fa' ? 'left-6' : 'right-6'} z-20 opacity-0 group-hover:opacity-100 transition-opacity`}>
              <span className="p-2 bg-black/60 backdrop-blur-md border border-white/20 text-[#F1EFE9] inline-flex items-center gap-1.5 text-[10px] font-mono tracking-widest">
                <Maximize2 size={12} />
                <span>{t.lookbook.expand}</span>
              </span>
            </div>

            {/* Corner Editorial Caption */}
            <div className={`absolute bottom-6 ${lang === 'fa' ? 'right-6' : 'left-6'} z-20 bg-black/70 backdrop-blur-md p-4 border border-white/10 max-w-sm`}>
              <span className="text-[10px] font-mono tracking-[0.2em] text-[#A3A3A3] uppercase block mb-1">
                {lang === 'fa' ? `لوک ${activeLook.lookNumber} · ${getLookLocation(activeLook)}` : `LOOK ${activeLook.lookNumber} · ${getLookLocation(activeLook)}`}
              </span>
              <h3 className="font-editorial-serif italic text-2xl text-[#F1EFE9]">
                {getLookSubtitle(activeLook)}
              </h3>
            </div>
          </div>

          {/* Dossier */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div className="text-[10px] font-mono tracking-[0.25em] text-[#737373] uppercase">
                {t.lookbook.specLabel}
              </div>

              <h4 className="font-editorial-display text-3xl font-medium text-[#F1EFE9]">
                {getLookTitle(activeLook)}
              </h4>

              <p className="font-editorial-serif text-lg text-[#F1EFE9] font-light leading-relaxed">
                “{getLookConcept(activeLook)}”
              </p>

              <div className="border-t border-white/10 pt-6">
                <span className="text-[11px] font-mono tracking-widest text-[#A3A3A3] uppercase block mb-3">
                  {t.lookbook.garmentsLabel}
                </span>
                <ul className="space-y-2">
                  {getLookGarments(activeLook).map((garment, idx) => (
                    <li
                      key={idx}
                      className="text-xs font-mono tracking-wider text-[#F1EFE9] flex items-center gap-2"
                    >
                      <span className="text-[#737373]">{lang === 'fa' ? '←' : '→'}</span>
                      <span>{garment}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Look Selector Strip */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-4 gap-2">
              {LOOKBOOK_LOOKS.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => setActiveIndex(index)}
                  onMouseEnter={() => onSetCursorMode('hover')}
                  onMouseLeave={() => onSetCursorMode('default')}
                  className={`py-2 text-[10px] font-mono tracking-widest uppercase border transition-all ${
                    activeIndex === index
                      ? 'border-[#F1EFE9] bg-[#F1EFE9] text-[#0A0A0A] font-bold'
                      : 'border-white/10 text-[#A3A3A3] hover:border-white/30'
                  }`}
                >
                  0{item.lookNumber}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox / Expanded Lookbook View */}
      {lightboxLook && (
        <div className="fixed inset-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-xl flex flex-col justify-between p-6 md:p-12 animate-in fade-in duration-300">
          <div className="flex justify-between items-center border-b border-white/10 pb-4">
            <span className="text-xs font-mono tracking-[0.25em] text-[#A3A3A3] uppercase">
              {lang === 'fa' ? `نمای تمام‌صفحه لوک‌بوک // لوک ${lightboxLook.lookNumber}` : `LOOKBOOK EXPANDED SPREAD // LOOK ${lightboxLook.lookNumber}`}
            </span>
            <button
              onClick={() => setLightboxLook(null)}
              className="text-[#F1EFE9] hover:opacity-75 p-2"
              aria-label="Close Lightbox"
            >
              <X size={24} />
            </button>
          </div>

          <div className="my-auto max-w-4xl mx-auto w-full aspect-[16/10] border border-white/15 overflow-hidden">
            <FashionVisual type={getVisualType(lightboxLook.id)} label={`CAMPAIGN FULL SPREAD // ${getLookTitle(lightboxLook)}`} />
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center text-xs font-mono tracking-widest text-[#A3A3A3] border-t border-white/10 pt-4">
            <span>{getLookLocation(lightboxLook)} ({lightboxLook.year})</span>
            <span className="text-[#F1EFE9]">{getLookSubtitle(lightboxLook)}</span>
          </div>
        </div>
      )}
    </section>
  );
};
