function loadData() {
  let data = localStorage.getItem("players");

  if (data) {
    state.players = JSON.parse(data);
  }

  let savedGameEnd = localStorage.getItem("gameEnded");

  if (savedGameEnd === "true") {
    state.gameEnded = true;
  } else {
    state.gameEnded = false;
  }

  document.getElementById("winner-overlay").classList.add("hidden");

  render();
}

function saveData() {
  localStorage.setItem("players", JSON.stringify(state.players));
}
