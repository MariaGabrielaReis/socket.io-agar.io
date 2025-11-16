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

  // draw all the players
  players.forEach(playerItem => {
    context.beginPath();
    context.fillStyle = playerItem.playerData.color;
    // draw an arc/ circle
    // context.arc(center x, centery of the arc, radius of the circle, where to start drawing in radians - 0 = 3:00,
    // where to stop drawing in radians - Pi = 90deg)
    context.arc(
      playerItem.playerData.locX,
      playerItem.playerData.locY,
      playerItem.playerData.radius,
      0,
      Math.PI * 2,
    );
    context.fill();
    context.lineWidth = 3; // how wide to draw a line in pixels
    context.strokeStyle = "rgba(12, 162, 185, 1)"; // draw a green line
    context.stroke();
  });

  // draw all the orbs
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

  player.xVector = xVector ?? 0.1;
  player.yVector = yVector ?? 0.1;
});
