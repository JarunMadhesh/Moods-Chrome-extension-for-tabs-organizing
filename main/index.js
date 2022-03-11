updatemood.addEventListener("click", async () => {
  await updateMood();
});

isAddOpen = false;

// addnewMood();

addMoodListTiles();

// function addnewMood() {
//   var div = document.getElementById("newmood");
//   div.innerHTML = "";
//   if (!isAddOpen) {
//     var newdiv = document.createElement("div");
//     newdiv.innerText = "+";
//     new.addEventListener("click", () => {
//       isAddOpen = true;
//     });
//     div.appendChild(newdiv);
//   } else {
//     var label = document.createElement("label");
//     label.setAttribute("for", "input");
//     var input = document.createElement("input");
//     input.setAttribute("type", "text");
//     input.setAttribute("id", "input");
//     var submit = document.createElement("button");
//     submit.setAttribute("type", "button");
//     submit.setAttribute("value", "submit");
//     submit.setAttribute("id", "submit");
//     div.appendChild(label);
//     div.appendChild(input);
//     div.appendChild(submit);
//     submit.addEventListener("click", async () => {
//       addMoodtoMoods();
//     });
//   }
// }

async function addMoodListTiles() {
  await chrome.storage.sync.get("moods", async ({ moods }) => {
    await chrome.storage.sync.get("activeMood", ({ activeMood }) => {
      for (let key in moods) {
        const each = document.createElement("li");

        if (key === activeMood) {
          each.className = "activeMoodTile";
        } else {
          each.className = "eachMoodTile";
        }

        each.setAttribute("id", key);
        const p = document.createElement("p");
        p.className = "moodName";
        p.innerText = key;
        each.appendChild(p);

        const button = document.createElement("button");
        button.innerText = ":";

        each.appendChild(button);

        document.getElementById("moods").appendChild(each);
      }

      // Set gotomood function for all not selected
      document.querySelectorAll(".eachMoodTile").forEach((tile) => {
        tile.addEventListener("click", async () => {
          document.getElementById("h5").innerHTML += tile.innerText + " <br>";
          await gotoMood(tile.innerText);
        });
      });

      document.querySelectorAll(".activeMoodTile").forEach((tile) => {
        tile.addEventListener("click", async () => {
          document.getElementById("h5").innerHTML += tile.innerText + " <br>";
          // await updateMood(tile.innerText);
          updateMood();
        });
      });
    });
  });
}
