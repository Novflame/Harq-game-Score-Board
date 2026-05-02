function render() {
  const headRow = document.getElementById("head-row");
  const scoreRow = document.getElementById("score-row");

  headRow.innerHTML = "";
  scoreRow.innerHTML = "";

  state.players.forEach((player, index) => {
    let th = document.createElement("th");
    th.textContent = player.name;
    th.dataset.index = index;

    if (player.isOut) {
      th.classList.add("disabled");
    }

    th.addEventListener("click", function () {
      state.activePlayerIndex = index;
      highlightActive(this);
    });

    headRow.appendChild(th);

    let td = document.createElement("td");
    td.dataset.index = index;

    let winnerIndex = Number(localStorage.getItem("winnerIndex"));

    if (winnerIndex === index && state.gameEnded) {
      th.classList.add("winner-cell");
      td.classList.add("winner-cell");
    }

    player.scores.forEach((score) => {
      let div = document.createElement("div");
      div.textContent = score;
      td.appendChild(div);
    });

    scoreRow.appendChild(td);
  });
}

function getStatusClass(score) {
  if (score >= 31) return "loser";
  if (score >= 17) return "dangerzone";
  return "safezone";
}

function getValues() {
  return {
    name: document.getElementById("name").value.trim(),
  };
}

function playWinSound() {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  const oscillator = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(600, audioCtx.currentTime);

  gain.gain.setValueAtTime(0.2, audioCtx.currentTime);

  oscillator.connect(gain);
  gain.connect(audioCtx.destination);

  oscillator.start();

  setTimeout(() => {
    oscillator.stop();
  }, 300);
}

function showWinnerOverlay(name) {
  let overlay = document.getElementById("winner-overlay");
  let text = document.getElementById("winner-name");

  text.textContent = `🏆 الفائز: ${name}`;

  overlay.classList.remove("hidden");
  document.body.classList.add("winner");

  state.gameEnded = true;
  localStorage.setItem("gameEnded", "true");

  let winnerIndex = state.players.findIndex((p) => p.name === name);

  localStorage.setItem("winnerName", name);

  if (winnerIndex !== -1) {
    localStorage.setItem("winnerIndex", winnerIndex);
  }

  playWinSound();
}

function clearInputs() {
  document.getElementById("name").value = "";
  document.getElementById("score").value = "";
  document.getElementById("new-score").value = "";
}

function highlightActive(selectedTh) {
  let all = document.querySelectorAll("#head-row th");

  all.forEach((th) => {
    th.style.background = "";
  });

  selectedTh.style.background = "yellow";
}

function showAlert(message, type = "success") {
  const container = document.getElementById("alert-container");

  let div = document.createElement("div");
  div.className = `alert alert-${type}`;
  div.textContent = message;

  container.appendChild(div);

  setTimeout(() => {
    div.remove();
  }, 2500);
}
