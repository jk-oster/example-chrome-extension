console.log("contentjs is running");

alert('i have been injected by chrome because of manifest');

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message.text);
  alert(message.text);
});