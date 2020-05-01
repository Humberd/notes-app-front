import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorizationHandlerService } from '@composite-library/lib/auth/authorization-handler.service';
import { defaultUnauthorizedRoute } from '@composite-library/lib/auth/default-routes';
import { filter, map } from 'rxjs/operators';
import { AuthUserStatusType } from '@composite-library/lib/auth/authorized-user';
import { RouterUtilsService } from '@ng-boost/core';

@Component({
  selector: 'app-extension-login',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExtensionLoginComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private authorizationHandlerService: AuthorizationHandlerService,
    @Inject(defaultUnauthorizedRoute) private loginRoute: string,
    private router: Router,
    private routerUtilsService: RouterUtilsService,
  ) {
  }

  ngOnInit(): void {
    const extensionId = this.activatedRoute.snapshot.queryParams.extensionId;

    if (!extensionId) {
      this.router.navigateByUrl('/');

      return;
    }

    this.routerUtilsService.updateQueryParams({extensionId: null});

    this.authorizationHandlerService.authStatus$
      .pipe(
        filter(status => status.type !== AuthUserStatusType.NOT_INITIATED),
        map(status => status.type === AuthUserStatusType.LOGGED_IN),
      )
      .subscribe(isLoggedIn => {
        if (isLoggedIn) {
          this.sendMessageToExtension();
        } else {
          console.log('not logged in');
          // save to storage
          // redirect
        }
      });
  }

  private sendMessageToExtension() {

  }

}
