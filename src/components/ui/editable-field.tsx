"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit2, Check, X } from 'lucide-react';
import { Button } from './button';
import { Input } from './input';
import { Textarea } from './textarea';
import { cn } from '@/lib/utils';
import { editFieldVariants } from '@/lib/animations/variants';

interface EditableFieldProps {
  value: string | number;
  onSave: (value: string | number) => void;
  type?: 'text' | 'textarea' | 'number';
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  variant?: 'inline' | 'card';
}

export default function EditableField({
  value,
  onSave,
  type = 'text',
  className,
  placeholder,
  disabled = false,
  label,
  variant = 'inline'
}: EditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(String(value));
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    setEditValue(String(value));
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      if (inputRef.current instanceof HTMLInputElement || inputRef.current instanceof HTMLTextAreaElement) {
        inputRef.current.select();
      }
    }
  }, [isEditing]);

  const handleSave = () => {
    const finalValue = type === 'number' ? parseFloat(editValue) || 0 : editValue;
    onSave(finalValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(String(value));
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && type !== 'textarea') {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (variant === 'card') {
    return (
      <div className={cn("group relative p-4 rounded-lg border bg-card", className)}>
        {label && (
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            {label}
          </label>
        )}
        
        <motion.div
          variants={editFieldVariants}
          animate={isEditing ? 'editing' : 'display'}
          className="relative"
        >
          <AnimatePresence mode="wait">
            {isEditing ? (
              <motion.div
                key="editing"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.1 }}
                className="space-y-2"
              >
                {type === 'textarea' ? (
                  <Textarea
                    ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className="resize-none"
                    rows={3}
                  />
                ) : (
                  <Input
                    ref={inputRef as React.RefObject<HTMLInputElement>}
                    type={type === 'number' ? 'number' : 'text'}
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                  />
                )}
                
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    onClick={handleSave}
                    className="h-7 px-2"
                  >
                    <Check className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleCancel}
                    className="h-7 px-2"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="display"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
                className={cn(
                  "group cursor-pointer rounded-md p-2 hover:bg-muted/50 transition-colors",
                  disabled && "cursor-not-allowed opacity-60"
                )}
                onClick={() => !disabled && setIsEditing(true)}
              >
                <div className="flex items-center justify-between">
                  <span className={cn(
                    "text-sm",
                    !value && "text-muted-foreground"
                  )}>
                    {value || placeholder || 'Click to edit'}
                  </span>
                  {!disabled && (
                    <Edit2 className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    );
  }

  // Inline variant
  return (
    <motion.div
      variants={editFieldVariants}
      animate={isEditing ? 'editing' : 'display'}
      className={cn("group relative inline-block min-w-0", className)}
    >
      <AnimatePresence mode="wait">
        {isEditing ? (
          <motion.div
            key="editing"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.1 }}
            className="flex items-center gap-2"
          >
            {type === 'textarea' ? (
              <Textarea
                ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className="min-w-[200px] resize-none"
                rows={2}
              />
            ) : (
              <Input
                ref={inputRef as React.RefObject<HTMLInputElement>}
                type={type === 'number' ? 'number' : 'text'}
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className="min-w-[120px]"
              />
            )}
            
            <Button
              size="sm"
              onClick={handleSave}
              className="h-7 w-7 p-0 flex-shrink-0"
            >
              <Check className="h-3 w-3" />
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCancel}
              className="h-7 w-7 p-0 flex-shrink-0"
            >
              <X className="h-3 w-3" />
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="display"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className={cn(
              "cursor-pointer rounded px-2 py-1 hover:bg-muted/50 transition-colors flex items-center gap-2 min-w-0",
              disabled && "cursor-not-allowed opacity-60"
            )}
            onClick={() => !disabled && setIsEditing(true)}
          >
            <span className={cn(
              "truncate",
              !value && "text-muted-foreground"
            )}>
              {value || placeholder || 'Click to edit'}
            </span>
            {!disabled && (
              <Edit2 className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}