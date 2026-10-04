import React, { useEffect, useState } from 'react';

export type CursorMode = 'default' | 'view' | 'drag' | 'explore' | 'hover';

interface CustomCursorProps {
  mode: CursorMode;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ mode }) => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  const isTextMode = mode === 'view' || mode === 'drag' || mode === 'explore';

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 z-[10000] will-change-transform"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
      }}
    >
      {/* Outer morphing ring */}
      <div
        className={`flex items-center justify-center rounded-full transition-all duration-300 ease-out border text-[9px] uppercase font-mono tracking-widest ${
          isTextMode
            ? 'w-16 h-16 -ml-8 -mt-8 bg-[#F1EFE9] text-[#0A0A0A] border-transparent font-semibold shadow-2xl scale-100'
            : mode === 'hover'
            ? 'w-10 h-10 -ml-5 -mt-5 bg-white/10 border-white/40 backdrop-blur-xs'
            : 'w-7 h-7 -ml-3.5 -mt-3.5 bg-transparent border-white/30'
        }`}
      >
        {isTextMode && (
          <span className="animate-pulse">
            {mode === 'view' && 'VIEW'}
            {mode === 'drag' && 'DRAG'}
            {mode === 'explore' && 'EXPLORE'}
          </span>
        )}
      </div>

      {/* Tiny inner center dot (hidden when in large text mode) */}
      {!isTextMode && (
        <div className="w-1 h-1 bg-[#F1EFE9] rounded-full -ml-0.5 -mt-0.5 absolute top-0 left-0 pointer-events-none" />
      )}
    </div>
  );
};
