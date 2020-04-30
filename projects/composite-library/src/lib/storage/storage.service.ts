import { Injectable } from '@angular/core';
import { StorageKey, StorageValues } from '@composite-library/lib/storage/storage-key';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly prefix = 'notes-app:';

  get(key: StorageKey): StorageInstance<StorageValues[typeof key]> {
    return new StorageInstance(`${this.prefix}${key}`, localStorage);
  }
}

export class StorageInstance<ValueType> {
  constructor(
    private readonly key: string,
    private readonly storage: Storage,
  ) {
  }

  get(): ValueType {
    return JSON.parse(this.storage.getItem(this.key));
  }

  set(value: ValueType) {
    return this.storage.setItem(this.key, JSON.stringify(value));
  }

  remove() {
    return this.storage.removeItem(this.key);
  }
}
