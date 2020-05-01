import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '@composite-library/lib/storage/storage.service';
import { StorageKey } from '@composite-library/lib/storage/storage-key';
import { ChromeApiBridgeService } from '@composite-library/lib/chrome/bridge/chrome-api-bridge.service';

@Injectable({
  providedIn: 'root',
})
export class MustBeAuthorizedExtensionGuard implements CanLoad {
  readonly storageInstance = this.storageService.get(StorageKey.USER_JWT);

  constructor(
    private storageService: StorageService,
    private chromeApiBridgeService: ChromeApiBridgeService,
  ) {
  }

  canLoad(
    route: Route,
    segments: UrlSegment[],
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.storageInstance.get()) {
      return true;
    }

    this.chromeApiBridgeService.createTab({
      url: 'https://google.com',
    });

    return false;
  }
}
