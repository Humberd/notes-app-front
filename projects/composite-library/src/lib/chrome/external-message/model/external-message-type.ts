export enum ChromeExternalMessageType {
  AUTHORIZED = 'notes-app:authorized'
}

export namespace ChromeExternalMessageBody {
  export interface Authorized {
    jwt: string
  }
}

export type ChromeExternalMessageMapping = {
  [ChromeExternalMessageType.AUTHORIZED]: ChromeExternalMessageBody.Authorized,
}


