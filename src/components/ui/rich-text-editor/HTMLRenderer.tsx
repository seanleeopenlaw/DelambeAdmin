"use client";

import React, { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { sanitizeHtml, isHtmlSafe } from '@/lib/utils/html-sanitizer';
import type { HTMLRendererProps } from './types';

/**
 * Safe HTML renderer component with built-in sanitization
 * Prevents XSS attacks while allowing safe HTML formatting
 */
export const HTMLRenderer = React.memo<HTMLRendererProps>(({ 
  content, 
  className, 
  sanitize = true 
}) => {
  // Memoize the sanitized content to avoid unnecessary processing
  const safeContent = useMemo(() => {
    if (!content) return '';
    
    if (!sanitize) {
      // If sanitization is disabled, at least check for basic safety
      if (!isHtmlSafe(content)) {
        console.warn('Potentially unsafe HTML content detected');
        return ''; // Return empty content for safety
      }
      return content;
    }

    return sanitizeHtml(content);
  }, [content, sanitize]);

  // Don't render if content is empty
  if (!safeContent.trim()) {
    return null;
  }

  return (
    <div 
      className={cn("prose prose-sm max-w-none", className)}
      dangerouslySetInnerHTML={{ __html: safeContent }}
    />
  );
});

HTMLRenderer.displayName = 'HTMLRenderer';