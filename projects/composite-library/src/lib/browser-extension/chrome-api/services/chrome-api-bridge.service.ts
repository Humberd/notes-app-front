/// <reference types="chrome"/>

import { Injectable } from '@angular/core';
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

  constructor() {
    if (typeof chrome.extension === 'undefined') {
      this.chromeApiImpl = new NoChromeApiImpl();
    } else {
      this.chromeApiImpl = new ChromeApiImpl();
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

  listenMessage(): Observable<ListenMessageResult> {
    return this.chromeApiImpl.listenMessage();
  }

}
