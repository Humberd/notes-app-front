export type ContentScriptResponse =
  ContentScriptSaveResponse |
  ContentScriptCancelResponse |
  ContentScriptAlreadyExistsResponse;

export enum ContentScriptResponseType {
  ALREADY_EXISTS = 'ALREADY_EXISTS',
  CANCEL = 'CANCEL',
  SAVE = 'SAVE'
}

export interface ContentScriptSaveResponse {
  type: ContentScriptResponseType.SAVE;
  content: string;
}

export interface ContentScriptCancelResponse {
  type: ContentScriptResponseType.CANCEL;
}

export interface ContentScriptAlreadyExistsResponse {
  type: ContentScriptResponseType.ALREADY_EXISTS;
}
