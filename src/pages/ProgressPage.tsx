import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { BarChart3, Award, CheckCircle, AlertTriangle, BookOpen, Target } from 'lucide-react';
import { useProgress } from '@/hooks/useProgress';
import { practiceModules } from '@/data/practiceScenarios';
import { Link } from 'react-router-dom';

export function ProgressPage() {
  const { stats } = useProgress();

  const totalExercises = stats.totalScenarios + stats.totalQuizzes;
  const completedExercises = stats.completedScenarios + stats.totalQuizzes;
  const correctAnswers = stats.correctScenarios + stats.quizAnswersCorrect;
  const totalAnswers = stats.totalScenarios + stats.quizAnswersTotal;
  const accuracy = totalAnswers > 0 ? Math.round((correctAnswers / totalAnswers) * 100) : 0;

  const weakModules = practiceModules.filter((module) => {
    const moduleStats = stats.byModule[module.id];
    if (moduleStats.total === 0) return false;
    return moduleStats.completed > 0 && moduleStats.correct < moduleStats.completed;
  });

  const untouchedModules = practiceModules.filter((module) => {
    return stats.byModule[module.id].total === 0;
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
          <CheckCircle size={32} className="text-success" aria-hidden="true" />
          <p className="text-text-muted">Ejercicios completados</p>
          <p className="text-3xl font-bold text-text">{completedExercises}</p>
        </Card>
      </div>

      <Card className="flex flex-col sm:flex-row items-center gap-4">
        <div className="p-4 bg-primary-light rounded-full">
          <Award size={40} className="text-primary" aria-hidden="true" />
        </div>
        <div className="flex-1 w-full">
          <h3 className="text-xl font-bold text-text mb-2">Respuestas correctas</h3>
          <ProgressBar value={accuracy} label={`${correctAnswers} de ${totalAnswers} respuestas correctas`} variant={accuracy >= 50 ? 'success' : 'warning'} />
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-bold text-text mb-4 flex items-center gap-2">
          <Target size={24} className="text-primary" aria-hidden="true" />
          Progreso por categoría
        </h3>
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

      {weakModules.length > 0 && (
        <Card>
          <h3 className="text-xl font-bold text-text mb-3 flex items-center gap-2">
            <AlertTriangle size={24} className="text-warning" aria-hidden="true" />
            Temas que necesitan refuerzo
          </h3>
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
        </Card>
      )}

      {untouchedModules.length > 0 && (
        <Card className="bg-primary-light border-primary/20">
          <h3 className="text-xl font-bold text-primary mb-2">Sigue aprendiendo</h3>
          <p className="text-text mb-4">
            Aún no has practicado en estos módulos. Anímate a intentarlos sin prisa:
          </p>
          <div className="flex flex-wrap gap-2">
            {untouchedModules.map((module) => (
              <Link key={module.id} to={`/practica/${module.id}`}>
                <span className="inline-block px-4 py-2 bg-white text-primary font-semibold rounded-full border border-primary/20 hover:bg-primary hover:text-white transition-colors">
                  {module.title}
                </span>
              </Link>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
