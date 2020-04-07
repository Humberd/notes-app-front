import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizationHandlerService } from 'composite-library/lib/auth/authorization-handler.service';
import { filter, map, tap } from 'rxjs/operators';
import { AuthUserStatusType } from 'composite-library/lib/auth/authorized-user';

@Injectable({
  providedIn: 'root',
})
export class MustBeAuthorizedGuard implements CanActivate, CanActivateChild {
  constructor(
    private authorizationHandlerService: AuthorizationHandlerService,
    private router: Router,
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isLoggedIn();
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isLoggedIn();
  }

  private isLoggedIn() {
    return this.authorizationHandlerService.authStatus$
      .pipe(
        filter(status => status.type !== AuthUserStatusType.NOT_INITIATED),
        map(status => status.type === AuthUserStatusType.LOGGED_IN),
        tap(isLoggedIn => {
          if (!isLoggedIn) {
            this.router.navigate(['/']);
          }
        }),
      );
  }

}
