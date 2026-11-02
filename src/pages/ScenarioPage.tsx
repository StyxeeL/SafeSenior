import { useParams, Navigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, AlertTriangle, Info } from 'lucide-react';
import { getModuleById, getScenarioById, type ModuleId } from '@/data/practiceScenarios';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PhoneCall } from '@/components/simulation/PhoneCall';
import { SMSMessage } from '@/components/simulation/SMSMessage';
import { WhatsAppChat } from '@/components/simulation/WhatsAppChat';
import { EmailViewer } from '@/components/simulation/EmailViewer';
import { useProgress } from '@/hooks/useProgress';

export function ScenarioPage() {
  const { moduleId, scenarioId } = useParams<{ moduleId: ModuleId; scenarioId: string }>();
  const module = moduleId ? getModuleById(moduleId) : undefined;
  const scenario = scenarioId ? getScenarioById(scenarioId) : undefined;
  const { recordScenarioAttempt } = useProgress();

  const [runKey, setRunKey] = useState(0);

  if (!module || !scenario || scenario.moduleId !== module.id) {
    return <Navigate to="/practica" replace />;
  }

  const handleComplete = (correct: boolean) => {
    recordScenarioAttempt(module.id, scenario.id, correct);
  };

  const handleRestart = () => {
    setRunKey((prev) => prev + 1);
  };

  const hasInteractiveContent = Boolean(scenario.content);

  return (
    <div className="space-y-6">
      <Link
        to={`/practica/${module.id}`}
        className="inline-flex items-center gap-2 text-primary font-semibold"
      >
        <ArrowLeft size={24} aria-hidden="true" />
        Volver a {module.title}
      </Link>

      <section>
        <div className="flex items-center gap-2 mb-2">
          <module.icon size={28} className={module.color} aria-hidden="true" />
          <span className="text-text-muted font-medium">{module.subtitle}</span>
        </div>
        <h2 className="page-title mb-2">{scenario.title}</h2>
        <Badge variant="warning">{scenario.difficulty}</Badge>
      </section>

      {hasInteractiveContent ? (
        <div key={runKey}>
          {scenario.content?.type === 'vishing' && (
            <PhoneCall
              content={scenario.content}
              onComplete={handleComplete}
              onRestart={handleRestart}
            />
          )}
          {scenario.content?.type === 'smishing' && (
            <SMSMessage
              content={scenario.content}
              onComplete={handleComplete}
              onRestart={handleRestart}
            />
          )}
          {scenario.content?.type === 'whatsapp' && (
            <WhatsAppChat
              content={scenario.content}
              onComplete={handleComplete}
              onRestart={handleRestart}
            />
          )}
          {scenario.content?.type === 'email' && (
            <EmailViewer
              content={scenario.content}
              onComplete={handleComplete}
              onRestart={handleRestart}
            />
          )}
        </div>
      ) : (
        <>
          <Card>
            <h3 className="text-xl font-bold text-text mb-3">Situación</h3>
            <p className="text-text leading-relaxed">{scenario.summary}</p>
          </Card>

          <Card className="bg-warning/10 border-warning/30">
            <h3 className="text-xl font-bold text-text mb-3 flex items-center gap-2">
              <AlertTriangle size={24} className="text-warning" aria-hidden="true" />
              Señales de alerta
            </h3>
            <ul className="list-disc list-inside space-y-2 text-text">
              {scenario.alertSignals.map((signal, index) => (
                <li key={index}>{signal}</li>
              ))}
            </ul>
          </Card>

          <Card className="bg-primary-light border-primary/20">
            <div className="flex items-start gap-3">
              <Info size={28} className="text-primary shrink-0 mt-1" aria-hidden="true" />
              <div>
                <h3 className="text-xl font-bold text-primary mb-2">Simulación educativa</h3>
                <p className="text-text">
                  Pronto podrás vivir este escenario de forma interactiva. Por ahora, repasa las
                  señales de alerta y recuerda que ningún ejercicio de SafeSenior utiliza datos ni
                  realiza operaciones reales.
                </p>
              </div>
            </div>
          </Card>
        </>
      )}

      <Card className="bg-primary-light border-primary/20">
        <div className="flex items-start gap-3">
          <Info size={28} className="text-primary shrink-0 mt-1" aria-hidden="true" />
          <div>
            <h3 className="text-xl font-bold text-primary mb-2">Recuerda</h3>
            <p className="text-text">
              Este es un ejercicio educativo ficticio. No se realizan llamadas, mensajes ni
              operaciones reales.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
