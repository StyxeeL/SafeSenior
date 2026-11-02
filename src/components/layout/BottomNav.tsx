import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Gamepad2, ClipboardCheck, BarChart3 } from 'lucide-react';

const navItems = [
  { to: '/', label: 'Inicio', icon: Home },
  { to: '/aprende', label: 'Aprende', icon: BookOpen },
  { to: '/practica', label: 'Practica', icon: Gamepad2 },
  { to: '/evaluame', label: 'Evalúate', icon: ClipboardCheck },
  { to: '/progreso', label: 'Progreso', icon: BarChart3 },
];

export function BottomNav() {
  const location = useLocation();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-30 bg-surface border-t border-gray-200 shadow-[0_-2px_8px_rgba(0,0,0,0.05)]"
      aria-label="Navegación principal"
    >
      <div className="max-w-3xl mx-auto">
        <ul className="flex justify-around items-center h-20">
          {navItems.map((item) => {
            const isActive =
              item.to === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(item.to);
            return (
              <li key={item.to} className="flex-1">
                <Link
                  to={item.to}
                  className={[
                    'flex flex-col items-center justify-center gap-1 h-full w-full',
                    'text-sm sm:text-base font-medium transition-colors duration-200',
                    'focus:outline-none focus:bg-primary-light',
                    isActive ? 'text-primary' : 'text-text-muted hover:text-text',
                  ].join(' ')}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <item.icon
                    size={28}
                    strokeWidth={isActive ? 2.5 : 2}
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
