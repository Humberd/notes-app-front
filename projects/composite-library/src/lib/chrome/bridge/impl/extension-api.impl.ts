import { Observable } from 'rxjs';
import { ChromeApi } from '../model/chrome-api';
import { ListenMessageResult } from '../model/listen-message-result';
import { NgZone } from '@angular/core';
import { TabUpdateEvent } from '@composite-library/lib/chrome/bridge/model/tab-update-event';

export class ExtensionApiImpl implements ChromeApi {

  constructor(private ngZone: NgZone) {
  }

  getCurrentTab(): Observable<chrome.tabs.Tab> {
    return new Observable<chrome.tabs.Tab>(subscriber => {
      chrome.tabs.query({
        active: true,
        currentWindow: true,
      }, tabs => {
        this.ngZone.run(() => {
          subscriber.next(tabs[0]);
          subscriber.complete();
        });
      });
    });
  }

  sendMessage(message: any): Observable<any> {
    return new Observable<any>(subscriber => {
      chrome.runtime.sendMessage(message, response => {
        this.ngZone.run(() => {
          subscriber.next(response);
          subscriber.complete();
        });
      });
    });
  }

  sendTabMessage(tabId: number, message: any): Observable<any> {
    return new Observable<any>(subscriber => {
      chrome.tabs.sendMessage(tabId, message, response => {
        this.ngZone.run(() => {
          subscriber.next(response);
          subscriber.complete();
        });
      });
    });
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
    return new Observable<ListenMessageResult<Message, Response>>(subscriber => {
      const handler = (...event) => {
        this.ngZone.run(() => {
          subscriber.next({
            message: event[0],
            sender: event[1],
            sendResponse: event[2],
          });
        });
      };

      chrome.runtime.onMessage.addListener(handler);

      return () => {
        chrome.runtime.onMessage.removeListener(handler);
      };
    });
  }

  listenExternalMessage<Message, Response>(): Observable<ListenMessageResult<Message, Response>> {
    return new Observable<ListenMessageResult<Message, Response>>(subscriber => {
      const handler = (...event) => {
        this.ngZone.run(() => {
          subscriber.next({
            message: event[0],
            sender: event[1],
            sendResponse: event[2],
          });
        });
      };

      chrome.runtime.onMessageExternal.addListener(handler);

      return () => {
        chrome.runtime.onMessageExternal.removeListener(handler);
      };
    });
  }

  onTabActivated(): Observable<chrome.tabs.TabActiveInfo> {
    return new Observable<chrome.tabs.TabActiveInfo>(subscriber => {
      const handler = tabInfo => {
        this.ngZone.run(() => {
          subscriber.next(tabInfo);
        });
      };
      chrome.tabs.onActivated.addListener(handler);

      return () => {
        chrome.tabs.onActivated.removeListener(handler);
      };
    });
  }

  onTabUpdated(): Observable<TabUpdateEvent> {
    return new Observable<TabUpdateEvent>(subscriber => {
      const handler = (tabId, changeInfo, tab) => {
        this.ngZone.run(() => {
          subscriber.next({
            tabId,
            changeInfo,
            tab,
          });
        });
      };
      chrome.tabs.onUpdated.addListener(handler);

      return () => {
        chrome.tabs.onUpdated.removeListener(handler);
      };
    });
  }

  setBadgeBackgroundColor(details: chrome.browserAction.BadgeBackgroundColorDetails): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      chrome.browserAction.setBadgeBackgroundColor(details, resolve);
    });
  }

  setBadgeText(details: chrome.browserAction.BadgeTextDetails): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      chrome.browserAction.setBadgeText(details, resolve);
    });
  }

  createTab(createProperties: chrome.tabs.CreateProperties): Promise<chrome.tabs.Tab> {
    return new Promise<chrome.tabs.Tab>((resolve, reject) => {
      chrome.tabs.create(createProperties, resolve);
    });
  }

  getExtensionId(): string {
    return chrome.runtime.id;
  }

}
