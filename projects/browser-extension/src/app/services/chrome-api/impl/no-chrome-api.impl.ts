import { Observable, of } from 'rxjs';
import { ChromeApi } from './chrome-api';
import { ListenMessageResult } from './listen-message-result';

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

  listenMessage(): Observable<ListenMessageResult> {
    return of();
  }

}
