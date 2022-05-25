async function addMoodtoMoods() {
  let text = document.getElementById("newMoodName").value;

  await chrome.storage.sync.get("moods", async ({ moods }) => {
    if (!(text in moods)) {
      document.getElementById("h5").innerHTML = text;
      if (Object.keys(moods).length > 0) updateMood("ignore");
      await addMood(moods, text);
      await chrome.windows.create({
        url: "http://www.google.com",
      });
      await chrome.storage.sync.set({ activeMood: text });
    } else {
      alert("Mood by this name already exists. Choose another name!");
    }
  });
}

async function addMood(moods, title) {
  await chrome.bookmarks.create(
    {
      title: title,
      url: null,
    },
    async (bookmarkItem) => {
      chrome.bookmarks.create({
        title: "home",
        url: "http://www.google.com",
        parentId: bookmarkItem.id,
      });
      moods[title] = bookmarkItem.id;
      await chrome.storage.sync.set({ moods });

      document.getElementById("h5").innerHTML = "";
      for (var key in moods) {
        document.getElementById("h5").innerHTML +=
          key + ":" + moods[key] + "<br>";
      }
    }
  );
  window.close();
}
