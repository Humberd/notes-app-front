chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log({
    message,
    sender,
    sendResponse,
  });

  sendResponse('hello from content-selection.js');
});
