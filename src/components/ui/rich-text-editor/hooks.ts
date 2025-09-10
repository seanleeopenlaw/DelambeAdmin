/**
 * Custom hooks for Rich Text Editor functionality
 */

import { useRef, useCallback, useEffect, useState } from 'react';
import { EditorCommand, ToolbarButton } from './constants';
import { EditorState, ToolbarState } from './types';

/**
 * Hook for managing editor commands and state
 */
export function useEditorCommands(onChange: (value: string) => void) {
  const editorRef = useRef<HTMLDivElement>(null);

  const execCommand = useCallback((command: EditorCommand, value?: string) => {
    try {
      document.execCommand(command, false, value);
      editorRef.current?.focus();
      
      // Trigger onChange with updated content
      if (editorRef.current) {
        onChange(editorRef.current.innerHTML);
      }
    } catch (error) {
      console.warn('Editor command failed:', command, error);
    }
  }, [onChange]);

  const addLink = useCallback(() => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
      alert('Please select text first to add a link');
      return;
    }

    const url = prompt('Enter URL:');
    if (url && url.trim()) {
      execCommand(EditorCommand.CREATE_LINK, url.trim());
    }
  }, [execCommand]);

  const handleInput = useCallback(() => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      onChange(content);
    }
  }, [onChange]);

  return {
    editorRef,
    execCommand,
    addLink,
    handleInput,
  };
}

/**
 * Hook for managing editor state
 */
export function useEditorState() {
  const [state, setState] = useState<EditorState>({
    isFocused: false,
    hasError: false,
  });

  const setFocus = useCallback((focused: boolean) => {
    setState(prev => ({ ...prev, isFocused: focused }));
  }, []);

  const setError = useCallback((error?: string) => {
    setState(prev => ({
      ...prev,
      hasError: !!error,
      errorMessage: error,
    }));
  }, []);

  return {
    state,
    setFocus,
    setError,
  };
}

/**
 * Hook for managing toolbar button state
 */
export function useToolbarState(editorRef: React.RefObject<HTMLDivElement>) {
  const [toolbarState, setToolbarState] = useState<ToolbarState>({
    isBold: false,
    isItalic: false,
    hasLink: false,
  });

  const updateToolbarState = useCallback(() => {
    if (!editorRef.current) return;

    try {
      setToolbarState({
        isBold: document.queryCommandState('bold'),
        isItalic: document.queryCommandState('italic'),
        hasLink: document.queryCommandState('createLink'),
      });
    } catch (error) {
      console.warn('Failed to update toolbar state:', error);
    }
  }, [editorRef]);

  // Update toolbar state when selection changes
  useEffect(() => {
    const handleSelectionChange = () => {
      updateToolbarState();
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    return () => document.removeEventListener('selectionchange', handleSelectionChange);
  }, [updateToolbarState]);

  return toolbarState;
}

/**
 * Hook for handling keyboard shortcuts
 */
export function useKeyboardShortcuts(
  execCommand: (command: EditorCommand, value?: string) => void,
  addLink: () => void
) {
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key.toLowerCase()) {
        case 'b':
          e.preventDefault();
          execCommand(EditorCommand.BOLD);
          break;
        case 'i':
          e.preventDefault();
          execCommand(EditorCommand.ITALIC);
          break;
        case 'k':
          e.preventDefault();
          addLink();
          break;
      }
    }
  }, [execCommand, addLink]);

  return { handleKeyDown };
}