export interface IndexedDbNoteStructure {
  id: string;
  tags: string[];
  webPageUrl: string;
  title: string;
  content: string;
  readonly createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  isStarred: boolean;
}

export interface IndexedDbTagStructure {
  id: string;
  name: string;
  colorHex?: string;
}
