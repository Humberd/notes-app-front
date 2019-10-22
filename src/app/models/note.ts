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

export interface NoteCreate {
  tags: NoteTag[];
  title: string;
  content: string;
}

export interface NoteUpdate {
  tags: NoteTag[];
  title: string;
  content: string;
}

export interface NoteTag {
  name: string;
  color?: string;
}

export interface Tag {
  name: string;
  // todo: add global colors
  notesCount: number;
}
