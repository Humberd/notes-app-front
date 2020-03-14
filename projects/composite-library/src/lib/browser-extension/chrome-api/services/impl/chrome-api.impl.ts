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
}
