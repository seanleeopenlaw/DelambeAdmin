"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layers, Calendar, FileText, Download, Eye, Edit, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import EditableField from '@/components/ui/editable-field';
import BlurFade from '@/components/ui/blur-fade';
import { itemVariants, staggerContainer } from '@/lib/animations/variants';
import { getHierarchyColor } from '@/lib/design-tokens/colors';

interface PartViewProps {
  nodeId: string;
}

// Helper function to get unique descriptions based on node ID
const getDocumentDescription = (nodeId: string): string => {
  const descriptions: Record<string, string> = {
    'chapter-1': 'Guidance on sentencing principles for Indigenous defendants',
    'chapter-2': 'Overview of evidentiary rules in cultural contexts',
    'file-1': 'Guidance on sentencing principles for Indigenous defendants', 
    'file-2': 'Protocols for recognizing traditional justice systems',
    'file-3': 'Case studies applying Fernando principles in practice',
    'file-4': 'Evidence standards and cultural protocols overview',
    'file-5': 'Procedures for oral testimony in cultural contexts'
  };
  return descriptions[nodeId] || 'Detailed legal guidance document';
};

// Helper function to get position based on node ID
const getPositionFromNodeId = (nodeId: string): number => {
  const positions: Record<string, number> = {
    'chapter-1': 100,  // Chapter 1
    'chapter-2': 200,  // Chapter 2  
    'file-1': 100,     // Part of Chapter 1
    'file-2': 100,     // Part of Chapter 1
    'file-3': 100,     // Part of Chapter 1
    'file-4': 200,     // Part of Chapter 2
    'file-5': 200,     // Part of Chapter 2
  };
  return positions[nodeId] || 100;
};

// Helper function to get titles based on node ID
const getTitleFromNodeId = (nodeId: string): string => {
  const titles: Record<string, string> = {
    'chapter-1': 'Cultural Considerations in Sentencing',
    'chapter-2': 'Evidence and Indigenous Law',
    'file-1': 'Cultural Considerations in Sentencing',
    'file-2': 'Traditional Justice Systems', 
    'file-3': 'Fernando Principles - Case Study Analysis',
    'file-4': 'Evidence Standards and Cultural Protocols',
    'file-5': 'Oral Testimony and Cultural Context'
  };
  return titles[nodeId] || 'Document Title';
};

// Helper function to get part type based on node ID
const getPartTypeFromNodeId = (nodeId: string): string => {
  const partTypes: Record<string, string> = {
    'chapter-1': 'chapter',
    'chapter-2': 'appendix',
    'file-1': 'chapter',     // Inherits from parent
    'file-2': 'chapter',     // Inherits from parent
    'file-3': 'chapter',     // Inherits from parent
    'file-4': 'appendix',    // Inherits from parent
    'file-5': 'appendix',    // Inherits from parent
  };
  return partTypes[nodeId] || 'chapter';
};

export default function PartView({ nodeId }: PartViewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [partData, setPartData] = useState({
    partType: 'chapter',
    position: getPositionFromNodeId(nodeId),
    title: getTitleFromNodeId(nodeId),
    description: getDocumentDescription(nodeId),
    hintKey: '',
    releaseDate: '2024-06-15',
    sourceDocument: {
      name: 'Cultural Considerations in Sentencing Guidelines',
      version: 'v2.3'
    },
    generatedPdf: {
      url: '/pdfs/cultural-considerations-v2.3.pdf',
      generatedAt: '2024-03-20'
    }
  });

  const handleSave = () => {
    console.log('Saving part data:', partData);
    setIsEditing(false);
  };

  const handleFieldChange = (field: string, value: string | number) => {
    setPartData(prev => ({ ...prev, [field]: value }));
  };

  // Convert internal position to user-friendly chapter number
  const getChapterNumber = (position: number): string => {
    if (position >= 100 && position < 200) return "1";
    if (position >= 200 && position < 300) return "2";
    if (position >= 300 && position < 400) return "3";
    return Math.floor(position / 100).toString();
  };

  // Convert chapter number back to internal position
  const getPositionFromChapter = (chapter: string): number => {
    const chapterNum = parseInt(chapter) || 1;
    return chapterNum * 100;
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
          {/* Content starts directly - no duplicate header */}

          {/* Main Content */}
          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column - Core Fields */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Chapter Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="chapter">Chapter Number</Label>
                      {isEditing ? (
                        <Select
                          value={getChapterNumber(partData.position)}
                          onValueChange={(value) => handleFieldChange('position', getPositionFromChapter(value))}
                        >
                          <SelectTrigger className="w-full mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1</SelectItem>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="3">3</SelectItem>
                            <SelectItem value="4">4</SelectItem>
                            <SelectItem value="5">5</SelectItem>
                            <SelectItem value="6">6</SelectItem>
                            <SelectItem value="7">7</SelectItem>
                            <SelectItem value="8">8</SelectItem>
                            <SelectItem value="9">9</SelectItem>
                            <SelectItem value="10">10</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <p className="mt-1 p-2 bg-secondary/80 rounded-md">{getChapterNumber(partData.position)}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="title">Title</Label>
                      {isEditing ? (
                        <Input
                          id="title"
                          value={partData.title}
                          onChange={(e) => handleFieldChange('title', e.target.value)}
                          placeholder="Enter chapter title"
                        />
                      ) : (
                        <p className="mt-1 p-2 bg-secondary/80 rounded-md">{partData.title}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="description">Description</Label>
                      {isEditing ? (
                        <Textarea
                          id="description"
                          value={partData.description}
                          onChange={(e) => handleFieldChange('description', e.target.value)}
                          rows={3}
                        />
                      ) : (
                        <p className="mt-1 p-2 bg-muted rounded-md">{partData.description}</p>
                      )}
                    </div>

                    {partData.partType === 'related' && (
                      <div>
                        <Label htmlFor="hintKey">Hint Key</Label>
                        {isEditing ? (
                          <Input
                            id="hintKey"
                            value={partData.hintKey}
                            onChange={(e) => handleFieldChange('hintKey', e.target.value)}
                            placeholder="Enter hint key for related content"
                          />
                        ) : (
                          <p className="mt-1 p-2 bg-muted rounded-md">{partData.hintKey || 'N/A'}</p>
                        )}
                      </div>
                    )}

                    <div>
                      <Label htmlFor="releaseDate">Release Date</Label>
                      {isEditing ? (
                        <Input
                          id="releaseDate"
                          type="date"
                          value={partData.releaseDate}
                          onChange={(e) => handleFieldChange('releaseDate', e.target.value)}
                        />
                      ) : (
                        <p className="mt-1 p-2 bg-muted rounded-md">
                          {new Date(partData.releaseDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Source and Generated Content */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Source Document</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Document Name</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span>{partData.sourceDocument.name}</span>
                      </div>
                    </div>

                    <div>
                      <Label>Version</Label>
                      {isEditing ? (
                        <Select
                          value={partData.sourceDocument.version}
                          onValueChange={(value) => setPartData(prev => ({ 
                            ...prev, 
                            sourceDocument: { ...prev.sourceDocument, version: value }
                          }))}
                        >
                          <SelectTrigger className="w-full mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="v2.3">v2.3 (Latest)</SelectItem>
                            <SelectItem value="v2.2">v2.2</SelectItem>
                            <SelectItem value="v2.1">v2.1</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <p className="mt-1 p-2 bg-muted rounded-md">{partData.sourceDocument.version}</p>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button variant="secondary" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                      <Button variant="secondary" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {partData.generatedPdf && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Generated PDF</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label>Generated</Label>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {new Date(partData.generatedPdf.generatedAt).toLocaleDateString()} at{' '}
                          {new Date(partData.generatedPdf.generatedAt).toLocaleTimeString()}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="secondary" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          Preview PDF
                        </Button>
                        <Button variant="secondary" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download PDF
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </BlurFade>
    </div>
  );
}