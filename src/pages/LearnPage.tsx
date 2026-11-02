import { Card } from '@/components/ui/Card';
import { Phone, MessageSquare, Mail, MessageCircle, AlertTriangle, CheckCircle } from 'lucide-react';

const topics = [
  {
    title: '¿Qué son las estafas digitales?',
    description: 'Conoce las formas más comunes de engaño en internet y teléfono.',
    icon: AlertTriangle,
    color: 'text-danger',
    bg: 'bg-red-100',
  },
  {
    title: 'Llamadas falsas (vishing)',
    description: 'Aprende a identificar cuando alguien finge ser del banco o de un familiar.',
    icon: Phone,
    color: 'text-primary',
    bg: 'bg-blue-100',
  },
  {
    title: 'SMS falsos (smishing)',
    description: 'Mensajes de texto que buscan robar tus datos.',
    icon: MessageSquare,
    color: 'text-warning',
    bg: 'bg-yellow-100',
  },
  {
    title: 'WhatsApp falsos',
    description: 'Mensajes de contactos desconocidos o comprobantes falsos.',
    icon: MessageCircle,
    color: 'text-success',
    bg: 'bg-green-100',
  },
  {
    title: 'Correos falsos (phishing)',
    description: 'Correos que imitan a bancos o instituciones.',
    icon: Mail,
    color: 'text-primary',
    bg: 'bg-primary-light',
  },
  {
    title: 'Señales de alerta',
    description: 'Reconoce los indicios que indican que algo no está bien.',
    icon: AlertTriangle,
    color: 'text-danger',
    bg: 'bg-red-100',
  },
  {
    title: 'Qué hacer si sospechas',
    description: 'Pasos sencillos para protegerte y reportar.',
    icon: CheckCircle,
    color: 'text-success',
    bg: 'bg-green-100',
  },
];

export function LearnPage() {
  return (
    <div className="space-y-6">
      <section>
        <h2 className="page-title mb-2">Aprende</h2>
        <p className="page-subtitle">
          Contenido sencillo para reconocer y prevenir estafas digitales.
        </p>
      </section>

      <div className="grid gap-4">
        {topics.map((topic) => (
          <Card key={topic.title} className="flex items-start gap-4 hover:border-primary">
            <div className={`shrink-0 p-3 rounded-2xl ${topic.bg}`}>
              <topic.icon size={28} className={topic.color} aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-text">{topic.title}</h3>
              <p className="text-text-muted mt-1">{topic.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
