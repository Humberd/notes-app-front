export interface Note {
  id: string;
  tags: Tag[];
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted?: boolean;
}

export type NoteCreate = Omit<Note, 'id'>;

export type NoteUpdate = Note;

export interface Tag {
  name: string;
  color?: string;
}
