// Design System Tokens
export const tokens = {
  colors: {
    primary: {
      50: '#eff6ff',
      500: '#1d4ed8',
      900: '#1e3a8a',
    },
    semantic: {
      success: '#10b981',
      warning: '#f59e0b', 
      error: '#ef4444',
      info: '#06b6d4',
    }
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  typography: {
    fontSizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
    }
  },
  components: {
    button: {
      height: {
        sm: '2rem',
        md: '2.25rem', 
        lg: '2.5rem',
      },
      radius: '0.375rem',
    },
    modal: {
      width: {
        sm: '24rem',
        md: '32rem',
        lg: '48rem',
      }
    }
  }
} as const;

export type DesignTokens = typeof tokens;