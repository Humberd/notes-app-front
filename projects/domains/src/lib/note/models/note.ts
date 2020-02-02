import { NoteTag } from './note-tag';

export interface Note {
  id: string;
  tags: NoteTag[];
  webPageUrl: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  isStarred: boolean;
}
