"use client";

import { useState } from "react";
import { Upload, FileType } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogBody, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockPublishers } from "@/lib/mock-data";

interface UploadFileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: FileFormData) => void;
  chapterTitle?: string;
}

interface FileFormData {
  publisher: string;
  title: string;
  file: File | null;
  version: string;
  description: string;
}

export function UploadFileModal({ open, onOpenChange, onSubmit, chapterTitle }: UploadFileModalProps) {
  const [formData, setFormData] = useState<FileFormData>({
    publisher: "",
    title: "",
    file: null,
    version: "v1.0",
    description: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title.trim() && formData.file) {
      onSubmit(formData);
      onOpenChange(false);
      // Reset form
      setFormData({
        publisher: "",
        title: "",
        file: null,
        version: "v1.0",
        description: ""
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ 
      ...prev, 
      file,
      title: file ? file.name.replace(/\.[^/.]+$/, "") : prev.title
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-indigo-600" />
            <DialogTitle>Upload DOCX File</DialogTitle>
          </div>
          <DialogClose />
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <DialogBody className="space-y-4">
            {chapterTitle && (
              <div className="text-sm text-muted-foreground">
                Uploading to chapter: <span className="font-medium">{chapterTitle}</span>
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
              <Label htmlFor="file">Select DOCX File *</Label>
              <Input
                id="file"
                type="file"
                accept=".docx,.doc"
                onChange={handleFileChange}
                required
                className="bg-secondary/80 border-border file:mr-4 file:py-1 file:px-2 file:rounded file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">File Title *</Label>
              <Input
                id="title"
                placeholder="Document title (auto-filled from filename)"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="bg-secondary/80 border-border"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="version">Version</Label>
              <Input
                id="version"
                placeholder="v1.0"
                value={formData.version}
                onChange={(e) => setFormData(prev => ({ ...prev, version: e.target.value }))}
                className="bg-secondary/80 border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Brief description of the document..."
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="bg-secondary/80 border-border"
              />
            </div>

            {formData.file && (
              <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                <FileType className="h-4 w-4 text-slate-500" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{formData.file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(formData.file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
            )}
          </DialogBody>

          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!formData.title.trim() || !formData.file}>
              Upload File
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}