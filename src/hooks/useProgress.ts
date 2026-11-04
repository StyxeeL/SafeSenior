import { useCallback, useMemo, useState } from 'react';
import {
  getProgress,
  recordScenarioAttempt as recordScenarioAttemptService,
  recordQuizResult as recordQuizResultService,
  recordTopicCompleted as recordTopicCompletedService,
  isTopicCompleted as isTopicCompletedService,
  resetProgress as resetProgressService,
  calculateStats,
} from '@/services/progress';
import type { ModuleId } from '@/data/practiceScenarios';
import type { UserProgress } from '@/types';

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>(() => getProgress());

  const refresh = useCallback(() => {
    setProgress(getProgress());
  }, []);

  const recordScenarioAttempt = useCallback(
    (moduleId: ModuleId, scenarioId: string, correct: boolean) => {
      recordScenarioAttemptService(moduleId, scenarioId, correct);
      refresh();
    },
    [refresh]
  );

  const recordTopicCompleted = useCallback(
    (topicId: string) => {
      recordTopicCompletedService(topicId);
      refresh();
    },
    [refresh]
  );

  const isTopicCompleted = useCallback(
    (topicId: string) => {
      return isTopicCompletedService(topicId);
    },
    []
  );

  const recordQuizResult = useCallback(
    (quizId: string, score: number, total: number) => {
      recordQuizResultService(quizId, score, total);
      refresh();
    },
    [refresh]
  );

  const resetProgress = useCallback(() => {
    resetProgressService();
    refresh();
  }, [refresh]);

  const stats = useMemo(() => calculateStats(progress), [progress]);

  return {
    progress,
    stats,
    recordScenarioAttempt,
    recordTopicCompleted,
    isTopicCompleted,
    recordQuizResult,
    resetProgress,
    refresh,
  };
}
