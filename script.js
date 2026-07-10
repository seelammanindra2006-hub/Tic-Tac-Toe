const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");
const resetScoreBtn = document.getElementById("resetScoreBtn");

const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");
const drawScore = document.getElementById("drawScore");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

let xWins = 0;
let oWins = 0;
let draws = 0;

const winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

cells.forEach(cell => {
    cell.addEventListener("click", cellClicked);
});

restartBtn.addEventListener("click", restartGame);
resetScoreBtn.addEventListener("click", resetScores);

function cellClicked(){

    const index = this.dataset.index;

    if(board[index] !== "" || !gameActive)
        return;

    board[index] = currentPlayer;

    this.textContent = currentPlayer;

    this.classList.add(currentPlayer.toLowerCase());

    checkWinner();

}

function checkWinner(){

    let winner = false;

    for(let combo of winningCombinations){

        const [a,b,c] = combo;

        if(
            board[a] &&
            board[a] === board[b] &&
            board[a] === board[c]
        ){

            winner = true;

            cells[a].classList.add("win");
            cells[b].classList.add("win");
            cells[c].classList.add("win");

            break;

        }

    }

    if(winner){

        statusText.textContent =
        `🎉 Player ${currentPlayer} Wins!`;

        gameActive = false;

        if(currentPlayer === "X"){
            xWins++;
            scoreX.textContent = xWins;
        }
        else{
            oWins++;
            scoreO.textContent = oWins;
        }

        return;

    }

    if(!board.includes("")){

        statusText.textContent =
        "🤝 It's a Draw!";

        draws++;

        drawScore.textContent = draws;

        gameActive = false;

        return;

    }

    currentPlayer =
        currentPlayer === "X" ? "O" : "X";

    statusText.textContent =
        `Player ${currentPlayer}'s Turn`;

}

function restartGame(){

    board = ["","","","","","","","",""];

    currentPlayer = "X";

    gameActive = true;

    statusText.textContent =
    "Player X's Turn";

    cells.forEach(cell => {

        cell.textContent = "";

        cell.classList.remove("x","o","win");

    });

}

function resetScores(){

    xWins = 0;
    oWins = 0;
    draws = 0;

    scoreX.textContent = 0;
    scoreO.textContent = 0;
    drawScore.textContent = 0;

    restartGame();

}