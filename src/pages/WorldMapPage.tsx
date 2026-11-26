import { LevelCard } from '../components/LevelCard';
import { PixelBadge } from '../components/PixelBadge';
import { PixelButton } from '../components/PixelButton';
import { PixelCard } from '../components/PixelCard';
import { PixelCharacter } from '../components/PixelCharacter';
import { PixelLockIcon, PixelTrophyIcon } from '../components/PixelIcons';
import { PixelProgressBar } from '../components/PixelProgressBar';
import {
  PixelBrickPlatform,
  PixelCitySkyline,
  PixelClouds,
} from '../components/PixelScene';
import { CSS_WORLD_LOCKED, WORLDS } from '../data/worlds';
import type { WorldId } from '../types/lesson';
import type { PlayerProgress } from '../types/progress';
import {
  getLevelStatus,
  getWorldCompletedCount,
  getWorldLessons,
} from '../utils/progressManager';
import { playSfx } from '../utils/soundFx';

interface WorldMapPageProps {
  world: WorldId;
  progress: PlayerProgress;
}

export function WorldMapPage({ world, progress }: WorldMapPageProps) {
  const worldInfo = WORLDS[world];

  if (world === 'css' && CSS_WORLD_LOCKED) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12">
        <PixelCard tone="soft" className="text-center">
          <div className="mx-auto mb-3 inline-flex border-[3px] border-navy bg-lavender p-3">
            <PixelLockIcon size={28} />
          </div>
          <h1 className="font-pixel text-base text-navy sm:text-lg">
            CSS WORLD SEDANG TERKUNCI
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-navy">
            Dunia CSS saat ini masih dikunci sementara, termasuk setelah HTML
            World selesai. Silakan lanjutkan atau ulangi misi di HTML World
            sambil menunggu CSS World dibuka.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <PixelButton
              to="/world/html"
              variant="primary"
              size="md"
              onClick={() => playSfx('click', progress.soundEnabled)}
            >
              BUKA PETA HTML
            </PixelButton>
            <PixelButton
              to="/world"
              variant="secondary"
              size="md"
              onClick={() => playSfx('click', progress.soundEnabled)}
            >
              PILIH DUNIA
            </PixelButton>
          </div>
        </PixelCard>
      </div>
    );
  }

  const lessons = getWorldLessons(world);
  const completedCount = getWorldCompletedCount(progress, world);
  const isWorldCleared = completedCount === lessons.length;

  const activeLevelId =
    lessons.find((l) => getLevelStatus(progress, world, l.id) === 'available')
      ?.id ?? lessons[lessons.length - 1].id;

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
      {/* Top World Map Banner */}
      <div
        className={`pixel-box relative overflow-hidden p-5 sm:p-6 ${
          world === 'html'
            ? 'bg-gradient-to-b from-sky-blue to-light-bg'
            : 'bg-gradient-to-b from-pastel-pink/75 via-lavender/65 to-light-bg'
        }`}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 opacity-65">
          <PixelClouds />
        </div>
        <PixelCitySkyline className="absolute bottom-0 left-0 right-0 h-20 opacity-45" />

        <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <PixelButton
                to="/world"
                variant="secondary"
                size="sm"
                onClick={() => playSfx('click', progress.soundEnabled)}
              >
                &lt; PILIH DUNIA
              </PixelButton>
              {isWorldCleared && (
                <PixelBadge tone="mint">
                  <PixelTrophyIcon size={14} />
                  <span>DUNIA TAMAT (+500 XP)</span>
                </PixelBadge>
              )}
            </div>

            <h1 className="mt-4 font-pixel text-lg text-navy sm:text-2xl">
              PETA {worldInfo.name}
            </h1>
            <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-navy sm:text-base">
              {worldInfo.description}
            </p>
          </div>

          <div className="w-full border-[3px] border-navy bg-white p-4 shadow-pixel md:w-72">
            <PixelProgressBar
              value={completedCount}
              max={lessons.length}
              label={`${completedCount}/${lessons.length} Level`}
              segments={6}
              fillTone={world === 'html' ? 'blue' : 'pink'}
            />
            <div className="mt-3 flex items-center justify-between text-xs font-bold text-navy">
              <span>Bonus Tamat Dunia</span>
              <span className="font-pixel text-[10px]">+500 XP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Connected Platformer Path Map */}
      <section
        aria-label={`Jalur level ${worldInfo.name}`}
        className="mt-7 border-[3px] border-navy bg-white p-4 shadow-pixel sm:p-6"
      >
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b-2 border-navy/20 pb-3">
          <div className="flex items-center gap-2.5">
            <PixelCharacter
              variant={world === 'html' ? 'cyan' : 'pink'}
              size={44}
            />
            <div>
              <h2 className="font-pixel text-xs text-navy sm:text-sm">
                JALUR PETUALANGAN
              </h2>
              <p className="text-xs text-navy/85">
                Posisi hero saat ini: Level {activeLevelId}
              </p>
            </div>
          </div>

          <PixelButton
            to={`/learn/${world}/${activeLevelId}`}
            variant={world === 'html' ? 'primary' : 'accent'}
            size="sm"
            onClick={() => playSfx('click', progress.soundEnabled)}
          >
            MAIN LEVEL {activeLevelId}
          </PixelButton>
        </div>

        <ol className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {lessons.map((lesson, idx) => {
            const status = getLevelStatus(progress, world, lesson.id);
            const isHeroHere = lesson.id === activeLevelId;
            return (
              <li key={lesson.id} className="relative flex flex-col">
                <div className="mb-2 flex items-center justify-between px-1">
                  <span className="font-mono text-xs font-bold text-navy">
                    Stage {idx + 1} / {lessons.length}
                  </span>
                  {isHeroHere && (
                    <span className="border-2 border-navy bg-pastel-pink px-2 py-0.5 font-pixel text-[9px] text-navy">
                      POSISI HERO
                    </span>
                  )}
                </div>

                <div className="flex-1">
                  <LevelCard
                    lesson={lesson}
                    status={status}
                    isBoss={lesson.id === lessons.length}
                    onSelect={() => playSfx('click', progress.soundEnabled)}
                  />
                </div>

                {/* Visible pixel path connector on mobile */}
                {idx < lessons.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="mx-auto my-1 flex flex-col items-center gap-1 md:hidden"
                  >
                    <span className="h-2 w-2 bg-navy" />
                    <span className="h-2 w-2 bg-pixel-blue" />
                    <span className="h-2 w-2 bg-navy" />
                  </div>
                )}
              </li>
            );
          })}
        </ol>

        <div className="mt-6 overflow-hidden border-[3px] border-navy">
          <PixelBrickPlatform />
        </div>
      </section>
    </div>
  );
}

