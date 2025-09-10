"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export interface SelectorOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectorProps {
  label?: string;
  value: string;
  onValueChange: (value: string) => void;
  options: SelectorOption[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  id?: string;
}

export function Selector({
  label,
  value,
  onValueChange,
  options,
  placeholder = "Select an option",
  required = false,
  disabled = false,
  className,
  id
}: SelectorProps) {
  return (
    <div className="space-y-2">
      {label && (
        <Label htmlFor={id}>
          {label}
          {required && <span className="text-white ml-1">*</span>}
        </Label>
      )}
      <Select 
        value={value} 
        onValueChange={onValueChange}
        disabled={disabled}
      >
        <SelectTrigger 
          id={id}
          className={`bg-secondary/80 border-border ${className || ""}`}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem 
              key={option.value} 
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}