import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import EditableField from '@/components/ui/editable-field';

interface EditableFieldConfig {
  key: string;
  label: string;
  value: string | number;
  type?: 'text' | 'number' | 'textarea';
  placeholder?: string;
  className?: string;
  variant?: 'default' | 'card';
}

interface EditableCardProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  iconColor?: string;
  fields: EditableFieldConfig[];
  onSave: (field: string, value: string | number) => void;
  children?: ReactNode;
  className?: string;
}

export function EditableCard({
  title,
  description,
  icon: Icon,
  iconColor = 'text-primary',
  fields,
  onSave,
  children,
  className
}: EditableCardProps) {
  return (
    <Card className={className}>
      <CardHeader className={description ? undefined : 'pb-3'}>
        <CardTitle className="text-lg flex items-center gap-2">
          {Icon && <Icon className={`h-5 w-5 ${iconColor}`} />}
          {title}
        </CardTitle>
        {description && (
          <CardDescription>{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {fields.map((field) => (
          <div key={field.key}>
            {field.variant === 'card' ? (
              <EditableField
                value={field.value}
                onSave={(value) => onSave(field.key, value)}
                type={field.type}
                placeholder={field.placeholder}
                className={field.className}
                variant="card"
              />
            ) : (
              <div className="space-y-2">
                {field.label && (
                  <div className="text-sm font-medium">{field.label}</div>
                )}
                <EditableField
                  value={field.value}
                  onSave={(value) => onSave(field.key, value)}
                  type={field.type}
                  placeholder={field.placeholder}
                  className={field.className}
                />
              </div>
            )}
          </div>
        ))}
        {children}
      </CardContent>
    </Card>
  );
}