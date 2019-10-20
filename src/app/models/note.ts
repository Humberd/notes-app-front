export interface Note {
  id: string;
  tags: Tag[];
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  isStarred: boolean;
}

export interface NoteCreate {
  tags: Tag[];
  title: string;
  content: string;
}

export interface NoteUpdate {
  tags: Tag[];
  title: string;
  content: string;
}

export interface Tag {
  name: string;
  color?: string;
}
