export interface NoteReadListRequest {
  type: 'all' | 'starred' | 'trash';
  searchQuery: string;
}
