import { Observable, of } from 'rxjs';
import { ChromeApi } from '../model/chrome-api';
import { ListenMessageResult } from '../model/listen-message-result';
import { NgZone } from '@angular/core';

export class NoExtensionApiImpl implements ChromeApi {
  constructor(private ngZone: NgZone) {
  }

  getCurrentTab(): Observable<chrome.tabs.Tab> {
    const tab: chrome.tabs.Tab = {
      index: 0,
      pinned: false,
      highlighted: true,
      selected: true,
      windowId: 0,
      active: true,
      incognito: false,
      discarded: false,
      autoDiscardable: false,
      title: 'Test title - running as normal app',
      url: 'testUrl',
    };
    return of(tab);
  }

  sendMessage(message: any): Observable<any> {
    return of();
  }

  sendTabMessage(tabId: number, message: any): Observable<any> {
    return of();
  }

  sendExternalMessage(extensionId: string, message: any): Observable<any> {
    return new Observable<any>(subscriber => {
      chrome.runtime.sendMessage(extensionId, message, response => {
        this.ngZone.run(() => {
          subscriber.next(response);
          subscriber.complete();
        });
      });
    });
  }

  listenMessage<Message, Response>(): Observable<ListenMessageResult<Message, Response>> {
    return of();
  }

  listenExternalMessage<Message, Response>(): Observable<ListenMessageResult<Message, Response>> {
    return of();
  }

  onTabActivated(): Observable<chrome.tabs.TabActiveInfo> {
    return of();
  }

  onTabUpdated(): Observable<any> {
    return of();
  }

  setBadgeBackgroundColor(details: chrome.browserAction.BadgeBackgroundColorDetails): Promise<void> {
    return Promise.resolve();
  }

  setBadgeText(details: chrome.browserAction.BadgeTextDetails): Promise<void> {
    return Promise.resolve();
  }

  createTab(createProperties: chrome.tabs.CreateProperties): Promise<chrome.tabs.Tab> {
    return this.getCurrentTab().toPromise();
  }

  getExtensionId(): string {
    return 'mock-extension-id';
  }
}
