// Parse file metadata from filename following Phil's convention
// Examples:
// - chapter_01_intro_v1.docx -> { partType: 'chapter', number: '01', title: 'Introduction', version: 'v1' }
// - appendix_b_forms_v2.pdf -> { partType: 'appendix', number: 'B', title: 'Forms', version: 'v2' }
// - foreword_v3.docx -> { partType: 'foreword', number: null, title: 'Foreword', version: 'v3' }

export interface FileMetadata {
  partType: 'chapter' | 'appendix' | 'foreword' | 'preface' | 'introduction' | 'conclusion';
  number: string | null;
  title: string;
  version: string;
  extension: string;
}

export function parseFileMetadata(filename: string): FileMetadata {
  // Remove extension and convert to lowercase for parsing
  const parts = filename.toLowerCase().split('.');
  const extension = parts.pop() || '';
  const nameWithoutExt = parts.join('.');
  
  // Parse foreword, preface, introduction, conclusion (no chapter number)
  const simplePartRegex = /^(foreword|preface|introduction|conclusion)_v(\d+)$/;
  const simpleMatch = nameWithoutExt.match(simplePartRegex);
  if (simpleMatch) {
    return {
      partType: simpleMatch[1] as FileMetadata['partType'],
      number: null,
      title: capitalize(simpleMatch[1]),
      version: `v${simpleMatch[2]}`,
      extension
    };
  }
  
  // Parse chapter format: chapter_XX_title_vY
  const chapterRegex = /^chapter_(\d{2})_([^_]+)_v(\d+)$/;
  const chapterMatch = nameWithoutExt.match(chapterRegex);
  if (chapterMatch) {
    return {
      partType: 'chapter',
      number: chapterMatch[1],
      title: titleCase(chapterMatch[2].replace(/_/g, ' ')),
      version: `v${chapterMatch[3]}`,
      extension
    };
  }
  
  // Parse appendix format: appendix_X_title_vY
  const appendixRegex = /^appendix_([a-z])_([^_]+)_v(\d+)$/;
  const appendixMatch = nameWithoutExt.match(appendixRegex);
  if (appendixMatch) {
    return {
      partType: 'appendix',
      number: appendixMatch[1].toUpperCase(),
      title: titleCase(appendixMatch[2].replace(/_/g, ' ')),
      version: `v${appendixMatch[3]}`,
      extension
    };
  }
  
  // Fallback for non-standard filenames
  return {
    partType: 'chapter',
    number: null,
    title: titleCase(nameWithoutExt.replace(/_/g, ' ')),
    version: 'v1',
    extension
  };
}

// Helper function to capitalize first letter
function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Helper function to convert to title case
function titleCase(str: string): string {
  return str.split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

// Get display title for a parsed file
export function getDisplayTitle(metadata: FileMetadata): string {
  if (metadata.number) {
    if (metadata.partType === 'chapter') {
      return `Chapter ${parseInt(metadata.number)}: ${metadata.title}`;
    } else if (metadata.partType === 'appendix') {
      return `Appendix ${metadata.number}: ${metadata.title}`;
    }
  }
  return metadata.title;
}

// Get sort key for ordering files
export function getFileSortKey(metadata: FileMetadata): string {
  const typeOrder = {
    'foreword': '00',
    'preface': '01',
    'introduction': '02',
    'chapter': '10',
    'appendix': '90',
    'conclusion': '99'
  };
  
  const typePrefix = typeOrder[metadata.partType] || '50';
  const numberPart = metadata.number ? metadata.number.padStart(3, '0') : '000';
  
  return `${typePrefix}_${numberPart}`;
}