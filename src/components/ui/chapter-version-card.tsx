"use client";

import React, { useState, useRef } from 'react';
import { Download, Eye, CheckCircle, Edit, Save, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { parseFileMetadata } from '@/lib/helpers/parseFileMetadata';
import type { FileVersion } from '@/lib/helpers/groupFilesByChapter';
import { usePublishingStore } from '@/lib/store';

interface ChapterVersionCardProps {
  file: FileVersion;
  isSelected?: boolean;
  isEditing?: boolean;
  onClick?: () => void;
  onSetAsSelected?: () => void;
  onDownload?: () => void;
  onPreview?: () => void;
  onEdit?: () => void;
  onUpdate?: (updates: Partial<FileVersion>) => void;
  onFileReplace?: (file: File) => void;
}

export function ChapterVersionCard({
  file,
  isSelected = false,
  isEditing = false,
  onClick,
  onSetAsSelected,
  onDownload,
  onPreview,
  onEdit,
  onUpdate,
  onFileReplace
}: ChapterVersionCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editForm, setEditForm] = useState({
    description: file.description || '',
    uploadComment: file.uploadComment || '',
    filename: file.filename || ''
  });
  const metadata = parseFileMetadata(file.filename);
  const uploadDate = new Date(file.uploadDate);

  const formatFileSize = (bytes: number | undefined) => {
    if (!bytes) return '';
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileReplace = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && onFileReplace) {
      onFileReplace(selectedFile);
    }
  };

  const handleSaveChanges = () => {
    if (onUpdate) {
      onUpdate({
        description: editForm.description,
        uploadComment: editForm.uploadComment,
        filename: editForm.filename
      });
    }
    if (onEdit) {
      onEdit(); // Toggle edit mode off
    }
  };

  const handleCancelEdit = () => {
    // Reset form to original values
    setEditForm({
      description: file.description || '',
      uploadComment: file.uploadComment || '',
      filename: file.filename || ''
    });
    if (onEdit) {
      onEdit(); // Toggle edit mode off
    }
  };

  // Helper function to abbreviate names
  const abbreviateName = (fullName: string) => {
    const parts = fullName.trim().split(' ');
    if (parts.length === 1) return parts[0];
    
    // Extract first initial and last name
    const firstInitial = parts[0].charAt(0).toUpperCase();
    const lastName = parts[parts.length - 1];
    
    return `${firstInitial}. ${lastName}`;
  };

  // Clean card styles with light background and highlighted border for selected items
  const getCardStyles = () => {
    if (file.isSelected) {
      return "bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800";
    }
    return "bg-muted/30 hover:bg-muted/50 border-border";
  };

  return (
    <div
      className={cn(
        "rounded-lg p-4 transition-all cursor-pointer hover:shadow-sm border",
        getCardStyles()
      )}
      onClick={onClick}
    >
      {/* Header with filename and version */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          {/* Conditional content based on edit mode */}
          {isEditing ? (
            /* Edit Form */
            <div className="space-y-3">
              <div>
                <Label htmlFor="filename" className="text-xs text-muted-foreground">Filename</Label>
                <Input
                  id="filename"
                  value={editForm.filename}
                  onChange={(e) => setEditForm(prev => ({ ...prev, filename: e.target.value }))}
                  className="text-sm h-8"
                  placeholder="Enter filename"
                />
              </div>
              
              <div>
                <Label htmlFor="description" className="text-xs text-muted-foreground">Description</Label>
                <Input
                  id="description"
                  value={editForm.description}
                  onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                  className="text-sm h-8"
                  placeholder="Enter description"
                />
              </div>
              
              <div>
                <Label htmlFor="comment" className="text-xs text-muted-foreground">Upload Comment</Label>
                <Textarea
                  id="comment"
                  value={editForm.uploadComment}
                  onChange={(e) => setEditForm(prev => ({ ...prev, uploadComment: e.target.value }))}
                  className="text-sm min-h-[60px] resize-none"
                  placeholder="Enter upload comment"
                />
              </div>
            </div>
          ) : (
            /* Normal Display */
            <>
              {/* Main title with status label and date/user */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-medium text-foreground leading-normal">
                    {file.filename}
                  </h4>
                  {file.isSelected && (
                    <span className="text-[10px] px-1.5 py-0.5 h-4 capitalize font-medium text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-400 rounded-md flex items-center justify-center">
                      Selected
                    </span>
                  )}
                </div>
                <span className="text-xs text-muted-foreground">
                  {uploadDate.toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric'
                  })} • {abbreviateName(file.uploadedBy)}
                </span>
              </div>
              
              {/* What's changed directly under filename */}
              {file.uploadComment && (
                <p className="text-xs text-muted-foreground mt-1 leading-normal italic">
                  {file.uploadComment}
                </p>
              )}
            </>
          )}
        </div>
      </div>


      {/* Actions - conditional based on edit mode */}
      <div className="flex items-center justify-between">
        {isEditing ? (
          /* Edit Mode Actions */
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-3 text-xs"
              onClick={(e) => {
                e.stopPropagation();
                handleCancelEdit();
              }}
            >
              <X className="h-3 w-3 mr-1.5" />
              Cancel
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-3 text-xs"
              onClick={(e) => {
                e.stopPropagation();
                handleFileReplace();
              }}
            >
              <Upload className="h-3 w-3 mr-1.5" />
              Replace File
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept=".doc,.docx,.pdf,.txt"
            />
            
            <Button
              variant="primary"
              size="sm"
              className="h-8 px-3 text-xs"
              onClick={(e) => {
                e.stopPropagation();
                handleSaveChanges();
              }}
            >
              <Save className="h-3 w-3 mr-1.5" />
              Save Changes
            </Button>
          </div>
        ) : (
          /* Normal Mode Actions */
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              className="h-8 px-3 text-xs"
              onClick={(e) => {
                e.stopPropagation();
                onPreview?.();
              }}
            >
              <Eye className="h-3 w-3 mr-1.5" />
              Preview
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-3 text-xs"
              onClick={(e) => {
                e.stopPropagation();
                onDownload?.();
              }}
            >
              <Download className="h-3 w-3 mr-1.5" />
              Download
            </Button>

            {onEdit && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-3 text-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit();
                }}
            >
              <>
                <Edit className="h-3 w-3 mr-1.5" />
                Edit
              </>
            </Button>
          )}

            {!file.isSelected && onSetAsSelected && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-3 text-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  onSetAsSelected();
                }}
              >
                <CheckCircle className="h-3 w-3 mr-1.5" />
                Make Selected
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}