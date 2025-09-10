export interface InfoPanel {
  id: string;
  type: 'shortDescription' | 'longDescription' | 'context' | 'faqEntry';
  title: string;
  content: string;
  footer?: string;
}

export interface InfoPanelCollection {
  shortDescription?: InfoPanel;
  longDescription?: InfoPanel;
  context: InfoPanel[];
  faqEntry: InfoPanel[];
}