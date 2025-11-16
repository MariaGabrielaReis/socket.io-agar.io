// connect to the socker server
const socket = io.connect("http://localhost:9000");

socket.on("init", initData => {
  orbs = initData.orbs;
});
