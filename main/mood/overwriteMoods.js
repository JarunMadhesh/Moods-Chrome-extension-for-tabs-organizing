async function overWriteMoods(activeMood) {
  if (confirm("Confirm overwrite!")) {
    await chrome.storage.sync.get("moods", async ({ moods }) => {
      await chrome.storage.sync.set({ activeMood }).then(() => {
        updateMood(" overwritten");
      });
    });
  }
}
