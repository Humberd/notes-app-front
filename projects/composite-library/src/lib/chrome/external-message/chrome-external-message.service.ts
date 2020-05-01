import { Injectable } from '@angular/core';
import { ChromeApiBridgeService } from '@composite-library/lib/chrome/bridge/chrome-api-bridge.service';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import {
  ChromeExternalMessageMapping,
  ChromeExternalMessageType,
} from '@composite-library/lib/chrome/external-message/model/external-message-type';

@Injectable({
  providedIn: 'root'
})
export class ChromeExternalMessageService {

  constructor(private chromeApiBridgeService: ChromeApiBridgeService) {
  }

  sendMessage<T extends ChromeExternalMessageType>(extensionId: string, type: T, body: ChromeExternalMessageMapping[T]): void {
    this.chromeApiBridgeService.sendExternalMessage(extensionId, {type, body})
      .subscribe();
  }

  listenMessage<T extends ChromeExternalMessageType>(type: T): Observable<ChromeExternalMessageMapping[T]> {
    return this.chromeApiBridgeService.listenExternalMessage<{ type: T, body: ChromeExternalMessageMapping[T] }, any>()
      .pipe(
        filter(response => response.message.type === type),
        map(response => response.message.body),
      );
  }
}
