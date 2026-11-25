import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LeaderboardSection } from '../components/LeaderboardSection';
import { PixelBadge } from '../components/PixelBadge';
import { PixelButton } from '../components/PixelButton';
import { PixelCharacter } from '../components/PixelCharacter';
import { PixelDialog } from '../components/PixelDialog';
import {
  PixelCheckIcon,
  PixelHeartIcon,
  PixelStarIcon,
  PixelTrophyIcon,
} from '../components/PixelIcons';
import { PixelProgressBar } from '../components/PixelProgressBar';
import {
  PixelBrickPlatform,
  PixelCitySkyline,
  PixelClouds,
  PixelTree,
  PixelUtilityPole,
} from '../components/PixelScene';
import { StudentAuthCard } from '../components/StudentAuthCard';
import { CSS_LESSONS } from '../data/cssLessons';
import { HTML_LESSONS } from '../data/htmlLessons';
import { WORLDS } from '../data/worlds';
import type { StudentUser } from '../services/supabaseAuth';
import type { PlayerProgress } from '../types/progress';
import { getNextPlayableTarget } from '../utils/progressManager';
import { playSfx } from '../utils/soundFx';

interface HomePageProps {
  progress: PlayerProgress;
  totalLevels: number;
  htmlCompleted: number;
  cssCompleted: number;
  totalCompleted: number;
  completionPercent: number;
  currentUser: StudentUser | null;
  onLogin: (nim: string, password: string) => Promise<{ success: boolean; error?: string }>;
  onRegister: (nama: string, nim: string, password: string) => Promise<{ success: boolean; error?: string }>;
  onLogout: () => void;
  onSync: () => Promise<{ success: boolean; error?: string }>;
}

const LEFT_NPC_LINES = [
  'Siap belajar coding dari nol?',
  'Mulai dari tag <h1> dan lihat hasilnya langsung di layar!',
  'Jangan takut salah. Kamu bisa klik HINT kapan saja!',
];

const RIGHT_NPC_LINES = [
  'Setiap baris kode membawa kamu lebih dekat ke level berikutnya!',
  'Setelah struktur HTML siap, hias tampilannya di CSS World!',
  'Kumpulkan XP dan buka semua 4 achievement badge!',
];

export function HomePage({
  progress,
  totalLevels,
  htmlCompleted,
  cssCompleted,
  totalCompleted,
  completionPercent,
  currentUser,
  onLogin,
  onRegister,
  onLogout,
  onSync,
}: HomePageProps) {
  const [bootSegments, setBootSegments] = useState(4);
  const [leftSpeechIdx, setLeftSpeechIdx] = useState(0);
  const [rightSpeechIdx, setRightSpeechIdx] = useState(0);
  const [heartNote, setHeartNote] = useState<string | null>(null);

  useEffect(() => {
    const t1 = window.setTimeout(() => setBootSegments(9), 180);
    const t2 = window.setTimeout(() => setBootSegments(14), 380);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  const nextTarget = getNextPlayableTarget(progress);

  const handleLeftNpc = () => {
    playSfx('click', progress.soundEnabled);
    setLeftSpeechIdx((i) => (i + 1) % LEFT_NPC_LINES.length);
  };

  const handleRightNpc = () => {
    playSfx('click', progress.soundEnabled);
    setRightSpeechIdx((i) => (i + 1) % RIGHT_NPC_LINES.length);
  };

  return (
    <div className="bg-navy-slate px-3 py-5 sm:px-6 sm:py-8">
      <div className="mx-auto max-w-5xl">
        {/* Retro game loading bar header inspired directly by the visual reference */}
        <div className="mb-5 flex flex-col items-center text-center text-white">
          <div className="w-full max-w-sm">
            <PixelProgressBar
              value={totalCompleted > 0 ? totalCompleted : bootSegments}
              max={totalCompleted > 0 ? totalLevels : 14}
              segments={14}
              fillTone={totalCompleted > 0 ? 'pink' : 'sky'}
              showPercent={false}
            />
          </div>
          <p className="mt-2.5 font-pixel text-sm tracking-widest text-white sm:text-base">
            {totalCompleted > 0
              ? `QUEST PROGRESS ${totalCompleted}/${totalLevels}`
              : bootSegments < 14
                ? 'LOADING...'
                : 'READY TO PLAY!'}
          </p>
        </div>

        {/* Main pixel game screen frame */}
        <div className="pixel-box-lg overflow-hidden bg-light-bg">
          <section
            aria-label="Halaman utama CODE QUEST"
            className="relative overflow-hidden bg-gradient-to-b from-sky-blue via-pastel-pink/65 to-lavender/75"
          >
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 px-4 pt-4 sm:px-7 sm:pt-5">
              <div className="inline-flex items-center gap-2 border-2 border-navy bg-white/95 px-3 py-1.5">
                <span className="font-pixel text-[10px] text-navy sm:text-xs">
                  PLAYER LEVEL {progress.playerLevel}
                </span>
                <span className="font-mono text-xs font-bold text-navy">
                  ({progress.xp} XP)
                </span>
              </div>

              <button
                type="button"
                onClick={() => {
                  playSfx('click', progress.soundEnabled);
                  setHeartNote((prev) =>
                    prev
                      ? null
                      : '3 Nyawa Belajar: Ulangi tantangan coding sepuasnya tanpa penalti!'
                  );
                }}
                aria-label="Info nyawa belajar"
                className="inline-flex min-h-[44px] items-center gap-1.5 border-2 border-navy bg-white/95 px-2.5 py-1 hover:bg-light-bg"
              >
                <PixelHeartIcon size={20} filled />
                <PixelHeartIcon size={20} filled />
                <PixelHeartIcon size={20} filled />
              </button>
            </div>

            {heartNote && (
              <div className="relative z-10 mx-4 mt-2 flex items-center justify-between gap-2 border-2 border-navy bg-white px-3 py-2 text-xs font-semibold text-navy sm:mx-7">
                <span>{heartNote}</span>
                <button
                  type="button"
                  onClick={() => setHeartNote(null)}
                  className="min-h-[44px] min-w-[44px] border-2 border-navy bg-light-bg px-2 font-pixel text-[10px]"
                  aria-label="Tutup pesan nyawa"
                >
                  X
                </button>
              </div>
            )}

            <div className="relative z-10 mx-auto max-w-3xl px-4 pb-8 pt-6 text-center sm:px-6 sm:pt-8">
              <h1 className="font-pixel text-[clamp(1.35rem,5vw,2.75rem)] leading-tight text-navy">
                CODE QUEST
              </h1>
              <p className="mx-auto mt-3 max-w-xl text-base font-bold text-navy sm:text-lg">
                Petualangan pertama kamu di dunia coding
              </p>
              <p className="mx-auto mt-1 max-w-lg text-sm font-medium text-navy/90">
                Learn to code, one level at a time.
              </p>

              <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <PixelButton
                  to="/world"
                  variant="primary"
                  size="lg"
                  onClick={() => playSfx('click', progress.soundEnabled)}
                  className="w-full sm:w-auto"
                >
                  MULAI PETUALANGAN
                </PixelButton>
                <PixelButton
                  to={`/learn/${nextTarget.world}/${nextTarget.levelId}`}
                  variant="secondary"
                  size="lg"
                  onClick={() => playSfx('click', progress.soundEnabled)}
                  className="w-full sm:w-auto"
                >
                  LANJUTKAN GAME
                </PixelButton>
              </div>
            </div>

            {/* Pixel City Skyline & Two Talking Characters on Platform */}
            <div className="relative pt-4">
              <PixelCitySkyline className="absolute bottom-8 left-0 right-0 h-24 sm:h-28" />

              <div className="relative z-10 mx-auto grid max-w-4xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 sm:items-end sm:gap-8 sm:px-8">
                {/* Left Character + Dialogue */}
                <div className="flex flex-col items-start">
                  <div className="mb-3 max-w-xs">
                    <PixelDialog
                      speaker="KOKO"
                      pointer="left"
                      compact
                    >
                      <p className="font-semibold">
                        {LEFT_NPC_LINES[leftSpeechIdx]}
                      </p>
                    </PixelDialog>
                  </div>
                  <div className="flex items-end gap-2 pl-3">
                    <PixelCharacter
                      variant="cyan"
                      size={72}
                      interactive
                      label="Klik karakter Koko untuk mengganti dialog"
                      onInteract={handleLeftNpc}
                    />
                    <span className="mb-2 border-2 border-navy bg-white/95 px-2 py-0.5 font-mono text-[11px] font-semibold text-navy">
                      Klik Koko
                    </span>
                  </div>
                </div>

                {/* Right Character + Dialogue */}
                <div className="flex flex-col items-end">
                  <div className="mb-3 max-w-xs">
                    <PixelDialog
                      speaker="MINA"
                      pointer="right"
                      compact
                    >
                      <p className="font-semibold">
                        {RIGHT_NPC_LINES[rightSpeechIdx]}
                      </p>
                    </PixelDialog>
                  </div>
                  <div className="flex items-end gap-2 pr-3">
                    <span className="mb-2 border-2 border-navy bg-white/95 px-2 py-0.5 font-mono text-[11px] font-semibold text-navy">
                      Klik Mina
                    </span>
                    <PixelCharacter
                      variant="pink"
                      size={72}
                      interactive
                      label="Klik karakter Mina untuk mengganti dialog"
                      onInteract={handleRightNpc}
                    />
                  </div>
                </div>
              </div>

              <PixelBrickPlatform />
            </div>
          </section>

          {/* World selection and player progress diorama */}
          <section
            aria-label="Pilihan dunia belajar dan ringkasan progress"
            className="relative overflow-hidden bg-gradient-to-b from-lavender/75 via-pastel-pink/55 to-sky-blue/80 pt-8 sm:pt-12"
          >
            {/* Atmospheric pixel clouds, tree & utility pole inspired by reference */}
            <div className="pointer-events-none absolute inset-x-0 top-12 opacity-80">
              <PixelClouds />
            </div>
            <PixelTree className="absolute bottom-14 left-0 hidden h-64 w-32 opacity-90 lg:block" />
            <PixelUtilityPole className="absolute bottom-14 right-0 hidden h-60 w-44 opacity-85 lg:block" />

            <div className="relative z-10 mx-auto max-w-4xl px-4 pb-10 sm:px-8">
              {/* Student Supabase Cloud Auth & Adventure ID Card */}
              <div className="mb-10">
                <StudentAuthCard
                  currentUser={currentUser}
                  progress={progress}
                  onLogin={onLogin}
                  onRegister={onRegister}
                  onLogout={onLogout}
                  onSync={onSync}
                />
              </div>

              <div className="text-center">
                <h2 className="font-pixel text-base leading-relaxed text-navy sm:text-xl">
                  PILIH DUNIA BELAJAR KAMU
                </h2>
                <p className="mx-auto mt-2 max-w-lg text-sm font-medium text-navy">
                  Setiap level berisi cerita singkat, materi ringkas, dan editor
                  coding yang langsung bisa dicoba.
                </p>
              </div>

              {/* Staggered zigzag RPG boxes inspired by reference image */}
              <div className="mt-8 space-y-6">
                {/* HTML World RPG Card (stepped right on desktop) */}
                <div className="flex justify-start lg:justify-end">
                  <div className="pixel-dialog-frame w-full bg-white p-5 lg:w-[74%]">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <PixelBadge tone="sky">
                        <PixelStarIcon size={14} />
                        <span>DUNIA 1</span>
                      </PixelBadge>
                      <span className="font-mono text-xs font-bold text-navy">
                        {htmlCompleted}/{HTML_LESSONS.length} Level Selesai
                      </span>
                    </div>
                    <h3 className="mt-3 font-pixel text-sm text-navy sm:text-base">
                      {WORLDS.html.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-navy">
                      {WORLDS.html.subtitle} {WORLDS.html.description}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                      <div className="w-full sm:max-w-[220px]">
                        <PixelProgressBar
                          value={htmlCompleted}
                          max={HTML_LESSONS.length}
                          segments={6}
                          fillTone="blue"
                        />
                      </div>
                      <PixelButton
                        to="/world/html"
                        variant="primary"
                        size="sm"
                        onClick={() => playSfx('click', progress.soundEnabled)}
                      >
                        MASUK HTML WORLD
                      </PixelButton>
                    </div>
                  </div>
                </div>

                {/* CSS World RPG Card (stepped left on desktop) */}
                <div className="flex justify-start">
                  <div className="pixel-dialog-frame w-full bg-white p-5 lg:w-[74%]">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <PixelBadge tone="pink">
                        <PixelTrophyIcon size={14} />
                        <span>DUNIA 2</span>
                      </PixelBadge>
                      <span className="font-mono text-xs font-bold text-navy">
                        {cssCompleted}/{CSS_LESSONS.length} Level Selesai
                      </span>
                    </div>
                    <h3 className="mt-3 font-pixel text-sm text-navy sm:text-base">
                      {WORLDS.css.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-navy">
                      {WORLDS.css.subtitle} {WORLDS.css.description}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                      <div className="w-full sm:max-w-[220px]">
                        <PixelProgressBar
                          value={cssCompleted}
                          max={CSS_LESSONS.length}
                          segments={6}
                          fillTone="pink"
                        />
                      </div>
                      <PixelButton
                        to="/world/css"
                        variant="accent"
                        size="sm"
                        onClick={() => playSfx('click', progress.soundEnabled)}
                      >
                        MASUK CSS WORLD
                      </PixelButton>
                    </div>
                  </div>
                </div>
              </div>

              {/* Real Player Stats Bar */}
              <div className="mt-8 border-[3px] border-navy bg-white p-4 shadow-pixel sm:p-5">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <div className="border-2 border-navy bg-light-bg p-3">
                    <div className="font-pixel text-[10px] text-navy">
                      TOTAL LEVEL
                    </div>
                    <div className="mt-1.5 font-mono text-lg font-bold text-navy">
                      {totalLevels} Level
                    </div>
                  </div>
                  <div className="border-2 border-navy bg-light-bg p-3">
                    <div className="font-pixel text-[10px] text-navy">
                      PROGRESS BELAJAR
                    </div>
                    <div className="mt-1.5 font-mono text-lg font-bold text-navy">
                      {completionPercent}% ({totalCompleted}/{totalLevels})
                    </div>
                  </div>
                  <div className="border-2 border-navy bg-light-bg p-3">
                    <div className="font-pixel text-[10px] text-navy">
                      TOTAL XP
                    </div>
                    <div className="mt-1.5 font-mono text-lg font-bold text-navy">
                      {progress.xp} XP
                    </div>
                  </div>
                  <div className="border-2 border-navy bg-light-bg p-3">
                    <div className="font-pixel text-[10px] text-navy">
                      PLAYER LEVEL
                    </div>
                    <div className="mt-1.5 font-mono text-lg font-bold text-navy">
                      Level {progress.playerLevel}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t-2 border-navy/20 pt-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-navy">
                    <PixelCheckIcon size={16} />
                    <span>
                      Achievement terbuka: {progress.achievements.length} / 4
                      badge
                    </span>
                  </div>
                  <Link
                    to="/profile"
                    onClick={() => playSfx('click', progress.soundEnabled)}
                    className="inline-flex min-h-[44px] items-center border-2 border-navy bg-lavender px-3.5 py-2 font-pixel text-[10px] text-navy hover:bg-[#D5C8FF]"
                  >
                    BUKA PROFIL &amp; BADGE
                  </Link>
                </div>
              </div>

              {/* Speedrun Leaderboard Section */}
              <div className="mt-8">
                <LeaderboardSection
                  currentUser={currentUser}
                  soundEnabled={progress.soundEnabled}
                />
              </div>
            </div>

            {/* Stepped Pink Brick Ground with Running Pixel Hero from Reference */}
            <div className="relative flex items-end justify-between px-4 sm:px-8">
              <div className="h-6 w-28 border-2 border-b-0 border-navy bg-pastel-pink sm:w-44" />
              <div className="flex items-end gap-3">
                <PixelCharacter
                  variant="runner"
                  size={56}
                  interactive
                  label="Klik pelari pixel"
                  onInteract={() => playSfx('click', progress.soundEnabled)}
                />
              </div>
            </div>
            <div className="pixel-pink-brick-row h-9 w-full border-t-[3px] border-navy" />
          </section>
        </div>
      </div>
    </div>
  );
}
