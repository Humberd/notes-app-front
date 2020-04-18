import { Observable } from 'rxjs';
import { ChromeApi } from '../../models/chrome-api';
import { ListenMessageResult } from '../../models/listen-message-result';
import { NgZone } from '@angular/core';

export class ChromeApiImpl implements ChromeApi {

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

  onTabUpdated(): Observable<any> {
    return new Observable<any>(subscriber => {
      const handler = (tabId, changeInfo, tab) => {
        this.ngZone.run(() => {
          subscriber.next({
            tabId,
            changeInfo,
            tab
          })
        });
      };
      chrome.tabs.onUpdated.addListener(handler);

      return () => {
        chrome.tabs.onUpdated.removeListener(handler);
      };
    });
  }

  setBadgeBackgroundColor(details: chrome.browserAction.BadgeBackgroundColorDetails): Observable<void> {
    return new Observable(subscriber => {
      const handler = () => {
        this.ngZone.run(() => {
          subscriber.next()
        });
      };
      chrome.browserAction.setBadgeBackgroundColor(details, handler)
    });
  }

  setBadgeText(details: chrome.browserAction.BadgeTextDetails): Observable<void> {
    return new Observable(subscriber => {
      const handler = () => {
        this.ngZone.run(() => {
          subscriber.next()
        });
      };
      chrome.browserAction.setBadgeText(details, handler)
    });
  }

}
