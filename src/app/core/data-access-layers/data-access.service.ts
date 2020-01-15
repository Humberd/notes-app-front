import { Injectable } from '@angular/core';
import { DataAccessLayer } from './data-access-layer';
import { Observable } from 'rxjs';
import { Note } from '../../domains/note/models/note';
import { Tag } from '../../domains/tag/models/tag.model';

@Injectable({
  providedIn: 'root',
})
export class DataAccessService implements DataAccessLayer {

  private impl: DataAccessLayer;

  add(): Observable<Note> {
    return this.impl.add();
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

  updateContent(noteId: string, title: string, content: string): Observable<Note> {
    return this.impl.updateContent(noteId, title, content);
  }

}
