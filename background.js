console.log("background sw running");

// Extension event listeners are a little different from the patterns you may have seen in DOM or
// Node.js APIs. The below event listener registration can be broken in to 4 distinct parts:
//
// * chrome      - the global namespace for Chrome's extension APIs
// * runtime     – the namespace of the specific API we want to use
// * onInstalled - the event we want to subscribe to
// * addListener - what we want to do with this event
// * storage     - 
//
// See https://developer.chrome.com/docs/extensions/reference/events/ for additional details.
chrome.runtime.onInstalled.addListener(async () => {

    // Set inital extension options
  const options = {
    favoriteColor: "red",
    likesColor: false,
    popupInput: "First time here",
  };
  chrome.storage.sync.set(options, () => {
    console.log("Initial settings saved", options);
  });

  // While we could have used `let url = "install.html"`, using runtime.getURL is a bit more robust as
  // it returns a full URL rather than just a path that Chrome needs to be resolved contextually at
  // runtime.
  let url = chrome.runtime.getURL("install.html");

  // Open a new tab pointing at our page's URL
  let tab = await chrome.tabs.create({ url });
  console.log(`Created tab ${tab.id}`);
});

// Handle Click to Extension Action Button
// IMPORTANT: Will not fire if a "default_popup" is defined in manifest
chrome.action.onClicked.addListener((tab) => {
  console.log("action clicked");
  // Send message to current tab
  let msg = {
    text: "hello from background - clicked extension action button",
  };
  chrome.tabs.sendMessage(tab.id, msg);
});

// Listen to storage changes
chrome.storage.onChanged.addListener(function (changes, namespace) {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    console.log(
      `Storage key "${key}" in namespace "${namespace}" changed.`,
      `Old value was "${oldValue}", new value is "${newValue}".`
    );
  }
});
