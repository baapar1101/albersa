import React, { useState, useEffect, useRef } from 'react';
import { CursorMode } from './CustomCursor';
import { Language, TranslationData } from '../data/translations';
import { Maximize2, X, Upload, Sparkles, Check, ZoomIn } from 'lucide-react';

interface AtelierShowcaseProps {
  onSetCursorMode: (mode: CursorMode) => void;
  lang: Language;
  t: TranslationData;
}

interface PhotoCard {
  id: string;
  titleEn: string;
  titleFa: string;
  subtitleEn: string;
  subtitleFa: string;
  type: 'boucle-portrait' | 'boucle-gesture' | 'kilim-corset';
  specsEn: string[];
  specsFa: string[];
  aspectRatio: string;
}

const ARCHIVE_PHOTOS: PhotoCard[] = [
  {
    id: 'photo-1',
    titleEn: 'THE CREATIVE DIRECTOR / BOUCLÉ MONOLITH',
    titleFa: 'مدیر خلاقیت / ژاکت بوکله مونولیت',
    subtitleEn: 'ARCHITECTURAL TWEED WITH PEARL ENAMEL HARDWARE',
    subtitleFa: 'تویید معماری با دکمه‌های لعابی صدفی',
    type: 'boucle-portrait',
    specsEn: [
      'Heavy double-weave black & ivory bouclé tweed',
      'Oversized white enamel dome buttons with gold trim',
      'Stand-collar architectural black scarf cowl',
      'Precision optical horn-rimmed eyewear',
      'Paris / Tehran Atelier Edition 2026',
    ],
    specsFa: [
      'تویید بوکله دورو بافت مشکی و عاجی سنگین',
      'دکمه‌های محدب لعابی صدفی سفید با حاشیه طلایی',
      'شال‌گردن یقه ایستاده معماری مشکی',
      'عینک هورن‌ریمد مینیمال با قاب مشکی',
      'نسخه آتلیه پاریس / تهران ۲۰۲۶',
    ],
    aspectRatio: 'aspect-[3/4]',
  },
  {
    id: 'photo-2',
    titleEn: 'ATELIER GESTURE / CUFF & BUTTON ANATOMY',
    titleFa: 'ژست آتلیه / آناتومی مچ و دکمه‌دوزی',
    subtitleEn: 'TACTILE FABRICATION & JEWELED FINISHES',
    subtitleFa: 'دوخت لمسی و پرداخت‌های جواهرگون',
    type: 'boucle-gesture',
    specsEn: [
      'Four-button sequential surgical cuff construction',
      'Layered silver signet rings & minimalist steel watch',
      'Hand-frayed welt pocket edges and hem fringe',
      'Relaxed high-fashion editorial posture',
    ],
    specsFa: [
      'چیدمان چهار دکمه‌ای متوالی جراحی در لبه مچ',
      'انگشترهای نگین‌دار نقره چندلایه و ساعت استیل مینیمال',
      'لبه‌های دست‌ریش جیب فیلتابی و حاشیه پایینی',
      'ژست مغرورانه و بیانگر مد رده‌بالا',
    ],
    aspectRatio: 'aspect-[3/4]',
  },
  {
    id: 'photo-3',
    titleEn: 'NOMADIC KILIM CORSET / HERITAGE COUTURE',
    titleFa: 'کُرست قالیچه عشایری / کوتور اصیل ایرانی',
    subtitleEn: 'SCARLET & OBSIDIAN TAPESTRY UNDER TAILORED BLAZER',
    subtitleFa: 'تاپستری دست‌بافت سرخ و آبسیدین زیر کت بلیزر',
    type: 'kilim-corset',
    specsEn: [
      'Handwoven crimson & scarlet Persian kilim geometric motifs',
      'Internal galvanized steel boning for sculptural silhouette',
      'Delicate spaghetti cord suspension straps',
      'Paired with masculine oversized obsidian tailored blazer',
      'High-contrast dialogue: nomadic craftsmanship × brutalist tailoring',
    ],
    specsFa: [
      'طرح‌های هندسی گلیم دست‌بافت سرخ و روناسی ایرانی',
      'فنرکشی داخلی فولادی گالوانیزه برای حفظ فرم تندیس‌گون',
      'بندهای اسپاگتی ظریف با دوخت مخفی',
      'همراه با کت اورسایز مشکی آبسیدین با خطوط مردانه',
      'دیالوگ تضاد: صنایع دستی کهن عشایری × خیاطی بروتالیست مدرن',
    ],
    aspectRatio: 'aspect-[3/4]',
  },
];

export const AtelierShowcase: React.FC<AtelierShowcaseProps> = ({
  onSetCursorMode,
  lang,
}) => {
  const [userImages, setUserImages] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('albersa_custom_photos');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [activeLightbox, setActiveLightbox] = useState<PhotoCard | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedPhotoIdForUpload, setSelectedPhotoIdForUpload] = useState<string | null>(null);

  // Save uploaded images in localStorage
  useEffect(() => {
    try {
      localStorage.setItem('albersa_custom_photos', JSON.stringify(userImages));
    } catch {
      // Storage exceeded or unavailable
    }
  }, [userImages]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selectedPhotoIdForUpload) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setUserImages((prev) => ({
          ...prev,
          [selectedPhotoIdForUpload]: dataUrl,
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  const triggerUpload = (photoId: string) => {
    setSelectedPhotoIdForUpload(photoId);
    fileInputRef.current?.click();
  };

  // Render SVG Artwork Twin when user image is not yet loaded
  const renderVisualTwin = (type: PhotoCard['type']) => {
    if (type === 'boucle-portrait') {
      return (
        <svg viewBox="0 0 600 800" className="w-full h-full object-cover">
          <defs>
            <filter id="grainFilter">
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.1   0 0 0 0 0.1   0 0 0 0 0.1  0 0 0 0.25 0" />
              <feBlend in="SourceGraphic" in2="noise" mode="overlay" />
            </filter>
            <pattern id="tweedWeave" width="16" height="16" patternUnits="userSpaceOnUse">
              <rect width="16" height="16" fill="#141416" />
              <path d="M0 0 L16 16 M16 0 L0 16" stroke="#ffffff" strokeWidth="1.2" opacity="0.45" />
              <rect x="4" y="4" width="4" height="4" fill="#d4d4d8" opacity="0.6" />
              <rect x="12" y="12" width="4" height="4" fill="#a1a1aa" opacity="0.4" />
            </pattern>
            <radialGradient id="studioPortraitGlow" cx="50%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#2c2c30" />
              <stop offset="60%" stopColor="#141416" />
              <stop offset="100%" stopColor="#08080a" />
            </radialGradient>
          </defs>

          {/* Background Street/Studio Atmospheric Silhouette */}
          <rect width="600" height="800" fill="url(#studioPortraitGlow)" />
          <path d="M 0 350 Q 300 320 600 350 L 600 800 L 0 800 Z" fill="#0c0c0e" opacity="0.8" />

          {/* Head & Hair Silhouette */}
          <ellipse cx="300" cy="270" rx="110" ry="145" fill="#16161a" />
          {/* Balayage Highlight Strands */}
          <path d="M 230 180 Q 210 260 250 330 Q 270 240 250 180 Z" fill="#9ca3af" opacity="0.5" />
          <path d="M 330 180 Q 380 260 340 330 Q 340 240 320 180 Z" fill="#4b5563" opacity="0.5" />

          {/* Face Contour */}
          <ellipse cx="300" cy="285" rx="72" ry="92" fill="#2a2a2e" />
          {/* Eyeglasses Frame */}
          <rect x="238" y="240" width="52" height="38" rx="8" fill="none" stroke="#000000" strokeWidth="6" />
          <rect x="310" y="240" width="52" height="38" rx="8" fill="none" stroke="#000000" strokeWidth="6" />
          <line x1="290" y1="255" x2="310" y2="255" stroke="#000000" strokeWidth="5" />

          {/* Black Scarf Cowl Neck */}
          <path d="M 200 350 Q 300 410 400 350 L 420 440 Q 300 470 180 440 Z" fill="#08080a" stroke="#1f1f23" strokeWidth="2" />

          {/* Architectural Tweed Jacket Torso */}
          <path d="M 150 420 L 450 420 L 520 800 L 80 800 Z" fill="url(#tweedWeave)" stroke="#3f3f46" strokeWidth="1" />
          {/* Lapels / Front Closure Line */}
          <line x1="300" y1="420" x2="300" y2="800" stroke="#000000" strokeWidth="6" />

          {/* White Enamel Dome Pearl Buttons */}
          {[460, 530, 600, 670, 740].map((y, idx) => (
            <g key={idx}>
              <circle cx="282" cy={y} r="10" fill="#f8fafc" stroke="#d1d5db" strokeWidth="2" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.5))" />
              <circle cx="282" cy={y} r="6" fill="#e2e8f0" />
            </g>
          ))}

          {/* Chest Pockets with Fringe */}
          <rect x="160" y="500" width="100" height="80" rx="3" fill="#18181b" stroke="#71717a" strokeWidth="1" />
          <line x1="160" y1="500" x2="260" y2="500" stroke="#f1efe9" strokeWidth="2" strokeDasharray="2 3" />
          <circle cx="210" cy="520" r="7" fill="#f8fafc" />

          <rect x="340" y="500" width="100" height="80" rx="3" fill="#18181b" stroke="#71717a" strokeWidth="1" />
          <line x1="340" y1="500" x2="440" y2="500" stroke="#f1efe9" strokeWidth="2" strokeDasharray="2 3" />
          <circle cx="390" cy="520" r="7" fill="#f8fafc" />

          {/* High-Contrast Vignette */}
          <rect width="600" height="800" fill="none" stroke="#ffffff10" strokeWidth="1" />
        </svg>
      );
    }

    if (type === 'boucle-gesture') {
      return (
        <svg viewBox="0 0 600 800" className="w-full h-full object-cover">
          <defs>
            <radialGradient id="gestureGlow" cx="50%" cy="40%" r="65%">
              <stop offset="0%" stopColor="#25252a" />
              <stop offset="55%" stopColor="#121214" />
              <stop offset="100%" stopColor="#08080a" />
            </radialGradient>
            <pattern id="tweedWeave2" width="14" height="14" patternUnits="userSpaceOnUse">
              <rect width="14" height="14" fill="#18181b" />
              <path d="M0 0 L14 14 M14 0 L0 14" stroke="#ffffff" strokeWidth="1" opacity="0.4" />
              <rect x="3" y="3" width="3" height="3" fill="#d4d4d8" opacity="0.5" />
            </pattern>
          </defs>

          <rect width="600" height="800" fill="url(#gestureGlow)" />

          {/* Silhouette with Arms Raised to Hair */}
          <path d="M 120 700 L 160 380 L 220 220 L 290 120 L 320 180 L 240 360 L 220 700 Z" fill="url(#tweedWeave2)" stroke="#3f3f46" strokeWidth="1" />
          <path d="M 480 700 L 440 380 L 380 220 L 310 120 L 280 180 L 360 360 L 380 700 Z" fill="url(#tweedWeave2)" stroke="#3f3f46" strokeWidth="1" />

          {/* Sequential Cuff Buttons */}
          {[220, 245, 270, 295].map((y, i) => (
            <circle key={i} cx="175" cy={y} r="6" fill="#f8fafc" stroke="#a1a1aa" strokeWidth="1.5" />
          ))}
          {[220, 245, 270, 295].map((y, i) => (
            <circle key={i} cx="425" cy={y} r="6" fill="#f8fafc" stroke="#a1a1aa" strokeWidth="1.5" />
          ))}

          {/* Head & Hair Contour */}
          <ellipse cx="300" cy="270" rx="68" ry="88" fill="#242428" />
          {/* Eyeglasses Frame */}
          <rect x="245" y="240" width="46" height="32" rx="6" fill="none" stroke="#000000" strokeWidth="5" />
          <rect x="309" y="240" width="46" height="32" rx="6" fill="none" stroke="#000000" strokeWidth="5" />
          <line x1="291" y1="252" x2="309" y2="252" stroke="#000000" strokeWidth="4" />

          {/* Hand Details & Watch */}
          <circle cx="435" cy="320" r="14" fill="#e2e8f0" stroke="#000000" strokeWidth="2" />
          <line x1="435" y1="312" x2="435" y2="320" stroke="#000000" strokeWidth="1.5" />
          <line x1="435" y1="320" x2="442" y2="320" stroke="#000000" strokeWidth="1.5" />
        </svg>
      );
    }

    // Persian Kilim Corset Look
    return (
      <svg viewBox="0 0 600 800" className="w-full h-full object-cover">
        <defs>
          <radialGradient id="corsetStudioGlow" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#f8f8fa" />
            <stop offset="60%" stopColor="#eaeaea" />
            <stop offset="100%" stopColor="#c5c5c9" />
          </radialGradient>
          {/* Intricate Persian Kilim Pattern Def */}
          <pattern id="kilimPattern" width="48" height="48" patternUnits="userSpaceOnUse">
            <rect width="48" height="48" fill="#a11d21" />
            {/* Geometric Diamond */}
            <polygon points="24,4 44,24 24,44 4,24" fill="#e63946" stroke="#1d1d20" strokeWidth="1.5" />
            <polygon points="24,12 36,24 24,36 12,24" fill="#0d0d0f" stroke="#ffffff" strokeWidth="1" />
            {/* Central Rosette */}
            <rect x="21" y="21" width="6" height="6" fill="#f8fafc" />
            {/* Corner geometric stepped triangles */}
            <polygon points="0,0 10,0 0,10" fill="#141416" />
            <polygon points="48,0 38,0 48,10" fill="#141416" />
            <polygon points="0,48 10,48 0,38" fill="#141416" />
            <polygon points="48,48 38,48 48,38" fill="#141416" />
          </pattern>
        </defs>

        {/* Clean Studio Editorial White Backdrop */}
        <rect width="600" height="800" fill="url(#corsetStudioGlow)" />

        {/* Oversized Black Tailored Blazer Dropped on Shoulders */}
        <path d="M 60 180 L 220 160 L 230 780 L 40 780 Z" fill="#0f0f12" stroke="#27272a" strokeWidth="1" />
        <path d="M 540 180 L 380 160 L 370 780 L 560 780 Z" fill="#0f0f12" stroke="#27272a" strokeWidth="1" />

        {/* Neck & Shoulder Silhouette */}
        <path d="M 230 160 Q 300 210 370 160 L 370 280 L 230 280 Z" fill="#d4a373" opacity="0.85" />

        {/* The Persian Kilim Corset Top */}
        <path
          d="M 210 240 Q 255 220 300 240 Q 345 220 390 240 L 380 520 Q 300 550 220 520 Z"
          fill="url(#kilimPattern)"
          stroke="#18181b"
          strokeWidth="2.5"
          filter="drop-shadow(0 8px 16px rgba(0,0,0,0.3))"
        />

        {/* Internal Steel Boning Lines */}
        <line x1="250" y1="230" x2="250" y2="525" stroke="#ffffff" strokeWidth="1" opacity="0.6" strokeDasharray="4 2" />
        <line x1="300" y1="240" x2="300" y2="535" stroke="#ffffff" strokeWidth="1.2" opacity="0.8" />
        <line x1="350" y1="230" x2="350" y2="525" stroke="#ffffff" strokeWidth="1" opacity="0.6" strokeDasharray="4 2" />

        {/* Spaghetti Cord Straps */}
        <line x1="245" y1="160" x2="245" y2="230" stroke="#000000" strokeWidth="2.5" />
        <line x1="355" y1="160" x2="355" y2="230" stroke="#000000" strokeWidth="2.5" />

        {/* Tan Leather Watch & Red Nails Accent */}
        <g transform="translate(220, 560)">
          <rect x="-15" y="-6" width="30" height="12" rx="3" fill="#a06030" stroke="#ffffff" strokeWidth="1" />
          <circle cx="0" cy="0" r="10" fill="#f8fafc" stroke="#262626" strokeWidth="2" />
          {/* Manicured Red Nail */}
          <ellipse cx="-45" cy="20" rx="7" ry="12" fill="#dc2626" />
        </g>

        {/* Tailored Black Trousers */}
        <path d="M 210 520 L 390 520 L 410 800 L 190 800 Z" fill="#0d0d10" />
      </svg>
    );
  };

  return (
    <section
      id="atelier-showcase"
      className="relative w-full py-32 px-6 md:px-14 bg-[#0A0A0A] border-t border-b border-white/5"
    >
      {/* Hidden File Input for Image Upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        className="hidden"
      />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-white/10 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] font-mono tracking-[0.25em] text-[#A3A3A3] uppercase mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{lang === 'fa' ? 'آرشیو زنده آتلیه و طراح' : 'ATELIER & CREATIVE ARCHIVE'}</span>
            </div>
            <h2 className="font-editorial-display text-4xl sm:text-6xl font-bold tracking-tight text-[#F1EFE9]">
              {lang === 'fa' ? 'روایت اصالت و کالبد پوشاک' : 'ORIGIN & SCULPTED FORM'}
            </h2>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-4 text-xs font-mono tracking-widest text-[#A3A3A3]">
            <span>PARIS FW 026</span>
            <span className="text-white/20">/</span>
            <span className="text-[#F1EFE9]">TEHRAN HERITAGE</span>
          </div>
        </div>

        {/* 3-Column Editorial Photography Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {ARCHIVE_PHOTOS.map((photo) => {
            const hasCustomImage = !!userImages[photo.id];
            const title = lang === 'fa' ? photo.titleFa : photo.titleEn;
            const subtitle = lang === 'fa' ? photo.subtitleFa : photo.subtitleEn;
            const specs = lang === 'fa' ? photo.specsFa : photo.specsEn;

            return (
              <div
                key={photo.id}
                className="group relative flex flex-col bg-[#111114] border border-white/10 overflow-hidden transition-all duration-500 hover:border-white/30"
              >
                {/* Visual Viewport Frame */}
                <div
                  className={`relative w-full ${photo.aspectRatio} bg-[#0c0c0e] overflow-hidden cursor-pointer`}
                  onClick={() => setActiveLightbox(photo)}
                  onMouseEnter={() => onSetCursorMode('explore')}
                  onMouseLeave={() => onSetCursorMode('default')}
                >
                  {hasCustomImage ? (
                    <img
                      src={userImages[photo.id]}
                      alt={title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-105">
                      {renderVisualTwin(photo.type)}
                    </div>
                  )}

                  {/* Corner Badge */}
                  <div className="absolute top-4 left-4 z-10 px-2.5 py-1 bg-black/70 backdrop-blur-md border border-white/10 text-[9px] font-mono tracking-widest text-[#F1EFE9] uppercase">
                    {photo.id.toUpperCase()}
                  </div>

                  {/* Hover Inspect Icon */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                    <div className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center text-white">
                      <ZoomIn size={20} />
                    </div>
                  </div>
                </div>

                {/* Editorial Metadata Card Body */}
                <div className="p-6 flex flex-col justify-between flex-1 border-t border-white/10">
                  <div>
                    <div className="text-[10px] font-mono tracking-widest text-emerald-400 mb-2 uppercase">
                      {subtitle}
                    </div>
                    <h3 className="font-editorial-display text-lg font-bold text-[#F1EFE9] tracking-tight mb-4">
                      {title}
                    </h3>

                    <ul className="space-y-2 mb-6">
                      {specs.slice(0, 3).map((spec, sIdx) => (
                        <li key={sIdx} className="flex items-start gap-2 text-xs font-sans text-[#A3A3A3] leading-relaxed">
                          <span className="text-white/40 font-mono text-[10px] mt-0.5">•</span>
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Controls */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <button
                      onClick={() => setActiveLightbox(photo)}
                      className="text-xs font-mono tracking-widest text-[#F1EFE9] hover:text-white flex items-center gap-2"
                    >
                      <Maximize2 size={13} />
                      <span>{lang === 'fa' ? 'بزرگ‌نمایی عکس' : 'EXPAND'}</span>
                    </button>

                    <button
                      onClick={() => triggerUpload(photo.id)}
                      title={lang === 'fa' ? 'جایگزینی با فایل باکیفیت شما' : 'Replace with your high-res file'}
                      className="px-3 py-1.5 bg-white/5 hover:bg-white/15 border border-white/15 text-[10px] font-mono tracking-widest text-[#A3A3A3] hover:text-white transition-colors flex items-center gap-1.5"
                    >
                      <Upload size={12} />
                      <span>{hasCustomImage ? (lang === 'fa' ? 'تغییر عکس' : 'REPLACE') : (lang === 'fa' ? 'بارگذاری فایل' : 'UPLOAD')}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* High-Resolution Editorial Lightbox Modal */}
      {activeLightbox && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10 animate-fade-in">
          <button
            onClick={() => setActiveLightbox(null)}
            className="absolute top-6 right-6 md:top-10 md:right-10 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors z-20"
            aria-label="Close"
          >
            <X size={20} />
          </button>

          <div className="max-w-5xl w-full max-h-[90vh] grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-[#0d0d10] border border-white/15 p-6 md:p-10 overflow-y-auto">
            {/* Image Canvas Frame */}
            <div className="md:col-span-7 relative aspect-[3/4] bg-[#000000] border border-white/10 overflow-hidden flex items-center justify-center">
              {userImages[activeLightbox.id] ? (
                <img
                  src={userImages[activeLightbox.id]}
                  alt={lang === 'fa' ? activeLightbox.titleFa : activeLightbox.titleEn}
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full">
                  {renderVisualTwin(activeLightbox.type)}
                </div>
              )}
            </div>

            {/* Editorial Essay & Details */}
            <div className="md:col-span-5 flex flex-col justify-between h-full space-y-6">
              <div>
                <div className="text-[11px] font-mono tracking-[0.25em] text-emerald-400 uppercase mb-2">
                  {lang === 'fa' ? activeLightbox.subtitleFa : activeLightbox.subtitleEn}
                </div>
                <h3 className="font-editorial-display text-2xl md:text-3xl font-bold text-[#F1EFE9] mb-4">
                  {lang === 'fa' ? activeLightbox.titleFa : activeLightbox.titleEn}
                </h3>
                <div className="w-12 h-[1px] bg-white/20 mb-6" />

                <div className="space-y-4">
                  <h4 className="text-[11px] font-mono tracking-widest text-[#A3A3A3] uppercase">
                    {lang === 'fa' ? 'مشخصات فنی و دست‌ساز' : 'MATERIAL & CONSTRUCTION NOTES'}
                  </h4>
                  <ul className="space-y-3">
                    {(lang === 'fa' ? activeLightbox.specsFa : activeLightbox.specsEn).map((spec, i) => (
                      <li key={i} className="flex items-start gap-3 text-xs md:text-sm text-[#F1EFE9] leading-relaxed">
                        <span className="text-emerald-400 font-mono">0{i + 1}</span>
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={() => triggerUpload(activeLightbox.id)}
                  className="px-4 py-2 bg-[#F1EFE9] text-[#0A0A0A] text-xs font-mono tracking-widest uppercase hover:bg-white transition-colors flex items-center gap-2"
                >
                  <Upload size={14} />
                  <span>{lang === 'fa' ? 'بارگذاری تصویر باکیفیت شخصی' : 'UPLOAD ORIGINAL PHOTO'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
