import { useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSpeech } from './useSpeech';

/**
 * «Escuchar» (D3): lee en voz alta la pantalla actual.
 * Si la pantalla marca bloques con `data-escuchar`, lee solo esos bloques;
 * si no, lee el contenido principal.
 */
export function readableTextOfScreen(): string {
  const main = document.getElementById('main-content');
  if (!main) return '';
  const marked = Array.from(main.querySelectorAll<HTMLElement>('[data-escuchar]'));
  const source = marked.length > 0 ? marked : [main];
  return source
    .map((el) => el.innerText)
    .join('. ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 1500);
}

export function useReadAloud() {
  const { supported, speaking, toggle, cancel } = useSpeech();
  const location = useLocation();

  // Al cambiar de pantalla, se detiene la lectura anterior.
  useEffect(() => {
    cancel();
  }, [location.pathname, cancel]);

  const toggleRead = useCallback(
    (text?: string) => toggle(text ?? readableTextOfScreen()),
    [toggle]
  );

  return { supported, speaking, toggleRead, cancel };
}
