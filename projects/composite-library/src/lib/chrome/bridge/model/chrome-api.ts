import { Observable } from 'rxjs';
import { ListenMessageResult } from './listen-message-result';
import { TabUpdateEvent } from '@composite-library/lib/chrome/bridge/model/tab-update-event';
import TabActiveInfo = chrome.tabs.TabActiveInfo;
import BadgeTextDetails = chrome.browserAction.BadgeTextDetails;
import BadgeBackgroundColorDetails = chrome.browserAction.BadgeBackgroundColorDetails;
import CreateProperties = chrome.tabs.CreateProperties;
import Tab = chrome.tabs.Tab;

export interface ChromeApi {
  getCurrentTab(): Observable<chrome.tabs.Tab>;

  sendTabMessage(tabId: number, message: any): Observable<any>;

  sendMessage(message: any): Observable<any>;

  listenMessage<Message, Response>(): Observable<ListenMessageResult<Message, Response>>;

  onTabActivated(): Observable<TabActiveInfo>;

  onTabUpdated(): Observable<TabUpdateEvent>;

  setBadgeText(details: BadgeTextDetails): Promise<void>

  setBadgeBackgroundColor(details: BadgeBackgroundColorDetails): Promise<void>

  createTab(createProperties: CreateProperties): Promise<Tab>
}
