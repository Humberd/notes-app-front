import { Injectable } from '@angular/core';
import { ChromeApiBridgeService } from '@composite-library/lib/chrome/bridge/chrome-api-bridge.service';
import { ContentScriptRequestType } from '@composite-library/lib/chrome/content-scripts/models/content-script-request-type';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { ListenMessageResult } from '@composite-library/lib/chrome/bridge/model/listen-message-result';
import { ContentScriptResponse } from '@composite-library/lib/chrome/content-scripts/models/content-script-response';

@Injectable({
  providedIn: 'root',
})
export class ContentScriptsService {

  constructor(private chromeApiBridgeService: ChromeApiBridgeService) {
  }

  startSelectionMode(tabId: number): void {
    this.chromeApiBridgeService.sendTabMessage(tabId, ContentScriptRequestType.CONTENT_SELECTION)
      .subscribe();

    // window.close();
  }

  watchForSelectionMode(): Observable<ListenMessageResult<ContentScriptRequestType, ContentScriptResponse>> {
    return this.chromeApiBridgeService.listenMessage<ContentScriptRequestType, ContentScriptResponse>()
      .pipe(
        tap(console.log),
        filter(value => value.message === ContentScriptRequestType.CONTENT_SELECTION),
      );
  }
}
