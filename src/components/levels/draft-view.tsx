"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { ChevronDown, ChevronRight, Upload, Eye, Download, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChapterVersionCard } from '@/components/ui/chapter-version-card';
import { UploadVersionModal } from '@/components/modals/upload-version-modal';
import { cn } from '@/lib/utils';
import { mockEditorialData } from '@/lib/mock-data';
import { groupFilesByChapter, getVersionDisplayName } from '@/lib/helpers/groupFilesByChapter';
import type { FileVersion } from '@/lib/helpers/groupFilesByChapter';
import { usePublishingStore } from '@/lib/store';

interface DraftViewProps {
  draftId: string;
}

export default function DraftView({ draftId }: DraftViewProps) {
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set());
  const [uploadModal, setUploadModal] = useState<{open: boolean; chapterGroup?: any}>({open: false});
  const [editingFiles, setEditingFiles] = useState<Set<string>>(new Set());

  // Listen for global upload event from header
  useEffect(() => {
    const handleUploadEvent = () => {
      setUploadModal({ open: true });
    };

    window.addEventListener('openUploadModal', handleUploadEvent);
    return () => window.removeEventListener('openUploadModal', handleUploadEvent);
  }, []);

  // Find the draft from mock data
  const draft = useMemo(() => {
    for (const edition of mockEditorialData) {
      const foundDraft = edition.drafts.find(d => d.id === draftId);
      if (foundDraft) return foundDraft;
    }
    return null;
  }, [draftId]);

  // Group files by chapter
  const chapterGroups = useMemo(() => {
    if (!draft?.files) return [];
    return groupFilesByChapter(draft.files);
  }, [draft]);

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters(prev => {
      const next = new Set(prev);
      if (next.has(chapterId)) {
        next.delete(chapterId);
      } else {
        next.add(chapterId);
      }
      return next;
    });
  };

  const toggleFileEdit = (fileId: string) => {
    setEditingFiles(prev => {
      const next = new Set(prev);
      if (next.has(fileId)) {
        next.delete(fileId);
      } else {
        next.add(fileId);
      }
      return next;
    });
  };

  const isFileEditing = (fileId: string) => editingFiles.has(fileId);

  const handleFileUpdate = (fileId: string, updates: any) => {
    console.log('Updating file:', fileId, updates);
    // In a real app, this would update the file data in the backend
    // For now, just log the updates
  };

  const handleFileReplace = (fileId: string, newFile: File) => {
    console.log('Replacing file:', fileId, 'with:', newFile.name);
    // In a real app, this would upload the new file and replace the existing one
  };


  const handleSetAsSelected = (file: FileVersion) => {
    // In a real app, this would update the backend
    console.log('Setting as selected:', file);
  };

  const handleUploadVersion = (chapterGroup: any) => {
    setUploadModal({ open: true, chapterGroup });
  };

  const handleUploadSubmit = (data: { file: File; uploadComment: string; uploadedBy: string; }) => {
    // In a real app, this would upload to backend and update the data
    console.log('Uploading new version:', data);
    console.log('For chapter:', uploadModal.chapterGroup?.title);
  };

  if (!draft) {
    return (
      <div className="h-full p-6">
        <p className="text-muted-foreground">Draft not found</p>
      </div>
    );
  }

  return (
    <div className="h-full p-6 space-y-6">
      <div className="space-y-6">

          {/* Main Content - Simplified */}
          <div>
            <div>
              {/* Chapter Groups */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Draft Files by Chapter</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="max-h-[80vh] overflow-y-auto">
                      <div className="space-y-4">
                        {chapterGroups.map((group) => (
                          <div key={group.id} className="border rounded-lg">
                            {/* Chapter Header */}
                            <div className="flex items-center justify-between p-3 bg-secondary/80 hover:bg-secondary transition-colors rounded-lg">
                              <div 
                                className="flex-1 min-w-0 cursor-pointer"
                                onClick={() => toggleChapter(group.id)}
                              >
                                {/* Title and metadata */}
                                <div className="text-sm font-medium flex items-center gap-2">
                                  <FileText className="h-4 w-4 text-muted-foreground" />
                                  {group.title}
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">
                                  {group.versions.length} version{group.versions.length !== 1 ? 's' : ''} • {group.versions.find(v => v.isSelected)?.filename || group.versions[0]?.filename}
                                </div>
                              </div>
                              
                              {/* Upload button and chevron */}
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setUploadModal({open: true, chapterGroup: group});
                                  }}
                                  className="text-xs text-white hover:text-white bg-muted/30 hover:!bg-blue-600 relative z-10 cursor-pointer"
                                >
                                  <Upload className="h-4 w-4 mr-1" />
                                  New Version
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-8 w-8 p-0"
                                  onClick={() => toggleChapter(group.id)}
                                >
                                  {expandedChapters.has(group.id) ? (
                                    <ChevronDown className="h-4 w-4" />
                                  ) : (
                                    <ChevronRight className="h-4 w-4" />
                                  )}
                                </Button>
                              </div>
                            </div>

                            {/* Chapter Versions - Dynamic height expansion */}
                            {expandedChapters.has(group.id) && (
                              <div className="border-t bg-muted/20 p-3 space-y-2 min-h-0 h-auto">
                                {group.versions.map((file) => (
                                  <ChapterVersionCard
                                    key={file.id}
                                    file={file}
                                    isEditing={isFileEditing(file.id)}
                                    onSetAsSelected={() => handleSetAsSelected(file)}
                                    onDownload={() => console.log('Download:', file.filename)}
                                    onPreview={() => console.log('Preview:', file.filename)}
                                    onEdit={() => toggleFileEdit(file.id)}
                                    onUpdate={(updates) => handleFileUpdate(file.id, updates)}
                                    onFileReplace={(newFile) => handleFileReplace(file.id, newFile)}
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

            </div>
          </div>
        </div>
      
      {/* Upload Modal */}
      <UploadVersionModal
        open={uploadModal.open}
        onOpenChange={(open) => setUploadModal({ open })}
        availableChapters={chapterGroups.map(group => ({
          id: group.id,
          title: group.title,
          currentVersion: `v${group.versions.length}.0`,
          currentFileName: group.versions.find(v => v.isSelected)?.filename || group.versions[0]?.filename
        }))}
        preselectedChapterId={uploadModal.chapterGroup?.id}
        onUpload={handleUploadSubmit}
      />
    </div>
  );
}