updatemood.addEventListener("click", async () => {
  await updateMood();
});

chrome.storage.sync.get("moods", ({ moods }) => {
  chrome.storage.sync.get("activeMood", ({ activeMood }) => {
    if (Object.keys(moods).length == 0) {
      document.getElementById("moods").style.display = "none";
      document.getElementById("updatemood").style.display = "none";
      document.getElementById("prompt").style.display = "block";
      document.getElementById("newMoodName").setAttribute("type", "text");
    } else {
      document.getElementById("newMoodName").setAttribute("type", "hidden");
      document.getElementById("prompt").style.display = "none";
      document.getElementById("moods").style.display = "block";
      if (activeMood == "") {
        document.getElementById("updatemood").style.display = "none";
      } else {
        document.getElementById("updatemood").style.display = "block";
      }

      if (Object.keys(moods).length == 1) {
        document.getElementById("moods").style.height = "60px";
      } else if (Object.keys(moods).length == 2) {
        document.getElementById("moods").style.height = "110px";
      } else if (Object.keys(moods).length == 3) {
        document.getElementById("moods").style.height = "160px";
      }
    }
  });
});

addMoodListTiles();

async function addMoodListTiles() {
  await chrome.storage.sync.get("moods", async ({ moods }) => {
    await chrome.storage.sync.get("activeMood", ({ activeMood }) => {
      for (let key in moods) {
        const each = document.createElement("li");

        each.setAttribute("id", key);
        const p = document.createElement("p");
        p.className = "moodName";
        p.innerText = key;
        each.appendChild(p);

        if (key === activeMood) {
          each.className = "activeMoodTile";
        } else {
          each.className = "eachMoodTile";

          const overWrite = document.createElement("img");
          overWrite.setAttribute("src", "assets/overWrite.png");
          overWrite.setAttribute("alt", "na");
          overWrite.setAttribute("height", "20px");
          overWrite.setAttribute("width", "20px");
          overWrite.className = "overWrite";
          overWrite.setAttribute("id", key + " .");
          each.appendChild(overWrite);

          const deletes = document.createElement("img");
          deletes.setAttribute("src", "assets/trash.svg");
          deletes.setAttribute("alt", "na");
          deletes.setAttribute("height", "20px");
          deletes.setAttribute("width", "20px");
          deletes.className = "moreoption";
          deletes.setAttribute("id", key + " .");
          each.appendChild(deletes);
        }

        document.getElementById("moods").appendChild(each);
      }

      // Set gotomood function for all not selected
      document.querySelectorAll(".eachMoodTile p").forEach((tile) => {
        tile.addEventListener("click", async () => {
          // document.getElementById("h5").innerHTML += tile.innerText + " <br>";
          await gotoMood(tile.innerText);
        });
      });

      document.querySelectorAll(".moreoption").forEach((button) => {
        button.addEventListener("click", async () => {
          // document.getElementById("h5").innerHTML +=
          // button.id.substring(0, button.id.length - 2) + " <br>";

          deleteMood(button.id.substring(0, button.id.length - 2));
        });
      });

      document.querySelectorAll(".overWrite").forEach((button) => {
        button.addEventListener("click", async () => {
          // document.getElementById("h5").innerHTML +=
          // button.id.substring(0, button.id.length - 2) + " <br>";

          overWriteMoods(button.id.substring(0, button.id.length - 2));
        });
      });

      document.querySelectorAll(".activeMoodTile p").forEach((tile) => {
        tile.addEventListener("click", async () => {
          // document.getElesmentById("h5").innerHTML += tile.innerText + " <br>";
          // await updateMood(tile.innerText);
          // updateMood();
          await gotocurrentMood();
        });
      });
    });
  });
}
