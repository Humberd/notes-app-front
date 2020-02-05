let hasPanelElem = false;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

  if (hasPanelElem) {
    sendResponse('ALREADY_EXISTS');
    return;
  }

  hasPanelElem = true;

  const {saveButton, cancelButton, panelElem} = createFixedTopPanel();

  cancelButton.onclick = () => {
    sendResponse('CANCEL');
    panelElem.remove();
  };

  saveButton.onclick = () => {
    sendResponse('SAVE');
    panelElem.remove();
  };

  document.body.appendChild(panelElem);

});

function createFixedTopPanel() {
  const panelElem = document.createElement('section');
  panelElem.classList.add('brx-top-panel');

  const cancelButton = document.createElement('button');
  cancelButton.classList.add('brx-button');
  cancelButton.textContent = 'CANCEL';

  const saveButton = document.createElement('button');
  saveButton.classList.add('brx-button');
  saveButton.textContent = 'SAVE';

  panelElem.append(cancelButton, saveButton);

  return {
    panelElem,
    cancelButton,
    saveButton,
  };
}
