"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Book, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import EditableField from '@/components/ui/editable-field';
import BlurFade from '@/components/ui/blur-fade';
import { dataService } from '@/lib/services/data-service';
import { useFieldSave } from '@/hooks/useEntityForm';
import { itemVariants, staggerContainer } from '@/lib/animations/variants';
import { getHierarchyColor } from '@/lib/design-tokens/colors';
import { PublicationOverview } from '@/components/design-system/organisms/PublicationOverview';
import { InfoPanelCollection } from '@/types/info-panels';
import { usePublishingStore } from '@/lib/store';

interface WorkViewProps {
  nodeId: string;
}

export default function WorkView({ nodeId }: WorkViewProps) {
  const { editMode } = usePublishingStore();
  const work = dataService.getWorkData(nodeId);
  const { saveField, isSaving } = useFieldSave('work', nodeId);
  
  const [infoPanels, setInfoPanels] = React.useState<InfoPanelCollection>({
    shortDescription: {
      id: '1',
      type: 'shortDescription',
      title: '',  // Empty title - will show "Summary" as default
      content: 'A comprehensive benchbook providing essential guidance for legal professionals working with Aboriginal and Torres Strait Islander peoples.',
      footer: ''
    },
    longDescription: {
      id: '2',
      type: 'longDescription',
      title: 'About This Benchbook',
      content: 'The AIAJ Aboriginal Benchbook serves as a critical resource for judges, magistrates, and legal practitioners. It covers cultural protocols, sentencing considerations, and best practices when working with Indigenous communities. The benchbook includes practical guidance on cultural awareness, communication strategies, and legal frameworks specific to Aboriginal and Torres Strait Islander peoples.',
      footer: 'Now in its third edition with expanded coverage of family law matters'
    },
    context: [
      {
        id: '3',
        type: 'context',
        title: 'Target Audience',
        content: 'Judicial officers, magistrates, legal practitioners, court administrators, and policy makers working within Indigenous justice frameworks.',
        footer: ''
      },
      {
        id: '4',
        type: 'context',
        title: 'Legal Framework',
        content: 'Aligned with the Native Title Act 1993, Racial Discrimination Act 1975, and incorporates recent High Court decisions on cultural considerations in sentencing.',
        footer: ''
      },
      {
        id: '5',
        type: 'context',
        title: 'Author Review',
        content: '"An indispensable resource that bridges the gap between legal practice and cultural understanding." — Hon. Justice Sarah Mitchell',
        footer: 'Review from the Australian Law Journal, 2024'
      }
    ],
    faqEntry: [
      {
        id: '6',
        type: 'faqEntry',
        title: 'Who should use this benchbook?',
        content: 'This benchbook is essential for all judicial officers and legal practitioners who encounter cases involving Aboriginal and Torres Strait Islander peoples. It provides practical guidance on cultural protocols, communication strategies, and legal frameworks specific to Indigenous justice.',
        footer: ''
      },
      {
        id: '7',
        type: 'faqEntry',
        title: 'How often is this resource updated?',
        content: 'The benchbook undergoes annual reviews to incorporate new case law, legislative changes, and evolving best practices. Major editions are published every three years with comprehensive updates.',
        footer: ''
      },
      {
        id: '8',
        type: 'faqEntry',
        title: 'Is this resource available in different formats?',
        content: 'Yes, the benchbook is available as a printed hardcover, digital PDF, and through our online portal with search functionality. Court libraries also have access to the institutional subscription.',
        footer: ''
      }
    ]
  });

  const handleInfoPanelsUpdate = (updatedPanels: InfoPanelCollection) => {
    setInfoPanels(updatedPanels);
    console.log('Saving info panels:', updatedPanels);
  };


  return (
    <div className="h-full p-6 space-y-6 overflow-y-auto">
      <BlurFade>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Content starts directly - no duplicate header */}


          {/* Publication Overview */}
          <motion.div variants={itemVariants}>
            <PublicationOverview 
              panels={infoPanels}
              onUpdate={handleInfoPanelsUpdate}
              isEditable={editMode}
            />
          </motion.div>

        </motion.div>
      </BlurFade>
    </div>
  );
}