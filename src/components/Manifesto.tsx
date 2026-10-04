import React from 'react';
import { CursorMode } from './CustomCursor';
import { Language, TranslationData } from '../data/translations';

interface ManifestoProps {
  onSetCursorMode: (mode: CursorMode) => void;
  lang: Language;
  t: TranslationData;
}

export const Manifesto: React.FC<ManifestoProps> = ({ onSetCursorMode, lang, t }) => {
  return (
    <section
      id="manifesto"
      className="relative w-full py-32 md:py-44 px-8 md:px-14 bg-[#0A0A0A] border-t border-b border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Top Editorial Indexing Bar */}
        <div className="flex flex-wrap justify-between items-center text-[10px] font-mono tracking-[0.25em] text-[#A3A3A3] uppercase pb-8 mb-16 border-b border-white/10">
          <div className="flex items-center gap-4">
            <span className="text-[#F1EFE9]">{t.manifesto.title}</span>
            <span className="text-white/20">|</span>
            <span>{t.manifesto.tag}</span>
          </div>
          <div className="flex items-center gap-6">
            <span>{lang === 'fa' ? 'آتلیه پاریس' : 'PARIS ATELIER'}</span>
            <span>{lang === 'fa' ? 'تأسیس ۲۰۲۶' : 'EST. 2026'}</span>
          </div>
        </div>

        {/* Asymmetrical Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Column 1: Monolithic Headline */}
          <div className="lg:col-span-7">
            <span className="block text-xs font-mono tracking-[0.25em] text-[#A3A3A3] uppercase mb-6">
              {t.manifesto.principle}
            </span>
            <h2 className="font-editorial-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] text-[#F1EFE9]">
              {t.manifesto.headlinePart1}
              <br />
              {t.manifesto.headlinePart2}
              <br />
              <span className="font-editorial-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#F1EFE9] to-[#737373]">
                {t.manifesto.headlinePart3}
              </span>
            </h2>
          </div>

          {/* Column 2: Architectural Prose & Technical Annotations */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full pt-4 lg:pt-14 space-y-12">
            <div className={`space-y-6 ${lang === 'fa' ? 'border-r pr-8 border-white/20' : 'border-l pl-8 border-white/20'}`}>
              <p className="font-editorial-serif text-2xl md:text-3xl text-[#F1EFE9] font-light leading-relaxed">
                {t.manifesto.quote}
              </p>
              <p className="font-sans text-xs md:text-sm text-[#A3A3A3] leading-relaxed">
                {t.manifesto.body}
              </p>
            </div>

            {/* Technical Specifications Grid */}
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/10 text-[11px] font-mono tracking-wider">
              <div>
                <span className="block text-[#A3A3A3] mb-1">{t.manifesto.specs.construction.label}</span>
                <span className="text-[#F1EFE9]">{t.manifesto.specs.construction.val}</span>
              </div>
              <div>
                <span className="block text-[#A3A3A3] mb-1">{t.manifesto.specs.geometry.label}</span>
                <span className="text-[#F1EFE9]">{t.manifesto.specs.geometry.val}</span>
              </div>
              <div>
                <span className="block text-[#A3A3A3] mb-1">{t.manifesto.specs.production.label}</span>
                <span className="text-[#F1EFE9]">{t.manifesto.specs.production.val}</span>
              </div>
              <div>
                <span className="block text-[#A3A3A3] mb-1">{t.manifesto.specs.discipline.label}</span>
                <span className="text-[#F1EFE9]">{t.manifesto.specs.discipline.val}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
