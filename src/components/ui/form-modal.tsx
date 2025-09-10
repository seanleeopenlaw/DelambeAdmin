"use client";

import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogBody, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface FormModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (e: React.FormEvent) => void
  title: string
  icon?: LucideIcon
  iconColor?: string
  children: React.ReactNode
  submitText?: string
  cancelText?: string
  submitDisabled?: boolean
  className?: string
  subtitle?: string
}

export function FormModal({
  open,
  onOpenChange,
  onSubmit,
  title,
  icon: Icon,
  iconColor,
  children,
  submitText = "Submit",
  cancelText = "Cancel",
  submitDisabled = false,
  className,
  subtitle
}: FormModalProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(e)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("max-w-lg", className)}>
        <DialogHeader>
          <div className="flex items-center gap-2">
            {Icon && <Icon className={cn("h-5 w-5", iconColor)} />}
            <DialogTitle>{title}</DialogTitle>
          </div>
          <DialogClose />
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <DialogBody className="space-y-4">
            {subtitle && (
              <div className="text-sm text-muted-foreground">
                {subtitle}
              </div>
            )}
            {children}
          </DialogBody>

          <DialogFooter>
            <Button 
              type="button" 
              variant="secondary" 
              onClick={() => onOpenChange(false)}
            >
              {cancelText}
            </Button>
            <Button 
              type="submit" 
              disabled={submitDisabled}
            >
              {submitText}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}