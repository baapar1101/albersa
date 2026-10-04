import React from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../data/fashionData';
import { FashionVisual } from './FashionVisual';
import { CursorMode } from './CustomCursor';
import { Language, TranslationData } from '../data/translations';

interface CollectionProps {
  onSelectProduct: (product: Product) => void;
  onSetCursorMode: (mode: CursorMode) => void;
  onQuickAdd: (product: Product, size: string) => void;
  lang: Language;
  t: TranslationData;
}

export const Collection: React.FC<CollectionProps> = ({
  onSelectProduct,
  onSetCursorMode,
  lang,
  t,
}) => {
  const getVisualType = (id: string): 'coat' | 'trouser' | 'shirt' | 'jacket' | 'knit' | 'bag' => {
    switch (id) {
      case 'structural-coat':
        return 'coat';
      case 'void-trouser':
        return 'trouser';
      case 'sculpted-shirt':
        return 'shirt';
      case 'monolith-jacket':
        return 'jacket';
      case 'frame-knit':
        return 'knit';
      case 'column-bag':
        return 'bag';
      default:
        return 'coat';
    }
  };

  const getProductName = (p: Product) => (lang === 'fa' && p.nameFa ? p.nameFa : p.name);
  const getProductCategory = (p: Product) => (lang === 'fa' && p.categoryFa ? p.categoryFa : p.category);
  const getProductMaterial = (p: Product) => {
    const raw = lang === 'fa' && p.materialFa ? p.materialFa : p.material;
    return raw.split('/')[0];
  };

  return (
    <section
      id="collection"
      className="relative w-full py-32 px-6 md:px-14 bg-[#0A0A0A] border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 border-b border-white/10 pb-8">
          <div>
            <div className="inline-flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.25em] text-[#A3A3A3] mb-3">
              <span>{t.collection.tag}</span>
              <span className="text-white/20">|</span>
              <span>{lang === 'fa' ? 'هفته مد پاریس' : 'PARIS FASHION WEEK'}</span>
            </div>
            <h2 className="font-editorial-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#F1EFE9]">
              {t.collection.title}
            </h2>
          </div>
          <div className={`mt-6 md:mt-0 ${lang === 'fa' ? 'text-left md:text-right' : 'text-right'}`}>
            <span className="font-editorial-serif italic text-lg md:text-xl text-[#A3A3A3] block">
              {t.collection.subtitle}
            </span>
            <span className="text-[11px] font-mono tracking-widest text-[#737373] uppercase">
              {t.collection.piecesCount}
            </span>
          </div>
        </div>

        {/* Asymmetrical High-Fashion Grid */}
        <div className="space-y-32">
          {/* Row 1: Structural Coat + Void Trouser */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* 01 / STRUCTURAL COAT */}
            <div
              className="lg:col-span-7 group cursor-pointer"
              onClick={() => onSelectProduct(PRODUCTS[0])}
              onMouseEnter={() => onSetCursorMode('view')}
              onMouseLeave={() => onSetCursorMode('default')}
            >
              <div className="relative aspect-[3/4] sm:aspect-[4/5] w-full overflow-hidden border border-white/10 bg-[#141416] transition-all duration-700">
                <FashionVisual type={getVisualType(PRODUCTS[0].id)} label={`SILHOUETTE 01 // ${PRODUCTS[0].category}`} />
                
                <div className={`absolute top-6 ${lang === 'fa' ? 'left-6' : 'right-6'} z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                  <span className="px-3 py-1.5 bg-[#F1EFE9] text-[#0A0A0A] text-[10px] font-mono tracking-widest uppercase">
                    {t.collection.explorePiece}
                  </span>
                </div>

                <div className={`absolute bottom-6 ${lang === 'fa' ? 'right-6' : 'left-6'} z-20`}>
                  <span className="text-xs font-mono tracking-[0.2em] text-[#A3A3A3] block mb-1">
                    {PRODUCTS[0].number} / {getProductCategory(PRODUCTS[0])}
                  </span>
                  <h3 className="font-editorial-display text-2xl md:text-3xl font-medium text-[#F1EFE9]">
                    {getProductName(PRODUCTS[0])}
                  </h3>
                </div>
              </div>

              <div className="mt-4 flex justify-between items-baseline text-xs font-mono tracking-widest border-t border-white/10 pt-3">
                <span className="text-[#A3A3A3]">{getProductMaterial(PRODUCTS[0])}</span>
                <span className="text-[#F1EFE9] tabular-nums font-semibold">
                  {PRODUCTS[0].currency}{PRODUCTS[0].price}
                </span>
              </div>
            </div>

            {/* 02 / VOID TROUSER */}
            <div
              className="lg:col-span-5 group cursor-pointer lg:mt-24"
              onClick={() => onSelectProduct(PRODUCTS[1])}
              onMouseEnter={() => onSetCursorMode('view')}
              onMouseLeave={() => onSetCursorMode('default')}
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden border border-white/10 bg-[#141416] transition-all duration-700">
                <FashionVisual type={getVisualType(PRODUCTS[1].id)} label={`SILHOUETTE 02 // ${PRODUCTS[1].category}`} />
                
                <div className={`absolute top-6 ${lang === 'fa' ? 'left-6' : 'right-6'} z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                  <span className="px-3 py-1.5 bg-[#F1EFE9] text-[#0A0A0A] text-[10px] font-mono tracking-widest uppercase">
                    {t.collection.explorePiece}
                  </span>
                </div>

                <div className={`absolute bottom-6 ${lang === 'fa' ? 'right-6' : 'left-6'} z-20`}>
                  <span className="text-xs font-mono tracking-[0.2em] text-[#A3A3A3] block mb-1">
                    {PRODUCTS[1].number} / {getProductCategory(PRODUCTS[1])}
                  </span>
                  <h3 className="font-editorial-display text-2xl font-medium text-[#F1EFE9]">
                    {getProductName(PRODUCTS[1])}
                  </h3>
                </div>
              </div>

              <div className="mt-4 flex justify-between items-baseline text-xs font-mono tracking-widest border-t border-white/10 pt-3">
                <span className="text-[#A3A3A3]">{getProductMaterial(PRODUCTS[1])}</span>
                <span className="text-[#F1EFE9] tabular-nums font-semibold">
                  {PRODUCTS[1].currency}{PRODUCTS[1].price}
                </span>
              </div>
            </div>
          </div>

          {/* Row 2: Sculpted Shirt + Monolith Jacket */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* 03 / SCULPTED SHIRT */}
            <div
              className="lg:col-span-5 group cursor-pointer"
              onClick={() => onSelectProduct(PRODUCTS[2])}
              onMouseEnter={() => onSetCursorMode('view')}
              onMouseLeave={() => onSetCursorMode('default')}
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden border border-white/10 bg-[#141416] transition-all duration-700">
                <FashionVisual type={getVisualType(PRODUCTS[2].id)} label={`SILHOUETTE 03 // ${PRODUCTS[2].category}`} />
                
                <div className={`absolute top-6 ${lang === 'fa' ? 'left-6' : 'right-6'} z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                  <span className="px-3 py-1.5 bg-[#F1EFE9] text-[#0A0A0A] text-[10px] font-mono tracking-widest uppercase">
                    {t.collection.explorePiece}
                  </span>
                </div>

                <div className={`absolute bottom-6 ${lang === 'fa' ? 'right-6' : 'left-6'} z-20`}>
                  <span className="text-xs font-mono tracking-[0.2em] text-[#A3A3A3] block mb-1">
                    {PRODUCTS[2].number} / {getProductCategory(PRODUCTS[2])}
                  </span>
                  <h3 className="font-editorial-display text-2xl font-medium text-[#F1EFE9]">
                    {getProductName(PRODUCTS[2])}
                  </h3>
                </div>
              </div>

              <div className="mt-4 flex justify-between items-baseline text-xs font-mono tracking-widest border-t border-white/10 pt-3">
                <span className="text-[#A3A3A3]">{getProductMaterial(PRODUCTS[2])}</span>
                <span className="text-[#F1EFE9] tabular-nums font-semibold">
                  {PRODUCTS[2].currency}{PRODUCTS[2].price}
                </span>
              </div>
            </div>

            {/* 04 / MONOLITH JACKET */}
            <div
              className="lg:col-span-7 group cursor-pointer lg:-mt-12"
              onClick={() => onSelectProduct(PRODUCTS[3])}
              onMouseEnter={() => onSetCursorMode('view')}
              onMouseLeave={() => onSetCursorMode('default')}
            >
              <div className="relative aspect-[3/4] sm:aspect-[4/5] w-full overflow-hidden border border-white/10 bg-[#141416] transition-all duration-700">
                <FashionVisual type={getVisualType(PRODUCTS[3].id)} label={`SILHOUETTE 04 // ${PRODUCTS[3].category}`} />
                
                <div className={`absolute top-6 ${lang === 'fa' ? 'left-6' : 'right-6'} z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                  <span className="px-3 py-1.5 bg-[#F1EFE9] text-[#0A0A0A] text-[10px] font-mono tracking-widest uppercase">
                    {t.collection.explorePiece}
                  </span>
                </div>

                <div className={`absolute bottom-6 ${lang === 'fa' ? 'right-6' : 'left-6'} z-20`}>
                  <span className="text-xs font-mono tracking-[0.2em] text-[#A3A3A3] block mb-1">
                    {PRODUCTS[3].number} / {getProductCategory(PRODUCTS[3])}
                  </span>
                  <h3 className="font-editorial-display text-2xl md:text-3xl font-medium text-[#F1EFE9]">
                    {getProductName(PRODUCTS[3])}
                  </h3>
                </div>
              </div>

              <div className="mt-4 flex justify-between items-baseline text-xs font-mono tracking-widest border-t border-white/10 pt-3">
                <span className="text-[#A3A3A3]">{getProductMaterial(PRODUCTS[3])}</span>
                <span className="text-[#F1EFE9] tabular-nums font-semibold">
                  {PRODUCTS[3].currency}{PRODUCTS[3].price}
                </span>
              </div>
            </div>
          </div>

          {/* Row 3: Frame Knit + Column Bag */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* 05 / FRAME KNIT */}
            <div
              className="lg:col-span-6 group cursor-pointer"
              onClick={() => onSelectProduct(PRODUCTS[4])}
              onMouseEnter={() => onSetCursorMode('view')}
              onMouseLeave={() => onSetCursorMode('default')}
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden border border-white/10 bg-[#141416] transition-all duration-700">
                <FashionVisual type={getVisualType(PRODUCTS[4].id)} label={`SILHOUETTE 05 // ${PRODUCTS[4].category}`} />
                
                <div className={`absolute top-6 ${lang === 'fa' ? 'left-6' : 'right-6'} z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                  <span className="px-3 py-1.5 bg-[#F1EFE9] text-[#0A0A0A] text-[10px] font-mono tracking-widest uppercase">
                    {t.collection.explorePiece}
                  </span>
                </div>

                <div className={`absolute bottom-6 ${lang === 'fa' ? 'right-6' : 'left-6'} z-20`}>
                  <span className="text-xs font-mono tracking-[0.2em] text-[#A3A3A3] block mb-1">
                    {PRODUCTS[4].number} / {getProductCategory(PRODUCTS[4])}
                  </span>
                  <h3 className="font-editorial-display text-2xl font-medium text-[#F1EFE9]">
                    {getProductName(PRODUCTS[4])}
                  </h3>
                </div>
              </div>

              <div className="mt-4 flex justify-between items-baseline text-xs font-mono tracking-widest border-t border-white/10 pt-3">
                <span className="text-[#A3A3A3]">{getProductMaterial(PRODUCTS[4])}</span>
                <span className="text-[#F1EFE9] tabular-nums font-semibold">
                  {PRODUCTS[4].currency}{PRODUCTS[4].price}
                </span>
              </div>
            </div>

            {/* 06 / COLUMN BAG */}
            <div
              className="lg:col-span-6 group cursor-pointer"
              onClick={() => onSelectProduct(PRODUCTS[5])}
              onMouseEnter={() => onSetCursorMode('view')}
              onMouseLeave={() => onSetCursorMode('default')}
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden border border-white/10 bg-[#141416] transition-all duration-700">
                <FashionVisual type={getVisualType(PRODUCTS[5].id)} label={`OBJECT 06 // ${PRODUCTS[5].category}`} />
                
                <div className={`absolute top-6 ${lang === 'fa' ? 'left-6' : 'right-6'} z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                  <span className="px-3 py-1.5 bg-[#F1EFE9] text-[#0A0A0A] text-[10px] font-mono tracking-widest uppercase">
                    {t.collection.explorePiece}
                  </span>
                </div>

                <div className={`absolute bottom-6 ${lang === 'fa' ? 'right-6' : 'left-6'} z-20`}>
                  <span className="text-xs font-mono tracking-[0.2em] text-[#A3A3A3] block mb-1">
                    {PRODUCTS[5].number} / {getProductCategory(PRODUCTS[5])}
                  </span>
                  <h3 className="font-editorial-display text-2xl font-medium text-[#F1EFE9]">
                    {getProductName(PRODUCTS[5])}
                  </h3>
                </div>
              </div>

              <div className="mt-4 flex justify-between items-baseline text-xs font-mono tracking-widest border-t border-white/10 pt-3">
                <span className="text-[#A3A3A3]">{getProductMaterial(PRODUCTS[5])}</span>
                <span className="text-[#F1EFE9] tabular-nums font-semibold">
                  {PRODUCTS[5].currency}{PRODUCTS[5].price}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
