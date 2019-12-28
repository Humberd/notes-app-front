export interface Note {
  id: string;
  tags: NoteTag[];
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  isStarred: boolean;
}

export interface NoteTag {
  id: string;
  name: string;
  color?: string;
}

export interface Tag {
  id: string;
  name: string;
  color?: string;
  notesCount: number;
}

