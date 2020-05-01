import { NoteView } from '@domain/entity/note/view/note-view';

export enum ChromeInternalMessageType {
  NOTE_CREATED = 'note_created',
  NOTE_DELETED = 'note_deleted',
  AUTHORIZED = 'authorized'
}

export namespace ChromeInternalMessageBody {
  export interface NoteCreated {
    note: NoteView
  }

  export interface NoteDeleted {
    note: NoteView
  }

  // tslint:disable-next-line:no-empty-interface
  export interface Authorized {

  }
}

export type ChromeInternalMessageMapping = {
  [ChromeInternalMessageType.NOTE_CREATED]: ChromeInternalMessageBody.NoteCreated,
  [ChromeInternalMessageType.NOTE_DELETED]: ChromeInternalMessageBody.NoteDeleted,
  [ChromeInternalMessageType.AUTHORIZED]: ChromeInternalMessageBody.Authorized
}


