import { Observable } from 'rxjs';
import { ListenMessageResult } from './listen-message-result';
import TabActiveInfo = chrome.tabs.TabActiveInfo;
import BadgeTextDetails = chrome.browserAction.BadgeTextDetails;
import BadgeBackgroundColorDetails = chrome.browserAction.BadgeBackgroundColorDetails;

export interface ChromeApi {
  getCurrentTab(): Observable<chrome.tabs.Tab>;

  sendTabMessage(tabId: number, message: any): Observable<any>;

  sendMessage(message: any): Observable<any>;

  listenMessage<Message, Response>(): Observable<ListenMessageResult<Message, Response>>;

  onTabActivated(): Observable<TabActiveInfo>;

  onTabUpdated(): Observable<any>;

  setBadgeText(details: BadgeTextDetails): Observable<void>

  setBadgeBackgroundColor(details: BadgeBackgroundColorDetails): Observable<void>
}
