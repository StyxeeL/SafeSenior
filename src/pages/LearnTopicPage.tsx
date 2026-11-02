import { useParams, Navigate, Link } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, Phone, MessageSquare, MessageCircle, Mail, CheckCircle } from 'lucide-react';
import { getTopicById } from '@/data/learnContent';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

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
  const topic = topicId ? getTopicById(topicId) : undefined;

  if (!topic) {
    return <Navigate to="/aprende" replace />;
  }

  const Icon = iconMap[topic.icon] || AlertTriangle;

  return (
    <div className="space-y-6">
      <Link to="/aprende" className="inline-flex items-center gap-2 text-primary font-semibold">
        <ArrowLeft size={24} aria-hidden="true" />
        Volver a Aprende
      </Link>

      <section className="flex items-center gap-4">
        <div className={`shrink-0 p-4 rounded-2xl ${topic.bg}`}>
          <Icon size={40} className={topic.color} aria-hidden="true" />
        </div>
        <div>
          <h2 className="page-title">{topic.title}</h2>
          <p className="page-subtitle">{topic.description}</p>
        </div>
      </section>

      <div className="space-y-4">
        {topic.sections.map((section, index) => (
          <Card key={index}>
            <h3 className="text-xl font-bold text-text mb-3">{section.heading}</h3>
            <div className="space-y-3">
              {section.paragraphs.map((paragraph, pIndex) => (
                <p key={pIndex} className="text-text leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
            {section.tips && section.tips.length > 0 && (
              <div className="mt-4 p-4 bg-primary-light rounded-xl">
                <p className="font-bold text-primary mb-2">Consejos clave</p>
                <ul className="list-disc list-inside space-y-1 text-text">
                  {section.tips.map((tip, tIndex) => (
                    <li key={tIndex}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </Card>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link to="/practica" className="flex-1">
          <Button fullWidth>Practicar este tema</Button>
        </Link>
        <Link to="/evaluame" className="flex-1">
          <Button variant="outline" fullWidth>
            Evaluarme
          </Button>
        </Link>
      </div>
    </div>
  );
}
