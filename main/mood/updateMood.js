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

function searchForMoodIDbyName(children) {
  children.forEach(function (bookmark) {
    if (bookmark.children) {
      p.innerHTML +=
        "Folder name: " + bookmark.title + " " + bookmark.id + "<br>";
      if (tempActiveMood == bookmark.title) {
        document.getElementById("h4").innerHTML += "id added ";
        id = bookmark.id;
      }
      searchForMoodIDbyName(bookmark.children);
    }
  });
}

async function updateMood() {
  tabs = await chrome.tabs.query({ currentWindow: true }); // active:true
  await chrome.storage.sync.get("activeMood", async ({ activeMood }) => {
    p.innerHTML += "<br>" + activeMood + "<br>";
    tempActiveMood = activeMood;

    await chrome.storage.sync.get("moods", async ({ moods }) => {
      tempMoods = moods;
      id = moods[activeMood];

      document.getElementById("h4").innerHTML +=
        " Moods length: " + Object.keys(moods).length + "<br>";

      // for (let key in moods) {
      //   document.getElementById("h4").innerHTML +=
      //     key + ":" + moods[key] + "<br>";
      // }

      // await chrome.bookmarks.getTree(function (bookmarks) {
      //   searchForMoodIDbyName(bookmarks);

      //   // chrome.bookmarks.get(id.toString()).then(ifAvailable, ifNotAvailable);
      // });

      p.innerHTML += id.toString() + "<br>";

      ifAvailable(id);
    });
  });
}

// async function updateMood(activeMood) {
//   tabs = await chrome.tabs.query({ currentWindow: true }); // active:true
//   p.innerHTML += "<br>" + activeMood + "<br>";
//   tempActiveMood = activeMood;

//   await chrome.storage.sync.get("moods", async ({ moods }) => {
//     tempMoods = moods;
//     id = moods[activeMood];

//     document.getElementById("h4").innerHTML +=
//       " Moods length: " + Object.keys(moods).length + "<br>";

//     p.innerHTML += id.toString() + "<br>";

//     ifAvailable(id);
//   });
// }
