"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Building2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import EditableField from '@/components/ui/editable-field';
import BlurFade from '@/components/ui/blur-fade';
import { itemVariants, staggerContainer } from '@/lib/animations/variants';
import { getHierarchyColor } from '@/lib/design-tokens/colors';

interface PublisherViewProps {
  nodeId: string;
}

export default function PublisherView({ nodeId }: PublisherViewProps) {
  const handleFieldSave = (field: string, value: string | number) => {
    console.log(`Saving ${field}:`, value);
    // In a real app, update the store or make API call
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
          {/* Content starts directly - no duplicate header */}

          {/* Simple Info Card */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Document Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-semibold text-foreground">3</div>
                    <div className="text-sm text-muted-foreground">Editions</div>
                  </div>
                  <div>
                    <div className="text-2xl font-semibold text-foreground">5</div>
                    <div className="text-sm text-muted-foreground">Active Drafts</div>
                  </div>
                  <div>
                    <div className="text-2xl font-semibold text-foreground">12</div>
                    <div className="text-sm text-muted-foreground">DOCX Files</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </BlurFade>
    </div>
  );
}