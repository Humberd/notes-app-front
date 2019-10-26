import { Injectable } from '@angular/core';
import { DataAccessLayer } from './data-access-layer';
import { Note, NoteCreate, NoteUpdate, Tag } from '../../models/note';
import { Observable } from 'rxjs';
import { IndexedDbLayerService } from './indexed-db/indexed-db-layer.service';

@Injectable({
  providedIn: 'root',
})
export class DataAccessService implements DataAccessLayer {

  private impl: DataAccessLayer;

  constructor() {
    this.setImpl(new IndexedDbLayerService());
  }

  async setImpl(impl: DataAccessLayer) {
    if (this.impl) {
      await this.impl.disconnect();
    }
    this.impl = impl;

    return this.impl.connect();
  }

  async connect() {
    return this.impl.connect();
  }

  async disconnect() {
    return this.impl.disconnect();
  }

  add(note: NoteCreate): Observable<Note> {
    return this.impl.add(note);
  }

  addTag(noteId: string, tagName: string): Observable<Note> {
    return this.impl.addTag(noteId, tagName);
  }

  delete(noteId: string): Observable<Note> {
    return this.impl.delete(noteId);
  }

  duplicate(noteId: string): Observable<Note> {
    return this.impl.duplicate(noteId);
  }

  forceDelete(noteId: string): Observable<void> {
    return this.impl.forceDelete(noteId);
  }

  read(noteId: string): Observable<Note> {
    return this.impl.read(noteId);
  }

  readList(type: 'all' | 'starred' | 'trash', searchQuery: string): Observable<Note[]> {
    return this.impl.readList(type, searchQuery);
  }

  readTagsList(): Observable<Tag[]> {
    return this.impl.readTagsList();
  }

  removeTag(noteId: string, tagName: string): Observable<Note> {
    return this.impl.removeTag(noteId, tagName);
  }

  star(noteId: string): Observable<Note> {
    return this.impl.star(noteId);
  }

  undelete(noteId: string): Observable<Note> {
    return this.impl.undelete(noteId);
  }

  unstar(noteId: string): Observable<Note> {
    return this.impl.unstar(noteId);
  }

  update(noteId: string, note: NoteUpdate): Observable<Note> {
    return this.impl.update(noteId, note);
  }

  updateContent(noteId: string, title: string, content: string): Observable<Note> {
    return this.impl.updateContent(noteId, title, content);
  }

}
