import { Observable } from 'rxjs';
import { NoteType } from '../../views/home/_services/note-type-route-param';
import { Note } from '../../domains/note/models/note.model';
import { Tag } from '../../domains/tag/models/tag.model';

export interface DataAccessLayer {
  connect(): Promise<any>;

  disconnect(): Promise<any>;

  add(): Observable<Note>;

  read(noteId: string): Observable<Note>;

  readList(type: NoteType, searchQuery: string): Observable<Note[]>;

  forceDelete(noteId: string): Observable<void>;

  star(noteId: string): Observable<Note>;

  unstar(noteId: string): Observable<Note>;

  delete(noteId: string): Observable<Note>;

  undelete(noteId: string): Observable<Note>;

  readTagsList(): Observable<Tag[]>;

  updateContent(noteId: string, title: string, content: string): Observable<Note>;

  addTag(noteId: string, tagName: string): Observable<Note>;

  removeTag(noteId: string, tagName: string): Observable<Note>;

  duplicate(noteId: string): Observable<Note>;

}
