import { fromEventPattern, Observable } from 'rxjs';
import { ChromeApi } from '../../models/chrome-api';
import { ListenMessageResult } from '../../models/listen-message-result';

export class ChromeApiImpl implements ChromeApi {
  getCurrentTab(): Observable<chrome.tabs.Tab> {
    return new Observable<chrome.tabs.Tab>(subscriber => {
      chrome.tabs.query({
        active: true,
        currentWindow: true,
      }, tabs => {
        subscriber.next(tabs[0]);
        subscriber.complete();
      });
    });
  }

  sendTabMessage(tabId: number, message: any): Observable<any> {
    return new Observable<any>(subscriber => {
      chrome.tabs.sendMessage(tabId, message, response => {
        subscriber.next(response);
        subscriber.complete();
      });
    });
  }

  sendMessage(message: any): Observable<any> {
    return new Observable<any>(subscriber => {
      chrome.runtime.sendMessage(message, response => {
        subscriber.next(response);
        subscriber.complete();
      });
    });
  }

  listenMessage(): Observable<ListenMessageResult> {
    function addHandler(handler) {
      chrome.runtime.onMessage.addListener(handler);
    }

    function deleteHandler(handler) {
      chrome.runtime.onMessage.removeListener(handler);
    }

    return fromEventPattern(addHandler, deleteHandler);
  }
}
