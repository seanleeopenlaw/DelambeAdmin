"use client";

import { useState } from "react";
import { Folder } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogBody, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockPublishers } from "@/lib/mock-data";

interface CreateDraftModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: DraftFormData) => void;
  editionTitle?: string;
}

interface DraftFormData {
  publisher: string;
  name: string;
  version: string;
  status: 'published' | 'unpublished' | 'draft';
  wordCount: number;
  reviewers: string[];
}

export function CreateDraftModal({ open, onOpenChange, onSubmit, editionTitle }: CreateDraftModalProps) {
  const [formData, setFormData] = useState<DraftFormData>({
    publisher: "",
    name: "",
    version: "v1.0",
    status: 'draft',
    wordCount: 0,
    reviewers: [""]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim()) {
      onSubmit(formData);
      onOpenChange(false);
      // Reset form
      setFormData({
        publisher: "",
        name: "",
        version: "v1.0",
        status: 'draft',
        wordCount: 0,
        reviewers: [""]
      });
    }
  };

  const addReviewer = () => {
    setFormData(prev => ({
      ...prev,
      reviewers: [...prev.reviewers, ""]
    }));
  };

  const updateReviewer = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      reviewers: prev.reviewers.map((reviewer, i) => i === index ? value : reviewer)
    }));
  };

  const removeReviewer = (index: number) => {
    if (formData.reviewers.length > 1) {
      setFormData(prev => ({
        ...prev,
        reviewers: prev.reviewers.filter((_, i) => i !== index)
      }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Folder className="h-5 w-5 text-orange-600" />
            <DialogTitle>Create New Draft</DialogTitle>
          </div>
          <DialogClose />
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <DialogBody className="space-y-4">
            {editionTitle && (
              <div className="text-sm text-muted-foreground">
                Creating draft for: <span className="font-medium">{editionTitle}</span>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="publisher">Publisher</Label>
              <Select 
                value={formData.publisher} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, publisher: value }))}
              >
                <SelectTrigger className="bg-secondary/80 border-border">
                  <SelectValue placeholder="Select publisher" />
                </SelectTrigger>
                <SelectContent>
                  {mockPublishers.map((publisher) => (
                    <SelectItem key={publisher} value={publisher}>
                      {publisher}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Draft Name *</Label>
              <Input
                id="name"
                placeholder="e.g., Main Draft, Review Draft"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="bg-secondary/80 border-border"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="version">Version *</Label>
              <Input
                id="version"
                placeholder="e.g., v1.0, v2.3"
                value={formData.version}
                onChange={(e) => setFormData(prev => ({ ...prev, version: e.target.value }))}
                className="bg-secondary/80 border-border"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status *</Label>
              <Select 
                value={formData.status} 
                onValueChange={(value: any) => setFormData(prev => ({ ...prev, status: value }))}
              >
                <SelectTrigger className="bg-secondary/80 border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="unpublished">Unpublished</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="wordCount">Word Count</Label>
              <Input
                id="wordCount"
                type="number"
                min="0"
                placeholder="125000"
                value={formData.wordCount || ""}
                onChange={(e) => setFormData(prev => ({ ...prev, wordCount: parseInt(e.target.value) || 0 }))}
                className="bg-secondary/80 border-border"
              />
            </div>

            <div className="space-y-2">
              <Label>Reviewers</Label>
              {formData.reviewers.map((reviewer, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    placeholder="Reviewer name"
                    value={reviewer}
                    onChange={(e) => updateReviewer(index, e.target.value)}
                    className="bg-secondary/80 border-border"
                  />
                  {formData.reviewers.length > 1 && (
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={() => removeReviewer(index)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={addReviewer}
              >
                Add Reviewer
              </Button>
            </div>
          </DialogBody>

          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!formData.name.trim()}>
              Create Draft
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}