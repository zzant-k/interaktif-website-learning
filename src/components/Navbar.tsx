import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import type { StudentUser } from '../services/supabaseAuth';
import type { PlayerProgress } from '../types/progress';
import { playSfx } from '../utils/soundFx';
import { PixelCodeIcon, PixelHeartIcon, PixelSoundIcon } from './PixelIcons';

interface NavbarProps {
  progress: PlayerProgress;
  currentUser?: StudentUser | null;
  onToggleSound: () => void;
}

export function Navbar({ progress, currentUser, onToggleSound }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `inline-flex min-h-[44px] items-center border-2 border-navy px-3 py-2 font-pixel text-[10px] transition-colors ${
      isActive
        ? 'bg-pastel-pink text-navy shadow-pixel-sm'
        : 'bg-white text-navy hover:bg-sky-blue'
    }`;

  return (
    <header className="sticky top-0 z-40 border-b-[3px] border-navy bg-light-bg">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2.5">
        <Link
          to="/"
          onClick={() => playSfx('click', progress.soundEnabled)}
          className="inline-flex min-h-[44px] items-center gap-2.5 border-2 border-navy bg-sky-blue px-3 py-1.5 font-pixel text-xs text-navy shadow-pixel-sm hover:bg-[#BAE1FF]"
        >
          <PixelCodeIcon size={18} />
          <span>CODE QUEST</span>
        </Link>

        {/* Desktop navigation */}
        <nav
          aria-label="Navigasi utama"
          className="hidden items-center gap-2.5 md:flex"
        >
          <NavLink
            to="/"
            end
            className={navClass}
            onClick={() => playSfx('click', progress.soundEnabled)}
          >
            BERANDA
          </NavLink>
          <NavLink
            to="/world"
            className={navClass}
            onClick={() => playSfx('click', progress.soundEnabled)}
          >
            PILIH DUNIA
          </NavLink>
          <NavLink
            to="/leaderboard"
            className={navClass}
            onClick={() => playSfx('click', progress.soundEnabled)}
          >
            LEADERBOARD
          </NavLink>
          <NavLink
            to="/profile"
            className={navClass}
            onClick={() => playSfx('click', progress.soundEnabled)}
          >
            PROFIL
          </NavLink>
        </nav>

        {/* Live HUD & mobile menu trigger */}
        <div className="flex items-center gap-2">
          {currentUser ? (
            <Link
              to="/profile"
              onClick={() => playSfx('click', progress.soundEnabled)}
              className="hidden items-center gap-1.5 border-2 border-navy bg-mint-green/60 px-2 py-1 hover:bg-mint-green sm:flex"
              title={`Akun Mahasiswa: ${currentUser.nama} (NIM: ${currentUser.nim})`}
            >
              <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
              <span className="font-mono text-xs font-bold text-navy">
                {currentUser.nim}
              </span>
            </Link>
          ) : (
            <Link
              to="/"
              onClick={() => playSfx('click', progress.soundEnabled)}
              className="hidden items-center gap-1 border-2 border-navy bg-white px-2 py-1 font-pixel text-[9px] text-navy hover:bg-sky-blue sm:flex"
              title="Hubungkan akun mahasiswa di Beranda"
            >
              <span>LOGIN</span>
            </Link>
          )}

          <div className="hidden items-center gap-2 border-2 border-navy bg-white px-2.5 py-1.5 sm:flex">
            <PixelHeartIcon size={16} filled />
            <span className="font-pixel text-[10px] text-navy">
              LV.{progress.playerLevel}
            </span>
            <span className="font-mono text-xs font-bold text-navy">
              {progress.xp} XP
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              onToggleSound();
            }}
            aria-label={
              progress.soundEnabled
                ? 'Matikan efek suara retro'
                : 'Nyalakan efek suara retro'
            }
            aria-pressed={progress.soundEnabled}
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center border-2 border-navy bg-white px-2.5 text-navy hover:bg-lavender"
            title={progress.soundEnabled ? 'Suara Aktif' : 'Suara Nonaktif'}
          >
            <PixelSoundIcon size={18} enabled={progress.soundEnabled} />
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-drawer"
            className="inline-flex min-h-[44px] items-center gap-1.5 border-2 border-navy bg-lavender px-3 font-pixel text-[10px] text-navy md:hidden"
          >
            <span>{menuOpen ? 'TUTUP' : 'MENU'}</span>
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {menuOpen && (
        <nav
          id="mobile-nav-drawer"
          aria-label="Navigasi seluler"
          className="border-t-[3px] border-navy bg-white px-4 py-3 md:hidden"
        >
          {currentUser ? (
            <div className="mb-3 flex items-center justify-between border-2 border-navy bg-mint-green/40 px-3 py-2">
              <span className="font-pixel text-[10px] text-navy">
                MAHASISWA: {currentUser.nim}
              </span>
              <span className="font-mono text-xs font-bold text-navy">
                {currentUser.nama}
              </span>
            </div>
          ) : (
            <div className="mb-3 flex items-center justify-between border-2 border-navy bg-light-bg px-3 py-2">
              <span className="font-pixel text-[9px] text-navy">
                STATUS: MODE TAMU LOKAL
              </span>
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="font-pixel text-[9px] text-navy underline"
              >
                MASUK / DAFTAR
              </Link>
            </div>
          )}

          <div className="mb-3 flex items-center justify-between border-2 border-navy bg-light-bg px-3 py-2 sm:hidden">
            <span className="font-pixel text-[10px] text-navy">
              PLAYER LV.{progress.playerLevel}
            </span>
            <span className="font-mono text-xs font-bold text-navy">
              {progress.xp} XP
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <NavLink
              to="/"
              end
              className={navClass}
              onClick={() => setMenuOpen(false)}
            >
              BERANDA
            </NavLink>
            <NavLink
              to="/world"
              className={navClass}
              onClick={() => setMenuOpen(false)}
            >
              PILIH DUNIA
            </NavLink>
            <NavLink
              to="/leaderboard"
              className={navClass}
              onClick={() => setMenuOpen(false)}
            >
              LEADERBOARD
            </NavLink>
            <NavLink
              to="/profile"
              className={navClass}
              onClick={() => setMenuOpen(false)}
            >
              PROFIL &amp; BADGE
            </NavLink>
          </div>
        </nav>
      )}
    </header>
  );
}

