import { Injectable } from '@angular/core';
import { StorageService } from '@web-app/app/utils/storage/storage.service';
import { StorageKey } from '@web-app/app/utils/storage/storage-key';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { PasswordCredentialsLoginRequest } from '../../../../../domain/src/entity/user/request/password-credentials-login-request';
import { PasswordCredentialsDomainService } from '../../../../../domain/src/entity/user/service/password-credentials-domain.service';
import { filter, map, mapTo, switchMap } from 'rxjs/operators';
import { AuthorizedUser, AuthUserStatus, AuthUserStatusType, LoggedIn } from '@web-app/app/utils/auth/authorized-user';
import { JwtContent } from '@web-app/app/utils/auth/jwt-content';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationHandlerService {
  private readonly storage = this.storageService.get(StorageKey.USER_JWT);
  private readonly authStatus$ = new BehaviorSubject<AuthUserStatus>({type: AuthUserStatusType.NOT_INITIATED});
  private readonly user$: Observable<AuthorizedUser> = this.authStatus$.pipe(
    filter(status => status.type !== AuthUserStatusType.LOGGED_IN),
    map((status: LoggedIn) => status.user),
  );

  constructor(
    private storageService: StorageService,
    private passwordCredentialsDomainService: PasswordCredentialsDomainService,
  ) {
    this.handleInitialTokenFetch();
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
          this.authStatus$.next({
            type: AuthUserStatusType.LOGGED_IN,
            user: {
              id: jwtContent.sub,
              name: 'not - yet',
              jwt,
            },
          });
          this.storage.set(jwt);
          return of();
        }),
        mapTo(undefined),
      );
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

    this.authStatus$.next({
      type: AuthUserStatusType.LOGGED_IN,
      user: {
        id: jwtContent.sub,
        name: 'not - yet',
        jwt,
      },
    });
    this.storage.set(jwt);
  }

  private markAsLoggedOut() {
    this.authStatus$.next({
      type: AuthUserStatusType.LOGGED_OUT,
    });
  }

  private extractJwtContent(jwt: string): JwtContent {
    const b64Payload = jwt.split('.')[1];
    return JSON.parse(atob(b64Payload));
  }
}
