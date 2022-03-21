function deleteMood(id) {
  chrome.storage.sync.get("activeMood", async ({ activeMood }) => {
    if (activeMood === id) {
      alert("You cant delete active mood.");
    } else {
      if (confirm("Confirm delete!")) {
        chrome.storage.sync.get("moods", async ({ moods }) => {
          await chrome.bookmarks.removeTree(moods[id].toString());
          document.getElementById("h5").innerHTML +=
            "<br>" + id.toString() + "  " + moods[id].toString();
          delete moods[id];

          chrome.storage.sync.set({ moods });

          window.close();
        });
      }
    }
  });
}
