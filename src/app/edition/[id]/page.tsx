"use client";

import { useParams } from "next/navigation";
import { BookOpen, Calendar, Package, Clock, FileText, Folder } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function EditionDetailPage() {
  const params = useParams();
  const editionId = params.id as string;

  // This would normally fetch data based on editionId from mockTreeData
  const editionData = {
    id: editionId, // This should be 'edition-1' from tree navigation
    version: "2024 Edition", // Matches tree: '2024 Edition'
    year: 2024,
    format: "paperback" as const,
    releaseDate: "2024-01-15",
    workTitle: "AIAJ Aboriginal Benchbook", // Parent work title from tree
    status: "Published",
    drafts: 1, // Tree has 1 draft: 'Main Draft v3.2'
    chapters: 2, // Tree has 2 chapters under the draft
    pages: 42,
    printRun: 1500,
    description: "The 2024 edition incorporates recent High Court decisions and expanded guidance on cultural protocols in sentencing."
  };

  const formatTypes = {
    hardcover: { label: "Hardcover", color: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400" },
    paperback: { label: "Paperback", color: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400" },
    ebook: { label: "E-book", color: "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400" },
    audiobook: { label: "Audiobook", color: "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400" }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-green-600" />
            <h1 className="text-3xl font-bold text-foreground">{editionData.version}</h1>
          </div>
          <div className="flex items-start gap-4 text-sm text-muted-foreground">
            <span>{editionData.workTitle}</span>
            <Badge variant={editionData.status === "Published" ? "default" : "secondary"}>
              {editionData.status}
            </Badge>
            <Badge className={formatTypes[editionData.format].color}>
              {formatTypes[editionData.format].label}
            </Badge>
          </div>
          <p className="text-muted-foreground max-w-3xl">{editionData.description}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary">Edit Edition</Button>
          <Button>Publish Update</Button>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Edition Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Edition Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Publication Year</p>
                <p className="font-medium">{editionData.year}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Release Date</p>
                <p className="font-medium">{new Date(editionData.releaseDate).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Package className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Format</p>
                <p className="font-medium capitalize">{editionData.format}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Page Count</p>
                <p className="font-medium">{editionData.pages} pages</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Production Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Production Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">{editionData.drafts}</p>
                <p className="text-xs text-muted-foreground">Total Drafts</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">{editionData.chapters}</p>
                <p className="text-xs text-muted-foreground">Chapters</p>
              </div>
            </div>
            <div className="pt-4 border-t">
              <div className="flex items-center gap-3">
                <Package className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Print Run</p>
                  <p className="font-medium">{editionData.printRun.toLocaleString()} copies</p>
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
              <Folder className="h-4 w-4 mr-2" />
              View Drafts ({editionData.drafts})
            </Button>
            <Button variant="secondary" className="w-full justify-start">
              <FileText className="h-4 w-4 mr-2" />
              Browse Chapters ({editionData.chapters})
            </Button>
            <Button variant="secondary" className="w-full justify-start">
              <Package className="h-4 w-4 mr-2" />
              Production History
            </Button>
            <Button variant="secondary" className="w-full justify-start">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Update
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <div className="flex-1">
                <p className="font-medium">Edition published successfully</p>
                <p className="text-sm text-muted-foreground">March 15, 2024 at 2:30 PM</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
              <div className="flex-1">
                <p className="font-medium">Final draft approved by all reviewers</p>
                <p className="text-sm text-muted-foreground">March 10, 2024 at 10:15 AM</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
              <div className="h-2 w-2 rounded-full bg-orange-500"></div>
              <div className="flex-1">
                <p className="font-medium">Chapter 8 revisions completed</p>
                <p className="text-sm text-muted-foreground">March 8, 2024 at 4:45 PM</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}