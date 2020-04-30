import { NoteView } from '@domain/entity/note/view/note-view';

export enum ChromeMessageType {
  NOTE_CREATED = 'note_created',
  NOTE_DELETED = 'note_deleted',
  AUTHORIZED = 'authorized'
}

export namespace ChromeMessageBody {
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

export type ChromeMessageMapping = {
  [ChromeMessageType.NOTE_CREATED]: ChromeMessageBody.NoteCreated,
  [ChromeMessageType.NOTE_DELETED]: ChromeMessageBody.NoteDeleted,
  [ChromeMessageType.AUTHORIZED]: ChromeMessageBody.Authorized
}


