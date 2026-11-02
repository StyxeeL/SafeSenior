import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { DEFAULT_SETTINGS, type UserSettings, type FontSize } from '@/types';

const SETTINGS_KEY = 'settings';

export function useSettings() {
  const [settings, setSettings] = useLocalStorage<UserSettings>(SETTINGS_KEY, DEFAULT_SETTINGS);

  useEffect(() => {
    const html = document.documentElement;

    html.classList.remove('text-normal', 'text-large', 'text-xlarge', 'high-contrast');

    html.classList.add(`text-${settings.fontSize}`);
    if (settings.highContrast) {
      html.classList.add('high-contrast');
    }
  }, [settings]);

  const setFontSize = (fontSize: FontSize) => {
    setSettings((prev) => ({ ...prev, fontSize }));
  };

  const toggleHighContrast = () => {
    setSettings((prev) => ({ ...prev, highContrast: !prev.highContrast }));
  };

  const toggleSound = () => {
    setSettings((prev) => ({ ...prev, sound: !prev.sound }));
  };

  const toggleAudioInstructions = () => {
    setSettings((prev) => ({ ...prev, audioInstructions: !prev.audioInstructions }));
  };

  return {
    settings,
    setFontSize,
    toggleHighContrast,
    toggleSound,
    toggleAudioInstructions,
  };
}
