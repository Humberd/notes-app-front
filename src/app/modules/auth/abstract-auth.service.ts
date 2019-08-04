import { Destroy$ } from '@ng-boost/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

export interface AuthUser {
  id: number;
  email: string;
  jwt: string;
}

export enum AuthUserStatus {
  NOT_INITIATED = undefined,
  LOGGED_OUT = null
}

export abstract class AbstractAuthService {
  @Destroy$() private readonly destroy$ = new Subject();
  // tslint:disable-next-line:variable-name
  protected readonly _authUserStatus$ = new BehaviorSubject<AuthUser | AuthUserStatus>(AuthUserStatus.NOT_INITIATED);

  readonly authUserStatus$ = this._authUserStatus$.asObservable();

  get authUserStatus(): AuthUser | AuthUserStatus {
    return this._authUserStatus$.value;
  }

  readonly authUser$: Observable<AuthUser> = this.authUserStatus$
    .pipe(
      filter(
        it => it !== AuthUserStatus.NOT_INITIATED && it !== AuthUserStatus.LOGGED_OUT)
    ) as Observable<AuthUser>;

  get authUser(): AuthUser {
    return this._authUserStatus$.value as AuthUser;
  }

  constructor() {
    const STORAGE_KEY = 'note-app-jwt';

    this._authUserStatus$
      .pipe(takeUntil(this.destroy$))
      .subscribe((status: AuthUser | AuthUserStatus) => {
        if (!status) {
          localStorage.removeItem(STORAGE_KEY);
          return;
        }

        const authUser = status as AuthUser;
        localStorage.setItem(STORAGE_KEY, authUser.jwt);
      });
  }


  isLoggedIn(): boolean {
    return this.authUserStatus !== AuthUserStatus.LOGGED_OUT && this.authUserStatus !== AuthUserStatus.NOT_INITIATED;
  }

  markAsLoggedIn(userData: AuthUser) {
    this._authUserStatus$.next(userData);
  }

  markAsLoggedOut() {
    if (this._authUserStatus$.value === AuthUserStatus.LOGGED_OUT) {
      console.warn('Logging out... User already logged out');
    }

    this._authUserStatus$.next(AuthUserStatus.LOGGED_OUT);
  }

}
