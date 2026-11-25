import { useEffect } from 'react';
import { ACHIEVEMENTS } from '../data/worlds';
import { formatSpeedrunTime } from '../services/supabaseAuth';
import type { WorldId } from '../types/lesson';
import type { CompletionReward } from '../types/progress';
import { PixelBadge } from './PixelBadge';
import { PixelButton } from './PixelButton';
import { PixelCharacter } from './PixelCharacter';
import { PixelStarIcon, PixelTrophyIcon } from './PixelIcons';

interface MissionCompleteModalProps {
  isOpen: boolean;
  world: WorldId;
  levelId: number;
  levelTitle: string;
  hasNextLevel: boolean;
  reward: CompletionReward | null;
  onClose: () => void;
  onNextLevel: () => void;
}

export function MissionCompleteModal({
  isOpen,
  world,
  levelId,
  levelTitle,
  hasNextLevel,
  reward,
  onClose,
  onNextLevel,
}: MissionCompleteModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen || !reward) return null;

  const unlockedDefs = ACHIEVEMENTS.filter((a) =>
    reward.newAchievements.includes(a.id)
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="mission-complete-heading"
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy/75 p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-pixel-pop pixel-box-lg w-full max-w-lg bg-light-bg p-5 text-navy sm:p-6"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <PixelCharacter variant="cyan" size={52} />
            <div>
              <PixelBadge tone="mint">LEVEL {levelId} CLEAR</PixelBadge>
              <h2
                id="mission-complete-heading"
                className="mt-2 font-pixel text-sm leading-relaxed text-navy sm:text-base"
              >
                MISSION COMPLETE!
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup dialog"
            className="min-h-[44px] min-w-[44px] border-[3px] border-navy bg-white font-pixel text-xs text-navy hover:bg-pastel-pink"
          >
            X
          </button>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-navy">
          {reward.xpGained > 0
            ? `Good job! Kamu menuntaskan "${levelTitle}" dan memperoleh total +${reward.xpGained} XP.`
            : `Kamu berhasil mengulang tantangan "${levelTitle}" dengan benar! XP sudah diklaim sebelumnya.`}
        </p>

        {reward.xpGained > 0 && (
          <div className="mt-4 space-y-2 border-[3px] border-navy bg-white p-3.5 text-sm">
            {reward.challengeXp > 0 && (
              <div className="flex items-center justify-between">
                <span>Menyelesaikan Challenge</span>
                <span className="font-pixel text-xs">+{reward.challengeXp} XP</span>
              </div>
            )}
            {reward.levelXp > 0 && (
              <div className="flex items-center justify-between">
                <span>Menyelesaikan Level</span>
                <span className="font-pixel text-xs">+{reward.levelXp} XP</span>
              </div>
            )}
            {reward.worldBonusXp > 0 && (
              <div className="flex items-center justify-between font-bold">
                <span className="flex items-center gap-1.5">
                  <PixelTrophyIcon size={16} />
                  Bonus Tamat {world.toUpperCase()} WORLD
                </span>
                <span className="font-pixel text-xs">
                  +{reward.worldBonusXp} XP
                </span>
              </div>
            )}
          </div>
        )}

        {typeof reward.timeTakenSeconds === 'number' && reward.timeTakenSeconds > 0 && (
          <div className="mt-3 flex items-center justify-between border-2 border-navy bg-white px-3.5 py-2.5 text-xs text-navy">
            <span className="font-pixel text-[10px] text-navy">⏱️ SPEEDRUN TIME</span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-bold text-navy">
                {formatSpeedrunTime(reward.timeTakenSeconds)}
              </span>
              {reward.isNewBestTime && (
                <PixelBadge tone="pink">REKOR TERCEPAT!</PixelBadge>
              )}
            </div>
          </div>
        )}

        {reward.leveledUp && (
          <div className="mt-3 flex items-center gap-2 border-[3px] border-navy bg-sky-blue px-3.5 py-2.5 text-sm font-bold text-navy">
            <PixelStarIcon size={18} />
            <span>Naik Pangkat! Sekarang kamu Player Level {reward.newPlayerLevel}.</span>
          </div>
        )}

        {unlockedDefs.length > 0 && (
          <div className="mt-3 space-y-2">
            <p className="font-pixel text-[10px] text-navy">
              ACHIEVEMENT TERBUKA:
            </p>
            {unlockedDefs.map((ach) => (
              <div
                key={ach.id}
                className="flex items-center gap-2.5 border-2 border-navy bg-pastel-pink px-3 py-2 text-sm"
              >
                <PixelTrophyIcon size={18} />
                <div>
                  <div className="font-pixel text-[11px]">{ach.title}</div>
                  <div className="text-xs">{ach.description}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-5 flex flex-wrap items-center justify-end gap-3">
          <PixelButton variant="secondary" size="sm" to={`/world/${world}`}>
            PETA {world.toUpperCase()}
          </PixelButton>
          {hasNextLevel ? (
            <PixelButton variant="accent" size="sm" onClick={onNextLevel}>
              LANJUT LEVEL {levelId + 1}
            </PixelButton>
          ) : (
            <PixelButton
              variant="primary"
              size="sm"
              to={world === 'html' ? '/world/css' : '/profile'}
            >
              {world === 'html' ? 'JELAJAHI CSS WORLD' : 'LIHAT PROFIL'}
            </PixelButton>
          )}
        </div>
      </div>
    </div>
  );
}

