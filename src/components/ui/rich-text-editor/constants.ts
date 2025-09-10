/**
 * Rich Text Editor Constants and Types
 * Centralized configuration for the rich text editor
 */

import { Bold, Italic, Link, LucideIcon } from 'lucide-react';

// Editor commands enum for type safety
export enum EditorCommand {
  BOLD = 'bold',
  ITALIC = 'italic',
  CREATE_LINK = 'createLink',
  UNLINK = 'unlink',
}

// Toolbar button configuration type
export interface ToolbarButton {
  id: string;
  icon: LucideIcon;
  command: EditorCommand;
  title: string;
  shortcut?: string;
  onClick?: () => void;
}

// Default toolbar configuration
export const DEFAULT_TOOLBAR_BUTTONS: ToolbarButton[] = [
  {
    id: 'bold',
    icon: Bold,
    command: EditorCommand.BOLD,
    title: 'Bold',
    shortcut: 'Ctrl+B',
  },
  {
    id: 'italic',
    icon: Italic,
    command: EditorCommand.ITALIC,
    title: 'Italic',
    shortcut: 'Ctrl+I',
  },
  {
    id: 'link',
    icon: Link,
    command: EditorCommand.CREATE_LINK,
    title: 'Add Link',
    shortcut: 'Ctrl+K',
  },
];

// Editor configuration constants
export const EDITOR_CONFIG = {
  DEFAULT_ROWS: 4,
  MIN_HEIGHT: 100, // pixels
  DEFAULT_PLACEHOLDER: 'Start typing...',
  ROW_HEIGHT_MULTIPLIER: 1.5, // rem
} as const;

// CSS class constants
export const EDITOR_CLASSES = {
  CONTAINER: 'border rounded-lg overflow-hidden',
  TOOLBAR: 'flex items-center gap-1 p-2 border-b bg-muted/5',
  EDITOR_AREA: 'p-3 min-h-[100px] outline-none text-sm leading-relaxed prose prose-sm max-w-none focus:ring-0',
  BUTTON: 'h-8 w-8 p-0 transition-all duration-200 hover:bg-muted hover:scale-105 active:scale-95',
  BUTTON_ACTIVE: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm',
  ICON: 'h-3.5 w-3.5',
} as const;