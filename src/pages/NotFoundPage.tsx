import { Button } from '@/components/ui/Button';
import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 space-y-6">
      <h2 className="page-title">Página no encontrada</h2>
      <p className="page-subtitle">
        Parece que te perdiste. No te preocupes, podemos llevarte de vuelta.
      </p>
      <Link to="/">
        <Button>Volver al inicio</Button>
      </Link>
    </div>
  );
}
