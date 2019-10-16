export interface Note {
  id: string;
  tags: Tag[];
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Tag {
  name: string;
  color?: string;
}
