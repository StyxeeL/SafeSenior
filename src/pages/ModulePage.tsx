import { useParams, Navigate, Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { getModuleById, type ModuleId } from '@/data/practiceScenarios';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useProgress } from '@/hooks/useProgress';

export function ModulePage() {
  const { moduleId } = useParams<{ moduleId: ModuleId }>();
  const module = moduleId ? getModuleById(moduleId) : undefined;
  const { stats } = useProgress();

  if (!module) {
    return <Navigate to="/practica" replace />;
  }

  const moduleStats = stats.byModule[module.id];
  const progressPercentage =
    moduleStats.total > 0
      ? Math.round((moduleStats.completed / moduleStats.total) * 100)
      : 0;

  return (
    <div className="space-y-6">
      <Link to="/practica" className="inline-flex items-center gap-2 text-primary font-semibold">
        <ArrowLeft size={24} aria-hidden="true" />
        Volver a Practica
      </Link>

      <section className="flex items-center gap-4">
        <div className={`shrink-0 p-4 rounded-2xl ${module.bg}`}>
          <module.icon size={40} className={module.color} aria-hidden="true" />
        </div>
        <div>
          <p className="text-text-muted font-medium">{module.subtitle}</p>
          <h2 className="page-title">{module.title}</h2>
        </div>
      </section>

      <Card>
        <p className="text-text mb-4">{module.description}</p>
        <ProgressBar value={progressPercentage} label="Progreso del módulo" />
      </Card>

      <div className="space-y-4">
        <h3 className="text-xl font-bold text-text">Escenarios</h3>
        {module.scenarios.map((scenario) => (
          <Link key={scenario.id} to={`/practica/${module.id}/${scenario.id}`} className="block">
            <Card className="flex items-center gap-4 hover:border-primary">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-lg font-bold text-text">{scenario.title}</h4>
                  <span className="text-sm text-text-muted">({scenario.difficulty})</span>
                </div>
                <p className="text-text-muted">{scenario.summary}</p>
              </div>
              <ChevronRight size={28} className="text-text-muted shrink-0" aria-hidden="true" />
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
