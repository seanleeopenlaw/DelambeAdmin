import type { TreeNode, Publisher, Work, DraftContent, ContentFile, PartType } from '@/types';
export type { FileVersion } from './helpers/groupFilesByChapter';

// Publishers list for dropdown
export const mockPublishers = [
  'Delambre Legal Publishers',
  'West Academic Publishing',
  'LexisNexis',
  'Thomson Reuters'
];

// Phil's structure: flat file list per draft
export interface FileVersion {
  id: string;
  filename: string;  // Changed to match Phil's convention
  uploadDate: string; // ISO string for consistency
  uploadedBy: string;
  uploadComment: string; // Changed from 'comment' to 'uploadComment'
  isLatest: boolean;
  isSelected: boolean; // Changed from 'isCurrentlySelected'
  fileSize?: number;
}

export interface Draft {
  id: string;
  name: string;
  files: FileVersion[]; // Flat list of files, not nested chapters
  status: 'published' | 'unpublished' | 'draft';
  lastModified: string;
  completionPercentage: number;
}

export interface Edition {
  id: string;
  name: string; // Changed from 'title' to 'name' to match Phil's spec
  year: number;
  drafts: Draft[];
  isExpanded: boolean;
}

// Mock data following Phil's structure
export const mockEditorialData: Edition[] = [
  {
    id: 'edition-1',
    name: '2024 Edition',
    year: 2024,
    isExpanded: true,
    drafts: [
      {
        id: 'draft-2',
        name: 'Main Draft v3.2',
        status: 'published',
        lastModified: '2024-02-22T14:25:00Z',
        completionPercentage: 85,
        files: [
          // Front Matter - Foreword - 3 versions
          {
            id: 'file-1',
            filename: 'foreword_v3.docx',
            uploadDate: '2024-02-20T11:20:00Z',
            uploadedBy: 'Chief Justice Sarah Mitchell',
            uploadComment: 'Final review incorporating editorial board feedback',
            isLatest: true,
            isSelected: true,
            fileSize: 145920,
            description: 'Introduction to Cultural Considerations in Indigenous Justice'
          },
          {
            id: 'file-2',
            filename: 'foreword_v2.docx',
            uploadDate: '2024-02-15T16:30:00Z',
            uploadedBy: 'Chief Justice Sarah Mitchell',
            uploadComment: 'Added section on 2024 legislative changes',
            isLatest: false,
            isSelected: false,
            fileSize: 142848
          },
          {
            id: 'file-2b',
            filename: 'foreword_v1.docx',
            uploadDate: '2024-02-10T09:15:00Z',
            uploadedBy: 'Editorial Team',
            uploadComment: 'Initial draft for review',
            isLatest: false,
            isSelected: false,
            fileSize: 138240
          },
          // Chapter 1 - Introduction - 4 versions
          {
            id: 'file-3',
            filename: 'chapter_01_intro_v4.docx',
            uploadDate: '2024-02-18T10:45:00Z',
            uploadedBy: 'Dr. Robert Chen',
            uploadComment: 'Integrated peer review feedback from Prof. Williams',
            isLatest: true,
            isSelected: false,
            fileSize: 287744
          },
          {
            id: 'file-4',
            filename: 'chapter_01_intro_v3.docx',
            uploadDate: '2024-02-12T13:15:00Z',
            uploadedBy: 'Dr. Robert Chen',
            uploadComment: 'Fixed citation formatting per Style Guide 2024',
            isLatest: false,
            isSelected: true,  // Currently selected version
            fileSize: 276480
          },
          {
            id: 'file-4b',
            filename: 'chapter_01_intro_v2.docx',
            uploadDate: '2024-02-08T11:30:00Z',
            uploadedBy: 'Dr. Robert Chen',
            uploadComment: 'Added historical context section (pages 3-5)',
            isLatest: false,
            isSelected: false,
            fileSize: 264192
          },
          {
            id: 'file-4c',
            filename: 'chapter_01_intro_v1.docx',
            uploadDate: '2024-02-01T09:00:00Z',
            uploadedBy: 'Dr. Robert Chen',
            uploadComment: 'Initial chapter draft',
            isLatest: false,
            isSelected: false,
            fileSize: 245760
          },
          // Chapter 2 - Cultural Considerations - 3 versions
          {
            id: 'file-5',
            filename: 'chapter_02_cultural_v3.docx',
            uploadDate: '2024-02-20T09:00:00Z',
            uploadedBy: 'Prof. Maria Rodriguez',
            uploadComment: 'Incorporated feedback from Elder Council meeting Feb 18',
            isLatest: true,
            isSelected: true,
            fileSize: 312320
          },
          {
            id: 'file-6',
            filename: 'chapter_02_cultural_v2.docx',
            uploadDate: '2024-02-14T14:30:00Z',
            uploadedBy: 'Prof. Maria Rodriguez',
            uploadComment: 'Updated case studies 3.1 and 3.2 with recent rulings',
            isLatest: false,
            isSelected: false,
            fileSize: 298496
          },
          {
            id: 'file-6b',
            filename: 'chapter_02_cultural_v1.docx',
            uploadDate: '2024-02-05T10:15:00Z',
            uploadedBy: 'Prof. Maria Rodriguez',
            uploadComment: 'First complete draft with all sections',
            isLatest: false,
            isSelected: false,
            fileSize: 285696
          },
          // Chapter 3 - Sentencing Principles - 2 versions
          {
            id: 'file-7',
            filename: 'chapter_03_sentencing_v2.docx',
            uploadDate: '2024-02-21T12:20:00Z',
            uploadedBy: 'Justice Michael Wong',
            uploadComment: 'Added R v Thompson [2024] HCA 3 to section 4.2',
            isLatest: true,
            isSelected: false,  // Latest but not selected yet
            fileSize: 345088
          },
          {
            id: 'file-8',
            filename: 'chapter_03_sentencing_v1.docx',
            uploadDate: '2024-02-16T08:45:00Z',
            uploadedBy: 'Justice Michael Wong',
            uploadComment: 'Complete rewrite following Fernando principles',
            isLatest: false,
            isSelected: true,  // Still using v1
            fileSize: 334848
          },
          // Chapter 4 - Evidence and Procedure - 3 versions
          {
            id: 'file-9',
            filename: 'chapter_04_evidence_v3.docx',
            uploadDate: '2024-02-22T11:40:00Z',
            uploadedBy: 'Dr. Jennifer Liu',
            uploadComment: 'Added Evidence Act 2024 amendments to section 2, including new provisions for digital evidence handling, updated chain of custody requirements, and comprehensive guidelines for remote witness testimony in Indigenous community contexts. This revision also incorporates feedback from three regional court administrators.',
            isLatest: true,
            isSelected: true,
            fileSize: 298496
          },
          {
            id: 'file-9b',
            filename: 'chapter_04_evidence_v2.docx',
            uploadDate: '2024-02-18T14:20:00Z',
            uploadedBy: 'Dr. Jennifer Liu',
            uploadComment: 'Corrected Table 4.1 and fixed footnote references',
            isLatest: false,
            isSelected: false,
            fileSize: 289792
          },
          {
            id: 'file-9c',
            filename: 'chapter_04_evidence_v1.docx',
            uploadDate: '2024-02-10T09:30:00Z',
            uploadedBy: 'Legal Research Team',
            uploadComment: 'Initial draft from research team',
            isLatest: false,
            isSelected: false,
            fileSize: 276480
          },
          // Appendix A - Forms and Templates - 2 versions
          {
            id: 'file-10',
            filename: 'appendix_a_forms_v2.pdf',
            uploadDate: '2024-02-22T10:15:00Z',
            uploadedBy: 'Legal Forms Committee',
            uploadComment: 'Updated Form 3A per new court filing requirements',
            isLatest: true,
            isSelected: false,  // Not selected yet, still reviewing
            fileSize: 1048576
          },
          {
            id: 'file-11',
            filename: 'appendix_a_forms_v1.pdf',
            uploadDate: '2024-02-18T13:00:00Z',
            uploadedBy: 'Legal Forms Committee',
            uploadComment: 'Complete set of forms (12 templates)',
            isLatest: false,
            isSelected: true,  // Still using v1
            fileSize: 1024000
          },
          // Appendix B - Resources and References - 4 versions
          {
            id: 'file-12',
            filename: 'appendix_b_resources_v4.pdf',
            uploadDate: '2024-02-22T14:25:00Z',
            uploadedBy: 'Research Team',
            uploadComment: 'Added accessibility guidelines and WCAG compliance notes',
            isLatest: true,
            isSelected: true,
            fileSize: 892928
          },
          {
            id: 'file-12b',
            filename: 'appendix_b_resources_v3.pdf',
            uploadDate: '2024-02-20T11:10:00Z',
            uploadedBy: 'Research Team',
            uploadComment: 'Updated contact information for all 47 organizations',
            isLatest: false,
            isSelected: false,
            fileSize: 876544
          },
          {
            id: 'file-12c',
            filename: 'appendix_b_resources_v2.pdf',
            uploadDate: '2024-02-15T15:45:00Z',
            uploadedBy: 'Research Team',
            uploadComment: 'Added new online resources section (pages 12-15)',
            isLatest: false,
            isSelected: false,
            fileSize: 854016
          },
          {
            id: 'file-12d',
            filename: 'appendix_b_resources_v1.pdf',
            uploadDate: '2024-02-08T10:00:00Z',
            uploadedBy: 'Research Team',
            uploadComment: 'Initial resource compilation',
            isLatest: false,
            isSelected: false,
            fileSize: 823296
          }
        ]
      },
      {
        id: 'draft-1',
        name: 'Older Draft v3.1',
        status: 'draft',
        lastModified: '2024-02-10T15:30:00Z',
        completionPercentage: 100,
        files: [
          // Foreword
          {
            id: 'file-13',
            filename: 'foreword_v2.docx',
            uploadDate: '2024-01-15T10:30:00Z',
            uploadedBy: 'Chief Justice Sarah Mitchell',
            uploadComment: 'Referenced new Privacy Act amendments',
            isLatest: true,
            isSelected: false,
            fileSize: 142848
          },
          {
            id: 'file-14',
            filename: 'foreword_v1.docx',
            uploadDate: '2024-01-08T14:20:00Z',
            uploadedBy: 'Chief Justice Sarah Mitchell',
            uploadComment: 'First draft outline',
            isLatest: false,
            isSelected: false,
            fileSize: 138240
          },
          // Chapter 1 - Introduction
          {
            id: 'file-15',
            filename: 'chapter_01_intro_v3.docx',
            uploadDate: '2024-01-20T09:15:00Z',
            uploadedBy: 'Dr. Robert Chen',
            uploadComment: 'Corrected citation format in sections 1.2-1.4',
            isLatest: true,
            isSelected: true,
            fileSize: 276480
          },
          {
            id: 'file-16',
            filename: 'chapter_01_intro_v2.docx',
            uploadDate: '2024-01-18T16:45:00Z',
            uploadedBy: 'Dr. Robert Chen',
            uploadComment: 'New historical overview (section 1.3)',
            isLatest: false,
            isSelected: false,
            fileSize: 264192
          },
          // Chapter 2 - Cultural Considerations
          {
            id: 'file-17',
            filename: 'chapter_02_cultural_v2.docx',
            uploadDate: '2024-01-22T11:30:00Z',
            uploadedBy: 'Prof. Maria Rodriguez',
            uploadComment: 'Incorporated community feedback and updated case studies',
            isLatest: true,
            isSelected: false,
            fileSize: 298496
          },
          {
            id: 'file-18',
            filename: 'chapter_02_cultural_v1.docx',
            uploadDate: '2024-01-12T13:20:00Z',
            uploadedBy: 'Prof. Maria Rodriguez',
            uploadComment: 'Initial draft with core principles',
            isLatest: false,
            isSelected: true,
            fileSize: 285696
          },
          // Chapter 3 - Sentencing
          {
            id: 'file-19',
            filename: 'chapter_03_sentencing_v1.docx',
            uploadDate: '2024-01-25T08:45:00Z',
            uploadedBy: 'Justice Michael Wong',
            uploadComment: 'Complete rewrite based on recent court decisions',
            isLatest: true,
            isSelected: true,
            fileSize: 334848
          },
          // Chapter 4 - Evidence
          {
            id: 'file-20',
            filename: 'chapter_04_evidence_v2.docx',
            uploadDate: '2024-01-28T15:10:00Z',
            uploadedBy: 'Dr. Jennifer Liu',
            uploadComment: 'Updated with new evidentiary standards',
            isLatest: true,
            isSelected: false,
            fileSize: 289792
          },
          {
            id: 'file-21',
            filename: 'chapter_04_evidence_v1.docx',
            uploadDate: '2024-01-20T10:30:00Z',
            uploadedBy: 'Dr. Jennifer Liu',
            uploadComment: 'Initial evidence chapter draft',
            isLatest: false,
            isSelected: true,
            fileSize: 276480
          },
          // Appendix A - Forms
          {
            id: 'file-22',
            filename: 'appendix_a_forms_v1.pdf',
            uploadDate: '2024-01-30T12:00:00Z',
            uploadedBy: 'Legal Forms Committee',
            uploadComment: 'Standard legal forms and templates',
            isLatest: true,
            isSelected: true,
            fileSize: 1024000
          },
          // Appendix B - Resources
          {
            id: 'file-23',
            filename: 'appendix_b_resources_v2.pdf',
            uploadDate: '2024-02-01T09:30:00Z',
            uploadedBy: 'Research Team',
            uploadComment: 'Added new resources and updated contact information',
            isLatest: true,
            isSelected: true,
            fileSize: 876544
          },
          {
            id: 'file-24',
            filename: 'appendix_b_resources_v1.pdf',
            uploadDate: '2024-01-28T14:15:00Z',
            uploadedBy: 'Research Team',
            uploadComment: 'Initial resource compilation',
            isLatest: false,
            isSelected: false,
            fileSize: 854016
          }
        ]
      }
    ]
  }
];

// Simplified tree data for navigation (now reflects Phil's flat file structure)
export const mockTreeData: TreeNode[] = [
  {
    id: 'work-1',
    type: 'work',
    title: 'Indigenous Justice Handbook',
    isExpanded: true,
    children: [
      {
        id: 'edition-1',
        type: 'edition',
        title: '2024 Edition',
        isExpanded: true,
        children: [
          {
            id: 'draft-2',
            type: 'draft-content',
            title: 'Main Draft v3.2',
            isExpanded: true,
            // Chapters will be dynamically generated from files
            children: []
          },
          {
            id: 'draft-1',
            type: 'draft-content',
            title: 'Older Draft v3.1',
            isExpanded: false,
            // Chapters will be dynamically generated from files
            children: []
          }
        ]
      }
    ]
  },
  {
    id: 'work-2',
    type: 'work',
    title: 'National Domestic and Family Violence Bench Book',
    isExpanded: false,
    children: [
      {
        id: 'edition-2',
        type: 'edition',
        title: '2024 Edition',
        isExpanded: false,
        children: [
          {
            id: 'draft-4',
            type: 'draft-content',
            title: 'Draft v2.8',
            isExpanded: false,
            children: []
          }
        ]
      }
    ]
  },
  {
    id: 'work-3',
    type: 'work',
    title: 'AI Decision-Making and the Courts Bench Book',
    isExpanded: false,
    children: [
      {
        id: 'edition-3',
        type: 'edition',
        title: '2024 Edition',
        isExpanded: false,
        children: [
          {
            id: 'draft-5',
            type: 'draft-content',
            title: 'Draft v1.2',
            isExpanded: false,
            children: []
          }
        ]
      }
    ]
  }
];

export const mockPublisher: Publisher = {
  id: 'publisher-1',
  name: 'Delmar Publishing House',
  description: 'A leading publisher of technical and educational books focused on modern software development.',
  establishedYear: 1998,
  location: 'San Francisco, CA',
  works: []
};

export const mockWork: Work = {
  id: 'work-1',
  publisherId: 'publisher-1',
  name: 'Modern Web Development',
  code: 'MWD-2024',
  editions: [],
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-03-20')
};

export const mockEdition: Edition = {
  id: 'edition-1',
  workId: 'work-1',
  version: '3rd Edition',
  title: 'Modern Web Development',
  authors: ['John Smith', 'Sarah Johnson'],
  isbn: '978-0-123456-78-9',
  targetAudience: 'Intermediate developers',
  language: 'English',
  price: 49.99,
  releaseDate: new Date('2024-06-15'),
  format: 'paperback',
  draftContents: [],
  createdAt: new Date('2024-01-15'),
  updatedAt: new Date('2024-03-20')
};

export const mockDraftContent: DraftContent = {
  id: 'draft-content-1',
  editionId: 'edition-1',
  version: 1,
  partType: 'chapter',
  title: 'Introduction to React',
  content: 'This chapter introduces the fundamental concepts of React...',
  wordCount: 8500,
  progress: 78,
  reviewers: ['Alice Chen', 'Bob Wilson', 'Carol Davis'],
  editor: 'Mike Thompson',
  deadline: new Date('2024-04-30'),
  order: 1,
  files: [],
  createdAt: new Date('2024-01-15'),
  updatedAt: new Date('2024-03-20')
};


export const mockContentFile: ContentFile = {
  id: 'file-1',
  draftContentId: 'draft-content-1',
  name: 'intro-react-v3.docx',
  type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  size: 2048576, // 2MB
  version: 'v3.2',
  versionComment: 'Updated examples and fixed typos',
  isCurrentVersion: true,
  uploadedAt: new Date('2024-03-18'),
  content: 'This chapter introduces the fundamental concepts of React...'
};

// Part type examples for different content types
export const partTypeExamples: Record<PartType, string> = {
  frontmatter: 'Title page, copyright, table of contents',
  preface: 'Author\'s introduction and acknowledgments',
  introduction: 'Overview and context setting',
  chapter: 'Main content chapters',
  appendix: 'Supplementary information and resources',
  bibliography: 'Citations and references',
  index: 'Alphabetical reference index',
  glossary: 'Terms and definitions',
  conclusion: 'Summary and final thoughts'
};