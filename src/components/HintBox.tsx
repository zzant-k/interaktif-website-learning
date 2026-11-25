import { useState } from 'react';
import { PixelButton } from './PixelButton';
import { PixelBulbIcon } from './PixelIcons';

interface HintBoxProps {
  hints: string[];
}

export function HintBox({ hints }: HintBoxProps) {
  const [revealedCount, setRevealedCount] = useState(0);

  const handleNextHint = () => {
    setRevealedCount((prev) => Math.min(hints.length, prev + 1));
  };

  const hasMoreHints = revealedCount < hints.length;

  return (
    <section
      aria-label="Bantuan dan petunjuk belajar"
      className="pixel-box bg-light-bg p-4 text-navy"
    >
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        <PixelButton
          variant="ghost"
          size="sm"
          onClick={handleNextHint}
          disabled={!hasMoreHints}
          aria-label="Tampilkan petunjuk berikutnya"
        >
          <PixelBulbIcon size={16} />
          <span>
            {revealedCount === 0
              ? 'HINT'
              : hasMoreHints
                ? `HINT (${revealedCount}/${hints.length})`
                : 'SEMUA HINT TERBUKA'}
          </span>
        </PixelButton>

        <span className="font-mono text-xs font-semibold text-navy">
          Petunjuk: {revealedCount}/{hints.length}
        </span>
      </div>

      {revealedCount > 0 && (
        <ol className="mt-3.5 space-y-2 border-t-2 border-navy/20 pt-3">
          {hints.slice(0, revealedCount).map((hint, idx) => (
            <li
              key={idx}
              className="border-2 border-navy bg-white px-3 py-2 text-sm leading-relaxed text-navy"
            >
              <span className="mr-2 font-pixel text-[10px] text-navy">
                HINT {idx + 1}:
              </span>
              <span>{hint}</span>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
