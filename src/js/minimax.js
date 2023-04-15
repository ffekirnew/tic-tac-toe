function minimax(gameState, maximizingPlayer, turn) {
    if (checkIfGameIsWon(gameState, maximizingPlayer)) {
        return;
    }

    if (maximizingPlayer == turn) {
        maxValue = -Infinity;

        for (let i = 0; i < 9; i++) {
            if (gameState[i] == null) {
                gameState[i] = turn % 2;
                maxValue = max( minimax(gameState, False, (turn + 1) % 2) );
                gameState[i] = null;
            }
        } 

        return maxValue;
    }
    
    else {
        minValue = Infinity;

        for (let i = 0; i < 9; i++) {
            if (gameState[i] == null) {
                gameState[i] = turn % 2;
                minValue = min( minimax(gameState, True, (turn + 1) % 2) );
                gameState[i] = null;
            }
        } 

        return minValue;
    }
}