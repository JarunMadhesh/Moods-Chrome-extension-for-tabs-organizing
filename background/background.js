let activeMood = "";

let moods = {
  mood1: "123",
  mood2: "32",
  mood3: "42",
  mood4: "12",
};

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ activeMood });
  chrome.storage.sync.set({ moods });

  console.log("Default mood set to ", `activemood: ${activeMood}`);
});

chrome.runtime.onSuspend.addListener(function () {
  console.log("Unloading.");

  chrome.tabs.create({
    title: "asdf",
    url: null,
  });
});

chrome.bookmarks.onChanged.addListener((id, obj) => {
  // if(obj.url==null && obj.title) {
  // }
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
