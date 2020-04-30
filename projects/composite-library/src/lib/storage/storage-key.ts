export enum StorageKey {
  USER_JWT = 'user-jwt'
}

export interface StorageValues {
  [StorageKey.USER_JWT]: string
}
