"use client";

import { useParams } from "next/navigation";
import { Layers, FileText, Clock, Users, Eye, Download, Edit } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function ChapterDetailPage() {
  const params = useParams();
  const chapterId = params.id as string;

  // This would normally fetch data based on chapterId from mockTreeData
  const getChapterData = (id: string) => {
    const chapters = {
      'chapter-1': {
        id: 'chapter-1',
        title: "Cultural Considerations in Sentencing", // Matches tree title
        number: 1,
        description: "This chapter provides guidance on understanding and applying cultural considerations when determining appropriate sentences for Aboriginal and Torres Strait Islander peoples.",
        order: 1,
        draftTitle: "Main Draft v3.2", // Matches tree parent draft title
        status: "Under Review",
        wordCount: 8250,
        pageCount: 18,
        lastModified: "2024-03-18T14:30:00Z",
        files: [ // Files match tree structure
          { id: 1, name: "cultural-considerations-sentencing", version: "v2.3", size: "1.2 MB", modified: "2024-03-18" },
          { id: 2, name: "indigenous-justice-principles", version: "v1.8", size: "1.1 MB", modified: "2024-03-15" },
          { id: 3, name: "traditional-law-integration", version: "v2.1", size: "0.8 MB", modified: "2024-03-10" }
        ]
      },
      'chapter-2': {
        id: 'chapter-2',
        title: "Evidence and Aboriginal Law", // Matches tree title
        number: 2,
        description: "This chapter covers the intersection of evidence law and Aboriginal customary practices in the judicial system.",
        order: 2,
        draftTitle: "Main Draft v3.2", // Matches tree parent draft title
        status: "In Progress",
        wordCount: 6750,
        pageCount: 14,
        lastModified: "2024-03-15T10:15:00Z",
        files: [ // Files match tree structure
          { id: 4, name: "evidence-aboriginal-law", version: "v1.4", size: "0.9 MB", modified: "2024-03-15" },
          { id: 5, name: "oral-testimony-protocols", version: "v2.0", size: "0.7 MB", modified: "2024-03-12" }
        ]
      }
    };
    return chapters[id as keyof typeof chapters] || chapters['chapter-1'];
  };

  const chapterData = getChapterData(chapterId);

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
            <Layers className="h-8 w-8 text-purple-600" />
            <h1 className="text-3xl font-bold text-foreground">{chapterData.title}</h1>
          </div>
          <div className="flex items-start gap-4 text-sm text-muted-foreground">
            <Badge variant="secondary">Chapter {chapterData.number}</Badge>
            <Badge className={statusColors[chapterData.status as keyof typeof statusColors] || statusColors["Draft"]}>
              {chapterData.status}
            </Badge>
            <span>From: {chapterData.draftTitle}</span>
          </div>
          <p className="text-muted-foreground leading-relaxed max-w-3xl">{chapterData.description}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary">
            <Edit className="h-4 w-4 mr-2" />
            Edit Chapter
          </Button>
          <Button>
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Chapter Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Chapter Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">{chapterData.wordCount.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Words</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{chapterData.pageCount}</p>
                <p className="text-xs text-muted-foreground">Pages</p>
              </div>
            </div>
            <div className="pt-2">
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Last Modified</p>
                  <p className="font-medium">{new Date(chapterData.lastModified).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>


        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="secondary" className="w-full justify-start">
              <FileText className="h-4 w-4 mr-2" />
              View All Files ({chapterData.files.length})
            </Button>
            <Button variant="secondary" className="w-full justify-start">
              <Download className="h-4 w-4 mr-2" />
              Export Chapter
            </Button>
            <Button variant="secondary" className="w-full justify-start">
              <Clock className="h-4 w-4 mr-2" />
              Version History
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Files Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Chapter Files</CardTitle>
            <Button size="sm">
              <FileText className="h-4 w-4 mr-2" />
              Upload File
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {chapterData.files.map((file) => (
              <div key={file.id} className="flex items-center gap-4 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                <div className="p-2 rounded bg-slate-100 dark:bg-slate-800">
                  <FileText className="h-5 w-5 text-slate-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium truncate">{file.name}</p>
                    <Badge variant="secondary" className="text-xs">{file.version}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{file.size}</span>
                    <span>Modified {file.modified}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
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