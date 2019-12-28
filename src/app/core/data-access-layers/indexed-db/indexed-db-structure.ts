export interface IndexedDbNoteStructure {
  id: string;
  tags: string[];
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
  color?: string;
}
