let activeMood = "";

let moods = {};

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ activeMood });
  chrome.storage.sync.set({ moods });

  console.log("Default mood set to ", `activemood: ${activeMood}`);
});

// chrome.runtime.onSuspend.addListener(function async() {
//   // console.log("Chrome closed");

//   if (prompt("Do you want to update?")) {
//     chrome.storage.sync.get("activeMood", async ({ activeMood }) => {
//       if (activeMood != "") {
//         await updateMoods("ignore");
//       }

//       // activeMood = "";
//       // chrome.storage.sync.set({ activeMood });
//     });
//   }
// });

chrome.runtime.onStartup.addListener(function () {
  activeMood = "";
  chrome.storage.sync.set({ activeMood });
});

chrome.bookmarks.onCreated.addListener((id, bookmark) => {
  // document.getElementById("h5").innerHTML += bookmark.url + bookmark.title;
  if (bookmark.url == null) {
    chrome.storage.sync.get("moods", ({ moods }) => {
      moods[bookmark.title] = id;

      chrome.storage.sync.set({ moods });
    });
  }
});
