import React, { useState } from 'react';
import { CartItem } from '../types';
import { CursorMode } from './CustomCursor';
import { X, Trash2, ArrowRight, Shield, CheckCircle } from 'lucide-react';
import { Language, TranslationData } from '../data/translations';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, quantity: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
  onSetCursorMode: (mode: CursorMode) => void;
  lang: Language;
  t: TranslationData;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onSetCursorMode,
  lang,
  t,
}) => {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'confirmed'>('cart');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerEmail) return;
    setCheckoutStep('confirmed');
  };

  const handleCompleteOrder = () => {
    onClearCart();
    setCheckoutStep('cart');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      {/* Background click to dismiss */}
      <div className="flex-1" onClick={onClose} />

      {/* Drawer Panel */}
      <div className="w-full max-w-md bg-[#0D0D0F] border-l border-white/10 h-full flex flex-col justify-between p-6 sm:p-8 overflow-y-auto">
        {/* Drawer Header */}
        <div className="flex justify-between items-center border-b border-white/10 pb-5">
          <div className="flex items-center gap-3">
            <span className="font-editorial-display text-xl tracking-[0.15em] text-[#F1EFE9]">
              {t.cart.title}
            </span>
            <span className="text-xs font-mono text-[#737373] tabular-nums">
              ({items.reduce((s, i) => s + i.quantity, 0)})
            </span>
          </div>
          <button
            onClick={onClose}
            onMouseEnter={() => onSetCursorMode('hover')}
            onMouseLeave={() => onSetCursorMode('default')}
            className="text-[#A3A3A3] hover:text-white p-1"
            aria-label="Close Bag"
          >
            <X size={20} />
          </button>
        </div>

        {/* View 1: Cart Items */}
        {checkoutStep === 'cart' && (
          <>
            {items.length === 0 ? (
              <div className="my-auto flex flex-col items-center text-center py-16 space-y-4">
                <span className="font-editorial-serif italic text-2xl text-[#737373]">
                  {t.cart.emptyTitle}
                </span>
                <p className="text-xs font-mono text-[#52525b] max-w-xs">
                  {t.cart.emptyDesc}
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 px-6 py-2.5 border border-white/20 text-xs font-mono tracking-widest text-[#F1EFE9] hover:bg-white/10 uppercase"
                >
                  {t.cart.discoverBtn}
                </button>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto py-6 space-y-6">
                {items.map((item, idx) => (
                  <div
                    key={`${item.product.id}-${item.size}-${idx}`}
                    className="flex gap-4 border-b border-white/5 pb-6 items-start"
                  >
                    <div className="w-20 h-24 bg-[#141416] border border-white/10 flex items-center justify-center p-2 shrink-0">
                      <span className="font-editorial-display text-xs text-[#A3A3A3] font-bold">
                        {item.product.number}
                      </span>
                    </div>

                    <div className="flex-1 flex flex-col justify-between h-full">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-editorial-display text-sm font-semibold text-[#F1EFE9]">
                            {lang === 'fa' && item.product.nameFa ? item.product.nameFa : item.product.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(idx)}
                            className="text-[#737373] hover:text-red-400 p-1"
                            title="Remove item"
                            aria-label={`Remove ${item.product.name} from bag`}
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                        <div className="text-[11px] font-mono text-[#A3A3A3] mt-1">
                          {t.cart.size}: {item.size} · {lang === 'fa' && item.product.colorNameFa ? item.product.colorNameFa : item.product.colorName}
                        </div>
                      </div>

                      <div className="flex justify-between items-center mt-3 pt-2">
                        <div className="flex items-center border border-white/15 text-xs font-mono">
                          <button
                            onClick={() => onUpdateQuantity(idx, Math.max(1, item.quantity - 1))}
                            className="px-2.5 py-0.5 text-[#A3A3A3] hover:text-white"
                          >
                            -
                          </button>
                          <span className="px-2 text-[#F1EFE9] tabular-nums font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                            className="px-2.5 py-0.5 text-[#A3A3A3] hover:text-white"
                          >
                            +
                          </button>
                        </div>

                        <span className="text-xs font-mono tabular-nums text-[#F1EFE9] font-medium">
                          {item.product.currency}{item.product.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {items.length > 0 && (
              <div className="border-t border-white/10 pt-6 space-y-4">
                <div className="flex justify-between text-xs font-mono tracking-widest text-[#A3A3A3]">
                  <span>{t.cart.deliveryLabel}</span>
                  <span className="text-[#F1EFE9]">{t.cart.deliveryVal}</span>
                </div>
                <div className="flex justify-between text-sm font-mono tracking-widest text-[#F1EFE9] pt-2 border-t border-white/5">
                  <span>{t.cart.total}</span>
                  <span className="tabular-nums font-semibold text-base">
                    €{subtotal.toLocaleString()}
                  </span>
                </div>

                <button
                  onClick={() => setCheckoutStep('checkout')}
                  onMouseEnter={() => onSetCursorMode('hover')}
                  onMouseLeave={() => onSetCursorMode('default')}
                  className="w-full py-4 bg-[#F1EFE9] text-[#0A0A0A] hover:bg-white text-xs font-mono tracking-[0.2em] uppercase flex items-center justify-center gap-3 transition-colors"
                >
                  <span>{t.cart.acquireBtn}</span>
                  <ArrowRight size={14} className={lang === 'fa' ? 'rotate-180' : ''} />
                </button>

                <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-[#52525b] tracking-wider pt-2">
                  <Shield size={12} />
                  <span>{t.cart.authBadge}</span>
                </div>
              </div>
            )}
          </>
        )}

        {/* View 2: Curated Checkout Form */}
        {checkoutStep === 'checkout' && (
          <form onSubmit={handleCheckoutSubmit} className="flex-1 flex flex-col justify-between py-6">
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#737373] uppercase">
                  {t.cart.step2}
                </span>
                <h3 className="font-editorial-display text-2xl font-bold text-[#F1EFE9] mt-1">
                  {t.cart.conciergeTitle}
                </h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-mono tracking-widest text-[#A3A3A3] uppercase mb-1">
                    {t.cart.fullName}
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder={lang === 'fa' ? 'مثال: سهراب احمدی' : 'e.g. Elena Rostova'}
                    className="w-full bg-white/5 border border-white/15 px-3 py-2.5 text-xs font-mono text-[#F1EFE9] focus:outline-none focus:border-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono tracking-widest text-[#A3A3A3] uppercase mb-1">
                    {t.cart.email}
                  </label>
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="client@domaine.com"
                    className="w-full bg-white/5 border border-white/15 px-3 py-2.5 text-xs font-mono text-[#F1EFE9] focus:outline-none focus:border-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono tracking-widest text-[#A3A3A3] uppercase mb-1">
                    {t.cart.destination}
                  </label>
                  <input
                    type="text"
                    required
                    defaultValue={lang === 'fa' ? 'تهران / پاریس / میلان / لندن' : 'Paris / Milan / London / Tokyo / New York'}
                    className="w-full bg-white/5 border border-white/15 px-3 py-2.5 text-xs font-mono text-[#F1EFE9] focus:outline-none focus:border-white"
                  />
                </div>
              </div>

              <div className="p-4 bg-white/5 border border-white/10 text-xs font-mono space-y-1">
                <div className="flex justify-between text-[#A3A3A3]">
                  <span>{t.cart.subtotal}</span>
                  <span>€{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#A3A3A3]">
                  <span>{t.cart.insurance}</span>
                  <span className="text-[#F1EFE9]">{lang === 'fa' ? 'رایگان' : 'INCLUDED'}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-6 border-t border-white/10">
              <button
                type="submit"
                className="w-full py-4 bg-[#F1EFE9] text-[#0A0A0A] hover:bg-white text-xs font-mono tracking-[0.2em] uppercase font-semibold transition-colors"
              >
                {t.cart.confirmOrder}
              </button>
              <button
                type="button"
                onClick={() => setCheckoutStep('cart')}
                className="w-full py-2 text-xs font-mono tracking-widest text-[#737373] hover:text-white uppercase"
              >
                {t.cart.backToBag}
              </button>
            </div>
          </form>
        )}

        {/* View 3: Order Confirmed */}
        {checkoutStep === 'confirmed' && (
          <div className="my-auto flex flex-col items-center text-center py-10 space-y-5 animate-in fade-in duration-300">
            <CheckCircle size={44} className="text-[#F1EFE9]" />
            <h3 className="font-editorial-display text-2xl font-bold text-[#F1EFE9]">
              {t.cart.confirmedTitle}
            </h3>
            <div className="text-xs font-mono text-[#A3A3A3] leading-relaxed max-w-xs space-y-2">
              <p>
                {lang === 'fa'
                  ? `پرونده #ALB-026-${(Math.random() * 8999 + 1000).toFixed(0)} به نام شما ثبت گردید.`
                  : `Dossier #ALB-026-${(Math.random() * 8999 + 1000).toFixed(0)} has been allocated to your name.`}
              </p>
              <p className="text-[11px] text-[#737373]">
                {t.cart.confirmedSub}
              </p>
            </div>
            <button
              onClick={handleCompleteOrder}
              className="mt-6 px-8 py-3 bg-[#F1EFE9] text-[#0A0A0A] text-xs font-mono tracking-widest uppercase font-semibold"
            >
              {t.cart.returnAtelier}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
