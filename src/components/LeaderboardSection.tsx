import { useEffect, useState } from 'react';
import {
  fetchLeaderboard,
  formatSpeedrunTime,
  type LeaderboardEntry,
  type StudentUser,
} from '../services/supabaseAuth';
import { playSfx } from '../utils/soundFx';
import { PixelBadge } from './PixelBadge';
import { PixelButton } from './PixelButton';
import { PixelCharacter } from './PixelCharacter';
import {
  PixelCheckIcon,
  PixelStarIcon,
  PixelTrophyIcon,
} from './PixelIcons';

interface LeaderboardSectionProps {
  currentUser: StudentUser | null;
  soundEnabled?: boolean;
}

export function LeaderboardSection({
  currentUser,
  soundEnabled = true,
}: LeaderboardSectionProps) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortMode, setSortMode] = useState<'time' | 'fastest'>('time');

  const loadData = async (mode: 'time' | 'fastest') => {
    setLoading(true);
    setError(null);
    const res = await fetchLeaderboard(mode);
    if (res.success) {
      setEntries(res.leaderboard);
    } else {
      setError(res.error || 'Gagal memuat papan peringkat.');
    }
    setLoading(false);
  };

  useEffect(() => {
    void loadData(sortMode);
  }, [sortMode]);

  const handleRefresh = () => {
    playSfx('click', soundEnabled);
    void loadData(sortMode);
  };

  const handleModeChange = (mode: 'time' | 'fastest') => {
    playSfx('click', soundEnabled);
    setSortMode(mode);
  };

  const top3 = entries.slice(0, 3);

  return (
    <section
      id="leaderboard"
      aria-label="Papan Peringkat Speedrun"
      className="border-[3px] border-navy bg-white shadow-pixel"
    >
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-navy bg-gradient-to-r from-pastel-pink via-lavender to-sky-blue px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2.5">
          <div className="border-2 border-navy bg-white p-1.5 shadow-pixel-sm">
            <PixelTrophyIcon size={20} />
          </div>
          <div>
            <h2 className="font-pixel text-xs text-navy sm:text-base">
              LEADERBOARD
            </h2>
            <p className="text-[11px] font-semibold text-navy/80 sm:text-xs">
              Peringkat petualang coding tercepat dari database Supabase
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleRefresh}
            disabled={loading}
            className="inline-flex min-h-[44px] items-center border-2 border-navy bg-white px-3 py-1.5 font-pixel text-[10px] text-navy hover:bg-light-bg"
            title="Muat ulang data papan peringkat"
          >
            {loading ? 'MEMUAT...' : 'REFRESH DATA'}
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        {/* Sort mode tabs */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b-2 border-navy/20 pb-4">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleModeChange('time')}
              className={`inline-flex min-h-[44px] items-center border-2 border-navy px-3.5 py-2 font-pixel text-[10px] transition-colors ${
                sortMode === 'time'
                  ? 'bg-sky-blue text-navy shadow-pixel-sm font-bold'
                  : 'bg-white text-navy/70 hover:bg-light-bg'
              }`}
            >
              LEVEL &amp; WAKTU TERCEPAT
            </button>
            <button
              type="button"
              onClick={() => handleModeChange('fastest')}
              className={`inline-flex min-h-[44px] items-center border-2 border-navy px-3.5 py-2 font-pixel text-[10px] transition-colors ${
                sortMode === 'fastest'
                  ? 'bg-pastel-pink text-navy shadow-pixel-sm font-bold'
                  : 'bg-white text-navy/70 hover:bg-light-bg'
              }`}
            >
              PURE SPEEDRUN (TOTAL WAKTU)
            </button>
          </div>

          <div className="text-xs font-semibold text-navy/80">
            Total {entries.length} Petualang Terdaftar
          </div>
        </div>

        {error && (
          <div
            role="alert"
            className="mb-6 border-2 border-navy bg-rose-warn p-3 text-xs font-semibold text-rose-ink"
          >
            {error}
          </div>
        )}

        {loading && entries.length === 0 ? (
          <div className="py-12 text-center font-pixel text-xs text-navy">
            MEMUAT DATA LEADERBOARD SUPABASE...
          </div>
        ) : entries.length === 0 ? (
          <div className="border-2 border-navy bg-light-bg p-6 text-center">
            <p className="font-pixel text-xs text-navy">
              BELUM ADA DATA SPEEDRUN
            </p>
            <p className="mt-2 text-sm text-navy/80">
              Jadilah yang pertama menyelesaikan misi coding dan catatkan
              rekor waktumu di papan peringkat!
            </p>
            <div className="mt-4">
              <PixelButton to="/world" variant="primary" size="sm">
                MULAI SPEEDRUN SEKARANG
              </PixelButton>
            </div>
          </div>
        ) : (
          <div>
            {/* Top 3 Podium Highlights */}
            {top3.length > 0 && (
              <div className="mb-7 grid grid-cols-1 gap-4 md:grid-cols-3">
                {top3.map((entry, idx) => {
                  const isGold = idx === 0;
                  const isSilver = idx === 1;
                  const isMe = currentUser && currentUser.nim === entry.nim;

                  const borderTone = isGold
                    ? 'border-[#E6A100] bg-[#FFF8E6]'
                    : isSilver
                      ? 'border-[#8E9CAE] bg-[#F2F5F8]'
                      : 'border-[#B87333] bg-[#FBF3EB]';

                  const badgeTone = isGold
                    ? 'bg-[#FFD700] text-navy'
                    : isSilver
                      ? 'bg-[#D6DEE6] text-navy'
                      : 'bg-[#E6A875] text-navy';

                  const medalLabel = isGold
                    ? 'JUARA 1 SPEEDRUN'
                    : isSilver
                      ? 'JUARA 2 SPEEDRUN'
                      : 'JUARA 3 SPEEDRUN';

                  return (
                    <div
                      key={entry.id}
                      className={`relative border-[3px] p-4 shadow-pixel transition-transform hover:-translate-y-1 ${borderTone} ${
                        isMe ? 'ring-4 ring-sky-blue' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`border-2 border-navy px-2 py-0.5 font-pixel text-[10px] font-bold ${badgeTone}`}
                        >
                          #{idx + 1} {medalLabel}
                        </span>
                        {isMe && (
                          <PixelBadge tone="mint">
                            <span>KAMU!</span>
                          </PixelBadge>
                        )}
                      </div>

                      <div className="mt-3 flex items-center gap-3">
                        <div className="border-2 border-navy bg-white p-1.5">
                          <PixelCharacter
                            variant={isGold ? 'cyan' : isSilver ? 'pink' : 'runner'}
                            size={44}
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="truncate font-pixel text-xs text-navy sm:text-sm">
                            {entry.nama}
                          </h3>
                          <div className="font-mono text-xs font-bold text-navy/80">
                            NIM: {entry.nim}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 space-y-1.5 border-t-2 border-navy/20 pt-3 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-navy/80">
                            ⏱️ Total Waktu:
                          </span>
                          <span className="font-mono text-sm font-bold text-navy">
                            {formatSpeedrunTime(entry.totalTimeSeconds)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-navy/80">
                            Misi Selesai:
                          </span>
                          <span className="font-mono font-bold text-navy">
                            {entry.completedCount} Level
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-navy/80">
                            XP &amp; Level:
                          </span>
                          <span className="font-mono font-bold text-navy">
                            {entry.xp} XP (Lv.{entry.playerLevel})
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Complete Ranking List Table */}
            <div className="overflow-x-auto border-2 border-navy bg-white">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b-2 border-navy bg-navy text-white">
                    <th className="px-3 py-2.5 font-pixel text-[10px] sm:text-xs">
                      RANK
                    </th>
                    <th className="px-3 py-2.5 font-pixel text-[10px] sm:text-xs">
                      PETUALANG
                    </th>
                    <th className="px-3 py-2.5 font-pixel text-[10px] sm:text-xs">
                      ⏱️ TOTAL WAKTU
                    </th>
                    <th className="px-3 py-2.5 font-pixel text-[10px] sm:text-xs">
                      MISI SELESAI
                    </th>
                    <th className="px-3 py-2.5 font-pixel text-[10px] sm:text-xs">
                      XP &amp; LEVEL
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-navy/15">
                  {entries.map((entry) => {
                    const isMe = currentUser && currentUser.nim === entry.nim;
                    const isTop1 = entry.rank === 1;

                    return (
                      <tr
                        key={entry.id}
                        className={`transition-colors ${
                          isMe
                            ? 'bg-sky-blue/35 font-bold hover:bg-sky-blue/50'
                            : isTop1
                              ? 'bg-[#FFF9E6] hover:bg-[#FFF3CC]'
                              : 'hover:bg-light-bg'
                        }`}
                      >
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`inline-flex min-h-[28px] min-w-[28px] items-center justify-center border-2 border-navy font-pixel text-[10px] ${
                                entry.rank === 1
                                  ? 'bg-[#FFD700] text-navy font-bold'
                                  : entry.rank === 2
                                    ? 'bg-[#D6DEE6] text-navy font-bold'
                                    : entry.rank === 3
                                      ? 'bg-[#E6A875] text-navy font-bold'
                                      : 'bg-white text-navy'
                              }`}
                            >
                              #{entry.rank}
                            </span>
                            {isTop1 && (
                              <PixelTrophyIcon size={14} />
                            )}
                          </div>
                        </td>

                        <td className="px-3 py-3">
                          <div className="flex items-center gap-2">
                            <div>
                              <div className="font-pixel text-[11px] text-navy sm:text-xs">
                                {entry.nama}
                              </div>
                              <div className="font-mono text-[11px] font-semibold text-navy/75">
                                NIM: {entry.nim}
                              </div>
                            </div>
                            {isMe && (
                              <span className="border border-navy bg-mint-green px-1.5 py-0.5 font-pixel text-[9px] text-navy">
                                KAMU
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="px-3 py-3">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono text-sm font-bold text-navy">
                              {formatSpeedrunTime(entry.totalTimeSeconds)}
                            </span>
                            {entry.totalTimeSeconds > 0 && entry.totalTimeSeconds < 120 && (
                              <span className="hidden rounded border border-navy bg-pastel-pink px-1.5 py-0.5 font-pixel text-[8px] text-navy sm:inline">
                                KILAT!
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="px-3 py-3">
                          <div className="flex items-center gap-1.5">
                            <PixelCheckIcon size={14} />
                            <span className="font-mono font-bold text-navy">
                              {entry.completedCount} Level
                            </span>
                          </div>
                        </td>

                        <td className="px-3 py-3">
                          <div className="font-mono text-xs font-bold text-navy">
                            {entry.xp} XP (Lv.{entry.playerLevel})
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Speedrun Tip Banner */}
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-2 border-navy bg-gradient-to-r from-sky-blue/30 to-pastel-pink/30 p-3.5 text-xs text-navy">
              <div className="flex items-center gap-2">
                <PixelStarIcon size={16} />
                <span className="font-medium">
                  <strong>Tips Speedrunner:</strong> Setiap detik tercatat saat kamu
                  membuka level. Selesaikan tantangan coding secepat mungkin untuk
                  memperbaiki rekor waktumu!
                </span>
              </div>
              <PixelButton to="/world" variant="secondary" size="sm">
                LANJUTKAN LEVEL
              </PixelButton>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
