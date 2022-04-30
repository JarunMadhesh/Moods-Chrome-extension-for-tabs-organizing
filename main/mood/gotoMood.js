async function ifMoodAvailable(bookmarks) {
  // closing all the opened tabs
  await chrome.tabs.query({}, function (tabs) {
    for (var i = 0; i < tabs.length; i++) {
      chrome.tabs.remove(tabs[i].id);
    }
  });

  // opening all the tabs in the new opened Mood
  bookmarks.forEach((bk) => {
    chrome.tabs.create({ url: bk.url });
    // window.open(bk.url, "_blank");
    p.innerHTML += bk.title + "<br><br>";
  });
}

//
//
// If the Mood is not available, It will output an error message
// This will not be the case at most times.
function ifMoodNotAvailable(err) {
  p.innerHTML = err.toString();
}

async function gotoMood(selectedMood) {
  //Get the active mood name from the storage

  title = selectedMood;

  chrome.storage.sync.get("activeMood", async ({ activeMood }) => {
    if (activeMood != "") {
      await updateMood("ignore");
    }

    await chrome.storage.sync.set({ activeMood: selectedMood });

    chrome.storage.sync.get("moods", ({ moods }) => {
      id = moods[selectedMood];
      var getBookmarks = chrome.bookmarks.getChildren(id.toString());
      getBookmarks.then(ifMoodAvailable, ifMoodNotAvailable);
    });
  });
}

async function gotocurrentMood() {
  //Get the active mood name from the storage
  chrome.storage.sync.get("activeMood", ({ activeMood }) => {
    title = activeMood;

    chrome.storage.sync.get("moods", ({ moods }) => {
      id = moods[activeMood];
      var getBookmarks = chrome.bookmarks.getChildren(id.toString());
      getBookmarks.then(ifMoodAvailable, ifMoodNotAvailable);
    });
  });
}
