import { Observable } from 'rxjs';
import { ListenMessageResult } from './listen-message-result';

export interface ChromeApi {
  getCurrentTab(): Observable<chrome.tabs.Tab>;

  sendTabMessage(tabId: number, message: any): Observable<any>;

  sendMessage(message: any): Observable<any>;

  listenMessage<Message, Response>(): Observable<ListenMessageResult<Message, Response>>;
}
