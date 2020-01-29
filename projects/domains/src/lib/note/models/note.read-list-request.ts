import { NoteType } from 'domains/lib/note/models/note-types';

export interface NoteReadListRequest {
  type: NoteType;
  searchQuery: string;
}
