import { Note } from '../../../models/note';
import { Observable, ReplaySubject } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

export class IndexedDbAccessor {
  private db$ = new ReplaySubject<IDBDatabase>(1);

  async connect() {
    const dbRequest = window.indexedDB.open('NotesAppDatabase', 1);
    dbRequest.onsuccess = ev => {
      this.db$.next(dbRequest.result);
    };

    dbRequest.onerror = ev => {
      throw new Error('IndexedDb Storage cannot be opened');
    };

    dbRequest.onupgradeneeded = ev => {
      const db = dbRequest.result;
      db.createObjectStore('notes', {keyPath: 'id', autoIncrement: false});
    };
  }

  private whenDb<T>(fun: (db: IDBDatabase) => Observable<T>) {
    return this.db$
      .pipe(
        take(1),
        switchMap(db => fun(db)),
      );
  }

  delete(noteId: string): Observable<void> {
    return this.whenDb(db =>
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
      }));
  }

  read(noteId: string): Observable<Note> {
    return this.whenDb(db =>
      new Observable<Note>(subscriber => {
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
      }),
    );
  }

  readAll(): Observable<Note[]> {
    return this.whenDb(db =>
      new Observable<Note[]>(subscriber => {
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
      }),
    );
  }

  add(note: Note): Observable<Note> {
    return this.whenDb(db =>
      new Observable<Note>(subscriber => {
        const tx = db.transaction('notes', 'readwrite');
        const store = tx.objectStore('notes');

        const request = store.add(note);

        tx.onerror = ev => {
          subscriber.error(ev);
        };

        tx.oncomplete = ev => {
          subscriber.next({...note, id: String(request.result)});
          subscriber.complete();
        };
      }),
    );
  }

  update(note: Note): Observable<Note> {
    return this.whenDb(db =>
      new Observable<Note>(subscriber => {
        const tx = db.transaction('notes', 'readwrite');
        const store = tx.objectStore('notes');

        const request = store.put(note);

        tx.onerror = ev => {
          subscriber.error(ev);
        };

        tx.oncomplete = ev => {
          subscriber.next({...note, id: String(request.result)});
          subscriber.complete();
        };
      }),
    );
  }

}
