# Chrome Extension
https://developer.chrome.com/docs/extensions/
https://developer.chrome.com/docs/extensions/reference/


Chrome extensions have full access to the Browser-(`chrome`)-API and therefore can change the behaviour and look and feel of the browser.

## Developer tools
- Active 'Developer Mode' in Chrome Extensions Manager
- The popup.js and background.js can be debuged through the link to the developer tools in the extension manager page of chrome
- Chrome Extension Developer Tools for VS-Code: aaravb.chrome-extension-developer-tools
- Chrome Extension Manifest JSON Schema fpr VS-Code: cezaraugusto.vscode-chrome-extesion-manifest-json-schema
- Chrome Extension for hot reloading: https://chrome.google.com/webstore/detail/extensions-reloader/fimgfedafeadlieiabdeeaodndnlbhid/related?hl=de

## The extension `manifest.json`
```json
{
  "name": "Example Chrome Extension",
  "version": "0.0.3",
  "manifest_version": 3,
  "content_scripts": [
    {
      "matches" : [
          "https://www.google.com/search*",
          "https://duckduckgo.com/*"
      ],
      "js" :  ["content.js"]
    }
  ],
  "background": {
      "service_worker": "background.js"
  },
  "action": {
      "default_icon": {              
        "32": "obsidian32.png",    
        "48": "obsidian48.png"
      },
      "default_title": "Example - Click Me",  
      "default_popup": "popup.html" 
    },
  "permissions": ["activeTab", "scripting", "tabs", "storage"]
}
```
- Defines the capabilities, permissions and entrypoints of the extension
- ``"matches"`` option defines on which pages the content scripts should be loaded
    - to load on all pages use `"<all_urls>"`
    - can use wildcards `*`

## The `background.js`
- Runs when the chrome browser is launched.
- Runs as service worker in the background.
- Can be debugged through the link in the chrome extension settings.
- Can not access the DOM.
- Can communicate to tabs through the `chrome.tabs.sendMessage(...)` API.
- Can e.q. handle storing extension settings in the background.
- IMPORTANT: `chrome.action.onClick`  will not fire if a ``"default_popup"`` is defined in ``manifest.json``!

### The `install.html`
- Is optionally loaded after successful installation of the background service worker because manually defined so in the `background.js`

## The `popup.html`
- Is loaded into the opoup window below the Extension Icon every time the extension action button is clicked
- Maximum size of 800x600

### The `popup.js`
- Is loaded through the `popup.html` inside it's "own window"
- Can not access the current page DOM but only the `popup.html` DOM
- Can communicate to tabs through the `chrome.tabs.sendMessage(...)` API

## The `content.js`
- Is run on any new page load if the current URL matches on of the listed `matches` of the `manifest.json`
- Can access the DOM of the current browser window.
- Can receive messages from ``background`.js`` or ``popup.js`` through the `chrome.runtime.onMessage` API

## The `options.html`
- Is loaded on *extension action icon right click -> options*
- Can e.q. be used for visually managing extension settings

### The `options.js`
- Is loaded through the `options.hml`
- Can e.q. store extension settings through the `chrome.storage.sync` API

## The `injectContent.js`
- Is injected into the current tab by the `chrome.scripting.executeScript(...)` API 

## Useful links resources
https://developer.chrome.com/docs/extensions/reference/storage/
https://developer.chrome.com/docs/extensions/mv3/options/

## Credit
Thanks for the icons @[elias ruiz](https://eliasruiz.com/) on https://icon-icons.com/icon/Obsidian-Alt-macOS-BigSur/189887