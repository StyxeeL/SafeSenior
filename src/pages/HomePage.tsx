import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Shield, Play, ClipboardCheck, BookOpen, Download } from 'lucide-react';
import { useProgress } from '@/hooks/useProgress';
import { useInstallPrompt } from '@/hooks/useInstallPrompt';
import { practiceModules } from '@/data/practiceScenarios';
import { InstallButton } from '@/components/pwa/InstallButton';

export function HomePage() {
  const { stats } = useProgress();
  const { isSupported, isInstalled } = useInstallPrompt();

  const totalExercises = stats.totalScenarios + stats.totalQuizzes;
  const hasProgress = totalExercises > 0;

  const firstIncompleteModule = practiceModules.find((module) => {
    const moduleStats = stats.byModule[module.id];
    return moduleStats.completed < module.scenarios.length;
  });

  return (
    <div className="space-y-6">
      <section className="text-center py-6">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-light rounded-full mb-4">
          <Shield size={40} className="text-primary" aria-hidden="true" />
        </div>
        <h2 className="page-title mb-2">Bienvenido a SafeSenior</h2>
        <p className="page-subtitle max-w-md mx-auto">
          Aprende a reconocer estafas digitales de forma sencilla y segura.
        </p>
      </section>

      {isSupported && !isInstalled && (
        <Card className="bg-primary-light border-primary/20">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary rounded-2xl shrink-0">
              <Download size={28} className="text-white" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-primary mb-1">
                ¿Quieres tener SafeSenior a mano?
              </h3>
              <p className="text-text mb-4">
                Instálalo en tu celular para abrirlo rápido, incluso sin internet.
              </p>
              <InstallButton />
            </div>
          </div>
        </Card>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <Link to="/practica" className="block">
          <Card className="h-full flex flex-col items-center text-center gap-3 hover:border-primary">
            <Play size={32} className="text-primary" aria-hidden="true" />
            <h3 className="text-xl font-bold text-text">Practicar ahora</h3>
            <p className="text-text-muted">Ejercicios interactivos paso a paso.</p>
          </Card>
        </Link>

        <Link to="/evaluame" className="block">
          <Card className="h-full flex flex-col items-center text-center gap-3 hover:border-primary">
            <ClipboardCheck size={32} className="text-success" aria-hidden="true" />
            <h3 className="text-xl font-bold text-text">Evaluarme</h3>
            <p className="text-text-muted">Comprueba lo que has aprendido.</p>
          </Card>
        </Link>
      </div>

      {firstIncompleteModule && (
        <Link to={`/practica/${firstIncompleteModule.id}`} className="block">
          <Card className="flex items-center gap-4 bg-primary-light border-primary/20 hover:border-primary">
            <Play size={32} className="text-primary" aria-hidden="true" />
            <div className="flex-1">
              <p className="text-primary font-semibold">Continuar donde quedaste</p>
              <p className="text-text">Módulo: {firstIncompleteModule.title}</p>
            </div>
          </Card>
        </Link>
      )}

      <Card>
        <h3 className="text-xl font-bold text-text mb-4">Tu progreso</h3>
        <ProgressBar value={stats.accuracyPercentage} label="Progreso general" />
        <p className="text-text-muted mt-4">
          {hasProgress
            ? `Has realizado ${totalExercises} ejercicio${totalExercises !== 1 ? 's' : ''} con un ${stats.accuracyPercentage}% de aciertos.`
            : 'Aún no has completado ejercicios. ¡Empieza practicando hoy!'}
        </p>
      </Card>

      <Link to="/aprende" className="block">
        <Card className="flex items-center gap-4 hover:border-primary">
          <BookOpen size={32} className="text-primary" aria-hidden="true" />
          <div>
            <h3 className="text-xl font-bold text-text">Aprender más</h3>
            <p className="text-text-muted">Conoce las señales de alerta antes de practicar.</p>
          </div>
        </Card>
      </Link>

      <Card className="bg-primary-light border-primary/20">
        <h3 className="text-xl font-bold text-primary mb-2">Consejo del día</h3>
        <p className="text-text">
          Ningún banco o empresa confiable te pedirá tu contraseña o código de
          seguridad por teléfono, mensaje o correo.
        </p>
      </Card>
    </div>
  );
}
