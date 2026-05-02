function saveMatch(winnerIndex) {
  console.log("savematches worked");

  let matches = JSON.parse(localStorage.getItem("matches")) || [];

  let newMatch = {
    id: Date.now(),
    players: JSON.parse(JSON.stringify(state.players)),
    winnerIndex: winnerIndex,
    date: new Date().toLocaleString(),
  };

  matches.push(newMatch);

  localStorage.setItem("matches", JSON.stringify(matches));
}

function loadMatch(id) {
  let matches = JSON.parse(localStorage.getItem("matches")) || [];

  let match = matches.find((m) => m.id == id);

  if (!match) return;

  state.players = match.players;
  state.activePlayerIndex = null;
  state.gameEnded = true;

  localStorage.setItem("players", JSON.stringify(state.players));
  localStorage.setItem("winnerIndex", match.winnerIndex);
  localStorage.setItem("gameEnded", "true");

  document.getElementById("alert-container").innerHTML = "";

  render();

  let winnerName = state.players[match.winnerIndex]?.name;
  if (winnerName) {
    showWinnerOverlay(winnerName);
  }
}

function showMatches() {
  let matches = JSON.parse(localStorage.getItem("matches")) || [];

  const screen = document.getElementById("matches-screen");
  const list = document.getElementById("matches-list");

  list.innerHTML = "";

  if (matches.length === 0) {
    list.innerHTML = "<p>لا توجد مباريات محفوظة</p>";
  }

  matches.forEach((match) => {
    let div = document.createElement("div");
    div.className = "match-card";

    div.innerHTML = `
      <div>🏆 الفائز: ${match.players[match.winnerIndex]?.name || "غير معروف"}</div>
      <div>👥 عدد اللاعبين: ${match.players.length}</div>
      <div>📅 ${match.date}</div>
      <button data-id="${match.id}" class="load-match">استرجاع</button>
    `;

    list.appendChild(div);
  });

  // ربط الأزرار
  document.querySelectorAll(".load-match").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let id = e.target.dataset.id;

      loadMatch(id);

      // 👇 إغلاق الشاشة بعد الاسترجاع
      screen.classList.add("hidden");
    });
  });

  // 👇 إظهار الشاشة
  screen.classList.remove("hidden");
}
