"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePublishingStore } from '@/lib/store';
import BlurFade from '@/components/ui/blur-fade';
import PublisherView from '@/components/levels/publisher-view';
import WorkView from '@/components/levels/work-view';
import EditionView from '@/components/levels/edition-view';
import DraftView from '@/components/levels/draft-view';
import ChapterView from '@/components/levels/chapter-view';
import PartView from '@/components/levels/part-view';
import FileView from '@/components/levels/file-view';
import { containerVariants } from '@/lib/animations/variants';

export default function ContentPanel() {
  const { selectedLevel, selectedNodeId } = usePublishingStore();

  const renderLevelView = () => {
    if (!selectedNodeId) {
      return (
        <div className="flex items-center justify-center h-full text-muted-foreground">
          <div className="text-center">
            <h3 className="text-lg font-medium mb-2">Select an item to edit</h3>
            <p className="text-sm">Choose a publisher, work, edition, draft, chapter, or file from the navigation tree.</p>
          </div>
        </div>
      );
    }

    switch (selectedLevel) {
      case 'publisher':
        return <PublisherView nodeId={selectedNodeId} />;
      case 'work':
        return <WorkView nodeId={selectedNodeId} />;
      case 'edition':
        return <EditionView nodeId={selectedNodeId} />;
      case 'draft':
        return <DraftView draftId={selectedNodeId} />;
      case 'draft-content':
        return <DraftView draftId={selectedNodeId} />;
      case 'part':
        return <PartView nodeId={selectedNodeId} />;
      case 'docx':
        return <FileView nodeId={selectedNodeId} />;
      default:
        return <div>Unknown level type</div>;
    }
  };

  return (
    <div className="h-full">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="h-full"
      >
        <BlurFade className="h-full">
          <AnimatePresence mode="wait" key={selectedNodeId}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {renderLevelView()}
            </motion.div>
          </AnimatePresence>
        </BlurFade>
      </motion.div>
    </div>
  );
}