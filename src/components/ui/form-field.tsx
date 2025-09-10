import * as React from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface BaseFieldProps {
  label?: string
  required?: boolean
  className?: string
  error?: string
}

interface InputFieldProps extends BaseFieldProps {
  type: "text" | "number" | "email" | "password" | "date" | "url"
  value: string | number
  onChange: (value: string) => void
  placeholder?: string
  min?: number | string
  max?: number | string
  step?: number | string
}

interface TextareaFieldProps extends BaseFieldProps {
  type: "textarea"
  value: string
  onChange: (value: string) => void
  placeholder?: string
  rows?: number
}

interface SelectFieldProps extends BaseFieldProps {
  type: "select"
  value: string
  onChange: (value: string) => void
  placeholder?: string
  options: Array<{ value: string; label: string }>
}

export type FormFieldProps = InputFieldProps | TextareaFieldProps | SelectFieldProps

export function FormField(props: FormFieldProps) {
  const { label, required, className, error, ...fieldProps } = props
  const id = React.useId()

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <Label htmlFor={id}>
          {label} {required && <span className="text-white">*</span>}
        </Label>
      )}
      
      {fieldProps.type === "textarea" ? (
        <Textarea
          id={id}
          placeholder={fieldProps.placeholder}
          value={fieldProps.value}
          onChange={(e) => fieldProps.onChange(e.target.value)}
          className="bg-secondary/80 border-border"
          rows={fieldProps.rows}
          required={required}
        />
      ) : fieldProps.type === "select" ? (
        <Select 
          value={fieldProps.value} 
          onValueChange={fieldProps.onChange}
          required={required}
        >
          <SelectTrigger id={id} className="bg-secondary/80 border-border">
            <SelectValue placeholder={fieldProps.placeholder} />
          </SelectTrigger>
          <SelectContent>
            {fieldProps.options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <Input
          id={id}
          type={fieldProps.type}
          placeholder={fieldProps.placeholder}
          value={fieldProps.value}
          onChange={(e) => fieldProps.onChange(e.target.value)}
          className="bg-secondary/80 border-border"
          min={fieldProps.min}
          max={fieldProps.max}
          step={fieldProps.step}
          required={required}
        />
      )}
      
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  )
}