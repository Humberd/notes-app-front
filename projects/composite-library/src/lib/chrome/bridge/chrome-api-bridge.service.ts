/// <reference types="chrome"/>

import { Injectable, NgZone } from '@angular/core';
import { ChromeApi } from './model/chrome-api';
import { Observable } from 'rxjs';
import { NoChromeApiImpl } from './impl/no-chrome-api.impl';
import { ChromeApiImpl } from './impl/chrome-api.impl';
import { ListenMessageResult } from './model/listen-message-result';
import { TabUpdateEvent } from '@composite-library/lib/chrome/bridge/model/tab-update-event';

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

  onTabUpdated(): Observable<TabUpdateEvent> {
    return this.chromeApiImpl.onTabUpdated();
  }

  setBadgeBackgroundColor(details: chrome.browserAction.BadgeBackgroundColorDetails): Observable<void> {
    return this.chromeApiImpl.setBadgeBackgroundColor(details);
  }

  setBadgeText(details: chrome.browserAction.BadgeTextDetails): Observable<void> {
    console.log('set badge text', details);
    return this.chromeApiImpl.setBadgeText(details);
  }

}
