import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { AuthUserStatusType } from '@composite-library/lib/auth/authorized-user';
import { AuthorizationHandlerService } from '@composite-library/lib/auth/authorization-handler.service';
import { defaultAuthorizedRoute } from '@composite-library/lib/auth/default-routes';

@Injectable({
  providedIn: 'root',
})
export class MustNotBeAuthorizedGuard implements CanActivate, CanActivateChild {
  constructor(
    private authorizationHandlerService: AuthorizationHandlerService,
    private router: Router,
    @Inject(defaultAuthorizedRoute) private authorizedRoute: string,
  ) {
  }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isLoggedOut();
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isLoggedOut();
  }

  private isLoggedOut() {
    return this.authorizationHandlerService.authStatus$
      .pipe(
        filter(status => status.type !== AuthUserStatusType.NOT_INITIATED),
        map(status => status.type === AuthUserStatusType.LOGGED_OUT),
        tap(isLoggedOut => {
          if (!isLoggedOut) {
            this.router.navigateByUrl(this.authorizedRoute);
          }
        }),
      );
  }

}
