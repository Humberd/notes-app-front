import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PasswordCredentialsLoginRequest } from '@domain/entity/user/request/password-credentials-login-request';
import { PasswordCredentialsDomainService } from '@domain/entity/user/service/password-credentials-domain.service';
import { filter, map, mapTo, shareReplay, switchMap, tap } from 'rxjs/operators';
import { UserDomainService } from '@domain/entity/user/service/user-domain.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { StorageKey } from '@composite-library/lib/storage/storage-key';
import { StorageService } from '@composite-library/lib/storage/storage.service';
import { AuthorizedUser, AuthUserStatus, AuthUserStatusType, LoggedIn } from '@composite-library/lib/auth/authorized-user';
import { JwtContent } from '@composite-library/lib/auth/jwt-content';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationHandlerService {
  private readonly storage = this.storageService.get(StorageKey.USER_JWT);
  private readonly _authStatus$ = new BehaviorSubject<AuthUserStatus>({type: AuthUserStatusType.NOT_INITIATED});
  authStatus$ = this._authStatus$.asObservable();

  get authStatus() {
    return this._authStatus$.value;
  }

  readonly user$: Observable<AuthorizedUser> = this._authStatus$.pipe(
    filter(status => status.type === AuthUserStatusType.LOGGED_IN),
    map((status: LoggedIn) => status.user),
    shareReplay(),
  );

  constructor(
    private storageService: StorageService,
    private passwordCredentialsDomainService: PasswordCredentialsDomainService,
    private myDataDomainService: UserDomainService,
    private router: Router,
  ) {
    this.handleInitialTokenFetch();
  }

  private handleInitialTokenFetch() {
    const jwt = this.storage.get();
    if (!jwt) {
      this.markAsLoggedOut();
      return;
    }

    let jwtContent: JwtContent;
    try {
      jwtContent = this.extractJwtContent(jwt);
    } catch (e) {
      this.markAsLoggedOut();
      return;
    }

    this.readUserProfile(jwt, jwtContent)
      .subscribe();
  }

  private readUserProfile(jwt: string, jwtContent: JwtContent) {
    return this.myDataDomainService.read(jwtContent.sub, jwt)
      .pipe(
        tap({
          next: profile => {
            this._authStatus$.next({
              type: AuthUserStatusType.LOGGED_IN,
              user: {
                id: jwtContent.sub,
                name: profile.name,
                jwt,
              },
            });
            this.storage.set(jwt);
          },
          error: (error: HttpErrorResponse) => {
            if (error.status >= 400 || error.status < 500) {
              this.storage.remove();
            }
            this.markAsLoggedOut();

            console.error(error);
          },
        }),
      )
      ;
  }

  login(data: PasswordCredentialsLoginRequest): Observable<void> {
    return this.passwordCredentialsDomainService.login(data)
      .pipe(
        map(response => {
          const headerValue = response.headers.get('authorization');
          if (!headerValue.startsWith('Bearer ')) {
            this.markAsLoggedOut();
            throw Error('Header value doesnt start with "Bearer "');
          }

          const jwt = headerValue.replace('Bearer ', '');

          let jwtContent: JwtContent;
          try {
            jwtContent = this.extractJwtContent(jwt);
          } catch (e) {
            this.markAsLoggedOut();
            throw e;
          }

          return {jwtContent, jwt};
        }),
        switchMap(({jwt, jwtContent}) => this.readUserProfile(jwt, jwtContent)),
        mapTo(undefined),
      );
  }

  logout() {
    this.markAsLoggedOut();
    this.storage.remove();
    this.router.navigate(['/']);
  }

  private markAsLoggedOut() {
    this._authStatus$.next({
      type: AuthUserStatusType.LOGGED_OUT,
    });
  }

  private extractJwtContent(jwt: string): JwtContent {
    const b64Payload = jwt.split('.')[1];
    return JSON.parse(atob(b64Payload));
  }
}
