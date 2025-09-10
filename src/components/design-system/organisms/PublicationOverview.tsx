"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, FileText, X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RichTextEditor, HTMLRenderer } from '@/components/ui/rich-text-editor';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { InfoPanel, InfoPanelCollection } from '@/types/info-panels';
import { cn } from '@/lib/utils';

interface PublicationOverviewProps {
  panels: InfoPanelCollection;
  onUpdate: (panels: InfoPanelCollection) => void;
  isEditable?: boolean;
}

export function PublicationOverview({ panels, onUpdate, isEditable = false }: PublicationOverviewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [localPanels, setLocalPanels] = useState<InfoPanelCollection>(panels);
  const [expandedFaqs, setExpandedFaqs] = useState<Set<string>>(new Set());

  // Sync local editing state with the isEditable prop (global edit mode)
  React.useEffect(() => {
    setIsEditing(isEditable);
  }, [isEditable]);

  const handleSave = () => {
    onUpdate(localPanels);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setLocalPanels(panels);
    setIsEditing(false);
  };

  const toggleFaq = (id: string) => {
    setExpandedFaqs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
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
      title: type === 'faqEntry' ? 'New Question' : 'New Section',
      content: ''
    };
    setLocalPanels(prev => ({
      ...prev,
      [type]: [...prev[type], newPanel]
    }));
  };


  return (
    <ErrorBoundary>
      <div className="space-y-8">

      {/* About This Benchbook - Top Highlight Block */}
      {localPanels.longDescription && (
        <div className="bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl p-8 border border-blue-200/30 dark:border-blue-800/30 shadow-sm">
          <div className="max-w-4xl">
            {isEditing ? (
              <div className="space-y-3">
                <Input
                  value={localPanels.longDescription.title}
                  onChange={(e) => updatePanel('longDescription', { 
                    id: localPanels.longDescription?.id, 
                    title: e.target.value 
                  })}
                  placeholder="About section title"
                  className="text-xl font-semibold"
                />
                <RichTextEditor
                  value={localPanels.longDescription.content}
                  onChange={(content) => updatePanel('longDescription', { 
                    id: localPanels.longDescription?.id, 
                    content: content 
                  })}
                  placeholder="Detailed description of this publication"
                  rows={6}
                />
                {localPanels.longDescription.footer && (
                  <Input
                    value={localPanels.longDescription.footer}
                    onChange={(e) => updatePanel('longDescription', { 
                      id: localPanels.longDescription?.id, 
                      footer: e.target.value 
                    })}
                    placeholder="Footer text (optional)"
                    className="text-sm"
                  />
                )}
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-blue-500 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                    {localPanels.longDescription.title || 'About This Benchbook'}
                  </h2>
                </div>
                <HTMLRenderer 
                  content={localPanels.longDescription.content}
                  className="text-foreground/80 leading-relaxed text-base prose prose-base dark:prose-invert max-w-none"
                />
                {localPanels.longDescription.footer && (
                  <p className="mt-6 text-sm text-blue-700/80 dark:text-blue-300/80 italic border-l-2 border-blue-300 dark:border-blue-700 pl-4">
                    {localPanels.longDescription.footer}
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Summary Section - Quote Style */}
      {localPanels.shortDescription && (
        <div className="border-l-4 border-muted-foreground/30 pl-6 py-4 bg-muted/5 rounded-r-lg">
          {isEditing ? (
            <div className="space-y-3">
              <Input
                value={localPanels.shortDescription.title}
                onChange={(e) => updatePanel('shortDescription', { 
                  id: localPanels.shortDescription?.id, 
                  title: e.target.value 
                })}
                placeholder="Summary title"
                className="text-lg font-semibold"
              />
              <RichTextEditor
                value={localPanels.shortDescription.content}
                onChange={(content) => updatePanel('shortDescription', { 
                  id: localPanels.shortDescription?.id, 
                  content: content 
                })}
                placeholder="Brief summary of this publication"
                rows={3}
              />
            </div>
          ) : (
            <>
              <h3 className="text-lg font-semibold mb-3 text-muted-foreground">
                {localPanels.shortDescription.title || 'Summary'}
              </h3>
              <blockquote className="text-base text-foreground/75 leading-relaxed italic">
                &ldquo;<HTMLRenderer content={localPanels.shortDescription.content} className="inline" />&rdquo;
              </blockquote>
              {localPanels.shortDescription.footer && (
                <p className="mt-3 text-sm text-muted-foreground/70 italic">
                  — {localPanels.shortDescription.footer}
                </p>
              )}
            </>
          )}
        </div>
      )}

      {/* Additional Information - Context Cards */}
      {localPanels.context.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">Additional Information</h3>
            {isEditing && (
              <Button variant="ghost" size="sm" onClick={() => addNewPanel('context')}>
                <Plus className="h-4 w-4 mr-1" />
                Add Section
              </Button>
            )}
          </div>
          <div className="grid gap-3 md:grid-cols-2 auto-rows-max">
            {localPanels.context.map(panel => {
              return (
                <div key={panel.id} className="relative group bg-muted/10 rounded-lg p-4 border border-border/20 h-auto min-h-0 overflow-visible" style={{ height: 'auto', maxHeight: 'none' }}>
                  {isEditing && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removePanel('context', panel.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                  <div className="space-y-2 h-auto overflow-visible" style={{ height: 'auto', maxHeight: 'none' }}>
                        {isEditing ? (
                          <>
                            <Input
                              value={panel.title}
                              onChange={(e) => updatePanel('context', { 
                                id: panel.id, 
                                title: e.target.value 
                              })}
                              placeholder="Section title"
                              className="font-medium"
                            />
                            <RichTextEditor
                              value={panel.content}
                              onChange={(content) => updatePanel('context', { 
                                id: panel.id, 
                                content: content 
                              })}
                              placeholder="Section content"
                              rows={3}
                              className="text-sm"
                            />
                          </>
                        ) : (
                          <>
                            <h4 className="text-sm font-medium text-foreground/80">{panel.title}</h4>
                            <HTMLRenderer 
                              content={panel.content}
                              className="text-sm text-muted-foreground leading-relaxed whitespace-normal break-words overflow-visible"
                            />
                            {panel.footer && (
                              <p className="text-xs text-muted-foreground/70 mt-2 whitespace-normal">
                                {panel.footer}
                              </p>
                            )}
                          </>
                        )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* FAQ Section - Conditionally Show Only When Content Exists */}
      {(localPanels.faqEntry.length > 0 || isEditing) && (
        <div className="space-y-4 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              Frequently Asked Questions
              {localPanels.faqEntry.length === 0 && !isEditing && (
                <span className="text-sm text-muted-foreground ml-2">(No questions added yet)</span>
              )}
            </h2>
            {isEditing && (
              <Button variant="ghost" size="sm" onClick={() => addNewPanel('faqEntry')}>
                <Plus className="h-4 w-4 mr-1" />
                Add Question
              </Button>
            )}
          </div>
          <div className="space-y-2">
            {localPanels.faqEntry.map(panel => (
              <div
                key={panel.id}
                className={cn(
                  "border border-border/50 rounded-lg transition-all duration-200",
                  expandedFaqs.has(panel.id) && "bg-muted/20"
                )}
              >
                {isEditing ? (
                  <div className="p-4 space-y-3">
                    <div className="flex items-start gap-2">
                      <Input
                        value={panel.title}
                        onChange={(e) => updatePanel('faqEntry', { 
                          id: panel.id, 
                          title: e.target.value 
                        })}
                        placeholder="Question"
                        className="flex-1 font-medium"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removePanel('faqEntry', panel.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                    <RichTextEditor
                      value={panel.content}
                      onChange={(content) => updatePanel('faqEntry', { 
                        id: panel.id, 
                        content: content 
                      })}
                      placeholder="Answer"
                      rows={3}
                      className="text-sm"
                    />
                  </div>
                ) : (
                  <>
                    <button
                      className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-muted/30 transition-colors"
                      onClick={() => toggleFaq(panel.id)}
                    >
                      <span className="font-medium pr-4">{panel.title}</span>
                      {expandedFaqs.has(panel.id) ? (
                        <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                      )}
                    </button>
                    {expandedFaqs.has(panel.id) && (
                      <div className="px-4 pb-3">
                        <HTMLRenderer 
                          content={panel.content}
                          className="text-sm text-muted-foreground leading-relaxed"
                        />
                        {panel.footer && (
                          <p className="text-xs text-muted-foreground/70 mt-2 italic">
                            {panel.footer}
                          </p>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!isEditing && 
       !localPanels.shortDescription && 
       !localPanels.longDescription && 
       localPanels.context.length === 0 && 
       localPanels.faqEntry.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <FileText className="h-12 w-12 mx-auto mb-3 opacity-30" />
          <p className="text-sm">No publication overview available</p>
          {isEditable && (
            <Button variant="secondary" size="sm" className="mt-3" onClick={() => setIsEditing(true)}>
              <Plus className="h-4 w-4 mr-1" />
              Add Overview Content
            </Button>
          )}
        </div>
      )}
      </div>
    </ErrorBoundary>
  );
}