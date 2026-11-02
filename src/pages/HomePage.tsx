import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Shield, Play, ClipboardCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export function HomePage() {
  return (
    <div className="space-y-6">
      <section className="text-center py-6">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-light rounded-full mb-4">
          <Shield size={40} className="text-primary" aria-hidden="true" />
        </div>
        <h2 className="page-title mb-2">Bienvenido a SafeSenior</h2>
        <p className="page-subtitle max-w-md mx-auto">
          Aprende a reconocer estafas digitales de forma sencilla y segura.
        </p>
      </section>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link to="/practica" className="block">
          <Card className="h-full flex flex-col items-center text-center gap-3 hover:border-primary">
            <Play size={32} className="text-primary" aria-hidden="true" />
            <h3 className="text-xl font-bold text-text">Practicar ahora</h3>
            <p className="text-text-muted">Ejercicios interactivos paso a paso.</p>
          </Card>
        </Link>

        <Link to="/evaluame" className="block">
          <Card className="h-full flex flex-col items-center text-center gap-3 hover:border-primary">
            <ClipboardCheck size={32} className="text-success" aria-hidden="true" />
            <h3 className="text-xl font-bold text-text">Evaluarme</h3>
            <p className="text-text-muted">Comprueba lo que has aprendido.</p>
          </Card>
        </Link>
      </div>

      <Card>
        <h3 className="text-xl font-bold text-text mb-4">Tu progreso</h3>
        <ProgressBar value={0} label="Progreso general" />
        <p className="text-text-muted mt-4">
          Aún no has completado ejercicios. ¡Empieza practicando hoy!
        </p>
      </Card>

      <Card className="bg-primary-light border-primary/20">
        <h3 className="text-xl font-bold text-primary mb-2">Consejo del día</h3>
        <p className="text-text">
          Ningún banco o empresa confiable te pedirá tu contraseña o código de
          seguridad por teléfono, mensaje o correo.
        </p>
      </Card>
    </div>
  );
}
