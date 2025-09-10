"use client";

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

interface DynamicFieldListProps {
  label: string
  values: string[]
  onChange: (values: string[]) => void
  placeholder?: string
  required?: boolean
  className?: string
  addButtonText?: string
  removeButtonText?: string
  minItems?: number
  maxItems?: number
}

export function DynamicFieldList({
  label,
  values,
  onChange,
  placeholder = "Enter value",
  required = false,
  className,
  addButtonText = "Add",
  removeButtonText = "Remove",
  minItems = 1,
  maxItems
}: DynamicFieldListProps) {
  const canRemove = values.length > minItems
  const canAdd = !maxItems || values.length < maxItems

  const handleAdd = () => {
    if (canAdd) {
      onChange([...values, ""])
    }
  }

  const handleUpdate = (index: number, value: string) => {
    const updated = [...values]
    updated[index] = value
    onChange(updated)
  }

  const handleRemove = (index: number) => {
    if (canRemove) {
      onChange(values.filter((_, i) => i !== index))
    }
  }

  return (
    <div className={cn("space-y-2", className)}>
      <Label>
        {label} {required && "*"}
      </Label>
      
      <div className="space-y-2">
        {values.map((value, index) => (
          <div key={index} className="flex items-center gap-2">
            <Input
              placeholder={placeholder}
              value={value}
              onChange={(e) => handleUpdate(index, e.target.value)}
              className="bg-secondary/80 border-border"
              required={required}
            />
            {canRemove && (
              <Button
                type="button"
                variant="secondary"
                size="icon"
                onClick={() => handleRemove(index)}
                className="shrink-0"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
      </div>
      
      {canAdd && (
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={handleAdd}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-1" />
          {addButtonText}
        </Button>
      )}
    </div>
  )
}