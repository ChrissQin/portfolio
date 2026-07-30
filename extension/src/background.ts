const INSTAGRAM_HOST = "www.instagram.com";

chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.id || !tab.url) {
    return;
  }

  let url: URL;
  try {
    url = new URL(tab.url);
  } catch {
    return;
  }

  if (url.hostname !== INSTAGRAM_HOST) {
    await chrome.tabs.create({ url: "https://www.instagram.com/" });
    return;
  }

  try {
    await chrome.tabs.sendMessage(tab.id, { type: "TOGGLE_PANEL" });
  } catch {
    // Content script missing (e.g. tab open before install). Reload once, then open.
    await chrome.storage.session.set({ igucOpenOnLoad: true });
    await chrome.tabs.reload(tab.id);
  }
});
