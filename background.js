chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "OFF",
  })

  chrome.contextMenus.create({
    "id": "sampleContextMenu",
    "title": "Sample Context Menu",
    "contexts": ["selection"]
  });
})

let mianyang = "http://www.lspta.com.cn/"
let leshan = "http://www.myrsks.com.cn/"
chrome.action.onClicked.addListener(async (tab) => {
  if (tab.url.startsWith(mianyang) || tab.url.startsWith(leshan)) {
    const prevState = await chrome.action.getBadgeText({ tabId: tab.id })
    const nextState = prevState === "ON" ? "OFF" : "ON"

    await chrome.action.setBadgeText({
      tabId: tab.id,
      text: nextState,
    })

    if (nextState === "ON") {
      await chrome.scripting.insertCSS({
        files: ["focus-mode.css"],
        target: { tabId: tab.id },
      })
    } else if (nextState === "OFF") {
      await chrome.scripting.removeCSS({
        files: ["focus-mode.css"],
        target: { tabId: tab.id },
      })
    }
  }
})

chrome.commands.onCommand.addListener(command => {
  chrome.tabs.query({currentWindow: true}, tabs => {
    const activeIndex = tabs.findIndex((tab) => tab.active)
    const lastTab = tabs.length - 1
    let newIndex = -1
    if(command === "flip-tabs-forward") {
      newIndex = activeIndex === lastTab ? 0 : activeIndex + 1
    } else if(command === "flip-tabs-backwards") {
      newIndex = activeIndex === 0 ? lastTab : activeIndex - 1
    }
    chrome.tabs.update(tabs[newIndex].id, {active: true, highlighted: true})
  })
})

chrome.runtime.onMessage.addListener((message, callback) => {
  const tabId = getForegroundTabId();
  if (message.data === "setAlarm") {
    chrome.alarms.create({delayInMinutes: 5})
  } else if (message.data === "runLogic") {
    chrome.scripting.executeScript({file: 'logic.js', tabId});
  } else if (message.data === "changeColor") {
    chrome.scripting.executeScript(
        {func: () => document.body.style.backgroundColor="orange", tabId});
  };
})