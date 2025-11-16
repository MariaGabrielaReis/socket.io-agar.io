// connect to the socker server
const socket = io.connect("http://localhost:9000");

const init = async () => {
  const initialData = await socket.emitWithAck("init", {
    playerName: player.name,
  });

  // our await has rasolved, so start "tocking"
  setInterval(async () => {
    socket.emit("tock", {
      xVector: player.xVector ?? 0.1,
      yVector: player.yVector ?? 0.1,
    });
  }, 33);

  orbs = initialData.orbs;
  player.indexInPlayers = initialData.indexInPlayers;

  draw(); //is in the canvas
};

socket.on("tick", playersList => {
  players = playersList;
  if (players[player.indexInPlayers].playerData) {
    player.locX = players[player.indexInPlayers].playerData.locX;
    player.locY = players[player.indexInPlayers].playerData.locY;
  }
});

socket.on("orbSwitch", orbData => {
  // the server just told us that an orb was absorb. Replace it in the orbs array
  orbs.splice(orbData.capturedOrb, 1, orbData.newOrb);
});

socket.on("playerAbsorbed", absorbData => {
  // the server just told us that an player was absorb
  console.log(absorbData);
});

socket.on("playerAbsorbed", absorbData => {
  document.querySelector(
    "#game-message",
  ).innerHTML = `${absorbData.absorbed} was absorbed by ${absorbData.absorbedBy}`;
  document.querySelector("#game-message").style.opacity = 1;
  window.setTimeout(() => {
    document.querySelector("#game-message").style.opacity = 0;
  }, 2000);
});

socket.on("updateLeaderBoard", leaderBoardList => {
  leaderBoardList.sort((a, b) => {
    return b.score - a.score;
  });
  document.querySelector(".leader-board").innerHTML = "";
  leaderBoardList.forEach(p => {
    if (!p.name) return;

    document.querySelector(
      ".leader-board",
    ).innerHTML += `<li class="leaderboard-player">${p.name} - ${p.score}</li>`;
  });
});
