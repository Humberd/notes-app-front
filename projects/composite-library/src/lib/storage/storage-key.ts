export enum StorageKey {
  USER_JWT = 'user-jwt',
  EXPANDED_NOTE_IDS = 'expanded-note-ids'
}

export interface StorageValues {
  [StorageKey.USER_JWT]: string,
  [StorageKey.EXPANDED_NOTE_IDS]: string[]
}
