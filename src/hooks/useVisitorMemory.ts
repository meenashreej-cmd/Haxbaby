import { useState, useEffect } from 'react';
import { VisitorState } from '../types';

/**
 * Storage keys used for tracking local device visits.
 * NOTE: This visit counter tracks visits local to this browser and device only via localStorage.
 * It is NOT a global, distributed, or server-side visitor count.
 * No personal, identifiable, or telemetry data is collected or transmitted.
 */
const STORAGE_KEY = 'nebupip_visit_count';
const SESSION_GUARD_KEY = 'nebupip_session_visit_recorded';

const FIRST_VISIT_GREETING = "Welcome, Starlight Traveler! Pip is waking up to weave dreams with you! ✨";
const RETURNING_VISITOR_GREETING = "Welcome back, Dreamer! Pip was waiting for you! 🌟";

// In-memory guard to avoid double-counting during React StrictMode effect replay
let hasRecordedThisSessionInMemory = false;

export function useVisitorMemory(): VisitorState {
  // Safe default initial state to prevent hydration mismatches in SSR or pre-rendered environments
  const [visitorState, setVisitorState] = useState<VisitorState>({
    visitCount: 1,
    isReturning: false,
    greeting: FIRST_VISIT_GREETING,
  });

  useEffect(() => {
    // Only execute client-side
    if (typeof window === 'undefined') return;

    try {
      let isSessionAlreadyRecorded = hasRecordedThisSessionInMemory;

      // Check sessionStorage if available to avoid counting re-renders or StrictMode remounts as new visits
      try {
        if (sessionStorage.getItem(SESSION_GUARD_KEY) === '1') {
          isSessionAlreadyRecorded = true;
        }
      } catch {
        // sessionStorage might be restricted in some private modes; fall back to in-memory guard
      }

      // Read and validate existing stored count from localStorage
      const rawStored = localStorage.getItem(STORAGE_KEY);
      let parsedCount = rawStored ? parseInt(rawStored, 10) : 0;

      // Gracefully handle malformed data (NaN, non-numbers, negative values)
      if (isNaN(parsedCount) || parsedCount < 0) {
        parsedCount = 0;
      }

      let currentCount: number;

      if (!isSessionAlreadyRecorded) {
        currentCount = parsedCount + 1;
        try {
          localStorage.setItem(STORAGE_KEY, String(currentCount));
        } catch {
          // localStorage write may fail if blocked or quota exceeded
        }

        hasRecordedThisSessionInMemory = true;
        try {
          sessionStorage.setItem(SESSION_GUARD_KEY, '1');
        } catch {
          // Ignore sessionStorage write errors
        }
      } else {
        // Already recorded during this session; reflect current count (at least 1)
        currentCount = Math.max(parsedCount, 1);
      }

      const isReturning = currentCount > 1;
      const greeting = isReturning ? RETURNING_VISITOR_GREETING : FIRST_VISIT_GREETING;

      setVisitorState({
        visitCount: currentCount,
        isReturning,
        greeting,
      });
    } catch {
      // Graceful fallback if localStorage is unavailable or throws SecurityError
      setVisitorState({
        visitCount: 1,
        isReturning: false,
        greeting: FIRST_VISIT_GREETING,
      });
    }
  }, []);

  return visitorState;
}
