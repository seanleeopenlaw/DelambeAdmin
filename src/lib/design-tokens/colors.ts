// Design System Color Tokens
// Unified color system for consistent branding across the application

export const semanticColors = {
  // Hierarchy Level Colors (Primary Semantic Colors)
  publisher: {
    primary: 'text-slate-600',
    background: 'bg-slate-500/10',
    border: 'border-slate-500/20',
    hover: 'hover:bg-slate-500/20'
  },
  work: {
    primary: 'text-blue-600',
    background: 'bg-blue-500/10', 
    border: 'border-blue-500/20',
    hover: 'hover:bg-blue-500/20'
  },
  edition: {
    primary: 'text-emerald-600',
    background: 'bg-emerald-500/10',
    border: 'border-emerald-500/20', 
    hover: 'hover:bg-emerald-500/20'
  },
  draft: {
    primary: 'text-amber-600',
    background: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    hover: 'hover:bg-amber-500/20'
  },
  chapter: {
    primary: 'text-violet-600',
    background: 'bg-violet-500/10',
    border: 'border-violet-500/20',
    hover: 'hover:bg-violet-500/20'
  },
  file: {
    primary: 'text-neutral-600',
    background: 'bg-neutral-500/10',
    border: 'border-neutral-500/20',
    hover: 'hover:bg-neutral-500/20'
  }
} as const;

// Status Colors (Secondary Semantic Colors)
export const statusColors = {
  published: {
    text: 'text-emerald-600',
    background: 'bg-emerald-500/10',
    border: 'border-emerald-500/20'
  },
  draft: {
    text: 'text-blue-600', 
    background: 'bg-blue-500/10',
    border: 'border-blue-500/20'
  },
  'under-review': {
    text: 'text-amber-600',
    background: 'bg-amber-500/10', 
    border: 'border-amber-500/20'
  },
  completed: {
    text: 'text-emerald-600',
    background: 'bg-emerald-500/10',
    border: 'border-emerald-500/20'
  },
  'in-progress': {
    text: 'text-amber-600',
    background: 'bg-amber-500/10',
    border: 'border-amber-500/20'
  },
  'not-started': {
    text: 'text-neutral-500',
    background: 'bg-neutral-500/10',
    border: 'border-neutral-500/20'
  }
} as const;

// Action Colors (Tertiary Semantic Colors) 
export const actionColors = {
  primary: {
    text: 'text-blue-600',
    background: 'bg-blue-600',
    hover: 'hover:bg-blue-500'
  },
  secondary: {
    text: 'text-neutral-600', 
    background: 'bg-neutral-100',
    hover: 'hover:bg-neutral-200'
  },
  success: {
    text: 'text-emerald-600',
    background: 'bg-emerald-600',
    hover: 'hover:bg-emerald-500'
  },
  warning: {
    text: 'text-amber-600',
    background: 'bg-amber-600', 
    hover: 'hover:bg-amber-500'
  },
  danger: {
    text: 'text-red-600',
    background: 'bg-red-600',
    hover: 'hover:bg-red-500'
  }
} as const;

// Statistics Display Colors  
export const statsColors = {
  primary: {
    text: 'text-blue-600',
    background: 'bg-blue-500/10'
  },
  secondary: {
    text: 'text-emerald-600', 
    background: 'bg-emerald-500/10'
  },
  tertiary: {
    text: 'text-violet-600',
    background: 'bg-violet-500/10'
  },
  quaternary: {
    text: 'text-amber-600',
    background: 'bg-amber-500/10'
  }
} as const;

// Utility function to get colors by type
export const getHierarchyColor = (type: keyof typeof semanticColors) => {
  return semanticColors[type];
};

export const getStatusColor = (status: keyof typeof statusColors) => {
  return statusColors[status];
};

export const getActionColor = (action: keyof typeof actionColors) => {
  return actionColors[action];
};

export const getStatsColor = (variant: keyof typeof statsColors) => {
  return statsColors[variant];
};

// Legacy color mapping for backward compatibility
export const legacyColorMap = {
  'text-slate-600': semanticColors.publisher.primary,
  'text-blue-600': semanticColors.work.primary,
  'text-green-600': semanticColors.edition.primary,
  'text-orange-600': semanticColors.draft.primary,
  'text-purple-600': semanticColors.chapter.primary,
  'text-slate-500': semanticColors.file.primary,
} as const;

export type HierarchyLevel = keyof typeof semanticColors;
export type StatusType = keyof typeof statusColors; 
export type ActionType = keyof typeof actionColors;
export type StatsVariant = keyof typeof statsColors;