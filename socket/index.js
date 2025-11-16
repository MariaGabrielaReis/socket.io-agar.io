const io = require("../servers").io;

const {
  checkForOrbCollisions,
  checkForPlayerCollisions,
} = require("./checkCollisions");
const Orb = require("./classes/Orb");
const Player = require("./classes/Player");
const PlayerConfig = require("./classes/PlayerConfig");
const PlayerData = require("./classes/PlayerData");

// make an orbs array that will host all 500/5000 NOT PLAYER orbs
// every time one is absorb, the server will make a new one
const orbs = [];
const settings = {
  defaultNumberOfOrbs: 500, // number of orbs on the map
  defaultSpeed: 6,
  defaultSize: 6,
  defaultZoom: 1.5,
  worldWidth: 500,
  worldHeight: 500,
  defaultGenericOrbSize: 5, // smaller than players
};
const players = [];
const playersForUsers = [];
let tickTockInterval;

// on server start, to make our initial defaultNumberOfOrbs
initGame();

io.on("connect", socket => {
  // event that runs on join that does init game stuff
  let player = {};

  socket.on("init", (playerObj, ackCallback) => {
    if (players.length === 0) {
      // someone is about to be added to players. Start tick-tocking (with the first players)
      // tick-tock: issue an event to EVERY connected socket, that is playing the game, 30 times per second
      tickTockInterval = setInterval(() => {
        io.to("game").emit("tick", playersForUsers); // send the event to the "game" room
      }, 33); // 1000/30 = 33.333333, there are 33, 30's in 1000 miliseconds or 1 of 30fps
    }

    socket.join("game"); // add this socket to the "game" room
    const playerName = playerObj.playerName;
    const playerConfig = new PlayerConfig(settings); // the data specific to this player that only the player needs to know
    const playerData = new PlayerData(playerName, settings); // the data specific to this player that everyone needs to know
    player = new Player(socket.id, playerConfig, playerData); // a master player object to house both
    players.push(player); // server use only
    playersForUsers.push({ playerData });

    ackCallback({ orbs, indexInPlayers: playersForUsers.length - 1 }); // send the orbs array back as and ack function
  });

  // the client sent over a tock
  socket.on("tock", data => {
    // a tock has come in before the player set up
    // this is because the client kept tocking after disconnect
    if (!player.playerConfig) return;

    speed = player.playerConfig.speed;

    const xV = (player.playerConfig.xVector = data.xVector);
    const yV = (player.playerConfig.yVector = data.yVector);

    if (
      (player.playerData.locX > 5 && xV < 0) ||
      (player.playerData.locX < settings.worldWidth && xV > 0)
    ) {
      // if player can move in the x, move
      player.playerData.locX += speed * xV;
    }
    if (
      (player.playerData.locY > 5 && yV > 0) ||
      (player.playerData.locY < settings.worldHeight && yV < 0)
    ) {
      // if player can move in the y, move
      player.playerData.locY -= speed * yV;
    }

    // check for the tocking player to hit orbs
    const capturedOrb = checkForOrbCollisions(
      player.playerData,
      player.playerConfig,
      orbs,
      settings,
    );
    // function return null if not collision, an index if there is a collision
    if (capturedOrb !== null) {
      // remove the orb that needs to be replaced (at capturedOrb) and add new orb
      orbs.splice(capturedOrb, 1, new Orb(settings));

      // now update the clients with the new orb
      const orbData = { capturedOrb, newOrb: orbs[capturedOrb] };

      // emit to all sockets playing the game, the orbSwitch event so it can update orbs...just the new orb
      io.to("game").emit("orbSwitch", orbData);
      // emit to all sockets playing the game, the updateLeaderBoard event because someone just scored
      io.to("game").emit("updateLeaderBoard", getLeaderBoard());
    }

    // check for player collisions of tocking player
    const absorbData = checkForPlayerCollisions(
      player.playerData,
      player.playerConfig,
      players,
      playersForUsers,
      socket.id,
    );
    if (absorbData) {
      io.to("game").emit("playerAbsorbed", absorbData);
    }
  });

  socket.on("disconnect", () => {
    // check to see if players is empty. If so, stop "ticking"
    if (players.length === 0) {
      clearInterval(tickTockInterval);
    }
  });
});

function initGame() {
  // loop defaultNumberOfOrbs times, and push a new Orb into our array
  for (let i = 0; i < settings.defaultNumberOfOrbs; i++) {
    orbs.push(new Orb(settings));
  }
}

function getLeaderBoard() {
  const leaderBoardList = players.map(curPlayer => {
    if (curPlayer.playerData) {
      return {
        name: curPlayer.playerData.name,
        score: curPlayer.playerData.score,
      };
    } else {
      return {};
    }
  });
  return leaderBoardList;
}
