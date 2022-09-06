
chrome.contextMenus.create({
  id: 'ChequeasReport',
  title: 'Fetch Report',
  contexts: ['selection']
})

const addRecord = async (selectionText) => {
  const { records } = await chrome.storage.local.get(['records']);

  if (records && records.length) {
    records.push(selectionText);
    await chrome.storage.local.set({
      records: records
    })
  } else {
    await chrome.storage.local.set({
      records: [selectionText]
    })
  }
  
}


function contextClick(info, tab) {
  const { menuItemId, selectionText } = info
  console.log(selectionText);
  if (menuItemId === 'ChequeasReport') {
   executeScript(tab.id, selectionText);
  }
}


chrome.contextMenus.onClicked.addListener(contextClick);

const executeScript = async (tabId, selectionText) => {

  await addRecord(selectionText);

  await chrome.storage.local.set({
    currentText: selectionText
  });

  chrome.scripting.executeScript({
    files: ['scripts/fetch-report.js'],
    target: { tabId },
  }, () => {
    console.log("Script Executed!!");
    chrome.tabs.sendMessage(tabId,{
      message: "REFRESH",
      email: selectionText
    })
  });
}
