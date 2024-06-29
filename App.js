let blocks = document.querySelectorAll(".game button");
let resetBtn = document.querySelector(".reset-btn");
let newBtn = document.getElementById("new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.getElementById("msg");

let turnO = true; // playerX playerO

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  enableBlocks();
  msgContainer.classList.add("hide");
};

blocks.forEach((block) => {
  block.addEventListener("click", () => {
    resetBtn.classList.remove("hide2");

    if (turnO) {
      block.style.color = "#0C0C0CE8";
      block.innerText = "O";
      turnO = false;
    } else {
      block.style.color = "#FFFFFFD6";
      block.innerText = "X";
      turnO = true;
    }
    block.disabled = true;

    checkWin();
  });
});

const checkWin = () => {
  let winnerFound = false;
  for (let pattern of winPatterns) {
    let pos1Val = blocks[pattern[0]].innerText;
    let pos2Val = blocks[pattern[1]].innerText;
    let pos3Val = blocks[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        disableBlocks();
        showWinner(pos1Val);
        winnerFound = true;
        break;
      }
    }
  }

  if (winnerFound != true && blocksFull()) {
    showDraw();
  }
};

const disableBlocks = () => {
  for (let block of blocks) {
    block.disabled = true;
  }
};

const enableBlocks = () => {
  for (let block of blocks) {
    block.disabled = false;
    block.innerText = "";
  }
};

const blocksFull = () => {
  for (let block of blocks) {
    if (block.innerText === "") {
      return false;
    }
  }
  return true;
};

const showWinner = (winner) => {
  msg.innerText = `(${winner}) is the winner of the match :)`;
  msgContainer.classList.remove("hide");
  resetBtn.classList.add("hide2");
};

const showDraw = () => {
  msg.innerText = "This match is Draw!! Play new game :)";
  msgContainer.classList.remove("hide");
  resetBtn.classList.add("hide2");
};

resetBtn.addEventListener("click", resetGame);
newBtn.addEventListener("click", resetGame);
