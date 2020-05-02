/// <reference types="chrome"/>

import { Injectable, NgZone } from '@angular/core';
import { ChromeApi } from './model/chrome-api';
import { Observable } from 'rxjs';
import { NoExtensionApiImpl } from './impl/no-extension-api.impl';
import { ExtensionApiImpl } from './impl/extension-api.impl';
import { ListenMessageResult } from './model/listen-message-result';
import { TabUpdateEvent } from '@composite-library/lib/chrome/bridge/model/tab-update-event';

@Injectable({
  providedIn: 'root',
})
export class ChromeApiBridgeService implements ChromeApi {
  private readonly chromeApiImpl: ChromeApi;

  constructor(ngZone: NgZone) {
    if (typeof chrome === 'undefined') {
      // TODO: firefox app
      this.chromeApiImpl = new NoExtensionApiImpl(ngZone);
    } else if (typeof chrome.extension === 'undefined') {
      this.chromeApiImpl = new NoExtensionApiImpl(ngZone);
    } else {
      this.chromeApiImpl = new ExtensionApiImpl(ngZone);
    }
  }

  getCurrentTab(): Observable<chrome.tabs.Tab> {
    return this.chromeApiImpl.getCurrentTab();
  }

  sendMessage(message: any): Observable<any> {
    return this.chromeApiImpl.sendMessage(message);
  }

  sendTabMessage(tabId: number, message: any): Observable<any> {
    return this.chromeApiImpl.sendTabMessage(tabId, message);
  }

  sendExternalMessage(extensionId: string, message: any): Observable<any> {
    return this.chromeApiImpl.sendExternalMessage(extensionId, message);
  }

  listenMessage<Message, Response>(): Observable<ListenMessageResult<Message, Response>> {
    return this.chromeApiImpl.listenMessage();
  }

  listenExternalMessage<Message, Response>(): Observable<ListenMessageResult<Message, Response>> {
    return this.chromeApiImpl.listenExternalMessage();
  }

  onTabActivated(): Observable<chrome.tabs.TabActiveInfo> {
    return this.chromeApiImpl.onTabActivated();
  }

  onTabUpdated(): Observable<TabUpdateEvent> {
    return this.chromeApiImpl.onTabUpdated();
  }

  setBadgeBackgroundColor(details: chrome.browserAction.BadgeBackgroundColorDetails): Promise<void> {
    return this.chromeApiImpl.setBadgeBackgroundColor(details);
  }

  setBadgeText(details: chrome.browserAction.BadgeTextDetails): Promise<void> {
    return this.chromeApiImpl.setBadgeText(details);
  }

  createTab(createProperties: chrome.tabs.CreateProperties): Promise<chrome.tabs.Tab> {
    return this.chromeApiImpl.createTab(createProperties);
  }

  getExtensionId(): string {
    return this.chromeApiImpl.getExtensionId();
  }
}
