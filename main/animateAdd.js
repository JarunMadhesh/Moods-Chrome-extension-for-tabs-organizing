addmood.addEventListener("click", async () => {
  tempAdd();
});

newMoodName.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    tempAdd();
  }
});

async function tempAdd() {
  var input = document.getElementById("newMoodName");
  document.getElementById("h4").innerHTML += input.innerText;

  if (input.getAttribute("type") === "text") {
    if (input.value.length == 0) {
      alert("Please enter mood name");
    } else {
      addMoodtoMoods();
      input.setAttribute("type", "hidden");
    }
  } else {
    input.setAttribute("type", "text");
  }
}
