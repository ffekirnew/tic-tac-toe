function makeAMove(i, cell) {
    if (gameIsOn) {
        if (gameBoard[i] == 0 || gameBoard[i] == 1) {
            messageElement.classList = ["already_played"];
            messageElement.innerHTML = "That cell is already occupied!";
        } else {
            cell.classList.add('played');
            cell.innerHTML = playButtons[turn % 2];
            gameBoard[i] = turn % 2;
            messageElement.innerHTML = "";
            turn += 1;
        }
    } else {
        start();
    }
}

function checkIfGameIsWon(gameBoard, turn) {
    const winningLines = [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6],];
    let lineIdx, line, potential;

    for (lineIdx = 0; lineIdx < winningLines.length; lineIdx++) {
        line = winningLines[lineIdx];
        potential = gameBoard[line[0]] === gameBoard[line[1]] && gameBoard[line[1]] === gameBoard[line[2]] && gameBoard[line[0]] !== null;
        if (potential)
            break;
    }

    if (potential) {
        messageElement.classList = ["won"];
        messageElement.innerHTML = "Game is won by Player " + playButtons[(turn - 1) % 2] + ".";

        gameIsOn = false;
        currentWinner = (turn - 1) % 2;

        for (let i = 0; i < line.length; i ++)
        {
            cells[line[i]].classList.add("won", "blink");
        }

        if (playButtons[(turn - 1) % 2] == "X") {
            player1Score.innerHTML = parseInt(player1Score.innerHTML) + 1;
        } else if (playButtons[(turn - 1) % 2] == "O") {
            player2Score.innerHTML = parseInt(player2Score.innerHTML) + 1;
        }
    } else if (turn && turn % 9 == 0) {
        messageElement.classList = ["tie"];
        messageElement.innerHTML = "Game ends as a tie. Click anywhere in the gameBoard to start a new game.";

        gameIsOn = false;
        currentWinner = 2;
        tieScore.innerHTML = parseInt(tieScore.innerHTML) + 1;
    }
}

function start() {
    turn = 0;
    let temp = playButtons[0];
    playButtons[0] = playButtons[1];
    playButtons[1] = temp;
    gameIsOn = true;
    gameBoard = [ null, null, null, null, null, null, null, null, null ];

    for (let cellIdx = 0; cellIdx < cells.length; cellIdx++) {
        cells[cellIdx].classList.remove('played', 'won', 'blink');
    }

    messageElement.innerHTML = "";

}

function reset() {
    player1Score.innerHTML = "0";
    player2Score.innerHTML = "0";
    tieScore.innerHTML = "0";
    start();
}

// Select important HTML elements
const player1Score = document.getElementById("player-1-score");
const tieScore = document.getElementById("tie-score");
const player2Score = document.getElementById("player-2-score");

let cells = [];
for (let i = 0; i < 9; i++) {
    cells.push(document.querySelector(".play_container > *:nth-child(" + (i + 1) + ") > p"));
    cells[i].addEventListener("click", function() {
        makeAMove(i, cells[i]);
        checkIfGameIsWon(gameBoard, turn);
    })
}

const messageElement = document.getElementById("message");

// Declare and initialize game variables

let gameBoard;
let playButtons = ["X", "O"];
let turn = 0;
let currentWinner = -1;

let gameIsOn;

// Start the game
start();
