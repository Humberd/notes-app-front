import { Observable } from 'rxjs';
import { ChromeApi } from './chrome-api';

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
}
