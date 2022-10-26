// Saves options to chrome.storage
function save_options() {
  const color = document.getElementById("color").value;
  const likesColor = document.getElementById("like").checked;
  const popupInput = document.getElementById("popupInput").value;
  chrome.storage.sync.set(
    {
      favoriteColor: color,
      likesColor: likesColor,
      popupInput: popupInput
    },
    () => {
      // Update status to let user know options were saved.
      var status = document.getElementById("status");
      status.textContent = "Options saved.";
      setTimeout(() => status.textContent = "", 750);
    }
  );
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get(
    {
      favoriteColor: "red",
      likesColor: true,
      popupInput: "Default from options"
    },
    (data) => {
      document.getElementById("color").value = data.favoriteColor;
      document.getElementById("like").checked = data.likesColor;
      document.getElementById("popupInput").value = data.popupInput;
    }
  );
}
document.addEventListener("DOMContentLoaded", restore_options);
document.getElementById("save").addEventListener("click", save_options);
