"use client";

import React, { useState } from 'react';
import { Plus, Edit, Save, X, HelpCircle, FileText, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { InfoPanel, InfoPanelCollection } from '@/types/info-panels';

interface InfoPanelsProps {
  panels: InfoPanelCollection;
  onUpdate: (panels: InfoPanelCollection) => void;
  isEditable?: boolean;
}

export function InfoPanels({ panels, onUpdate, isEditable = false }: InfoPanelsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [localPanels, setLocalPanels] = useState<InfoPanelCollection>(panels);

  const handleSave = () => {
    onUpdate(localPanels);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setLocalPanels(panels);
    setIsEditing(false);
  };

  const updatePanel = (type: InfoPanel['type'], panelData: Partial<InfoPanel>) => {
    setLocalPanels(prev => {
      const newPanels = { ...prev };
      
      if (type === 'shortDescription' || type === 'longDescription') {
        newPanels[type] = { 
          ...(prev[type] || { id: Date.now().toString(), type, title: '', content: '' }), 
          ...panelData 
        } as InfoPanel;
      } else {
        // For context and faqEntry arrays
        const existingPanel = prev[type].find(p => p.id === panelData.id);
        if (existingPanel) {
          newPanels[type] = prev[type].map(p => 
            p.id === panelData.id ? { ...p, ...panelData } : p
          );
        } else if (panelData.title || panelData.content) {
          newPanels[type] = [...prev[type], {
            id: Date.now().toString(),
            type,
            title: '',
            content: '',
            ...panelData
          } as InfoPanel];
        }
      }
      
      return newPanels;
    });
  };

  const removePanel = (type: 'context' | 'faqEntry', id: string) => {
    setLocalPanels(prev => ({
      ...prev,
      [type]: prev[type].filter(p => p.id !== id)
    }));
  };

  const addNewPanel = (type: 'context' | 'faqEntry') => {
    const newPanel: InfoPanel = {
      id: Date.now().toString(),
      type,
      title: '',
      content: ''
    };
    setLocalPanels(prev => ({
      ...prev,
      [type]: [...prev[type], newPanel]
    }));
  };

  const renderPanel = (panel: InfoPanel, canRemove = false) => (
    <Card key={panel.id} className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              {panel.type}
            </Badge>
            {panel.type === 'faqEntry' && <HelpCircle className="h-4 w-4 text-muted-foreground" />}
            {(panel.type === 'shortDescription' || panel.type === 'longDescription') && 
              <FileText className="h-4 w-4 text-muted-foreground" />
            }
            {panel.type === 'context' && <BookOpen className="h-4 w-4 text-muted-foreground" />}
          </div>
          {isEditing && canRemove && (
            <Button 
              variant="secondary" 
              size="sm" 
              onClick={() => removePanel(panel.type as 'context' | 'faqEntry', panel.id)}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <Label>Title</Label>
          {isEditing ? (
            <Input
              value={panel.title}
              onChange={(e) => updatePanel(panel.type, { id: panel.id, title: e.target.value })}
              placeholder="Enter title"
            />
          ) : (
            <p className="mt-1 font-medium">{panel.title}</p>
          )}
        </div>
        
        <div>
          <Label>Content</Label>
          {isEditing ? (
            <Textarea
              value={panel.content}
              onChange={(e) => updatePanel(panel.type, { id: panel.id, content: e.target.value })}
              placeholder="Enter content"
              rows={4}
            />
          ) : (
            <p className="mt-1 text-sm leading-relaxed">{panel.content}</p>
          )}
        </div>
        
        {panel.footer && (
          <div>
            <Label>Footer</Label>
            {isEditing ? (
              <Input
                value={panel.footer}
                onChange={(e) => updatePanel(panel.type, { id: panel.id, footer: e.target.value })}
                placeholder="Enter footer text"
              />
            ) : (
              <p className="mt-1 text-xs text-muted-foreground">{panel.footer}</p>
            )}
          </div>
        )}
        
        {isEditing && !panel.footer && (
          <div>
            <Label>Footer (Optional)</Label>
            <Input
              placeholder="Enter footer text"
              onChange={(e) => updatePanel(panel.type, { id: panel.id, footer: e.target.value })}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Info Panels</h3>
        {isEditable && (
          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save All
                </Button>
              </>
            ) : (
              <Button variant="secondary" onClick={() => setIsEditing(true)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Panels
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Short Description */}
      {(localPanels.shortDescription || isEditing) && (
        <div>
          <h4 className="text-md font-medium mb-2">Short Description</h4>
          {localPanels.shortDescription ? (
            renderPanel(localPanels.shortDescription)
          ) : isEditing ? (
            <Card className="mb-4">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <Input
                    placeholder="Short description title"
                    onChange={(e) => updatePanel('shortDescription', { title: e.target.value })}
                  />
                  <Textarea
                    placeholder="Short description content"
                    onChange={(e) => updatePanel('shortDescription', { content: e.target.value })}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          ) : null}
        </div>
      )}

      {/* Long Description */}
      {(localPanels.longDescription || isEditing) && (
        <div>
          <h4 className="text-md font-medium mb-2">Long Description</h4>
          {localPanels.longDescription ? (
            renderPanel(localPanels.longDescription)
          ) : isEditing ? (
            <Card className="mb-4">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <Input
                    placeholder="Long description title"
                    onChange={(e) => updatePanel('longDescription', { title: e.target.value })}
                  />
                  <Textarea
                    placeholder="Long description content"
                    onChange={(e) => updatePanel('longDescription', { content: e.target.value })}
                    rows={6}
                  />
                </div>
              </CardContent>
            </Card>
          ) : null}
        </div>
      )}

      {/* Context Panels */}
      {(localPanels.context.length > 0 || isEditing) && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-md font-medium">Context Information</h4>
            {isEditing && (
              <Button variant="secondary" size="sm" onClick={() => addNewPanel('context')}>
                <Plus className="h-4 w-4 mr-2" />
                Add Context
              </Button>
            )}
          </div>
          {localPanels.context.map(panel => renderPanel(panel, true))}
        </div>
      )}

      {/* FAQ Entries */}
      {(localPanels.faqEntry.length > 0 || isEditing) && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-md font-medium">FAQ Entries</h4>
            {isEditing && (
              <Button variant="secondary" size="sm" onClick={() => addNewPanel('faqEntry')}>
                <Plus className="h-4 w-4 mr-2" />
                Add FAQ
              </Button>
            )}
          </div>
          {localPanels.faqEntry.map(panel => renderPanel(panel, true))}
        </div>
      )}

      {/* Empty state when no panels exist */}
      {!isEditing && 
       !localPanels.shortDescription && 
       !localPanels.longDescription && 
       localPanels.context.length === 0 && 
       localPanels.faqEntry.length === 0 && (
        <div className="text-center p-8 text-muted-foreground">
          <FileText className="h-16 w-16 mx-auto mb-4 opacity-50" />
          <p>No info panels configured</p>
          {isEditable && (
            <Button variant="secondary" className="mt-2" onClick={() => setIsEditing(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Info Panels
            </Button>
          )}
        </div>
      )}
    </div>
  );
}