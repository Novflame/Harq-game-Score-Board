const newscoreBtn = document.getElementById("new-btn");
const btn = document.getElementById("btn");

btn.addEventListener("click", () => {
  const { name } = getValues();

  if (!name) {
    showAlert("أدخل اسم لاعب", "warning");
    return;
  }

  addToTable();
  document.getElementById("name").value = "";
});

document.getElementById("close-overlay").addEventListener("click", () => {
  document.getElementById("winner-overlay").classList.add("hidden");
  document.body.classList.remove("winner");
  document.getElementById("game-container").classList.remove("hidden");
});

document.getElementById("back-btn").addEventListener("click", () => {
  document.getElementById("game-container").classList.add("hidden");
  document.getElementById("start-screen").classList.remove("hidden");
});

document.getElementById("reset-btn").addEventListener("click", () => {
  let confirmReset = confirm("هل تريد إعادة تعيين اللعبة؟");

  if (confirmReset) {
    resetGame();
  }
  checkWinner();
});

document.getElementById("back-btn").addEventListener("click", () => {
  document.getElementById("matches-screen").classList.add("hidden");
  document.getElementById("start-screen").classList.remove("hidden");
});

const openBtn = document.getElementById("open-matches-btn");
if (openBtn) {
  openBtn.addEventListener("click", () => {
    document.getElementById("start-screen").classList.add("hidden");
    showMatches();
  });
}

newscoreBtn.addEventListener("click", () => {
  const value = Number(document.getElementById("new-score").value);

  if (isNaN(value)) {
    showAlert("أدخل سكور صحيح", "warning");
    return;
  }

  addScore();
});

window.addEventListener("load", () => {
  loadData();
  const hasPlayers = localStorage.getItem("players");
  if (hasPlayers) {
    document.getElementById("start-screen").classList.add("hidden");
    document.getElementById("game-container").classList.remove("hidden");
  }

  const startScreen = document.getElementById("start-screen");
  const gameContainer = document.getElementById("game-container");

  const newGameBtn = document.getElementById("new-game-btn");

  if (newGameBtn) {
    newGameBtn.addEventListener("click", () => {
      resetGame();
      startScreen.classList.add("hidden");
      gameContainer.classList.remove("hidden");
    });
  }
  loadData();
});
