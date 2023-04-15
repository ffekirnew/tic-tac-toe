function minimax(gameState, maximizingPlayer, turn) {
    if (isGameOver(gameState)) {
        return maximizingPlayer == turn ? 1 : -1;
    }

    if (maximizingPlayer != turn) {
        let maxValue = -Infinity;
        let bestMove;

        for (let i = 0; i < 9; i++) {
            if (gameState[i] === null) {
                gameState[i] = turn % 2;
                let currScore = minimax(gameState, false, (turn + 1) % 2);

                if (currScore > maxValue) {
                    maxValue = currScore;
                    bestMove = i;
                }
                gameState[i] = null;
            }
        } 

        return bestMove;
    }
    
    else {
        let minValue = Infinity;
        let bestMove;

        for (let i = 0; i < 9; i++) {
            if (gameState[i] === null) {
                gameState[i] = turn % 2;
                let currScore = minimax(gameState, true, (turn + 1) % 2);

                if (currScore < minValue) {
                    minValue = currScore;
                    bestMove = i;
                }
                gameState[i] = null;
            }
        } 

        return bestMove;
    }
}

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

            // console.log(cells);
            // let gameState = [...gameBoard]
            let bestPlace = minimax(gameBoard, true, 1);
            cells[bestPlace].innerHTML = playButtons[turn % 2];
            cells[bestPlace].classList.add('played');
            gameBoard[bestPlace] = turn % 2;
            turn += 1;
        }
    } else {
        start();
    }
}

function aiMakeMove() {
}

function isGameOver(board) {
    const winningLines = [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6],];
    let lineIdx, line, potential;
    
    for (lineIdx = 0; lineIdx < winningLines.length; lineIdx++) {
        line = winningLines[lineIdx];
        potential = gameBoard[line[0]] === gameBoard[line[1]] && gameBoard[line[1]] === gameBoard[line[2]] && gameBoard[line[0]] !== null;
        if (potential)
            return true, line;
    }

    return false;

}

function checkIfGameIsWon(gameBoard, turn) {
    status = isGameOver(gameBoard)[0];
    line = isGameOver(gameBoard)[1];

    if (isGameOver(gameBoard)) {
        messageElement.classList = ["won"];
        messageElement.innerHTML = "Game is won by Player " + playButtons[(turn) % 2] + ".";

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

        return true;
    } else if (turn && turn % 9 == 0) {
        messageElement.classList = ["tie"];
        messageElement.innerHTML = "Game ends as a tie. Click anywhere in the gameBoard to start a new game.";

        gameIsOn = false;
        currentWinner = 2;
        tieScore.innerHTML = parseInt(tieScore.innerHTML) + 1;
        return true;
    }

    return false;
}

function start() {
    turn = 0;
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
