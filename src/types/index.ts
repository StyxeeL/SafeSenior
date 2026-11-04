export type FontSize = 'normal' | 'large' | 'xlarge';

export interface UserSettings {
  fontSize: FontSize;
  highContrast: boolean;
  sound: boolean;
  audioInstructions: boolean;
}

export const DEFAULT_SETTINGS: UserSettings = {
  fontSize: 'normal',
  highContrast: false,
  sound: false,
  audioInstructions: true,
};

export interface ScenarioProgress {
  scenarioId: string;
  completed: boolean;
  correct: boolean;
  attempts: number;
  lastAttemptAt?: string;
}

export interface ModuleProgress {
  moduleId: string;
  scenarios: ScenarioProgress[];
}

export interface QuizResult {
  quizId: string;
  score: number;
  total: number;
  completedAt: string;
}

export interface UserProgress {
  modules: ModuleProgress[];
  quizzes: QuizResult[];
  completedTopics?: string[];
}

export type RouteSection =
  | 'home'
  | 'learn'
  | 'practice'
  | 'quiz'
  | 'progress'
  | 'settings';

export interface NavItem {
  id: RouteSection;
  label: string;
  path: string;
  icon: string;
}
