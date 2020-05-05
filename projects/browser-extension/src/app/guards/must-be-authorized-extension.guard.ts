import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '@composite-library/lib/storage/storage.service';
import { StorageKey } from '@composite-library/lib/storage/storage-key';
import { ChromeApiBridgeService } from '@composite-library/lib/chrome/bridge/chrome-api-bridge.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MustBeAuthorizedExtensionGuard implements CanLoad {
  readonly jwtInStorage = this.storageService.get(StorageKey.USER_JWT);

  constructor(
    private storageService: StorageService,
    private chromeApiBridgeService: ChromeApiBridgeService,
  ) {
  }

  canLoad(
    route: Route,
    segments: UrlSegment[],
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.jwtInStorage.get()) {
      return true;
    }

    this.chromeApiBridgeService.createTab({
      url: `${environment.webAppUrl}/extension/login?extensionId=${this.chromeApiBridgeService.getExtensionId()}`,
    });

    return false;
  }
}
