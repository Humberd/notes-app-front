import { Note, NoteCreate, NoteUpdate } from '../../models/note';
import { Observable } from 'rxjs';
import { NoteType } from '../../views/home/_services/note-type-route-param';

export interface NotesLayer {
  add(note: NoteCreate): Observable<Note>;

  read(noteId: string): Observable<Note>;

  readList(type: NoteType): Observable<Note[]>;

  update(noteId: string, note: NoteUpdate): Observable<Note>;

  forceDelete(noteId: string): Observable<void>;

  star(noteId: string): Observable<Note>;

  unstar(noteId: string): Observable<Note>;

  delete(noteId: string): Observable<Note>;

  undelete(noteId: string): Observable<Note>;

}
