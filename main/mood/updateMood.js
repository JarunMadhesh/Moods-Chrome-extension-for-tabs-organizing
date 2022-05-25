let p = document.getElementById("webpage");
let tabs;

let tempActiveMood = "";
let tempMoods = {};

let id = -1;

function addTabsToMood() {
  chrome.bookmarks.create(
    {
      title: tempActiveMood,
      url: null,
    },
    (newMood) => {
      tempMoods[tempActiveMood] = newMood.id;
      chrome.storage.sync.set({ moods: tempMoods });
      for (let i = 0; i < tabs.length; i++) {
        chrome.bookmarks.create({
          title: tabs[i].title.toString(),
          url: tabs[i].url.toString(),
          parentId: newMood.id,
        });
      }
    }
  );
}

function ifAvailable(moodid) {
  document.getElementById("h5").innerHTML = moodid;
  chrome.bookmarks.removeTree(moodid);

  addTabsToMood();
}

function ifNotAvailable(err) {
  document.getElementById("h5").innerHTML = err.toString();
  addTabsToMood();
}

async function updateMood(type = " updated") {
  tabs = await chrome.tabs.query({ currentWindow: true }); // active:true
  await chrome.storage.sync.get("activeMood", async ({ activeMood }) => {
    tempActiveMood = activeMood;

    await chrome.storage.sync.get("moods", async ({ moods }) => {
      tempMoods = moods;
      id = moods[activeMood];

      document.getElementById("h4").innerHTML +=
        " Moods length: " + Object.keys(moods).length + "<br>";

      p.innerHTML += id.toString() + "<br>";

      ifAvailable(id);
    });
  });
  if (type != "ignore") alert("Successfuly" + type);
  window.close();
}
