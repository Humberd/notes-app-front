import { Observable } from 'rxjs';

export interface ChromeApi {
  getCurrentTab(): Observable<chrome.tabs.Tab>;

  sendTabMessage(tabId: number, message: any): Observable<any>;
}
