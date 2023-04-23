function minimax(board, maximizingPlayer, turn) {
    let gameState = isGameOver(board);

    // Handle terminal cases
    if (gameState == 'tie') {
        return [null, 0];
    }
    else if (gameState == 'over') {
        let winner = determineWinner(board);

        return (winner == 'human') ? [null, -1] : [null, 1];
    }

    let bestMove;

    // Handle intermidiate cases
    if (maximizingPlayer) {
        let maxVal = -Infinity;

        for (let i = 0; i < 9; i++) {
            if (board[i] === null) {
                board[i] = turn;
                let score = minimax(board, false, 0)[1];
                if (score > maxVal) {
                    bestMove = i;
                    maxVal = score;
                }
                board[i] = null;
            }
        }
        return [bestMove, maxVal];
    }
    
    else {
        let minVal = Infinity;

        for (let i = 0; i < 9; i++) {
            if (board[i] === null) {
                board[i] = turn;
                let score = minimax(board, true, 1)[1];
                if (score < minVal) {
                    bestMove = i;
                    minVal = score;
                }
                board[i] = null;
            }
        }
        return [bestMove, minVal];
    }

}

function makeAMove(i, cell) {
    if (gameIsOn) {
        if (gameBoard[i]!= null) {
            messageElement.classList = ["already_played"];
            messageElement.innerHTML = "That cell is already occupied!";
        } else {
            cell.classList.add('played');
            cell.innerHTML = 'H';
            gameBoard[i] = 0;
            messageElement.innerHTML = "";
            turn += 1;

            checkIfGameIsWon(gameBoard, turn);


            let ai = minimax(gameBoard, true, 1);
            cells[ai[0]].classList.add('played');
            cells[ai[0]].innerHTML = 'A';
            gameBoard[ai[0]] = turn % 2;
            messageElement.innerHTML = "";
            turn += 1;

        }
    } else {
        start();
    }
}

function determineWinner(board) {
    const winningLines = [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6],];
    let lineIdx, line, potential;
    
    for (lineIdx = 0; lineIdx < winningLines.length; lineIdx++) {
        line = winningLines[lineIdx];
        potential = gameBoard[line[0]] === gameBoard[line[1]] && gameBoard[line[1]] === gameBoard[line[2]] && gameBoard[line[0]] !== null;
        if (potential)
            return gameBoard[line[0]] == 0 ? 'human': 'ai';
    }
}

function determineWinnerLine(board) {
    const winningLines = [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6],];
    let lineIdx, line, potential;
    
    for (lineIdx = 0; lineIdx < winningLines.length; lineIdx++) {
        line = winningLines[lineIdx];
        potential = gameBoard[line[0]] === gameBoard[line[1]] && gameBoard[line[1]] === gameBoard[line[2]] && gameBoard[line[0]] !== null;
        if (potential)
            return line;
    }
}

function isGameOver(board) {
    const winningLines = [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6],];
    let lineIdx, line, potential;
    
    for (lineIdx = 0; lineIdx < winningLines.length; lineIdx++) {
        line = winningLines[lineIdx];
        potential = gameBoard[line[0]] === gameBoard[line[1]] && gameBoard[line[1]] === gameBoard[line[2]] && gameBoard[line[0]] !== null;
        if (potential)
            return 'over';
    }

    tie = true;
    for (let i = 0; i < 9; i++) {
        if (board[i] == null) {
            tie = false;
            break;
        }
    }

    if (tie) {
        return 'tie';
    }

    return 'not over';
}

function checkIfGameIsWon(gameBoard, turn) {
    let status = isGameOver(gameBoard);

    if (status == 'over') {
        let winner = determineWinner(gameBoard);
        line = determineWinnerLine(gameBoard);
        messageElement.classList = ["won"];
        messageElement.innerHTML = "Game is won by " + winner.toLocaleUpperCase() + ".";
        gameIsOn = false;
        currentWinner = winner == 'human' ? 0 : 1;
    
        for (let i = 0; i < 3; i++)
        {
            cells[line[i]].classList.add("won", "blink");
        }

        if (currentWinner) {
            aiScore.innerHTML = parseInt(aiScore.innerHTML) + 1;
        } else if (playButtons[(turn - 1) % 2] == "O") {
            humanScore.innerHTML = parseInt(humanScore.innerHTML) + 1;
        }

        return true;
    } else if (status == 'tie') {
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
    humanScore.innerHTML = "0";
    aiScore.innerHTML = "0";
    tieScore.innerHTML = "0";
    start();
}

// Select important HTML elements
const humanScore = document.getElementById("human-score");
const tieScore = document.getElementById("tie-score");
const aiScore = document.getElementById("ai-score");

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
