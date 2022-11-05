const start = document.querySelector("#start");
const startBtn = document.querySelector(".start span");
const boxs = document.querySelectorAll(".box");
let iterables = [];
const score = document.querySelector(".score p");
const name = document.querySelector(".name p");
const winH2 = document.querySelector(".win h2");
const win = document.querySelector(".start .win");
let con = 0;
let twoCardClicked = [];
let nbrTries = 0;

startBtn.addEventListener("click", () => {
  iterables = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
  ];
  let promptMsg = prompt("Whats Your Name ?", "player");
  if (promptMsg != null) {
    name.innerHTML = `Hello: ${promptMsg}`;
    start.style.display = "none";
    startGame();
  }
});

// Flip a card when pressed
boxs.forEach((box) => {
  box.addEventListener("click", flipCard);
});

function flipCard() {
  if (con < 2 && !this.classList.contains("active")) {
    this.classList.add("active");
    con += 1;
    twoCardClicked.push(this);
    if (con == 2) {
      verification();
    }
  }
  checkWin();
}

function startGame() {
  shuffleCrads();
  score.innerHTML = `Wrong Tries: 0`;
  // Show the Locations of the Cards
  boxs.forEach((box) => {
    box.classList.add("active");
  });
  // flip cards after 5s
  setTimeout(() => {
    boxs.forEach((box) => {
      box.classList.remove("active");
    });
  }, 5000);
}

function shuffleCrads() {
  boxs.forEach((box) => {
    let i = iterables[Math.floor(Math.random() * iterables.length)];
    iterables = iterables.filter((e) => e != i);
    box.style.order = `${i}`;
  });
}
// Check if two cards are the same
function verification() {
  setTimeout(() => {
    if (twoCardClicked[0].dataset.card !== twoCardClicked[1].dataset.card) {
      twoCardClicked.forEach((e) => e.classList.remove("active"));
      document.querySelector("#fail").play();
      nbrTries += 1;
      score.innerHTML = `Wrong Tries: ${nbrTries}`;
    } else {
      document.querySelector("#success").play();
    }
    twoCardClicked = [];
    con = 0;
  }, 500);
}

// Check if You Winne

function checkWin() {
  let activeBoxs = document.querySelectorAll(".memory .box.active");
  if (activeBoxs.length == 20) {
    setTimeout(() => document.querySelector("#win").play(), 1000);
    setTimeout(() => {
      start.style.display = "block";
      win.style.display = "block";
      winH2.innerHTML = `Tries: ${nbrTries}`;
      boxs.forEach((box) => {
        box.classList.remove("active");
      });
    }, 2000);
  }
}
