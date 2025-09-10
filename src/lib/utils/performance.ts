/**
 * Performance Utilities
 * Common utilities for optimizing performance
 */

import { useRef, useCallback, useEffect } from 'react';

/**
 * Debounce hook for delaying function execution
 * @param callback - Function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function
 */
export function useDebounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const timeoutRef = useRef<NodeJS.Timeout>();
  
  const debouncedCallback = useCallback((...args: Parameters<T>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]) as T;

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedCallback;
}

/**
 * Throttle hook for limiting function execution frequency
 * @param callback - Function to throttle
 * @param delay - Minimum delay between executions
 * @returns Throttled function
 */
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const lastRunRef = useRef<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const throttledCallback = useCallback((...args: Parameters<T>) => {
    const now = Date.now();
    const timeSinceLastRun = now - lastRunRef.current;

    if (timeSinceLastRun >= delay) {
      callback(...args);
      lastRunRef.current = now;
    } else {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(() => {
        callback(...args);
        lastRunRef.current = Date.now();
      }, delay - timeSinceLastRun);
    }
  }, [callback, delay]) as T;

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return throttledCallback;
}

/**
 * Performance monitoring hook
 * @param name - Name of the operation to monitor
 * @returns Object with start and end functions
 */
export function usePerformanceMonitor(name: string) {
  const startTime = useRef<number>(0);

  const start = useCallback(() => {
    startTime.current = performance.now();
    if (process.env.NODE_ENV === 'development') {
      console.time(name);
    }
  }, [name]);

  const end = useCallback(() => {
    const duration = performance.now() - startTime.current;
    
    if (process.env.NODE_ENV === 'development') {
      console.timeEnd(name);
      console.log(`${name} took ${duration.toFixed(2)}ms`);
    }
    
    return duration;
  }, [name]);

  return { start, end };
}

/**
 * Memory usage checker (development only)
 * @param label - Label for the measurement
 */
export function checkMemoryUsage(label: string) {
  if (process.env.NODE_ENV !== 'development' || !('memory' in performance)) {
    return;
  }

  const memory = (performance as any).memory;
  console.log(`Memory usage (${label}):`, {
    used: `${(memory.usedJSHeapSize / 1024 / 1024).toFixed(2)} MB`,
    total: `${(memory.totalJSHeapSize / 1024 / 1024).toFixed(2)} MB`,
    limit: `${(memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2)} MB`,
  });
}