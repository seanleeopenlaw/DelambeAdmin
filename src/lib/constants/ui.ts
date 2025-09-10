/**
 * UI Constants
 * Centralized UI constants for consistency across the application
 */

// Animation durations (in milliseconds)
export const ANIMATION_DURATION = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
} as const;

// Common sizes
export const SIZES = {
  BUTTON_HEIGHT: {
    sm: 32,
    md: 40,
    lg: 48,
  },
  ICON: {
    xs: 12,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32,
  },
  BORDER_RADIUS: {
    sm: 4,
    md: 6,
    lg: 8,
    xl: 12,
  },
} as const;

// Z-index layers
export const Z_INDEX = {
  DROPDOWN: 1000,
  MODAL: 1100,
  TOOLTIP: 1200,
  TOAST: 1300,
} as const;

// Breakpoints (matching Tailwind defaults)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// Common spacing values
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
} as const;