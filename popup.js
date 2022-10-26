console.log("popup is running");

// In-page cache of the user's options
const options = {};

const popupInput = document.querySelector("#popupInput");

// Initialize the form with the user's option settings
chrome.storage.sync.get({ popupInput }, (data) => {
  options.popupInput = data.popupInput;
  popupInput.value = data.popupInput;
});

// Immediately persist options changes
popupInput.addEventListener("keyup", (event) => {
  options.popupInput = event.target.value;
  chrome.storage.sync.set({ popupInput: options.popupInput });
});

// Exchange information between popup.js and content.js
document.querySelector("#notifyme").addEventListener("click", (e) => {
  console.log("clicked notify me");
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const message = {
      text: "hello from popup with input value: " + options.popupInput,
    };
    chrome.tabs.sendMessage(tabs[0].id, message);
  });
});

// Inject javascript file on click
document.querySelector("#injectjs").addEventListener("click", (e) => {
  console.log("clicked injectjs");
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      files: ["injectContent.js"],
    });
  });
});

// Open options page
document.querySelector("#goToOptions").addEventListener("click", (e) => {
  console.log("clicked open options");
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL("options.html"));
  }
});
