import { useParams, Navigate, Link } from 'react-router-dom';
import { useState, useMemo, useCallback } from 'react';
import {
  ArrowLeft,
  AlertTriangle,
  Info,
  CheckCircle2,
  MapPin,
  RefreshCw,
  HelpCircle,
  Smartphone,
  XCircle,
} from 'lucide-react';
import { getModuleById, getScenarioById, type ModuleId } from '@/data/practiceScenarios';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { PhoneCall } from '@/components/simulation/PhoneCall';
import { SMSMessage } from '@/components/simulation/SMSMessage';
import { WhatsAppChat } from '@/components/simulation/WhatsAppChat';
import { EmailViewer } from '@/components/simulation/EmailViewer';
import { useProgress } from '@/hooks/useProgress';
import { useSettings } from '@/hooks/useSettings';
import { playFeedbackSound } from '@/utils/sound';

export function ScenarioPage() {
  const { moduleId, scenarioId } = useParams<{ moduleId: ModuleId; scenarioId: string }>();
  const module = moduleId ? getModuleById(moduleId) : undefined;
  const initialScenario = scenarioId ? getScenarioById(scenarioId) : undefined;
  const { recordScenarioAttempt } = useProgress();
  const { settings } = useSettings();

  const originalScenarioId = scenarioId || '';
  const [currentScenarioId, setCurrentScenarioId] = useState<string>(originalScenarioId);
  const [runKey, setRunKey] = useState(0);

  // Estados de la pregunta y evaluación
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [hasSwitchedScenario, setHasSwitchedScenario] = useState(false);

  const currentScenario = useMemo(() => {
    return getScenarioById(currentScenarioId) || initialScenario;
  }, [currentScenarioId, initialScenario]);

  if (!module || !initialScenario || initialScenario.moduleId !== module.id || !currentScenario) {
    return <Navigate to="/" replace />;
  }

  const selectedChoice = currentScenario.content?.choices.find((c) => c.id === selectedChoiceId);

  const handleSelectChoice = useCallback(
    (choiceId: string) => {
      if (showFeedback) return;

      const choice = currentScenario.content?.choices.find((c) => c.id === choiceId);
      if (!choice) return;

      setSelectedChoiceId(choiceId);
      setShowFeedback(true);

      if (settings.sound) {
        playFeedbackSound(choice.isCorrect);
      }

      if (choice.isCorrect) {
        setIsSuccess(true);
        // Marcamos como completado el escenario actual y el paso original del camino
        recordScenarioAttempt(module.id, currentScenario.id, true);
        recordScenarioAttempt(module.id, originalScenarioId, true);
      } else {
        setIsSuccess(false);
        // Si falló, registramos intento fallido SIN marcar como completado
        recordScenarioAttempt(module.id, currentScenario.id, false);
      }
    },
    [showFeedback, currentScenario, settings.sound, module.id, originalScenarioId, recordScenarioAttempt]
  );

  const handleRestartCurrent = () => {
    setSelectedChoiceId(null);
    setShowFeedback(false);
    setIsSuccess(false);
    setRunKey((prev) => prev + 1);
  };

  const handleTryAlternative = () => {
    // Buscar otros escenarios interactivos del mismo módulo con contexto diferente
    const candidateScenarios = module.scenarios.filter(
      (s) => s.id !== currentScenarioId && Boolean(s.content)
    );

    if (candidateScenarios.length > 0) {
      // Priorizar uno que no sea el original
      const nonOriginalCandidates = candidateScenarios.filter((s) => s.id !== originalScenarioId);
      const chosenScenario =
        nonOriginalCandidates.length > 0 ? nonOriginalCandidates[0] : candidateScenarios[0];

      setCurrentScenarioId(chosenScenario.id);
      setHasSwitchedScenario(true);
      setSelectedChoiceId(null);
      setShowFeedback(false);
      setIsSuccess(false);
      setRunKey((prev) => prev + 1);
    } else {
      handleRestartCurrent();
    }
  };

  const hasInteractiveContent = Boolean(currentScenario.content);

  return (
    <div className="space-y-6">
      <Link to="/" className="inline-flex items-center gap-2 text-primary font-semibold text-lg">
        <ArrowLeft size={24} aria-hidden="true" />
        Volver a mi camino
      </Link>

      {/* Encabezado del Ejercicio */}
      <section>
        <div className="flex items-center gap-2 mb-2">
          <module.icon size={28} className={module.color} aria-hidden="true" />
          <span className="text-text-muted font-medium">{module.subtitle}</span>
        </div>
        <h2 className="page-title mb-2">{currentScenario.title}</h2>
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="warning">{currentScenario.difficulty}</Badge>
          {hasSwitchedScenario && (
            <span className="inline-flex items-center gap-1 text-sm bg-amber-100 text-amber-800 px-3 py-1 rounded-full font-bold">
              <RefreshCw size={16} /> Caso alternativo de refuerzo
            </span>
          )}
        </div>
      </section>

      {/* Notificación si cambió a un caso alternativo */}
      {hasSwitchedScenario && !isSuccess && (
        <Card className="bg-amber-50 border-2 border-amber-300 p-4 shadow-sm animate-fade-in">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-amber-200 text-amber-900 rounded-xl shrink-0 mt-0.5">
              <RefreshCw size={22} />
            </div>
            <div>
              <p className="font-extrabold text-amber-950 text-base">
                Nuevo contexto para practicar
              </p>
              <p className="text-amber-900 text-base leading-relaxed mt-0.5">
                Observa con atención esta nueva situación simulada en el celular. ¡Tómate tu tiempo y elige la opción segura!
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* SECCIÓN 1: EL CELULAR REALISTA (Plataforma Simulada) */}
      <section aria-label="Simulación de pantalla de celular">
        <div className="bg-slate-100/80 p-3 sm:p-5 rounded-3xl border-2 border-slate-200 shadow-inner space-y-3">
          <div className="flex items-center justify-between px-2">
            <span className="text-xs uppercase font-extrabold tracking-wider text-text-muted flex items-center gap-1.5">
              <Smartphone size={16} className="text-primary" /> Pantalla simulada de tu celular
            </span>
            <span className="text-xs bg-white text-gray-600 px-2.5 py-0.5 rounded-full font-bold border border-gray-200 shadow-xs">
              Simulación Ficticia
            </span>
          </div>

          {/* Teléfono Realista */}
          {hasInteractiveContent && (
            <div key={runKey} className="py-1">
              {currentScenario.content?.type === 'vishing' && (
                <PhoneCall
                  content={currentScenario.content}
                  onHangUpDirectly={() => {
                    // Si cuelga directamente desde el teléfono, podemos seleccionar la opción de colgar si existe
                    const hangUpChoice = currentScenario.content?.choices.find(
                      (c) => c.isCorrect && c.label.toLowerCase().includes('cuelg')
                    );
                    if (hangUpChoice && !showFeedback) {
                      handleSelectChoice(hangUpChoice.id);
                    }
                  }}
                />
              )}
              {currentScenario.content?.type === 'smishing' && (
                <SMSMessage content={currentScenario.content} />
              )}
              {currentScenario.content?.type === 'whatsapp' && (
                <WhatsAppChat content={currentScenario.content} />
              )}
              {currentScenario.content?.type === 'email' && (
                <EmailViewer content={currentScenario.content} />
              )}
            </div>
          )}
        </div>
      </section>

      {/* SECCIÓN 2: EL EJERCICIO / PREGUNTAS (Completamente Separado del Celular) */}
      {hasInteractiveContent && (
        <section aria-label="Pregunta del ejercicio">
          <Card className="border-2 border-primary/30 p-5 sm:p-6 shadow-md space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-primary-light text-primary rounded-2xl shrink-0 mt-0.5">
                <HelpCircle size={30} />
              </div>
              <div>
                <span className="text-xs uppercase font-extrabold tracking-wider text-primary">
                  Ejercicio de práctica
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-text mt-0.5">
                  ¿Qué decisión debes tomar ante esta situación?
                </h3>
                <p className="text-text-muted text-base mt-1">
                  Revisa los detalles en la pantalla del celular arriba y selecciona la respuesta más segura:
                </p>
              </div>
            </div>

            {/* Opciones de Respuesta */}
            <div className="space-y-3 pt-2">
              {currentScenario.content?.choices.map((choice) => {
                const isSelected = selectedChoiceId === choice.id;
                const showResult = showFeedback && isSelected;
                const correctSelected = showFeedback && choice.isCorrect;

                return (
                  <button
                    key={choice.id}
                    onClick={() => handleSelectChoice(choice.id)}
                    disabled={showFeedback}
                    className={[
                      'w-full text-left p-4 sm:p-5 rounded-2xl border-2 font-medium text-lg transition-all',
                      'focus:outline-none focus:ring-4 focus:ring-primary/30 active:scale-[0.99]',
                      showResult && choice.isCorrect
                        ? 'bg-green-100 border-success text-success font-bold shadow-xs'
                        : showResult && !choice.isCorrect
                        ? 'bg-red-100 border-danger text-danger font-bold shadow-xs'
                        : correctSelected
                        ? 'bg-green-100 border-success text-success font-bold shadow-xs'
                        : 'bg-surface border-gray-200 hover:border-primary hover:bg-primary-light text-text',
                    ].join(' ')}
                    aria-pressed={isSelected}
                  >
                    <div className="flex items-center gap-3">
                      {showResult && choice.isCorrect && (
                        <CheckCircle2 size={26} className="text-success shrink-0" aria-hidden="true" />
                      )}
                      {showResult && !choice.isCorrect && (
                        <XCircle size={26} className="text-danger shrink-0" aria-hidden="true" />
                      )}
                      <span>{choice.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* SECCIÓN 3: RETROALIMENTACIÓN EDUCATIVA */}
            {showFeedback && selectedChoice && (
              <div className="pt-2 animate-fade-in">
                {isSuccess ? (
                  // Caso: ACIERTO
                  <Card className="bg-green-50 border-2 border-green-500 p-5 space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-green-200 text-green-900 rounded-2xl shrink-0 mt-0.5">
                        <CheckCircle2 size={32} className="text-green-700" />
                      </div>
                      <div>
                        <h4 className="text-xl font-black text-green-950">¡Excelente decisión!</h4>
                        <p className="text-base sm:text-lg text-green-900 font-medium mt-1 leading-relaxed">
                          {currentScenario.content?.feedback.correct}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row gap-3">
                      <Link to="/" className="flex-1">
                        <Button fullWidth size="lg" leftIcon={<MapPin size={24} />}>
                          Continuar en mi camino
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        onClick={handleRestartCurrent}
                        leftIcon={<RefreshCw size={20} />}
                      >
                        Repasar este caso
                      </Button>
                    </div>
                  </Card>
                ) : (
                  // Caso: ERROR / TRAMPA
                  <Card className="bg-red-50 border-2 border-red-500 p-5 space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-red-200 text-red-900 rounded-2xl shrink-0 mt-0.5">
                        <AlertTriangle size={32} className="text-red-700" />
                      </div>
                      <div>
                        <h4 className="text-xl font-black text-red-950">
                          Cuidado: Esta opción era una trampa
                        </h4>
                        <p className="text-base sm:text-lg text-red-900 font-medium mt-1 leading-relaxed">
                          {currentScenario.content?.feedback.incorrect}
                        </p>
                      </div>
                    </div>

                    <div className="p-3 bg-white/90 rounded-2xl border border-red-200 text-text text-base">
                      <p>
                        No te preocupes, aprendemos de la experiencia. Para comprobar que el tema quedó claro,
                        vamos a practicar con <strong>otro caso de diferente contexto</strong>.
                      </p>
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row gap-3">
                      <Button
                        size="lg"
                        onClick={handleTryAlternative}
                        leftIcon={<RefreshCw size={24} />}
                        className="flex-1"
                      >
                        Intentar con otro caso diferente
                      </Button>
                      <Button variant="outline" onClick={handleRestartCurrent}>
                        Revisar este caso de nuevo
                      </Button>
                    </div>
                  </Card>
                )}
              </div>
            )}
          </Card>
        </section>
      )}

      {/* Señales de Alerta de Apoyo */}
      <Card className="bg-warning/10 border-warning/30">
        <h3 className="text-lg font-bold text-text mb-2 flex items-center gap-2">
          <AlertTriangle size={22} className="text-warning" aria-hidden="true" />
          Señales de alerta a recordar en este tipo de situaciones
        </h3>
        <ul className="list-disc list-inside space-y-1.5 text-text text-base">
          {currentScenario.alertSignals.map((signal, index) => (
            <li key={index}>{signal}</li>
          ))}
        </ul>
      </Card>

      <div className="pt-2">
        <Link to="/">
          <Button variant="outline" fullWidth size="lg" leftIcon={<MapPin size={24} />}>
            Volver a Mi Camino
          </Button>
        </Link>
      </div>

      <Card className="bg-primary-light border-primary/20">
        <div className="flex items-start gap-3">
          <Info size={28} className="text-primary shrink-0 mt-1" aria-hidden="true" />
          <div>
            <h3 className="text-lg font-bold text-primary mb-1">Recuerda</h3>
            <p className="text-text text-base leading-relaxed">
              Todos los mensajes, números y llamadas son ficticios y educativos. Ningún botón en SafeSenior realiza transferencias ni envía datos reales.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
