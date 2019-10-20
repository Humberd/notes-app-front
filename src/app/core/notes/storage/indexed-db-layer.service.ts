import { Injectable } from '@angular/core';
import { NotesLayer } from '../notes-layer';
import { Observable } from 'rxjs';
import { Note, NoteCreate, NoteUpdate } from '../../../models/note';
import { NoteType } from '../../../views/home/_services/note-type-route-param';
import { IndexedDbAccessor } from './indexed-db-accessor';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class IndexedDbLayerService implements NotesLayer {
  private db = new IndexedDbAccessor();

  private randomId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  async connect() {
    return this.db.connect();
  }

  add(note: NoteCreate): Observable<Note> {
    return this.db.add({
      id: this.randomId(),
      tags: note.tags,
      title: note.title,
      content: note.content,
      createdAt: new Date(),
      updatedAt: new Date(),
      isDeleted: false,
      isStarred: false,
    });
  }

  forceDelete(noteId: string): Observable<void> {
    return this.db.delete(noteId);
  }

  read(noteId: string): Observable<Note> {
    return this.db.read(noteId);
  }

  readList(type: NoteType, searchQuery: string): Observable<Note[]> {
    return this.db.readAll()
      .pipe(
        map(notes => {
          switch (type) {
            case 'all':
              return notes.filter(note => !note.isDeleted);
            case 'trash':
              return notes.filter(note => note.isDeleted);
            case 'starred':
              return notes.filter(note => !note.isDeleted && note.isStarred);
            default:
              throw Error(`Note type ${type} is not supported`);
          }
        }),
        map(notes => notes.filter(note => {
          if (!searchQuery) {
            return true;
          }

          const titleLc = note.title.toLowerCase();
          const contentLc = note.content.toLowerCase();
          const searchQueryLc = searchQuery.toLowerCase();
          const tagsLc = note.tags.map(tag => tag.name.toLowerCase());

          return titleLc.includes(searchQueryLc) || contentLc.includes(searchQueryLc) || tagsLc.some(tag => tag.includes(searchQueryLc));
        })),
        map(notes => notes.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())),
      );
  }

  update(noteId: string, note: NoteUpdate): Observable<Note> {
    return this.read(noteId)
      .pipe(
        switchMap(dbNote => this.db.update({
          ...dbNote,
          tags: note.tags,
          title: note.title,
          content: note.content,
          updatedAt: new Date(),
        })),
      );
  }

  delete(noteId: string): Observable<Note> {
    return this.read(noteId)
      .pipe(
        switchMap(note => this.db.update({
          ...note,
          isDeleted: true,
          updatedAt: new Date(),
        })),
      );
  }

  undelete(noteId: string): Observable<Note> {
    return this.read(noteId)
      .pipe(
        switchMap(note => this.db.update({
          ...note,
          isDeleted: false,
          updatedAt: new Date(),
        })),
      );
  }

  star(noteId: string): Observable<Note> {
    return this.read(noteId)
      .pipe(
        switchMap(note => this.db.update({
          ...note,
          isStarred: true,
          updatedAt: new Date(),
        })),
      );
  }

  unstar(noteId: string): Observable<Note> {
    return this.read(noteId)
      .pipe(
        switchMap(note => this.db.update({
          ...note,
          isStarred: false,
          updatedAt: new Date(),
        })),
      );
  }


}
