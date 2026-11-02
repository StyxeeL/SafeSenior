import { Card } from '@/components/ui/Card';
import { Phone, MessageSquare, MessageCircle, Mail, ChevronRight } from 'lucide-react';

const modules = [
  {
    id: 'vishing',
    title: 'Llamadas falsas',
    subtitle: 'Vishing',
    description: 'Simula llamadas de personas que intentan engañarte.',
    icon: Phone,
    color: 'text-primary',
    bg: 'bg-primary-light',
  },
  {
    id: 'smishing',
    title: 'SMS falsos',
    subtitle: 'Smishing',
    description: 'Identifica mensajes de texto sospechosos.',
    icon: MessageSquare,
    color: 'text-success',
    bg: 'bg-green-100',
  },
  {
    id: 'whatsapp',
    title: 'WhatsApp falsos',
    subtitle: 'WhatsApp',
    description: 'Reconoce mensajes y comprobantes falsos.',
    icon: MessageCircle,
    color: 'text-warning',
    bg: 'bg-yellow-100',
  },
  {
    id: 'phishing',
    title: 'Correos falsos',
    subtitle: 'Phishing',
    description: 'Aprende a detectar correos engañosos.',
    icon: Mail,
    color: 'text-danger',
    bg: 'bg-red-100',
  },
];

export function PracticePage() {
  return (
    <div className="space-y-6">
      <section>
        <h2 className="page-title mb-2">Practica</h2>
        <p className="page-subtitle">
          Elige un módulo y pon a prueba tus habilidades con ejercicios interactivos.
        </p>
      </section>

      <div className="grid gap-4">
        {modules.map((module) => (
          <Card
            key={module.id}
            className="flex items-center gap-4 hover:border-primary"
            role="button"
            aria-label={`Abrir módulo ${module.title}`}
            onClick={() => {
              // Módulos se activarán en fases posteriores.
            }}
          >
            <div className={`shrink-0 p-4 rounded-2xl ${module.bg}`}>
              <module.icon size={32} className={module.color} aria-hidden="true" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-text-muted font-medium">{module.subtitle}</p>
              <h3 className="text-xl font-bold text-text">{module.title}</h3>
              <p className="text-text-muted mt-1">{module.description}</p>
            </div>
            <ChevronRight size={28} className="text-text-muted shrink-0" aria-hidden="true" />
          </Card>
        ))}
      </div>
    </div>
  );
}
