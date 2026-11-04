import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { BarChart3, Award, CheckCircle, AlertTriangle, Target, ArrowRight } from 'lucide-react';
import { useProgress } from '@/hooks/useProgress';
import { practiceModules } from '@/data/practiceScenarios';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';

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
        <h2 className="page-title mb-2">Mi Progreso</h2>
        <p className="page-subtitle">
          Aquí puedes ver todos tus logros y los módulos que has ido superando.
        </p>
      </section>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="flex flex-col items-center text-center gap-2 p-5">
          <BarChart3 size={36} className="text-primary" aria-hidden="true" />
          <p className="text-text-muted text-base">Ejercicios realizados</p>
          <p className="text-4xl font-extrabold text-text">{totalExercises}</p>
        </Card>
        <Card className="flex flex-col items-center text-center gap-2 p-5">
          <CheckCircle size={36} className="text-success" aria-hidden="true" />
          <p className="text-text-muted text-base">Ejercicios completados</p>
          <p className="text-4xl font-extrabold text-text">{completedExercises}</p>
        </Card>
      </div>

      <Card className="flex flex-col sm:flex-row items-center gap-4 p-5">
        <div className="p-4 bg-primary-light rounded-full shrink-0">
          <Award size={44} className="text-primary" aria-hidden="true" />
        </div>
        <div className="flex-1 w-full">
          <h3 className="text-xl font-bold text-text mb-2">Efectividad en tus decisiones</h3>
          <ProgressBar
            value={accuracy}
            label={`${correctAnswers} de ${totalAnswers} respuestas correctas (${accuracy}%)`}
            variant={accuracy >= 50 ? 'success' : 'warning'}
          />
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-bold text-text mb-4 flex items-center gap-2">
          <Target size={26} className="text-primary" aria-hidden="true" />
          Avance por módulo
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
            Temas para reforzar en tu camino
          </h3>
          <ul className="space-y-2">
            {weakModules.map((module) => (
              <li key={module.id}>
                <Link
                  to="/"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-warning/10 text-text hover:bg-warning/20 transition-colors"
                >
                  <span className="font-bold text-base">{module.title}</span>
                  <span className="text-sm font-bold text-primary flex items-center gap-1">
                    Repasar en Mi Camino <ArrowRight size={18} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {untouchedModules.length > 0 && (
        <Card className="bg-primary-light border-primary/20">
          <h3 className="text-xl font-bold text-primary mb-2">Módulos pendientes</h3>
          <p className="text-text mb-4 text-base">
            Aún tienes temas esperando en tu camino. ¡Continúa aprendiendo a tu propio ritmo!
          </p>
          <div className="flex flex-wrap gap-2">
            {untouchedModules.map((module) => (
              <Link key={module.id} to="/">
                <span className="inline-block px-4 py-2 bg-white text-primary font-bold rounded-full border border-primary/20 hover:bg-primary hover:text-white transition-colors">
                  {module.title}
                </span>
              </Link>
            ))}
          </div>
        </Card>
      )}

      <div className="pt-2">
        <Link to="/">
          <Button fullWidth size="lg" leftIcon={<ArrowRight size={22} />}>
            Volver a Mi Camino
          </Button>
        </Link>
      </div>
    </div>
  );
}
