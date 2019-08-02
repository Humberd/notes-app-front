export interface CreateNoteDto {
  title: string;
  content: string;
  tags: string[];
}

export interface NoteDto {
  id: number;
  createdAt: string;
  lastModifiedAt: string;
  title: string;
  content: string;
  tags: NoteTagDto[];
}

export interface NoteTagDto {
  id: string;
  displayName: string;
}
