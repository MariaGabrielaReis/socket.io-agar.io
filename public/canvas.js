const init = () => {
  draw();
};

player.locX = Math.floor(500 * Math.random() + 10); // horizontal axis
player.locY = Math.floor(500 * Math.random() + 10); // vertical axis

const draw = () => {
  // reset the context translate back to default
  context.setTransform(1, 0, 0, 1, 0, 0);

  // clear out the canvas before draw frame
  context.clearRect(0, 0, canvas.width, canvas.height);

  // clamp the screen/viewport to the players location (x,y)
  const camX = -player.locX + canvas.width / 2;
  const camY = -player.locY + canvas.height / 2;
  // translate moves the canvas/context to where the player is at
  context.translate(camX, camY);

  context.beginPath();
  context.fillStyle = "rgba(14, 182, 208, 1)";
  // draw an arc/ circle
  // context.arc(center x, centery of the arc, radius of the circle, where to start drawing in radians - 0 = 3:00,
  // where to stop drawing in radians - Pi = 90deg)
  context.arc(player.locX, player.locY, 10, 0, Math.PI * 2);
  context.fill();
  context.lineWidth = 3; // how wide to draw a line in pixels
  context.strokeStyle = "rgba(6, 100, 115, 1)"; // draw a green line
  context.stroke();

  orbs.forEach(orb => {
    context.beginPath(); // this will start a new path
    context.fillStyle = orb.color;
    context.arc(orb.locX, orb.locY, orb.radius, 0, Math.PI * 2);
    context.fill();
  });
  requestAnimationFrame(draw); // is like controlled loop, it runs recursively, every paint/frame
};

canvas.addEventListener("mousemove", event => {
  const mousePosition = { x: event.clientX, y: event.clientY };
  const angleDeg =
    (Math.atan2(
      mousePosition.y - canvas.height / 2,
      mousePosition.x - canvas.width / 2,
    ) *
      180) /
    Math.PI;
  if (angleDeg >= 0 && angleDeg < 90) {
    // mouse is in the lower right quadrant
    xVector = 1 - angleDeg / 90;
    yVector = -(angleDeg / 90);
  } else if (angleDeg >= 90 && angleDeg <= 180) {
    // mouse is in the lower left quadrant
    xVector = -(angleDeg - 90) / 90;
    yVector = -(1 - (angleDeg - 90) / 90);
  } else if (angleDeg >= -180 && angleDeg < -90) {
    // mouse is in the top left quadrant
    xVector = (angleDeg + 90) / 90;
    yVector = 1 + (angleDeg + 90) / 90;
  } else if (angleDeg < 0 && angleDeg >= -90) {
    // mouse is in the top right quadrant
    xVector = (angleDeg + 90) / 90;
    yVector = 1 - (angleDeg + 90) / 90;
  }

  speed = 10;
  xV = xVector;
  yV = yVector;

  if ((player.locX < 5 && xV < 0) || (player.locX > 500 && xV > 0)) {
    player.locY -= speed * yV;
  } else if ((player.locY < 5 && yV > 0) || (player.locY > 500 && yV < 0)) {
    player.locX += speed * xV;
  } else {
    player.locX += speed * xV;
    player.locY -= speed * yV;
  }
});
