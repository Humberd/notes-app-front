import { Injectable } from '@angular/core';
import { ChromeApiBridgeService } from '@composite-library/lib/chrome/bridge/chrome-api-bridge.service';
import { ChromeMessageMapping, ChromeMessageType } from '@composite-library/lib/chrome/message-multiplexer/model/message-type';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ChromeMessageMultiplexerService {

  constructor(private chromeApiBridgeService: ChromeApiBridgeService) {
  }

  sendMessage<T extends ChromeMessageType>(type: T, body: ChromeMessageMapping[T]): void {
    this.chromeApiBridgeService.sendMessage({type, body})
      .subscribe()
  }

  listenMessage<T extends ChromeMessageType>(type: T): Observable<ChromeMessageMapping[T]> {
    return this.chromeApiBridgeService.listenMessage<{ type: T, body: ChromeMessageMapping[T] }, any>()
      .pipe(
        filter(response => response.message.type === type),
        map(response => response.message.body),
      );
  }

}
