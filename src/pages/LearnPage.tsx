import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import {
  AlertTriangle,
  Phone,
  MessageSquare,
  Mail,
  MessageCircle,
  CheckCircle,
} from 'lucide-react';
import { learnTopics } from '@/data/learnContent';

const iconMap: Record<string, React.ElementType> = {
  AlertTriangle,
  Phone,
  MessageSquare,
  Mail,
  MessageCircle,
  CheckCircle,
};

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
        {learnTopics.map((topic) => {
          const Icon = iconMap[topic.icon] || AlertTriangle;
          return (
            <Link key={topic.id} to={`/aprende/${topic.id}`} className="block">
              <Card className="flex items-start gap-4 hover:border-primary">
                <div className={`shrink-0 p-3 rounded-2xl ${topic.bg}`}>
                  <Icon size={28} className={topic.color} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text">{topic.title}</h3>
                  <p className="text-text-muted mt-1">{topic.description}</p>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
