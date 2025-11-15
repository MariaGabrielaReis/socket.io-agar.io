// set height and width of canvas = window
let wHeight = window.innerHeight;
let wWidth = window.innerWidth;
const canvas = document.querySelector("#the-canvas");
const context = canvas.getContext("2d");
canvas.height = wHeight;
canvas.width = wWidth;

const loginModal = new bootstrap.Modal(document.querySelector("#loginModal"));
const spawnModal = new bootstrap.Modal(document.querySelector("#spawnModal"));

const player = {};

window.addEventListener("load", () => {
  // on page load, open login modal
  const loginModal = new bootstrap.Modal(document.querySelector("#loginModal"));
  loginModal.show();
});

document.querySelector(".name-form").addEventListener("submit", event => {
  event.preventDefault();
  player.name = document.querySelector("#name-input").value;
  document.querySelector(".player-name").innerHTML = player.name;
  loginModal.hide();
  spawnModal.show();
  console.log({ player });
});

document.querySelector(".start-game").addEventListener("click", event => {
  // hide the start Modal
  spawnModal.hide();
  // show the hiddenOnStart elements
  const arrayElements = Array.from(document.querySelector(".hiddenOnStart"));
  arrayElements.forEach(element => element.removeAttribute("hidden"));
  init();
});
