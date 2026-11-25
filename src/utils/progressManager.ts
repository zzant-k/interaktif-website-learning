import { CSS_LESSONS } from '../data/cssLessons';
import { HTML_LESSONS } from '../data/htmlLessons';
import { XP_REWARDS } from '../data/worlds';
import type { LevelStatus, WorldId } from '../types/lesson';
import type {
  AchievementId,
  CompletionReward,
  PlayerProgress,
} from '../types/progress';

const STORAGE_KEY = 'code_quest_progress_v1';

export const DEFAULT_PROGRESS: PlayerProgress = {
  xp: 0,
  playerLevel: 1,
  completedChallenges: [],
  completedLevels: [],
  completedWorlds: [],
  achievements: [],
  lastPlayed: null,
  savedCode: {},
  soundEnabled: true,
  levelTimes: {},
  totalTimeSeconds: 0,
};

export function makeLevelKey(world: WorldId, levelId: number): string {
  return `${world}-${levelId}`;
}

export function calculatePlayerLevel(xp: number): number {
  return Math.floor(Math.max(0, xp) / XP_REWARDS.XP_PER_PLAYER_LEVEL) + 1;
}

export function getXpWithinCurrentLevel(xp: number): {
  current: number;
  needed: number;
  percent: number;
} {
  const needed = XP_REWARDS.XP_PER_PLAYER_LEVEL;
  const current = Math.max(0, xp) % needed;
  return {
    current,
    needed,
    percent: Math.round((current / needed) * 100),
  };
}

export interface LoadProgressResult {
  progress: PlayerProgress;
  hadStorageError: boolean;
}

export function loadProgress(): LoadProgressResult {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { progress: { ...DEFAULT_PROGRESS }, hadStorageError: false };
    }
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') {
      return { progress: { ...DEFAULT_PROGRESS }, hadStorageError: true };
    }

    const record = parsed as Partial<PlayerProgress>;
    const xp = typeof record.xp === 'number' && record.xp >= 0 ? record.xp : 0;

    const sanitized: PlayerProgress = {
      xp,
      playerLevel: calculatePlayerLevel(xp),
      completedChallenges: Array.isArray(record.completedChallenges)
        ? record.completedChallenges.filter((x): x is string => typeof x === 'string')
        : [],
      completedLevels: Array.isArray(record.completedLevels)
        ? record.completedLevels.filter((x): x is string => typeof x === 'string')
        : [],
      completedWorlds: Array.isArray(record.completedWorlds)
        ? record.completedWorlds.filter(
            (w): w is WorldId => w === 'html' || w === 'css'
          )
        : [],
      achievements: Array.isArray(record.achievements)
        ? record.achievements.filter(
            (a): a is AchievementId =>
              a === 'first_code' ||
              a === 'html_beginner' ||
              a === 'css_explorer' ||
              a === 'pixel_web_builder'
          )
        : [],
      lastPlayed:
        record.lastPlayed &&
        (record.lastPlayed.world === 'html' || record.lastPlayed.world === 'css') &&
        typeof record.lastPlayed.levelId === 'number'
          ? record.lastPlayed
          : null,
      savedCode:
        record.savedCode && typeof record.savedCode === 'object'
          ? Object.fromEntries(
              Object.entries(record.savedCode).filter(
                ([k, v]) => typeof k === 'string' && typeof v === 'string'
              )
            )
          : {},
      soundEnabled:
        typeof record.soundEnabled === 'boolean' ? record.soundEnabled : true,
      levelTimes:
        record.levelTimes && typeof record.levelTimes === 'object'
          ? Object.fromEntries(
              Object.entries(record.levelTimes).filter(
                ([k, v]) =>
                  typeof k === 'string' && typeof v === 'number' && v > 0
              )
            )
          : {},
      totalTimeSeconds:
        typeof record.totalTimeSeconds === 'number' &&
        record.totalTimeSeconds >= 0
          ? record.totalTimeSeconds
          : 0,
    };

    return { progress: sanitized, hadStorageError: false };
  } catch {
    return { progress: { ...DEFAULT_PROGRESS }, hadStorageError: true };
  }
}

export function saveProgress(progress: PlayerProgress): boolean {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    return true;
  } catch {
    return false;
  }
}

export function getLevelStatus(
  progress: PlayerProgress,
  world: WorldId,
  levelId: number
): LevelStatus {
  const key = makeLevelKey(world, levelId);
  if (progress.completedLevels.includes(key)) {
    return 'completed';
  }
  if (levelId === 1) {
    return 'available';
  }
  const prevKey = makeLevelKey(world, levelId - 1);
  if (progress.completedLevels.includes(prevKey)) {
    return 'available';
  }
  return 'locked';
}

export function getWorldLessons(world: WorldId) {
  return world === 'html' ? HTML_LESSONS : CSS_LESSONS;
}

export function getWorldCompletedCount(
  progress: PlayerProgress,
  world: WorldId
): number {
  const lessons = getWorldLessons(world);
  return lessons.filter((l) =>
    progress.completedLevels.includes(makeLevelKey(world, l.id))
  ).length;
}

export function getNextPlayableTarget(progress: PlayerProgress): {
  world: WorldId;
  levelId: number;
} {
  if (progress.lastPlayed) {
    const status = getLevelStatus(
      progress,
      progress.lastPlayed.world,
      progress.lastPlayed.levelId
    );
    if (status !== 'locked') {
      return progress.lastPlayed;
    }
  }

  for (const lesson of HTML_LESSONS) {
    if (!progress.completedLevels.includes(makeLevelKey('html', lesson.id))) {
      return { world: 'html', levelId: lesson.id };
    }
  }

  for (const lesson of CSS_LESSONS) {
    if (!progress.completedLevels.includes(makeLevelKey('css', lesson.id))) {
      return { world: 'css', levelId: lesson.id };
    }
  }

  return { world: 'html', levelId: 1 };
}

export function applyLevelCompletion(
  prev: PlayerProgress,
  world: WorldId,
  levelId: number,
  timeTakenSeconds?: number
): { nextProgress: PlayerProgress; reward: CompletionReward } {
  const key = makeLevelKey(world, levelId);
  const completedChallenges = [...prev.completedChallenges];
  const completedLevels = [...prev.completedLevels];
  const completedWorlds = [...prev.completedWorlds];
  const achievements = [...prev.achievements];
  const levelTimes = { ...(prev.levelTimes || {}) };

  let isNewBestTime = false;
  if (typeof timeTakenSeconds === 'number' && timeTakenSeconds > 0) {
    const existing = levelTimes[key];
    if (!existing || timeTakenSeconds < existing) {
      levelTimes[key] = timeTakenSeconds;
      isNewBestTime = true;
    }
  }

  const totalTimeSeconds = Object.values(levelTimes).reduce((a, b) => a + b, 0);

  let challengeXp = 0;
  let levelXp = 0;
  let worldBonusXp = 0;
  let newlyCompletedLevel = false;
  let newlyCompletedWorld = false;

  // Prevent double-awarding XP when replaying an already solved level
  if (!completedChallenges.includes(key)) {
    completedChallenges.push(key);
    challengeXp = XP_REWARDS.CHALLENGE;
  }

  if (!completedLevels.includes(key)) {
    completedLevels.push(key);
    levelXp = XP_REWARDS.LEVEL;
    newlyCompletedLevel = true;
  }

  const worldLessons = getWorldLessons(world);
  const isWorldDone = worldLessons.every((l) =>
    completedLevels.includes(makeLevelKey(world, l.id))
  );

  if (isWorldDone && !completedWorlds.includes(world)) {
    completedWorlds.push(world);
    worldBonusXp = XP_REWARDS.WORLD_CLEAR;
    newlyCompletedWorld = true;
  }

  const newAchievements: AchievementId[] = [];
  const grantAchievement = (id: AchievementId) => {
    if (!achievements.includes(id)) {
      achievements.push(id);
      newAchievements.push(id);
    }
  };

  if (completedLevels.length >= 1) {
    grantAchievement('first_code');
  }

  const htmlDoneCount = HTML_LESSONS.filter((l) =>
    completedLevels.includes(makeLevelKey('html', l.id))
  ).length;
  const cssDoneCount = CSS_LESSONS.filter((l) =>
    completedLevels.includes(makeLevelKey('css', l.id))
  ).length;

  if (htmlDoneCount >= 3) {
    grantAchievement('html_beginner');
  }
  if (cssDoneCount >= 3) {
    grantAchievement('css_explorer');
  }
  if (
    htmlDoneCount === HTML_LESSONS.length &&
    cssDoneCount === CSS_LESSONS.length
  ) {
    grantAchievement('pixel_web_builder');
  }

  const xpGained = challengeXp + levelXp + worldBonusXp;
  const newXp = prev.xp + xpGained;
  const newPlayerLevel = calculatePlayerLevel(newXp);
  const leveledUp = newPlayerLevel > prev.playerLevel;

  const nextProgress: PlayerProgress = {
    ...prev,
    xp: newXp,
    playerLevel: newPlayerLevel,
    completedChallenges,
    completedLevels,
    completedWorlds,
    achievements,
    lastPlayed: { world, levelId },
    levelTimes,
    totalTimeSeconds,
  };

  return {
    nextProgress,
    reward: {
      xpGained,
      challengeXp,
      levelXp,
      worldBonusXp,
      newlyCompletedLevel,
      newlyCompletedWorld,
      newAchievements,
      leveledUp,
      newPlayerLevel,
      timeTakenSeconds,
      isNewBestTime,
    },
  };
}

