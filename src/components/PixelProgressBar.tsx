interface PixelProgressBarProps {
  value: number;
  max: number;
  label?: string;
  segments?: number;
  fillTone?: 'sky' | 'pink' | 'blue' | 'lavender';
  showPercent?: boolean;
  className?: string;
}

const FILL_COLOR = {
  sky: 'bg-sky-blue',
  pink: 'bg-pastel-pink',
  blue: 'bg-pixel-blue',
  lavender: 'bg-lavender',
};

export function PixelProgressBar({
  value,
  max,
  label,
  segments = 12,
  fillTone = 'sky',
  showPercent = true,
  className = '',
}: PixelProgressBarProps) {
  const safeMax = Math.max(1, max);
  const ratio = Math.min(1, Math.max(0, value / safeMax));
  const percent = Math.round(ratio * 100);
  const filledSegments = Math.round(ratio * segments);

  return (
    <div className={`w-full ${className}`}>
      {(label || showPercent) && (
        <div className="mb-1.5 flex items-center justify-between gap-2 text-xs font-bold">
          {label && (
            <span className="font-pixel text-[10px] sm:text-xs">{label}</span>
          )}
          {showPercent && (
            <span className="font-mono text-xs font-semibold">{percent}%</span>
          )}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={safeMax}
        aria-label={label ?? 'Progress belajar'}
        className="grid gap-1 border-[3px] border-navy bg-navy p-1"
        style={{
          gridTemplateColumns: `repeat(${segments}, minmax(0, 1fr))`,
        }}
      >
        {Array.from({ length: segments }).map((_, idx) => {
          const active = idx < filledSegments;
          return (
            <div
              key={idx}
              className={`h-3.5 transition-colors duration-200 ${
                active ? FILL_COLOR[fillTone] : 'bg-navy-deep'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}

