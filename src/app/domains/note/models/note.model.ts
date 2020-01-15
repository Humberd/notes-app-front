import { NoteTag } from './note-tag.model';

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
