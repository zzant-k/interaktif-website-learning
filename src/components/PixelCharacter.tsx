import { useState } from 'react';
import type { CharacterVariant } from '../types/lesson';

interface PixelCharacterProps {
  variant?: CharacterVariant;
  size?: number;
  interactive?: boolean;
  label?: string;
  onInteract?: () => void;
  className?: string;
}

export function PixelCharacter({
  variant = 'cyan',
  size = 64,
  interactive = false,
  label,
  onInteract,
  className = '',
}: PixelCharacterProps) {
  const [hopping, setHopping] = useState(false);

  const triggerHop = () => {
    setHopping(false);
    requestAnimationFrame(() => setHopping(true));
    onInteract?.();
  };

  const palette =
    variant === 'cyan'
      ? {
          cap: '#6D9DFF',
          capRim: '#A7D8FF',
          shirt: '#6D9DFF',
          trim: '#A7D8FF',
          pants: '#25245B',
          hair: '#25245B',
          shoe: '#F6A8E8',
        }
      : variant === 'pink'
        ? {
            cap: '#3B4A6B',
            capRim: '#6D9DFF',
            shirt: '#F6A8E8',
            trim: '#C7B6FF',
            pants: '#25245B',
            hair: '#25245B',
            shoe: '#A7D8FF',
          }
        : {
            cap: '#25245B',
            capRim: '#C7B6FF',
            shirt: '#6D9DFF',
            trim: '#F6A8E8',
            pants: '#25245B',
            hair: '#25245B',
            shoe: '#FFFFFF',
          };

  const spriteSvg =
    variant === 'runner' ? (
      <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        shapeRendering="crispEdges"
        aria-hidden="true"
      >
        {/* Dark navy outline silhouette */}
        <rect x="5" y="1" width="6" height="2" fill="#25245B" />
        <rect x="4" y="2" width="8" height="6" fill="#25245B" />
        <rect x="4" y="8" width="7" height="4" fill="#25245B" />
        {/* Hair & face */}
        <rect x="5" y="2" width="6" height="2" fill={palette.hair} />
        <rect x="4" y="3" width="2" height="3" fill={palette.hair} />
        <rect x="6" y="4" width="5" height="3" fill="#FFE2D6" />
        <rect x="8" y="5" width="1" height="1" fill="#25245B" />
        <rect x="10" y="5" width="1" height="1" fill="#25245B" />
        {/* Outfit & cape accent */}
        <rect x="5" y="8" width="5" height="3" fill={palette.shirt} />
        <rect x="3" y="9" width="2" height="2" fill={palette.trim} />
        <rect x="10" y="9" width="2" height="1" fill="#FFE2D6" />
        {/* Running legs */}
        <rect x="4" y="12" width="2" height="2" fill={palette.pants} />
        <rect x="9" y="12" width="2" height="2" fill={palette.pants} />
        <rect x="3" y="14" width="3" height="1" fill={palette.shoe} />
        <rect x="9" y="14" width="3" height="1" fill={palette.shoe} />
      </svg>
    ) : (
      <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        shapeRendering="crispEdges"
        aria-hidden="true"
      >
        {/* Cap */}
        <rect x="4" y="1" width="8" height="3" fill="#25245B" />
        <rect x="5" y="2" width="6" height="2" fill={palette.cap} />
        <rect x="3" y="4" width="10" height="1" fill={palette.capRim} />
        {/* Head */}
        <rect x="4" y="5" width="8" height="4" fill="#25245B" />
        <rect x="5" y="5" width="6" height="3" fill="#FFE2D6" />
        <rect x="6" y="6" width="1" height="1" fill="#25245B" />
        <rect x="9" y="6" width="1" height="1" fill="#25245B" />
        <rect x="5" y="7" width="1" height="1" fill="#F6A8E8" />
        <rect x="10" y="7" width="1" height="1" fill="#F6A8E8" />
        {/* Torso */}
        <rect x="4" y="9" width="8" height="4" fill="#25245B" />
        <rect x="5" y="9" width="6" height="3" fill={palette.shirt} />
        <rect x="7" y="9" width="2" height="2" fill={palette.trim} />
        {/* Arms */}
        <rect x="3" y="10" width="1" height="2" fill="#FFE2D6" />
        <rect x="12" y="10" width="1" height="2" fill="#FFE2D6" />
        {/* Legs & shoes */}
        <rect x="5" y="13" width="2" height="2" fill={palette.pants} />
        <rect x="9" y="13" width="2" height="2" fill={palette.pants} />
        <rect x="5" y="14" width="2" height="1" fill={palette.shoe} />
        <rect x="9" y="14" width="2" height="1" fill={palette.shoe} />
      </svg>
    );

  if (!interactive) {
    return (
      <div
        className={`inline-flex items-center justify-center select-none ${
          hopping ? 'animate-pixel-hop' : ''
        } ${className}`}
      >
        {spriteSvg}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={triggerHop}
      onAnimationEnd={() => setHopping(false)}
      aria-label={label ?? 'Sapa karakter pixel'}
      title="Klik karakter untuk menyapa"
      className={`group inline-flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center rounded-none bg-transparent p-1 transition-transform hover:-translate-y-0.5 active:translate-y-0.5 ${
        hopping ? 'animate-pixel-hop' : ''
      } ${className}`}
    >
      {spriteSvg}
    </button>
  );
}

