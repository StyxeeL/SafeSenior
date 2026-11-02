import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { ChevronRight } from 'lucide-react';
import { practiceModules } from '@/data/practiceScenarios';
import { useProgress } from '@/hooks/useProgress';

export function PracticePage() {
  const { stats } = useProgress();

  return (
    <div className="space-y-6">
      <section>
        <h2 className="page-title mb-2">Practica</h2>
        <p className="page-subtitle">
          Elige un módulo y pon a prueba tus habilidades con ejercicios interactivos.
        </p>
      </section>

      <div className="grid gap-4">
        {practiceModules.map((module) => {
          const moduleStats = stats.byModule[module.id];
          const progressPercentage =
            module.scenarios.length > 0
              ? Math.round((moduleStats.completed / module.scenarios.length) * 100)
              : 0;

          return (
            <Link key={module.id} to={`/practica/${module.id}`} className="block">
              <Card className="hover:border-primary">
                <div className="flex items-center gap-4 mb-3">
                  <div className={`shrink-0 p-4 rounded-2xl ${module.bg}`}>
                    <module.icon size={32} className={module.color} aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-text-muted font-medium">{module.subtitle}</p>
                    <h3 className="text-xl font-bold text-text">{module.title}</h3>
                  </div>
                  <ChevronRight size={28} className="text-text-muted shrink-0" aria-hidden="true" />
                </div>
                <p className="text-text-muted mb-3">{module.description}</p>
                <ProgressBar value={progressPercentage} label={`${moduleStats.completed} de ${module.scenarios.length} escenarios`} />
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
