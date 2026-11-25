import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PixelBadge } from '../components/PixelBadge';
import { PixelButton } from '../components/PixelButton';
import { PixelCard } from '../components/PixelCard';
import { PixelCharacter } from '../components/PixelCharacter';
import {
  PixelCheckIcon,
  PixelLockIcon,
  PixelTrophyIcon,
} from '../components/PixelIcons';
import { PixelProgressBar } from '../components/PixelProgressBar';
import { CSS_LESSONS } from '../data/cssLessons';
import { HTML_LESSONS } from '../data/htmlLessons';
import { ACHIEVEMENTS } from '../data/worlds';
import type { StudentUser } from '../services/supabaseAuth';
import type { PlayerProgress } from '../types/progress';
import { getXpWithinCurrentLevel } from '../utils/progressManager';
import { playSfx } from '../utils/soundFx';

interface ProfilePageProps {
  progress: PlayerProgress;
  currentUser: StudentUser | null;
  totalLevels: number;
  htmlCompleted: number;
  cssCompleted: number;
  totalCompleted: number;
  completionPercent: number;
  onResetProgress: () => void;
  onSync: () => Promise<{ success: boolean; error?: string }>;
  onLogout: () => void;
}

export function ProfilePage({
  progress,
  currentUser,
  totalLevels,
  htmlCompleted,
  cssCompleted,
  totalCompleted,
  completionPercent,
  onResetProgress,
  onSync,
  onLogout,
}: ProfilePageProps) {
  const [confirmReset, setConfirmReset] = useState(false);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);
  const xpIntoLevel = getXpWithinCurrentLevel(progress.xp);

  const handleManualSync = async () => {
    playSfx('click', progress.soundEnabled);
    setSyncStatus('Menyinkronkan progress ke database Supabase...');
    const res = await onSync();
    if (res.success) {
      playSfx('victory', progress.soundEnabled);
      setSyncStatus('Progress berhasil disinkronkan ke Supabase!');
      setTimeout(() => setSyncStatus(null), 3500);
    } else {
      setSyncStatus(res.error || 'Gagal menyinkronkan data.');
      setTimeout(() => setSyncStatus(null), 5000);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-10">
      {/* Player Hero Card */}
      <div className="pixel-box bg-gradient-to-r from-sky-blue/85 via-light-bg to-pastel-pink/75 p-5 sm:p-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="border-[3px] border-navy bg-white p-2 shadow-pixel-sm">
              <PixelCharacter variant="cyan" size={64} />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <PixelBadge tone="navy">
                  PLAYER LEVEL {progress.playerLevel}
                </PixelBadge>
                {currentUser ? (
                  <PixelBadge tone="mint">
                    <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse mr-1" />
                    SUPABASE CLOUD
                  </PixelBadge>
                ) : (
                  <PixelBadge tone="lavender">MODE TAMU LOKAL</PixelBadge>
                )}
              </div>

              <h1 className="mt-2 font-pixel text-base text-navy sm:text-xl">
                {currentUser ? currentUser.nama : 'PETUALANG TAMU'}
              </h1>

              {currentUser && (
                <p className="mt-0.5 font-mono text-xs font-bold text-navy">
                  NIM: {currentUser.nim}
                </p>
              )}

              <p className="mt-1 font-mono text-sm font-bold text-navy">
                Total XP: {progress.xp} XP | Selesai: {totalCompleted}/
                {totalLevels} Level ({completionPercent}%)
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {currentUser ? (
              <button
                type="button"
                onClick={handleManualSync}
                className="inline-flex min-h-[44px] items-center border-2 border-navy bg-mint-green px-3.5 py-2 font-pixel text-[10px] text-navy hover:bg-[#86E4B4]"
              >
                SINKRON SUPABASE
              </button>
            ) : (
              <Link
                to="/"
                onClick={() => playSfx('click', progress.soundEnabled)}
                className="inline-flex min-h-[44px] items-center border-2 border-navy bg-sky-blue px-3.5 py-2 font-pixel text-[10px] text-navy hover:bg-[#BAE1FF]"
              >
                MASUK / DAFTAR
              </Link>
            )}

            <PixelButton
              to="/world"
              variant="primary"
              size="md"
              onClick={() => playSfx('click', progress.soundEnabled)}
            >
              PILIH DUNIA
            </PixelButton>
          </div>
        </div>

        {syncStatus && (
          <div className="mt-4 flex items-center gap-2 border-2 border-navy bg-white px-3 py-2 text-xs font-semibold text-navy">
            <PixelCheckIcon size={16} />
            <span>{syncStatus}</span>
          </div>
        )}

        <div className="mt-5 border-[3px] border-navy bg-white p-4">
          <PixelProgressBar
            value={xpIntoLevel.current}
            max={xpIntoLevel.needed}
            label={`XP Menuju Level ${progress.playerLevel + 1} (${xpIntoLevel.current}/${xpIntoLevel.needed} XP)`}
            segments={10}
            fillTone="pink"
          />
        </div>
      </div>

      {/* Empty State when player has not completed any mission yet */}
      {totalCompleted === 0 && (
        <div className="mt-6 border-[3px] border-navy bg-white p-5 shadow-pixel">
          <h2 className="font-pixel text-xs text-navy sm:text-sm">
            BELUM ADA MISI YANG SELESAI
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-navy">
            Progress belajar kamu saat ini masih 0%. Mulai dari{' '}
            <strong>HTML World Level 1</strong> untuk mendapatkan +150 XP dan
            membuka badge <strong>First Code</strong> pertamamu!
          </p>
          <div className="mt-4">
            <PixelButton to="/learn/html/1" variant="accent" size="sm">
              MULAI HTML LEVEL 1
            </PixelButton>
          </div>
        </div>
      )}

      {/* World Completion Breakdown */}
      <div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-2">
        <PixelCard tone="white">
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-pixel text-xs text-navy sm:text-sm">
              HTML WORLD
            </h2>
            <span className="font-mono text-xs font-bold text-navy">
              {htmlCompleted}/{HTML_LESSONS.length} Level
            </span>
          </div>
          <div className="mt-3">
            <PixelProgressBar
              value={htmlCompleted}
              max={HTML_LESSONS.length}
              segments={6}
              fillTone="blue"
            />
          </div>
          <div className="mt-4">
            <PixelButton to="/world/html" variant="primary" size="sm">
              LIHAT PETA HTML
            </PixelButton>
          </div>
        </PixelCard>

        <PixelCard tone="white">
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-pixel text-xs text-navy sm:text-sm">
              CSS WORLD
            </h2>
            <span className="font-mono text-xs font-bold text-navy">
              {cssCompleted}/{CSS_LESSONS.length} Level
            </span>
          </div>
          <div className="mt-3">
            <PixelProgressBar
              value={cssCompleted}
              max={CSS_LESSONS.length}
              segments={6}
              fillTone="pink"
            />
          </div>
          <div className="mt-4">
            <PixelButton to="/world/css" variant="accent" size="sm">
              LIHAT PETA CSS
            </PixelButton>
          </div>
        </PixelCard>
      </div>

      {/* Achievements */}
      <section aria-label="Daftar achievement" className="mt-7">
        <h2 className="font-pixel text-sm text-navy sm:text-base">
          ACHIEVEMENT BADGE ({progress.achievements.length}/{ACHIEVEMENTS.length})
        </h2>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {ACHIEVEMENTS.map((ach) => {
            const unlocked = progress.achievements.includes(ach.id);
            return (
              <div
                key={ach.id}
                className={`border-[3px] border-navy p-4 ${
                  unlocked
                    ? 'bg-white shadow-pixel'
                    : 'bg-[#ECE6F7] opacity-85'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`border-2 border-navy p-2 ${
                        unlocked ? 'bg-pastel-pink' : 'bg-lavender'
                      }`}
                    >
                      {unlocked ? (
                        <PixelTrophyIcon size={20} />
                      ) : (
                        <PixelLockIcon size={20} />
                      )}
                    </div>
                    <div>
                      <h3 className="font-pixel text-xs text-navy">
                        {ach.title}
                      </h3>
                      <p className="mt-1 text-xs font-semibold text-navy/80">
                        Syarat: {ach.requirementLabel}
                      </p>
                    </div>
                  </div>

                  {unlocked ? (
                    <PixelBadge tone="mint">
                      <PixelCheckIcon size={12} />
                      <span>TERBUKA</span>
                    </PixelBadge>
                  ) : (
                    <PixelBadge tone="lavender">TERKUNCI</PixelBadge>
                  )}
                </div>

                <p className="mt-3 text-sm leading-relaxed text-navy">
                  {ach.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Progress Reset & Account Control */}
      <section
        aria-label="Pengaturan penyimpanan progress dan akun"
        className="mt-8 border-[3px] border-navy bg-white p-4 shadow-pixel sm:p-5"
      >
        {currentUser && (
          <div className="mb-4 flex flex-col justify-between gap-3 border-b-2 border-navy/20 pb-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-pixel text-xs text-navy">
                AKUN SUPABASE AKTIF: {currentUser.nim}
              </h2>
              <p className="mt-1 text-sm text-navy/90">
                Terhubung sebagai <strong>{currentUser.nama}</strong>. Data XP
                dan level disinkronkan ke database Supabase.
              </p>
            </div>
            <button
              type="button"
              onClick={onLogout}
              className="inline-flex min-h-[44px] items-center border-2 border-navy bg-pastel-pink px-4 py-2 font-pixel text-[10px] text-navy hover:bg-[#FFB0DF]"
            >
              KELUAR DARI AKUN
            </button>
          </div>
        )}

        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-pixel text-xs text-navy">
              PENGATURAN PROGRESS LOKAL
            </h2>
            <p className="mt-1 text-sm text-navy/90">
              Seluruh XP, level, dan kode latihanmu disimpan di browser ini (localStorage).
              {currentUser && ' Reset lokal tidak akan menghapus akunmu di Supabase.'}
            </p>
          </div>

          {!confirmReset ? (
            <PixelButton
              variant="secondary"
              size="sm"
              onClick={() => setConfirmReset(true)}
            >
              RESET PROGRESS
            </PixelButton>
          ) : (
            <div className="flex flex-wrap items-center gap-2">
              <PixelButton
                variant="accent"
                size="sm"
                onClick={() => {
                  onResetProgress();
                  setConfirmReset(false);
                }}
              >
                KONFIRMASI HAPUS
              </PixelButton>
              <PixelButton
                variant="secondary"
                size="sm"
                onClick={() => setConfirmReset(false)}
              >
                BATAL
              </PixelButton>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

