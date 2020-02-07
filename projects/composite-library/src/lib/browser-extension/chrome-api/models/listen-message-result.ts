import MessageSender = chrome.runtime.MessageSender;

export interface ListenMessageResult<Message, Response> {
  message: Message;
  sender: MessageSender;
  sendResponse: (response?: Response) => void;
}
