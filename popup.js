// Listen for messages from content.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.totalExperience !== undefined) {
    document.getElementById("experience").textContent =
      request.totalExperience.toString() + " years";
  }
});

// Request to scrape the experience when popup opens
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  chrome.scripting.executeScript(
    {
      target: { tabId: tabs[0].id },
      files: ["content.js"],
    },
    () => {
      console.log("Content script injected.");
    }
  );
});
