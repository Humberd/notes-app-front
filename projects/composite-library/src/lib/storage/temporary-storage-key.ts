export enum TemporaryStorageKey {
  EXTENSION_LOGIN = 'extension-login',
}

export interface TemporaryStorageValues {
  [TemporaryStorageKey.EXTENSION_LOGIN]: string,
}
