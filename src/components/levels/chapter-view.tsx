"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Calendar, User, Upload, Download, MessageSquare, Plus, Eye, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import EditableField from '@/components/ui/editable-field';
import BlurFade from '@/components/ui/blur-fade';
import { mockTreeData } from '@/lib/mock-data';
import { itemVariants, staggerContainer } from '@/lib/animations/variants';
import { getHierarchyColor, getStatsColor } from '@/lib/design-tokens/colors';

interface ChapterViewProps {
  nodeId: string;
}

export default function ChapterView({ nodeId }: ChapterViewProps) {
  // Get chapter data from tree structure to match navigation
  const getChapterData = (id: string) => {
    // Find chapter in tree structure
    for (const work of mockTreeData) {
      if (work.children) {
        for (const edition of work.children) {
          if (edition.children) {
            for (const draft of edition.children) {
              if (draft.children) {
                const chapterNode = draft.children.find(chapter => chapter.id === id);
                if (chapterNode) {
                  // Map files from tree structure
                  const files = chapterNode.children ? chapterNode.children.map((file, index) => {
                    const versionMatch = file.title.match(/v(\d+\.\d+)$/);
                    return {
                      id: index + 1,
                      name: file.title.replace(/ v\d+\.\d+$/, ''), // Remove version from title
                      version: versionMatch ? `v${versionMatch[1]}` : 'v1.0',
                      size: index === 0 ? '1.2 MB' : index === 1 ? '1.1 MB' : '0.8 MB',
                      modified: index === 0 ? '2024-03-18' : index === 1 ? '2024-03-15' : '2024-03-10',
                      isCurrentVersion: index === 0,
                      comment: index === 0 ? 'Updated examples and fixed typos' : 'Previous version'
                    };
                  }) : [];
                  
                  return {
                    id: chapterNode.id,
                    title: chapterNode.title,
                    order: chapterNode.id === 'chapter-1' ? 1 : 2,
                    editor: 'Justice Sarah Mitchell',
                    deadline: new Date('2024-04-15'),
                    wordCount: 8250,
                    status: 'draft', // published | draft | under_review
                    files
                  };
                }
              }
            }
          }
        }
      }
    }
    
    // Fallback data that matches tree structure
    return {
      id: 'chapter-1',
      title: 'Chapter 1 - Cultural Considerations in Sentencing',
      order: 1,
      editor: 'Justice Sarah Mitchell',
      deadline: new Date('2024-04-15'),
      wordCount: 8250,
      status: 'draft',
      files: [
        {
          id: 1,
          name: 'cultural-considerations-sentencing',
          version: 'v2.3', // Matches tree data
          size: '1.2 MB',
          modified: '2024-03-18',
          isCurrentVersion: true,
          comment: 'Updated examples and fixed typos'
        },
        {
          id: 2,
          name: 'indigenous-justice-principles',
          version: 'v1.8',
          size: '1.1 MB',
          modified: '2024-03-15',
          isCurrentVersion: false,
          comment: 'Previous version'
        },
        {
          id: 3,
          name: 'traditional-law-integration',
          version: 'v2.1',
          size: '0.8 MB',
          modified: '2024-03-10',
          isCurrentVersion: false,
          comment: 'Previous version'
        }
      ]
    };
  };

  const chapter = getChapterData(nodeId);

  const handleFieldSave = (field: string, value: string | number) => {
    console.log(`Saving ${field}:`, value);
  };

  const handleUploadFile = () => {
    console.log('Uploading file...');
  };

  return (
    <div className="h-full p-6 space-y-6">
      <BlurFade>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Header */}
          <motion.div variants={itemVariants}>
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <Layers className={`h-8 w-8 ${getHierarchyColor('chapter').primary}`} />
                <EditableField
                  value={chapter.title}
                  onSave={(value) => handleFieldSave('title', value)}
                  className="text-3xl font-bold"
                  placeholder="Chapter Title"
                />
              </div>
              <div className="flex items-start gap-4 text-sm text-muted-foreground">
                <span>Chapter {chapter.order}</span>
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">Draft</Badge>
                <span>From: Main Draft v3.2</span>
                <span>Due: {chapter.deadline.toLocaleDateString()} • {chapter.files.length} files</span>
              </div>
            </div>
          </motion.div>

          {/* Chapter Details */}
          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Editor Assignment */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Editor
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>
                        {chapter.editor.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <EditableField
                        value={chapter.editor}
                        onSave={(value) => handleFieldSave('editor', value)}
                        placeholder="Assign editor"
                      />
                      <p className="text-sm text-muted-foreground">Chapter editor</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Word Count */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Word Count</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <EditableField
                      value={chapter.wordCount.toLocaleString()}
                      onSave={(value) => handleFieldSave('wordCount', value)}
                      type="number"
                      className={`text-2xl font-bold ${getStatsColor('primary').text}`}
                    />
                    <p className="text-sm text-muted-foreground mt-1">Words written</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Files */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
                <div>
                  <CardTitle className="text-lg">Files</CardTitle>
                  <CardDescription>Manage chapter files and versions</CardDescription>
                </div>
                <Button onClick={handleUploadFile}>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload File
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      name: "cultural-considerations-sentencing.docx",
                      type: "Word Document",
                      size: "1.2 MB",
                      version: "v3.2",
                      uploadedAt: "2024-03-18",
                      isCurrentVersion: true,
                      comment: "Updated examples and fixed typos in cultural considerations section"
                    },
                    {
                      name: "cultural-considerations-sentencing.docx",
                      type: "Word Document",
                      size: "1.1 MB", 
                      version: "v3.1",
                      uploadedAt: "2024-03-15",
                      isCurrentVersion: false,
                      comment: "Added new sentencing precedents"
                    },
                    {
                      name: "sentencing-guidelines-outline.docx",
                      type: "Word Document",
                      size: "0.8 MB",
                      version: "v1.0",
                      uploadedAt: "2024-03-10",
                      isCurrentVersion: false,
                      comment: "Initial outline and structure"
                    }
                  ].map((file, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.01 }}
                      className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <div>
                            <h4 className="font-medium flex items-center gap-2">
                              {file.name}
                              {file.isCurrentVersion && (
                                <Badge variant="default" className="text-xs">Current</Badge>
                              )}
                            </h4>
                            <div className="text-sm text-muted-foreground">
                              {file.type} • {file.size} • {file.version} • Uploaded {file.uploadedAt}
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                              {file.comment}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="flex items-center gap-1">
                              Actions
                              <ChevronDown className="h-3 w-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuItem>
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Comment
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Upload className="h-4 w-4 mr-2" />
                              Update Version
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Preview */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Chapter Preview</CardTitle>
                <CardDescription>
                  Latest content from the current version
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  <p className="text-muted-foreground">
                    This chapter provides comprehensive guidance for judicial officers when determining appropriate 
                    sentences for Aboriginal and Torres Strait Islander peoples. The unique historical, social, and 
                    cultural circumstances of Indigenous Australians must be carefully considered within the sentencing framework.
                  </p>
                  <p className="text-muted-foreground">
                    The principles outlined in this chapter are consistent with the decision in R v Fernando (1992) 
                    and subsequent case law, which established that the disadvantaged background of Aboriginal offenders 
                    may be relevant to the sentencing process...
                  </p>
                  <div className="mt-4 p-3 bg-muted rounded-md">
                    <p className="text-sm text-muted-foreground italic">
                      Preview showing first 200 words. Upload latest file to see full content.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </BlurFade>
    </div>
  );
}