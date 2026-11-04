import { useParams, Navigate, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  AlertTriangle,
  Phone,
  MessageSquare,
  MessageCircle,
  Mail,
  CheckCircle,
  Volume2,
  VolumeX,
  CheckCircle2,
} from 'lucide-react';
import { getTopicById } from '@/data/learnContent';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useSettings } from '@/hooks/useSettings';
import { useSpeech } from '@/hooks/useSpeech';
import { useProgress } from '@/hooks/useProgress';

const iconMap: Record<string, React.ElementType> = {
  AlertTriangle,
  Phone,
  MessageSquare,
  MessageCircle,
  Mail,
  CheckCircle,
};

export function LearnTopicPage() {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const topic = topicId ? getTopicById(topicId) : undefined;
  const { settings } = useSettings();
  const { supported: speechSupported, speaking, toggle } = useSpeech();
  const { recordTopicCompleted, isTopicCompleted } = useProgress();

  if (!topic) {
    return <Navigate to="/" replace />;
  }

  const isCompleted = isTopicCompleted(topic.id);
  const Icon = iconMap[topic.icon] || AlertTriangle;

  const fullText = [
    topic.title,
    topic.description,
    ...topic.sections.flatMap((section) => [
      section.heading,
      ...section.paragraphs,
      ...(section.tips ? ['Consejos clave', ...section.tips] : []),
    ]),
  ].join('. ');

  const handleFinish = () => {
    recordTopicCompleted(topic.id);
    navigate('/');
  };

  return (
    <div className="space-y-6">
      <Link to="/" className="inline-flex items-center gap-2 text-primary font-semibold text-lg">
        <ArrowLeft size={24} aria-hidden="true" />
        Volver a mi camino
      </Link>

      <section className="flex items-center gap-4">
        <div className={`shrink-0 p-4 rounded-2xl ${topic.bg}`}>
          <Icon size={40} className={topic.color} aria-hidden="true" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="page-title">{topic.title}</h2>
            {isCompleted && (
              <span className="inline-flex items-center gap-1 text-sm bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">
                <CheckCircle2 size={16} /> Leído
              </span>
            )}
          </div>
          <p className="page-subtitle">{topic.description}</p>
        </div>
        {settings.audioInstructions && speechSupported && (
          <button
            type="button"
            onClick={() => toggle(fullText)}
            className="p-3 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors focus:outline-none focus:ring-4 focus:ring-primary/30"
            aria-label={speaking ? 'Detener audio' : 'Escuchar contenido en voz alta'}
            aria-pressed={speaking}
          >
            {speaking ? <VolumeX size={24} aria-hidden="true" /> : <Volume2 size={24} aria-hidden="true" />}
          </button>
        )}
      </section>

      <div className="space-y-4">
        {topic.sections.map((section, index) => (
          <Card key={index}>
            <h3 className="text-xl font-bold text-text mb-3">{section.heading}</h3>
            <div className="space-y-3">
              {section.paragraphs.map((paragraph, pIndex) => (
                <p key={pIndex} className="text-text leading-relaxed text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
            {section.tips && section.tips.length > 0 && (
              <div className="mt-4 p-4 bg-primary-light rounded-xl">
                <p className="font-bold text-primary mb-2 text-lg">Consejos clave</p>
                <ul className="list-disc list-inside space-y-2 text-text text-lg">
                  {section.tips.map((tip, tIndex) => (
                    <li key={tIndex}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </Card>
        ))}
      </div>

      <div className="pt-4 space-y-3">
        <Button fullWidth size="lg" onClick={handleFinish} leftIcon={<CheckCircle2 size={24} />}>
          {isCompleted ? 'Volver a mi camino' : '¡Entendido! Completar y continuar mi camino'}
        </Button>
      </div>
    </div>
  );
}
