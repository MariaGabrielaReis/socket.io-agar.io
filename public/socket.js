// connect to the socker server
const socket = io.connect("http://localhost:9000");

const init = async () => {
  const initialOrbs = await socket.emitWithAck("init", {
    playerName: player.name,
  });
  orbs = initialOrbs;

  draw(); //is in the canvas
};
