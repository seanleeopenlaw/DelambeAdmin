"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AccordionProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  expanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  defaultExpanded?: boolean;
  className?: string;
}

export function Accordion({ 
  title, 
  subtitle, 
  children, 
  expanded,
  onExpandedChange,
  defaultExpanded = false, 
  className 
}: AccordionProps) {
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
  const isExpanded = expanded !== undefined ? expanded : internalExpanded;
  
  const handleToggle = () => {
    const newExpanded = !isExpanded;
    if (onExpandedChange) {
      onExpandedChange(newExpanded);
    } else {
      setInternalExpanded(newExpanded);
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div 
        className="flex items-center justify-between p-3 bg-secondary/80 rounded-lg cursor-pointer hover:bg-secondary transition-colors"
        onClick={handleToggle}
      >
        <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">
          {title} {subtitle && <span className="text-xs">({subtitle})</span>}
        </h3>
        {isExpanded ? (
          <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200" />
        ) : (
          <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform duration-200" />
        )}
      </div>

      <div 
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isExpanded 
            ? "max-h-[2000px] opacity-100" 
            : "max-h-0 opacity-0"
        )}
      >
        <div className="pl-6 border-l-2 border-border space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
}