import { useCallback, useEffect, useState } from 'react';

export function useSpeech() {
  const [supported, setSupported] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    setSupported(typeof window !== 'undefined' && 'speechSynthesis' in window);
  }, []);

  const cancel = useCallback(() => {
    if (supported) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    }
  }, [supported]);

  const speak = useCallback(
    (text: string) => {
      if (!supported || !text) return;

      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-PE';
      utterance.rate = 0.95;
      utterance.pitch = 1;

      utterance.onend = () => setSpeaking(false);
      utterance.onerror = () => setSpeaking(false);

      window.speechSynthesis.speak(utterance);
      setSpeaking(true);
    },
    [supported]
  );

  const toggle = useCallback(
    (text: string) => {
      if (speaking) {
        cancel();
      } else {
        speak(text);
      }
    },
    [speaking, cancel, speak]
  );

  return { supported, speaking, speak, cancel, toggle };
}
