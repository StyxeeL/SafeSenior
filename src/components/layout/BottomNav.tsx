import { Link, useLocation } from 'react-router-dom';
import { Map, BarChart3, Settings } from 'lucide-react';

const navItems = [
  { to: '/', label: 'Mi Camino', icon: Map },
  { to: '/progreso', label: 'Mi Progreso', icon: BarChart3 },
  { to: '/configuracion', label: 'Configuración', icon: Settings },
];

export function BottomNav() {
  const location = useLocation();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-30 bg-surface border-t border-gray-200 shadow-[0_-2px_12px_rgba(0,0,0,0.08)]"
      aria-label="Navegación principal"
    >
      <div className="max-w-2xl mx-auto px-2">
        <ul className="flex items-center justify-around h-22">
          {navItems.map((item) => {
            const isActive =
              item.to === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(item.to);
            return (
              <li key={item.to} className="flex-1 max-w-[180px]">
                <Link
                  to={item.to}
                  className={[
                    'flex flex-col items-center justify-center gap-1.5 w-full h-full py-2 rounded-2xl',
                    'text-base sm:text-lg font-bold transition-all duration-200',
                    'focus:outline-none focus:bg-primary-light',
                    isActive
                      ? 'text-primary bg-primary-light/60 shadow-inner'
                      : 'text-text-muted hover:text-text hover:bg-gray-100',
                  ].join(' ')}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <item.icon
                    size={32}
                    strokeWidth={isActive ? 2.8 : 2}
                    aria-hidden="true"
                  />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
