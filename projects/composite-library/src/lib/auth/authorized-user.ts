export enum AuthUserStatusType {
  NOT_INITIATED = 'not_initiated',
  LOGGED_OUT = 'logged_out',
  LOGGED_IN = 'logged_in'
}

export type AuthUserStatus = NotInitiated | LoggedIn | LoggedOut;

export interface NotInitiated {
  type: AuthUserStatusType.NOT_INITIATED
}

export interface LoggedOut {
  type: AuthUserStatusType.LOGGED_OUT
}

export interface LoggedIn {
  type: AuthUserStatusType.LOGGED_IN,
  user: AuthorizedUser
}

export interface AuthorizedUser {
  id: string,
  name: string,
  jwt: string
}
