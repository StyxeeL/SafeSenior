import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { useState, useMemo, useCallback, useEffect } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  MapPin,
  RefreshCw,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  LogOut,
  Info,
  ShieldAlert,
} from 'lucide-react';
import { getModuleById, getScenarioById, type ModuleId, type Scenario } from '@/data/practiceScenarios';
import { moduleTheme } from '@/data/moduleTheme';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { PhoneCall } from '@/components/simulation/PhoneCall';
import { SMSMessage } from '@/components/simulation/SMSMessage';
import { WhatsAppChat } from '@/components/simulation/WhatsAppChat';
import { EmailViewer } from '@/components/simulation/EmailViewer';
import { PracticeTopBar } from '@/components/practice/PracticeTopBar';
import { StepIndicator, PRACTICE_STEPS } from '@/components/practice/StepIndicator';
import { PinnedStimulus } from '@/components/practice/PinnedStimulus';
import { OptionCard } from '@/components/practice/OptionCard';
import { useProgress } from '@/hooks/useProgress';
import { useSettings } from '@/hooks/useSettings';
import { useSpeech } from '@/hooks/useSpeech';
import { playFeedbackSound } from '@/utils/sound';

const LETTERS = ['A', 'B', 'C', 'D'];

const STIMULUS_NAME: Record<string, string> = {
  vishing: 'esta llamada',
  smishing: 'este mensaje de texto',
  whatsapp: 'esta conversación de WhatsApp',
  email: 'este correo',
};

/**
 * Práctica segura en tres pasos fijos: Mirar → Pista → Decidir.
 * Aplica las decisiones del prototipo v2 (Sesión 7):
 *  D1 «Salir seguro» fijo · D3 «Escuchar» · D4 decidir después de revisar y
 *  poder cambiar la respuesta · D5 el botón bloqueado explica qué falta ·
 *  D6 pistas con número · D7 mensaje fijado · D9 pasos en lenguaje cotidiano.
 */
export function ScenarioPage() {
  const { moduleId, scenarioId } = useParams<{ moduleId: ModuleId; scenarioId: string }>();
  const navigate = useNavigate();
  const module = moduleId ? getModuleById(moduleId) : undefined;
  const initialScenario = scenarioId ? getScenarioById(scenarioId) : undefined;
  const { recordScenarioAttempt } = useProgress();
  const { settings } = useSettings();
  const { supported: canSpeak, speaking, toggle: toggleSpeech, cancel: cancelSpeech } = useSpeech();

  const originalScenarioId = scenarioId || '';
  const [currentScenarioId, setCurrentScenarioId] = useState<string>(originalScenarioId);
  const [runKey, setRunKey] = useState(0);

  const [step, setStep] = useState(0);
  const [reviewed, setReviewed] = useState<Set<number>>(new Set());
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [hasSwitchedScenario, setHasSwitchedScenario] = useState(false);
  const [hungUpNote, setHungUpNote] = useState(false);
  const [exitOpen, setExitOpen] = useState(false);

  const currentScenario: Scenario | undefined = useMemo(
    () => getScenarioById(currentScenarioId) || initialScenario,
    [currentScenarioId, initialScenario]
  );

  // Cada cambio de paso empieza arriba y detiene la lectura en curso.
  useEffect(() => {
    window.scrollTo({ top: 0 });
    cancelSpeech();
  }, [step, runKey, cancelSpeech]);

  const resetRun = useCallback(() => {
    setStep(0);
    setReviewed(new Set());
    setSelectedChoiceId(null);
    setConfirmed(false);
    setIsSuccess(false);
    setHungUpNote(false);
    setRunKey((prev) => prev + 1);
  }, []);

  if (!module || !initialScenario || initialScenario.moduleId !== module.id || !currentScenario?.content) {
    return <Navigate to="/" replace />;
  }

  const content = currentScenario.content;
  const pistas = currentScenario.pistas;
  const missing = pistas.length - reviewed.size;
  const selectedChoice = content.choices.find((c) => c.id === selectedChoiceId);
  const stimulusName = STIMULUS_NAME[content.type];
  const theme = moduleTheme[module.id];

  const reviewPista = (index: number) => {
    setReviewed((prev) => new Set(prev).add(index));
  };

  const handleConfirm = () => {
    if (!selectedChoice || confirmed) return;
    setConfirmed(true);
    setIsSuccess(selectedChoice.isCorrect);
    if (settings.sound) playFeedbackSound(selectedChoice.isCorrect);
    // Retroalimentación háptica breve (recomendación de la Sesión 10)
    if ('vibrate' in navigator) {
      navigator.vibrate(selectedChoice.isCorrect ? 60 : [80, 60, 80]);
    }
    if (selectedChoice.isCorrect) {
      recordScenarioAttempt(module.id, currentScenario.id, true);
      recordScenarioAttempt(module.id, originalScenarioId, true);
    } else {
      recordScenarioAttempt(module.id, currentScenario.id, false);
    }
  };

  const handleTryAlternative = () => {
    const candidates = module.scenarios.filter((s) => s.id !== currentScenarioId && Boolean(s.content));
    const nonOriginal = candidates.filter((s) => s.id !== originalScenarioId);
    const chosen = nonOriginal[0] ?? candidates[0];
    if (chosen) {
      setCurrentScenarioId(chosen.id);
      setHasSwitchedScenario(true);
    }
    resetRun();
  };

  const handleBack = () => {
    if (step > 0 && !confirmed) setStep(step - 1);
    else navigate('/');
  };

  const speechText = (() => {
    if (step === 0) {
      return `Paso 1, Mirar. Mira con calma ${stimulusName}. Todavía no tienes que decidir nada.`;
    }
    if (step === 1) {
      const list = pistas.map((p, i) => `Pista ${i + 1}: ${p.label}. ${p.detail}`).join(' ');
      return `Paso 2, Pista. Toca cada pista marcada en amarillo. ${list}`;
    }
    const opts = content.choices.map((c, i) => `Opción ${LETTERS[i]}: ${c.label}.`).join(' ');
    return `Paso 3, Decidir. ¿Qué harías ahora? ${opts}`;
  })();

  return (
    <div className="pb-6">
      <PracticeTopBar
        step={step}
        canSpeak={canSpeak}
        speaking={speaking}
        onBack={handleBack}
        onListen={() => toggleSpeech(speechText)}
        onSafeExit={() => setExitOpen(true)}
      />

      <StepIndicator current={step} activeClass={`${theme.solid} ${theme.border}`} />
      <p className="flex items-center gap-2 text-sm font-bold text-text-muted mb-1">
        <span className={`shrink-0 w-8 h-8 rounded-lg ${theme.solid} flex items-center justify-center`}>
          <module.icon size={18} strokeWidth={2.4} aria-hidden="true" />
        </span>
        <span>
          <span className={theme.text}>{module.title}</span> · {currentScenario.title}
        </span>
      </p>

      {hasSwitchedScenario && step === 0 && (
        <div className="mb-4 rounded-2xl border-2 border-warning bg-warning-light p-3 flex items-start gap-3">
          <RefreshCw size={22} className="text-warning shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-sm text-text">
            <strong>Otro caso para practicar.</strong> Es una situación diferente del mismo tema. Tómate tu tiempo.
          </p>
        </div>
      )}

      {/* ───────── PASO 1 · MIRAR ───────── */}
      {step === 0 && (
        <section className="space-y-4" aria-label="Paso 1: Mirar">
          <div data-escuchar>
            <h2 className="page-title">Mira con calma {stimulusName}</h2>
            <p className="text-text-muted mt-1">
              {content.type === 'vishing'
                ? 'Toca «Contestar» para oír lo que dice. Todavía no tienes que decidir nada.'
                : 'Lee todo el mensaje. Todavía no tienes que decidir nada.'}
            </p>
          </div>

          <div key={runKey}>
            {content.type === 'vishing' && (
              <PhoneCall
                content={content}
                onHangUpDirectly={() => {
                  setHungUpNote(true);
                  setStep(1);
                }}
              />
            )}
            {content.type === 'smishing' && <SMSMessage content={content} />}
            {content.type === 'whatsapp' && <WhatsAppChat content={content} />}
            {content.type === 'email' && <EmailViewer content={content} />}
          </div>

          <p className="flex items-start gap-2 text-sm text-text-muted">
            <ShieldCheck size={20} className="text-success shrink-0 mt-0.5" aria-hidden="true" />
            Todo es una práctica: no se usa tu dinero ni tus datos.
          </p>

          <Button fullWidth onClick={() => setStep(1)} rightIcon={<ArrowRight size={22} />}>
            Siguiente: buscar pistas
          </Button>
        </section>
      )}

      {/* ───────── PASO 2 · PISTA ───────── */}
      {step === 1 && (
        <section className="space-y-4" aria-label="Paso 2: Pista">
          {hungUpNote && (
            <div className="rounded-2xl border-2 border-success bg-success-light p-3 text-sm">
              <strong className="text-success">Colgar fue una buena reacción.</strong> Ahora revisa qué decía la
              llamada para reconocerla la próxima vez.
            </div>
          )}
          <div data-escuchar>
            <h2 className="page-title">Toca las {pistas.length} pistas</h2>
            <p className="text-text-muted mt-1">
              Cada <span className="font-bold text-warning">⚠ pista</span> te explica una señal de engaño. Tócalas
              todas para poder decidir.
            </p>
          </div>

          <div className="flex items-center gap-3" aria-live="polite">
            <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-success rounded-full transition-all"
                style={{ width: `${(reviewed.size / pistas.length) * 100}%` }}
              />
            </div>
            <span className="font-bold text-sm whitespace-nowrap">
              {reviewed.size} de {pistas.length} revisadas
            </span>
          </div>

          <DangerNote />
          <PinnedStimulus content={content} pistas={pistas} reviewed={reviewed} onPistaClick={reviewPista} />

          <div className="flex flex-col gap-3 pt-1">
            <Button
              fullWidth
              disabled={missing > 0}
              onClick={() => setStep(2)}
              rightIcon={missing > 0 ? undefined : <ArrowRight size={22} />}
            >
              {missing > 0
                ? `Te ${missing === 1 ? 'falta 1 pista' : `faltan ${missing} pistas`} para poder decidir`
                : 'Siguiente: decidir'}
            </Button>
            <Button variant="outline" fullWidth onClick={() => setStep(0)} leftIcon={<ArrowLeft size={22} />}>
              Anterior
            </Button>
          </div>
        </section>
      )}

      {/* ───────── PASO 3 · DECIDIR ───────── */}
      {step === 2 && (
        <section className="space-y-4" aria-label="Paso 3: Decidir">
          <DangerNote />
          <PinnedStimulus content={content} pistas={pistas} reviewed={reviewed} />

          <div data-escuchar>
            <h2 className="text-2xl font-bold">¿Qué harías ahora?</h2>
            <p className="text-text-muted text-sm mt-1">
              {confirmed ? 'Esta fue tu respuesta.' : 'Elige una opción. Puedes cambiarla antes de confirmar.'}
            </p>
          </div>

          <div role="radiogroup" aria-label="Opciones de respuesta" className="space-y-3">
            {content.choices.map((choice, i) => {
              const isSelected = selectedChoiceId === choice.id;
              const result = confirmed
                ? isSelected
                  ? choice.isCorrect
                    ? 'correct'
                    : 'incorrect'
                  : choice.isCorrect
                  ? 'safe-answer'
                  : undefined
                : undefined;
              return (
                <OptionCard
                  key={choice.id}
                  letter={LETTERS[i]}
                  label={choice.label}
                  selected={isSelected}
                  result={result}
                  disabled={confirmed}
                  onSelect={() => setSelectedChoiceId(choice.id)}
                />
              );
            })}
          </div>

          {!confirmed && (
            <div className="flex flex-col gap-3 pt-1">
              <Button fullWidth disabled={!selectedChoice} onClick={handleConfirm}>
                {selectedChoice ? 'Confirmar mi respuesta' : 'Elige una opción para confirmar'}
              </Button>
              <Button variant="outline" fullWidth onClick={() => setStep(1)} leftIcon={<ArrowLeft size={22} />}>
                Anterior
              </Button>
            </div>
          )}

          {confirmed && isSuccess && (
            <Card className="border-2 border-success bg-success-light space-y-4" aria-live="polite">
              <div className="flex items-start gap-3" data-escuchar>
                <CheckCircle2 size={32} className="text-success shrink-0" aria-hidden="true" />
                <div>
                  <h3 className="text-xl font-bold text-success">¡Bien hecho!</h3>
                  <p className="mt-1">{content.feedback.correct}</p>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <Button fullWidth onClick={() => navigate('/')} leftIcon={<MapPin size={22} />}>
                  Seguir en mi camino
                </Button>
                <Button variant="outline" fullWidth onClick={resetRun} leftIcon={<RefreshCw size={20} />}>
                  Repasar este caso
                </Button>
              </div>
            </Card>
          )}

          {confirmed && !isSuccess && (
            <Card className="border-2 border-danger bg-danger-light space-y-4" aria-live="polite">
              <div className="flex items-start gap-3" data-escuchar>
                <AlertTriangle size={32} className="text-danger shrink-0" aria-hidden="true" />
                <div>
                  <h3 className="text-xl font-bold text-danger">Esa opción era peligrosa</h3>
                  <p className="mt-1">{content.feedback.incorrect}</p>
                  <p className="mt-2 text-sm">
                    No pasa nada: así se aprende. La opción segura está marcada en verde. Practica con otro caso
                    del mismo tema.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <Button fullWidth onClick={handleTryAlternative} leftIcon={<RefreshCw size={22} />}>
                  Practicar con otro caso
                </Button>
                <Button variant="outline" fullWidth onClick={resetRun}>
                  Repasar este caso
                </Button>
              </div>
            </Card>
          )}
        </section>
      )}

      {/* D1 · Salida segura: confirma sin castigo y recuerda que es una práctica */}
      <Modal
        isOpen={exitOpen}
        onClose={() => setExitOpen(false)}
        title="¿Salir de la práctica?"
        footer={
          <div className="flex flex-col gap-3 w-full">
            <Button variant="safe" fullWidth onClick={() => navigate('/')} leftIcon={<LogOut size={22} />}>
              Sí, salir seguro
            </Button>
            <Button variant="outline" fullWidth onClick={() => setExitOpen(false)}>
              Seguir practicando
            </Button>
          </div>
        }
      >
        <div className="flex items-start gap-3" data-escuchar>
          <Info size={26} className="text-success shrink-0 mt-0.5" aria-hidden="true" />
          <p>
            Tu avance se guarda solo. Esto es una práctica segura: tu dinero y tus datos no corren ningún riesgo.
          </p>
        </div>
      </Modal>

      <span className="sr-only" aria-live="polite">
        Paso {step + 1} de 3: {PRACTICE_STEPS[step]}
      </span>
    </div>
  );
}

/** Rojo = peligro (guía de estilo): avisa que el mensaje fijado es un intento de estafa. */
function DangerNote() {
  return (
    <p className="flex items-center gap-2 rounded-2xl bg-danger-light border-2 border-danger text-danger font-bold text-sm px-3 py-2">
      <ShieldAlert size={22} strokeWidth={2.4} className="shrink-0" aria-hidden="true" />
      Este mensaje tiene señales de estafa. Revísalo con calma.
    </p>
  );
}
