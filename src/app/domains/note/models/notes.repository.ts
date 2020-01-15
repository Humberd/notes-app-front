import { Observable } from 'rxjs';
import { Note } from './note';
import { NoteReadListRequest } from './note.read-list-request';
import { NoteUpdateRequest } from './note.update-request';

export interface NotesRepository {
  create(): Observable<Note>;

  read(noteId: string): Observable<Note>;

  readList(params: NoteReadListRequest): Observable<Note[]>;

  watchList(params: NoteReadListRequest): Observable<Note[]>;

  update(noteId: string, body: NoteUpdateRequest): Observable<Note>;

  delete(noteId: string): Observable<any>;

  forceDelete(noteId: string): Observable<any>;

  undelete(noteId: string): Observable<Note>;

  star(noteId: string): Observable<Note>;

  unstar(noteId: string): Observable<Note>;

  duplicate(noteId: string): Observable<Note>;
}
