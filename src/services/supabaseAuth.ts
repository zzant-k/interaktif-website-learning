import type { PlayerProgress } from '../types/progress';

export interface StudentUser {
  id: string;
  nama: string;
  nim: string;
  xp: number;
  playerLevel: number;
  completedLevels: string[];
  achievements: string[];
  totalTimeSeconds?: number;
  levelTimes?: Record<string, number>;
  createdAt?: string;
  lastLogin?: string;
}

export interface LeaderboardEntry {
  rank: number;
  id: string;
  nama: string;
  nim: string;
  xp: number;
  playerLevel: number;
  completedLevels: string[];
  completedCount: number;
  totalTimeSeconds: number;
  levelTimes: Record<string, number>;
  lastLogin?: string;
}

export interface LeaderboardResponse {
  success: boolean;
  leaderboard: LeaderboardEntry[];
  error?: string;
}

export function formatSpeedrunTime(seconds: number): string {
  if (typeof seconds !== 'number' || seconds <= 0) return '--:--';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  error?: string;
  user?: StudentUser;
}

const STORAGE_KEY = 'codequest_student_user';

export function getStoredStudent(): StudentUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StudentUser;
  } catch {
    return null;
  }
}

export function saveStoredStudent(user: StudentUser | null): void {
  try {
    if (!user) {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    }
  } catch {
    // Storage quota or disabled fallback
  }
}

export async function registerStudent(
  nama: string,
  nim: string,
  password: string,
  currentProgress?: PlayerProgress
): Promise<AuthResponse> {
  try {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nama: nama.trim(),
        nim: nim.trim().toUpperCase(),
        password,
        xp: currentProgress?.xp ?? 0,
        playerLevel: currentProgress?.playerLevel ?? 1,
        completedLevels: currentProgress?.completedLevels ?? [],
        achievements: currentProgress?.achievements ?? [],
        totalTimeSeconds: currentProgress?.totalTimeSeconds ?? 0,
        levelTimes: currentProgress?.levelTimes ?? {},
      }),
    });

    const data = (await res.json()) as AuthResponse;
    if (res.ok && data.success && data.user) {
      saveStoredStudent(data.user);
    }
    return data;
  } catch (err) {
    return {
      success: false,
      error:
        'Gagal menghubungi server database Supabase: ' +
        (err instanceof Error ? err.message : String(err)),
    };
  }
}

export async function loginStudent(
  nim: string,
  password: string
): Promise<AuthResponse> {
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nim: nim.trim().toUpperCase(),
        password,
      }),
    });

    const data = (await res.json()) as AuthResponse;
    if (res.ok && data.success && data.user) {
      saveStoredStudent(data.user);
    }
    return data;
  } catch (err) {
    return {
      success: false,
      error:
        'Gagal menghubungi server database Supabase: ' +
        (err instanceof Error ? err.message : String(err)),
    };
  }
}

export async function syncStudentProgress(
  nim: string,
  progress: PlayerProgress
): Promise<AuthResponse> {
  try {
    const res = await fetch('/api/auth/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nim: nim.trim().toUpperCase(),
        xp: progress.xp,
        playerLevel: progress.playerLevel,
        completedLevels: progress.completedLevels,
        achievements: progress.achievements,
        totalTimeSeconds: progress.totalTimeSeconds,
        levelTimes: progress.levelTimes,
      }),
    });

    const data = (await res.json()) as AuthResponse;
    if (res.ok && data.success && data.user) {
      saveStoredStudent(data.user);
    }
    return data;
  } catch (err) {
    return {
      success: false,
      error:
        'Gagal menyinkronkan progress ke Supabase: ' +
        (err instanceof Error ? err.message : String(err)),
    };
  }
}

export function logoutStudent(): void {
  saveStoredStudent(null);
}

export async function fetchLeaderboard(
  mode: 'time' | 'fastest' = 'time'
): Promise<LeaderboardResponse> {
  try {
    const res = await fetch(`/api/leaderboard?mode=${mode}`);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    const data = (await res.json()) as LeaderboardResponse;
    return data;
  } catch (err) {
    return {
      success: false,
      leaderboard: [],
      error:
        'Gagal memuat papan peringkat Supabase: ' +
        (err instanceof Error ? err.message : String(err)),
    };
  }
}

