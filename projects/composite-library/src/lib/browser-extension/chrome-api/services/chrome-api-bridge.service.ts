/// <reference types="chrome"/>

import { Injectable, NgZone } from '@angular/core';
import { ChromeApi } from '../models/chrome-api';
import { Observable } from 'rxjs';
import { NoChromeApiImpl } from './impl/no-chrome-api.impl';
import { ChromeApiImpl } from './impl/chrome-api.impl';
import { ListenMessageResult } from '../models/listen-message-result';

@Injectable({
  providedIn: 'root',
})
export class ChromeApiBridgeService implements ChromeApi {
  private readonly chromeApiImpl: ChromeApi;

  constructor(ngZone: NgZone) {
    if (typeof chrome.extension === 'undefined') {
      this.chromeApiImpl = new NoChromeApiImpl();
    } else {
      this.chromeApiImpl = new ChromeApiImpl(ngZone);
    }
  }

  getCurrentTab(): Observable<chrome.tabs.Tab> {
    return this.chromeApiImpl.getCurrentTab();
  }

  sendTabMessage(tabId: number, message: any): Observable<any> {
    return this.chromeApiImpl.sendTabMessage(tabId, message);
  }

  sendMessage(message: any): Observable<any> {
    return this.chromeApiImpl.sendMessage(message);
  }

  listenMessage<Message, Response>(): Observable<ListenMessageResult<Message, Response>> {
    return this.chromeApiImpl.listenMessage();
  }

  onTabActivated(): Observable<chrome.tabs.TabActiveInfo> {
    return this.chromeApiImpl.onTabActivated();
  }

}
