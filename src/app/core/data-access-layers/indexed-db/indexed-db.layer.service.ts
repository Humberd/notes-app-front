import { forkJoin, merge, Observable, of, Subject } from 'rxjs';
import { NoteType } from '../../../views/home/_services/note-type-route-param';
import { IndexedDbAccessor } from './indexed-db-accessor';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { Note } from '../../../domains/note/models/note';
import { NoteTag } from '../../../domains/note/models/note-tag';
import { Tag } from '../../../domains/tag/models/tag.model';
import { Injectable, OnDestroy } from '@angular/core';

type NoteId = string;

@Injectable({
  providedIn: 'root',
})
export class IndexedDbLayerService implements OnDestroy {
  private db = new IndexedDbAccessor();

  readonly dataChanged$ = new Subject<NoteId>();

  constructor() {
    this.db.connect();
  }

  ngOnDestroy(): void {
    this.db.disconnect();
  }

  private randomId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  private uniqueTagIds(tags: NoteTag[]): string[] {
    return [...new Set(tags.map(tag => tag.id))];
  }

  add(): Observable<Note> {
    return this.db.addNote({
      id: this.randomId(),
      tags: [],
      title: '',
      content: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      isDeleted: false,
      isStarred: false,
    })
      .pipe(
        tap(note => this.dataChanged$.next(note.id)),
      );
  }

  forceDelete(noteId: string): Observable<void> {
    return this.db.deleteNote(noteId)
      .pipe(
        tap(() => this.dataChanged$.next(noteId)),
      );
  }

  read(noteId: string): Observable<Note> {
    return this.db.readNote(noteId);
  }

  readList(type: NoteType, searchQuery: string): Observable<Note[]> {
    return this.db.readAllNotes()
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
        map(notes => notes.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())),
      );
  }

  watchNotesList(type: NoteType, searchQuery: string): Observable<Note[]> {
    return merge(
      this.readList(type, searchQuery),
      this.dataChanged$
        .pipe(
          switchMap(() => this.readList(type, searchQuery)),
        ),
    );
  }

  watchNote(noteId: string): Observable<Note> {
    return merge(
      this.read(noteId),
      this.dataChanged$
        .pipe(
          filter(noteIdChanged => noteId === noteIdChanged),
          switchMap(() => this.read(noteId)),
        ),
    );
  }

  delete(noteId: string): Observable<Note> {
    return this.read(noteId)
      .pipe(
        switchMap(note => this.db.updateNote({
          ...note,
          tags: this.uniqueTagIds(note.tags),
          isDeleted: true,
          updatedAt: new Date(),
        })),
        tap(() => this.dataChanged$.next(noteId)),
      );
  }

  undelete(noteId: string): Observable<Note> {
    return this.read(noteId)
      .pipe(
        switchMap(note => this.db.updateNote({
          ...note,
          tags: this.uniqueTagIds(note.tags),
          isDeleted: false,
          updatedAt: new Date(),
        })),
        tap(() => this.dataChanged$.next(noteId)),
      );
  }

  star(noteId: string): Observable<Note> {
    return this.read(noteId)
      .pipe(
        switchMap(note => this.db.updateNote({
          ...note,
          tags: this.uniqueTagIds(note.tags),
          isStarred: true,
          updatedAt: new Date(),
        })),
        tap(() => this.dataChanged$.next(noteId)),
      );
  }

  unstar(noteId: string): Observable<Note> {
    return this.read(noteId)
      .pipe(
        switchMap(note => this.db.updateNote({
          ...note,
          tags: this.uniqueTagIds(note.tags),
          isStarred: false,
          updatedAt: new Date(),
        })),
        tap(() => this.dataChanged$.next(noteId)),
      );
  }

  updateContent(noteId: string, title: string, content: string): Observable<Note> {
    return this.read(noteId)
      .pipe(
        switchMap(note => this.db.updateNote({
          ...note,
          title,
          content,
          tags: this.uniqueTagIds(note.tags),
          updatedAt: new Date(),
        })),
        tap(() => this.dataChanged$.next()),
      );
  }

  addTag(noteId: string, tagName: string): Observable<Note> {
    return this.db
      .readAllTags()
      .pipe(
        switchMap(allTags => {
          const existingTag = allTags.find(tag => tag.name === tagName);
          if (existingTag) {
            return of(existingTag);
          }

          return this.db.addTag({
            id: this.randomId(),
            name: tagName,
          });
        }),
        switchMap(tag =>
          this.read(noteId)
            .pipe(
              switchMap(note =>
                this.db.updateNote({
                  ...note,
                  tags: [...this.uniqueTagIds(note.tags), tag.id],
                  updatedAt: new Date(),
                }),
              ),
            ),
        ),
        tap(() => this.dataChanged$.next(noteId)),
      );
  }

  removeTag(noteId: string, tagName: string): Observable<Note> {
    return this.read(noteId)
      .pipe(
        switchMap(note => {
          const newTags = note.tags.filter(tag => tag.name !== tagName);
          return this.db.updateNote({
            ...note,
            tags: this.uniqueTagIds(newTags),
            updatedAt: new Date(),
          });
        }),
        switchMap(updatedNote => this.readTagsList()
          .pipe(
            switchMap(tags => {
              const potentialTag = tags.find(it => it.name === tagName);
              if (!potentialTag) {
                return of(tags);
              }

              if (potentialTag.notesCount !== 0) {
                return of(tags);
              }

              return this.db.removeTag(potentialTag.id);
            }),
            map(() => updatedNote),
          )),
        tap(() => this.dataChanged$.next(noteId)),
      );
  }

  duplicate(noteId: string): Observable<Note> {
    return this.read(noteId)
      .pipe(
        switchMap(baseNote => this.add()
          .pipe(
            switchMap(newNote => this.updateContent(newNote.id, baseNote.title, baseNote.content)),
            switchMap(newNote => forkJoin(...baseNote.tags.map(tag => this.addTag(newNote.id, tag.name)))
              .pipe(
                switchMap(() => this.read(newNote.id)),
              ),
            ),
          ),
        ),
        tap(newNote => this.dataChanged$.next(newNote.id)),
      );
  }

  readTagsList(): Observable<Tag[]> {
    return this.db
      .readAllTags()
      .pipe(
        switchMap(dbTags => {
          return this.readList('all', '')
            .pipe(
              map(notes => notes.reduce((acc, note) => {
                note.tags.forEach(tag => {
                  acc[tag.id] = (acc[tag.id] || 0) + 1;
                });

                return acc;
              }, {})),
              map(countedNotes => dbTags.map(it => ({
                id: it.id,
                name: it.name,
                color: it.color,
                notesCount: countedNotes[it.id] || 0,
              }))),
            );
        }),
      );
  }

  watchTagsList(): Observable<Tag[]> {
    return merge(
      this.readTagsList(),
      this.dataChanged$
        .pipe(
          switchMap(() => this.readTagsList()),
        ),
    );
  }

}
