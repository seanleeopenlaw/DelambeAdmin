/**
 * Rich Text Editor Type Definitions
 */

export interface RichTextEditorProps {
  /** Current HTML value */
  value: string;
  /** Callback when content changes */
  onChange: (value: string) => void;
  /** Placeholder text when empty */
  placeholder?: string;
  /** Additional CSS classes */
  className?: string;
  /** Number of rows (affects height) */
  rows?: number;
  /** Whether the editor is disabled */
  disabled?: boolean;
  /** Whether to show the toolbar */
  showToolbar?: boolean;
  /** Custom toolbar buttons (overrides default) */
  toolbarButtons?: string[];
  /** Error state */
  error?: string;
}

export interface HTMLRendererProps {
  /** HTML content to render */
  content: string;
  /** Additional CSS classes */
  className?: string;
  /** Whether to sanitize HTML content */
  sanitize?: boolean;
}

export interface EditorState {
  isFocused: boolean;
  hasError: boolean;
  errorMessage?: string;
}

export interface ToolbarState {
  isBold: boolean;
  isItalic: boolean;
  hasLink: boolean;
}