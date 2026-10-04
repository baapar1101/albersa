import React from 'react';
import { CursorMode } from './CustomCursor';
import { Language, TranslationData } from '../data/translations';

interface BrandStatementProps {
  onSetCursorMode: (mode: CursorMode) => void;
  lang: Language;
  t: TranslationData;
}

export const BrandStatement: React.FC<BrandStatementProps> = ({ lang, t }) => {
  return (
    <section
      id="brand-statement"
      className="relative w-full py-40 md:py-52 px-6 md:px-14 bg-[#F1EFE9] text-[#0A0A0A] overflow-hidden select-none transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center text-[10px] font-mono tracking-[0.25em] uppercase text-[#737373] border-b border-black/10 pb-6 mb-16">
          <span>{t.statement.sub1}</span>
          <span className="hidden sm:inline">{t.statement.sub2}</span>
          <span>{lang === 'fa' ? 'تأسیس ۲۰۲۶' : 'EST. 2026'}</span>
        </div>

        <div className="max-w-6xl">
          <h2 className="font-editorial-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tight leading-[0.9] text-[#0A0A0A] mb-12">
            {t.statement.headlinePart1}
            <br />
            {t.statement.headlinePart2}
            <br />
            <span className="font-editorial-serif italic font-normal text-[#404040]">
              {t.statement.headlinePart3}
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-t border-black/10 pt-10">
            <div className="md:col-span-4 text-xs font-mono tracking-widest text-[#737373] uppercase">
              {t.statement.sideLabel}
            </div>
            <div className="md:col-span-8">
              <p className="font-editorial-serif text-xl sm:text-2xl text-[#171717] font-light leading-relaxed max-w-2xl">
                {t.statement.body}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
