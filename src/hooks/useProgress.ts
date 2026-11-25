import { useCallback, useEffect, useRef, useState } from 'react';
import { CSS_LESSONS } from '../data/cssLessons';
import { HTML_LESSONS } from '../data/htmlLessons';
import {
  getStoredStudent,
  loginStudent,
  logoutStudent,
  registerStudent,
  syncStudentProgress,
  type StudentUser,
} from '../services/supabaseAuth';
import type { WorldId } from '../types/lesson';
import type { AchievementId, CompletionReward, PlayerProgress } from '../types/progress';
import {
  applyLevelCompletion,
  calculatePlayerLevel,
  DEFAULT_PROGRESS,
  getWorldCompletedCount,
  loadProgress,
  makeLevelKey,
  saveProgress,
} from '../utils/progressManager';

export function useProgress() {
  const [initial] = useState(() => loadProgress());
  const [progress, setProgress] = useState<PlayerProgress>(initial.progress);
  const [storageError, setStorageError] = useState<boolean>(
    initial.hadStorageError
  );
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState<StudentUser | null>(() =>
    getStoredStudent()
  );

  const progressRef = useRef<PlayerProgress>(progress);
  progressRef.current = progress;

  const currentUserRef = useRef<StudentUser | null>(currentUser);
  currentUserRef.current = currentUser;

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const persist = useCallback((next: PlayerProgress) => {
    progressRef.current = next;
    setProgress(next);
    const ok = saveProgress(next);
    if (!ok) {
      setStorageError(true);
    }
  }, []);

  const completeLevel = useCallback(
    (world: WorldId, levelId: number, timeTakenSeconds?: number): CompletionReward => {
      const { nextProgress, reward } = applyLevelCompletion(
        progressRef.current,
        world,
        levelId,
        timeTakenSeconds
      );
      persist(nextProgress);

      // Background sync to Supabase if student is logged in
      if (currentUserRef.current) {
        syncStudentProgress(currentUserRef.current.nim, nextProgress).then(
          (res) => {
            if (res.success && res.user) {
              setCurrentUser(res.user);
            }
          }
        );
      }

      return reward;
    },
    [persist]
  );

  const saveLessonCode = useCallback(
    (world: WorldId, levelId: number, code: string) => {
      const key = makeLevelKey(world, levelId);
      const current = progressRef.current;
      if (current.savedCode[key] === code) return;
      persist({
        ...current,
        savedCode: {
          ...current.savedCode,
          [key]: code,
        },
      });
    },
    [persist]
  );

  const setLastPlayed = useCallback(
    (world: WorldId, levelId: number) => {
      const current = progressRef.current;
      if (
        current.lastPlayed?.world === world &&
        current.lastPlayed?.levelId === levelId
      ) {
        return;
      }
      persist({
        ...current,
        lastPlayed: { world, levelId },
      });
    },
    [persist]
  );

  const toggleSound = useCallback(() => {
    const current = progressRef.current;
    persist({
      ...current,
      soundEnabled: !current.soundEnabled,
    });
  }, [persist]);

  const resetProgress = useCallback(() => {
    const fresh: PlayerProgress = {
      ...DEFAULT_PROGRESS,
      soundEnabled: progressRef.current.soundEnabled,
    };
    persist(fresh);
    setStorageError(false);
  }, [persist]);

  const dismissStorageError = useCallback(() => {
    setStorageError(false);
  }, []);

  // Supabase Auth Integration
  const login = useCallback(
    async (nim: string, password: string) => {
      const res = await loginStudent(nim, password);
      if (res.success && res.user) {
        // Replace local progress entirely with cloud data -- never merge
        // so user A's leftover data never contaminates user B's session.
        const cloudUser = res.user;
        const cloudProgress: PlayerProgress = {
          ...DEFAULT_PROGRESS,
          soundEnabled: progressRef.current.soundEnabled, // keep audio pref
          xp: cloudUser.xp,
          playerLevel: calculatePlayerLevel(cloudUser.xp),
          completedLevels: cloudUser.completedLevels,
          achievements: cloudUser.achievements as AchievementId[],
          levelTimes: cloudUser.levelTimes ?? {},
          totalTimeSeconds: cloudUser.totalTimeSeconds ?? 0,
        };
        persist(cloudProgress);
        setCurrentUser(cloudUser);
        return { success: true };
      }
      return { success: false, error: res.error };
    },
    [persist]
  );

  const register = useCallback(
    async (nama: string, nim: string, password: string) => {
      // Register with XP=0; don't forward local progress (may belong to another user)
      const res = await registerStudent(nama, nim, password);
      if (res.success && res.user) {
        const freshProgress: PlayerProgress = {
          ...DEFAULT_PROGRESS,
          soundEnabled: progressRef.current.soundEnabled,
        };
        persist(freshProgress);
        setCurrentUser(res.user);
        return { success: true };
      }
      return { success: false, error: res.error };
    },
    [persist]
  );

  const logout = useCallback(() => {
    logoutStudent();
    // Wipe local progress so the next user starts from a clean slate
    const fresh: PlayerProgress = {
      ...DEFAULT_PROGRESS,
      soundEnabled: progressRef.current.soundEnabled,
    };
    persist(fresh);
    setCurrentUser(null);
  }, [persist]);

  const syncNow = useCallback(async () => {
    if (!currentUserRef.current) {
      return { success: false, error: 'Belum ada akun yang masuk.' };
    }
    const res = await syncStudentProgress(
      currentUserRef.current.nim,
      progressRef.current
    );
    if (res.success && res.user) {
      setCurrentUser(res.user);
      return { success: true };
    }
    return { success: false, error: res.error };
  }, []);

  const totalLevels = HTML_LESSONS.length + CSS_LESSONS.length;
  const htmlCompleted = getWorldCompletedCount(progress, 'html');
  const cssCompleted = getWorldCompletedCount(progress, 'css');
  const totalCompleted = htmlCompleted + cssCompleted;
  const completionPercent =
    totalLevels > 0 ? Math.round((totalCompleted / totalLevels) * 100) : 0;

  return {
    progress,
    isLoaded,
    storageError,
    currentUser,
    login,
    register,
    logout,
    syncNow,
    dismissStorageError,
    completeLevel,
    saveLessonCode,
    setLastPlayed,
    toggleSound,
    resetProgress,
    totalLevels,
    htmlCompleted,
    cssCompleted,
    totalCompleted,
    completionPercent,
  };
}
