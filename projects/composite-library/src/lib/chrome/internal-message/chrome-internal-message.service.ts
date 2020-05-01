import { Injectable } from '@angular/core';
import { ChromeApiBridgeService } from '@composite-library/lib/chrome/bridge/chrome-api-bridge.service';
import {
  ChromeInternalMessageMapping,
  ChromeInternalMessageType,
} from '@composite-library/lib/chrome/internal-message/model/internal-message-type';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ChromeInternalMessageService {

  constructor(private chromeApiBridgeService: ChromeApiBridgeService) {
  }

  sendMessage<T extends ChromeInternalMessageType>(type: T, body: ChromeInternalMessageMapping[T]): void {
    this.chromeApiBridgeService.sendMessage({type, body})
      .subscribe();
  }

  listenMessage<T extends ChromeInternalMessageType>(type: T): Observable<ChromeInternalMessageMapping[T]> {
    return this.chromeApiBridgeService.listenMessage<{ type: T, body: ChromeInternalMessageMapping[T] }, any>()
      .pipe(
        filter(response => response.message.type === type),
        map(response => response.message.body),
      );
  }

}
