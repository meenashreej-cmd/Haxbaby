import { useState, useEffect } from 'react';
import { VisitorState } from '../types';

export function useVisitorMemory(): VisitorState {
  const [visitorState, setVisitorState] = useState<VisitorState>({
    visitCount: 1,
    isReturning: false,
    greeting: "Welcome, Starlight Traveler! Pip is waking up...",
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem('nebupip_visit_count');
      const count = stored ? parseInt(stored, 10) + 1 : 1;
      localStorage.setItem('nebupip_visit_count', String(count));

      const isReturning = count > 1;
      const greeting = isReturning
        ? `Welcome back, Dreamer! Pip remembered you! ⭐ (Visit #${count})`
        : "Welcome, Starlight Traveler! You discovered Pip's constellation! ✨";

      setVisitorState({
        visitCount: count,
        isReturning,
        greeting,
      });
    } catch {
      // Fallback if localStorage is unavailable
    }
  }, []);

  return visitorState;
}
