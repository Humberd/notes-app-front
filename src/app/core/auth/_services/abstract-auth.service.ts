import { Destroy$ } from '@ng-boost/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';

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
  static readonly STORAGE_KEY = 'note-app-jwt';
  @Destroy$() private readonly destroy$ = new Subject();
  protected readonly _authUserStatus$ = new BehaviorSubject<AuthUser | AuthUserStatus>(AuthUserStatus.NOT_INITIATED);

  readonly authUserStatus$ = this._authUserStatus$.asObservable();

  get authUserStatus(): AuthUser | AuthUserStatus {
    return this._authUserStatus$.value;
  }

  readonly authUser$: Observable<AuthUser> = this.authUserStatus$
    .pipe(
      filter(
        it => this.loggedIn(it)),
    ) as Observable<AuthUser>;

  get authUser(): AuthUser {
    return this._authUserStatus$.value as AuthUser;
  }

  isLoggedIn$: Observable<boolean> = this.authUserStatus$
    .pipe(
      map(
        it => this.loggedIn(it)),
    );

  get isLoggedIn(): boolean {
    return this.loggedIn(this.authUserStatus);
  }

  private loggedIn(user: AuthUser | AuthUserStatus): boolean {
    return user !== AuthUserStatus.NOT_INITIATED && user !== AuthUserStatus.LOGGED_OUT;
  }

  constructor() {
    const rawStorageValue = localStorage.getItem(AbstractAuthService.STORAGE_KEY);

    if (typeof rawStorageValue === 'string') {
      this.login(rawStorageValue);
    }

    this._authUserStatus$
      .pipe(takeUntil(this.destroy$))
      .subscribe((status: AuthUser | AuthUserStatus) => {
        if (!status) {
          localStorage.removeItem(AbstractAuthService.STORAGE_KEY);
          return;
        }

        const authUser = status as AuthUser;
        localStorage.setItem(AbstractAuthService.STORAGE_KEY, authUser.jwt);
      });
  }

  abstract login(jwt: string);


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
