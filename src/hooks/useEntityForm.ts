import { useState, useCallback } from 'react';

/**
 * Generic form handler for all entity forms
 * Eliminates duplicate form logic across modals and views
 */
export function useEntityForm<T extends Record<string, any>>(
  initialData: T,
  onSubmit: (data: T) => void,
  resetAfterSubmit = true
) {
  const [formData, setFormData] = useState<T>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const updateField = useCallback((field: keyof T) => (value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  const handleSubmit = useCallback(async (onClose?: () => void) => {
    setIsSubmitting(true);
    setErrors({});

    try {
      await onSubmit(formData);
      
      if (resetAfterSubmit) {
        setFormData(initialData);
      }
      
      onClose?.();
    } catch (error) {
      console.error('Form submission error:', error);
      // Handle validation errors here
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, onSubmit, initialData, resetAfterSubmit]);

  const resetForm = useCallback(() => {
    setFormData(initialData);
    setErrors({});
  }, [initialData]);

  const setFieldError = useCallback((field: keyof T, error: string) => {
    setErrors(prev => ({ ...prev, [field]: error }));
  }, []);

  return {
    formData,
    setFormData,
    updateField,
    handleSubmit,
    resetForm,
    isSubmitting,
    errors,
    setFieldError
  };
}

/**
 * Form validation utilities
 */
export const validators = {
  required: (value: any) => {
    if (!value || (typeof value === 'string' && !value.trim())) {
      return 'This field is required';
    }
    return null;
  },

  minLength: (min: number) => (value: string) => {
    if (value && value.length < min) {
      return `Must be at least ${min} characters`;
    }
    return null;
  },

  email: (value: string) => {
    if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return 'Invalid email format';
    }
    return null;
  },

  isbn: (value: string) => {
    if (value && !/^978-\d{1,5}-\d{1,7}-\d{1,7}-\d{1}$/.test(value)) {
      return 'Invalid ISBN format (978-X-XXXXX-XXX-X)';
    }
    return null;
  }
};

/**
 * Field save handler for editable views
 * Eliminates duplicate handleFieldSave logic
 */
export function useFieldSave(
  entityType: 'work' | 'edition' | 'chapter' | 'file',
  entityId: string,
  onSaveSuccess?: (field: string, value: any) => void
) {
  const [isSaving, setIsSaving] = useState<string | null>(null);

  const saveField = useCallback(async (field: string, value: string | number) => {
    setIsSaving(field);
    
    try {
      // TODO: Replace with actual API call
      console.log(`Saving ${entityType}[${entityId}].${field}:`, value);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      onSaveSuccess?.(field, value);
    } catch (error) {
      console.error(`Failed to save ${field}:`, error);
      // Handle error (show toast, etc.)
    } finally {
      setIsSaving(null);
    }
  }, [entityType, entityId, onSaveSuccess]);

  return {
    saveField,
    isSaving
  };
}