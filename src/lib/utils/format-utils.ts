/**
 * Formatting utilities for consistent data display
 * Eliminates inline formatting logic throughout components
 */

export const formatters = {
  /**
   * Format file size in bytes to human readable
   */
  fileSize: (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  },

  /**
   * Format date to consistent display format
   */
  date: (date: Date | string): string => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  },

  /**
   * Format date with time
   */
  dateTime: (date: Date | string): string => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  },

  /**
   * Format price with currency
   */
  price: (amount: number, currency = 'USD'): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency
    }).format(amount);
  },

  /**
   * Format word count with commas
   */
  wordCount: (count: number): string => {
    return count.toLocaleString();
  },

  /**
   * Format progress percentage
   */
  progress: (value: number): string => {
    return `${Math.round(value)}%`;
  },

  /**
   * Truncate text with ellipsis
   */
  truncate: (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + '...';
  },

  /**
   * Format authors list
   */
  authorsList: (authors: string[]): string => {
    if (authors.length === 0) return 'Unknown';
    if (authors.length === 1) return authors[0];
    if (authors.length === 2) return authors.join(' and ');
    
    const lastAuthor = authors[authors.length - 1];
    const otherAuthors = authors.slice(0, -1);
    return `${otherAuthors.join(', ')}, and ${lastAuthor}`;
  }
};

/**
 * Status formatting utilities
 */
export const statusFormatters = {
  /**
   * Get status color classes
   */
  getStatusColor: (status: string): string => {
    const statusColors: Record<string, string> = {
      'published': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      'draft': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      'under_review': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
      'in_progress': 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
      'complete': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      'not_started': 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    };
    
    return statusColors[status] || statusColors['draft'];
  },

  /**
   * Format status text for display
   */
  formatStatusText: (status: string): string => {
    return status
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
};

/**
 * File type utilities
 */
export const fileUtils = {
  /**
   * Get file type icon name
   */
  getFileIcon: (fileName: string): string => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    const iconMap: Record<string, string> = {
      'docx': 'FileText',
      'doc': 'FileText', 
      'pdf': 'FileText',
      'txt': 'FileText',
      'md': 'FileText',
      'xlsx': 'Table',
      'xls': 'Table',
      'csv': 'Table',
      'pptx': 'Presentation',
      'ppt': 'Presentation',
      'jpg': 'Image',
      'jpeg': 'Image',
      'png': 'Image',
      'gif': 'Image',
      'svg': 'Image'
    };
    
    return iconMap[extension || ''] || 'File';
  },

  /**
   * Get file type color
   */
  getFileTypeColor: (fileName: string): string => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    const colorMap: Record<string, string> = {
      'docx': 'text-blue-600',
      'doc': 'text-blue-600',
      'pdf': 'text-red-600',
      'txt': 'text-gray-600',
      'md': 'text-purple-600',
      'xlsx': 'text-green-600',
      'xls': 'text-green-600',
      'csv': 'text-green-600',
      'pptx': 'text-orange-600',
      'ppt': 'text-orange-600'
    };
    
    return colorMap[extension || ''] || 'text-gray-600';
  }
};