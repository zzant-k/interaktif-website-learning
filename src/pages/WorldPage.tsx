import { PixelBadge } from '../components/PixelBadge';
import { PixelButton } from '../components/PixelButton';
import { PixelCard } from '../components/PixelCard';
import { PixelCharacter } from '../components/PixelCharacter';
import { PixelDialog } from '../components/PixelDialog';
import {
  PixelLockIcon,
  PixelStarIcon,
  PixelTrophyIcon,
} from '../components/PixelIcons';
import { PixelProgressBar } from '../components/PixelProgressBar';
import { CSS_LESSONS } from '../data/cssLessons';
import { HTML_LESSONS } from '../data/htmlLessons';
import { CSS_WORLD_LOCKED, WORLDS } from '../data/worlds';
import type { PlayerProgress } from '../types/progress';
import { getNextPlayableTarget } from '../utils/progressManager';
import { playSfx } from '../utils/soundFx';

interface WorldPageProps {
  progress: PlayerProgress;
  htmlCompleted: number;
  cssCompleted: number;
}

export function WorldPage({
  progress,
  htmlCompleted,
  cssCompleted,
}: WorldPageProps) {
  const nextTarget = getNextPlayableTarget(progress);

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-10">
      <div className="mb-8 flex flex-col justify-between gap-4 border-[3px] border-navy bg-gradient-to-r from-sky-blue via-light-bg to-pastel-pink/70 p-5 shadow-pixel sm:flex-row sm:items-center sm:p-6">
        <div className="flex items-center gap-4">
          <PixelCharacter variant="cyan" size={60} className="shrink-0" />
          <div>
            <h1 className="font-pixel text-lg leading-relaxed text-navy sm:text-2xl">
              PILIH DUNIA BELAJAR
            </h1>
            <p className="mt-1.5 text-sm leading-relaxed text-navy sm:text-base">
              Mulai dari HTML World untuk membangun struktur halaman, lalu
              lanjut ke CSS World untuk mendesain warna dan tata letak.
            </p>
          </div>
        </div>

        <PixelButton
          to={`/learn/${nextTarget.world}/${nextTarget.levelId}`}
          variant="secondary"
          size="md"
          onClick={() => playSfx('click', progress.soundEnabled)}
          className="shrink-0"
        >
          LANJUT LEVEL {nextTarget.world.toUpperCase()} #{nextTarget.levelId}
        </PixelButton>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* HTML World */}
        <PixelCard tone="white" className="flex flex-col justify-between gap-5">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <PixelBadge tone="sky">
                <PixelStarIcon size={14} />
                <span>{WORLDS.html.accentLabel}</span>
              </PixelBadge>
              <span className="font-mono text-xs font-bold text-navy">
                {htmlCompleted}/{HTML_LESSONS.length} Selesai
              </span>
            </div>

            <h2 className="mt-3 font-pixel text-base text-navy sm:text-lg">
              {WORLDS.html.name}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-navy">
              {WORLDS.html.subtitle} {WORLDS.html.description}
            </p>

            <div className="mt-4">
              <PixelProgressBar
                value={htmlCompleted}
                max={HTML_LESSONS.length}
                label="Progress HTML World"
                segments={6}
                fillTone="blue"
              />
            </div>

            <ul className="mt-5 space-y-2 border-t-2 border-navy/15 pt-4 text-sm">
              {HTML_LESSONS.map((lesson) => (
                <li
                  key={lesson.id}
                  className="flex items-center justify-between gap-2 border-2 border-navy/25 bg-light-bg px-3 py-1.5"
                >
                  <span className="font-semibold text-navy">
                    Level {lesson.id}: {lesson.title}
                  </span>
                  <span className="font-mono text-xs text-navy">
                    +{lesson.xpChallenge + lesson.xpLevel} XP
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <PixelButton
              to="/world/html"
              variant="primary"
              size="md"
              onClick={() => playSfx('click', progress.soundEnabled)}
              className="flex-1"
            >
              BUKA PETA HTML
            </PixelButton>
          </div>
        </PixelCard>

        {/* CSS World */}
        <PixelCard
          tone={CSS_WORLD_LOCKED ? 'soft' : 'white'}
          className="flex flex-col justify-between gap-5"
        >
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <PixelBadge tone={CSS_WORLD_LOCKED ? 'lavender' : 'pink'}>
                  {CSS_WORLD_LOCKED ? (
                    <PixelLockIcon size={14} />
                  ) : (
                    <PixelTrophyIcon size={14} />
                  )}
                  <span>{WORLDS.css.accentLabel}</span>
                </PixelBadge>
                {CSS_WORLD_LOCKED && (
                  <PixelBadge tone="lavender">
                    <PixelLockIcon size={12} />
                    <span>TERKUNCI</span>
                  </PixelBadge>
                )}
              </div>
              <span className="font-mono text-xs font-bold text-navy">
                {cssCompleted}/{CSS_LESSONS.length} Selesai
              </span>
            </div>

            <h2 className="mt-3 font-pixel text-base text-navy sm:text-lg">
              {WORLDS.css.name}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-navy">
              {CSS_WORLD_LOCKED
                ? 'CSS World sedang dikunci sementara, bahkan setelah HTML World selesai. Tunggu hingga dunia ini dibuka untuk melanjutkan!'
                : `${WORLDS.css.subtitle} ${WORLDS.css.description}`}
            </p>

            <div className="mt-4">
              <PixelProgressBar
                value={cssCompleted}
                max={CSS_LESSONS.length}
                label="Progress CSS World"
                segments={6}
                fillTone="pink"
              />
            </div>

            <ul className="mt-5 space-y-2 border-t-2 border-navy/15 pt-4 text-sm">
              {CSS_LESSONS.map((lesson) => (
                <li
                  key={lesson.id}
                  className="flex items-center justify-between gap-2 border-2 border-navy/25 bg-light-bg px-3 py-1.5"
                >
                  <span className="font-semibold text-navy">
                    Level {lesson.id}: {lesson.title}
                  </span>
                  <span className="font-mono text-xs text-navy">
                    {CSS_WORLD_LOCKED
                      ? 'TERKUNCI'
                      : `+${lesson.xpChallenge + lesson.xpLevel} XP`}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            {CSS_WORLD_LOCKED ? (
              <PixelButton
                variant="secondary"
                size="md"
                disabled
                className="flex-1"
              >
                <PixelLockIcon size={16} />
                <span>CSS WORLD TERKUNCI</span>
              </PixelButton>
            ) : (
              <PixelButton
                to="/world/css"
                variant="accent"
                size="md"
                onClick={() => playSfx('click', progress.soundEnabled)}
                className="flex-1"
              >
                BUKA PETA CSS
              </PixelButton>
            )}
          </div>
        </PixelCard>
      </div>

      <div className="mt-6">
        <PixelDialog speaker="TIPS PEMULA">
          {CSS_WORLD_LOCKED ? (
            <>
              Mulai petualanganmu di <strong>HTML World Level 1</strong> terlebih
              dahulu. Setiap level berikutnya akan otomatis terbuka setelah
              level sebelumnya selesai. <strong>CSS World</strong> saat ini
              masih dikunci sementara.
            </>
          ) : (
            <>
              Belum tahu harus mulai dari mana? Kamu bebas masuk ke{' '}
              <strong>HTML World Level 1</strong> terlebih dahulu, lalu coba juga{' '}
              <strong>CSS World Level 1</strong> kapan saja. Setiap level
              berikutnya akan otomatis terbuka setelah level sebelumnya selesai.
            </>
          )}
        </PixelDialog>
      </div>
    </div>
  );
}

