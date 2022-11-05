const startBtn = document.querySelector(".start span");
const boxs = document.querySelectorAll(".box");
let iterables = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
];
const score = document.querySelector(".score p");
const name = document.querySelector(".name p");
let con = 0;
let twoCardClicked = [];
let nbrTries = 0;

startBtn.addEventListener("click", () => {
  let promptMsg = prompt("Whats Your Name ?", "player");
  if (promptMsg != null) {
    name.innerHTML = `Hello: ${promptMsg}`;
    startBtn.parentElement.remove();
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
}

function startGame() {
  boxs.forEach((box) => {
    // Find out where cards are for a few seconds
    box.classList.add("active");
    let i = iterables[Math.floor(Math.random() * iterables.length)];
    iterables = iterables.filter((e) => e != i);
    box.style.order = `${i}`;
  });
  // flip cards after 4s
  setTimeout(() => {
    boxs.forEach((box) => {
      box.classList.remove("active");
    });
  }, 4000);
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
