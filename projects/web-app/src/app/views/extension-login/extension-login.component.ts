import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorizationHandlerService } from '@composite-library/lib/auth/authorization-handler.service';
import { defaultUnauthorizedRoute } from '@composite-library/lib/auth/default-routes';
import { filter, map } from 'rxjs/operators';
import { AuthUserStatusType } from '@composite-library/lib/auth/authorized-user';
import { RouterUtilsService } from '@ng-boost/core';
import { StorageService } from '@composite-library/lib/storage/storage.service';
import { StorageKey } from '@composite-library/lib/storage/storage-key';
import { ChromeExternalMessageService } from '@composite-library/lib/chrome/external-message/chrome-external-message.service';
import { ChromeExternalMessageType } from '@composite-library/lib/chrome/external-message/model/external-message-type';
import { TemporaryStorageKey } from '@composite-library/lib/storage/temporary-storage-key';

@Component({
  selector: 'app-extension-login',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExtensionLoginComponent implements OnInit {
  readonly jwtStorageInstance = this.storageService.get(StorageKey.USER_JWT);
  readonly extensionLoginStorageInstance = this.storageService.getTemporary(TemporaryStorageKey.EXTENSION_LOGIN);

  constructor(
    private activatedRoute: ActivatedRoute,
    private authorizationHandlerService: AuthorizationHandlerService,
    @Inject(defaultUnauthorizedRoute) private loginRoute: string,
    private router: Router,
    private routerUtilsService: RouterUtilsService,
    private storageService: StorageService,
    private chromeExternalMessageService: ChromeExternalMessageService,
  ) {
  }

  ngOnInit(): void {
    const extensionId = this.activatedRoute.snapshot.queryParams.extensionId;

    if (!extensionId) {
      this.router.navigateByUrl('/');

      return;
    }

    // this.routerUtilsService.updateQueryParams({extensionId: null});

    this.authorizationHandlerService.authStatus$
      .pipe(
        filter(status => status.type !== AuthUserStatusType.NOT_INITIATED),
        map(status => status.type === AuthUserStatusType.LOGGED_IN),
      )
      .subscribe(isLoggedIn => {
        if (isLoggedIn) {
          this.sendMessageToExtension(extensionId);
          window.close()
        } else {
          this.extensionLoginStorageInstance.set(extensionId)
          this.router.navigateByUrl(this.loginRoute)
        }
      });
  }

  private sendMessageToExtension(extensionId: string) {
    this.chromeExternalMessageService.sendMessage(extensionId, ChromeExternalMessageType.AUTHORIZED, {
      jwt: this.jwtStorageInstance.get(),
    });
  }

}
