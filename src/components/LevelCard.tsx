import { Link } from 'react-router-dom';
import type { Lesson, LevelStatus } from '../types/lesson';
import { PixelBadge } from './PixelBadge';
import {
  PixelCheckIcon,
  PixelLockIcon,
  PixelStarIcon,
  PixelTrophyIcon,
} from './PixelIcons';

interface LevelCardProps {
  lesson: Lesson;
  status: LevelStatus;
  isBoss?: boolean;
  onSelect?: () => void;
}

export function LevelCard({
  lesson,
  status,
  isBoss = false,
  onSelect,
}: LevelCardProps) {
  const isLocked = status === 'locked';
  const isCompleted = status === 'completed';

  const statusBadge = isCompleted ? (
    <PixelBadge tone="mint">
      <PixelCheckIcon size={14} />
      <span>SELESAI</span>
    </PixelBadge>
  ) : isLocked ? (
    <PixelBadge tone="lavender">
      <PixelLockIcon size={14} />
      <span>TERKUNCI</span>
    </PixelBadge>
  ) : (
    <PixelBadge tone="pink">
      {isBoss ? <PixelTrophyIcon size={14} /> : <PixelStarIcon size={14} />}
      <span>SIAP DIMAINKAN</span>
    </PixelBadge>
  );

  const cardBody = (
    <div
      className={`flex h-full flex-col justify-between gap-3 border-[3px] border-navy p-4 transition-transform duration-100 ${
        isLocked
          ? 'bg-[#ECE6F7] text-navy opacity-85'
          : isCompleted
            ? 'bg-white text-navy shadow-pixel hover:-translate-y-0.5'
            : 'bg-light-bg text-navy shadow-pixel-lg hover:-translate-y-1'
      }`}
    >
      <div>
        <div className="mb-2.5 flex flex-wrap items-center justify-between gap-2">
          <span className="font-pixel text-[11px] text-navy">
            LEVEL {lesson.id}
          </span>
          {statusBadge}
        </div>
        <h3 className="mb-1.5 font-pixel text-xs leading-relaxed text-navy sm:text-sm">
          {lesson.title}
        </h3>
        <p className="text-sm leading-relaxed text-navy/90">
          {lesson.shortDescription}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t-2 border-navy/20 pt-2.5">
        <span className="font-mono text-xs font-semibold text-navy">
          +{lesson.xpChallenge + lesson.xpLevel} XP
        </span>
        <span className="font-pixel text-[10px] text-navy">
          {isLocked
            ? `Selesaikan Level ${lesson.id - 1}`
            : isCompleted
              ? 'MAIN ULANG >'
              : 'MULAI LEVEL >'}
        </span>
      </div>
    </div>
  );

  if (isLocked) {
    return (
      <div
        aria-disabled="true"
        className="h-full cursor-not-allowed select-none"
      >
        {cardBody}
      </div>
    );
  }

  return (
    <Link
      to={`/learn/${lesson.world}/${lesson.id}`}
      onClick={onSelect}
      className="block h-full focus-visible:outline-none"
    >
      {cardBody}
    </Link>
  );
}

