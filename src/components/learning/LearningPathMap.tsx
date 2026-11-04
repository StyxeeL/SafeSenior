import { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Smartphone,
  Target,
  ShieldCheck,
  Trophy,
  Lock,
  Check,
  Sparkles,
  ArrowRight,
  RotateCcw,
  LocateFixed,
} from 'lucide-react';
import {
  learningPathModules,
  finalGraduationStep,
  allPathSteps,
  type LearningPathStep,
} from '@/data/learningPath';
import { useProgress } from '@/hooks/useProgress';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

// Icon resolver helper
function getStepIcon(step: LearningPathStep) {
  switch (step.iconName) {
    case 'book':
      return BookOpen;
    case 'phone':
      return Smartphone;
    case 'target':
      return Target;
    case 'shield':
      return ShieldCheck;
    case 'trophy':
      return Trophy;
    default:
      return BookOpen;
  }
}

// Calculate horizontal offset in px for nice gentle zigzag
function getStepOffset(stepIndexInModule: number): number {
  switch (stepIndexInModule % 4) {
    case 0:
      return 0;
    case 1:
      return 46;
    case 2:
      return -46;
    case 3:
      return 0;
    default:
      return 0;
  }
}

export function LearningPathMap() {
  const navigate = useNavigate();
  const { progress } = useProgress();
  const activeStepRef = useRef<HTMLDivElement | null>(null);

  // Modal states
  const [lockedModalStep, setLockedModalStep] = useState<LearningPathStep | null>(null);
  const [reviewModalStep, setReviewModalStep] = useState<LearningPathStep | null>(null);

  // Helper to test if a step is completed
  const isStepCompleted = useMemo(() => {
    return (step: LearningPathStep): boolean => {
      if (step.type === 'theory') {
        return Boolean(progress.completedTopics?.includes(step.targetId));
      }
      if (step.type === 'practice') {
        const mod = progress.modules.find((m) => m.moduleId === step.moduleId);
        const sc = mod?.scenarios.find((s) => s.scenarioId === step.targetId);
        return Boolean(sc?.completed && sc?.correct);
      }
      if (step.type === 'quiz') {
        return progress.quizzes.some((q) => q.quizId === step.targetId);
      }
      if (step.type === 'final') {
        return progress.quizzes.some((q) => q.quizId === 'quiz-final');
      }
      return false;
    };
  }, [progress]);

  // Determine unlock status and the single active step
  const { stepStatuses, activeStep } = useMemo(() => {
    const statuses: Record<string, 'completed' | 'active' | 'locked'> = {};
    let currentActive: LearningPathStep | null = null;

    for (let i = 0; i < allPathSteps.length; i++) {
      const step = allPathSteps[i];
      const completed = isStepCompleted(step);

      if (completed) {
        statuses[step.id] = 'completed';
      } else if (!currentActive) {
        // The first uncompleted step is the ACTIVE step
        statuses[step.id] = 'active';
        currentActive = step;
      } else {
        // Any subsequent step is locked
        statuses[step.id] = 'locked';
      }
    }

    // If everything is completed, active step can be the final graduation step
    if (!currentActive) {
      currentActive = finalGraduationStep;
    }

    return { stepStatuses: statuses, activeStep: currentActive };
  }, [isStepCompleted]);

  const scrollToActive = () => {
    if (activeStepRef.current) {
      activeStepRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      activeStepRef.current.focus?.();
    }
  };

  // AUTO-SCROLL: A medida que se avanza en el camino, la pantalla se centra automáticamente
  // en la actividad activa actual para que el adulto mayor no tenga que bajar manualmente.
  useEffect(() => {
    if (!activeStep) return;

    const timer = setTimeout(() => {
      if (activeStepRef.current) {
        activeStepRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }, 280);

    return () => clearTimeout(timer);
  }, [activeStep?.id]);

  // Handle clicking a node
  const handleStepClick = (step: LearningPathStep) => {
    const status = stepStatuses[step.id];

    if (status === 'locked') {
      setLockedModalStep(step);
      return;
    }

    if (status === 'completed') {
      setReviewModalStep(step);
      return;
    }

    // Active step -> go directly
    navigate(step.link);
  };

  return (
    <div className="relative pb-24 space-y-12">
      {/* List of modules in order */}
      {learningPathModules.map((module) => {
        const completedCount = module.steps.filter((s) => stepStatuses[s.id] === 'completed').length;
        const totalCount = module.steps.length;
        const isModuleFinished = completedCount === totalCount;

        return (
          <section
            key={module.id}
            className={`rounded-3xl border-2 ${module.colorScheme.border} ${module.colorScheme.bgLight} p-4 sm:p-6 shadow-sm`}
          >
            {/* Header del Bloque Temático */}
            <div className={`rounded-2xl ${module.colorScheme.bgBanner} text-white p-4 sm:p-5 shadow-md mb-8`}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  {isModuleFinished ? (
                    <span className="inline-flex items-center gap-1 text-xs uppercase font-extrabold tracking-wider bg-white text-green-700 px-3 py-1 rounded-full shadow-sm mb-1">
                      ✓ ¡Módulo completado!
                    </span>
                  ) : (
                    <span className="inline-block text-xs uppercase font-extrabold tracking-wider bg-white/20 px-3 py-1 rounded-full mb-1">
                      {module.title}
                    </span>
                  )}
                  <h3 className="text-xl sm:text-2xl font-black">{module.subtitle}</h3>
                </div>
                <div className="shrink-0 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-xl text-center">
                  <p className="text-xs uppercase font-bold text-white/90">Progreso</p>
                  <p className="text-lg font-black">
                    {completedCount} de {totalCount} pasos
                  </p>
                </div>
              </div>

              {/* Progress bar inside banner */}
              <div className="w-full bg-black/20 h-2.5 rounded-full overflow-hidden mt-3">
                <div
                  className="bg-white h-full transition-all duration-500 rounded-full"
                  style={{ width: `${(completedCount / totalCount) * 100}%` }}
                />
              </div>
            </div>

            {/* Zig-Zag Nodes Container */}
            <div className="relative flex flex-col items-center gap-10 py-4 max-w-sm mx-auto">
              {module.steps.map((step, idx) => {
                const status = stepStatuses[step.id];
                const IconComponent = getStepIcon(step);
                const offsetPx = getStepOffset(idx);
                const isActive = status === 'active';
                const isCompleted = status === 'completed';
                const isLocked = status === 'locked';

                return (
                  <div
                    key={step.id}
                    ref={isActive ? activeStepRef : undefined}
                    className="relative flex flex-col items-center transition-transform duration-300"
                    style={{ transform: `translateX(${offsetPx}px)` }}
                  >
                    {/* Pulsing speech bubble for active node */}
                    {isActive && (
                      <div className="absolute -top-12 z-10 flex flex-col items-center animate-bounce">
                        <div className="bg-text text-white text-xs sm:text-sm font-extrabold px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-1.5 whitespace-nowrap">
                          <Sparkles size={16} className="text-amber-300" />
                          <span>¡Toca aquí para continuar!</span>
                        </div>
                        <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-text" />
                      </div>
                    )}

                    {/* Circular Tactile Node */}
                    <button
                      type="button"
                      onClick={() => handleStepClick(step)}
                      aria-label={`${step.title}. Estado: ${
                        isCompleted ? 'Completado' : isActive ? 'Activo' : 'Bloqueado'
                      }`}
                      className={[
                        'relative flex items-center justify-center rounded-full transition-all duration-200 select-none',
                        'w-20 h-20 sm:w-22 sm:h-22 focus:outline-none focus:ring-4',
                        // Active State
                        isActive
                          ? `${module.colorScheme.nodeBg} text-white shadow-[0_6px_0_rgba(0,0,0,0.25)] ring-4 ring-offset-4 ${module.colorScheme.ringColor} scale-105 active:translate-y-1 active:shadow-[0_2px_0_rgba(0,0,0,0.25)]`
                          // Completed State
                          : isCompleted
                          ? `${module.colorScheme.nodeBg} text-white shadow-[0_5px_0_rgba(0,0,0,0.2)] hover:brightness-110 active:translate-y-1 active:shadow-[0_2px_0_rgba(0,0,0,0.2)]`
                          // Locked State
                          : 'bg-gray-200 text-gray-400 border-b-4 border-gray-300 shadow-sm cursor-pointer hover:bg-gray-250',
                      ].join(' ')}
                    >
                      {/* Inner Icon */}
                      {isLocked ? (
                        <Lock size={32} className="text-gray-400" aria-hidden="true" />
                      ) : (
                        <IconComponent size={36} strokeWidth={2.5} aria-hidden="true" />
                      )}

                      {/* Check badge for completed steps */}
                      {isCompleted && (
                        <span className="absolute -top-1 -right-1 w-7 h-7 bg-white text-green-600 rounded-full flex items-center justify-center shadow-md border-2 border-green-500 font-bold">
                          <Check size={18} strokeWidth={3} />
                        </span>
                      )}
                    </button>

                    {/* Text Label Underneath */}
                    <div className="mt-2 text-center max-w-[150px]">
                      <p
                        className={`text-sm sm:text-base font-bold leading-tight ${
                          isLocked ? 'text-text-muted/70' : 'text-text'
                        }`}
                      >
                        {step.shortTitle}
                      </p>
                      {isCompleted && (
                        <span className="inline-block text-xs font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded-full mt-0.5">
                          ✓ Hecho
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}

      {/* Gran Reto Final: Graduación SafeSenior */}
      <section className="rounded-3xl border-3 border-amber-400 bg-gradient-to-b from-amber-50 to-orange-50 p-6 sm:p-8 shadow-md text-center max-w-md mx-auto">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500 text-white rounded-2xl shadow-md mb-3">
          <Trophy size={36} />
        </div>
        <h3 className="text-2xl font-black text-amber-950">Gran Reto de Graduación</h3>
        <p className="text-amber-900 text-base mt-1 mb-6">
          Demuestra todo lo aprendido en los 4 módulos y obtén tu Diploma de Protector Senior.
        </p>

        {/* Node button for final exam */}
        <div
          ref={activeStep?.id === finalGraduationStep.id ? activeStepRef : undefined}
          className="flex flex-col items-center"
        >
          {stepStatuses[finalGraduationStep.id] === 'active' && (
            <div className="animate-bounce mb-3">
              <span className="bg-amber-600 text-white font-bold text-xs uppercase px-3 py-1 rounded-full shadow">
                ¡Reto Final Disponible!
              </span>
            </div>
          )}

          <button
            type="button"
            onClick={() => handleStepClick(finalGraduationStep)}
            aria-label={`${finalGraduationStep.title}. Estado: ${stepStatuses[finalGraduationStep.id]}`}
            className={[
              'relative flex items-center justify-center w-24 h-24 rounded-full transition-all duration-200 select-none',
              stepStatuses[finalGraduationStep.id] === 'completed'
                ? 'bg-amber-500 text-white shadow-[0_6px_0_#b45309] hover:brightness-110 active:translate-y-1 active:shadow-[0_2px_0_#b45309]'
                : stepStatuses[finalGraduationStep.id] === 'active'
                ? 'bg-amber-500 text-white shadow-[0_6px_0_#b45309] ring-4 ring-offset-4 ring-amber-400 animate-pulse scale-110 active:translate-y-1 active:shadow-[0_2px_0_#b45309]'
                : 'bg-gray-200 text-gray-400 border-b-4 border-gray-300 shadow-sm cursor-pointer hover:bg-gray-250',
            ].join(' ')}
          >
            {stepStatuses[finalGraduationStep.id] === 'locked' ? (
              <Lock size={36} />
            ) : (
              <Trophy size={44} strokeWidth={2.5} />
            )}

            {stepStatuses[finalGraduationStep.id] === 'completed' && (
              <span className="absolute -top-1 -right-1 w-8 h-8 bg-white text-green-600 rounded-full flex items-center justify-center shadow-md border-2 border-green-500 font-bold">
                <Check size={20} strokeWidth={3} />
              </span>
            )}
          </button>

          <p className="font-extrabold text-lg text-amber-950 mt-3">
            {stepStatuses[finalGraduationStep.id] === 'completed'
              ? '🎓 ¡Graduado con Éxito!'
              : 'Evaluación Integradora'}
          </p>
        </div>
      </section>

      {/* Sticky Bottom Action Bar (HUD para adultos mayores) con botón de auto-centrado */}
      {activeStep && (
        <aside
          className="fixed bottom-24 left-0 right-0 z-20 px-4 pointer-events-none"
          aria-label="Acceso rápido al siguiente paso"
        >
          <div className="max-w-lg mx-auto pointer-events-auto bg-white/95 backdrop-blur-md border-2 border-primary shadow-2xl rounded-2xl p-3 sm:p-4 flex items-center justify-between gap-3 animate-fade-in">
            <div
              className="flex-1 min-w-0 cursor-pointer group"
              onClick={scrollToActive}
              title="Toca para centrar en este paso"
            >
              <span className="text-xs uppercase font-extrabold tracking-wider text-primary flex items-center gap-1 group-hover:underline">
                <LocateFixed size={14} /> Siguiente actividad:
              </span>
              <p className="text-base sm:text-lg font-black text-text truncate group-hover:text-primary transition-colors">
                {activeStep.title}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={scrollToActive}
                className="p-2.5 rounded-xl bg-primary-light text-primary hover:bg-primary hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary shadow-xs"
                title="Centrar pantalla en tu actividad actual"
                aria-label="Centrar pantalla en tu actividad actual"
              >
                <LocateFixed size={22} />
              </button>
              <Button
                size="lg"
                onClick={() => navigate(activeStep.link)}
                rightIcon={<ArrowRight size={22} />}
                className="shadow-md font-bold px-4 sm:px-5"
              >
                Continuar
              </Button>
            </div>
          </div>
        </aside>
      )}

      {/* Modal: Paso Bloqueado */}
      <Modal
        isOpen={Boolean(lockedModalStep)}
        onClose={() => setLockedModalStep(null)}
        title="Paso protegido 🔒"
        footer={
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Button
              fullWidth
              size="lg"
              onClick={() => {
                setLockedModalStep(null);
                scrollToActive();
              }}
              leftIcon={<ArrowRight size={22} />}
            >
              Ver mi paso activo
            </Button>
            <Button variant="outline" fullWidth onClick={() => setLockedModalStep(null)}>
              Entendido
            </Button>
          </div>
        }
      >
        <div className="space-y-4 py-2">
          <p className="text-text text-lg leading-relaxed">
            Para realizar <strong className="text-primary font-bold">{lockedModalStep?.title}</strong>,
            primero debes completar los pasos anteriores del camino.
          </p>
          <div className="p-4 bg-primary-light rounded-2xl border border-primary/20">
            <p className="text-sm font-bold uppercase tracking-wider text-primary mb-1">
              Paso que debes completar primero:
            </p>
            <p className="text-lg font-extrabold text-text">{activeStep?.title}</p>
          </div>
          <p className="text-text-muted text-base">
            ¡Vas muy bien! Sigue avanzando paso a paso sin prisas.
          </p>
        </div>
      </Modal>

      {/* Modal: Repasar Paso Completado */}
      <Modal
        isOpen={Boolean(reviewModalStep)}
        onClose={() => setReviewModalStep(null)}
        title="¿Deseas repasar esta lección?"
        footer={
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Button
              fullWidth
              size="lg"
              onClick={() => {
                if (reviewModalStep) {
                  navigate(reviewModalStep.link);
                }
              }}
              leftIcon={<RotateCcw size={22} />}
            >
              Repasar lección
            </Button>
            <Button variant="outline" fullWidth onClick={() => setReviewModalStep(null)}>
              Cerrar
            </Button>
          </div>
        }
      >
        <div className="space-y-3 py-2">
          <p className="text-text text-lg leading-relaxed">
            Ya completaste con éxito{' '}
            <strong className="text-primary font-bold">{reviewModalStep?.title}</strong>.
          </p>
          <p className="text-text-muted text-base">
            Puedes repasar la teoría o repetir los ejercicios tantas veces como desees para mantenerte
            alerta frente a las estafas.
          </p>
        </div>
      </Modal>
    </div>
  );
}
