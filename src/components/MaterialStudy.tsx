import React, { useState, useEffect, useRef } from 'react';
import { MATERIAL_STUDIES } from '../data/fashionData';
import { MaterialItem } from '../types';
import { CursorMode } from './CustomCursor';
import { Search } from 'lucide-react';
import { Language, TranslationData } from '../data/translations';

interface MaterialStudyProps {
  onSetCursorMode: (mode: CursorMode) => void;
  lang: Language;
  t: TranslationData;
}

export const MaterialStudy: React.FC<MaterialStudyProps> = ({
  onSetCursorMode,
  lang,
  t,
}) => {
  const [selectedMat, setSelectedMat] = useState<MaterialItem>(MATERIAL_STUDIES[0]);
  const [zoomLevel, setZoomLevel] = useState<'1X' | '5X' | '20X'>('5X');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getMatName = (m: MaterialItem) => (lang === 'fa' && m.nameFa ? m.nameFa : m.name);
  const getMatOrigin = (m: MaterialItem) => (lang === 'fa' && m.originFa ? m.originFa : m.origin);
  const getMatDesc = (m: MaterialItem) => (lang === 'fa' && m.descriptionFa ? m.descriptionFa : m.description);
  const getMatComp = (m: MaterialItem) => (lang === 'fa' && m.compositionFa ? m.compositionFa : m.composition);
  const getMatProps = (m: MaterialItem) => (lang === 'fa' && m.propertiesFa ? m.propertiesFa : m.properties);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const render = () => {
      time += 0.02;
      const w = canvas.width;
      const h = canvas.height;

      ctx.fillStyle = '#0e0e11';
      ctx.fillRect(0, 0, w, h);

      const spacing = zoomLevel === '1X' ? 8 : zoomLevel === '5X' ? 24 : 52;
      const threadWidth = zoomLevel === '1X' ? 3 : zoomLevel === '5X' ? 10 : 26;

      ctx.save();
      for (let x = 0; x < w; x += spacing) {
        for (let y = 0; y < h; y += spacing) {
          const isEven = ((x / spacing) + (y / spacing)) % 2 === 0;

          let threadColor = '#27272a';
          let highlightColor = '#52525b';

          if (selectedMat.id === 'mat-001') {
            threadColor = isEven ? '#18181b' : '#27272a';
            highlightColor = '#3f3f46';
          } else if (selectedMat.id === 'mat-002') {
            const shimmer = Math.sin(time + x * 0.05 + y * 0.05) * 40;
            threadColor = `rgb(${70 + shimmer}, ${75 + shimmer}, ${85 + shimmer})`;
            highlightColor = '#e5e7eb';
          } else if (selectedMat.id === 'mat-003') {
            threadColor = isEven ? '#3f3f46' : '#52525b';
            highlightColor = '#a1a1aa';
          } else if (selectedMat.id === 'mat-004') {
            threadColor = isEven ? 'rgba(241, 239, 233, 0.25)' : 'rgba(241, 239, 233, 0.12)';
            highlightColor = 'rgba(255, 255, 255, 0.4)';
          }

          ctx.fillStyle = threadColor;
          if (isEven) {
            ctx.fillRect(x, y, spacing, threadWidth);
            ctx.fillStyle = highlightColor;
            ctx.fillRect(x, y + 2, spacing, 1.5);
          } else {
            ctx.fillRect(x, y, threadWidth, spacing);
            ctx.fillStyle = highlightColor;
            ctx.fillRect(x + 2, y, 1.5, spacing);
          }
        }
      }

      ctx.strokeStyle = 'rgba(241, 239, 233, 0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, 70, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(w / 2 - 85, h / 2);
      ctx.lineTo(w / 2 + 85, h / 2);
      ctx.moveTo(w / 2, h / 2 - 85);
      ctx.lineTo(w / 2, h / 2 + 85);
      ctx.stroke();

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [selectedMat, zoomLevel]);

  return (
    <section
      id="materials"
      className="relative w-full py-32 px-6 md:px-14 bg-[#0A0A0A] border-b border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-20 border-b border-white/10 pb-8">
          <div>
            <div className="text-[11px] font-mono tracking-[0.25em] text-[#A3A3A3] uppercase mb-3">
              {t.materials.tag}
            </div>
            <h2 className="font-editorial-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#F1EFE9] leading-[0.95]">
              {t.materials.titleLine1}
              <br />
              {t.materials.titleLine2}
              <br />
              <span className="font-editorial-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#F1EFE9] to-[#71717a]">
                {t.materials.titleLine3}
              </span>
            </h2>
          </div>

          <div className={`max-w-md mt-6 lg:mt-0 ${lang === 'fa' ? 'text-right' : 'text-left lg:text-right'}`}>
            <p className="font-sans text-xs md:text-sm text-[#A3A3A3] leading-relaxed">
              {t.materials.desc}
            </p>
          </div>
        </div>

        {/* Interactive Material Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Material Selector List */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#737373] uppercase mb-2">
              {t.materials.indexTitle}
            </span>

            <div className="space-y-3">
              {MATERIAL_STUDIES.map((mat) => (
                <div
                  key={mat.id}
                  onClick={() => setSelectedMat(mat)}
                  onMouseEnter={() => onSetCursorMode('hover')}
                  onMouseLeave={() => onSetCursorMode('default')}
                  className={`p-5 border cursor-pointer transition-all duration-300 ${
                    selectedMat.id === mat.id
                      ? 'border-[#F1EFE9] bg-white/5'
                      : 'border-white/10 hover:border-white/25 bg-transparent'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-[#A3A3A3] mb-2 uppercase">
                    <span>{mat.code}</span>
                    <span className="text-[#F1EFE9]">{mat.weight}</span>
                  </div>
                  <h3 className="font-editorial-display text-lg text-[#F1EFE9] mb-1">
                    {getMatName(mat)}
                  </h3>
                  <span className="text-xs font-serif italic text-[#A3A3A3]">
                    {getMatOrigin(mat)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Microscopic Weave Simulation & Analysis */}
          <div className="lg:col-span-7 border border-white/10 bg-[#121214] p-6 md:p-8 flex flex-col justify-between">
            <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <Search size={14} className="text-[#A3A3A3]" />
                <span className="text-xs font-mono tracking-widest text-[#F1EFE9] uppercase">
                  {t.materials.analysisTitle} {selectedMat.code}
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-[10px] font-mono tracking-widest">
                <span className="text-[#737373] mr-2">{t.materials.magnify}</span>
                {(['1X', '5X', '20X'] as const).map((mag) => (
                  <button
                    key={mag}
                    onClick={() => setZoomLevel(mag)}
                    className={`px-2 py-1 border transition-colors ${
                      zoomLevel === mag
                        ? 'bg-[#F1EFE9] text-[#0A0A0A] font-bold border-white'
                        : 'border-white/15 text-[#A3A3A3] hover:text-white'
                    }`}
                  >
                    {mag}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative aspect-[16/10] w-full border border-white/10 bg-[#0e0e11] overflow-hidden mb-6">
              <canvas
                ref={canvasRef}
                width={560}
                height={350}
                className="w-full h-full object-cover"
              />

              <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 border border-white/10 text-[9px] font-mono tracking-widest text-[#F1EFE9]">
                POLARIZED SCAN // {zoomLevel}
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-xs font-mono text-[#A3A3A3] leading-relaxed">
                {getMatDesc(selectedMat)}
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#737373] block uppercase mb-1">
                    {t.materials.compLabel}
                  </span>
                  <span className="text-xs font-mono text-[#F1EFE9]">
                    {getMatComp(selectedMat)}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#737373] block uppercase mb-1">
                    {t.materials.originLabel}
                  </span>
                  <span className="text-xs font-mono text-[#F1EFE9]">
                    {getMatOrigin(selectedMat)}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {getMatProps(selectedMat).map((prop, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-mono tracking-wider text-[#A3A3A3] border border-white/10 px-2.5 py-1"
                  >
                    {prop}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
