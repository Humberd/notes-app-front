import { Observable, of } from 'rxjs';
import { ChromeApi } from './chrome-api';

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
      url: 'testUrl',
    };
    return of(tab);
  }

}
