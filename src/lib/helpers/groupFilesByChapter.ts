import { parseFileMetadata, getDisplayTitle, getFileSortKey } from './parseFileMetadata';

export interface FileVersion {
  id: string;
  filename: string;
  uploadDate: string;
  uploadedBy: string;
  uploadComment: string;
  isLatest: boolean;
  isSelected: boolean;
  fileSize?: number;
  description?: string; // Phil's requirement: meaningful description instead of just filename
}

export interface ChapterGroup {
  id: string;
  title: string;
  partType: string; // Phil's structure: Body, Front Matter, Appendices etc
  number: string | null;
  sortKey: string;
  versions: FileVersion[];
  latestVersion?: FileVersion;
  selectedVersion?: FileVersion;
  description?: string; // Phil's requirement: user-defined description of content
  position?: number; // Phil's requirement: order within part type
}

/**
 * Groups files by their chapter/appendix based on parsed filename
 * Files with the same part type and number are grouped together as versions
 */
export function groupFilesByChapter(files: FileVersion[]): ChapterGroup[] {
  const groups = new Map<string, ChapterGroup>();
  
  files.forEach(file => {
    const metadata = parseFileMetadata(file.filename);
    const groupKey = `${metadata.partType}_${metadata.number || 'none'}`;
    
    if (!groups.has(groupKey)) {
      // Use first file's description as title, fallback to parsed title
      const firstFileDescription = file.description || getDisplayTitle(metadata);
      groups.set(groupKey, {
        id: groupKey,
        title: firstFileDescription,
        partType: metadata.partType,
        number: metadata.number,
        sortKey: getFileSortKey(metadata),
        versions: [],
        description: file.description
      });
    }
    
    const group = groups.get(groupKey)!;
    group.versions.push(file);
    
    // Track latest and selected versions
    if (file.isLatest) {
      group.latestVersion = file;
    }
    if (file.isSelected) {
      group.selectedVersion = file;
    }
  });
  
  // Sort versions within each group by upload date (newest first)
  groups.forEach(group => {
    group.versions.sort((a, b) => 
      new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
    );
  });
  
  // Convert to array and sort by part type and number
  return Array.from(groups.values()).sort((a, b) => 
    a.sortKey.localeCompare(b.sortKey)
  );
}

/**
 * Get all unique part types from a list of files
 */
export function getUniquePartTypes(files: FileVersion[]): string[] {
  const partTypes = new Set<string>();
  
  files.forEach(file => {
    const metadata = parseFileMetadata(file.filename);
    partTypes.add(metadata.partType);
  });
  
  return Array.from(partTypes);
}

/**
 * Filter files by part type
 */
export function filterFilesByPartType(files: FileVersion[], partType: string): FileVersion[] {
  return files.filter(file => {
    const metadata = parseFileMetadata(file.filename);
    return metadata.partType === partType;
  });
}

/**
 * Get version number from filename
 */
export function getVersionFromFilename(filename: string): string {
  const metadata = parseFileMetadata(filename);
  return metadata.version;
}

/**
 * Generate a display name for a file version
 */
export function getVersionDisplayName(file: FileVersion): string {
  const metadata = parseFileMetadata(file.filename);
  const date = new Date(file.uploadDate);
  const dateStr = date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  });
  
  return `${metadata.version} - ${dateStr} by ${file.uploadedBy}`;
}