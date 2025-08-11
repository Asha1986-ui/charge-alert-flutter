import { useRef, useCallback } from 'react';

export const useAlarm = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const playAlarm = useCallback(() => {
    try {
      // Create audio context if it doesn't exist
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      const audioContext = audioContextRef.current;
      
      // Resume audio context if suspended
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }

      // Stop existing alarm if playing
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
      }

      // Create oscillator for alarm sound
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Configure alarm sound (beeping pattern)
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.type = 'square';

      // Create beeping pattern with gain modulation
      const now = audioContext.currentTime;
      gainNode.gain.setValueAtTime(0, now);
      
      for (let i = 0; i < 10; i++) {
        const startTime = now + i * 0.5;
        gainNode.gain.setValueAtTime(0.3, startTime);
        gainNode.gain.setValueAtTime(0, startTime + 0.2);
      }

      oscillator.start();
      oscillator.stop(now + 5); // Stop after 5 seconds

      oscillatorRef.current = oscillator;
      gainNodeRef.current = gainNode;

    } catch (error) {
      console.warn('Could not play alarm sound:', error);
    }
  }, []);

  const stopAlarm = useCallback(() => {
    if (oscillatorRef.current) {
      try {
        oscillatorRef.current.stop();
        oscillatorRef.current = null;
        gainNodeRef.current = null;
      } catch (error) {
        console.warn('Error stopping alarm:', error);
      }
    }
  }, []);

  return { playAlarm, stopAlarm };
};