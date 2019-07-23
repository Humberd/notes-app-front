export interface CreateNoteDto {
  title: string;
  content: string;
  tags: string[];
}

export interface NoteDto {
  id: number;
  title: string;
  content: string;
  tags: NoteTagDto[];
}

export interface NoteTagDto {
  id: string;
  displayName: string;
}
