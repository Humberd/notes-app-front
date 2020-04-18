import TabChangeInfo = chrome.tabs.TabChangeInfo;
import Tab = chrome.tabs.Tab;

export interface TabUpdateEvent {
  tabId: number,
  changeInfo: TabChangeInfo,
  tab: Tab
}
