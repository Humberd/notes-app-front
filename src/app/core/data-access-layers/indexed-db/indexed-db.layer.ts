import { DataAccessLayer } from '../data-access-layer';
import { Observable } from 'rxjs';
import { Note, NoteTag, Tag } from '../../../models/note';
import { NoteType } from '../../../views/home/_services/note-type-route-param';
import { IndexedDbAccessor } from './indexed-db-accessor';
import { map, switchMap } from 'rxjs/operators';

export class IndexedDbLayer implements DataAccessLayer {
  private db = new IndexedDbAccessor();

  private randomId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  private uniqueTags(tags: NoteTag[]): string[] {
    return [...new Set(tags.map(tag => tag.id))];
  }

  async connect() {
    return this.db.connect();
  }

  async disconnect() {
    return this.db.disconnect();
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
    });
  }

  forceDelete(noteId: string): Observable<void> {
    return this.db.deleteNote(noteId);
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
        map(notes => notes.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())),
      );
  }

  delete(noteId: string): Observable<Note> {
    return this.read(noteId)
      .pipe(
        switchMap(note => this.db.updateNote({
          ...note,
          tags: this.uniqueTags(note.tags),
          isDeleted: true,
          updatedAt: new Date(),
        })),
      );
  }

  undelete(noteId: string): Observable<Note> {
    return this.read(noteId)
      .pipe(
        switchMap(note => this.db.updateNote({
          ...note,
          tags: this.uniqueTags(note.tags),
          isDeleted: false,
          updatedAt: new Date(),
        })),
      );
  }

  star(noteId: string): Observable<Note> {
    return this.read(noteId)
      .pipe(
        switchMap(note => this.db.updateNote({
          ...note,
          tags: this.uniqueTags(note.tags),
          isStarred: true,
          updatedAt: new Date(),
        })),
      );
  }

  unstar(noteId: string): Observable<Note> {
    return this.read(noteId)
      .pipe(
        switchMap(note => this.db.updateNote({
          ...note,
          tags: this.uniqueTags(note.tags),
          isStarred: false,
          updatedAt: new Date(),
        })),
      );
  }

  updateContent(noteId: string, title: string, content: string): Observable<Note> {
    return this.read(noteId)
      .pipe(
        switchMap(note => this.db.updateNote({
          ...note,
          title,
          content,
          tags: this.uniqueTags(note.tags),
          updatedAt: new Date(),
        })),
      );
  }

  addTag(noteId: string, tagName: string): Observable<Note> {
    return this.db
      .addTag({
        id: this.randomId(),
        name: tagName,
      })
      .pipe(
        switchMap(tag =>
          this.read(noteId)
            .pipe(
              switchMap(note =>
                this.db.updateNote({
                  ...note,
                  tags: [...this.uniqueTags(note.tags), tag.id],
                  updatedAt: new Date(),
                }),
              ),
            ),
        ),
      );
  }

  removeTag(noteId: string, tagName: string): Observable<Note> {
    return this.read(noteId)
      .pipe(
        switchMap(note => {
          const newTags = note.tags.filter(tag => tag.name !== tagName);
          return this.db.updateNote({
            ...note,
            tags: this.uniqueTags(newTags),
            updatedAt: new Date(),
          });
        }),
      );
  }

  duplicate(noteId: string): Observable<Note> {
    return this.read(noteId)
      .pipe(
        switchMap(note => this.add({
            title: note.title,
            content: note.content,
            tags: note.tags,
          }),
        ),
      );
  }

  readTagsList(): Observable<Tag[]> {
    return this.readList('all', '')
      .pipe(
        map(notes => notes.reduce((acc, note) => {
          note.tags.forEach(tag => {
            acc[tag.name] = (acc[tag.name] || 0) + 1;
          });

          return acc;
        }, {})),
        map(tagsCounterObj => Object.entries(tagsCounterObj)),
        map(tagsCounterEntries => tagsCounterEntries.map(([key, value]) => ({
          name: key,
          notesCount: value,
        } as Tag))),
        map(tagsList => tagsList.sort((a, b) => b.notesCount - a.notesCount)),
      );
  }

}
