let hasPanelElem = false;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

  if (hasPanelElem) {
    sendResponse({
      type: 'ALREADY_EXISTS',
    });
    return;
  }

  hasPanelElem = true;
  let selection;

  const {saveButton, cancelButton, panelElem} = createFixedTopPanel();

  cancelButton.onclick = () => {
    endSelectionMode({
      type: 'CANCEL',
    });
  };

  saveButton.onclick = () => {
    endSelectionMode({
      type: 'SAVE',
      content: selection.toString(),
    });
  };

  document.body.appendChild(panelElem);

  const onSelectionChangeListener = ev => {
    selection = document.getSelection();
    if (selection.type === 'Range') {
      saveButton.style.display = 'inline-block';
    } else {
      saveButton.style.display = 'none';
    }
  };

  document.addEventListener('selectionchange', onSelectionChangeListener);

  function endSelectionMode(response) {
    sendResponse(response);
    panelElem.remove();
    hasPanelElem = false;
    document.removeEventListener('selectionchange', onSelectionChangeListener);
  }
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
  saveButton.style.display = 'none';

  panelElem.append(cancelButton, saveButton);

  return {
    panelElem,
    cancelButton,
    saveButton,
  };
}
