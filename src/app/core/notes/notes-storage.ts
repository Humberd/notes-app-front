import { Note, NoteCreate, NoteUpdate } from '../../models/note';
import { Observable } from 'rxjs';

export interface NotesStorage {
  add(note: NoteCreate): Observable<Note>;

  read(noteId: string): Observable<Note>;

  readAll(): Observable<Note[]>;

  update(note: NoteUpdate): Observable<Note>;

  delete(noteId: string): Observable<void>;

}
