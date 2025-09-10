"use client";

import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  DEFAULT_TOOLBAR_BUTTONS,
  EDITOR_CONFIG,
  EDITOR_CLASSES,
  EditorCommand,
} from './constants';
import type { RichTextEditorProps } from './types';
import {
  useEditorCommands,
  useEditorState,
  useToolbarState,
  useKeyboardShortcuts,
} from './hooks';

/**
 * Rich Text Editor Component
 * A secure, accessible rich text editor with toolbar support
 */
export const RichTextEditor = React.memo<RichTextEditorProps>(({
  value,
  onChange,
  placeholder = EDITOR_CONFIG.DEFAULT_PLACEHOLDER,
  className,
  rows = EDITOR_CONFIG.DEFAULT_ROWS,
  disabled = false,
  showToolbar = true,
  error,
}) => {
  // Custom hooks for functionality
  const { editorRef, execCommand, addLink, handleInput } = useEditorCommands(onChange);
  const { state, setFocus, setError } = useEditorState();
  const toolbarState = useToolbarState(editorRef);
  const { handleKeyDown } = useKeyboardShortcuts(execCommand, addLink);

  // Update editor content when value prop changes
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || '';
    }
  }, [value]);

  // Handle error prop
  useEffect(() => {
    setError(error);
  }, [error, setError]);

  // Enhanced toolbar buttons with current state
  const toolbarButtons = DEFAULT_TOOLBAR_BUTTONS.map(button => ({
    ...button,
    onClick: button.id === 'link' ? addLink : undefined,
    isActive: 
      button.id === 'bold' ? toolbarState.isBold :
      button.id === 'italic' ? toolbarState.isItalic :
      button.id === 'link' ? toolbarState.hasLink :
      false,
  }));

  const minHeight = `${rows * EDITOR_CONFIG.ROW_HEIGHT_MULTIPLIER}rem`;

  return (
    <div className={cn(EDITOR_CLASSES.CONTAINER, className)}>
      {/* Toolbar */}
      {showToolbar && (
        <div className={EDITOR_CLASSES.TOOLBAR}>
          {toolbarButtons.map((button) => (
            <Button
              key={button.id}
              variant={button.isActive ? "default" : "ghost"}
              size="sm"
              className={cn(
                EDITOR_CLASSES.BUTTON,
                button.isActive && EDITOR_CLASSES.BUTTON_ACTIVE
              )}
              onClick={button.onClick || (() => execCommand(button.command))}
              title={`${button.title}${button.shortcut ? ` (${button.shortcut})` : ''}`}
              type="button"
              disabled={disabled}
              aria-pressed={button.isActive}
              aria-label={button.title}
            >
              <button.icon className={EDITOR_CLASSES.ICON} />
            </Button>
          ))}
        </div>
      )}
      
      {/* Editor Area */}
      <div
        ref={editorRef}
        contentEditable={!disabled}
        suppressContentEditableWarning
        onInput={handleInput}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onKeyDown={handleKeyDown}
        className={cn(
          EDITOR_CLASSES.EDITOR_AREA,
          disabled && "opacity-50 cursor-not-allowed",
          state.hasError && "border-red-500 bg-red-50 dark:bg-red-950/20",
        )}
        style={{ minHeight }}
        data-placeholder={!value ? placeholder : ""}
        aria-label={placeholder}
        role="textbox"
        aria-multiline="true"
        aria-invalid={state.hasError}
        aria-describedby={state.hasError ? "editor-error" : undefined}
      />

      {/* Error Message */}
      {state.hasError && state.errorMessage && (
        <div 
          id="editor-error" 
          className="px-3 py-2 text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/20 border-t"
          role="alert"
        >
          {state.errorMessage}
        </div>
      )}
    </div>
  );
});

RichTextEditor.displayName = 'RichTextEditor';