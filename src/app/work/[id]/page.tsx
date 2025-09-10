"use client";

import { useParams } from "next/navigation";
import { Book, Calendar, Globe, Users, DollarSign, Hash, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function WorkDetailPage() {
  const params = useParams();
  const workId = params.id as string;

  // This would normally fetch data based on workId from mockTreeData
  const workData = {
    id: workId, // This should be 'work-1' from tree navigation
    title: "AIAJ Aboriginal Benchbook", // Matches tree: 'AIAJ Aboriginal Benchbook'
    authors: ["Justice Sarah Mitchell", "Dr. Robert Chen", "Prof. Lisa Anderson"],
    isbn: "978-0-987654-32-1",
    targetAudience: "Judicial officers, Legal professionals, Court staff",
    language: "English",
    price: 189.99,
    publisher: "Delambre Legal Publishers",
    publicationDate: "2024-01-15",
    status: "Published",
    editions: 1, // Tree has 1 edition: '2024 Edition'
    totalDrafts: 1, // Tree has 1 draft: 'Main Draft v3.2'
    totalChapters: 2, // Tree has 2 chapters: 'Cultural Considerations in Sentencing', 'Evidence and Aboriginal Law'
    description: "A comprehensive benchbook providing guidance for judicial officers when dealing with Aboriginal and Torres Strait Islander peoples in the Australian court system, incorporating cultural considerations and best practices."
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <Book className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-foreground">{workData.title}</h1>
          </div>
          <div className="flex items-start gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{workData.authors.join(", ")}</span>
            </div>
            <Badge variant={workData.status === "Published" ? "default" : "secondary"}>
              {workData.status}
            </Badge>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Hash className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">ISBN</p>
                <p className="font-medium">{workData.isbn}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Language</p>
                <p className="font-medium">{workData.language}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Target className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Target Audience</p>
                <p className="font-medium">{workData.targetAudience}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Price</p>
                <p className="font-medium">${workData.price}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Publishing Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Publishing Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Publication Date</p>
                <p className="font-medium">{new Date(workData.publicationDate).toLocaleDateString()}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Publisher</p>
              <p className="font-medium">{workData.publisher}</p>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-2">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{workData.editions}</p>
                <p className="text-xs text-muted-foreground">Editions</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">{workData.totalDrafts}</p>
                <p className="text-xs text-muted-foreground">Drafts</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">{workData.totalChapters}</p>
                <p className="text-xs text-muted-foreground">Chapters</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Description */}
        <Card className="md:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{workData.description}</p>
          </CardContent>
        </Card>
      </div>

      {/* Authors Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Authors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {workData.authors.map((author, index) => (
              <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium">
                  {author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-medium">{author}</p>
                  <p className="text-sm text-muted-foreground">Author</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}