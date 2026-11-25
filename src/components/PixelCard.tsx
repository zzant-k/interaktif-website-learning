import type { ReactNode } from 'react';

interface PixelCardProps {
  children: ReactNode;
  tone?: 'white' | 'soft' | 'sky' | 'lavender' | 'pink' | 'navy';
  className?: string;
}

const TONE_MAP = {
  white: 'bg-white text-navy',
  soft: 'bg-light-bg text-navy',
  sky: 'bg-sky-blue text-navy',
  lavender: 'bg-lavender text-navy',
  pink: 'bg-pastel-pink text-navy',
  navy: 'bg-navy text-white',
};

export function PixelCard({
  children,
  tone = 'white',
  className = '',
}: PixelCardProps) {
  return (
    <div className={`pixel-box p-4 sm:p-5 ${TONE_MAP[tone]} ${className}`}>
      {children}
    </div>
  );
}

