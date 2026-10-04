import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { FashionVisual } from './FashionVisual';
import { CursorMode } from './CustomCursor';
import { X, Check, ArrowRight } from 'lucide-react';
import { Language, TranslationData } from '../data/translations';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string) => void;
  onSetCursorMode: (mode: CursorMode) => void;
  lang: Language;
  t: TranslationData;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onSetCursorMode,
  lang,
  t,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || 'M');
      setAdded(false);
    }
  }, [product]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

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

  const productName = lang === 'fa' && product.nameFa ? product.nameFa : product.name;
  const productCat = lang === 'fa' && product.categoryFa ? product.categoryFa : product.category;
  const productDesc = lang === 'fa' && product.descriptionFa ? product.descriptionFa : product.description;
  const productDetails = lang === 'fa' && product.detailsFa ? product.detailsFa : product.details;
  const productMat = lang === 'fa' && product.materialFa ? product.materialFa : product.material;
  const productSil = lang === 'fa' && product.silhouetteFa ? product.silhouetteFa : product.silhouette;
  const productEdition = lang === 'fa' && product.editionFa ? product.editionFa : product.edition;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-[#0E0E10] border border-white/15 overflow-y-auto flex flex-col lg:flex-row shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          onMouseEnter={() => onSetCursorMode('hover')}
          onMouseLeave={() => onSetCursorMode('default')}
          aria-label="Close modal"
          className={`absolute top-4 ${lang === 'fa' ? 'left-4' : 'right-4'} z-30 p-2 text-[#A3A3A3] hover:text-[#F1EFE9] transition-colors`}
        >
          <X size={22} />
        </button>

        {/* Left Column: Visual Silhouette */}
        <div className="lg:w-1/2 aspect-[4/5] lg:aspect-auto min-h-[380px] bg-[#141416] border-b lg:border-b-0 lg:border-r border-white/10 relative">
          <FashionVisual type={getVisualType(product.id)} label={`DOSSIER // ${product.number}`} />
          <div className={`absolute bottom-4 ${lang === 'fa' ? 'right-4' : 'left-4'} text-[10px] font-mono tracking-widest text-[#737373]`}>
            {productEdition}
          </div>
        </div>

        {/* Right Column: Specification Dossier */}
        <div className="lg:w-1/2 p-6 sm:p-10 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center gap-3 text-[10px] font-mono tracking-[0.2em] text-[#A3A3A3] uppercase mb-2">
              <span>{product.collection}</span>
              <span>·</span>
              <span>{productCat}</span>
            </div>

            <h2 className="font-editorial-display text-3xl sm:text-4xl font-bold tracking-tight text-[#F1EFE9] mb-2">
              {productName}
            </h2>

            <div className="text-xl font-mono text-[#F1EFE9] tabular-nums font-medium mb-4">
              {product.currency}{product.price}
            </div>

            <p className="font-sans text-xs sm:text-sm text-[#A3A3A3] leading-relaxed mb-6">
              {productDesc}
            </p>

            {/* Architectural Details */}
            <div className="space-y-4 mb-6">
              <span className="text-[10px] font-mono tracking-widest text-[#737373] uppercase block">
                {t.modal.structuralAttrs}
              </span>
              <ul className="space-y-1.5 text-xs font-mono text-[#D4D4D8]">
                {productDetails.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#737373] mt-0.5">·</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Material & Dimensions */}
            <div className="grid grid-cols-2 gap-4 border-t border-b border-white/10 py-4 mb-6 text-xs font-mono">
              <div>
                <span className="text-[10px] text-[#737373] uppercase block mb-1">{t.modal.material}</span>
                <span className="text-[#F1EFE9]">{productMat}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#737373] uppercase block mb-1">{t.modal.silhouette}</span>
                <span className="text-[#F1EFE9]">{productSil}</span>
              </div>
            </div>

            {/* Size Selector */}
            <div className="mb-6">
              <div className="flex justify-between items-center text-xs font-mono tracking-widest text-[#A3A3A3] mb-2 uppercase">
                <span>{t.modal.sizeSelection}</span>
                {product.dimensions && (
                  <span className="text-[10px] text-[#737373]">{product.dimensions}</span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    onMouseEnter={() => onSetCursorMode('hover')}
                    onMouseLeave={() => onSetCursorMode('default')}
                    className={`h-10 min-w-[44px] px-3 border text-xs font-mono tracking-widest transition-all ${
                      selectedSize === size
                        ? 'border-[#F1EFE9] bg-[#F1EFE9] text-[#0A0A0A] font-bold'
                        : 'border-white/15 bg-transparent text-[#F1EFE9] hover:border-white/40'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-4 border-t border-white/10">
            <button
              onClick={handleAdd}
              onMouseEnter={() => onSetCursorMode('hover')}
              onMouseLeave={() => onSetCursorMode('default')}
              className={`w-full py-4 text-xs font-mono tracking-[0.2em] uppercase flex items-center justify-center gap-3 transition-colors ${
                added
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#F1EFE9] text-[#0A0A0A] hover:bg-white font-medium'
              }`}
            >
              {added ? (
                <>
                  <Check size={16} />
                  <span>{t.modal.committed}</span>
                </>
              ) : (
                <>
                  <span>{t.modal.addToBag}</span>
                  <ArrowRight size={14} className={lang === 'fa' ? 'rotate-180' : ''} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
