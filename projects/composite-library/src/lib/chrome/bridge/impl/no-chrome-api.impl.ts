import { Observable, of } from 'rxjs';
import { ChromeApi } from '../model/chrome-api';
import { ListenMessageResult } from '../model/listen-message-result';

export class NoChromeApiImpl implements ChromeApi {
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

  sendTabMessage(tabId: number, message: any): Observable<any> {
    return of();
  }

  sendMessage(message: any): Observable<any> {
    return of();
  }

  listenMessage<Message, Response>(): Observable<ListenMessageResult<Message, Response>> {
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
    return Promise.resolve();
  }

}
