import { getItem, setItem } from './storage';
import type { ModuleId } from '@/data/practiceScenarios';
import type { UserProgress, ModuleProgress, ScenarioProgress } from '@/types';

const PROGRESS_KEY = 'progress';

export function getEmptyProgress(): UserProgress {
  return {
    modules: [],
    quizzes: [],
    completedTopics: [],
  };
}

export function getProgress(): UserProgress {
  const data = getItem<UserProgress>(PROGRESS_KEY, getEmptyProgress());
  if (!data.completedTopics) {
    data.completedTopics = [];
  }
  return data;
}

export function saveProgress(progress: UserProgress): void {
  setItem(PROGRESS_KEY, progress);
}

function findOrCreateModule(progress: UserProgress, moduleId: ModuleId): ModuleProgress {
  let module = progress.modules.find((m) => m.moduleId === moduleId);
  if (!module) {
    module = { moduleId, scenarios: [] };
    progress.modules.push(module);
  }
  return module;
}

function findOrCreateScenario(module: ModuleProgress, scenarioId: string): ScenarioProgress {
  let scenario = module.scenarios.find((s) => s.scenarioId === scenarioId);
  if (!scenario) {
    scenario = { scenarioId, completed: false, correct: false, attempts: 0 };
    module.scenarios.push(scenario);
  }
  return scenario;
}

export function recordScenarioAttempt(
  moduleId: ModuleId,
  scenarioId: string,
  correct: boolean
): void {
  const progress = getProgress();
  const module = findOrCreateModule(progress, moduleId);
  const scenario = findOrCreateScenario(module, scenarioId);

  // Solo se marca como completado si la respuesta fue CORRECTA.
  // Si marcó mal, completed se mantiene falso (a menos que ya hubiera sido completado antes correctamente).
  if (correct) {
    scenario.completed = true;
  }
  scenario.attempts += 1;
  scenario.correct = correct;
  scenario.lastAttemptAt = new Date().toISOString();

  saveProgress(progress);
}

export function recordTopicCompleted(topicId: string): void {
  const progress = getProgress();
  if (!progress.completedTopics) {
    progress.completedTopics = [];
  }
  if (!progress.completedTopics.includes(topicId)) {
    progress.completedTopics.push(topicId);
    saveProgress(progress);
  }
}

export function isTopicCompleted(topicId: string): boolean {
  const progress = getProgress();
  return Boolean(progress.completedTopics?.includes(topicId));
}

export function recordQuizResult(quizId: string, score: number, total: number): void {
  const progress = getProgress();
  progress.quizzes.push({
    quizId,
    score,
    total,
    completedAt: new Date().toISOString(),
  });
  saveProgress(progress);
}

export function resetProgress(): void {
  saveProgress(getEmptyProgress());
}

export function getModuleProgress(moduleId: ModuleId): ModuleProgress | undefined {
  return getProgress().modules.find((m) => m.moduleId === moduleId);
}

export function getScenarioProgress(scenarioId: string): ScenarioProgress | undefined {
  for (const module of getProgress().modules) {
    const scenario = module.scenarios.find((s) => s.scenarioId === scenarioId);
    if (scenario) return scenario;
  }
  return undefined;
}

export function calculateStats(progress: UserProgress = getProgress()) {
  let totalScenarios = 0;
  let completedScenarios = 0;
  let correctScenarios = 0;
  const byModule: Record<string, { completed: number; total: number; correct: number }> = {
    vishing: { completed: 0, total: 0, correct: 0 },
    smishing: { completed: 0, total: 0, correct: 0 },
    whatsapp: { completed: 0, total: 0, correct: 0 },
    phishing: { completed: 0, total: 0, correct: 0 },
  };

  for (const module of progress.modules) {
    for (const scenario of module.scenarios) {
      totalScenarios += 1;
      if (byModule[module.moduleId]) {
        byModule[module.moduleId].total += 1;
      }
      if (scenario.completed) {
        completedScenarios += 1;
        if (byModule[module.moduleId]) {
          byModule[module.moduleId].completed += 1;
        }
      }
      if (scenario.correct) {
        correctScenarios += 1;
        if (byModule[module.moduleId]) {
          byModule[module.moduleId].correct += 1;
        }
      }
    }
  }

  const totalQuizzes = progress.quizzes.length;
  const quizAnswersCorrect = progress.quizzes.reduce((sum, q) => sum + q.score, 0);
  const quizAnswersTotal = progress.quizzes.reduce((sum, q) => sum + q.total, 0);

  const totalAttempts = totalScenarios + quizAnswersTotal;
  const totalCorrect = correctScenarios + quizAnswersCorrect;

  return {
    totalScenarios,
    completedScenarios,
    correctScenarios,
    byModule,
    totalQuizzes,
    quizAnswersCorrect,
    quizAnswersTotal,
    completedTopics: progress.completedTopics || [],
    accuracyPercentage: totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0,
  };
}
