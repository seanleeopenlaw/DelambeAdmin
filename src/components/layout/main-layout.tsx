"use client";

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PanelLeftClose, PanelLeftOpen, Eye, Globe, Edit, Upload, Book, BookOpen, Folder, Layers, FileType, FileText, AlertCircle, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import TreeNavigation from '@/components/ui/tree-navigation';
import ContentPanel from './content-panel';
import { usePublishingStore } from '@/lib/store';
import { mockTreeData } from '@/lib/mock-data';
import { dataService } from '@/lib/services/data-service';
import { cn } from '@/lib/utils';

// Constants
const ICON_BUTTON_GAP = 'mr-1'; // 4px gap between icon and text

// Icon mapping for dynamic icon rendering
const iconMap = {
  Book,
  BookOpen, 
  Folder,
  Layers,
  FileType,
  FileText,
  AlertCircle,
  Building2
};

const DynamicIcon = ({ iconName, className }: { iconName: string; className?: string }) => {
  const IconComponent = iconMap[iconName as keyof typeof iconMap] || FileText;
  return <IconComponent className={className} />;
};

export default function MainLayout() {
  const { sidebarCollapsed, toggleSidebar, setTreeData, selectedLevel, selectedNodeId, treeData, editMode, toggleEditMode } = usePublishingStore();

  // Initialize tree data on mount
  useEffect(() => {
    setTreeData(mockTreeData);
  }, [setTreeData]);

  // Get current level information for dynamic header
  const currentLevelInfo = dataService.getCurrentLevelInfo(selectedLevel, selectedNodeId);
  const levelActions = dataService.getLevelActions(selectedLevel, selectedNodeId);
  const documentStatus = currentLevelInfo.status;


  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <AnimatePresence>
        {!sidebarCollapsed && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 320, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ 
              duration: 0.3, 
              ease: [0.4, 0, 0.2, 1] 
            }}
            className="bg-card border-r border-border"
          >
            <div className="h-full w-80 flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-border/20 flex-shrink-0">
                <div className="flex items-center">
                  <img 
                    src="/logo.svg" 
                    alt="Delambre" 
                    className="h-8"
                  />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleSidebar}
                  className="h-8 w-8 p-0 transition-all duration-200 hover:scale-105 active:scale-95 hover:bg-muted"
                >
                  <PanelLeftClose className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex-1 min-h-0">
                <TreeNavigation />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-card border-b border-border">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              {sidebarCollapsed && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleSidebar}
                  className="h-8 w-8 p-0 transition-all duration-200 hover:scale-105 active:scale-95 hover:bg-muted"
                >
                  <PanelLeftOpen className="h-4 w-4" />
                </Button>
              )}
              <div className="flex items-start gap-3">
                <div className="flex flex-col gap-1.5">
                  {/* Main title with icon and status badge */}
                  <div className="flex items-center gap-2">
                    <DynamicIcon iconName={currentLevelInfo.iconName} className="h-5 w-5 text-muted-foreground" />
                    <span className="text-base font-semibold text-foreground">
                      {currentLevelInfo.title}
                    </span>
                    {currentLevelInfo.status && (
                      <Badge 
                        variant={currentLevelInfo.status === 'published' ? 'default' : 'secondary'}
                        className={cn(
                          "text-[10px] px-1.5 py-0.5 h-4 capitalize font-medium",
                          currentLevelInfo.status === 'published' 
                            ? "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800" 
                            : "bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700"
                        )}
                      >
                        {currentLevelInfo.status}
                      </Badge>
                    )}
                  </div>
                  {/* Subtitle and metadata aligned with icon */}
                  {(currentLevelInfo.subtitle || currentLevelInfo.metadata) && (
                    <div className="flex items-center gap-2">
                      <div className="w-5"></div> {/* Spacer to align with icon */}
                      <span className="text-xs text-muted-foreground leading-tight">
                        {currentLevelInfo.subtitle}
                        {currentLevelInfo.metadata && currentLevelInfo.subtitle && ' · '}
                        {currentLevelInfo.metadata}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Upload Button - Only show for draft level */}
              {(selectedLevel === 'draft' || selectedLevel === 'draft-content') && (
                <Button 
                  variant="secondary" 
                  size="sm"
                  className="transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-sm hover:bg-secondary/80"
                  onClick={() => {
                    // This will be handled by the draft view component
                    window.dispatchEvent(new CustomEvent('openUploadModal'));
                  }}
                >
                  <Upload className={`h-4 w-4 ${ICON_BUTTON_GAP}`} />
                  Upload
                </Button>
              )}
              
              {/* Edit Button - Only show for non-draft levels */}
              {selectedLevel !== 'draft' && selectedLevel !== 'draft-content' && currentLevelInfo.editLabel && (
                <Button 
                  variant={editMode ? "primary" : "secondary"} 
                  size="sm"
                  onClick={toggleEditMode}
                  className="transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-sm"
                >
                  <Edit className={`h-4 w-4 ${ICON_BUTTON_GAP}`} />
                  {editMode ? "Save" : "Edit"}
                </Button>
              )}
              
              {/* Preview Button */}
              <Button 
                variant="secondary" 
                size="sm"
                className="transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-sm"
              >
                <Eye className={`h-4 w-4 ${ICON_BUTTON_GAP}`} />
                Preview
              </Button>
              
              {/* Primary Action */}
              {levelActions.primary && (
                <Button 
                  variant={levelActions.primary.label === 'Publish Draft' ? 'primary' : levelActions.primary.variant} 
                  size="sm"
                  title={levelActions.primary.description}
                  className={cn(
                    "transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-sm",
                    levelActions.primary.label === 'Publish Draft' && "bg-blue-600 hover:bg-blue-700 text-white"
                  )}
                >
                  {(levelActions.primary.variant === 'primary' && levelActions.primary.label !== 'Publish Draft') && <Globe className={`h-4 w-4 ${ICON_BUTTON_GAP}`} />}
                  {levelActions.primary.label}
                </Button>
              )}
              
              {/* Secondary Action */}
              {levelActions.secondary && (
                <Button 
                  variant={levelActions.secondary.variant} 
                  size="sm"
                  title={levelActions.secondary.description}
                  className="transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-sm"
                >
                  {levelActions.secondary.label}
                </Button>
              )}
              
              {/* No selection state */}
              {!selectedNodeId && (
                <Button size="sm" disabled>
                  Select Item
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Content Panel */}
        <div className="flex-1 overflow-hidden pt-6">
          <ContentPanel />
        </div>
      </div>
    </div>
  );
}