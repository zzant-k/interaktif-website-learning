import type { ReactNode } from 'react';

interface PixelBadgeProps {
  children: ReactNode;
  tone?: 'sky' | 'pink' | 'lavender' | 'mint' | 'navy';
  className?: string;
}

const BADGE_TONES = {
  sky: 'bg-sky-blue text-navy',
  pink: 'bg-pastel-pink text-navy',
  lavender: 'bg-lavender text-navy',
  mint: 'bg-mint-pass text-mint-ink',
  navy: 'bg-navy text-white',
};

export function PixelBadge({
  children,
  tone = 'lavender',
  className = '',
}: PixelBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 border-2 border-navy px-2.5 py-1 font-pixel text-[10px] leading-none ${BADGE_TONES[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

