import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from '../models/note';
import { NoteReadListRequest } from '../models/note.read-list-request';
import { NoteUpdateRequest } from '../models/note.update-request';
import { NotesRepository } from '../models/notes.repository';
import { IndexedDbLayerService } from 'domains/lib/data-access/indexed-db/indexed-db.layer.service';

@Injectable({
  providedIn: 'root',
})
export class NotesIndexedDbRepositoryService implements NotesRepository {

  constructor(private indexedDbLayer: IndexedDbLayerService) {
  }

  create(): Observable<Note> {
    return this.indexedDbLayer.add();
  }

  read(noteId: string): Observable<Note> {
    return this.indexedDbLayer.read(noteId);
  }

  watch(noteId: string): Observable<Note> {
    return this.indexedDbLayer.watchNote(noteId);
  }

  readList(params: NoteReadListRequest): Observable<Note[]> {
    return this.indexedDbLayer.readList(params.type, params.searchQuery);
  }

  watchList(params: NoteReadListRequest): Observable<Note[]> {
    return this.indexedDbLayer.watchNotesList(params.type, params.searchQuery);
  }

  update(noteId: string, body: NoteUpdateRequest): Observable<Note> {
    return this.indexedDbLayer.updateContent(noteId, body);
  }

  delete(noteId: string): Observable<any> {
    return this.indexedDbLayer.delete(noteId);
  }

  forceDelete(noteId: string): Observable<any> {
    return this.indexedDbLayer.forceDelete(noteId);
  }

  undelete(noteId: string): Observable<Note> {
    return this.indexedDbLayer.undelete(noteId);
  }

  star(noteId: string): Observable<Note> {
    return this.indexedDbLayer.star(noteId);
  }

  unstar(noteId: string): Observable<Note> {
    return this.indexedDbLayer.unstar(noteId);
  }

  duplicate(noteId: string): Observable<Note> {
    return this.indexedDbLayer.duplicate(noteId);
  }
}
