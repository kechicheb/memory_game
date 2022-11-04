const boxs = document.querySelectorAll(".box");
const score = document.querySelector(".score p");
let con = 0;
let twoCardClicked = [];
let nbrTries = 0;

window.addEventListener("load", () => {
  boxs.forEach((box) => {
    box.classList.add("active");
  });
  setTimeout(() => {
    boxs.forEach((box) => {
      box.classList.remove("active");
    });
  }, 2500);
});
boxs.forEach((box) => {
  box.addEventListener("click", onClick);
});

function onClick() {
  if (con < 2 && !this.classList.contains("active")) {
    this.classList.add("active");
    con += 1;
    twoCardClicked.push(this);
    if (con == 2) {
      verification();
    }
  }
}
function verification() {
  setTimeout(() => {
    if (twoCardClicked[0].dataset.card !== twoCardClicked[1].dataset.card) {
      twoCardClicked.forEach((e) => e.classList.remove("active"));
      document.querySelector("#fail").play();
      nbrTries += 1;
      score.innerHTML = `Wrong Tries: ${nbrTries}`;
      console.log(nbrTries);
      console.log(score);
    } else {
      document.querySelector("#success").play();
    }
    twoCardClicked = [];
    con = 0;
  }, 500);
}
