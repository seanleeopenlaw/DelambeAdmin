"use client";

import { useState } from "react";
import { BookOpen } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogBody, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Selector, SelectorOption } from "@/components/ui/selector";
import { mockTreeData } from "@/lib/mock-data";

interface CreateEditionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: EditionFormData) => void;
  workTitle?: string;
}

interface EditionFormData {
  workId: string;
  version: string;
  year: number;
  format: 'hardcover' | 'paperback' | 'ebook' | 'audiobook';
  releaseDate: string;
}

export function CreateEditionModal({ open, onOpenChange, onSubmit, workTitle }: CreateEditionModalProps) {
  const [formData, setFormData] = useState<EditionFormData>({
    workId: "",
    version: "",
    year: new Date().getFullYear(),
    format: 'paperback',
    releaseDate: new Date().toISOString().split('T')[0]
  });

  // Convert tree data to selector options
  const workOptions: SelectorOption[] = mockTreeData
    .filter(node => node.type === 'work')
    .map(work => ({
      value: work.id,
      label: work.title
    }));

  const formatOptions: SelectorOption[] = [
    { value: 'hardcover', label: 'Hardcover' },
    { value: 'paperback', label: 'Paperback' },
    { value: 'ebook', label: 'E-book' },
    { value: 'audiobook', label: 'Audiobook' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.workId.trim() && formData.version.trim()) {
      onSubmit(formData);
      onOpenChange(false);
      // Reset form
      setFormData({
        workId: "",
        version: "",
        year: new Date().getFullYear(),
        format: 'paperback',
        releaseDate: new Date().toISOString().split('T')[0]
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-green-600" />
            <DialogTitle>Create New Edition</DialogTitle>
          </div>
          <DialogClose />
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <DialogBody className="space-y-4">
            {workTitle && (
              <div className="text-sm text-muted-foreground">
                Creating edition for: <span className="font-medium">{workTitle}</span>
              </div>
            )}

            <Selector
              id="work"
              label="Work"
              value={formData.workId}
              onValueChange={(value) => setFormData({ ...formData, workId: value })}
              options={workOptions}
              placeholder="Select work"
              required
            />

            <div className="space-y-2">
              <Label htmlFor="version">Version *</Label>
              <Input
                id="version"
                placeholder="e.g., 3rd Edition, v2.0"
                value={formData.version}
                onChange={(e) => setFormData(prev => ({ ...prev, version: e.target.value }))}
                className="bg-muted border-border"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="year">Year *</Label>
              <Input
                id="year"
                type="number"
                min="1900"
                max="2100"
                value={formData.year}
                onChange={(e) => setFormData(prev => ({ ...prev, year: parseInt(e.target.value) || new Date().getFullYear() }))}
                className="bg-muted border-border"
                required
              />
            </div>

            <Selector
              id="format"
              label="Format"
              value={formData.format}
              onValueChange={(value) => setFormData(prev => ({ ...prev, format: value as 'hardcover' | 'paperback' | 'ebook' | 'audiobook' }))}
              options={formatOptions}
              required
            />

            <div className="space-y-2">
              <Label htmlFor="releaseDate">Release Date</Label>
              <Input
                id="releaseDate"
                type="date"
                value={formData.releaseDate}
                onChange={(e) => setFormData(prev => ({ ...prev, releaseDate: e.target.value }))}
                className="bg-muted border-border"
              />
            </div>
          </DialogBody>

          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!formData.workId.trim() || !formData.version.trim()}>
              Create Edition
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}