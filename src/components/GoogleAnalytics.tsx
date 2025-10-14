import { useEffect } from 'react';
import { useRouterState } from '@tanstack/react-router';

// Extend the Window interface to include gtag
declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, any>
    ) => void;
    dataLayer?: any[];
  }
}

/**
 * Google Analytics component that tracks page views on route changes
 * and provides utilities for tracking custom events.
 */
export function GoogleAnalytics() {
  const location = useRouterState({ select: (s) => s.location });

  useEffect(() => {
    // Only track if gtag is available and GA is configured
    if (typeof window.gtag !== 'function') {
      return;
    }

    const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
    if (!measurementId || measurementId === 'G-XXXXXXXXXX') {
      // GA not configured or using placeholder
      return;
    }

    // Track page view
    const url = location.pathname + location.search;
    window.gtag('config', measurementId, {
      page_path: url,
      page_title: document.title,
      page_location: window.location.href,
    });
  }, [location]);

  return null;
}

/**
 * Hook to track custom events in Google Analytics
 * 
 * @example
 * const trackEvent = useGAEvent();
 * trackEvent('button_click', { button_name: 'cta_hero' });
 */
export function useGAEvent() {
  return (eventName: string, eventParams?: Record<string, any>) => {
    if (typeof window.gtag !== 'function') {
      return;
    }

    const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
    if (!measurementId || measurementId === 'G-XXXXXXXXXX') {
      return;
    }

    window.gtag('event', eventName, eventParams);
  };
}

/**
 * Utility function to track custom events (can be used outside of React components)
 */
export function trackGAEvent(eventName: string, eventParams?: Record<string, any>) {
  if (typeof window.gtag !== 'function') {
    return;
  }

  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (!measurementId || measurementId === 'G-XXXXXXXXXX') {
    return;
  }

  window.gtag('event', eventName, eventParams);
}
