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

      // Configure alarm sound (continuous beeping)
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.type = 'square';

      // Create continuous beeping pattern with gain modulation
      const now = audioContext.currentTime;
      gainNode.gain.setValueAtTime(0, now);
      
      // Create a repeating beep pattern that continues indefinitely
      const createBeepPattern = (startTime: number, duration: number) => {
        const beepDuration = 0.2;
        const pauseDuration = 0.3;
        const totalCycle = beepDuration + pauseDuration;
        const cycles = Math.ceil(duration / totalCycle);
        
        for (let i = 0; i < cycles; i++) {
          const cycleStart = startTime + i * totalCycle;
          gainNode.gain.setValueAtTime(0.3, cycleStart);
          gainNode.gain.setValueAtTime(0, cycleStart + beepDuration);
        }
      };

      // Create a long-duration beeping pattern (10 minutes worth)
      createBeepPattern(now, 600);

      oscillator.start();
      // Don't automatically stop - let it run until manually stopped

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