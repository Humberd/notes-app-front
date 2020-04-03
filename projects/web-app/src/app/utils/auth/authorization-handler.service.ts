import { Injectable } from '@angular/core';
import { StorageService } from '@web-app/app/utils/storage/storage.service';
import { StorageKey } from '@web-app/app/utils/storage/storage-key';
import { BehaviorSubject, Observable } from 'rxjs';
import { PasswordCredentialsLoginRequest } from '../../../../../domain/src/entity/user/request/password-credentials-login-request';
import { PasswordCredentialsDomainService } from '../../../../../domain/src/entity/user/service/password-credentials-domain.service';
import { filter, map, mapTo, shareReplay, switchMap, tap } from 'rxjs/operators';
import { AuthorizedUser, AuthUserStatus, AuthUserStatusType, LoggedIn } from '@web-app/app/utils/auth/authorized-user';
import { JwtContent } from '@web-app/app/utils/auth/jwt-content';
import { MyDataDomainService } from '../../../../../domain/src/entity/user/service/my-data-domain.service';
import { HttpErrorResponse } from '@angular/common/http';

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
    private myDataDomainService: MyDataDomainService,
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
    return this.myDataDomainService.readMyProfile(jwt)
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
        switchMap(({jwt, jwtContent}) => {
          return this.readUserProfile(jwt, jwtContent)
        }),
        mapTo(undefined),
      );
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
