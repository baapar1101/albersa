import React, { useState } from 'react';
import { CursorMode } from './CustomCursor';
import { Check } from 'lucide-react';
import { Language, TranslationData } from '../data/translations';

interface NewsletterProps {
  onSetCursorMode: (mode: CursorMode) => void;
  lang: Language;
  t: TranslationData;
}

export const Newsletter: React.FC<NewsletterProps> = ({ onSetCursorMode, lang, t }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubmitted(true);
  };

  return (
    <section className="relative w-full py-32 px-6 md:px-14 bg-[#0A0A0A] border-b border-white/5">
      <div className="max-w-4xl mx-auto">
        <div className="text-[10px] font-mono tracking-[0.25em] text-[#A3A3A3] uppercase mb-4">
          {t.newsletter.tag}
        </div>

        <h2 className="font-editorial-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#F1EFE9] mb-4">
          {t.newsletter.title}
        </h2>

        <p className="font-editorial-serif text-lg md:text-xl text-[#A3A3A3] font-light max-w-xl mb-12">
          {t.newsletter.desc}
        </p>

        {submitted ? (
          <div className="border border-white/20 p-6 flex items-center gap-4 bg-white/5 animate-in fade-in duration-300">
            <Check size={20} className="text-emerald-400 shrink-0" />
            <div className="text-xs font-mono tracking-widest text-[#F1EFE9]">
              {t.newsletter.success}
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-stretch gap-0 max-w-xl border-b border-white/30 focus-within:border-[#F1EFE9] transition-colors pb-2"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.newsletter.placeholder}
              className="bg-transparent text-sm md:text-base font-mono tracking-wider text-[#F1EFE9] placeholder:text-[#52525b] focus:outline-none flex-1 py-3"
            />
            <button
              type="submit"
              onMouseEnter={() => onSetCursorMode('hover')}
              onMouseLeave={() => onSetCursorMode('default')}
              className="group flex items-center gap-3 text-xs font-mono tracking-[0.2em] text-[#F1EFE9] uppercase py-3 hover:text-white transition-colors"
            >
              <span>{t.newsletter.button}</span>
              <span className={`transition-transform duration-300 font-sans ${lang === 'fa' ? 'group-hover:-translate-x-1.5' : 'group-hover:translate-x-1.5'}`}>
                {lang === 'fa' ? '←' : '→'}
              </span>
            </button>
          </form>
        )}

        <div className="mt-6 text-[10px] font-mono text-[#52525b] tracking-wider leading-relaxed">
          {t.newsletter.legal}
        </div>
      </div>
    </section>
  );
};
