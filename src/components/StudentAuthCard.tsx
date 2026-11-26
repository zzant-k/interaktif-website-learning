import React, { useState } from 'react';
import type { StudentUser } from '../services/supabaseAuth';
import type { PlayerProgress } from '../types/progress';
import { playSfx } from '../utils/soundFx';
import { PixelBadge } from './PixelBadge';
import { PixelButton } from './PixelButton';
import { PixelCharacter } from './PixelCharacter';
import { PixelCheckIcon, PixelLockIcon } from './PixelIcons';

interface StudentAuthCardProps {
  currentUser: StudentUser | null;
  progress: PlayerProgress;
  onLogin: (nim: string, password: string) => Promise<{ success: boolean; error?: string }>;
  onRegister: (nama: string, nim: string, password: string) => Promise<{ success: boolean; error?: string }>;
  onLogout: () => void;
  onSync: () => Promise<{ success: boolean; error?: string }>;
}

export function StudentAuthCard({
  currentUser,
  progress,
  onLogin,
  onRegister,
  onLogout,
  onSync,
}: StudentAuthCardProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [nama, setNama] = useState('');
  const [nim, setNim] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    playSfx('click', progress.soundEnabled);

    if (!nim.trim()) {
      setErrorMessage('NIM mahasiswa wajib diisi.');
      return;
    }

    if (!password) {
      setErrorMessage('Password wajib diisi.');
      return;
    }

    if (activeTab === 'register') {
      if (!nama.trim()) {
        setErrorMessage('Nama lengkap mahasiswa wajib diisi.');
        return;
      }
      if (password.length < 6) {
        setErrorMessage('Password minimal 6 karakter.');
        return;
      }

      setLoading(true);
      const res = await onRegister(nama, nim, password);
      setLoading(false);

      if (res.success) {
        playSfx('victory', progress.soundEnabled);
        setSuccessMessage('Akun berhasil dibuat dan terhubung ke database Supabase!');
        setPassword('');
      } else {
        setErrorMessage(res.error || 'Gagal mendaftarkan akun.');
      }
    } else {
      setLoading(true);
      const res = await onLogin(nim, password);
      setLoading(false);

      if (res.success) {
        playSfx('victory', progress.soundEnabled);
        setSuccessMessage('Selamat datang kembali! Akun terhubung ke Supabase.');
        setPassword('');
      } else {
        setErrorMessage(res.error || 'Gagal masuk akun. Periksa NIM dan password kamu.');
      }
    }
  };

  const handleManualSync = async () => {
    playSfx('click', progress.soundEnabled);
    setSyncStatus('Menyinkronkan ke Supabase...');
    const res = await onSync();
    if (res.success) {
      playSfx('victory', progress.soundEnabled);
      setSyncStatus('Progress berhasil tersimpan di Supabase!');
      setTimeout(() => setSyncStatus(null), 3500);
    } else {
      setSyncStatus(res.error || 'Gagal menyinkronkan data.');
      setTimeout(() => setSyncStatus(null), 5000);
    }
  };

  return (
    <div className="border-[3px] border-navy bg-white shadow-pixel">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-navy bg-gradient-to-r from-sky-blue/90 via-lavender to-pastel-pink/90 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="border-2 border-navy bg-white p-1">
            <PixelLockIcon size={16} />
          </div>
          <div>
            <h2 className="font-pixel text-xs text-navy sm:text-sm">
              AKUN MAHASISWA
            </h2>
            <p className="text-[11px] font-semibold text-navy/80">
              Sinkronisasi data XP, level, dan misi ke server Supabase
            </p>
          </div>
        </div>

        {currentUser ? (
          <PixelBadge tone="mint">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          </PixelBadge>
        ) : (
          <PixelBadge tone="lavender">
            <span>MODE LOKAL</span>
          </PixelBadge>
        )}
      </div>

      <div className="p-4 sm:p-6">
        {currentUser ? (
          /* Logged In View: Student ID Adventure Card */
          <div className="space-y-4">
            <div className="flex flex-col gap-4 border-2 border-navy bg-light-bg p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3.5">
                <div className="border-2 border-navy bg-white p-2">
                  <PixelCharacter variant="cyan" size={48} />
                </div>
                <div>
                  <div className="font-pixel text-[10px] text-navy/70">
                    IDENTITAS MAHASISWA
                  </div>
                  <div className="font-pixel text-sm text-navy sm:text-base">
                    {currentUser.nama}
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <span className="border border-navy bg-white px-2 py-0.5 font-mono text-xs font-bold text-navy">
                      NIM: {currentUser.nim}
                    </span>
                    <span className="font-mono text-xs font-semibold text-navy/80">
                      Level {progress.playerLevel} ({progress.xp} XP)
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleManualSync}
                  className="inline-flex min-h-[44px] items-center border-2 border-navy bg-mint-green px-3.5 py-2 font-pixel text-[10px] text-navy hover:bg-[#86E4B4]"
                >
                  SINKRONKAN PROGRESS
                </button>

                {!showLogoutConfirm ? (
                  <button
                    type="button"
                    onClick={() => setShowLogoutConfirm(true)}
                    className="inline-flex min-h-[44px] items-center border-2 border-navy bg-pastel-pink px-3 py-2 font-pixel text-[10px] text-navy hover:bg-[#FFB0DF]"
                  >
                    KELUAR
                  </button>
                ) : (
                  <div className="flex items-center gap-1.5 border-2 border-navy bg-white p-1">
                    <span className="font-pixel text-[9px] text-navy px-1">
                      YAKIN?
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setShowLogoutConfirm(false);
                        onLogout();
                      }}
                      className="inline-flex min-h-[44px] items-center border border-navy bg-rose-warn px-2 font-pixel text-[9px] text-rose-ink"
                    >
                      YA
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowLogoutConfirm(false)}
                      className="inline-flex min-h-[44px] items-center border border-navy bg-light-bg px-2 font-pixel text-[9px] text-navy"
                    >
                      BATAL
                    </button>
                  </div>
                )}
              </div>
            </div>

            {syncStatus && (
              <div className="flex items-center gap-2 border-2 border-navy bg-sky-blue/30 px-3 py-2 text-xs font-semibold text-navy">
                <PixelCheckIcon size={16} />
                <span>{syncStatus}</span>
              </div>
            )}
          </div>
        ) : (
          /* Not Logged In View: Tabs & Form */
          <div>
            {/* Tabs */}
            <div className="mb-4 flex border-b-2 border-navy">
              <button
                type="button"
                onClick={() => {
                  playSfx('click', progress.soundEnabled);
                  setActiveTab('login');
                  setErrorMessage(null);
                  setSuccessMessage(null);
                }}
                className={`flex-1 border-t-2 border-x-2 border-navy py-2.5 font-pixel text-xs transition-colors ${
                  activeTab === 'login'
                    ? 'bg-sky-blue text-navy font-bold shadow-pixel-sm'
                    : 'bg-white text-navy/70 hover:bg-light-bg'
                }`}
              >
                MASUK (LOGIN)
              </button>
              <button
                type="button"
                onClick={() => {
                  playSfx('click', progress.soundEnabled);
                  setActiveTab('register');
                  setErrorMessage(null);
                  setSuccessMessage(null);
                }}
                className={`flex-1 border-t-2 border-x-2 border-navy py-2.5 font-pixel text-xs transition-colors ${
                  activeTab === 'register'
                    ? 'bg-pastel-pink text-navy font-bold shadow-pixel-sm'
                    : 'bg-white text-navy/70 hover:bg-light-bg'
                }`}
              >
                DAFTAR
              </button>
            </div>

            <p className="mb-4 text-xs font-medium leading-relaxed text-navy sm:text-sm">
              {activeTab === 'login'
                ? 'Masukkan NIM dan password yang sudah terdaftar untuk melanjutkan petualangan coding kamu.'
                : 'Daftarkan nama, NIM, dan password untuk membuat profil petualang baru di database Supabase.'}
            </p>

            {errorMessage && (
              <div
                role="alert"
                className="mb-4 border-2 border-navy bg-rose-warn p-3 text-xs font-semibold text-rose-ink"
              >
                {errorMessage}
              </div>
            )}

            {successMessage && (
              <div
                role="status"
                className="mb-4 flex items-center gap-2 border-2 border-navy bg-mint-green/40 p-3 text-xs font-semibold text-navy"
              >
                <PixelCheckIcon size={16} />
                <span>{successMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {activeTab === 'register' && (
                <div>
                  <label
                    htmlFor="student-nama"
                    className="block font-pixel text-[10px] text-navy mb-1.5"
                  >
                    NAMA LENGKAP MAHASISWA
                  </label>
                  <input
                    id="student-nama"
                    type="text"
                    required
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    placeholder="Contoh: Dany Pratama"
                    className="w-full border-2 border-navy bg-light-bg px-3 py-2 font-mono text-sm text-navy placeholder:text-navy/50 focus:border-navy focus:bg-white focus:outline-none"
                  />
                </div>
              )}

              <div>
                <label
                  htmlFor="student-nim"
                  className="block font-pixel text-[10px] text-navy mb-1.5"
                >
                  NIM MAHASISWA
                </label>
                <input
                  id="student-nim"
                  type="text"
                  required
                  value={nim}
                  onChange={(e) => setNim(e.target.value)}
                  placeholder="Contoh: 211011400123"
                  className="w-full border-2 border-navy bg-light-bg px-3 py-2 font-mono text-sm text-navy uppercase placeholder:text-navy/50 focus:border-navy focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="student-password"
                  className="block font-pixel text-[10px] text-navy mb-1.5"
                >
                  PASSWORD {activeTab === 'register' && '(MINIMAL 6 KARAKTER)'}
                </label>
                <input
                  id="student-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="******"
                  className="w-full border-2 border-navy bg-light-bg px-3 py-2 font-mono text-sm text-navy placeholder:text-navy/50 focus:border-navy focus:bg-white focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <PixelButton
                  type="submit"
                  variant={activeTab === 'login' ? 'primary' : 'accent'}
                  size="md"
                  disabled={loading}
                  className="w-full"
                >
                  {loading
                    ? 'MENGHUBUNGI SUPABASE...'
                    : activeTab === 'login'
                      ? 'MASUK KE AKUN MAHASISWA'
                      : 'DAFTAR'}
                </PixelButton>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
