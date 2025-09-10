/**
 * HTML Sanitization utility for safe rendering
 * Prevents XSS attacks by allowing only specific safe HTML tags and attributes
 */

// Safe HTML tags that are allowed in rich text content
const ALLOWED_TAGS = ['strong', 'b', 'em', 'i', 'a', 'p', 'br', 'span'] as const;

// Safe attributes for allowed tags
const ALLOWED_ATTRIBUTES: Record<string, string[]> = {
  'a': ['href', 'title', 'target'],
  'span': ['class'],
} as const;

/**
 * Simple HTML sanitizer that removes potentially dangerous content
 * @param html - Raw HTML string to sanitize
 * @returns Sanitized HTML string
 */
export function sanitizeHtml(html: string): string {
  if (!html || typeof html !== 'string') {
    return '';
  }

  // Create a temporary DOM element to parse HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;

  // Recursive function to clean elements
  function cleanElement(element: Element): void {
    const tagName = element.tagName.toLowerCase();
    
    // Remove if not in allowed tags
    if (!ALLOWED_TAGS.includes(tagName as any)) {
      element.remove();
      return;
    }

    // Clean attributes
    const allowedAttrs = ALLOWED_ATTRIBUTES[tagName] || [];
    Array.from(element.attributes).forEach(attr => {
      if (!allowedAttrs.includes(attr.name)) {
        element.removeAttribute(attr.name);
      }
    });

    // Handle href attributes specially for security
    if (tagName === 'a') {
      const href = element.getAttribute('href');
      if (href && !href.startsWith('http') && !href.startsWith('/') && !href.startsWith('#')) {
        element.setAttribute('href', '#');
      }
      // Add security attributes
      element.setAttribute('rel', 'noopener noreferrer');
    }

    // Clean child elements recursively
    Array.from(element.children).forEach(child => {
      cleanElement(child);
    });
  }

  // Clean all elements
  Array.from(tempDiv.children).forEach(child => {
    cleanElement(child);
  });

  return tempDiv.innerHTML;
}

/**
 * Validates if HTML content is safe
 * @param html - HTML string to validate
 * @returns boolean indicating if content is safe
 */
export function isHtmlSafe(html: string): boolean {
  if (!html) return true;
  
  // Basic checks for dangerous patterns
  const dangerousPatterns = [
    /<script\b/i,
    /<iframe\b/i,
    /<object\b/i,
    /<embed\b/i,
    /<form\b/i,
    /javascript:/i,
    /on\w+\s*=/i, // event handlers like onclick, onload
  ];

  return !dangerousPatterns.some(pattern => pattern.test(html));
}