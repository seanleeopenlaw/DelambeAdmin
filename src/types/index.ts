export type LevelType = 'publisher' | 'work' | 'edition' | 'draft' | 'draft-content' | 'part' | 'docx';

export type PartType = 'frontmatter' | 'chapter' | 'appendix' | 'bibliography' | 'index' | 'glossary' | 'preface' | 'introduction' | 'conclusion';

export interface TreeNode {
  id: string;
  type: LevelType;
  title: string;
  children?: TreeNode[];
  isExpanded?: boolean;
  metadata?: Record<string, any>;
}

export interface Publisher {
  id: string;
  name: string;
  description: string;
  establishedYear: number;
  location: string;
  works: Work[];
}

export interface Work {
  id: string;
  publisherId: string;
  name: string;
  code: string;
  editions: Edition[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Edition {
  id: string;
  workId: string;
  version: string;
  title?: string;
  authors?: string[];
  isbn?: string;
  targetAudience?: string;
  language?: string;
  price?: number;
  releaseDate?: Date;
  format?: 'hardcover' | 'paperback' | 'ebook' | 'audiobook';
  draftContents: DraftContent[];
  createdAt: Date;
  updatedAt: Date;
}

export interface DraftContent {
  id: string;
  editionId: string;
  version: number;
  partType: PartType;
  position: number;
  description: string;
  hintKey?: string; // Only for "Related" type
  releaseDate?: Date;
  sourceDocument?: {
    id: string;
    name: string;
    version: string;
  };
  generatedPdf?: {
    id: string;
    url: string;
    generatedAt: Date;
  };
  title: string;
  content: string;
  wordCount: number;
  progress: number; // 0-100
  reviewers: string[];
  editor?: string;
  deadline?: Date;
  files: ContentFile[];
  createdAt: Date;
  updatedAt: Date;
}


export interface ContentFile {
  id: string;
  draftContentId: string;
  name: string;
  type: string;
  size: number;
  version: string;
  versionComment: string;
  isCurrentVersion: boolean;
  uploadedAt: Date;
  content?: string;
}

export interface EditMode {
  isEditing: boolean;
  field?: string;
}