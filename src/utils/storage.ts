import { ExperimentHistoryItem, UserProgress } from '../types';

const PROGRESS_KEY = 'mixon_user_progress';
const HISTORY_KEY = 'mixon_experiment_history';

const DEFAULT_PROGRESS: UserProgress = {
  xp: 45,
  level: 1,
  levelTitle: 'Explorer',
  discoveredMaterialIds: ['copper', 'oxygen', 'water'],
  discoveredReactionIds: [],
  completedChallengeIds: []
};

export function loadUserProgress(): UserProgress {
  try {
    const data = localStorage.getItem(PROGRESS_KEY);
    if (data) {
      return { ...DEFAULT_PROGRESS, ...JSON.parse(data) };
    }
  } catch {}
  return DEFAULT_PROGRESS;
}

export function saveUserProgress(progress: UserProgress): void {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch {}
}

export function loadExperimentHistory(): ExperimentHistoryItem[] {
  try {
    const data = localStorage.getItem(HISTORY_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch {}
  return [];
}

export function saveExperimentHistory(history: ExperimentHistoryItem[]): void {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 50))); // Keep last 50
  } catch {}
}

export function clearExperimentHistory(): void {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch {}
}
