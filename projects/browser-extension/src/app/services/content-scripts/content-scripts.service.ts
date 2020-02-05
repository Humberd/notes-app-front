import { Injectable } from '@angular/core';
import { ChromeApiBridgeService } from '../chrome-api/chrome-api-bridge.service';

@Injectable({
  providedIn: 'root',
})
export class ContentScriptsService {

  constructor(private chromeApiBridgeService: ChromeApiBridgeService) {
  }

  startSelectionMode(tabId: number): void {
    this.chromeApiBridgeService.sendTabMessage(tabId, undefined)
      .subscribe();

    window.close();
  }
}
