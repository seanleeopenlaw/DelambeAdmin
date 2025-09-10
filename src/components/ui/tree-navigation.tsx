"use client";

import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Plus, MoreHorizontal, Building2, Book, FileText, Edit3, FileEdit, File, Trash2, BookOpen, Folder, Layers, FileIcon, Upload, Copy, FileType, CheckCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './dropdown-menu';
import { cn } from '@/lib/utils';
import { Badge } from './badge';
import { Button } from './button';
import { usePublishingStore } from '@/lib/store';
import type { TreeNode, LevelType } from '@/types';
import { mockPublishers } from '@/lib/mock-data';
import { getHierarchyColor, getStatusColor, getActionColor, type HierarchyLevel } from '@/lib/design-tokens/colors';
import { CreateWorkModal } from '@/components/modals/create-work-modal';
import { CreateEditionModal } from '@/components/modals/create-edition-modal';
import { CreateDraftModal } from '@/components/modals/create-draft-modal';
import { UploadFileModal } from '@/components/modals/upload-file-modal';
import { mockEditorialData } from '@/lib/mock-data';

const levelIcons: Record<LevelType, React.ComponentType<{ className?: string }>> = {
  publisher: Building2,
  work: Book,
  edition: BookOpen,
  draft: Folder,
  'draft-content': Folder,
  part: Layers,
  docx: FileType,
};

// Map LevelType to HierarchyLevel for design tokens
const levelToHierarchy: Record<LevelType, HierarchyLevel> = {
  publisher: 'publisher',
  work: 'work',
  edition: 'edition',
  draft: 'draft',
  'draft-content': 'draft',
  part: 'chapter',
  docx: 'file',
};

const getLevelColor = (type: LevelType, isSelected: boolean): string => {
  // Jira-style: minimal colors, only selected items get blue accent
  if (isSelected) return "text-blue-600 dark:text-blue-400";
  return "text-muted-foreground";
};

// Helper function to get part type based on node ID
const getPartTypeFromNodeId = (nodeId: string): string => {
  const partTypes: Record<string, string> = {
    'chapter-1': 'chapter',
    'chapter-2': 'appendix',
    'chapter-3': 'chapter',
    'chapter-4': 'chapter',
    'file-1': 'chapter',
    'file-2': 'chapter',
    'file-3': 'chapter',
    'file-4': 'appendix',
    'file-5': 'appendix',
    'file-6': 'chapter'
  };
  return partTypes[nodeId] || 'chapter';
};

// Helper function to get descriptions based on node ID
const getDescriptionFromNodeId = (nodeId: string): string => {
  const descriptions: Record<string, string> = {
    'chapter-1': 'Guidance on sentencing principles for Indigenous defendants',
    'chapter-2': 'Overview of evidentiary rules in cultural contexts',
    'chapter-3': 'Assessment tools and intervention strategies for family violence',
    'chapter-4': 'Legal frameworks and ethical considerations for AI-assisted decisions',
    'file-1': 'Guidance on sentencing principles for Indigenous defendants',
    'file-2': 'Protocols for recognizing traditional justice systems',
    'file-3': 'Case studies applying Fernando principles in practice',
    'file-4': 'Evidence standards and cultural protocols overview',
    'file-5': 'Procedures for oral testimony in cultural contexts',
    'file-6': 'Risk assessment methodologies and safety planning processes'
  };
  return descriptions[nodeId] || '';
};

// Helper function to get part type emoji
const getPartTypeEmoji = (partType: string): string => {
  const emojis: Record<string, string> = {
    chapter: '📄',
    appendix: '📋',
    frontmatter: '🏷️',
    preface: '📝',
    introduction: '🎯',
    bibliography: '📚',
    index: '🔍',
    glossary: '📖',
    conclusion: '🏁'
  };
  return emojis[partType] || '📄';
};

// Helper function to check if a draft is published
const isPublishedDraft = (draftId: string): boolean => {
  for (const edition of mockEditorialData) {
    const draft = edition.drafts.find(d => d.id === draftId);
    if (draft) {
      return draft.status === 'published';
    }
  }
  return false;
};

interface TreeNodeComponentProps {
  node: TreeNode;
  level: number;
  onNodeClick: (node: TreeNode) => void;
  onToggleExpand: (nodeId: string) => void;
  onAddChild: (parentId: string, type: LevelType) => void;
  setActiveModal: (modal: LevelType | null) => void;
}

function TreeNodeComponent({ 
  node, 
  level, 
  onNodeClick, 
  onToggleExpand, 
  onAddChild,
  setActiveModal
}: TreeNodeComponentProps) {
  const { selectedNodeId } = usePublishingStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const Icon = levelIcons[node.type];
  const hasChildren = node.children && node.children.length > 0;
  const isSelected = selectedNodeId === node.id;
  
  const getChildType = (parentType: LevelType): LevelType | null => {
    const hierarchy: Record<LevelType, LevelType | null> = {
      publisher: 'work',
      work: 'edition',
      edition: 'draft-content',
      'draft-content': null, // Stop at draft level - no chapters/parts in tree
      part: null,
      docx: null,
    };
    return hierarchy[parentType];
  };

  const childType = getChildType(node.type);

  return (
    <div className="select-none">
      <div
        className={cn(
          "group flex items-center gap-2 py-1 px-2 cursor-pointer rounded-md transition-colors",
          "hover:bg-muted/50",
          isSelected && "bg-blue-50/50 dark:bg-blue-950/20 border-l-2 border-l-blue-500"
        )}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
      >
        {/* Expand/Collapse Button */}
        <Button
          variant="ghost"
          size="sm"
          className="h-4 w-4 p-0 hover:bg-transparent"
          onClick={(e) => {
            e.stopPropagation();
            onToggleExpand(node.id);
          }}
          disabled={!hasChildren}
        >
          {hasChildren ? (
            node.isExpanded ? (
              <ChevronDown className="h-3 w-3" />
            ) : (
              <ChevronRight className="h-3 w-3" />
            )
          ) : (
            <div className="h-3 w-3" />
          )}
        </Button>

        {/* Icon and Title */}
        <div
          className="flex items-center gap-2 flex-1 min-w-0"
          onClick={() => onNodeClick(node)}
        >
          <div className="relative">
            <Icon className={cn("h-4 w-4 flex-shrink-0", getLevelColor(node.type, isSelected))} />
            {node.type === 'docx' && isSelected && (
              <CheckCircle className="h-3 w-3 text-blue-600 bg-white rounded-full absolute -top-1 -right-1" />
            )}
            {/* Published status check mark */}
            {(node.type === 'draft-content' && isPublishedDraft(node.id)) && (
              <div className="absolute -top-0.5 -right-0.5 bg-green-500 rounded-full p-0.5">
                <CheckCircle className="h-2.5 w-2.5 text-white" />
              </div>
            )}
            {/* Published status check mark for editions - all editions are published by default */}
            {node.type === 'edition' && (
              <div className="absolute -top-0.5 -right-0.5 bg-green-500 rounded-full p-0.5">
                <CheckCircle className="h-2.5 w-2.5 text-white" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className={cn(
                "truncate",
                node.type === 'draft-content' && "text-sm font-semibold text-blue-700 dark:text-blue-300",
                node.type === 'part' && "text-sm font-medium",
                node.type === 'docx' && "text-xs font-normal text-muted-foreground",
                (node.type === 'work' || node.type === 'edition') && "text-sm font-medium",
                node.type === 'publisher' && "text-sm font-semibold",
                !['draft-content', 'part', 'docx', 'work', 'edition', 'publisher'].includes(node.type) && "text-sm font-medium"
              )}>{node.title}</span>
              {node.type === 'part' && (
                <Badge variant="secondary" className="text-[10px] px-1 py-0 h-4 bg-muted/70">
                  {getPartTypeEmoji(getPartTypeFromNodeId(node.id))} {getPartTypeFromNodeId(node.id)}
                </Badge>
              )}
            </div>
            {node.type === 'part' && getDescriptionFromNodeId(node.id) && (
              <p className="text-xs text-muted-foreground truncate mt-0.5">
                {getDescriptionFromNodeId(node.id)}
              </p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <DropdownMenu onOpenChange={setIsMenuOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "h-6 w-6 p-0 transition-opacity",
                  isMenuOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                )}
                onClick={(e) => e.stopPropagation()}
              >
                <MoreHorizontal className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-36 z-50">
              {childType && (
                <DropdownMenuItem 
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveModal(childType);
                  }}
                >
                  <Plus className="h-3 w-3 mr-2" />
                  Add {childType === 'docx' ? 'DOCX' : childType.charAt(0).toUpperCase() + childType.slice(1)}
                </DropdownMenuItem>
              )}
              <DropdownMenuItem 
                onClick={(e) => {
                  e.stopPropagation();
                  console.log('Duplicate:', node.title);
                }}
              >
                <Copy className="h-3 w-3 mr-2" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={(e) => {
                  e.stopPropagation();
                  console.log('Delete:', node.title);
                }}
                className={cn(getActionColor('danger').text, "focus:" + getActionColor('danger').text)}
              >
                <Trash2 className="h-3 w-3 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Children */}
      {node.isExpanded && hasChildren && (
        <div>
          {node.children?.map((child) => (
            <TreeNodeComponent
              key={child.id}
              node={child}
              level={level + 1}
              onNodeClick={onNodeClick}
              onToggleExpand={onToggleExpand}
              onAddChild={onAddChild}
              setActiveModal={setActiveModal}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface TreeNavigationProps {
  className?: string;
}

export default function TreeNavigation({ className }: TreeNavigationProps) {
  const { 
    treeData, 
    selectedNodeId,
    setSelectedNodeId,
    setSelectedLevel,
    toggleNodeExpansion,
    addNode
  } = usePublishingStore();

  const [selectedPublisher, setSelectedPublisher] = React.useState(mockPublishers[0]);
  const [activeModal, setActiveModal] = useState<LevelType | null>(null);

  const handleNodeClick = (node: TreeNode) => {
    setSelectedNodeId(node.id);
    setSelectedLevel(node.type);
  };

  const handleToggleExpand = (nodeId: string) => {
    toggleNodeExpansion(nodeId);
  };

  const handleAddChild = (parentId: string, type: LevelType) => {
    setActiveModal(type);
  };

  const handleModalSubmit = (type: LevelType, data: any) => {
    const newNode: TreeNode = {
      id: `${type}-${Date.now()}`,
      type,
      title: data.title || data.name || data.version || `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
      isExpanded: false,
    };
    
    addNode('root', newNode);
    setActiveModal(null);
  };

  return (
    <div className={cn("h-full overflow-y-auto overflow-x-visible", className)}>
      <div className="p-4 space-y-4">
        {/* Publisher Dropdown */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Publisher</label>
          <Select value={selectedPublisher} onValueChange={setSelectedPublisher}>
            <SelectTrigger className="w-full bg-secondary/80 border-border hover:bg-secondary">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {mockPublishers.map((publisher) => (
                <SelectItem key={publisher} value={publisher}>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    {publisher}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Tree Navigation */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-foreground">Documents</h2>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  size="sm" 
                  className="h-6 w-6 rounded-full p-0 bg-primary hover:bg-primary/80"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 z-50">
                <DropdownMenuItem onClick={() => setActiveModal('work')}>
                  <Book className="h-4 w-4 mr-2" />
                  Add Work
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveModal('edition')}>
                  <BookOpen className="h-4 w-4 mr-2" />
                  Add Edition
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveModal('draft')}>
                  <Folder className="h-4 w-4 mr-2" />
                  Add Draft
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveModal('docx')}>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Docx
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="space-y-1">
            {treeData.map((node) => (
              <TreeNodeComponent
                key={node.id}
                node={node}
                level={0}
                onNodeClick={handleNodeClick}
                onToggleExpand={handleToggleExpand}
                onAddChild={handleAddChild}
                setActiveModal={setActiveModal}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modal Components */}
      <CreateWorkModal
        open={activeModal === 'work'}
        onOpenChange={(open) => !open && setActiveModal(null)}
        onSubmit={(data) => handleModalSubmit('work', data)}
      />
      
      <CreateEditionModal
        open={activeModal === 'edition'}
        onOpenChange={(open) => !open && setActiveModal(null)}
        onSubmit={(data) => handleModalSubmit('edition', data)}
      />
      
      <CreateDraftModal
        open={activeModal === 'draft'}
        onOpenChange={(open) => !open && setActiveModal(null)}
        onSubmit={(data) => handleModalSubmit('draft', data)}
      />
      
      
      <UploadFileModal
        open={activeModal === 'docx'}
        onOpenChange={(open) => !open && setActiveModal(null)}
        onSubmit={(data) => handleModalSubmit('docx', data)}
      />
    </div>
  );
}