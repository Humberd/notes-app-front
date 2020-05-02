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
import { UserView } from '@domain/entity/user/view/user-view';
import { TemporaryStorageKey } from '@composite-library/lib/storage/temporary-storage-key';
import { ChromeExternalMessageType } from '@composite-library/lib/chrome/external-message/model/external-message-type';
import { ChromeExternalMessageService } from '@composite-library/lib/chrome/external-message/chrome-external-message.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationHandlerService {
  private readonly jwtStorage = this.storageService.get(StorageKey.USER_JWT);
  private readonly extensionIdStorage = this.storageService.getTemporary(TemporaryStorageKey.EXTENSION_LOGIN);
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
    private chromeExternalMessageService: ChromeExternalMessageService,
  ) {
    this.handleInitialTokenFetch();
  }

  private handleInitialTokenFetch() {
    const jwt = this.jwtStorage.get();
    if (!jwt) {
      this.markAsLoggedOut();
      return;
    }

    this.loginViaToken(jwt)
      .subscribe();
  }

  private readUserProfile(jwt: string, jwtContent: JwtContent): Observable<UserView> {
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
            this.jwtStorage.set(jwt);
          },
          error: (error: HttpErrorResponse) => {
            if (error.status >= 400 || error.status < 500) {
              this.jwtStorage.remove();
            }
            this.markAsLoggedOut();

            console.error(error);
          },
        }),
      )
      ;
  }

  login(data: PasswordCredentialsLoginRequest): Observable<string> {
    return this.passwordCredentialsDomainService.login(data)
      .pipe(
        map(response => {
          const headerValue = response.headers.get('authorization');
          if (!headerValue.startsWith('Bearer ')) {
            this.markAsLoggedOut();
            throw Error('Header value doesnt start with "Bearer "');
          }

          return headerValue.replace('Bearer ', '');
        }),
        switchMap(jwt => this.loginViaToken(jwt).pipe(mapTo(jwt))),
      );
  }

  loginViaToken(jwt: string): Observable<JwtContent> {
    return new Observable<JwtContent>(subscriber => {
      let jwtContent: JwtContent;
      try {
        jwtContent = this.extractJwtContent(jwt);
      } catch (e) {
        this.markAsLoggedOut();
        subscriber.error(e);

        return;
      }
      subscriber.next(jwtContent);
    })
      .pipe(
        switchMap(jwtContent => this.readUserProfile(jwt, jwtContent).pipe(mapTo(jwtContent))),
        tap(() => this.handleExtensionLogin(jwt),
        ),
      );
  }

  logout() {
    this.markAsLoggedOut();
    this.jwtStorage.remove();
    this.router.navigate(['/']);
  }

  private handleExtensionLogin(jwt: string) {
    const extensionId = this.extensionIdStorage.get();
    if (extensionId) {
      this.extensionIdStorage.remove();
      this.chromeExternalMessageService.sendMessage(extensionId, ChromeExternalMessageType.AUTHORIZED, {
        jwt,
      });
    }
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
