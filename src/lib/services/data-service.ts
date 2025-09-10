import type { Work, Edition, DraftContent, ContentFile, TreeNode } from '@/types';
import { mockTreeData, mockEditorialData } from '@/lib/mock-data';

/**
 * Unified data service for all publishing entities
 * Eliminates duplicate data-fetching logic across View components
 */
export class DataService {
  private static instance: DataService;
  private treeData: TreeNode[];

  private constructor(treeData: TreeNode[] = mockTreeData) {
    this.treeData = treeData;
  }

  static getInstance(treeData?: TreeNode[]): DataService {
    if (!DataService.instance) {
      DataService.instance = new DataService(treeData);
    }
    return DataService.instance;
  }

  /**
   * Generic tree traversal to find any node by ID
   */
  private findNodeById(id: string, nodes: TreeNode[] = this.treeData): TreeNode | null {
    for (const node of nodes) {
      if (node.id === id) return node;
      if (node.children) {
        const found = this.findNodeById(id, node.children);
        if (found) return found;
      }
    }
    return null;
  }

  /**
   * Get current level display information for header
   */
  getCurrentLevelInfo(selectedLevel: string, selectedNodeId: string | null): {
    title: string;
    subtitle: string;
    iconName: string; // Lucide icon name instead of emoji
    status: string;
    metadata?: string; // Additional metadata for subtext
    editLabel: string; // Edit button label
  } {
    if (!selectedNodeId) {
      return {
        title: 'Select an item',
        subtitle: 'Choose from the navigation tree',
        iconName: 'FileText',
        status: '',
        editLabel: ''
      };
    }

    const node = this.findNodeById(selectedNodeId);
    if (!node) {
      return {
        title: 'Item not found',
        subtitle: '',
        iconName: 'AlertCircle',
        status: '',
        editLabel: ''
      };
    }

    // Get parent context for hierarchy
    const parentChain = this.getParentChain(selectedNodeId);
    
    switch (selectedLevel) {
      case 'work':
        return {
          title: node.title,
          subtitle: '',
          metadata: '',
          iconName: 'Book',
          status: 'published',
          editLabel: 'Edit Overview'
        };
        
      case 'edition':
        const workParent = parentChain.find(p => p.type === 'work');
        return {
          title: node.title || '2024 Edition',
          subtitle: '',
          metadata: '',
          iconName: 'BookOpen',
          status: 'published',
          editLabel: 'Edit Edition'
        };

      case 'draft':
        const editionForDraft = parentChain.find(p => p.type === 'edition');
        const workForDraft = parentChain.find(p => p.type === 'work');
        return {
          title: node.title || 'Main Draft v3.2',
          subtitle: 'Working draft version',
          metadata: 'Last updated Sep 3',
          iconName: 'Folder',
          status: '', // No status for draft - it's a content management folder
          editLabel: '' // No edit label for draft level - using Upload instead
        };
        
      case 'draft-content':
        const editionParent = parentChain.find(p => p.type === 'edition');
        const workGrandparent = parentChain.find(p => p.type === 'work');
        // Check if this draft is published using mock data
        const isDraftPublished = this.isDraftPublished(selectedNodeId);
        return {
          title: node.title,
          subtitle: '',
          metadata: '',
          iconName: 'Folder',
          status: isDraftPublished ? 'published' : '', // No status label for unpublished drafts
          editLabel: ''
        };
        
      case 'part':
        return {
          title: node.title,
          subtitle: 'Currently using: sentencing_v3.docx',
          metadata: '3 versions',
          iconName: 'Layers',
          status: 'under_review',
          editLabel: 'Edit Section'
        };
        
      case 'docx':
        return {
          title: node.title,
          subtitle: 'Document File',
          iconName: 'FileType',
          status: 'draft',
          editLabel: 'Edit File'
        };
        
      default:
        return {
          title: node.title,
          subtitle: '',
          iconName: 'FileText',
          status: '',
          editLabel: 'Edit'
        };
    }
  }

  /**
   * Get parent chain for hierarchy context
   */
  private getParentChain(nodeId: string): TreeNode[] {
    const chain: TreeNode[] = [];
    this.findParentChain(nodeId, this.treeData, chain);
    return chain.reverse(); // Return from root to direct parent
  }

  private findParentChain(targetId: string, nodes: TreeNode[], chain: TreeNode[]): boolean {
    for (const node of nodes) {
      if (node.id === targetId) {
        return true;
      }
      
      if (node.children) {
        chain.push(node);
        if (this.findParentChain(targetId, node.children, chain)) {
          return true;
        }
        chain.pop();
      }
    }
    return false;
  }

  /**
   * Check if draft is published based on mock data
   */
  private isDraftPublished(draftId: string): boolean {
    for (const edition of mockEditorialData) {
      const draft = edition.drafts.find(d => d.id === draftId);
      if (draft) {
        return draft.status === 'published';
      }
    }
    return false;
  }

  /**
   * Get level-specific actions and their meanings
   */
  getLevelActions(selectedLevel: string, selectedNodeId: string | null): {
    primary?: {
      label: string;
      action: string;
      description: string;
      variant: 'primary' | 'secondary' | 'ghost' | 'danger';
    };
    secondary?: {
      label: string;
      action: string;
      description: string;
      variant: 'primary' | 'secondary' | 'ghost' | 'danger';
    };
    preview: {
      label: string;
      description: string;
    };
  } {
    if (!selectedNodeId) {
      return {
        preview: { label: 'Preview', description: 'No item selected' }
      };
    }

    const currentInfo = this.getCurrentLevelInfo(selectedLevel, selectedNodeId);
    
    switch (selectedLevel) {
      case 'work':
        return {
          primary: currentInfo.status === 'published' 
            ? {
                label: 'Unpublish Work',
                action: 'unpublish_work',
                description: 'Remove entire work from public portal',
                variant: 'danger'
              }
            : {
                label: 'Publish Work',
                action: 'publish_work', 
                description: 'Make entire work available on public portal',
                variant: 'primary'
              },
          preview: { 
            label: 'Preview', 
            description: 'Preview complete work as end users will see it' 
          }
        };
        
      case 'edition':
        return {
          primary: currentInfo.status === 'published'
            ? {
                label: 'Unpublish Edition',
                action: 'unpublish_edition',
                description: 'Remove this edition from public access',
                variant: 'danger'
              }
            : {
                label: 'Publish Edition',
                action: 'publish_edition',
                description: 'Make this edition available to users',
                variant: 'primary'
              },
          preview: { 
            label: 'Preview', 
            description: 'Preview this edition formatting and content' 
          }
        };
        
      case 'draft':
        return {
          primary: {
            label: 'Promote to Edition',
            action: 'promote_draft',
            description: 'Convert draft to published edition',
            variant: 'default'
          },
          secondary: {
            label: 'Archive Draft',
            action: 'archive_draft', 
            description: 'Archive this draft version',
            variant: 'secondary'
          },
          preview: { 
            label: 'Preview', 
            description: 'Preview draft content and formatting' 
          }
        };

      case 'draft-content':
        const isDraftPublished = this.isDraftPublished(selectedNodeId);
        return {
          primary: isDraftPublished
            ? {
                label: 'Unpublish Draft',
                action: 'unpublish_draft',
                description: 'Remove draft from published state',
                variant: 'danger'
              }
            : {
                label: 'Publish Draft',
                action: 'publish_draft',
                description: 'Make draft available for publication',
                variant: 'primary'
              },
          preview: { 
            label: 'Preview', 
            description: 'Preview draft content and formatting' 
          }
        };
        
      case 'part':
        return {
          primary: currentInfo.status === 'under_review'
            ? {
                label: 'Approve Chapter',
                action: 'approve_part',
                description: 'Mark chapter as approved for publication',
                variant: 'primary'
              }
            : {
                label: 'Submit for Review',
                action: 'submit_review',
                description: 'Submit chapter for editorial review',
                variant: 'primary'
              },
          secondary: {
            label: 'Request Changes',
            action: 'request_changes',
            description: 'Send back to author with feedback',
            variant: 'secondary'
          },
          preview: { 
            label: 'Preview', 
            description: 'Preview chapter content and formatting' 
          }
        };
        
      case 'docx':
        return {
          primary: {
            label: 'Set as Current',
            action: 'set_current_version',
            description: 'Use this version for the chapter',
            variant: 'default'
          },
          preview: { 
            label: 'Preview', 
            description: 'Preview document content' 
          }
        };
        
      default:
        return {
          preview: { label: 'Preview', description: 'Preview content' }
        };
    }
  }

  /**
   * Get work data with proper fallback structure
   */
  getWorkData(id: string): Work {
    const workNode = this.findNodeById(id);
    if (workNode && workNode.type === 'work') {
      return {
        id: workNode.id,
        publisherId: 'publisher-1',
        name: workNode.title,
        code: 'AIJA_AIBB',
        title: workNode.title,
        authors: ['Justice Sarah Mitchell', 'Dr. Robert Chen', 'Prof. Lisa Anderson'],
        isbn: '978-0-987654-32-1',
        targetAudience: 'Judicial officers, Legal professionals, Court staff',
        language: 'English',
        price: 189.99,
        editions: [],
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-03-18')
      };
    }
    
    // Fallback data
    return {
      id: 'work-1',
      publisherId: 'publisher-1',
      name: 'AIAJ Aboriginal Benchbook',
      code: 'AIJA_AIBB',
      title: 'AIAJ Aboriginal Benchbook',
      authors: ['Justice Sarah Mitchell', 'Dr. Robert Chen', 'Prof. Lisa Anderson'],
      isbn: '978-0-987654-32-1',
      targetAudience: 'Judicial officers, Legal professionals, Court staff',
      language: 'English',
      price: 189.99,
      editions: [],
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-03-18')
    };
  }

  /**
   * Get edition data with parent work context
   */
  getEditionData(id: string): Edition & { workTitle: string; workId: string; drafts: number } {
    for (const work of this.treeData) {
      if (work.children) {
        const editionNode = work.children.find(edition => edition.id === id);
        if (editionNode) {
          return {
            id: editionNode.id,
            workId: work.id,
            workTitle: work.title,
            version: editionNode.title,
            title: editionNode.title,
            releaseDate: new Date('2024-01-15'),
            format: 'paperback' as const,
            drafts: editionNode.children ? editionNode.children.length : 0,
            draftContents: [],
            createdAt: new Date('2024-01-01'),
            updatedAt: new Date('2024-03-18')
          };
        }
      }
    }
    
    // Fallback
    return {
      id: 'edition-1',
      workId: 'work-1',
      workTitle: 'AIAJ Aboriginal Benchbook',
      version: '2024 Edition',
      title: '2024 Edition',
      releaseDate: new Date('2024-01-15'),
      format: 'paperback' as const,
      drafts: 1,
      draftContents: [],
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-03-18')
    };
  }

  /**
   * Get chapter data with full context chain
   */
  getChapterData(id: string): DraftContent & { files: any[] } {
    for (const work of this.treeData) {
      if (work.children) {
        for (const edition of work.children) {
          if (edition.children) {
            for (const draft of edition.children) {
              if (draft.children) {
                const chapterNode = draft.children.find(chapter => chapter.id === id);
                if (chapterNode) {
                  const files = chapterNode.children ? chapterNode.children.map((file, index) => {
                    const versionMatch = file.title.match(/v(\d+\.\d+)$/);
                    return {
                      id: index + 1,
                      name: file.title.replace(/ v\d+\.\d+$/, ''),
                      version: versionMatch ? `v${versionMatch[1]}` : 'v1.0',
                      size: index === 0 ? '1.2 MB' : index === 1 ? '1.1 MB' : '0.8 MB',
                      modified: index === 0 ? '2024-03-18' : index === 1 ? '2024-03-15' : '2024-03-10',
                      isCurrentVersion: index === 0,
                      comment: index === 0 ? 'Updated examples and fixed typos' : 'Previous version'
                    };
                  }) : [];
                  
                  return {
                    id: chapterNode.id,
                    editionId: edition.id,
                    version: 1,
                    partType: 'chapter' as const,
                    position: chapterNode.id === 'chapter-1' ? 1 : 2,
                    description: 'Chapter content',
                    title: chapterNode.title,
                    content: 'Chapter content placeholder',
                    wordCount: 8250,
                    progress: 75,
                    reviewers: ['Justice Sarah Mitchell'],
                    editor: 'Justice Sarah Mitchell',
                    deadline: new Date('2024-04-15'),
                    files: [],
                    createdAt: new Date('2024-01-01'),
                    updatedAt: new Date('2024-03-18'),
                    draftId: draft.id,
                    filesData: files
                  };
                }
              }
            }
          }
        }
      }
    }
    
    // Fallback
    return {
      id: 'chapter-1',
      editionId: 'edition-1',
      version: 1,
      partType: 'chapter' as const,
      position: 1,
      description: 'Chapter content',
      title: 'Chapter 1 - Cultural Considerations in Sentencing',
      content: 'Chapter content placeholder',
      wordCount: 8250,
      progress: 75,
      reviewers: ['Justice Sarah Mitchell'],
      editor: 'Justice Sarah Mitchell',
      deadline: new Date('2024-04-15'),
      files: [],
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-03-18'),
      draftId: 'draft-1',
      filesData: []
    };
  }

  /**
   * Get file data with chapter context
   */
  getFileData(id: string): ContentFile & { chapterTitle: string } {
    // Implementation similar to above pattern
    return {
      id: id,
      draftContentId: 'chapter-1',
      chapterTitle: 'Chapter 1 - Cultural Considerations',
      name: 'cultural-considerations-sentencing.docx',
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      size: 2048576,
      version: 'v3.2',
      versionComment: 'Updated examples and fixed typos',
      isCurrentVersion: true,
      uploadedAt: new Date('2024-03-18')
    };
  }
}

// Export singleton instance
export const dataService = DataService.getInstance();