import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NoteUpdateRequest } from '../models/note.update-request';
import { NoteReadListRequest } from '../models/note.read-list-request';
import { Note } from '../models/note';
import { NotesIndexedDbRepositoryService } from './notes-indexed-db-repository.service';

@Injectable({
  providedIn: 'root',
})
export class NotesService {

  constructor(private repository: NotesIndexedDbRepositoryService) {
  }

  create(): Observable<Note> {
    return this.repository.create();
  }

  read(noteId: string): Observable<Note> {
    return this.repository.read(noteId);
  }

  readByUrl(webPageUrl: string): Observable<Note> {
    return this.repository.readByUrl(webPageUrl);
  }

  watch(noteId: string): Observable<Note> {
    return this.repository.watch(noteId);
  }

  readList(params: NoteReadListRequest): Observable<Note[]> {
    return this.repository.readList(params);
  }

  watchList(params: NoteReadListRequest): Observable<Note[]> {
    return this.repository.watchList(params);
  }

  update(noteId: string, body: NoteUpdateRequest): Observable<Note> {
    return this.repository.update(noteId, body);
  }

  delete(noteId: string): Observable<void> {
    return this.repository.delete(noteId);
  }

  forceDelete(noteId: string): Observable<void> {
    return this.repository.forceDelete(noteId);
  }

  undelete(noteId: string): Observable<Note> {
    return this.repository.undelete(noteId);
  }

  star(noteId: string): Observable<Note> {
    return this.repository.star(noteId);
  }

  unstar(noteId: string): Observable<Note> {
    return this.repository.unstar(noteId);
  }

  duplicate(noteId: string): Observable<Note> {
    return this.repository.duplicate(noteId);
  }
}
