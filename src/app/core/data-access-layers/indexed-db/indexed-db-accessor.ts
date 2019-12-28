import { Note, NoteTag } from '../../../models/note';
import { Observable, OperatorFunction, ReplaySubject } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { IndexedDbNoteStructure, IndexedDbTagStructure } from './indexed-db-structure';

type ConnectionStatus = 'CONNECTED' | 'DISCONNECTED';

export class IndexedDbAccessor {
  private db$ = new ReplaySubject<IDBDatabase>(1);
  private connectionStatus: ConnectionStatus;

  connect(): Promise<any> {
    if (this.connectionStatus === 'CONNECTED') {
      console.log('IndexedDB already connected');
      return Promise.resolve();
    }

    this.connectionStatus = 'CONNECTED';


    return new Promise((resolve, reject) => {
      const dbRequest = window.indexedDB.open('NotesAppDatabase', 2);
      dbRequest.onsuccess = ev => {
        this.db$.next(dbRequest.result);
        resolve();
      };

      dbRequest.onerror = ev => {
        reject(`IndexedDb Storage cannot be opened, ${ev}`);
      };

      dbRequest.onupgradeneeded = ev => {
        const db = dbRequest.result;
        db.createObjectStore('notes', {keyPath: 'id', autoIncrement: false});
        db.createObjectStore('tags', {keyPath: 'id', autoIncrement: false});
      };
    });
  }

  disconnect(): Promise<any> {
    if (this.connectionStatus === 'DISCONNECTED') {
      console.log('IndexedDB already disconnected');
      return Promise.resolve();
    }
    this.connectionStatus = 'DISCONNECTED';

    return this.whenDb()
      .pipe(
        switchMap(db =>
          new Observable<void>(subscriber => {
            db.onclose = ev => {
              subscriber.next();
              subscriber.complete();
            };

            db.close();
          })),
      )
      .toPromise();
  }

  private whenDb(): Observable<IDBDatabase> {
    return this.db$
      .pipe(
        take(1),
      );
  }

  private toExternalNotes(): OperatorFunction<IndexedDbNoteStructure[], Note[]> {
    return switchMap(internalNotes =>
      this.readAllTags()
        .pipe(
          map(allTags => {
            // console.trace(internalNotes);
            const allTagsMap = allTags.reduce((acc, value) => {
              acc[value.id] = value;
              return acc;
            }, {});

            return internalNotes.map(internalNote => ({
              ...internalNote,
              tags: internalNote.tags.map(tagId => ({...allTagsMap[tagId]})),
            }));
          }),
        ),
    );
  }

  deleteNote(noteId: string): Observable<void> {
    return this.whenDb()
      .pipe(
        switchMap(db =>
          new Observable<void>(subscriber => {
            const tx = db.transaction('notes', 'readwrite');
            const store = tx.objectStore('notes');

            store.delete(noteId);

            tx.onerror = ev => {
              subscriber.error(ev);
            };

            tx.oncomplete = ev => {
              subscriber.next();
              subscriber.complete();
            };
          }),
        ),
      );
  }

  readNote(noteId: string): Observable<Note> {
    return this.whenDb()
      .pipe(
        switchMap(db =>
          new Observable<IndexedDbNoteStructure>(subscriber => {
            const tx = db.transaction('notes', 'readonly');
            const store = tx.objectStore('notes');

            const request = store.get(noteId);

            tx.onerror = ev => {
              subscriber.error(ev);
            };

            tx.oncomplete = ev => {
              subscriber.next(request.result);
              subscriber.complete();
            };
          })
            .pipe(
              map(internalNote => internalNote ? [internalNote] : []),
              this.toExternalNotes(),
              map(notes => notes[0]),
            ),
        ),
      );
  }

  readAllNotes(): Observable<Note[]> {
    return this.whenDb()
      .pipe(
        switchMap(db =>
          new Observable<IndexedDbNoteStructure[]>(subscriber => {
            const tx = db.transaction('notes', 'readonly');
            const store = tx.objectStore('notes');

            const request = store.getAll();

            tx.onerror = ev => {
              subscriber.error(ev);
            };

            tx.oncomplete = ev => {
              subscriber.next(request.result);
              subscriber.complete();
            };
          })
            .pipe(
              this.toExternalNotes(),
            ),
        ),
      );
  }

  addNote(note: IndexedDbNoteStructure): Observable<Note> {
    return this.whenDb()
      .pipe(
        switchMap(db =>
          new Observable<string>(subscriber => {
            const tx = db.transaction('notes', 'readwrite');
            const store = tx.objectStore('notes');

            const request = store.add(note);

            tx.onerror = ev => {
              subscriber.error(ev);
            };

            tx.oncomplete = ev => {
              subscriber.next(String(request.result));
              subscriber.complete();
            };
          })
            .pipe(
              switchMap(noteId => this.readNote(noteId)),
            ),
        ),
      );
  }

  updateNote(note: IndexedDbNoteStructure): Observable<Note> {
    return this.whenDb()
      .pipe(
        switchMap(db =>
          new Observable<string>(subscriber => {
            const tx = db.transaction('notes', 'readwrite');
            const store = tx.objectStore('notes');

            const request = store.put(note);

            tx.onerror = ev => {
              subscriber.error(ev);
            };

            tx.oncomplete = ev => {
              subscriber.next(String(request.result));
              subscriber.complete();
            };
          })
            .pipe(
              switchMap(noteId => this.readNote(noteId)),
            ),
        ),
      );
  }

  readAllTags(): Observable<NoteTag[]> {
    return this.whenDb()
      .pipe(
        switchMap(db =>
          new Observable<IndexedDbTagStructure[]>(subscriber => {
            const tx = db.transaction('tags', 'readonly');
            const store = tx.objectStore('tags');

            const request = store.getAll();

            tx.onerror = ev => {
              subscriber.error(ev);
            };

            tx.oncomplete = ev => {
              subscriber.next(request.result);
              subscriber.complete();
            };
          })
            .pipe(
              map(internalTags => internalTags),
            ),
        ),
      );
  }

  addTag(tag: IndexedDbTagStructure): Observable<NoteTag> {
    return this.whenDb()
      .pipe(
        switchMap(db =>
          new Observable<string>(subscriber => {
            const tx = db.transaction('tags', 'readwrite');
            const store = tx.objectStore('tags');

            const request = store.add(tag);

            tx.onerror = ev => {
              subscriber.error(ev);
            };

            tx.oncomplete = ev => {
              subscriber.next(String(request.result));
              subscriber.complete();
            };
          })
            .pipe(
              switchMap(tagId => this.readTag(tagId)),
            ),
        ),
      );
  }

  updateTag(tag: IndexedDbTagStructure): Observable<NoteTag> {
    return this.whenDb()
      .pipe(
        switchMap(db =>
          new Observable<string>(subscriber => {
            const tx = db.transaction('tags', 'readwrite');
            const store = tx.objectStore('tags');

            const request = store.put(tag);

            tx.onerror = ev => {
              subscriber.error(ev);
            };

            tx.oncomplete = ev => {
              subscriber.next(String(request.result));
              subscriber.complete();
            };
          })
            .pipe(
              switchMap(tagId => this.readTag(tagId)),
            ),
        ),
      );
  }

  readTag(tagId: string): Observable<NoteTag> {
    return this.whenDb()
      .pipe(
        switchMap(db =>
          new Observable<IndexedDbTagStructure>(subscriber => {
            const tx = db.transaction('tags', 'readonly');
            const store = tx.objectStore('tags');

            const request = store.get(tagId);

            tx.onerror = ev => {
              subscriber.error(ev);
            };

            tx.oncomplete = ev => {
              subscriber.next(request.result);
              subscriber.complete();
            };
          }),
        ),
      );
  }
}
