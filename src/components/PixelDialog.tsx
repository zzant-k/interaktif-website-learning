import type { ReactNode } from 'react';

interface PixelDialogProps {
  speaker?: string;
  children: ReactNode;
  pointer?: 'left' | 'right' | 'none';
  compact?: boolean;
  className?: string;
}

export function PixelDialog({
  speaker,
  children,
  pointer = 'none',
  compact = false,
  className = '',
}: PixelDialogProps) {
  return (
    <div
      className={`relative border-[3px] border-navy bg-white text-navy shadow-pixel ${
        compact ? 'px-3.5 py-2.5' : 'px-4 py-3.5 sm:px-5 sm:py-4'
      } ${className}`}
    >
      {speaker && (
        <div className="mb-1.5 inline-block border-2 border-navy bg-lavender px-2 py-0.5 font-pixel text-[10px] text-navy">
          {speaker}
        </div>
      )}
      <div className="text-sm leading-relaxed text-navy">{children}</div>
      {pointer === 'left' && (
        <div
          aria-hidden="true"
          className="absolute -bottom-3 left-6 h-3 w-3 border-b-[3px] border-r-[3px] border-navy bg-white rotate-45"
        />
      )}
      {pointer === 'right' && (
        <div
          aria-hidden="true"
          className="absolute -bottom-3 right-6 h-3 w-3 border-b-[3px] border-r-[3px] border-navy bg-white rotate-45"
        />
      )}
    </div>
  );
}

