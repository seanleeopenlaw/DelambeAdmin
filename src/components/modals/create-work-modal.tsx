"use client";

import { useState } from "react";
import { Book, Upload } from "lucide-react";
import { GenericModal } from "@/components/design-system/organisms/GenericModal";
import { getHierarchyColor } from "@/lib/design-tokens/colors";
import { FormField } from "@/components/ui/form-field";
import { Selector, SelectorOption } from "@/components/ui/selector";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Accordion } from "@/components/ui/accordion";

interface CreateWorkModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: WorkAndEditionFormData | { work: WorkAndEditionFormData['work']; edition: null }) => void;
}

interface WorkAndEditionFormData {
  work: {
    name: string;
    code: string;
  };
  edition: {
    versionName: string;
    title: string;
    status: 'draft' | 'published';
    publicationDate?: string;
    isbn?: string;
    coverImage?: File;
    citationText?: string;
    reviewDate?: string;
    contributors: {
      author?: string;
      editor?: string;
      coverDesigner?: string;
      coverPhotographer?: string;
      projectDelivery?: string;
    };
  };
}

export function CreateWorkModal({ open, onOpenChange, onSubmit }: CreateWorkModalProps) {
  const [includeEdition, setIncludeEdition] = useState(false);
  const [formData, setFormData] = useState<WorkAndEditionFormData>({
    work: {
      name: "",
      code: ""
    },
    edition: {
      versionName: "First Edition",
      title: "",
      status: 'draft',
      publicationDate: '',
      isbn: '',
      citationText: '',
      reviewDate: '',
      contributors: {
        author: '',
        editor: '',
        coverDesigner: '',
        coverPhotographer: '',
        projectDelivery: ''
      }
    }
  });

  const handleSubmit = () => {
    if (formData.work.name.trim() && formData.work.code.trim()) {
      // Only include edition if checkbox is checked
      const finalData = includeEdition ? {
        ...formData,
        edition: {
          ...formData.edition,
          title: formData.edition.title || formData.work.name
        }
      } : {
        work: formData.work,
        edition: null
      };
      onSubmit(finalData);
      onOpenChange(false);
      // Reset form
      setFormData({
        work: {
          name: "",
          code: ""
        },
        edition: {
          versionName: "First Edition",
          title: "",
          status: 'draft',
          publicationDate: '',
          isbn: '',
          citationText: '',
          reviewDate: '',
          contributors: {
            author: '',
            editor: '',
            coverDesigner: '',
            coverPhotographer: '',
            projectDelivery: ''
          }
        }
      });
    }
  };

  const updateWorkField = (field: keyof WorkAndEditionFormData['work']) => (value: string) => {
    setFormData(prev => ({
      ...prev,
      work: { ...prev.work, [field]: value }
    }));
  };

  const updateEditionField = (field: keyof WorkAndEditionFormData['edition']) => (value: any) => {
    setFormData(prev => ({
      ...prev,
      edition: { ...prev.edition, [field]: value }
    }));
  };

  // Define selector options
  const statusOptions: SelectorOption[] = [
    { value: 'draft', label: 'Draft' },
    { value: 'published', label: 'Published' }
  ];

  const updateContributorField = (field: keyof WorkAndEditionFormData['edition']['contributors']) => (value: string) => {
    setFormData(prev => ({
      ...prev,
      edition: {
        ...prev.edition,
        contributors: { ...prev.edition.contributors, [field]: value }
      }
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      updateEditionField('coverImage')(file);
    }
  };

  return (
    <GenericModal
      open={open}
      onOpenChange={onOpenChange}
      title="Create New Work"
      icon={Book}
      iconColor={getHierarchyColor('work').primary}
      size="lg"
      submitText={includeEdition ? "Create Work & Edition" : "Create Work"}
      submitDisabled={!formData.work.name.trim() || !formData.work.code.trim() || (includeEdition && formData.edition.status === 'published' && !formData.edition.publicationDate)}
      onSubmit={handleSubmit}
    >
      <div className="space-y-6">
        {/* Work Section */}
        <div className="space-y-4">
          <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">Work Details</h3>
          
          <FormField
            type="text"
            label="Work Name"
            value={formData.work.name}
            onChange={updateWorkField('name')}
            placeholder="Enter work name"
            required
          />

          <FormField
            type="text"
            label="Work Code"
            value={formData.work.code}
            onChange={updateWorkField('code')}
            placeholder="e.g., MWD-2024, AIAJ-BB-2024"
            required
          />
        </div>

        <Separator />

        {/* Optional Edition Section - Accordion */}
        <Accordion 
          title="Create Initial Edition" 
          subtitle="OPTIONAL"
          expanded={includeEdition}
          onExpandedChange={setIncludeEdition}
        >
          
          <div className="grid grid-cols-2 gap-4">
            <FormField
              type="text"
              label="Version Name"
              value={formData.edition.versionName}
              onChange={updateEditionField('versionName')}
              placeholder="e.g., 2025 Edition, First Edition"
              required
            />
            
            <FormField
              type="text"
              label="Edition Title"
              value={formData.edition.title}
              onChange={updateEditionField('title')}
              placeholder="(defaults to Work Name)"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Selector
              id="status"
              label="Status"
              value={formData.edition.status}
              onValueChange={updateEditionField('status')}
              options={statusOptions}
              required
            />
            
            <FormField
              type="date"
              label={formData.edition.status === 'published' ? 'Publication Date *' : 'Publication Date'}
              value={formData.edition.publicationDate || ''}
              onChange={updateEditionField('publicationDate')}
              required={formData.edition.status === 'published'}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              type="text"
              label="ISBN"
              value={formData.edition.isbn || ''}
              onChange={updateEditionField('isbn')}
              placeholder="978-X-XXXXX-XXX-X"
            />
            
            <FormField
              type="date"
              label="Review Date"
              value={formData.edition.reviewDate || ''}
              onChange={updateEditionField('reviewDate')}
            />
          </div>

          <div className="space-y-2">
            <Label>Cover Image</Label>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => document.getElementById('cover-upload')?.click()}
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Cover
              </Button>
              <input
                id="cover-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />
              {formData.edition.coverImage && (
                <span className="text-sm text-muted-foreground">
                  {formData.edition.coverImage.name}
                </span>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Citation Text</Label>
            <Textarea
              value={formData.edition.citationText || ''}
              onChange={(e) => updateEditionField('citationText')(e.target.value)}
              placeholder="How this work should be cited..."
              className="bg-muted border-border"
              rows={2}
            />
          </div>

          <Separator />

          {/* Contributors Section */}
          <div className="space-y-4">
            <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">Contributors</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <FormField
              type="text"
              label="Author"
              value={formData.edition.contributors.author || ''}
              onChange={updateContributorField('author')}
              placeholder="Primary author name"
            />
            
            <FormField
              type="text"
              label="Editor"
              value={formData.edition.contributors.editor || ''}
              onChange={updateContributorField('editor')}
              placeholder="Editor name"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              type="text"
              label="Cover Designer"
              value={formData.edition.contributors.coverDesigner || ''}
              onChange={updateContributorField('coverDesigner')}
              placeholder="Cover designer name"
            />
            
            <FormField
              type="text"
              label="Cover Photographer"
              value={formData.edition.contributors.coverPhotographer || ''}
              onChange={updateContributorField('coverPhotographer')}
              placeholder="Cover photographer name"
            />
          </div>

          <FormField
            type="text"
            label="Project Delivery"
            value={formData.edition.contributors.projectDelivery || ''}
            onChange={updateContributorField('projectDelivery')}
            placeholder="Project delivery person"
          />
          </div>
          
          <div className="bg-muted/50 p-4 rounded-md text-sm text-muted-foreground">
            <p><strong>Note:</strong> You are creating both a Work and its first Edition. You can customize edition details like version, publication date, ISBN, and contributors above.</p>
          </div>
        </Accordion>
      </div>
    </GenericModal>
  );
}