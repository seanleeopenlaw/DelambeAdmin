import { ReactNode } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

type ModalSize = 'sm' | 'md' | 'lg';

interface GenericModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  icon?: LucideIcon;
  iconColor?: string;
  children: ReactNode;
  onSubmit?: () => void;
  submitText?: string;
  cancelText?: string;
  submitDisabled?: boolean;
  size?: ModalSize;
}

export function GenericModal({
  open,
  onOpenChange,
  title,
  icon: Icon,
  iconColor = 'text-primary',
  children,
  onSubmit,
  submitText = 'Confirm',
  cancelText = 'Cancel',
  submitDisabled = false,
  size = 'md',
}: GenericModalProps) {
  const widthClass = {
    sm: 'max-w-sm',
    md: 'max-w-md', 
    lg: 'max-w-2xl',
  }[size];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={widthClass}>
        <DialogHeader>
          <div className="flex items-center gap-2">
            {Icon && <Icon className={`h-5 w-5 ${iconColor}`} />}
            <DialogTitle>{title}</DialogTitle>
          </div>
        </DialogHeader>
        
        <div className="px-6 pb-4 space-y-4">
          {children}
        </div>
        
        {onSubmit && (
          <div className="flex justify-end gap-2 px-6 pb-6 pt-4 border-t border-border">
            <Button
              type="button"
              variant="secondary"
              onClick={() => onOpenChange(false)}
            >
              {cancelText}
            </Button>
            <Button
              type="button"
              variant="primary"
              onClick={onSubmit}
              disabled={submitDisabled}
            >
              {submitText}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}