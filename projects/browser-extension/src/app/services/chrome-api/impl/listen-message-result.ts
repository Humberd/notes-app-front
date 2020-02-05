import MessageSender = chrome.runtime.MessageSender;

export interface ListenMessageResult {
  message: any;
  sender: MessageSender;
  sendResponse: (response?: any) => void;
}
