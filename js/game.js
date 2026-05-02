
function addToTable() {
  if (state.gameEnded) {
    showAlert("game over", "error");
    return;
  }

  const { name } = getValues();

  let index = state.players.length;

  state.players.push({
    name: name,
    scores: [],
    isOut: false
  });

  let th = document.createElement("th");
  th.textContent = name;
  th.dataset.index = index;

  th.addEventListener("click", function () {
    state.activePlayerIndex = Number(this.dataset.index);
    highlightActive(this);
  });

  document.getElementById("head-row").appendChild(th);

  let td = document.createElement("td");
  td.dataset.index = index;

  document.getElementById("score-row").appendChild(td);

  saveData();
}

function addScore() {
  if (state.gameEnded) {
    showAlert("game over", "error");
    return;
  }

  if (state.activePlayerIndex === null) return;

  let player = state.players[state.activePlayerIndex];

  if (player.isOut) {
    showAlert("هذا اللاعب خسر", "error");
    return;
  }

  let value = Number(document.getElementById("new-score").value);

  if (isNaN(value)) {
    showAlert("أدخل قيمة صحيحة", "warning");
    return;
  }

  let last = player.scores.length
    ? player.scores[player.scores.length - 1]
    : 0;

  let total = last + value;

  player.scores.push(total);
  saveData();

  if (total >= 31) {
    player.isOut = true;

    let th = document.querySelector(
      `th[data-index="${state.activePlayerIndex}"]`
    );

    th.style.pointerEvents = "none";
    th.style.opacity = "0.5";
  }

  let column = document.querySelector(
    `td[data-index="${state.activePlayerIndex}"]`
  );

  let div = document.createElement("div");
  div.textContent = total;

  if (total >= 31) {
    div.classList.add("loser");
  } else if (total >= 17) {
    div.classList.add("dangerzone");
  } else {
    div.classList.add("safezone");
  }

  column.appendChild(div);

  document.getElementById("new-score").value = "";

  checkWinner();
}
function resetGame() {
  state.players = [];
  state.activePlayerIndex = null;
  state.gameEnded = false;

  localStorage.removeItem("players");

  document.getElementById("head-row").innerHTML = "";
  document.getElementById("score-row").innerHTML = "";

  document.body.classList.remove("winner");
  document.getElementById("winner-overlay").classList.add("hidden");
}

function checkWinner() {
  if (state.gameEnded) return;

  let activePlayers = state.players.filter(p => !p.isOut);

  if (activePlayers.length === 1) {
    state.gameEnded = true;
    let winner = activePlayers[0];
    state.winnerName = winner.name;
    let winnerIndex = state.players.findIndex(p => p.name === winner.name);

    saveMatch(winnerIndex);
    showWinnerOverlay(winner.name);
  }
}


