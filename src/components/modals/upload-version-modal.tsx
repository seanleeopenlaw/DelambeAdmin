"use client";

import React, { useState, useEffect } from 'react';
import { Upload, FileText, X, Plus, RefreshCw } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { parseFileMetadata } from '@/lib/helpers/parseFileMetadata';

type UploadType = 'new-chapter' | 'add-to-existing';

interface UploadVersionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  availableChapters?: Array<{ id: string; title: string; currentVersion: string; currentFileName?: string }>;
  preselectedChapterId?: string; // Pre-select a specific chapter for version upload
  onUpload: (data: {
    file: File;
    uploadComment: string;
    uploadedBy: string;
    uploadType: UploadType;
    targetChapterId?: string; // for add-to-existing
    newChapterTitle?: string; // for new-chapter
  }) => void;
}

export function UploadVersionModal({
  open,
  onOpenChange,
  availableChapters = [],
  preselectedChapterId,
  onUpload
}: UploadVersionModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadComment, setUploadComment] = useState('');
  const [uploadedBy, setUploadedBy] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [uploadType, setUploadType] = useState<UploadType>('new-chapter');
  const [targetChapterId, setTargetChapterId] = useState<string>('');
  const [newChapterTitle, setNewChapterTitle] = useState<string>('');

  // Pre-select chapter when preselectedChapterId is provided
  useEffect(() => {
    if (open && preselectedChapterId && availableChapters.some(chapter => chapter.id === preselectedChapterId)) {
      setUploadType('add-to-existing');
      setTargetChapterId(preselectedChapterId);
      setNewChapterTitle(''); // Clear new chapter title when switching to existing
    } else if (open && !preselectedChapterId) {
      // Reset to default state if no preselection
      setUploadType('new-chapter');
      setTargetChapterId('');
    }
  }, [open, preselectedChapterId, availableChapters]);

  // Reset form when modal closes
  useEffect(() => {
    if (!open) {
      setSelectedFile(null);
      setUploadComment('');
      setUploadedBy('');
      setNewChapterTitle('');
      setTargetChapterId('');
      setUploadType('new-chapter');
    }
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const isNewChapter = uploadType === 'new-chapter';
    const isAddToExisting = uploadType === 'add-to-existing';
    
    const isValid = selectedFile && uploadComment && uploadedBy &&
      (isNewChapter ? newChapterTitle.trim() : true) &&
      (isAddToExisting ? targetChapterId : true);
    
    if (isValid) {
      onUpload({
        file: selectedFile,
        uploadComment,
        uploadedBy,
        uploadType,
        targetChapterId: isAddToExisting ? targetChapterId : undefined,
        newChapterTitle: isNewChapter ? newChapterTitle.trim() : undefined
      });
      
      // Close modal (form reset handled by useEffect)
      onOpenChange(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[576px] p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-4 space-y-2">
          <div className="text-left">
            <DialogTitle className="text-xl font-semibold text-foreground">
              Upload File
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground mt-1">
              Upload a file to create a new chapter or add to an existing one
            </DialogDescription>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-5 px-6 pb-4">
            {/* Chapter Title Input */}
            <div className="space-y-3">
              <Tabs 
                value={uploadType} 
                onValueChange={(value) => {
                  setUploadType(value as UploadType);
                  if (value === 'new-chapter') {
                    setTargetChapterId('');
                  } else {
                    setNewChapterTitle('');
                  }
                }}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="new-chapter">New Chapter</TabsTrigger>
                  <TabsTrigger value="add-to-existing">Existing Chapter</TabsTrigger>
                </TabsList>
                
                <TabsContent value="new-chapter" className="space-y-3">
                  <div className="space-y-1 text-left">
                    <Label htmlFor="new-chapter-title" className="text-sm font-medium text-foreground">
                      Chapter Title <span className="text-destructive">*</span>
                    </Label>
                  </div>
                  <Input
                    id="new-chapter-title"
                    value={newChapterTitle}
                    onChange={(e) => setNewChapterTitle(e.target.value)}
                    placeholder="e.g., Cultural Considerations in Sentencing"
                    required={uploadType === 'new-chapter'}
                    className="text-sm"
                  />
                </TabsContent>
                
                <TabsContent value="add-to-existing" className="space-y-3">
                  <div className="space-y-1 text-left">
                    <Label htmlFor="existing-chapter" className="text-sm font-medium text-foreground">
                      Select Chapter <span className="text-destructive">*</span>
                    </Label>
                  </div>
                  <Select value={targetChapterId} onValueChange={setTargetChapterId}>
                    <SelectTrigger className="w-full h-auto min-h-[44px] py-2">
                      <SelectValue placeholder="Select a chapter">
                        {targetChapterId && availableChapters.find(chapter => chapter.id === targetChapterId) && (
                          <div className="text-left">
                            <div className="font-medium text-xs">
                              {availableChapters.find(chapter => chapter.id === targetChapterId)?.title}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {availableChapters.find(chapter => chapter.id === targetChapterId)?.currentFileName || `${availableChapters.find(chapter => chapter.id === targetChapterId)?.title} - Latest Version`}
                            </div>
                          </div>
                        )}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {availableChapters.map((chapter) => (
                        <SelectItem key={chapter.id} value={chapter.id}>
                          <div>
                            <div className="font-medium">{chapter.title}</div>
                            <div className="text-xs text-muted-foreground">
                              {chapter.currentFileName || `${chapter.title} - Latest Version`}
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TabsContent>
              </Tabs>
            </div>

            {/* File Upload Area - Enhanced */}
            <div className="space-y-3">
              <div className="space-y-1 text-left">
                <Label htmlFor="file" className="text-sm font-medium text-foreground">
                  Document File <span className="text-destructive">*</span>
                </Label>
              </div>
              <div className="border border-border rounded-lg p-1 bg-background">
                <div
                  className={`relative border border-dashed rounded-md p-6 text-center cursor-pointer transition-all duration-200 hover:bg-muted/20 ${
                    isDragging 
                      ? 'border-primary bg-primary/5 shadow-sm' 
                      : 'border-border hover:border-primary/30'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById('file-input')?.click()}
                >
                  <input
                    id="file-input"
                    type="file"
                    accept=".docx,.pdf"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  
                  {selectedFile ? (
                    <div className="flex items-center justify-between p-2">
                      <div className="flex items-center gap-3">
                        <FileText className="h-8 w-8 text-primary flex-shrink-0" />
                        <div className="text-left min-w-0">
                          <p className="font-medium text-sm truncate">{selectedFile.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedFile(null);
                        }}
                        className="h-8 w-8 p-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="py-4">
                      <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                      <p className="text-sm font-medium mb-1 text-foreground">Click to upload or drag and drop</p>
                      <p className="text-xs text-muted-foreground">DOCX or PDF file only</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Upload Comment - Enhanced */}
            <div className="space-y-3">
              <div className="space-y-1 text-left">
                <Label htmlFor="comment" className="text-sm font-medium text-foreground">
                  What changed? <span className="text-destructive">*</span>
                </Label>
              </div>
              <Textarea
                id="comment"
                value={uploadComment}
                onChange={(e) => setUploadComment(e.target.value)}
                placeholder="e.g., 'Fixed table formatting', 'Updated citations', 'Added new section'"
                rows={2}
                required
                className="resize-none text-sm"
              />
            </div>

            {/* Uploaded By - Enhanced */}
            <div className="space-y-3">
              <div className="space-y-1 text-left">
                <Label htmlFor="uploader" className="text-sm font-medium text-foreground">
                  Author Name <span className="text-destructive">*</span>
                </Label>
              </div>
              <Input
                id="uploader"
                value={uploadedBy}
                onChange={(e) => setUploadedBy(e.target.value)}
                placeholder="e.g., Dr. Sarah Mitchell"
                required
                className="text-sm"
              />
            </div>

          </div>

          <DialogFooter className="border-t bg-muted/5 px-6 py-4 mt-4">
            <div className="flex items-center justify-end w-full">
              <div className="flex items-center gap-3">
                <Button 
                  type="button" 
                  variant="ghost" 
                  onClick={() => onOpenChange(false)}
                  className="text-sm hover:bg-muted/50 transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={
                    !selectedFile || 
                    !uploadComment || 
                    !uploadedBy ||
                    (uploadType === 'new-chapter' && !newChapterTitle.trim()) ||
                    (uploadType === 'add-to-existing' && !targetChapterId)
                  }
                  className="text-sm hover:bg-primary/90 transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  <Upload className="h-4 w-4 mr-1" />
                  Proceed
                </Button>
              </div>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}