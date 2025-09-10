"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, Upload, Eye, Edit, Save, Plus, X, Image } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import BlurFade from '@/components/ui/blur-fade';
import { itemVariants, staggerContainer } from '@/lib/animations/variants';
import { getHierarchyColor } from '@/lib/design-tokens/colors';
import { usePublishingStore } from '@/lib/store';

interface EditionViewProps {
  nodeId: string;
}

interface Contributor {
  id: string;
  name: string;
  role: string;
}

export default function EditionView({ nodeId }: EditionViewProps) {
  const { editMode } = usePublishingStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editionData, setEditionData] = useState({
    title: 'Indigenous Justice Handbook',
    versionName: '2024 Edition',
    publicationDate: '2024-06-15',
    isbn: '978-0-123456-78-9',
    status: 'published' as 'published' | 'draft',
    coverImage: null as File | null,
    citationText: 'Indigenous Legal Institute. (2024). Indigenous Justice Handbook (2024 ed.). Academic Legal Press.',
    reviewDate: '2024-05-01'
  });

  const [contributors, setContributors] = useState<Contributor[]>([
    { id: '1', name: 'Dr. Sarah Mitchell', role: 'Author' },
    { id: '2', name: 'Prof. James Wilson', role: 'Editor' },
    { id: '3', name: 'Maria Rodriguez', role: 'Designer' },
    { id: '4', name: 'Michael Chen', role: 'Photographer' }
  ]);

  const [newContributor, setNewContributor] = useState({ name: '', role: 'Author' });

  // Sync local editing state with global edit mode
  React.useEffect(() => {
    setIsEditing(editMode);
  }, [editMode]);

  const handleSave = () => {
    console.log('Saving edition data:', { editionData, contributors });
    setIsEditing(false);
  };

  const handleFieldChange = (field: string, value: string) => {
    setEditionData(prev => ({ ...prev, [field]: value }));
  };

  const addContributor = () => {
    if (newContributor.name.trim()) {
      const contributor: Contributor = {
        id: Date.now().toString(),
        name: newContributor.name.trim(),
        role: newContributor.role
      };
      setContributors(prev => [...prev, contributor]);
      setNewContributor({ name: '', role: 'Author' });
    }
  };

  const removeContributor = (id: string) => {
    setContributors(prev => prev.filter(c => c.id !== id));
  };

  const handleCoverImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setEditionData(prev => ({ ...prev, coverImage: file }));
    }
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

          {/* Main Content */}
          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column - Basic Information */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="title">Title</Label>
                      {isEditing ? (
                        <Input
                          id="title"
                          value={editionData.title}
                          onChange={(e) => handleFieldChange('title', e.target.value)}
                        />
                      ) : (
                        <p className="mt-1 p-2 bg-muted rounded-md">{editionData.title}</p>
                      )}
                    </div>


                    <div>
                      <Label htmlFor="isbn">ISBN</Label>
                      {isEditing ? (
                        <Input
                          id="isbn"
                          value={editionData.isbn}
                          onChange={(e) => handleFieldChange('isbn', e.target.value)}
                          placeholder="978-0-123456-78-9"
                        />
                      ) : (
                        <p className="mt-1 p-2 bg-muted rounded-md">{editionData.isbn}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="status">Status</Label>
                      {isEditing ? (
                        <Select
                          value={editionData.status}
                          onValueChange={(value) => handleFieldChange('status', value)}
                        >
                          <SelectTrigger className="w-full mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="published">Published</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <p className="mt-1 p-2 bg-muted rounded-md capitalize">{editionData.status}</p>
                      )}
                    </div>


                    <div>
                      <Label htmlFor="reviewDate">Review Date</Label>
                      {isEditing ? (
                        <Input
                          id="reviewDate"
                          type="date"
                          value={editionData.reviewDate}
                          onChange={(e) => handleFieldChange('reviewDate', e.target.value)}
                        />
                      ) : (
                        <p className="mt-1 p-2 bg-muted rounded-md">
                          {new Date(editionData.reviewDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Citation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <Label htmlFor="citationText">Citation Text</Label>
                      {isEditing ? (
                        <Textarea
                          id="citationText"
                          value={editionData.citationText}
                          onChange={(e) => handleFieldChange('citationText', e.target.value)}
                          rows={3}
                          placeholder="Enter the proper citation format for this edition"
                        />
                      ) : (
                        <p className="mt-1 p-2 bg-muted rounded-md text-sm">
                          {editionData.citationText}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Cover & Contributors */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Cover Image</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {editionData.coverImage ? (
                        <div className="relative">
                          <div className="w-full h-64 bg-muted rounded-md flex items-center justify-center">
                            <Image className="h-16 w-16 text-muted-foreground" />
                            <span className="ml-2 text-muted-foreground">
                              {editionData.coverImage.name}
                            </span>
                          </div>
                          {isEditing && (
                            <Button
                              variant="secondary"
                              size="sm"
                              className="absolute top-2 right-2"
                              onClick={() => setEditionData(prev => ({ ...prev, coverImage: null }))}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ) : (
                        <div className="w-full h-64 bg-muted rounded-md flex items-center justify-center">
                          <div className="text-center">
                            <Image className="h-16 w-16 text-muted-foreground mx-auto mb-2" />
                            <p className="text-muted-foreground">No cover image uploaded</p>
                          </div>
                        </div>
                      )}
                      
                      {isEditing && (
                        <div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleCoverImageUpload}
                            className="hidden"
                            id="coverImage"
                          />
                          <Button variant="secondary" asChild>
                            <label htmlFor="coverImage" className="cursor-pointer">
                              <Upload className="h-4 w-4 mr-2" />
                              Upload Cover Image
                            </label>
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Contributors</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {contributors.map((contributor) => (
                      <div key={contributor.id} className="flex items-center justify-between p-2 border rounded-md">
                        <div>
                          <p className="font-medium">{contributor.name}</p>
                          <p className="text-sm text-muted-foreground">{contributor.role}</p>
                        </div>
                        {isEditing && (
                          <Button 
                            variant="secondary" 
                            size="sm"
                            onClick={() => removeContributor(contributor.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}

                    {isEditing && (
                      <div className="space-y-2 p-2 border-2 border-dashed rounded-md">
                        <div className="grid grid-cols-2 gap-2">
                          <Input
                            placeholder="Name"
                            value={newContributor.name}
                            onChange={(e) => setNewContributor(prev => ({ ...prev, name: e.target.value }))}
                          />
                          <Select
                            value={newContributor.role}
                            onValueChange={(value) => setNewContributor(prev => ({ ...prev, role: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Author">Author</SelectItem>
                              <SelectItem value="Editor">Editor</SelectItem>
                              <SelectItem value="Designer">Designer</SelectItem>
                              <SelectItem value="Photographer">Photographer</SelectItem>
                              <SelectItem value="Reviewer">Reviewer</SelectItem>
                              <SelectItem value="Translator">Translator</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button 
                          variant="secondary" 
                          size="sm" 
                          onClick={addContributor}
                          className="w-full"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Contributor
                        </Button>
                      </div>
                    )}
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