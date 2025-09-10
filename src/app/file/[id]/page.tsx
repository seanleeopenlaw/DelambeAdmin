"use client";

import { useParams } from "next/navigation";
import { FileType, Download, Edit, Clock, User, FileText, Eye, Share, Archive } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function FileDetailPage() {
  const params = useParams();
  const fileId = params.id as string;

  // This would normally fetch data based on fileId from mockTreeData
  const getFileData = (id: string) => {
    const files = {
      'file-1': {
        id: 'file-1',
        title: "cultural-considerations-sentencing", // Matches tree: 'cultural-considerations-sentencing v2.3'
        version: "v2.3",
        description: "Primary document covering cultural considerations in the sentencing process for Aboriginal and Torres Strait Islander peoples.",
        chapterTitle: "Cultural Considerations in Sentencing", // Parent chapter from tree
        size: "1.2 MB",
        fileType: "docx",
        lastModified: "2024-03-18T14:30:00Z",
        createdDate: "2024-03-10T09:00:00Z",
        author: "Justice Sarah Mitchell",
        lastEditor: "Justice Sarah Mitchell",
        wordCount: 8250,
        pageCount: 18,
        status: "Under Review",
        downloadCount: 32,
        versions: [
          { version: "v2.3", date: "2024-03-18", editor: "Justice Sarah Mitchell", changes: "Updated cultural considerations examples" },
          { version: "v2.2", date: "2024-03-15", editor: "Dr. Robert Chen", changes: "Added new sentencing precedents" },
          { version: "v2.1", date: "2024-03-10", editor: "Justice Sarah Mitchell", changes: "Major revision with updated case law" }
        ]
      },
      'file-2': {
        id: 'file-2',
        title: "indigenous-justice-principles", // Matches tree: 'indigenous-justice-principles v1.8'
        version: "v1.8",
        description: "Comprehensive guide to indigenous justice principles and their application in modern courts.",
        chapterTitle: "Cultural Considerations in Sentencing",
        size: "1.1 MB",
        fileType: "docx",
        lastModified: "2024-03-15T11:20:00Z",
        createdDate: "2024-03-01T09:00:00Z",
        author: "Dr. Robert Chen",
        lastEditor: "Dr. Robert Chen",
        wordCount: 7500,
        pageCount: 16,
        status: "Approved",
        downloadCount: 28,
        versions: [
          { version: "v1.8", date: "2024-03-15", editor: "Dr. Robert Chen", changes: "Added new case studies and examples" },
          { version: "v1.7", date: "2024-03-12", editor: "Justice Sarah Mitchell", changes: "Updated formatting and citations" },
          { version: "v1.6", date: "2024-03-08", editor: "Dr. Robert Chen", changes: "Initial comprehensive draft" }
        ]
      },
      'file-3': {
        id: 'file-3',
        title: "traditional-law-integration", // Matches tree: 'traditional-law-integration v2.1'
        version: "v2.1",
        description: "Framework for integrating traditional Aboriginal law concepts into contemporary sentencing practices.",
        chapterTitle: "Cultural Considerations in Sentencing",
        size: "0.8 MB",
        fileType: "docx",
        lastModified: "2024-03-10T16:45:00Z",
        createdDate: "2024-02-20T09:00:00Z",
        author: "Prof. Lisa Anderson",
        lastEditor: "Prof. Lisa Anderson",
        wordCount: 5200,
        pageCount: 12,
        status: "Draft",
        downloadCount: 15,
        versions: [
          { version: "v2.1", date: "2024-03-10", editor: "Prof. Lisa Anderson", changes: "Refined integration methodology" },
          { version: "v2.0", date: "2024-03-05", editor: "Prof. Lisa Anderson", changes: "Major structural revision" },
          { version: "v1.9", date: "2024-02-28", editor: "Justice Sarah Mitchell", changes: "Initial review and corrections" }
        ]
      },
      'file-4': {
        id: 'file-4',
        title: "evidence-aboriginal-law", // Matches tree: 'evidence-aboriginal-law v1.4'
        version: "v1.4",
        description: "Examination of evidence considerations in cases involving Aboriginal and Torres Strait Islander peoples.",
        chapterTitle: "Evidence and Aboriginal Law", // Parent chapter from tree
        size: "0.9 MB",
        fileType: "docx",
        lastModified: "2024-03-15T10:15:00Z",
        createdDate: "2024-02-15T09:00:00Z",
        author: "Dr. Robert Chen",
        lastEditor: "Dr. Robert Chen",
        wordCount: 6200,
        pageCount: 13,
        status: "In Progress",
        downloadCount: 22,
        versions: [
          { version: "v1.4", date: "2024-03-15", editor: "Dr. Robert Chen", changes: "Updated evidence handling procedures" },
          { version: "v1.3", date: "2024-03-08", editor: "Justice Sarah Mitchell", changes: "Legal precedent updates" },
          { version: "v1.2", date: "2024-02-28", editor: "Dr. Robert Chen", changes: "Initial complete draft" }
        ]
      },
      'file-5': {
        id: 'file-5',
        title: "oral-testimony-protocols", // Matches tree: 'oral-testimony-protocols v2.0'
        version: "v2.0",
        description: "Protocols for handling oral testimony and cultural evidence in Aboriginal law cases.",
        chapterTitle: "Evidence and Aboriginal Law",
        size: "0.7 MB",
        fileType: "docx",
        lastModified: "2024-03-12T14:30:00Z",
        createdDate: "2024-02-10T09:00:00Z",
        author: "Prof. Lisa Anderson",
        lastEditor: "Justice Sarah Mitchell",
        wordCount: 4800,
        pageCount: 11,
        status: "Under Review",
        downloadCount: 19,
        versions: [
          { version: "v2.0", date: "2024-03-12", editor: "Justice Sarah Mitchell", changes: "Final review and approval" },
          { version: "v1.9", date: "2024-03-05", editor: "Prof. Lisa Anderson", changes: "Incorporated feedback from legal experts" },
          { version: "v1.8", date: "2024-02-25", editor: "Prof. Lisa Anderson", changes: "Initial protocol framework" }
        ]
      }
    };
    return files[id as keyof typeof files] || files['file-1'];
  };

  const fileData = getFileData(fileId);

  const statusColors = {
    "Draft": "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400",
    "Under Review": "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400",
    "Approved": "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
    "Published": "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <FileType className="h-8 w-8 text-slate-500" />
            <h1 className="text-3xl font-bold text-foreground">{fileData.title}.{fileData.fileType}</h1>
          </div>
          <div className="flex items-start gap-3 text-sm text-muted-foreground">
            <Badge variant="secondary" className="uppercase">{fileData.fileType}</Badge>
            <Badge className={statusColors[fileData.status as keyof typeof statusColors] || statusColors["Draft"]}>
              {fileData.status}
            </Badge>
            <Badge variant="secondary">{fileData.version}</Badge>
            <span>From: {fileData.chapterTitle}</span>
            <span>{fileData.size} • {new Date(fileData.lastModified).toLocaleDateString()}</span>
          </div>
          <p className="text-muted-foreground leading-relaxed max-w-3xl">{fileData.description}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button variant="secondary">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* File Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">File Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Archive className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">File Size</p>
                <p className="font-medium">{fileData.size}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Last Modified</p>
                <p className="font-medium">{new Date(fileData.lastModified).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Created</p>
                <p className="font-medium">{new Date(fileData.createdDate).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Download className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Downloads</p>
                <p className="font-medium">{fileData.downloadCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Document Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Document Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{fileData.wordCount.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Words</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">{fileData.pageCount}</p>
                <p className="text-xs text-muted-foreground">Pages</p>
              </div>
            </div>
            <div className="pt-2">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{fileData.versions.length}</p>
                <p className="text-xs text-muted-foreground">Versions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contributors */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Contributors</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium text-sm">
                SM
              </div>
              <div>
                <p className="font-medium">{fileData.author}</p>
                <p className="text-sm text-muted-foreground">Original Author</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center text-white font-medium text-sm">
                RC
              </div>
              <div>
                <p className="font-medium">{fileData.lastEditor}</p>
                <p className="text-sm text-muted-foreground">Last Editor</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="secondary" className="justify-start">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button variant="secondary" className="justify-start">
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="secondary" className="justify-start">
              <Edit className="h-4 w-4 mr-2" />
              Edit Online
            </Button>
            <Button variant="secondary" className="justify-start">
              <Clock className="h-4 w-4 mr-2" />
              Version History
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Version History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Version History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {fileData.versions.map((versionInfo, index) => (
              <div key={versionInfo.version} className="flex items-center gap-4 p-4 rounded-lg border">
                <div className={`h-3 w-3 rounded-full ${index === 0 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <Badge variant={index === 0 ? "default" : "outline"}>
                      {versionInfo.version}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Updated {new Date(versionInfo.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="font-medium">{versionInfo.changes}</p>
                  <p className="text-sm text-muted-foreground">Edited by {versionInfo.editor}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}