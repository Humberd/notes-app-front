import { Injectable } from '@angular/core';
import { StorageKey } from '@composite-library/lib/storage/storage-key';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly prefix = 'notes-app:';

  get(key: StorageKey): StorageInstance {
    return new StorageInstance(`${this.prefix}${key}`, localStorage);
  }
}

export class StorageInstance {
  constructor(
    private readonly key: string,
    private readonly storage: Storage,
  ) {
  }

  get() {
    return this.storage.getItem(this.key);
  }

  set(value: string) {
    return this.storage.setItem(this.key, value);
  }

  remove() {
    return this.storage.removeItem(this.key);
  }
}
