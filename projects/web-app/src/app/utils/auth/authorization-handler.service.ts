import { Injectable } from '@angular/core';
import { StorageService } from '@web-app/app/utils/storage/storage.service';
import { StorageKey } from '@web-app/app/utils/storage/storage-key';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { PasswordCredentialsLoginRequest } from '../../../../../domain/src/entity/user/request/password-credentials-login-request';
import { PasswordCredentialsDomainService } from '../../../../../domain/src/entity/user/service/password-credentials-domain.service';
import { map, mapTo, switchMap } from 'rxjs/operators';
import { AuthUserStatus, AuthUserStatusType } from '@web-app/app/utils/auth/authorized-user';
import { JwtContent } from '@web-app/app/utils/auth/jwt-content';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationHandlerService {
  private readonly storage = this.storageService.get(StorageKey.USER_JWT);
  private readonly authStatus$ = new BehaviorSubject<AuthUserStatus>({type: AuthUserStatusType.NOT_INITIATED});

  constructor(
    private storageService: StorageService,
    private passwordCredentialsDomainService: PasswordCredentialsDomainService,
  ) {

  }

  // isLoggedIn$: Observable<boolean> = this.userStatus$.pipe(map(it => this.loggedIn(it)));
  //
  // get isLoggedIn(): boolean {
  //   return this.loggedIn(this.userStatus$.value);
  // }
  //
  // private loggedIn(status: AuthUserStatus): boolean {
  //   return status === AuthUserStatus.LOGGED_IN;
  // }

  login(data: PasswordCredentialsLoginRequest): Observable<void> {
    return this.passwordCredentialsDomainService.login(data)
      .pipe(
        map(response => {
          const headerValue = response.headers.get('authorization');
          if (!headerValue.startsWith('Bearer ')) {
            this.authStatus$.next({
              type: AuthUserStatusType.LOGGED_OUT,
            });
            throw Error('Header value doesnt start with "Bearer "');
          }

          const jwt = headerValue.replace('Bearer ', '');

          let jwtContent: JwtContent;
          try {
            const b64Payload = jwt.split('.')[1];
            jwtContent = JSON.parse(atob(b64Payload));
          } catch (e) {
            this.authStatus$.next({
              type: AuthUserStatusType.LOGGED_OUT,
            });
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
              jwt
            }
          });
          this.storage.set(jwt);
          return of();
        }),
        mapTo(undefined),
      );
  }
}
