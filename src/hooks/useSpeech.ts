import { useCallback, useEffect, useState } from 'react';

export function useSpeech() {
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    setSupported(typeof window !== 'undefined' && 'speechSynthesis' in window);
  }, []);

  const speak = useCallback(
    (text: string) => {
      if (!supported || !text) return;

      // Cancel any ongoing speech before starting a new one.
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-PE';
      utterance.rate = 0.95;
      utterance.pitch = 1;

      window.speechSynthesis.speak(utterance);
    },
    [supported]
  );

  const cancel = useCallback(() => {
    if (supported) {
      window.speechSynthesis.cancel();
    }
  }, [supported]);

  return { supported, speak, cancel };
}
