import { useLocation, Link } from 'react-router-dom';
import { Settings } from 'lucide-react';

const titles: Record<string, string> = {
  '/': 'SafeSenior',
  '/progreso': 'Mi Progreso',
  '/configuracion': 'Configuración',
};

function getTitle(pathname: string): string {
  if (titles[pathname]) return titles[pathname];
  if (pathname.startsWith('/aprende/')) return 'Lección';
  if (pathname.startsWith('/practica/')) return 'Práctica';
  if (pathname.startsWith('/evaluame/resultado')) return 'Resultado';
  if (pathname.startsWith('/evaluame')) return 'Reto';
  return 'SafeSenior';
}

export function TopBar() {
  const location = useLocation();
  const title = getTitle(location.pathname);

  return (
    <header className="fixed top-0 left-0 right-0 z-30 bg-primary text-white shadow-md">
      <div className="max-w-3xl mx-auto h-16 px-4 flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-black tracking-tight truncate">{title}</h1>
        <Link
          to="/configuracion"
          className="p-2.5 rounded-full hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white transition-colors"
          aria-label="Ir a Configuración"
        >
          <Settings size={28} aria-hidden="true" />
        </Link>
      </div>
    </header>
  );
}
