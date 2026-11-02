import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { BarChart3, Award, BookOpen, AlertTriangle } from 'lucide-react';
import { useProgress } from '@/hooks/useProgress';
import { practiceModules } from '@/data/practiceScenarios';
import { Link } from 'react-router-dom';

export function ProgressPage() {
  const { stats } = useProgress();

  const totalExercises = stats.totalScenarios + stats.totalQuizzes;
  const correctAnswers = stats.correctScenarios + stats.quizAnswersCorrect;
  const totalAnswers = stats.totalScenarios + stats.quizAnswersTotal;

  const weakModules = practiceModules.filter((module) => {
    const moduleStats = stats.byModule[module.id];
    if (moduleStats.total === 0) return false;
    return moduleStats.completed > 0 && moduleStats.correct < moduleStats.completed;
  });

  return (
    <div className="space-y-6">
      <section>
        <h2 className="page-title mb-2">Mi progreso</h2>
        <p className="page-subtitle">
          Aquí verás tus avances y los temas en los que puedes reforzar.
        </p>
      </section>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="flex flex-col items-center text-center gap-2">
          <BarChart3 size={32} className="text-primary" aria-hidden="true" />
          <p className="text-text-muted">Ejercicios realizados</p>
          <p className="text-3xl font-bold text-text">{totalExercises}</p>
        </Card>
        <Card className="flex flex-col items-center text-center gap-2">
          <Award size={32} className="text-success" aria-hidden="true" />
          <p className="text-text-muted">Respuestas correctas</p>
          <p className="text-3xl font-bold text-text">
            {totalAnswers > 0 ? Math.round((correctAnswers / totalAnswers) * 100) : 0}%
          </p>
        </Card>
      </div>

      <Card>
        <h3 className="text-xl font-bold text-text mb-4">Progreso por categoría</h3>
        <div className="space-y-4">
          {practiceModules.map((module) => {
            const moduleStats = stats.byModule[module.id];
            const percentage =
              module.scenarios.length > 0
                ? Math.round((moduleStats.completed / module.scenarios.length) * 100)
                : 0;
            return (
              <ProgressBar
                key={module.id}
                value={percentage}
                label={module.title}
                variant={percentage === 100 ? 'success' : 'primary'}
              />
            );
          })}
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-bold text-text mb-2 flex items-center gap-2">
          <AlertTriangle size={24} className="text-warning" aria-hidden="true" />
          Temas que necesitan refuerzo
        </h3>
        {weakModules.length > 0 ? (
          <ul className="space-y-2">
            {weakModules.map((module) => (
              <li key={module.id}>
                <Link
                  to={`/practica/${module.id}`}
                  className="flex items-center justify-between p-3 rounded-xl bg-warning/10 text-text hover:bg-warning/20 transition-colors"
                >
                  <span>{module.title}</span>
                  <BookOpen size={20} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-text-muted">
            Completa más ejercicios para recibir recomendaciones personalizadas.
          </p>
        )}
      </Card>
    </div>
  );
}
