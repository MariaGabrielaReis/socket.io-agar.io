const init = () => {
  // console.log("init");
  draw();
};

let randomX = Math.floor(500 * Math.random() + 10); // horizontal axis
let randomY = Math.floor(500 * Math.random() + 10); // vertical axis
context.beginPath();

context.fillStyle = "rgba(14, 182, 208, 1)";
// draw an arc/ circle
// context.arc(
//    center x,
//    centery of the arc,
//    radius of the circle,
//    where to start drawing in radians - 0 = 3:00,
//    where to stop drawing in radians - Pi = 90deg
// )
context.arc(randomX, randomY, 10, 0, Math.PI * 2);
context.fill();
context.lineWidth = 3; // how wide to draw a line in pixels
context.strokeStyle = "rgba(6, 100, 115, 1)"; // draw a green line
context.stroke();

console.log(randomX, randomY);

const draw = () => {};
