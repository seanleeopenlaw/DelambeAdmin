"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FileType, Download, MessageSquare, Copy, Trash2, Eye, Upload, Calendar, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import EditableField from '@/components/ui/editable-field';
import BlurFade from '@/components/ui/blur-fade';
import { mockContentFile } from '@/lib/mock-data';
import { itemVariants, staggerContainer } from '@/lib/animations/variants';
import { getHierarchyColor, getActionColor } from '@/lib/design-tokens/colors';
import { cn } from '@/lib/utils';

interface FileViewProps {
  nodeId: string;
}

export default function FileView({ nodeId }: FileViewProps) {
  const file = mockContentFile;
  const [isCurrentlySelected, setIsCurrentlySelected] = React.useState(true);
  const [isLatestVersion, setIsLatestVersion] = React.useState(true);

  const handleFieldSave = (field: string, value: string | number) => {
    console.log(`Saving ${field}:`, value);
  };

  const handleDownload = () => {
    console.log('Downloading file...');
  };

  const handleCreateVersion = () => {
    console.log('Creating new version...');
  };

  const handleDelete = () => {
    console.log('Deleting file...');
  };

  const handleSetAsCurrentlySelected = () => {
    setIsCurrentlySelected(true);
    console.log('Setting as currently selected version...');
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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

          {/* Main Content Area */}
          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Main Editor Area */}
              <div className="lg:col-span-3">
                <Card className="h-[800px]">
                  <CardHeader>
                    <CardTitle className="text-lg">Document Editor</CardTitle>
                    <CardDescription>
                      Editing Cultural Considerations in Sentencing - v3.2
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-full p-0">
                    {/* Editor Toolbar */}
                    <div className="flex items-center gap-1 px-4 py-2 border-b bg-muted/50">
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        <strong>B</strong>
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        <em>I</em>
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        <u>U</u>
                      </Button>
                      <div className="w-px h-6 bg-border mx-1" />
                      <Select defaultValue="Normal text">
                        <SelectTrigger className="text-sm bg-transparent border-0 focus:outline-none h-auto p-0">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Normal text">Normal text</SelectItem>
                          <SelectItem value="Title">Title</SelectItem>
                          <SelectItem value="Heading 1">Heading 1</SelectItem>
                          <SelectItem value="Heading 2">Heading 2</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="w-px h-6 bg-border mx-1" />
                      <Select defaultValue="Times New Roman">
                        <SelectTrigger className="text-sm bg-transparent border-0 focus:outline-none h-auto p-0">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                          <SelectItem value="Arial">Arial</SelectItem>
                          <SelectItem value="Calibri">Calibri</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select defaultValue="11">
                        <SelectTrigger className="text-sm bg-transparent border-0 focus:outline-none h-auto p-0">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="11">11</SelectItem>
                          <SelectItem value="12">12</SelectItem>
                          <SelectItem value="14">14</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* Document Content */}
                    <div className="h-full bg-background overflow-auto">
                      <div className="max-w-4xl mx-auto p-12 min-h-full bg-background text-foreground" style={{ fontFamily: 'Times, serif', lineHeight: '1.6' }}>
                        <div className="space-y-6">
                          {/* Content starts directly without duplicate title */}
                          
                          <h2 className="text-2xl font-bold mt-8 mb-4">3.1 Introduction</h2>
                          <p className="text-base leading-relaxed mb-4">
                            This chapter provides guidance for judicial officers when determining appropriate sentences 
                            for Aboriginal and Torres Strait Islander peoples. The unique historical, social, and 
                            cultural circumstances of Indigenous Australians must be carefully considered within 
                            the sentencing framework.
                          </p>
                          
                          <p className="text-base leading-relaxed mb-4">
                            The principles outlined in this chapter are consistent with the decision in <em>R v Fernando</em> 
                            (1992) and subsequent case law, which established that the disadvantaged background of 
                            Aboriginal offenders may be relevant to the sentencing process.
                          </p>
                          
                          <h2 className="text-2xl font-bold mt-8 mb-4">3.2 Key Principles</h2>
                          
                          <h3 className="text-xl font-semibold mt-6 mb-3">3.2.1 Historical Context</h3>
                          <p className="text-base leading-relaxed mb-4">
                            Courts must acknowledge the profound impact of colonization, dispossession, and 
                            subsequent government policies on Aboriginal and Torres Strait Islander communities. 
                            This historical context provides essential background for understanding the circumstances 
                            that may contribute to offending behavior.
                          </p>
                          
                          <h3 className="text-xl font-semibold mt-6 mb-3">3.2.2 Cultural Obligations and Customary Law</h3>
                          <p className="text-base leading-relaxed mb-4">
                            Traditional Aboriginal and Torres Strait Islander law systems continue to operate 
                            alongside Australian law. In some cases, cultural obligations or customary law 
                            practices may be relevant factors in sentencing, particularly where:
                          </p>
                          
                          <ul className="list-disc ml-8 mb-4 space-y-2">
                            <li>The offence relates to cultural practices or disputes</li>
                            <li>Traditional punishment has already been imposed</li>
                            <li>Community expectations regarding resolution exist</li>
                            <li>Cultural rehabilitation programs are available</li>
                          </ul>
                          
                          <h2 className="text-2xl font-bold mt-8 mb-4">3.3 Sentencing Options and Considerations</h2>
                          
                          <p className="text-base leading-relaxed mb-4">
                            When sentencing Aboriginal and Torres Strait Islander offenders, courts should 
                            consider alternatives to imprisonment where appropriate, including:
                          </p>
                          
                          <div className="bg-muted p-6 rounded-lg mb-6">
                            <h4 className="font-semibold mb-3">Community-based Orders</h4>
                            <p className="text-sm leading-relaxed">
                              Community service orders, intensive supervision, and other community-based 
                              dispositions that allow offenders to maintain connection with family and 
                              cultural obligations while addressing their offending behavior.
                            </p>
                          </div>
                          
                          <p className="text-base leading-relaxed mb-4">
                            The decision in <em>Bugmy v The Queen</em> (2013) reinforced that the effects of 
                            profound childhood deprivation do not diminish over time, and such background 
                            circumstances remain relevant throughout an offender's life.
                          </p>
                          
                          <p className="text-base leading-relaxed text-muted-foreground italic">
                            [Document continues with additional sections on specific case studies, 
                            legislative considerations, and practical guidance for judicial officers...]
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-4">
                {/* Version Info */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Version Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 pb-3">
                    <div>
                      <label className="text-xs font-medium text-muted-foreground block mb-1">Currently Selected Version</label>
                      <Select 
                        defaultValue="v3.2"
                        onValueChange={(value) => handleFieldSave('selectedVersion', value)}
                      >
                        <SelectTrigger className="w-full mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="v3.2">v3.2 (Latest)</SelectItem>
                          <SelectItem value="v3.1">v3.1</SelectItem>
                          <SelectItem value="v3.0">v3.0</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-xs font-medium text-muted-foreground block mb-1">Version Comment</label>
                      <Textarea
                        value="Updated examples and fixed typos in cultural considerations section"
                        onChange={(e) => handleFieldSave('versionComment', e.target.value)}
                        placeholder="Describe changes..."
                        className="resize-none text-xs bg-secondary/80 border-border"
                        rows={2}
                        readOnly
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Version History */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Version History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {[
                        {
                          version: "v3.2",
                          date: "2024-03-18",
                          comment: "Updated cultural considerations examples",
                          isCurrent: true,
                          author: "Justice Sarah Mitchell"
                        },
                        {
                          version: "v3.1",
                          date: "2024-03-15", 
                          comment: "Added new sentencing precedents",
                          isCurrent: false,
                          author: "Dr. Robert Chen"
                        },
                        {
                          version: "v3.0",
                          date: "2024-03-10",
                          comment: "Major revision with updated case law",
                          isCurrent: false,
                          author: "Justice Sarah Mitchell"
                        }
                      ].map((version, index) => (
                        <div key={index} className={cn("p-2 rounded border text-xs", 
                          version.isCurrent && "bg-primary/5 border-primary/20"
                        )}>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{version.version}</span>
                            {version.isCurrent && (
                              <Badge variant="default" className="text-[10px] px-1 py-0">Selected</Badge>
                            )}
                          </div>
                          <p className="text-muted-foreground text-[10px] mb-1">
                            {version.comment}
                          </p>
                          <p className="text-muted-foreground text-[10px]">
                            {version.author} • Updated {version.date}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </BlurFade>
    </div>
  );
}