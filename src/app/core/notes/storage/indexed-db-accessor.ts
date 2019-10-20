import { Note } from '../../../models/note';
import { Observable } from 'rxjs';

export class IndexedDbAccessor {
  private db: IDBDatabase;

  constructor() {
    const dbRequest = window.indexedDB.open('NotesAppDatabase', 1);
    dbRequest.onsuccess = ev => {
      this.db = dbRequest.result;
    };

    dbRequest.onerror = ev => {
      throw new Error('IndexedDb Storage cannot be opened');
    };

    dbRequest.onupgradeneeded = ev => {
      this.db = dbRequest.result;
      this.db.createObjectStore('notes', {keyPath: 'id', autoIncrement: false});
    };
  }

  delete(noteId: string): Observable<void> {
    return new Observable<void>(subscriber => {
      const tx = this.db.transaction('notes', 'readwrite');
      const store = tx.objectStore('notes');

      const request = store.delete(noteId);

      tx.onerror = ev => {
        subscriber.error(ev);
      };

      tx.oncomplete = ev => {
        subscriber.next();
        subscriber.complete();
      };
    });
  }

  read(noteId: string): Observable<Note> {
    return new Observable<Note>(subscriber => {
      const tx = this.db.transaction('notes', 'readonly');
      const store = tx.objectStore('notes');

      const request = store.get(noteId);

      tx.onerror = ev => {
        subscriber.error(ev);
      };

      tx.oncomplete = ev => {
        subscriber.next(request.result);
        subscriber.complete();
      };
    });
  }

  readAll(): Observable<Note[]> {
    return new Observable<Note[]>(subscriber => {
      const tx = this.db.transaction('notes', 'readonly');
      const store = tx.objectStore('notes');

      const request = store.getAll();

      tx.onerror = ev => {
        subscriber.error(ev);
      };

      tx.oncomplete = ev => {
        subscriber.next(request.result);
        subscriber.complete();
      };
    });
  }

  add(note: Note): Observable<Note> {
    return new Observable<Note>(subscriber => {
      const tx = this.db.transaction('notes', 'readwrite');
      const store = tx.objectStore('notes');

      const request = store.add(note);

      tx.onerror = ev => {
        subscriber.error(ev);
      };

      tx.oncomplete = ev => {
        subscriber.next({...note, id: String(request.result)});
        subscriber.complete();
      };
    });
  }

  update(note: Note): Observable<Note> {
    return new Observable<Note>(subscriber => {
      const tx = this.db.transaction('notes', 'readwrite');
      const store = tx.objectStore('notes');

      const request = store.put(note);

      tx.onerror = ev => {
        subscriber.error(ev);
      };

      tx.oncomplete = ev => {
        subscriber.next({...note, id: String(request.result)});
        subscriber.complete();
      };
    });
  }

}
