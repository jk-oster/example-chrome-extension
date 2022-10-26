// Open options page
document.querySelector("#goToOptions").addEventListener("click", (e) => {
    console.log("clicked open options");
    if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
    } else {
        window.open(chrome.runtime.getURL("options.html"));
    }
});