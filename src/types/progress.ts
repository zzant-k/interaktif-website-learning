import type { WorldId } from './lesson';

export type AchievementId =
  | 'first_code'
  | 'html_beginner'
  | 'css_explorer'
  | 'pixel_web_builder';

export interface AchievementDefinition {
  id: AchievementId;
  title: string;
  description: string;
  requirementLabel: string;
}

export interface LastPlayed {
  world: WorldId;
  levelId: number;
}

export interface PlayerProgress {
  xp: number;
  playerLevel: number;
  completedChallenges: string[];
  completedLevels: string[];
  completedWorlds: WorldId[];
  achievements: AchievementId[];
  lastPlayed: LastPlayed | null;
  savedCode: Record<string, string>;
  soundEnabled: boolean;
  levelTimes: Record<string, number>;
  totalTimeSeconds: number;
}

export interface CompletionReward {
  xpGained: number;
  challengeXp: number;
  levelXp: number;
  worldBonusXp: number;
  newlyCompletedLevel: boolean;
  newlyCompletedWorld: boolean;
  newAchievements: AchievementId[];
  leveledUp: boolean;
  newPlayerLevel: number;
  timeTakenSeconds?: number;
  isNewBestTime?: boolean;
}

